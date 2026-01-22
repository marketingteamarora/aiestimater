import { type NextRequest, NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"
import { appendLeadToGoogleSheet } from "@/lib/google/sheets"

export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient()
    const body = await request.json()

    console.log("[v0] Saving lead to database:", body)

    // Insert lead data
    const { data: leadData, error: leadError } = await supabase
      .from("leads")
      .insert({
        name: body.name,
        email: body.email,
        phone: body.phone,
      })
      .select()
      .single()

    if (leadError) {
      console.error("[v0] Error saving lead:", leadError)
      return NextResponse.json({ error: "Failed to save lead", details: leadError.message }, { status: 500 })
    }

    console.log("[v0] Lead saved successfully:", leadData)
    try {
      const sheetsResult = await appendLeadToGoogleSheet({
        name: body.name,
        email: body.email,
        phone: body.phone,
        propertyData: body.propertyData,
        estimateData: body.estimateData,
      })

      if (!sheetsResult.ok) {
        console.warn("[v0] Google Sheets append skipped/failed:", sheetsResult)
      } else {
        console.log("[v0] Google Sheets append succeeded")
      }
    } catch (sheetsError: any) {
      console.warn("[v0] Google Sheets append threw error:", sheetsError?.message || sheetsError)
    }

    // If property estimate data is provided, save it
    if (body.propertyData && body.estimateData) {
      const { data: estimateData, error: estimateError } = await supabase
        .from("property_estimates")
        .insert({
          lead_id: leadData.id,
          street_number: body.propertyData.streetNumber,
          street_name: body.propertyData.streetName,
          city: body.propertyData.city,
          postal_code: body.propertyData.postalCode,
          property_type: body.propertyData.propertyType,
          property_style: body.propertyData.propertyStyle,
          square_footage: body.propertyData.sqft,
          year_built: body.propertyData.yearBuilt,
          num_bedrooms: body.propertyData.numBedrooms,
          num_bathrooms: body.propertyData.numBathrooms,
          num_parking_spaces: body.propertyData.numParkingSpaces,
          basement_type: body.propertyData.basement,
          basement_finished: body.propertyData.basementFinished,
          basement_bedrooms: body.propertyData.basementBedrooms,
          annual_taxes: body.propertyData.annualTaxes,
          estimate_data: body.estimateData,
          estimated_value: body.estimateData.estimate,
          estimated_value_low: body.estimateData.rentEstimateLow,
          estimated_value_high: body.estimateData.rentEstimateHigh,
          confidence_score: body.estimateData.confidence || 0,
        })
        .select()
        .single()

      if (estimateError) {
        console.error("[v0] Error saving property estimate:", estimateError)
        // Don't fail the whole request if estimate save fails
      } else {
        console.log("[v0] Property estimate saved successfully:", estimateData)
      }
    }

    return NextResponse.json({ success: true, lead: leadData })
  } catch (error: any) {
    console.error("[v0] Unexpected error in leads API:", error)
    return NextResponse.json({ error: "Internal server error", details: error.message }, { status: 500 })
  }
}
