import { type NextRequest, NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"
import { appendContactToGoogleSheet } from "@/lib/google/sheets"

export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient()
    const body = await request.json()

    console.log("[v0] Saving contact submission:", body)

    // Optional: Save to Supabase
    let submissionData = null;
    try {
      const { data, error } = await supabase
        .from("contact_submissions")
        .insert({
          name: body.name,
          email: body.email,
          phone: body.phone,
          message: body.message,
          preferred_contact: body.preferredContact,
        })
        .select()
        .single()

      if (error) {
        console.error("[v0] Error saving contact submission to Supabase:", error)
      } else {
        console.log("[v0] Contact submission saved to Supabase:", data)
        submissionData = data
      }
    } catch (e) {
      console.error("[v0] Unexpected Supabase error:", e)
    }

    // Always attempt Google Sheets
    let sheetsSuccess = false
    try {
      const sheetsRes = await appendContactToGoogleSheet({
        name: body.name,
        email: body.email,
        phone: body.phone,
        message: body.message,
        preferredContact: body.preferredContact,
        interestedIn: body.interestedIn, // Pass these if available in body, though form sends composed message
        propertyAddress: body.propertyAddress
      })

      if (sheetsRes.ok) {
        console.log("[v0] Contact saved to Google Sheets")
        sheetsSuccess = true
      } else {
        console.warn("[v0] Google Sheets save failed:", sheetsRes.error)
      }
    } catch (e) {
      console.error("[v0] Google Sheets execution error:", e)
    }

    if (!submissionData && !sheetsSuccess) {
      return NextResponse.json({ error: "Failed to save to both Database and Google Sheets" }, { status: 500 })
    }

    return NextResponse.json({ success: true, submission: submissionData, sheetsSuccess })
  } catch (error: any) {
    console.error("[v0] Unexpected error in contact API:", error)
    return NextResponse.json({ error: "Internal server error", details: error.message }, { status: 500 })
  }
}
