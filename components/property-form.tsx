"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { MapPin, Home, Sparkles, Loader2 } from "lucide-react"
import AddressAutocomplete from "./address-autocomplete"

interface PropertyFormProps {
  streetNumber?: string
  streetName?: string
  city?: string
  postalCode?: string
  fullAddress?: string
}

export default function PropertyForm({
  streetNumber: propStreetNumber = "",
  streetName: propStreetName = "",
  city: propCity = "",
  postalCode: propPostalCode = "",
  fullAddress: propFullAddress = ""
}: PropertyFormProps = {}) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const initialAddress = searchParams.get("address") || propFullAddress

  const [formData, setFormData] = useState({
    streetNumber: propStreetNumber,
    streetName: propStreetName,
    city: propCity,
    postalCode: propPostalCode,
    propertyType: "",
    propertyStyle: "",
    bedrooms: "",
    bathrooms: "",
    squareFeet: "",
    yearBuilt: "",
    basement: "",
    basementFinished: "",
    basementBedrooms: "",
    parkingSpaces: "",
    taxes: "",
  })

  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")

  useEffect(() => {
    if (initialAddress) {
      // Try to parse the address into components
      const parts = initialAddress.split(",").map((p) => p.trim())

      if (parts.length > 0) {
        // Try to extract street number and name from first part
        const streetParts = parts[0].trim().split(" ")
        const streetNumber = streetParts[0]
        const streetName = streetParts.slice(1).join(" ")

        setFormData((prev) => ({
          ...prev,
          streetNumber: streetNumber || "",
          streetName: streetName || "",
          city: parts[1] || "",
          postalCode: parts[2] || "",
        }))
      }
    }
  }, [initialAddress])

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleAddressSelect = (address: {
    streetNumber: string
    streetName: string
    city: string
    province: string
    postalCode: string
    fullAddress: string
  }) => {
    console.log('Address selected:', address);
    setFormData(prev => ({
      ...prev,
      streetNumber: address.streetNumber || '',
      streetName: address.streetName || '',
      city: address.city || '',
      postalCode: address.postalCode || ''
    }));
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    try {
      const payload = {
        address: {
          city: formData.city,
          streetName: formData.streetName,
          streetNumber: formData.streetNumber,
          zip: formData.postalCode,
        },
        details: {
          basement1: formData.basement,
          basementFinished: formData.basementFinished,
          basementBedrooms: Number.parseInt(formData.basementBedrooms) || 0,
          numBathrooms: Number.parseInt(formData.bathrooms) || 1,
          numBedrooms: Number.parseInt(formData.bedrooms) || 1,
          numParkingSpaces: Number.parseInt(formData.parkingSpaces) || 0,
          propertyType: formData.propertyType,
          style: formData.propertyStyle,
          sqft: formData.squareFeet,
          yearBuilt: Number.parseInt(formData.yearBuilt),
        },
        taxes: {
          annualAmount: Number.parseFloat(formData.taxes) || 0,
        },
      }

      console.log("[v0] Sending payload to API:", payload)

      const response = await fetch("/api/estimate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      })

      if (!response.ok) {
        throw new Error("Failed to get estimate")
      }

      const estimateData = await response.json()
      console.log("[v0] Received estimate data:", estimateData)

      sessionStorage.setItem("propertyData", JSON.stringify(formData))
      sessionStorage.setItem("estimateData", JSON.stringify(estimateData))

      router.push("/dashboard")
    } catch (err) {
      console.error("[v0] Error getting estimate:", err)
      setError("Unable to calculate estimate. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <Card className="border-2 shadow-lg">
        <CardContent className="pt-6 space-y-6">
          {/* Location */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-primary mb-3">
              <MapPin className="w-5 h-5 text-accent" />
              <h3 className="font-semibold text-lg">Property Location</h3>
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Search Address *</Label>
                <AddressAutocomplete
                  onAddressSelect={handleAddressSelect}
                  placeholder="Start typing your address..."
                  inputClassName="text-base h-12"
                  initialValue={initialAddress}
                />
                <p className="text-xs text-muted-foreground">Start typing to find your address and auto-fill the form</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="streetNumber">Street Number *</Label>
                  <Input
                    id="streetNumber"
                    placeholder="123"
                    value={formData.streetNumber}
                    onChange={(e) => handleChange("streetNumber", e.target.value)}
                    required
                    className="text-base"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="streetName">Street Name *</Label>
                  <Input
                    id="streetName"
                    placeholder="Main Street"
                    value={formData.streetName}
                    onChange={(e) => handleChange("streetName", e.target.value)}
                    required
                    className="text-base"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="city">City *</Label>
                  <Input
                    id="city"
                    placeholder="Brampton"
                    value={formData.city}
                    onChange={(e) => handleChange("city", e.target.value)}
                    required
                    className="text-base"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="postalCode">Postal Code *</Label>
                  <Input
                    id="postalCode"
                    placeholder="L6X 1A1"
                    value={formData.postalCode}
                    onChange={(e) => handleChange("postalCode", e.target.value)}
                    required
                    className="text-base"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="border-t pt-6" />

          {/* Property Details */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-primary mb-3">
              <Home className="w-5 h-5 text-accent" />
              <h3 className="font-semibold text-lg">Property Details</h3>
            </div>

            <div className="space-y-2">
              <Label htmlFor="propertyType">Property Type *</Label>
              <Select
                value={formData.propertyType}
                onValueChange={(value) => handleChange("propertyType", value)}
                required
              >
                <SelectTrigger id="propertyType" className="text-base">
                  <SelectValue placeholder="Select property type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="residential">Residential</SelectItem>
                  <SelectItem value="residential income">Residential Income</SelectItem>
                  <SelectItem value="commercial sale">Commercial Sale</SelectItem>
                  <SelectItem value="land">Land</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="propertyStyle">Property Style *</Label>
              <Select
                value={formData.propertyStyle}
                onValueChange={(value) => handleChange("propertyStyle", value)}
                required
              >
                <SelectTrigger id="propertyStyle" className="text-base">
                  <SelectValue placeholder="Select property style" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="single family residence">Single Family (Detached)</SelectItem>
                  <SelectItem value="townhouse">Townhouse</SelectItem>
                  <SelectItem value="condominium">Condominium</SelectItem>
                  <SelectItem value="duplex">Duplex</SelectItem>
                  <SelectItem value="apartment">Apartment</SelectItem>
                  <SelectItem value="multi-family">Multi-Family</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="bedrooms">Bedrooms *</Label>
                <Select value={formData.bedrooms} onValueChange={(value) => handleChange("bedrooms", value)} required>
                  <SelectTrigger id="bedrooms" className="text-base">
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">1</SelectItem>
                    <SelectItem value="2">2</SelectItem>
                    <SelectItem value="3">3</SelectItem>
                    <SelectItem value="4">4</SelectItem>
                    <SelectItem value="5">5+</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="bathrooms">Bathrooms *</Label>
                <Select value={formData.bathrooms} onValueChange={(value) => handleChange("bathrooms", value)} required>
                  <SelectTrigger id="bathrooms" className="text-base">
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">1</SelectItem>
                    <SelectItem value="2">2</SelectItem>
                    <SelectItem value="3">3</SelectItem>
                    <SelectItem value="4">4+</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="squareFeet">Square Feet *</Label>
                <Input
                  id="squareFeet"
                  type="number"
                  placeholder="2000"
                  value={formData.squareFeet}
                  onChange={(e) => handleChange("squareFeet", e.target.value)}
                  required
                  className="text-base"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="yearBuilt">Year Built *</Label>
                <Input
                  id="yearBuilt"
                  type="number"
                  placeholder="2010"
                  value={formData.yearBuilt}
                  onChange={(e) => handleChange("yearBuilt", e.target.value)}
                  required
                  className="text-base"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="basement">Basement *</Label>
                <Select value={formData.basement} onValueChange={(value) => handleChange("basement", value)} required>
                  <SelectTrigger id="basement" className="text-base">
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Full">Full</SelectItem>
                    <SelectItem value="Partial">Partial</SelectItem>
                    <SelectItem value="None">None</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="basementFinished">Basement Finished? *</Label>
                <Select
                  value={formData.basementFinished}
                  onValueChange={(value) => handleChange("basementFinished", value)}
                  required
                >
                  <SelectTrigger id="basementFinished" className="text-base">
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="yes">Yes</SelectItem>
                    <SelectItem value="no">No</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="basementBedrooms">Basement Bedrooms *</Label>
                <Select
                  value={formData.basementBedrooms}
                  onValueChange={(value) => handleChange("basementBedrooms", value)}
                  required
                >
                  <SelectTrigger id="basementBedrooms" className="text-base">
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="0">0</SelectItem>
                    <SelectItem value="1">1</SelectItem>
                    <SelectItem value="2">2</SelectItem>
                    <SelectItem value="3">3</SelectItem>
                    <SelectItem value="4">4+</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="parkingSpaces">Parking Spaces *</Label>
                <Select
                  value={formData.parkingSpaces}
                  onValueChange={(value) => handleChange("parkingSpaces", value)}
                  required
                >
                  <SelectTrigger id="parkingSpaces" className="text-base">
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="0">0</SelectItem>
                    <SelectItem value="1">1</SelectItem>
                    <SelectItem value="2">2</SelectItem>
                    <SelectItem value="3">3+</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="taxes">Annual Property Taxes *</Label>
              <Input
                id="taxes"
                type="number"
                placeholder="5000"
                value={formData.taxes}
                onChange={(e) => handleChange("taxes", e.target.value)}
                required
                className="text-base"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {error && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm text-center">{error}</div>
      )}

      <div className="flex justify-center pt-4">
        <Button
          type="submit"
          size="lg"
          disabled={isLoading}
          className="bg-accent text-primary hover:bg-gold-dark font-bold text-lg px-12 py-6 shadow-xl hover:shadow-2xl transition-all group disabled:opacity-50"
        >
          {isLoading ? (
            <>
              <Loader2 className="w-5 h-5 mr-2 animate-spin" />
              Calculating...
            </>
          ) : (
            <>
              <Sparkles className="w-5 h-5 mr-2 group-hover:animate-spin" />
              Get AI-Powered Estimate
            </>
          )}
        </Button>
      </div>

      <p className="text-center text-sm text-muted-foreground">Your information is secure and will never be shared</p>
    </form>
  )
}
