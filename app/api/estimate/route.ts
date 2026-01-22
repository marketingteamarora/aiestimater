import { NextResponse } from "next/server"

const DEEPSEEK_API_KEY = process.env.DEEPSEEK_API_KEY
const DEEPSEEK_API_URL = "https://api.deepseek.com/v1/chat/completions"

const REPLIERS_API_KEY = "mmbYiB9YCZb8tVf48xk4C5QcWA82SY"
const REPLIERS_API_URL = "https://api.repliers.io/estimates"

interface PropertyData {
  address: {
    streetNumber: string
    streetName: string
    city: string
    zip: string
  }
  details: {
    propertyType: string
    style: string
    numBedrooms: number
    numBathrooms: number
    sqft: string
    yearBuilt: number
    numParkingSpaces: number
    basement1: string
    basementFinished?: string
    basementBedrooms?: number
  }
  taxes: {
    annualAmount: number
  }
}

async function getDeepSeekEstimate(propertyData: PropertyData) {
  const prompt = `You are a real estate valuation expert for Ontario, Canada. Analyze the following property and provide an accurate market value estimate.

Property Details:
- Address: ${propertyData.address.streetNumber} ${propertyData.address.streetName}, ${propertyData.address.city}, ${propertyData.address.zip}
- Property Type: ${propertyData.details.propertyType}
- Style: ${propertyData.details.style}
- Bedrooms: ${propertyData.details.numBedrooms}
- Bathrooms: ${propertyData.details.numBathrooms}
- Square Feet: ${propertyData.details.sqft}
- Year Built: ${propertyData.details.yearBuilt}
- Parking Spaces: ${propertyData.details.numParkingSpaces}
- Basement Type: ${propertyData.details.basement1}
- Basement Finished: ${propertyData.details.basementFinished || 'Unknown'}
- Basement Bedrooms: ${propertyData.details.basementBedrooms || 0}
- Annual Property Taxes: $${propertyData.taxes.annualAmount}

Based on current 2024-2025 Ontario real estate market conditions, provide your analysis in the following JSON format only (no other text):
{
  "estimate": {
    "value": <number - your best estimate in CAD>,
    "low": <number - low end of range>,
    "high": <number - high end of range>
  },
  "confidence": <number between 0 and 1>,
  "pricePerSqft": <number>,
  "marketTrend": "<up|down|stable>",
  "trendPercentage": <number - annual change percentage>,
  "insights": [
    "<insight 1>",
    "<insight 2>",
    "<insight 3>"
  ],
  "comparables": [
    {
      "address": "<nearby comparable address>",
      "price": <number>,
      "sqft": <number>,
      "soldDate": "<month year>"
    }
  ],
  "historicalValues": [
    {"month": "Jan 2024", "value": <number>},
    {"month": "Feb 2024", "value": <number>},
    {"month": "Mar 2024", "value": <number>},
    {"month": "Apr 2024", "value": <number>},
    {"month": "May 2024", "value": <number>},
    {"month": "Jun 2024", "value": <number>},
    {"month": "Jul 2024", "value": <number>},
    {"month": "Aug 2024", "value": <number>},
    {"month": "Sep 2024", "value": <number>},
    {"month": "Oct 2024", "value": <number>},
    {"month": "Nov 2024", "value": <number>},
    {"month": "Dec 2024", "value": <number>}
  ]
}

Consider these factors:
1. Location and neighborhood desirability in ${propertyData.address.city}
2. Property size and lot characteristics
3. Age and condition (built ${propertyData.details.yearBuilt})
4. Current market conditions in the Greater Toronto Area
5. Comparable recent sales in the area
6. Property taxes as an indicator of assessed value

Respond ONLY with the JSON object, no additional text.`

  const response = await fetch(DEEPSEEK_API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${DEEPSEEK_API_KEY}`,
    },
    body: JSON.stringify({
      model: "deepseek-chat",
      messages: [
        {
          role: "system",
          content: "You are a professional real estate appraiser specializing in Ontario, Canada properties. You provide accurate, data-driven property valuations based on market conditions, comparable sales, and property characteristics. Always respond with valid JSON only."
        },
        {
          role: "user",
          content: prompt
        }
      ],
      temperature: 0.3,
      max_tokens: 2000,
    }),
  })

  if (!response.ok) {
    const errorText = await response.text()
    console.error("[SERVER] DeepSeek API error:", response.status, errorText)
    throw new Error(`DeepSeek API failed: ${response.status}`)
  }

  const data = await response.json()
  const content = data.choices?.[0]?.message?.content

  if (!content) {
    throw new Error("No content in DeepSeek response")
  }

  // Parse JSON from response (handle potential markdown code blocks)
  let jsonStr = content.trim()
  if (jsonStr.startsWith("```json")) {
    jsonStr = jsonStr.slice(7)
  }
  if (jsonStr.startsWith("```")) {
    jsonStr = jsonStr.slice(3)
  }
  if (jsonStr.endsWith("```")) {
    jsonStr = jsonStr.slice(0, -3)
  }
  jsonStr = jsonStr.trim()

  const estimateData = JSON.parse(jsonStr)
  
  return {
    estimate: estimateData.estimate,
    confidence: estimateData.confidence,
    pricePerSqft: estimateData.pricePerSqft,
    marketTrend: estimateData.marketTrend,
    trendPercentage: estimateData.trendPercentage,
    insights: estimateData.insights,
    comparables: estimateData.comparables,
    historicalValues: estimateData.historicalValues,
    source: "deepseek"
  }
}

async function getRepliersEstimate(propertyData: PropertyData) {
  const response = await fetch(REPLIERS_API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "REPLIERS-API-KEY": REPLIERS_API_KEY,
    },
    body: JSON.stringify(propertyData),
  })

  if (!response.ok) {
    const errorText = await response.text()
    console.error("[SERVER] Repliers API error:", response.status, errorText)
    throw new Error(`Repliers API failed: ${response.status}`)
  }

  const data = await response.json()
  return { ...data, source: "repliers" }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    console.log("[SERVER] Received estimate request for:", body.address)

    // Try DeepSeek first (primary)
    if (DEEPSEEK_API_KEY) {
      try {
        console.log("[SERVER] Attempting DeepSeek estimate...")
        const estimate = await getDeepSeekEstimate(body)
        console.log("[SERVER] DeepSeek estimate successful")
        return NextResponse.json(estimate)
      } catch (deepseekError) {
        console.error("[SERVER] DeepSeek failed, falling back to Repliers:", deepseekError)
      }
    }

    // Fallback to Repliers
    try {
      console.log("[SERVER] Attempting Repliers estimate...")
      const estimate = await getRepliersEstimate(body)
      console.log("[SERVER] Repliers estimate successful")
      return NextResponse.json(estimate)
    } catch (repliersError) {
      console.error("[SERVER] Repliers also failed:", repliersError)
      return NextResponse.json(
        { error: "Unable to generate estimate. Please try again later." },
        { status: 500 }
      )
    }
  } catch (error) {
    console.error("[SERVER] Error processing estimate request:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
