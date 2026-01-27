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
  Sparkles,
  Brain,
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

  const handleLeadSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      console.log("[v0] Submitting lead to database...")

      const response = await fetch("/api/leads", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: leadData.name,
          email: leadData.email,
          phone: leadData.phone,
          propertyData: propertyData,
          estimateData: estimateData,
        }),
      })

      const result = await response.json()

      if (!response.ok) {
        console.error("[v0] Error saving lead:", result)
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
            <Badge className="bg-primary/10 text-primary border-primary/20 text-base px-4 py-2 animate-pulse">
              <Brain className="w-4 h-4 mr-2 inline text-primary" />
              AI Analysis Complete
            </Badge>
            <h1 className="text-3xl md:text-5xl font-bold text-foreground">Your Property Valuation</h1>
            <div className="flex items-center justify-center gap-2 text-muted-foreground">
              <MapPin className="w-5 h-5 text-primary" />
              <p className="text-lg md:text-xl">
                {propertyData.streetNumber} {propertyData.streetName}, {propertyData.city}
              </p>
            </div>
          </div>

          <div className="relative">
            <Card className="border-2 border-accent/30 shadow-2xl bg-gradient-to-br from-white via-accent/5 to-white overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-700 delay-150">
              <div className="absolute top-0 right-0 w-64 h-64 bg-accent/5 rounded-full blur-3xl -z-10" />
              <CardHeader className="text-center pb-6 relative">
                <div className="flex items-center justify-center gap-2 mb-3">
                  <Sparkles className="w-6 h-6 text-primary animate-pulse" />
                  <CardTitle className="text-2xl md:text-3xl">AI-Calculated Market Value</CardTitle>
                </div>
                <CardDescription className="text-base">
                  Powered by advanced machine learning algorithms analyzing thousands of data points
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-8">
                <div className="text-center space-y-4 p-6 bg-gradient-to-br from-accent/10 to-accent/5 rounded-2xl border border-accent/20">
                  <div className="text-5xl md:text-7xl font-bold text-primary tracking-tight">
                    {isRevealed ? formatCurrency(estimateValue) : formatBlurredPrice(estimateValue)}
                  </div>
                  <div className="space-y-2">
                    <p className="text-muted-foreground text-lg" style={{ filter: isRevealed ? "none" : "blur(8px)" }}>
                      Estimated range: {formatCurrency(estimateLow)} - {formatCurrency(estimateHigh)}
                    </p>
                    <div className="flex items-center justify-center gap-4 flex-wrap">
                      <Badge
                        variant="outline"
                        className="text-base px-4 py-1 border-green-600/30 bg-green-50"
                        style={{ filter: isRevealed ? "none" : "blur(8px)" }}
                      >
                        <CheckCircle2 className="w-4 h-4 mr-2 text-green-600" />
                        <span className="text-foreground">{confidencePercent}% Confidence</span>
                      </Badge>
                      {pricePerSqFt && (
                        <Badge
                          variant="outline"
                          className="text-base px-4 py-1 border-primary/30 bg-primary/5"
                          style={{ filter: isRevealed ? "none" : "blur(8px)" }}
                        >
                          <Home className="w-4 h-4 mr-2 text-primary" />
                          <span className="text-foreground">{formatCurrency(pricePerSqFt)}/sq ft</span>
                        </Badge>
                      )}
                    </div>
                    <p className="text-xs text-muted-foreground mt-4 italic" style={{ filter: isRevealed ? "none" : "blur(8px)" }}>
                      Disclaimer: This is an automated estimate based on available market data.
                    </p>
                  </div>
                </div>

                <Separator />

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="p-4 bg-gradient-to-br from-secondary to-secondary/50 rounded-xl text-center border border-border/50 hover:border-accent/30 transition-colors">
                    <p className="text-sm text-muted-foreground mb-1">Bedrooms</p>
                    <p className="font-bold text-2xl text-foreground">{propertyData.bedrooms}</p>
                  </div>
                  <div className="p-4 bg-gradient-to-br from-secondary to-secondary/50 rounded-xl text-center border border-border/50 hover:border-accent/30 transition-colors">
                    <p className="text-sm text-muted-foreground mb-1">Bathrooms</p>
                    <p className="font-bold text-2xl text-foreground">{propertyData.bathrooms}</p>
                  </div>
                  <div className="p-4 bg-gradient-to-br from-secondary to-secondary/50 rounded-xl text-center border border-border/50 hover:border-accent/30 transition-colors">
                    <p className="text-sm text-muted-foreground mb-1">Square Feet</p>
                    <p className="font-bold text-2xl text-foreground">{propertyData.squareFeet}</p>
                  </div>
                  <div className="p-4 bg-gradient-to-br from-secondary to-secondary/50 rounded-xl text-center border border-border/50 hover:border-accent/30 transition-colors">
                    <p className="text-sm text-muted-foreground mb-1">Year Built</p>
                    <p className="font-bold text-2xl text-foreground">{propertyData.yearBuilt}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {!isRevealed && (
              <div className="absolute inset-0 bg-white/95 backdrop-blur-sm rounded-xl flex items-center justify-center p-4 z-10">
                {!showLeadForm ? (
                  <div className="text-center space-y-6 max-w-md">
                    <div className="inline-flex items-center justify-center w-20 h-20 bg-accent/20 rounded-full mb-4">
                      <Lock className="w-10 h-10 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-3">See Your Full Report</h3>
                      <p className="text-muted-foreground text-lg mb-6">
                        Get instant access to detailed insights, market trends, and comparable sales
                      </p>
                    </div>
                    <Button
                      size="lg"
                      className="bg-primary hover:bg-primary/90 text-white font-semibold text-lg px-8 py-6 shadow-xl hover:shadow-2xl transition-all hover:scale-105 w-full"
                      onClick={() => setShowLeadForm(true)}
                    >
                      <Eye className="w-5 h-5 mr-2" />
                      Reveal My Estimate
                      <ArrowRight className="w-5 h-5 ml-2" />
                    </Button>
                    <p className="text-sm text-muted-foreground">No credit card required • 100% Free</p>
                  </div>
                ) : (
                  <Card className="w-full max-w-md shadow-2xl border-2 border-accent/30">
                    <CardHeader className="text-center">
                      <CardTitle className="text-2xl">Unlock Your Full Report</CardTitle>
                      <CardDescription>Enter your details to see complete valuation insights</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <form onSubmit={handleLeadSubmit} className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="name">Full Name</Label>
                          <Input
                            id="name"
                            placeholder="John Smith"
                            value={leadData.name}
                            onChange={(e) => setLeadData({ ...leadData, name: e.target.value })}
                            required
                            className="h-12"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="email">Email Address</Label>
                          <Input
                            id="email"
                            type="email"
                            placeholder="john@example.com"
                            value={leadData.email}
                            onChange={(e) => setLeadData({ ...leadData, email: e.target.value })}
                            required
                            className="h-12"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="phone">Phone Number</Label>
                          <Input
                            id="phone"
                            type="tel"
                            placeholder="(555) 123-4567"
                            value={leadData.phone}
                            onChange={(e) => setLeadData({ ...leadData, phone: e.target.value })}
                            required
                            className="h-12"
                          />
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
            <Card className="border-accent/20 hover:border-accent/40 transition-colors">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg flex items-center gap-2">
                  <Brain className="w-5 h-5 text-primary" />
                  AI Confidence
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Prediction Accuracy</span>
                    <span className="font-semibold text-primary">{confidencePercent}%</span>
                  </div>
                  <Progress value={confidencePercent} className="h-3" />
                </div>
                <p className="text-sm text-muted-foreground">
                  {confidencePercent >= 90
                    ? "Excellent confidence - highly reliable estimate"
                    : confidencePercent >= 80
                      ? "Very good confidence - reliable estimate"
                      : "Good confidence - solid estimate"}
                </p>
              </CardContent>
            </Card>

            <Card className="border-accent/20 hover:border-accent/40 transition-colors">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg flex items-center gap-2">
                  {trend.direction === "up" ? (
                    <TrendingUp className="w-5 h-5 text-green-600" />
                  ) : trend.direction === "down" ? (
                    <TrendingDown className="w-5 h-5 text-red-600" />
                  ) : (
                    <TrendingUp className="w-5 h-5 text-primary" />
                  )}
                  Market Trend
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-bold text-foreground">
                    {trend.direction === "up" ? "+" : trend.direction === "down" ? "-" : ""}
                    {trend.percentage.toFixed(1)}%
                  </span>
                  <span className="text-sm text-muted-foreground">past 12 months</span>
                </div>
                <div className="flex items-center gap-2">
                  {trend.direction === "up" ? (
                    <ArrowUpRight className="w-4 h-4 text-green-600" />
                  ) : trend.direction === "down" ? (
                    <ArrowDownRight className="w-4 h-4 text-red-600" />
                  ) : null}
                  <p className="text-sm text-muted-foreground">
                    {trend.direction === "up"
                      ? "Property values are increasing"
                      : trend.direction === "down"
                        ? "Property values are decreasing"
                        : "Property values are stable"}
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="border-accent/20 hover:border-accent/40 transition-colors">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg flex items-center gap-2">
                  <DollarSign className="w-5 h-5 text-primary" />
                  Price Range
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-bold text-foreground">{formatCurrency(priceRange)}</span>
                </div>
                <p className="text-sm text-muted-foreground">±{priceRangePercent.toFixed(1)}% variance from estimate</p>
                <div className="pt-2 space-y-1">
                  <div className="flex justify-between text-xs">
                    <span className="text-muted-foreground">Low</span>
                    <span className="font-medium">{formatCurrency(estimateLow)}</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-muted-foreground">High</span>
                    <span className="font-medium">{formatCurrency(estimateHigh)}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {historicalData.length > 0 && (
            <Card
              className="animate-in fade-in slide-in-from-bottom-4 duration-700 delay-450"
              style={{ filter: isRevealed ? "none" : "blur(8px)", pointerEvents: isRevealed ? "auto" : "none" }}
            >
              <CardHeader>
                <div className="flex items-center justify-between flex-wrap gap-4">
                  <div>
                    <CardTitle className="flex items-center gap-2 text-xl">
                      <TrendingUp className="w-5 h-5 text-primary" />
                      12-Month Value History
                    </CardTitle>
                    <CardDescription className="mt-1">
                      AI-predicted property values showing market trends over time
                    </CardDescription>
                  </div>
                  <Badge variant="outline" className="text-sm border-primary/30 bg-primary/5">
                    <Calendar className="w-4 h-4 mr-2 text-primary" />
                    <span className="text-foreground">Last updated: {new Date().toLocaleDateString()}</span>
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={350}>
                  <AreaChart data={historicalData}>
                    <defs>
                      <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#d4af37" stopOpacity={0.3} />
                        <stop offset="95%" stopColor="#d4af37" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e9ecef" />
                    <XAxis dataKey="month" stroke="#6c757d" style={{ fontSize: "12px" }} />
                    <YAxis
                      stroke="#6c757d"
                      tickFormatter={(value) => `$${(value / 1000).toFixed(0)}K`}
                      style={{ fontSize: "12px" }}
                    />
                    <Tooltip
                      formatter={(value: number) => [formatCurrency(value), "Estimated Value"]}
                      contentStyle={{
                        backgroundColor: "#ffffff",
                        border: "1px solid #d4af37",
                        borderRadius: "12px",
                        padding: "12px",
                        boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
                      }}
                      labelStyle={{ fontWeight: "bold", marginBottom: "4px" }}
                    />
                    <Area
                      type="monotone"
                      dataKey="value"
                      stroke="#d4af37"
                      strokeWidth={3}
                      fill="url(#colorValue)"
                      dot={{ fill: "#d4af37", r: 4, strokeWidth: 2, stroke: "#fff" }}
                      activeDot={{ r: 6, strokeWidth: 2 }}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          )}

          {/* AI Insights Section */}
          {insights.length > 0 && (
            <Card
              className="animate-in fade-in slide-in-from-bottom-4 duration-700 delay-500"
              style={{ filter: isRevealed ? "none" : "blur(8px)", pointerEvents: isRevealed ? "auto" : "none" }}
            >
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-xl">
                  <Lightbulb className="w-5 h-5 text-primary" />
                  AI-Powered Insights
                </CardTitle>
                <CardDescription>Key factors affecting your property value</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-3 gap-4">
                  {insights.map((insight, index) => (
                    <div
                      key={index}
                      className="p-4 bg-gradient-to-br from-secondary to-secondary/50 rounded-xl border border-border/50"
                    >
                      <div className="flex items-start gap-3">
                        <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                          <CheckCircle2 className="w-4 h-4 text-primary" />
                        </div>
                        <p className="text-sm text-foreground">{insight}</p>
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
              className="animate-in fade-in slide-in-from-bottom-4 duration-700 delay-550"
              style={{ filter: isRevealed ? "none" : "blur(8px)", pointerEvents: isRevealed ? "auto" : "none" }}
            >
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-xl">
                  <Building className="w-5 h-5 text-primary" />
                  Comparable Sales
                </CardTitle>
                <CardDescription>Recent sales of similar properties in your area</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {comparables.map((comp, index) => (
                    <div
                      key={index}
                      className="p-4 bg-gradient-to-br from-secondary to-secondary/50 rounded-xl border border-border/50 hover:border-accent/30 transition-colors"
                    >
                      <div className="space-y-2">
                        <p className="font-medium text-foreground text-sm">{comp.address}</p>
                        <div className="flex items-baseline gap-2">
                          <span className="text-xl font-bold text-primary">{formatCurrency(comp.price)}</span>
                        </div>
                        <div className="flex items-center gap-4 text-xs text-muted-foreground">
                          <span>{comp.sqft.toLocaleString()} sq ft</span>
                          <span>Sold {comp.soldDate}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          <Card className="bg-gradient-to-br from-primary via-primary to-primary/90 text-white border-0 shadow-2xl overflow-hidden relative animate-in fade-in slide-in-from-bottom-4 duration-700 delay-600">
            <div className="absolute top-0 right-0 w-96 h-96 bg-accent/10 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent/10 rounded-full blur-3xl" />
            <CardContent className="p-8 md:p-12 relative z-10">
              <div className="max-w-3xl mx-auto text-center space-y-6">
                <div className="inline-flex items-center justify-center gap-2 mb-4 bg-accent/20 px-4 py-2 rounded-full">
                  <Sparkles className="w-5 h-5 text-accent" />
                  <span className="text-accent font-semibold">Next Steps</span>
                </div>
                <h2 className="text-3xl md:text-5xl font-bold leading-tight">
                  Ready to Turn This Estimate Into Reality?
                </h2>
                <p className="text-lg md:text-xl text-white/90 leading-relaxed">
                  Get personalized insights, detailed market analysis, and expert recommendations to maximize your property's value.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center pt-6">
                  <Button
                    size="lg"
                    className="bg-accent text-primary hover:bg-accent/90 font-semibold text-lg px-8 py-6 shadow-xl hover:shadow-2xl transition-all hover:scale-105"
                    onClick={() => router.push("/contact")}
                  >
                    <Phone className="w-5 h-5 mr-2" />
                    Schedule Free Consultation
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                  <Button
                    size="lg"
                    variant="outline"
                    className="bg-white/10 text-white border-white/30 hover:bg-white/20 backdrop-blur-sm font-semibold text-lg px-8 py-6"
                    onClick={() => router.push("/contact")}
                  >
                    <Mail className="w-5 h-5 mr-2" />
                    Email Our Team
                  </Button>
                </div>
                <p className="text-sm text-white/70 pt-4">
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
