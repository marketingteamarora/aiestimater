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

export async function appendLeadToGoogleSheet(lead: LeadForSheet): Promise<AppendResult> {
  const spreadsheetEnv = process.env.GOOGLE_SHEETS_SPREADSHEET_ID
  const spreadsheetId = extractSpreadsheetId(spreadsheetEnv || DEFAULT_SPREADSHEET_ID)
  const range = process.env.GOOGLE_SHEETS_RANGE || "Sheet1!A1"

  const tokenResult = await getAccessToken()
  if (!tokenResult.ok) {
    return { ok: false, skipped: true, error: tokenResult.error }
  }

  const estimate = normalizeEstimate(lead.estimateData)
  const address = buildAddress(lead.propertyData)

  const values = [
    [
      new Date().toISOString(),
      lead.name,
      lead.email,
      lead.phone,
      address,
      estimate.value,
      estimate.low,
      estimate.high,
      estimate.confidence,
      lead.estimateData?.source ?? "",
    ],
  ]

  const url = new URL(`https://sheets.googleapis.com/v4/spreadsheets/${encodeURIComponent(spreadsheetId)}/values/${encodeURIComponent(range)}:append`)
  url.searchParams.set("valueInputOption", "USER_ENTERED")
  url.searchParams.set("insertDataOption", "INSERT_ROWS")

  const res = await fetch(url.toString(), {
    method: "POST",
    headers: {
      Authorization: `Bearer ${tokenResult.accessToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ values }),
    cache: "no-store",
  })

  if (!res.ok) {
    const errJson = (await res.json().catch(() => null)) as any
    const message = errJson?.error?.message || `Failed to append to Google Sheet (${res.status})`
    return { ok: false, error: message }
  }

  return { ok: true }
}
