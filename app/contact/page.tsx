import type { Metadata } from "next"
import ContactForm from "@/components/contact-form"

export const metadata: Metadata = {
  title: "Contact Us — Free Home Evaluation Consultation",
  description:
    "Get in touch with our Ontario real estate experts. Schedule a free home evaluation consultation for your Brampton, Mississauga, Toronto, or Scarborough property.",
  alternates: {
    canonical: "/contact",
  },
}

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-secondary to-background py-16">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-8 space-y-3">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground">
              Talk to a Local Expert
            </h1>
            <p className="text-lg text-muted-foreground">
              Want a more detailed home evaluation? Our RE/MAX Optimum Realty agents specialize in
              Ontario real estate and will respond within 24 hours.
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
