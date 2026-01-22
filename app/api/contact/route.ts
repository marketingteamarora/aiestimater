import { type NextRequest, NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"

export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient()
    const body = await request.json()

    console.log("[v0] Saving contact submission:", body)

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
      console.error("[v0] Error saving contact submission:", error)
      return NextResponse.json({ error: "Failed to save contact submission", details: error.message }, { status: 500 })
    }

    console.log("[v0] Contact submission saved successfully:", data)

    return NextResponse.json({ success: true, submission: data })
  } catch (error: any) {
    console.error("[v0] Unexpected error in contact API:", error)
    return NextResponse.json({ error: "Internal server error", details: error.message }, { status: 500 })
  }
}
