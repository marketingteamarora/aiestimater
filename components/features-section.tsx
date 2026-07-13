import { BarChart3, Clock, Shield, TrendingUp, MapPin, Bell } from "lucide-react"

const features = [
  {
    icon: BarChart3,
    title: "AI-Powered Accuracy",
    description: "Advanced algorithms analyze thousands of local data points for precise valuations",
  },
  {
    icon: Clock,
    title: "Instant Results",
    description: "Get your property estimate in seconds, not days",
  },
  {
    icon: Shield,
    title: "Trusted & Secure",
    description: "Your information is protected with bank-level security",
  },
  {
    icon: TrendingUp,
    title: "Market Trends",
    description: "24-month historical data and future projections",
  },
  {
    icon: MapPin,
    title: "Local Expertise",
    description: "Specialized knowledge of Brampton, Mississauga, and Cambridge markets",
  },
  {
    icon: Bell,
    title: "Monthly Updates",
    description: "Stay informed with regular valuation updates",
  },
]

export default function FeaturesSection() {
  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-primary mb-6 tracking-tight text-balance">
            Why Choose GetHomeEvaluation.ca?
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground text-pretty font-light">
            Cutting-edge technology analyzing millions of data points for accurate valuations
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-secondary p-8 rounded-xl border border-border hover:shadow-soft transition-all group"
            >
              <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center mb-6 shadow-sm border border-border">
                <feature.icon className="w-6 h-6 text-accent" />
              </div>
              <h3 className="text-xl font-bold text-primary mb-3">{feature.title}</h3>
              <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
