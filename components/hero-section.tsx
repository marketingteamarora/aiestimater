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
    <section className="relative min-h-[85vh] flex items-center justify-center bg-primary overflow-hidden">
      {/* Elegant dark background with subtle texture */}
      <div className="absolute inset-0 z-0 opacity-20">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff1a_1px,transparent_1px),linear-gradient(to_bottom,#ffffff1a_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
      </div>
      <div className="absolute inset-0 z-0 bg-gradient-to-br from-blue-600/10 via-transparent to-transparent" />

      {/* Content */}
      <div className="container mx-auto px-4 py-24 relative z-10">
        <div className="max-w-4xl mx-auto text-center space-y-8 animate-fade-in">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 border border-white/20 rounded-full backdrop-blur-md">
            <Sparkles className="w-4 h-4 text-blue-400" />
            <span className="text-sm font-semibold tracking-wide text-white uppercase">AI-Powered Valuations</span>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold text-white leading-[1.1] tracking-tight text-balance">
            Know Your AI Home Value in{" "}
            <span className="text-blue-400 italic font-serif">Seconds</span>
          </h1>

          <p className="text-lg md:text-xl text-white/80 max-w-2xl mx-auto text-pretty font-light leading-relaxed">
            Our advanced AI analyzes millions of real estate data points to give you an accurate, completely free estimate instantly.
          </p>

          <form onSubmit={handleSubmit} className="max-w-3xl mx-auto pt-8">
            <div className="relative flex flex-col sm:flex-row gap-3 p-2 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 shadow-2xl">
              <div className="flex-1">
                <AddressAutocomplete
                  onAddressSelect={handleAddressSelect}
                  placeholder="Enter your Canadian property address..."
                  inputClassName="border-0 focus-visible:ring-0 text-lg placeholder:text-muted-foreground/60 h-14 bg-white rounded-xl"
                  showIcon={true}
                />
              </div>
              <Button
                type="submit"
                size="lg"
                disabled={!selectedAddress}
                className="w-full sm:w-auto bg-blue-600 text-white hover:bg-blue-700 font-semibold text-lg px-8 h-14 rounded-xl shadow-lg transition-all disabled:opacity-50"
              >
                <Zap className="w-5 h-5 mr-2" />
                Get Estimate
              </Button>
            </div>
          </form>

          <div className="flex flex-wrap items-center justify-center gap-8 pt-10 text-white/60">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-blue-400" />
              <span className="text-sm font-medium">100% Free</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-blue-400" />
              <span className="text-sm font-medium">No Obligations</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-blue-400" />
              <span className="text-sm font-medium">Canada Only</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
