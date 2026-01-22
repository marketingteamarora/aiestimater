"use client"

import ContactForm from "@/components/contact-form"

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-secondary to-background py-16">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-8 space-y-3">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground">Get in Touch</h1>
            <p className="text-lg text-muted-foreground">
              Fill out the form below and our team will respond within 24 hours.
            </p>
          </div>

          <div className="bg-card rounded-2xl shadow-2xl p-6 md:p-10 border border-border">
            <ContactForm />
          </div>
        </div>
      </div>
    </div>
  )
}
