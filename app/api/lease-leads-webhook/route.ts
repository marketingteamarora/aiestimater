import { type NextRequest, NextResponse } from "next/server"
import { appendLeaseLeadToGoogleSheet } from "@/lib/google/sheets"

/**
 * POST /api/lease-leads-webhook
 *
 * Receives Supabase Database Webhook payloads for INSERT events on `property_leads`.
 * Validates the shared secret header, then appends the lead to the
 * "Lease by Owner Leads" tab in the existing Google Sheet.
 *
 * Supabase Webhook setup:
 *  - Table:  property_leads
 *  - Event:  INSERT
 *  - URL:    https://<your-domain>/api/lease-leads-webhook
 *  - Header: x-webhook-secret: <LEASE_WEBHOOK_SECRET env value>
 */
export async function POST(request: NextRequest) {
  try {
    // --- Auth: validate shared secret ---
    const secret = process.env.LEASE_WEBHOOK_SECRET
    if (secret) {
      const incomingSecret = request.headers.get("x-webhook-secret")
      if (incomingSecret !== secret) {
        console.warn("[lease-webhook] Unauthorized: invalid secret")
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
      }
    } else {
      console.warn("[lease-webhook] LEASE_WEBHOOK_SECRET not set — running without auth check")
    }

    const body = await request.json()

    // Supabase webhooks send { type, table, record, old_record, ... }
    if (body.type !== "INSERT") {
      return NextResponse.json({ skipped: true, reason: "Not an INSERT event" })
    }

    const record = body.record
    if (!record) {
      return NextResponse.json({ error: "No record in payload" }, { status: 400 })
    }

    console.log("[lease-webhook] New property_leads row received:", record)

    const result = await appendLeaseLeadToGoogleSheet({
      owner_name:       record.owner_name      ?? "",
      email:            record.email            ?? "",
      phone:            record.phone            ?? "",
      property_address: record.property_address ?? "",
      city:             record.city             ?? "",
      postal_code:      record.postal_code      ?? "",
      property_type:    record.property_type    ?? "",
      bedrooms:         record.bedrooms         ?? null,
      bathrooms:        record.bathrooms        ?? null,
      sqft:             record.sqft             ?? null,
      rent_amount:      record.rent_amount      ?? null,
      available_date:   record.available_date   ?? null,
      description:      record.description      ?? null,
      created_at:       record.created_at       ?? null,
    })

    if (!result.ok) {
      console.error("[lease-webhook] Failed to write to Google Sheets:", result.error)
      return NextResponse.json({ error: "Failed to write to Google Sheets", details: result.error }, { status: 500 })
    }

    console.log("[lease-webhook] Lead written to Google Sheets successfully")
    return NextResponse.json({ success: true })

  } catch (error: any) {
    console.error("[lease-webhook] Unexpected error:", error)
    return NextResponse.json({ error: "Internal server error", details: error.message }, { status: 500 })
  }
}
