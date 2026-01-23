"use client"

import { Suspense } from "react"
import { useSearchParams } from "next/navigation"
import PropertyForm from "@/components/property-form"
import { Brain, Sparkles, MapPin } from "lucide-react"

function EstimateContent() {
  const searchParams = useSearchParams()
  const searchedAddress = searchParams.get("address")

  return (
    <div className="min-h-screen bg-gradient-to-b from-secondary to-white py-16">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12 space-y-6">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-accent/10 border border-accent/20 rounded-full">
              <Brain className="w-4 h-4 text-accent animate-pulse" />
              <span className="text-sm font-semibold text-accent">AI is analyzing your property</span>
              <Sparkles className="w-4 h-4 text-accent" />
            </div>

            <h1 className="text-4xl md:text-5xl font-bold text-foreground text-balance">Just a Few Quick Details</h1>

            {searchedAddress && (
              <div className="flex items-center justify-center gap-2 text-lg text-primary bg-accent/5 border border-accent/20 rounded-lg px-6 py-3 max-w-2xl mx-auto">
                <MapPin className="w-5 h-5 text-accent flex-shrink-0" />
                <span className="font-medium">{searchedAddress}</span>
              </div>
            )}

            <p className="text-lg text-muted-foreground max-w-xl mx-auto">
              Our AI needs just the basics to calculate your accurate home value
            </p>
          </div>

          {/* Form */}
          <PropertyForm 
            streetNumber={searchParams.get("streetNumber") || ""}
            streetName={searchParams.get("streetName") || ""}
            city={searchParams.get("city") || ""}
            postalCode={searchParams.get("postalCode") || ""}
            fullAddress={searchParams.get("address") || ""}
          />
        </div>
      </div>
    </div>
  )
}

export default function EstimatePage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
      <EstimateContent />
    </Suspense>
  )
}
