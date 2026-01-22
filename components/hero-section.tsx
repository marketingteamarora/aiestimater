"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import AddressAutocomplete from "@/components/address-autocomplete"
import { Sparkles, Brain, Zap } from "lucide-react"

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
    <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-primary via-navy-light to-primary overflow-hidden">
      <div className="absolute inset-0 z-0">
        <div className="absolute top-20 left-10 w-72 h-72 bg-accent/10 rounded-full blur-3xl animate-pulse-glow" />
        <div
          className="absolute bottom-20 right-10 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse-glow"
          style={{ animationDelay: "1s" }}
        />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent/5 rounded-full blur-3xl" />
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-20 relative z-10">
        <div className="max-w-4xl mx-auto text-center space-y-8 animate-fade-in">
          <div className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-accent/20 to-blue-500/20 border border-accent/30 rounded-full backdrop-blur-sm">
            <Brain className="w-5 h-5 text-accent animate-pulse" />
            <span className="text-sm font-semibold text-white">AI-Powered Instant Valuations</span>
            <Sparkles className="w-4 h-4 text-accent" />
          </div>

          <h1 className="text-6xl md:text-8xl font-bold text-white leading-tight text-balance">
            Know Your Home's Worth in{" "}
            <span className="text-accent relative">
              Seconds
              <svg className="absolute -bottom-2 left-0 w-full" height="12" viewBox="0 0 300 12" fill="none">
                <path d="M2 10C100 2 200 2 298 10" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
              </svg>
            </span>
          </h1>

          <p className="text-xl md:text-2xl text-white/90 max-w-2xl mx-auto text-pretty font-light">
            Our AI analyzes millions of data points to give you an accurate, free estimate instantly.
          </p>

          <form onSubmit={handleSubmit} className="max-w-3xl mx-auto pt-4">
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-accent to-blue-500 rounded-2xl blur opacity-25 group-hover:opacity-40 transition duration-300" />
              <div className="relative flex flex-col sm:flex-row gap-3 p-3 bg-white rounded-2xl shadow-2xl">
                <div className="flex-1">
                  <AddressAutocomplete
                    onAddressSelect={handleAddressSelect}
                    placeholder="Enter your Canadian property address..."
                    inputClassName="border-0 focus-visible:ring-0 text-lg placeholder:text-muted-foreground/60 h-12"
                    showIcon={true}
                  />
                </div>
                <Button
                  type="submit"
                  size="lg"
                  disabled={!selectedAddress}
                  className="bg-accent text-primary hover:bg-gold-dark font-bold text-lg px-8 py-6 shadow-lg hover:shadow-xl transition-all disabled:opacity-50"
                >
                  <Zap className="w-5 h-5 mr-2" />
                  Get Instant Estimate
                </Button>
              </div>
            </div>
          </form>

          <div className="flex flex-wrap items-center justify-center gap-8 pt-8 text-white/80">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-accent rounded-full animate-pulse" />
              <span className="text-sm font-medium">100% Free</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-accent rounded-full animate-pulse" style={{ animationDelay: "0.5s" }} />
              <span className="text-sm font-medium">No Obligations</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-accent rounded-full animate-pulse" style={{ animationDelay: "1s" }} />
              <span className="text-sm font-medium">Canada Only</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
