export type LeadForSheet = {
  name: string
  email: string
  phone: string
  propertyData?: any
  estimateData?: any
}

type AppendResult =
  | {
    ok: true
  }
  | {
    ok: false
    skipped?: boolean
    error: string
  }

const DEFAULT_SPREADSHEET_ID = "1oMvnMLXO86GgwGPTl_oOvWN-eIWGHYqKfBUHTzFF9QI"

function extractSpreadsheetId(input: string): string {
  const trimmed = input.trim()

  const match = trimmed.match(/\/spreadsheets\/d\/([a-zA-Z0-9-_]+)/)
  if (match?.[1]) return match[1]

  return trimmed
}

function buildAddress(propertyData: any): string {
  if (!propertyData) return ""

  const streetNumber = propertyData.streetNumber ?? ""
  const streetName = propertyData.streetName ?? ""
  const city = propertyData.city ?? ""
  const postalCode = propertyData.postalCode ?? ""

  const street = `${streetNumber} ${streetName}`.trim()
  return [street, city, postalCode].filter(Boolean).join(", ")
}

function normalizeEstimate(estimateData: any): { value: number; low: number; high: number; confidence: number } {
  if (!estimateData) {
    return { value: 0, low: 0, high: 0, confidence: 0 }
  }

  const value = estimateData.estimate?.value ?? estimateData.estimateValue ?? estimateData.estimate ?? 0
  const low = estimateData.estimate?.low ?? estimateData.estimateLow ?? 0
  const high = estimateData.estimate?.high ?? estimateData.estimateHigh ?? 0
  const confidence = estimateData.confidence ?? 0

  return {
    value: Number(value) || 0,
    low: Number(low) || 0,
    high: Number(high) || 0,
    confidence: Number(confidence) || 0,
  }
}

async function getAccessToken(): Promise<{ ok: true; accessToken: string } | { ok: false; error: string }> {
  const clientId = process.env.GOOGLE_OAUTH_CLIENT_ID || process.env.GOOGLE_CLIENT_ID
  const clientSecret = process.env.GOOGLE_OAUTH_CLIENT_SECRET || process.env.GOOGLE_CLIENT_SECRET
  const refreshToken = process.env.GOOGLE_OAUTH_REFRESH_TOKEN || process.env.GOOGLE_REFRESH_TOKEN

  if (!clientId || !clientSecret || !refreshToken) {
    return {
      ok: false,
      error: "Missing GOOGLE_CLIENT_ID/GOOGLE_CLIENT_SECRET/GOOGLE_REFRESH_TOKEN env vars",
    }
  }

  const body = new URLSearchParams({
    client_id: clientId,
    client_secret: clientSecret,
    refresh_token: refreshToken,
    grant_type: "refresh_token",
  })

  const res = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body,
    cache: "no-store",
  })

  const json = (await res.json().catch(() => null)) as any

  if (!res.ok) {
    return {
      ok: false,
      error: json?.error_description || json?.error || `Failed to fetch access token (${res.status})`,
    }
  }

  if (!json?.access_token) {
    return { ok: false, error: "Google token response missing access_token" }
  }

  return { ok: true, accessToken: json.access_token as string }
}

// Helper to make Google Sheets API calls
async function callSheetsApi(endpoint: string, method: string = "GET", body: any = null): Promise<any> {
  const tokenResult = await getAccessToken()
  if (!tokenResult.ok) {
    throw new Error(tokenResult.error)
  }

  const res = await fetch(`https://sheets.googleapis.com/v4/spreadsheets/${endpoint}`, {
    method,
    headers: {
      Authorization: `Bearer ${tokenResult.accessToken}`,
      "Content-Type": "application/json",
    },
    body: body ? JSON.stringify(body) : undefined,
  })

  const json = await res.json().catch(() => null)

  if (!res.ok) {
    throw new Error(json?.error?.message || `Sheets API Error: ${res.status}`)
  }

  return json
}

async function ensureSheetExists(spreadsheetId: string, title: string): Promise<void> {
  try {
    const metadata = await callSheetsApi(spreadsheetId)
    const sheetExists = metadata.sheets?.some((s: any) => s.properties.title === title)

    if (!sheetExists) {
      await callSheetsApi(`${spreadsheetId}:batchUpdate`, "POST", {
        requests: [{
          addSheet: {
            properties: { title: title }
          }
        }]
      })
      console.log(`[v0] Created new sheet: ${title}`)
    }
  } catch (e) {
    console.warn(`[v0] Check/Create sheet failed: ${e}`)
    // Swallow error, maybe it exists or permissions issue, try appending anyway
  }
}

async function ensureHeaders(spreadsheetId: string, sheetName: string, headers: string[]): Promise<void> {
  try {
    // Check first row
    const range = `${sheetName}!A1:Z1`
    const result = await callSheetsApi(`${spreadsheetId}/values/${encodeURIComponent(range)}`)

    if (!result.values || result.values.length === 0) {
      // Empty, write headers
      await callSheetsApi(`${spreadsheetId}/values/${encodeURIComponent(range)}:append?valueInputOption=USER_ENTERED`, "POST", {
        values: [headers]
      })
      console.log(`[v0] Added headers to ${sheetName}`)
    }
  } catch (e) {
    console.warn(`[v0] Check/Write headers failed: ${e}`)
  }
}

export async function appendRowToSheet(
  sheetName: string,
  rowValues: any[],
  headers: string[]
): Promise<AppendResult> {
  const spreadsheetEnv = process.env.GOOGLE_SHEETS_SPREADSHEET_ID
  const spreadsheetId = extractSpreadsheetId(spreadsheetEnv || DEFAULT_SPREADSHEET_ID)

  try {
    await ensureSheetExists(spreadsheetId, sheetName)
    await ensureHeaders(spreadsheetId, sheetName, headers)

    // Append data
    const range = `${sheetName}!A1`
    const res = await callSheetsApi(`${spreadsheetId}/values/${encodeURIComponent(range)}:append?valueInputOption=USER_ENTERED&insertDataOption=INSERT_ROWS`, "POST", {
      values: [rowValues]
    })

    return { ok: true }
  } catch (e: any) {
    console.error(`[v0] Append failed: ${e.message}`)
    return { ok: false, error: e.message }
  }
}

// Leads (Estimate) Specific
export async function appendLeadToGoogleSheet(lead: LeadForSheet): Promise<AppendResult> {
  const headers = [
    "Date", "Name", "Email", "Phone", "Address",
    "Estimated Value", "Low Estimate", "High Estimate",
    "Confidence", "Source"
  ]

  const estimate = normalizeEstimate(lead.estimateData)
  const address = buildAddress(lead.propertyData)

  const row = [
    new Date().toISOString(),
    lead.name,
    lead.email,
    lead.phone,
    address,
    estimate.value,
    estimate.low,
    estimate.high,
    estimate.confidence,
    lead.estimateData?.source ?? ""
  ]

  return appendRowToSheet("Leads", row, headers)
}

export type ContactSubmission = {
  name: string
  email: string
  phone: string
  message: string
  preferredContact?: string
  interestedIn?: string
  propertyAddress?: string
}

// Contact Form Specific
export async function appendContactToGoogleSheet(contact: ContactSubmission): Promise<AppendResult> {
  const headers = [
    "Date", "Name", "Email", "Phone", "Message",
    "Preferred Contact", "Interested In", "Property Address"
  ]

  const row = [
    new Date().toISOString(),
    contact.name,
    contact.email,
    contact.phone,
    contact.message,
    contact.preferredContact || "",
    contact.interestedIn || "",
    contact.propertyAddress || ""
  ]

  return appendRowToSheet("Contact Us", row, headers)
}
