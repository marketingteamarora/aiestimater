"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Progress } from "@/components/ui/progress"
import { MapPin, Home, Sparkles, Loader2 } from "lucide-react"

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
    // Contact Information
    name: "",
    email: "",
    phone: "",

    // Property Information
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
  const [progress, setProgress] = useState(0)
  const [loadingMessage, setLoadingMessage] = useState("Initializing analysis...")

  useEffect(() => {
    let interval: any
    if (isLoading) {
      setProgress(0)
      const messages = [
        "Analyzing property details...",
        "Scanning local market trends...",
        "Comparing recent sales in your area...",
        "Evaluating neighborhood growth factors...",
        "Calculating estimated value...",
        "Finalizing your comprehensive report..."
      ]

      let msgIndex = 0
      setLoadingMessage(messages[0])

      interval = setInterval(() => {
        setProgress((prev) => {
          // Slow down progress as it gets higher to "wait" for the API
          const increment = prev < 50 ? 5 : prev < 80 ? 2 : 0.5
          const newProgress = Math.min(prev + increment, 90)

          // Update message based on progress milestones
          const totalMessages = messages.length
          const currentStage = Math.floor((newProgress / 90) * totalMessages)
          if (currentStage !== msgIndex && currentStage < totalMessages) {
            msgIndex = currentStage
            setLoadingMessage(messages[msgIndex])
          }

          return newProgress
        })
      }, 200)
    }

    return () => {
      if (interval) clearInterval(interval)
    }
  }, [isLoading])

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

      // First, get the estimate
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

      // Complete the progress bar before navigating
      setProgress(100)
      setLoadingMessage("Complete!")
      await new Promise(resolve => setTimeout(resolve, 500))

      sessionStorage.setItem("propertyData", JSON.stringify(formData))
      sessionStorage.setItem("estimateData", JSON.stringify(estimateData))

      router.push("/dashboard")
    } catch (err) {
      console.error("[v0] Error:", err)
      setError(err instanceof Error ? err.message : "An unknown error occurred. Please try again.")
      setIsLoading(false)
    }
  }

  return (
    <div className="relative">
      {isLoading && (
        <div className="absolute inset-0 z-50 bg-white/90 backdrop-blur-sm rounded-xl flex flex-col items-center justify-center p-8 transition-all duration-300 animate-in fade-in">
          <div className="w-full max-w-md space-y-6 text-center">
            <div className="relative w-20 h-20 mx-auto">
              <div className="absolute inset-0 border-4 border-primary/20 rounded-full"></div>
              <div className="absolute inset-0 border-4 border-primary rounded-full border-t-transparent animate-spin"></div>
              <Sparkles className="absolute inset-0 m-auto w-8 h-8 text-primary animate-pulse" />
            </div>

            <div className="space-y-2">
              <h3 className="text-2xl font-bold text-foreground">{loadingMessage}</h3>
              <p className="text-muted-foreground">Please wait while our AI analyzes your property...</p>
            </div>

            <div className="space-y-2">
              <Progress value={progress} className="h-3" />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>Analysis</span>
                <span>{Math.round(progress)}%</span>
              </div>
            </div>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit} className={`space-y-6 ${isLoading ? 'opacity-20 pointer-events-none' : ''}`}>
        <Card className="border-2 shadow-lg">
          <CardContent className="pt-6 space-y-6">
            {/* Location */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-primary mb-3">
                <MapPin className="w-5 h-5 text-accent" />
                <h3 className="font-semibold text-lg">Property Location</h3>
              </div>

              <div className="space-y-4">
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
    </div>
  )
}
