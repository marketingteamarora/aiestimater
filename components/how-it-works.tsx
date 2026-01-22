import { Button } from "@/components/ui/button"
import { Search, FileText, BarChart, CheckCircle } from "lucide-react"
import Link from "next/link"

const steps = [
  {
    icon: Search,
    number: "01",
    title: "Enter Your Address",
    description: "Simply type in your property address or postal code to get started",
  },
  {
    icon: FileText,
    number: "02",
    title: "Property Details",
    description: "Provide basic information about your home (beds, baths, square footage)",
  },
  {
    icon: BarChart,
    number: "03",
    title: "Get Your Estimate",
    description: "Receive an instant AI-powered valuation with detailed market insights",
  },
  {
    icon: CheckCircle,
    number: "04",
    title: "Connect With Us",
    description: "Schedule a free consultation to discuss your property goals",
  },
]

export default function HowItWorks() {
  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-primary mb-4 text-balance">How It Works</h2>
          <p className="text-lg text-muted-foreground text-pretty">Get your property valuation in 4 simple steps</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {steps.map((step, index) => (
            <div key={index} className="relative">
              {/* Connector Line */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-12 left-[60%] w-[80%] h-0.5 bg-border" />
              )}

              <div className="relative z-10 text-center">
                <div className="w-24 h-24 bg-primary rounded-2xl flex items-center justify-center mx-auto mb-4 relative">
                  <step.icon className="w-10 h-10 text-accent" />
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-accent rounded-full flex items-center justify-center">
                    <span className="text-xs font-bold text-accent-foreground">{step.number}</span>
                  </div>
                </div>
                <h3 className="text-xl font-bold text-foreground mb-2">{step.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{step.description}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center">
          <Link href="/estimate">
            <Button size="lg" className="bg-accent text-accent-foreground hover:bg-gold-dark font-semibold">
              Start Your Free Estimate Now
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}
