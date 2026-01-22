"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/hooks/use-toast"
import { Send } from "lucide-react"

export default function ContactForm() {
  const { toast } = useToast()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    propertyAddress: "",
    interestedIn: "",
    message: "",
  })

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      console.log("[v0] Submitting contact form to database...")

      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: `${formData.firstName} ${formData.lastName}`,
          email: formData.email,
          phone: formData.phone,
          message: `${formData.interestedIn ? `Interested in: ${formData.interestedIn}\n` : ""}${formData.propertyAddress ? `Property: ${formData.propertyAddress}\n\n` : ""}${formData.message}`,
          preferredContact: formData.interestedIn,
        }),
      })

      const result = await response.json()

      if (!response.ok) {
        console.error("[v0] Error saving contact submission:", result)
        throw new Error(result.error || "Failed to save contact submission")
      }

      console.log("[v0] Contact submission saved successfully:", result)

      toast({
        title: "Message Sent Successfully!",
        description: "We'll get back to you within 24 hours.",
      })

      // Reset form
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        propertyAddress: "",
        interestedIn: "",
        message: "",
      })
    } catch (error) {
      console.error("[v0] Error submitting contact form:", error)
      toast({
        title: "Error",
        description: "Failed to send message. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="firstName">First Name</Label>
          <Input
            id="firstName"
            placeholder="John"
            value={formData.firstName}
            onChange={(e) => handleChange("firstName", e.target.value)}
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="lastName">Last Name</Label>
          <Input
            id="lastName"
            placeholder="Doe"
            value={formData.lastName}
            onChange={(e) => handleChange("lastName", e.target.value)}
            required
          />
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            placeholder="john@example.com"
            value={formData.email}
            onChange={(e) => handleChange("email", e.target.value)}
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="phone">Phone Number</Label>
          <Input
            id="phone"
            type="tel"
            placeholder="(647) 555-1234"
            value={formData.phone}
            onChange={(e) => handleChange("phone", e.target.value)}
            required
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="propertyAddress">Property Address (Optional)</Label>
        <Input
          id="propertyAddress"
          placeholder="123 Main Street, Brampton, ON"
          value={formData.propertyAddress}
          onChange={(e) => handleChange("propertyAddress", e.target.value)}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="interestedIn">I'm Interested In</Label>
        <Select value={formData.interestedIn} onValueChange={(value) => handleChange("interestedIn", value)} required>
          <SelectTrigger id="interestedIn">
            <SelectValue placeholder="Select an option" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="selling">Selling My Home</SelectItem>
            <SelectItem value="buying">Buying a Home</SelectItem>
            <SelectItem value="valuation">Property Valuation</SelectItem>
            <SelectItem value="consultation">Free Consultation</SelectItem>
            <SelectItem value="other">Other</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="message">Message</Label>
        <Textarea
          id="message"
          placeholder="Tell us more about what you're looking for..."
          value={formData.message}
          onChange={(e) => handleChange("message", e.target.value)}
          rows={5}
          required
        />
      </div>

      <Button
        type="submit"
        size="lg"
        className="w-full bg-accent text-accent-foreground hover:bg-gold-dark font-semibold"
        disabled={isSubmitting}
      >
        {isSubmitting ? (
          "Sending..."
        ) : (
          <>
            <Send className="w-4 h-4 mr-2" />
            Send Message
          </>
        )}
      </Button>
    </form>
  )
}
