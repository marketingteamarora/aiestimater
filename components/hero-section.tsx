"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import AddressAutocomplete from "@/components/address-autocomplete"
import { Sparkles, Zap, CheckCircle2 } from "lucide-react"

interface AddressComponents {
  streetNumber: string
  streetName: string
  city: string
  province: string
  postalCode: string
  fullAddress: string
}

export default function HeroSection() {
  const [selectedAddress, setSelectedAddress] = useState<AddressComponents | null>(null)
  const router = useRouter()

  const handleAddressSelect = (addressData: AddressComponents) => {
    setSelectedAddress(addressData)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (selectedAddress) {
      const params = new URLSearchParams({
        streetNumber: selectedAddress.streetNumber,
        streetName: selectedAddress.streetName,
        city: selectedAddress.city,
        postalCode: selectedAddress.postalCode,
        fullAddress: selectedAddress.fullAddress,
      })
      router.push(`/estimate?${params.toString()}`)
    }
  }

  return (
    <section className="relative min-h-[85vh] flex items-center justify-center bg-white overflow-hidden border-b border-border">
      {/* Subtle modern background */}
      <div className="absolute inset-0 z-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] opacity-50" />

      {/* Content */}
      <div className="container mx-auto px-4 py-24 relative z-10">
        <div className="max-w-4xl mx-auto text-center space-y-8 animate-fade-in">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-secondary border border-border rounded-full">
            <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
            <span className="text-sm font-semibold tracking-wide text-primary uppercase">Free Property Valuation</span>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold text-primary leading-[1.1] tracking-tight text-balance">
            Discover Your Property's True Market Value
          </h1>

          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto text-pretty font-medium leading-relaxed">
            Get an instant, data-driven estimate based on millions of recent real estate transactions across Canada.
          </p>

          <form onSubmit={handleSubmit} className="max-w-3xl mx-auto pt-8">
            <div className="relative flex flex-col sm:flex-row gap-3 p-2 bg-white rounded-xl border border-border shadow-soft">
              <div className="flex-1">
                <AddressAutocomplete
                  onAddressSelect={handleAddressSelect}
                  placeholder="Enter your Canadian property address..."
                  inputClassName="border-0 focus-visible:ring-0 text-lg placeholder:text-muted-foreground/60 h-14 bg-white rounded-lg"
                  showIcon={true}
                />
              </div>
              <Button
                type="submit"
                size="lg"
                disabled={!selectedAddress}
                className="w-full sm:w-auto bg-accent text-white hover:bg-accent/90 font-semibold text-lg px-8 h-14 rounded-lg shadow-sm transition-all disabled:opacity-50"
              >
                Get Estimate
              </Button>
            </div>
          </form>

          <div className="flex flex-wrap items-center justify-center gap-8 pt-10 text-muted-foreground">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-accent" />
              <span className="text-sm font-medium">100% Free</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-accent" />
              <span className="text-sm font-medium">No Obligations</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-accent" />
              <span className="text-sm font-medium">Canada Only</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
