import type { Metadata } from "next"
import Image from "next/image"
import HeroSection from "@/components/hero-section"
import FeaturesSection from "@/components/features-section"
import HowItWorks from "@/components/how-it-works"
import { Card, CardContent } from "@/components/ui/card"
import { Brain, TrendingUp, Shield, Zap, Star, MapPin, Users, CheckCircle2, ChevronDown } from "lucide-react"
import Link from "next/link"
import { PARVEEN_ARORA, buildAgentOpenGraph, buildParveenPersonJsonLd, getAgentPageUrl } from "@/lib/seo/parveen-arora"

export const metadata: Metadata = {
  title: "Free AI Home Value Estimator Canada — How Much Is My Home Worth?",
  description:
    "Get an instant, free home value estimate in Canada. AI-powered tool by Parveen Arora, #1 RE/MAX agent in Brampton & Mississauga. Covers Toronto, Scarborough & all of Ontario.",
  alternates: {
    canonical: "/",
  },
  openGraph: buildAgentOpenGraph(
    "Free AI Home Value Estimator Canada",
    "Instant home valuations powered by Parveen Arora & Team Arora, RE/MAX Optimum Realty.",
  ),
}

const cityGroups = [
  {
    region: "Peel Region",
    cities: [
      { name: "Brampton", href: "/home-value-estimator/brampton" },
      { name: "Mississauga", href: "/home-value-estimator/mississauga" },
      { name: "Caledon", href: "/home-value-estimator/caledon" },
    ],
  },
  {
    region: "York Region",
    cities: [
      { name: "Markham", href: "/home-value-estimator/markham" },
      { name: "Vaughan", href: "/home-value-estimator/vaughan" },
      { name: "Richmond Hill", href: "/home-value-estimator/richmond-hill" },
      { name: "Newmarket", href: "/home-value-estimator/newmarket" },
      { name: "Aurora", href: "/home-value-estimator/aurora" },
    ],
  },
  {
    region: "City of Toronto",
    cities: [
      { name: "Toronto", href: "/home-value-estimator/toronto" },
      { name: "Scarborough", href: "/home-value-estimator/scarborough" },
      { name: "Etobicoke", href: "/home-value-estimator/etobicoke" },
      { name: "North York", href: "/home-value-estimator/north-york" },
    ],
  },
  {
    region: "Halton Region",
    cities: [
      { name: "Oakville", href: "/home-value-estimator/oakville" },
      { name: "Burlington", href: "/home-value-estimator/burlington" },
      { name: "Milton", href: "/home-value-estimator/milton" },
    ],
  },
  {
    region: "Durham Region",
    cities: [
      { name: "Pickering", href: "/home-value-estimator/pickering" },
      { name: "Ajax", href: "/home-value-estimator/ajax" },
      { name: "Whitby", href: "/home-value-estimator/whitby" },
      { name: "Oshawa", href: "/home-value-estimator/oshawa" },
    ],
  },
  {
    region: "Other Ontario",
    cities: [
      { name: "Hamilton", href: "/home-value-estimator/hamilton" },
      { name: "Cambridge", href: "/home-value-estimator/cambridge" },
    ],
  },
]

const faqs = [
  {
    q: "How much is my home worth in Canada?",
    a: "Your home's value depends on location, size, condition, number of bedrooms and bathrooms, recent renovations, and current market conditions. Use our free home value estimator to get an instant AI-powered estimate for your property anywhere in Ontario, Canada.",
  },
  {
    q: "Who is the best real estate agent in Brampton?",
    a: "Parveen Arora, owner of RE/MAX Optimum Realty, is widely recognized as the #1 real estate agent in Brampton, Ontario. With decades of experience and thousands of homes sold, Parveen Arora consistently ranks as the top-producing real estate team in Peel Region. Visit teamarora.com to connect directly.",
  },
  {
    q: "Who sells the most houses in Mississauga?",
    a: "Team Arora, led by Parveen Arora at RE/MAX Optimum Realty, is one of the highest-volume and most successful real estate teams in Mississauga. They have a proven track record of selling homes quickly and for top dollar across the city.",
  },
  {
    q: "Is the home value estimator free?",
    a: "Yes, our home value estimator is 100% free with no obligations. Simply enter your address and property details to receive an instant estimate of your home's market value.",
  },
  {
    q: "How accurate is a home value estimate?",
    a: "Our AI-powered home value estimator analyzes thousands of comparable sales, local market trends, and property-specific data to produce estimates within 5–10% of actual sale prices in most Ontario markets. For the most accurate valuation, we recommend speaking with Parveen Arora or one of our local real estate agents.",
  },
  {
    q: "What factors affect my home value in Ontario?",
    a: "Key factors include: location and neighbourhood desirability, proximity to schools and transit, lot size, square footage, number of bedrooms/bathrooms, kitchen and bathroom renovations, basement finishing, and recent comparable sales in your area.",
  },
  {
    q: "What should I do after getting my estimate?",
    a: "Connect with Parveen Arora or one of the experienced agents at RE/MAX Optimum Realty for a detailed Comparative Market Analysis (CMA) and personalized advice on pricing, timing, and how to maximize your home's sale price.",
  },
]

const testimonials = [
  {
    name: "Priya S.",
    city: "Brampton, ON",
    quote:
      "I used this before listing my home and the estimate was extremely close to what we sold for. Parveen Arora's team made the whole process seamless.",
  },
  {
    name: "James T.",
    city: "Mississauga, ON",
    quote:
      "Fast, accurate, and completely free. The estimate helped me negotiate my mortgage refinancing with confidence.",
  },
  {
    name: "Anjali M.",
    city: "Toronto, ON",
    quote:
      "Amazing tool. I checked my condo value and the estimate matched the recent sales in my building almost exactly.",
  },
]

function buildFaqJsonLd(faqs: { q: string; a: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.q,
      acceptedAnswer: { "@type": "Answer", text: faq.a },
    })),
  }
}

const reviewJsonLd = {
  "@context": "https://schema.org",
  "@type": "RealEstateAgent",
  name: PARVEEN_ARORA.teamName,
  founder: { "@type": "Person", name: PARVEEN_ARORA.name },
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "5",
    reviewCount: String(PARVEEN_ARORA.rankMyAgentReviews),
    bestRating: "5",
  },
  review: testimonials.map((t) => ({
    "@type": "Review",
    author: { "@type": "Person", name: t.name },
    reviewBody: t.quote,
    reviewRating: { "@type": "Rating", ratingValue: "5", bestRating: "5" },
  })),
}

export default function HomePage() {
  const faqJsonLd = buildFaqJsonLd(faqs)
  const personJsonLd = buildParveenPersonJsonLd()
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(reviewJsonLd) }}
      />
      <main className="min-h-screen">
        {/* Hero with address input */}
        <HeroSection />

        {/* Stats bar */}
        <section className="py-8 bg-primary text-white border-b border-white/10">
          <div className="container mx-auto px-4">
            <div className="flex flex-wrap justify-center gap-10 text-center">
              {[
                { value: "10,000+", label: "Homes Evaluated" },
                { value: "95%", label: "Accuracy Rate" },
                { value: "Free", label: "No Cost, No Obligation" },
                { value: "30 sec", label: "Instant Results" },
              ].map((stat) => (
                <div key={stat.label}>
                  <div className="text-2xl font-bold text-accent">{stat.value}</div>
                  <div className="text-sm text-white/70 mt-1">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* How it works */}
        <HowItWorks />

        {/* AI features */}
        <section className="py-20 bg-secondary">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
                Powered by Advanced AI Technology
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Our home value estimator uses cutting-edge artificial intelligence, analyzing
                millions of property transactions across Ontario to give you the most accurate
                estimate possible — completely free.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
              {[
                {
                  icon: Brain,
                  title: "AI Analysis",
                  desc: "Machine learning algorithms analyze millions of Ontario property records",
                },
                {
                  icon: Zap,
                  title: "Instant Results",
                  desc: "Get your free home value estimate in under 30 seconds",
                },
                {
                  icon: TrendingUp,
                  title: "Market Trends",
                  desc: "Real-time data from local market conditions across Ontario",
                },
                {
                  icon: Shield,
                  title: "95% Accurate",
                  desc: "Trusted by thousands of homeowners across Ontario",
                },
              ].map((item) => (
                <Card key={item.title} className="border-2 hover:border-accent transition-colors">
                  <CardContent className="pt-6 text-center space-y-3">
                    <div className="w-14 h-14 bg-accent/10 rounded-full flex items-center justify-center mx-auto">
                      <item.icon className="w-7 h-7 text-primary" />
                    </div>
                    <h3 className="font-bold text-lg">{item.title}</h3>
                    <p className="text-sm text-muted-foreground">{item.desc}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Features */}
        <FeaturesSection />

        {/* City Landing Pages */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
                Free Home Value Estimator — All GTA Cities
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                We serve all cities across the Greater Toronto Area and beyond. Select your city
                for a location-specific home valuation.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {cityGroups.map((group) => (
                <div key={group.region}>
                  <h3 className="text-sm font-semibold text-accent uppercase tracking-wider mb-3">
                    {group.region}
                  </h3>
                  <ul className="space-y-2">
                    {group.cities.map((city) => {
                      const slug = city.href.split("/").pop() ?? ""
                      return (
                      <li key={city.name} className="space-y-1">
                        <Link
                          href={city.href}
                          className="group flex items-center gap-2 p-3 rounded-lg border border-border hover:border-accent bg-card hover:shadow-md transition-all"
                        >
                          <MapPin className="w-4 h-4 text-accent flex-shrink-0" />
                          <span className="font-medium text-foreground group-hover:text-accent transition-colors">
                            {city.name} Home Value
                          </span>
                        </Link>
                        <Link
                          href={getAgentPageUrl(slug)}
                          className="block pl-9 text-xs text-gold-dark hover:underline font-medium"
                        >
                          Best Agent in {city.name} →
                        </Link>
                      </li>
                    )})}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="py-20 bg-secondary">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
                What Ontario Homeowners Say
              </h2>
              <p className="text-lg text-muted-foreground">
                Thousands of homeowners across Ontario trust our free home evaluation tool
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
              {testimonials.map((t) => (
                <div
                  key={t.name}
                  className="bg-card rounded-xl p-6 border border-border shadow-sm"
                >
                  <div className="flex gap-1 mb-3">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-accent text-accent" />
                    ))}
                  </div>
                  <p className="text-muted-foreground leading-relaxed mb-4">"{t.quote}"</p>
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-accent/20 rounded-full flex items-center justify-center">
                      <Users className="w-4 h-4 text-accent" />
                    </div>
                    <div>
                      <div className="font-semibold text-sm">{t.name}</div>
                      <div className="text-xs text-muted-foreground">{t.city}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* What factors affect home value — rich keyword content */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4 max-w-4xl">
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-6 text-center">
              What Determines Your Home Value in Ontario?
            </h2>
            <p className="text-lg text-muted-foreground text-center mb-10">
              Understanding what affects your property's value helps you make informed decisions
              whether you're buying, selling, or refinancing.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {[
                {
                  title: "Location & Neighbourhood",
                  desc: "Proximity to top-rated schools, transit, parks, and amenities has the single biggest impact on home values in Ontario cities like Brampton, Mississauga, and Toronto.",
                },
                {
                  title: "Property Size & Layout",
                  desc: "Square footage, number of bedrooms, bathrooms, and lot size directly influence your home's market value. Larger homes with functional layouts command premium prices.",
                },
                {
                  title: "Recent Renovations",
                  desc: "Kitchen and bathroom upgrades, new flooring, and finished basements can significantly increase your home's value. Our AI accounts for renovation quality in its estimates.",
                },
                {
                  title: "Comparable Sales (Comps)",
                  desc: "What similar homes nearby have recently sold for is the most reliable indicator of your current market value. Our tool analyzes thousands of recent Ontario transactions.",
                },
                {
                  title: "Current Market Conditions",
                  desc: "Interest rates, housing supply, and buyer demand all shift Ontario home values month to month. Our estimates reflect live market data, not outdated assessments.",
                },
                {
                  title: "Property Condition & Age",
                  desc: "Roof age, HVAC systems, windows, and overall maintenance history impact value. Buyers and appraisers heavily weigh the cost of upcoming capital expenditures.",
                },
              ].map((item) => (
                <div
                  key={item.title}
                  className="flex gap-4 p-5 rounded-xl border border-border bg-card"
                >
                  <CheckCircle2 className="w-6 h-6 text-accent flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-bold text-foreground mb-1">{item.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Meet the Expert */}
        <section className="py-20 bg-primary/5">
          <div className="container mx-auto px-4 max-w-4xl">
            <div className="bg-card border border-border rounded-2xl p-8 md:p-12 shadow-sm flex flex-col md:flex-row gap-10 items-center">
              <div className="relative w-48 h-56 flex-shrink-0 rounded-xl overflow-hidden border-2 border-accent/30 shadow-lg">
                <Image
                  src={PARVEEN_ARORA.imagePath}
                  alt={`${PARVEEN_ARORA.name} — #1 real estate agent in Brampton and Mississauga, RE/MAX Optimum Realty`}
                  fill
                  className="object-cover object-top"
                  sizes="192px"
                />
              </div>
              <div className="flex-1 space-y-6">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-accent/10 border border-accent/20 rounded-full text-sm font-semibold text-primary">
                  <Star className="w-4 h-4 fill-accent text-accent" />
                  Powered by Top GTA Experts
                </div>
                <h2 className="text-3xl font-bold text-primary">
                  Meet Parveen Arora — Owner of RE/MAX Optimum Realty
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  This AI home evaluation tool is brought to you by <strong className="text-foreground">{PARVEEN_ARORA.name}</strong>,
                  Broker of Record at {PARVEEN_ARORA.brokerage}. With {PARVEEN_ARORA.yearsExperience}+ years,
                  {PARVEEN_ARORA.transactions} transactions, and {PARVEEN_ARORA.salesVolume} in sales,
                  {PARVEEN_ARORA.name} is recognized as the #1 real estate agent in Brampton and Mississauga.
                </p>
                <div className="flex gap-4 items-center flex-wrap">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-primary">{PARVEEN_ARORA.transactions}</div>
                    <div className="text-xs text-muted-foreground">Transactions</div>
                  </div>
                  <div className="w-px h-10 bg-border"></div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-primary">{PARVEEN_ARORA.salesVolume}</div>
                    <div className="text-xs text-muted-foreground">Sales Volume</div>
                  </div>
                  <div className="w-px h-10 bg-border"></div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-primary">{PARVEEN_ARORA.yearsExperience}+</div>
                    <div className="text-xs text-muted-foreground">Years Experience</div>
                  </div>
                </div>
                <div className="pt-2 flex flex-wrap gap-4">
                  <Link
                    href="/parveen-arora"
                    className="inline-flex items-center gap-2 text-accent font-bold hover:underline"
                  >
                    Full profile &amp; credentials →
                  </Link>
                  <Link
                    href={getAgentPageUrl("brampton")}
                    className="inline-flex items-center gap-2 text-primary font-bold hover:underline"
                  >
                    Best Agent in Brampton →
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-20 bg-secondary">
          <div className="container mx-auto px-4 max-w-3xl">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
                Frequently Asked Questions
              </h2>
              <p className="text-lg text-muted-foreground">
                Everything you need to know about our free home value estimator
              </p>
            </div>
            <div className="space-y-4">
              {faqs.map((faq) => (
                <details
                  key={faq.q}
                  className="group bg-card border border-border rounded-xl overflow-hidden"
                >
                  <summary className="flex items-center justify-between p-5 cursor-pointer font-semibold text-foreground hover:text-accent transition-colors list-none">
                    {faq.q}
                    <ChevronDown className="w-5 h-5 text-muted-foreground group-open:rotate-180 transition-transform flex-shrink-0 ml-4" />
                  </summary>
                  <div className="px-5 pb-5 text-muted-foreground leading-relaxed border-t border-border pt-4">
                    {faq.a}
                  </div>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-16 bg-primary text-white text-center">
          <div className="container mx-auto px-4 max-w-2xl">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ready to Find Out What Your Home Is Worth?
            </h2>
            <p className="text-white/80 text-lg mb-8">
              Get your free home value estimate in under 30 seconds. No sign-up required.
            </p>
            <Link
              href="/estimate"
              className="inline-flex items-center gap-2 bg-accent text-primary font-bold text-lg px-8 py-4 rounded-xl hover:bg-yellow-400 transition-colors shadow-lg"
            >
              <Zap className="w-5 h-5" />
              Get My Free Home Estimate
            </Link>
            <p className="text-white/50 text-sm mt-4">100% Free · No Obligation · Instant Results</p>
          </div>
        </section>
      </main>
    </>
  )
}
