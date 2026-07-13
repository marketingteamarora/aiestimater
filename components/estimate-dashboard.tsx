"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Progress } from "@/components/ui/progress"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  TrendingUp,
  MapPin,
  ArrowRight,
  Phone,
  Mail,
  Home,
  DollarSign,
  Calendar,
  TrendingDown,
  CheckCircle2,
  ArrowUpRight,
  ArrowDownRight,
  Eye,
  Lock,
  Lightbulb,
  Building,
} from "lucide-react"
import { XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart } from "recharts"
import { validateContactFields } from "@/lib/validation/contact"

interface EstimateData {
  // DeepSeek format
  estimate?: {
    value: number
    low: number
    high: number
  }
  // Repliers format
  estimateValue?: number
  estimateHigh?: number
  estimateLow?: number
  // Common fields
  confidence: number
  pricePerSqft?: number
  marketTrend?: string
  trendPercentage?: number
  insights?: string[]
  comparables?: Array<{
    address: string
    price: number
    sqft: number
    soldDate: string
  }>
  historicalValues?: Array<{
    month: string
    value: number
  }>
  createdOn?: string
  updatedOn?: string
  history?: {
    mth: Record<string, { value: number }>
  }
  source?: string
}

export default function EstimateDashboard() {
  const router = useRouter()
  const [propertyData, setPropertyData] = useState<any>(null)
  const [estimateData, setEstimateData] = useState<EstimateData | null>(null)
  const [isRevealed, setIsRevealed] = useState(false)
  const [showLeadForm, setShowLeadForm] = useState(false)
  const [leadData, setLeadData] = useState({ name: "", email: "", phone: "" })
  const [leadFieldErrors, setLeadFieldErrors] = useState<Record<string, string>>({})
  const [leadError, setLeadError] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    const storedPropertyData = sessionStorage.getItem("propertyData")
    const storedEstimateData = sessionStorage.getItem("estimateData")

    if (!storedPropertyData || !storedEstimateData) {
      router.push("/estimate")
      return
    }

    setPropertyData(JSON.parse(storedPropertyData))
    setEstimateData(JSON.parse(storedEstimateData))
  }, [router])

  if (!propertyData || !estimateData) {
    return null
  }

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("en-CA", {
      style: "currency",
      currency: "CAD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value)
  }

  const formatBlurredPrice = (value: number) => {
    const formatted = formatCurrency(value)
    // Show first 2 characters (e.g., "$1") and blur the rest
    return formatted.substring(0, 3) + "XX,XXX"
  }

  const handleLeadChange = (field: "name" | "email" | "phone", value: string) => {
    setLeadData((prev) => ({ ...prev, [field]: value }))
    if (leadFieldErrors[field]) {
      setLeadFieldErrors((prev) => {
        const next = { ...prev }
        delete next[field]
        return next
      })
    }
    if (leadError) setLeadError("")
  }

  const handleLeadSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLeadError("")

    const contactValidation = validateContactFields(leadData)
    if (!contactValidation.success) {
      setLeadFieldErrors(contactValidation.fieldErrors)
      setLeadError("Please enter valid contact details to unlock your report.")
      return
    }

    setLeadFieldErrors({})
    setIsSubmitting(true)

    try {
      console.log("[v0] Submitting lead to database...")

      const response = await fetch("/api/leads", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: contactValidation.data.name,
          email: contactValidation.data.email,
          phone: contactValidation.data.phone,
          propertyData: propertyData,
          estimateData: estimateData,
        }),
      })

      const result = await response.json()

      if (!response.ok) {
        console.error("[v0] Error saving lead:", result)
        if (result.fieldErrors) {
          setLeadFieldErrors(result.fieldErrors)
        }
        throw new Error(result.error || "Failed to save lead")
      }

      console.log("[v0] Lead saved successfully:", result)

      // Store lead data in session storage for UI purposes
      sessionStorage.setItem("leadData", JSON.stringify(leadData))

      setIsSubmitting(false)
      setShowLeadForm(false)
      setIsRevealed(true)
    } catch (error) {
      console.error("[v0] Error submitting lead:", error)
      setIsSubmitting(false)
      // Still reveal the data even if save fails
      setShowLeadForm(false)
      setIsRevealed(true)
    }
  }

  // Normalize estimate data to handle both DeepSeek and Repliers formats
  const estimateValue = estimateData.estimate?.value || estimateData.estimateValue || 0
  const estimateLow = estimateData.estimate?.low || estimateData.estimateLow || 0
  const estimateHigh = estimateData.estimate?.high || estimateData.estimateHigh || 0

  // Handle historical data from both formats
  const historicalData = estimateData.historicalValues
    ? estimateData.historicalValues.map((item) => ({
      month: item.month,
      value: item.value,
      formattedValue: formatCurrency(item.value),
    }))
    : estimateData.history?.mth
      ? Object.entries(estimateData.history.mth)
        .slice(-12)
        .map(([month, data]) => ({
          month: new Date(month).toLocaleDateString("en-US", { month: "short", year: "2-digit" }),
          value: data.value,
          formattedValue: formatCurrency(data.value),
        }))
      : []

  const calculateTrend = () => {
    // Use DeepSeek trend data if available
    if (estimateData.marketTrend && estimateData.trendPercentage !== undefined) {
      return {
        direction: estimateData.marketTrend,
        percentage: estimateData.trendPercentage,
      }
    }
    // Fallback to calculating from historical data
    if (historicalData.length < 2) return { direction: "stable", percentage: 0 }
    const oldest = historicalData[0].value
    const newest = historicalData[historicalData.length - 1].value
    const change = ((newest - oldest) / oldest) * 100
    return {
      direction: change > 0 ? "up" : change < 0 ? "down" : "stable",
      percentage: Math.abs(change),
    }
  }

  const trend = calculateTrend()
  const confidencePercent = Math.round(estimateData.confidence * 100)
  const priceRange = estimateHigh - estimateLow
  const priceRangePercent = estimateValue > 0 ? (priceRange / estimateValue) * 100 : 0

  const pricePerSqFt = estimateData.pricePerSqft || (propertyData.squareFeet && estimateValue > 0
    ? Math.round(estimateValue / Number.parseInt(propertyData.squareFeet))
    : null)

  // Get insights from DeepSeek or generate defaults
  const insights = estimateData.insights || [
    "Property value based on current market conditions",
    "Analysis includes comparable sales in the area",
    "Estimate accounts for property features and location"
  ]

  // Get comparables from DeepSeek if available
  const comparables = estimateData.comparables || []

  return (
    <div className="min-h-screen bg-gradient-to-b from-secondary via-white to-secondary/30 py-8 md:py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-7xl mx-auto space-y-6">
          <div className="text-center space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <Badge className="bg-secondary text-primary border-border text-base px-4 py-2 font-medium">
              <CheckCircle2 className="w-4 h-4 mr-2 inline text-accent" />
              AI Analysis Complete
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold text-primary tracking-tight">Your Property Valuation</h1>
            <div className="flex items-center justify-center gap-2 text-muted-foreground">
              <MapPin className="w-5 h-5 text-accent" />
              <p className="text-lg md:text-xl font-medium">
                {propertyData.streetNumber} {propertyData.streetName}, {propertyData.city}
              </p>
            </div>
          </div>

          <div className="relative">
            <Card className="border border-border/50 shadow-hover bg-white overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-700 delay-150">
              <div className="absolute top-0 right-0 w-64 h-64 bg-accent/5 rounded-full blur-3xl -z-10" />
              <CardHeader className="text-center pb-6 relative">
                <div className="flex items-center justify-center gap-2 mb-3">
                  <TrendingUp className="w-6 h-6 text-accent" />
                  <CardTitle className="text-2xl md:text-3xl font-bold tracking-tight text-primary">Estimated Market Value</CardTitle>
                </div>
                <CardDescription className="text-base font-medium">
                  Based on recent comparable sales and current market conditions
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-8">
                <div className="text-center space-y-4 p-8 bg-secondary/50 rounded-2xl border border-border/50">
                  <div className="text-5xl md:text-7xl font-bold text-primary tracking-tight">
                    {isRevealed ? formatCurrency(estimateValue) : formatBlurredPrice(estimateValue)}
                  </div>
                  <div className="space-y-2">
                    <p className="text-muted-foreground text-lg font-medium" style={{ filter: isRevealed ? "none" : "blur(8px)" }}>
                      Estimated range: {formatCurrency(estimateLow)} - {formatCurrency(estimateHigh)}
                    </p>
                    <div className="flex items-center justify-center gap-4 flex-wrap mt-4">
                      <Badge
                        variant="outline"
                        className="text-base px-4 py-1.5 border-green-600/30 bg-green-50/50 text-green-700"
                        style={{ filter: isRevealed ? "none" : "blur(8px)" }}
                      >
                        <CheckCircle2 className="w-4 h-4 mr-2" />
                        <span className="font-semibold">{confidencePercent}% Confidence</span>
                      </Badge>
                      {pricePerSqFt && (
                        <Badge
                          variant="outline"
                          className="text-base px-4 py-1.5 border-primary/20 bg-primary/5 text-primary"
                          style={{ filter: isRevealed ? "none" : "blur(8px)" }}
                        >
                          <Home className="w-4 h-4 mr-2" />
                          <span className="font-semibold">{formatCurrency(pricePerSqFt)}/sq ft</span>
                        </Badge>
                      )}
                    </div>
                    <p className="text-xs text-muted-foreground mt-6" style={{ filter: isRevealed ? "none" : "blur(8px)" }}>
                      Disclaimer: This is an automated estimate based on available market data.
                    </p>
                  </div>
                </div>

                <Separator />

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="p-5 bg-white rounded-xl text-center border border-border/50 shadow-soft hover:shadow-hover transition-all">
                    <p className="text-sm font-medium text-muted-foreground mb-1 uppercase tracking-wider">Bedrooms</p>
                    <p className="font-bold text-3xl text-primary">{propertyData.bedrooms}</p>
                  </div>
                  <div className="p-5 bg-white rounded-xl text-center border border-border/50 shadow-soft hover:shadow-hover transition-all">
                    <p className="text-sm font-medium text-muted-foreground mb-1 uppercase tracking-wider">Bathrooms</p>
                    <p className="font-bold text-3xl text-primary">{propertyData.bathrooms}</p>
                  </div>
                  <div className="p-5 bg-white rounded-xl text-center border border-border/50 shadow-soft hover:shadow-hover transition-all">
                    <p className="text-sm font-medium text-muted-foreground mb-1 uppercase tracking-wider">Square Feet</p>
                    <p className="font-bold text-3xl text-primary">{propertyData.squareFeet}</p>
                  </div>
                  <div className="p-5 bg-white rounded-xl text-center border border-border/50 shadow-soft hover:shadow-hover transition-all">
                    <p className="text-sm font-medium text-muted-foreground mb-1 uppercase tracking-wider">Year Built</p>
                    <p className="font-bold text-3xl text-primary">{propertyData.yearBuilt}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {!isRevealed && (
              <div className="absolute inset-0 bg-white/80 backdrop-blur-md rounded-xl flex items-center justify-center p-4 z-10 border border-white/20">
                {!showLeadForm ? (
                  <div className="text-center space-y-6 max-w-md bg-white p-10 rounded-3xl shadow-hover border border-border/50">
                    <div className="inline-flex items-center justify-center w-20 h-20 bg-primary/5 rounded-full mb-2">
                      <Lock className="w-10 h-10 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-2xl md:text-3xl font-bold text-primary mb-3">See Your Full Report</h3>
                      <p className="text-muted-foreground text-lg mb-6">
                        Get instant access to detailed insights, market trends, and comparable sales
                      </p>
                    </div>
                    <Button
                      size="lg"
                      className="bg-primary hover:bg-primary/90 text-white font-semibold text-lg px-8 py-6 shadow-xl hover:shadow-2xl transition-all w-full rounded-xl"
                      onClick={() => setShowLeadForm(true)}
                    >
                      <Eye className="w-5 h-5 mr-2" />
                      Reveal My Estimate
                      <ArrowRight className="w-5 h-5 ml-2" />
                    </Button>
                    <p className="text-sm text-muted-foreground font-medium">No credit card required • 100% Free</p>
                  </div>
                ) : (
                  <Card className="w-full max-w-md shadow-hover border border-border/50 rounded-3xl overflow-hidden">
                    <CardHeader className="text-center bg-secondary/50 border-b border-border/50 pb-6">
                      <CardTitle className="text-2xl font-bold text-primary">Unlock Your Full Report</CardTitle>
                      <CardDescription className="text-base font-medium">Enter your details to see complete valuation insights</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <form onSubmit={handleLeadSubmit} className="space-y-4">
                        {leadError && (
                          <p className="text-destructive text-sm text-center">{leadError}</p>
                        )}
                        <div className="space-y-2">
                          <Label htmlFor="name">Full Name</Label>
                          <Input
                            id="name"
                            placeholder="John Smith"
                            value={leadData.name}
                            onChange={(e) => handleLeadChange("name", e.target.value)}
                            required
                            aria-invalid={!!leadFieldErrors.name}
                            className="h-12"
                          />
                          {leadFieldErrors.name && (
                            <p className="text-destructive text-sm">{leadFieldErrors.name}</p>
                          )}
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="email">Email Address</Label>
                          <Input
                            id="email"
                            type="email"
                            placeholder="john@example.com"
                            value={leadData.email}
                            onChange={(e) => handleLeadChange("email", e.target.value)}
                            required
                            aria-invalid={!!leadFieldErrors.email}
                            className="h-12"
                          />
                          {leadFieldErrors.email && (
                            <p className="text-destructive text-sm">{leadFieldErrors.email}</p>
                          )}
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="phone">Phone Number</Label>
                          <Input
                            id="phone"
                            type="tel"
                            inputMode="tel"
                            placeholder="(647) 555-1234"
                            value={leadData.phone}
                            onChange={(e) => handleLeadChange("phone", e.target.value)}
                            required
                            aria-invalid={!!leadFieldErrors.phone}
                            className="h-12"
                          />
                          {leadFieldErrors.phone && (
                            <p className="text-destructive text-sm">{leadFieldErrors.phone}</p>
                          )}
                        </div>
                        <Button
                          type="submit"
                          size="lg"
                          className="w-full bg-primary hover:bg-primary/90 text-white font-semibold text-lg h-12 mt-6"
                          disabled={isSubmitting}
                        >
                          {isSubmitting ? (
                            <>
                              <span className="animate-spin mr-2">⏳</span>
                              Revealing...
                            </>
                          ) : (
                            <>
                              <Eye className="w-5 h-5 mr-2" />
                              Reveal Full Report
                            </>
                          )}
                        </Button>
                        <p className="text-xs text-center text-muted-foreground mt-4">
                          By submitting, you agree to receive updates from PropValue AI
                        </p>
                      </form>
                    </CardContent>
                  </Card>
                )}
              </div>
            )}
          </div>

          <div
            className="grid md:grid-cols-3 gap-6 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-300"
            style={{ filter: isRevealed ? "none" : "blur(8px)", pointerEvents: isRevealed ? "auto" : "none" }}
          >
            <Card className="border border-border/50 shadow-soft hover:shadow-hover transition-all bg-white">
              <CardHeader className="pb-3 border-b border-border/30">
                <CardTitle className="text-lg flex items-center gap-2 font-bold text-primary">
                  <CheckCircle2 className="w-5 h-5 text-accent" />
                  AI Confidence
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 pt-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground font-medium">Prediction Accuracy</span>
                    <span className="font-bold text-primary">{confidencePercent}%</span>
                  </div>
                  <Progress value={confidencePercent} className="h-2.5 bg-secondary" />
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {confidencePercent >= 90
                    ? "Excellent confidence - highly reliable estimate based on strong local data."
                    : confidencePercent >= 80
                      ? "Very good confidence - reliable estimate based on recent comparable sales."
                      : "Good confidence - solid estimate based on available market data."}
                </p>
              </CardContent>
            </Card>

            <Card className="border border-border/50 shadow-soft hover:shadow-hover transition-all bg-white">
              <CardHeader className="pb-3 border-b border-border/30">
                <CardTitle className="text-lg flex items-center gap-2 font-bold text-primary">
                  {trend.direction === "up" ? (
                    <TrendingUp className="w-5 h-5 text-green-600" />
                  ) : trend.direction === "down" ? (
                    <TrendingDown className="w-5 h-5 text-red-600" />
                  ) : (
                    <TrendingUp className="w-5 h-5 text-accent" />
                  )}
                  Market Trend
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 pt-4">
                <div className="flex items-baseline gap-2">
                  <span className="text-4xl font-bold text-primary">
                    {trend.direction === "up" ? "+" : trend.direction === "down" ? "-" : ""}
                    {trend.percentage.toFixed(1)}%
                  </span>
                  <span className="text-sm font-medium text-muted-foreground uppercase tracking-wider">past 12 mos</span>
                </div>
                <div className="flex items-center gap-2">
                  {trend.direction === "up" ? (
                    <ArrowUpRight className="w-4 h-4 text-green-600" />
                  ) : trend.direction === "down" ? (
                    <ArrowDownRight className="w-4 h-4 text-red-600" />
                  ) : null}
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {trend.direction === "up"
                      ? "Property values in this area are currently increasing."
                      : trend.direction === "down"
                        ? "Property values in this area are currently decreasing."
                        : "Property values in this area are currently stable."}
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="border border-border/50 shadow-soft hover:shadow-hover transition-all bg-white">
              <CardHeader className="pb-3 border-b border-border/30">
                <CardTitle className="text-lg flex items-center gap-2 font-bold text-primary">
                  <DollarSign className="w-5 h-5 text-accent" />
                  Price Range
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 pt-4">
                <div className="flex items-baseline gap-2">
                  <span className="text-4xl font-bold text-primary">{formatCurrency(priceRange)}</span>
                </div>
                <p className="text-sm font-medium text-muted-foreground">±{priceRangePercent.toFixed(1)}% variance from estimate</p>
                <div className="pt-3 space-y-2 border-t border-border/30">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground font-medium">Low Estimate</span>
                    <span className="font-bold text-primary">{formatCurrency(estimateLow)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground font-medium">High Estimate</span>
                    <span className="font-bold text-primary">{formatCurrency(estimateHigh)}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {historicalData.length > 0 && (
            <Card
              className="animate-in fade-in slide-in-from-bottom-4 duration-700 delay-450 border border-border/50 shadow-soft bg-white"
              style={{ filter: isRevealed ? "none" : "blur(8px)", pointerEvents: isRevealed ? "auto" : "none" }}
            >
              <CardHeader className="border-b border-border/30 pb-5">
                <div className="flex items-center justify-between flex-wrap gap-4">
                  <div>
                    <CardTitle className="flex items-center gap-2 text-2xl font-bold text-primary">
                      <TrendingUp className="w-6 h-6 text-accent" />
                      12-Month Value History
                    </CardTitle>
                    <CardDescription className="mt-2 text-base font-medium">
                      Estimated property values showing market trends over time
                    </CardDescription>
                  </div>
                  <Badge variant="outline" className="text-sm border-border bg-secondary/50 text-muted-foreground px-3 py-1">
                    <Calendar className="w-4 h-4 mr-2" />
                    <span>Last updated: {new Date().toLocaleDateString()}</span>
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="pt-6">
                <ResponsiveContainer width="100%" height={350}>
                  <AreaChart data={historicalData}>
                    <defs>
                      <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#2563eb" stopOpacity={0.15} />
                        <stop offset="95%" stopColor="#2563eb" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e4e4e7" vertical={false} />
                    <XAxis dataKey="month" stroke="#71717a" style={{ fontSize: "12px" }} tickLine={false} axisLine={false} dy={10} />
                    <YAxis
                      stroke="#71717a"
                      tickFormatter={(value) => `$${(value / 1000).toFixed(0)}K`}
                      style={{ fontSize: "12px" }}
                      tickLine={false}
                      axisLine={false}
                      dx={-10}
                    />
                    <Tooltip
                      formatter={(value: number) => [formatCurrency(value), "Estimated Value"]}
                      contentStyle={{
                        backgroundColor: "#ffffff",
                        border: "1px solid #e4e4e7",
                        borderRadius: "8px",
                        padding: "12px",
                        boxShadow: "0 4px 20px -2px rgba(10, 22, 40, 0.05)",
                      }}
                      labelStyle={{ fontWeight: "600", color: "#09090b", marginBottom: "4px" }}
                    />
                    <Area
                      type="monotone"
                      dataKey="value"
                      stroke="#2563eb"
                      strokeWidth={3}
                      fill="url(#colorValue)"
                      dot={{ fill: "#ffffff", r: 4, strokeWidth: 2, stroke: "#2563eb" }}
                      activeDot={{ r: 6, strokeWidth: 2, fill: "#2563eb", stroke: "#ffffff" }}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          )}

          {/* Market Insights Section */}
          {insights.length > 0 && (
            <Card
              className="animate-in fade-in slide-in-from-bottom-4 duration-700 delay-500 border border-border/50 shadow-soft bg-white"
              style={{ filter: isRevealed ? "none" : "blur(8px)", pointerEvents: isRevealed ? "auto" : "none" }}
            >
              <CardHeader className="border-b border-border/30 pb-5">
                <CardTitle className="flex items-center gap-2 text-2xl font-bold text-primary">
                  <Lightbulb className="w-6 h-6 text-accent" />
                  AI-Powered Insights
                </CardTitle>
                <CardDescription className="text-base font-medium">Key factors affecting your property value</CardDescription>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="grid md:grid-cols-3 gap-6">
                  {insights.map((insight, index) => (
                    <div
                      key={index}
                      className="p-5 bg-secondary/30 rounded-xl border border-border/50 shadow-sm"
                    >
                      <div className="flex items-start gap-4">
                        <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center flex-shrink-0 shadow-sm border border-border/50">
                          <CheckCircle2 className="w-5 h-5 text-accent" />
                        </div>
                        <p className="text-sm font-medium text-primary leading-relaxed pt-1">{insight}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Comparable Sales Section */}
          {comparables.length > 0 && (
            <Card
              className="animate-in fade-in slide-in-from-bottom-4 duration-700 delay-550 border border-border/50 shadow-soft bg-white"
              style={{ filter: isRevealed ? "none" : "blur(8px)", pointerEvents: isRevealed ? "auto" : "none" }}
            >
              <CardHeader className="border-b border-border/30 pb-5">
                <CardTitle className="flex items-center gap-2 text-2xl font-bold text-primary">
                  <Building className="w-6 h-6 text-accent" />
                  Comparable Sales
                </CardTitle>
                <CardDescription className="text-base font-medium">Recent sales of similar properties in your area</CardDescription>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {comparables.map((comp, index) => (
                    <div
                      key={index}
                      className="p-5 bg-white rounded-xl border border-border/50 shadow-soft hover:shadow-hover transition-all"
                    >
                      <div className="space-y-3">
                        <p className="font-bold text-primary text-base leading-tight">{comp.address}</p>
                        <div className="flex items-baseline gap-2">
                          <span className="text-2xl font-bold text-accent">{formatCurrency(comp.price)}</span>
                        </div>
                        <div className="flex items-center gap-4 text-sm font-medium text-muted-foreground pt-2 border-t border-border/30">
                          <span className="flex items-center gap-1"><Home className="w-4 h-4" /> {comp.sqft.toLocaleString()} sq ft</span>
                          <span className="flex items-center gap-1"><Calendar className="w-4 h-4" /> {comp.soldDate}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          <Card className="bg-primary text-white border-0 shadow-2xl overflow-hidden relative animate-in fade-in slide-in-from-bottom-4 duration-700 delay-600 rounded-3xl">
            <div className="absolute inset-0 z-0 opacity-20">
              <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff1a_1px,transparent_1px),linear-gradient(to_bottom,#ffffff1a_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
            </div>
            <CardContent className="p-10 md:p-16 relative z-10">
              <div className="max-w-3xl mx-auto text-center space-y-8">
                <div className="inline-flex items-center justify-center gap-2 mb-2 bg-white/10 border border-white/20 px-5 py-2 rounded-full backdrop-blur-md">
                  <TrendingUp className="w-4 h-4 text-accent" />
                  <span className="text-white font-semibold text-sm uppercase tracking-wider">Next Steps</span>
                </div>
                <h2 className="text-4xl md:text-5xl font-bold leading-[1.1] tracking-tight">
                  Ready to Turn This Estimate Into Reality?
                </h2>
                <p className="text-xl text-white/70 leading-relaxed font-light">
                  Get personalized insights, detailed market analysis, and expert recommendations to maximize your property's value.
                </p>
                <div className="flex flex-col sm:flex-row gap-5 justify-center pt-6">
                  <Button
                    size="lg"
                    className="bg-accent text-primary hover:bg-accent/90 font-bold text-lg px-8 h-14 rounded-xl shadow-xl transition-all"
                    onClick={() => router.push("/contact")}
                  >
                    <Phone className="w-5 h-5 mr-2" />
                    Schedule Free Consultation
                  </Button>
                  <Button
                    size="lg"
                    variant="outline"
                    className="bg-white/5 text-white border-white/20 hover:bg-white/10 backdrop-blur-md font-bold text-lg px-8 h-14 rounded-xl"
                    onClick={() => router.push("/contact")}
                  >
                    <Mail className="w-5 h-5 mr-2" />
                    Email Our Team
                  </Button>
                </div>
                <p className="text-sm text-white/50 font-medium pt-4">
                  Serving Brampton, Mississauga, and Cambridge with excellence
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
