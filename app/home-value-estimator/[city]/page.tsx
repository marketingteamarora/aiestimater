import type { Metadata } from "next"
import Link from "next/link"
import Image from "next/image"
import { MapPin, Zap, CheckCircle2, TrendingUp, Brain, Users, Star } from "lucide-react"
import { cityMarketData } from "@/lib/seo/city-market-data"
import { PARVEEN_ARORA, buildParveenPersonJsonLd, getAgentPageUrl } from "@/lib/seo/parveen-arora"

const cities = cityMarketData

export async function generateStaticParams() {
  return Object.keys(cities).map((slug) => ({ city: slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ city: string }>
}): Promise<Metadata> {
  const { city } = await params
  const config = cities[city]
  if (!config) return {}
  return {
    title: `${config.name} AI Home Value Estimator — Free Property Valuation`,
    description: `Get a free, instant home value estimate for your ${config.name} property. AI-powered tool analyzes real ${config.name} MLS data to tell you what your home is worth today. ${config.region}, Ontario.`,
    alternates: {
      canonical: `/home-value-estimator/${config.slug}`,
    },
    openGraph: {
      title: `${config.name} AI Home Value Estimator — Free Property Valuation`,
      description: `Find out what your ${config.name} home is worth in seconds. Free AI-powered valuation using real ${config.name} market data.`,
    },
  }
}

export default async function CityPage({
  params,
}: {
  params: Promise<{ city: string }>
}) {
  const { city } = await params
  const config = cities[city]

  if (!config) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">City not found</h1>
          <Link href="/" className="text-accent hover:underline">
            Go back to home
          </Link>
        </div>
      </div>
    )
  }

  const cityJsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: `${config.name} Home Value Estimator`,
    description: config.description,
    areaServed: {
      "@type": "City",
      name: config.name,
      containedInPlace: { "@type": "State", name: "Ontario" },
    },
    provider: buildParveenPersonJsonLd({ cityName: config.name }),
    url: `https://gethomeevaluation.ca/home-value-estimator/${config.slug}`,
    serviceType: "Free Home Valuation",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "CAD",
      description: `Free home value estimate for ${config.name} properties`,
    },
  }

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://gethomeevaluation.ca",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Home Value Estimator",
        item: "https://gethomeevaluation.ca/estimate",
      },
      {
        "@type": "ListItem",
        position: 3,
        name: `${config.name} Home Value Estimator`,
        item: `https://gethomeevaluation.ca/home-value-estimator/${config.slug}`,
      },
    ],
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(cityJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <main className="min-h-screen">
        {/* Hero */}
        <section className="relative bg-gradient-to-br from-primary via-primary to-blue-900 text-white py-20 overflow-hidden">
          <div className="absolute inset-0">
            <div className="absolute top-10 left-10 w-72 h-72 bg-accent/10 rounded-full blur-3xl animate-pulse" />
            <div className="absolute bottom-10 right-10 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
          </div>
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-3xl mx-auto text-center space-y-6">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 border border-white/20 rounded-full text-sm font-medium">
                <MapPin className="w-4 h-4 text-accent" />
                {config.region}, Ontario
              </div>
              <h1 className="text-4xl md:text-6xl font-bold leading-tight">
                {config.name} AI Home Value Estimator
              </h1>
              <p className="text-xl text-white/80 max-w-2xl mx-auto">
                Get a free, instant estimate of what your {config.name} home is worth today.
                AI-powered using real local market data.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
                <Link
                  href={`/estimate?city=${config.name}`}
                  className="inline-flex items-center justify-center gap-2 bg-accent text-primary font-bold text-lg px-8 py-4 rounded-xl hover:bg-yellow-400 transition-colors shadow-lg"
                >
                  <Zap className="w-5 h-5" />
                  Get Free {config.name} Estimate
                </Link>
              </div>
              <p className="text-white/50 text-sm">100% Free · No Obligation · Instant Results</p>
            </div>
          </div>
        </section>

        {/* Stats */}
        <section className="py-8 bg-primary/5 border-b border-border">
          <div className="container mx-auto px-4">
            <div className="flex flex-wrap justify-center gap-10 text-center">
              {[
                { value: config.avgPrice, label: `Avg ${config.name} Home Price` },
                { value: "95%", label: "Estimation Accuracy" },
                { value: "30 sec", label: "Instant Results" },
                { value: "Free", label: "No Cost, Ever" },
              ].map((stat) => (
                <div key={stat.label}>
                  <div className="text-2xl font-bold text-accent">{stat.value}</div>
                  <div className="text-sm text-muted-foreground mt-1">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* About the market */}
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4 max-w-4xl">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-start">
              <div>
                <h2 className="text-2xl md:text-3xl font-bold text-primary mb-4">
                  {config.name} Real Estate Market
                </h2>
                <p className="text-muted-foreground leading-relaxed">{config.description}</p>
                <div className="mt-6 flex items-center gap-2 text-sm font-medium bg-accent/10 text-primary px-4 py-2 rounded-lg">
                  <TrendingUp className="w-4 h-4 text-accent" />
                  {config.marketTrend}
                </div>
              </div>
              <div>
                <h3 className="font-bold text-lg text-foreground mb-4">
                  Why {config.name} Homeowners Choose Us
                </h3>
                <ul className="space-y-3">
                  {config.highlights.map((h) => (
                    <li key={h} className="flex gap-3">
                      <CheckCircle2 className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                      <span className="text-muted-foreground text-sm">{h}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Neighbourhoods */}
        <section className="py-16 bg-secondary">
          <div className="container mx-auto px-4 max-w-4xl">
            <h2 className="text-2xl md:text-3xl font-bold text-primary mb-2 text-center">
              {config.name} Neighbourhoods We Cover
            </h2>
            <p className="text-muted-foreground text-center mb-8">
              Our AI analyzes sales data across all {config.name} neighbourhoods
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              {config.neighborhoods.map((n) => (
                <span
                  key={n}
                  className="px-4 py-2 bg-card border border-border rounded-full text-sm font-medium text-foreground"
                >
                  <MapPin className="w-3 h-3 inline mr-1 text-accent" />
                  {n}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* How it works */}
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4 max-w-3xl">
            <h2 className="text-2xl md:text-3xl font-bold text-primary mb-10 text-center">
              How to Get Your Free {config.name} Home Value Estimate
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {[
                {
                  icon: MapPin,
                  step: "1",
                  title: "Enter Your Address",
                  desc: `Type your ${config.name} property address`,
                },
                {
                  icon: Brain,
                  step: "2",
                  title: "Add Property Details",
                  desc: "Beds, baths, size, condition — takes 60 seconds",
                },
                {
                  icon: Zap,
                  step: "3",
                  title: "Get Your Estimate",
                  desc: "Instant AI-powered valuation with market context",
                },
              ].map((item) => (
                <div key={item.title} className="text-center">
                  <div className="w-14 h-14 bg-primary rounded-xl flex items-center justify-center mx-auto mb-3 relative">
                    <item.icon className="w-7 h-7 text-accent" />
                    <div className="absolute -top-2 -right-2 w-6 h-6 bg-accent rounded-full flex items-center justify-center">
                      <span className="text-xs font-bold text-primary">{item.step}</span>
                    </div>
                  </div>
                  <h3 className="font-bold text-foreground mb-1">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">{item.desc}</p>
                </div>
              ))}
            </div>
            <div className="text-center mt-10">
              <Link
                href={`/estimate?city=${config.name}`}
                className="inline-flex items-center gap-2 bg-accent text-primary font-bold text-lg px-8 py-4 rounded-xl hover:bg-yellow-400 transition-colors shadow-lg"
              >
                <Zap className="w-5 h-5" />
                Get My Free {config.name} Estimate
              </Link>
            </div>
          </div>
        </section>

        {/* Meet the Expert / City Specific */}
        <section className="py-20 bg-background border-t border-border">
          <div className="container mx-auto px-4 max-w-4xl text-center">
            <h2 className="text-3xl font-bold text-primary mb-4">
              Speak with {config.name}'s Top-Selling Real Estate Expert
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto mb-8">
              This free tool is provided by <strong>Parveen Arora</strong>, owner of RE/MAX Optimum Realty and the #1 real estate agent serving {config.name} and the Greater Toronto Area. Whether you're ready to list or just exploring your options, get expert advice from a team that has sold thousands of homes.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link
                href={getAgentPageUrl(config.slug)}
                className="inline-flex items-center justify-center gap-2 bg-primary text-white font-bold text-lg px-8 py-4 rounded-xl hover:bg-primary/90 transition-colors shadow-lg"
              >
                #{config.name}&apos;s Top Agent — {PARVEEN_ARORA.name}
              </Link>
              <Link
                href="/parveen-arora"
                className="inline-flex items-center justify-center gap-2 bg-secondary text-primary font-bold text-lg px-8 py-4 rounded-xl hover:bg-secondary/80 transition-colors"
              >
                About {PARVEEN_ARORA.name}
              </Link>
            </div>
          </div>
        </section>

        {/* Other cities */}
        <section className="py-12 bg-secondary border-t border-border">
          <div className="container mx-auto px-4 max-w-4xl text-center">
            <h2 className="text-xl font-bold text-primary mb-6">
              Also Serving These Ontario Markets
            </h2>
            <div className="flex flex-wrap justify-center gap-3">
              {Object.values(cities)
                .filter((c) => c.slug !== config.slug)
                .map((c) => (
                  <Link
                    key={c.slug}
                    href={`/home-value-estimator/${c.slug}`}
                    className="px-4 py-2 bg-card border border-border rounded-full text-sm font-medium text-foreground hover:border-accent hover:text-accent transition-colors"
                  >
                    {c.name}
                  </Link>
                ))}
            </div>
          </div>
        </section>
      </main>
    </>
  )
}
