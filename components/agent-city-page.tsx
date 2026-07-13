import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import {
  Award,
  MapPin,
  ExternalLink,
  Trophy,
  Phone,
  Mail,
  Zap,
  TrendingUp,
  Home,
} from "lucide-react"
import { ReviewsTrustSection } from "@/components/reviews-trust-section"
import { agentCities } from "@/lib/seo/agent-cities"
import { getCityMarket } from "@/lib/seo/city-market-data"
import {
  PARVEEN_ARORA,
  SITE_URL,
  buildParveenPersonJsonLd,
  getAgentPageUrl,
  CLIENT_REVIEWS,
  buildReviewsSummaryText,
} from "@/lib/seo/parveen-arora"
import {
  generateAgentMetadata,
  getAgentVariantLinks,
} from "@/lib/seo/agent-routes"

export { agentCities, generateAgentMetadata }

const stats = [
  { value: CLIENT_REVIEWS.totalDisplay, label: "Client Reviews" },
  { value: PARVEEN_ARORA.transactions, label: "Successful Transactions" },
  { value: PARVEEN_ARORA.salesVolume, label: "Career Sales Volume" },
  { value: "#1", label: "RE/MAX Team in Canada (2018)" },
]

interface AgentCityPageProps {
  citySlug: string
  keywordPrefix: string
  routeBase?: string
}

export function AgentCityPage({ citySlug, keywordPrefix, routeBase }: AgentCityPageProps) {
  const cityConfig = agentCities[citySlug]
  if (!cityConfig) notFound()

  const market = citySlug === "gta" ? null : getCityMarket(citySlug)
  const cityName = cityConfig.name
  const isGTA = citySlug === "gta"
  const displayPrefix = keywordPrefix ? `${keywordPrefix} ` : ""
  const displayTitle = `${displayPrefix}Real Estate Agent in ${cityName}`
  const lowerDisplayTitle = displayTitle.toLowerCase()
  const canonicalAgentUrl = `${SITE_URL}${getAgentPageUrl(citySlug)}`

  const agentJsonLd = buildParveenPersonJsonLd({
    cityName: isGTA ? undefined : cityName,
    description: `${PARVEEN_ARORA.name} is recognized as the ${lowerDisplayTitle}. With ${PARVEEN_ARORA.salesVolume} in sales and ${PARVEEN_ARORA.transactions} transactions across ${cityName}, ${PARVEEN_ARORA.teamName} delivers unmatched results.`,
  })

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
      {
        "@type": "ListItem",
        position: 2,
        name: "Parveen Arora",
        item: `${SITE_URL}/parveen-arora`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: displayTitle,
        item: canonicalAgentUrl,
      },
    ],
  }

  const faqs = [
    {
      q: `Who is the ${lowerDisplayTitle}?`,
      a: `${PARVEEN_ARORA.name}, Broker of Record at ${PARVEEN_ARORA.brokerage}, is widely recognized as the ${lowerDisplayTitle}. With ${PARVEEN_ARORA.transactions} transactions, ${PARVEEN_ARORA.salesVolume} in sales volume, and ${PARVEEN_ARORA.yearsExperience}+ years of experience, ${PARVEEN_ARORA.name} is one of the top-producing RE/MAX agents in Ontario.`,
    },
    {
      q: `Which real estate agent sells the most houses in ${cityName}?`,
      a: `${PARVEEN_ARORA.teamName}, led by ${PARVEEN_ARORA.name}, is among the highest-volume real estate teams serving ${cityName}. Team Arora was ranked the #1 RE/MAX Team in Canada in 2018 and continues to lead in Peel Region and across the GTA.`,
    },
    {
      q: `Who is the top RE/MAX agent in ${cityName}?`,
      a: `${PARVEEN_ARORA.name} holds prestigious RE/MAX honours including Luminary of Distinction (2024), Circle of Legends, Hall of Fame, and Lifetime Achievement Award. With ${CLIENT_REVIEWS.totalDisplay} reviews across Google (${CLIENT_REVIEWS.platforms[0].countDisplay}), Rank My Agent (${CLIENT_REVIEWS.platforms[1].countDisplay}), Rate My Agent (${CLIENT_REVIEWS.platforms[2].countDisplay}), and more, ${PARVEEN_ARORA.name} is one of the most trusted agents in ${cityName}.`,
    },
    {
      q: `How many reviews does Parveen Arora have?`,
      a: `${PARVEEN_ARORA.name} and ${PARVEEN_ARORA.teamName} have ${CLIENT_REVIEWS.totalDisplay} client reviews across verified platforms including Google Reviews, Rank My Agent, and Rate My Agent, with an average rating of ${CLIENT_REVIEWS.aggregateRating} out of 5.`,
    },
    {
      q: `Why is ${PARVEEN_ARORA.name} considered a ${keywordPrefix || "top"} realtor in ${cityName}?`,
      a: `${PARVEEN_ARORA.name}'s track record includes ${PARVEEN_ARORA.salesVolume} in career sales, ${PARVEEN_ARORA.transactions} families served, a team of ${PARVEEN_ARORA.teamSize} professionals, and service in ${PARVEEN_ARORA.languagesServed} languages — making ${PARVEEN_ARORA.teamName} ideal for ${cityName}'s diverse communities.`,
    },
    ...(market
      ? [
          {
            q: `What is the average home price in ${cityName}?`,
            a: `The average home price in ${cityName} is approximately ${market.avgPrice}. Market trend: ${market.marketTrend}. ${PARVEEN_ARORA.name} provides free home valuations and expert pricing advice for sellers across ${market.neighborhoods.slice(0, 3).join(", ")}, and more.`,
          },
        ]
      : []),
  ]

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.q,
      acceptedAnswer: { "@type": "Answer", text: faq.a },
    })),
  }

  const variantLinks = getAgentVariantLinks(citySlug)

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(agentJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />

      <main className="min-h-screen">
        <section className="relative bg-primary text-white py-24 overflow-hidden">
          <div className="absolute inset-0 z-0 opacity-20">
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff1a_1px,transparent_1px),linear-gradient(to_bottom,#ffffff1a_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
          </div>
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <div className="inline-flex items-center justify-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-full text-sm font-medium mb-6 backdrop-blur-md">
                  <MapPin className="w-4 h-4 text-accent" />
                  Serving {cityName}, Ontario
                </div>
                <h1 className="text-4xl md:text-6xl font-bold leading-[1.1] tracking-tight mb-4">
                  The {displayTitle}
                </h1>
                <p className="text-2xl text-accent font-serif italic mb-6">
                  {PARVEEN_ARORA.name} &amp; {PARVEEN_ARORA.teamName}
                </p>
                <p className="text-lg md:text-xl text-white/70 font-light leading-relaxed mb-8">
                  {PARVEEN_ARORA.bio.split(".")[0]}. When {cityName} homeowners want top dollar, they call{" "}
                  {PARVEEN_ARORA.name} — {PARVEEN_ARORA.yearsExperience}+ years, {PARVEEN_ARORA.transactions}{" "}
                  transactions, and {PARVEEN_ARORA.salesVolume} in sales.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link
                    href={PARVEEN_ARORA.profileUrl}
                    target="_blank"
                    rel="noopener"
                    className="inline-flex items-center justify-center gap-2 bg-accent text-primary font-bold text-lg px-8 py-4 rounded-xl hover:bg-accent/90 transition-colors shadow-lg"
                  >
                    <ExternalLink className="w-5 h-5" />
                    Work with {cityName}&apos;s Top Agent
                  </Link>
                  <Link
                    href="/estimate"
                    className="inline-flex items-center justify-center gap-2 bg-white/10 border border-white/20 text-white font-bold text-lg px-8 py-4 rounded-xl hover:bg-white/20 transition-colors backdrop-blur-md"
                  >
                    <Zap className="w-5 h-5" />
                    Free Home Evaluation
                  </Link>
                </div>
              </div>
              <div className="flex justify-center lg:justify-end">
                <div className="relative w-72 h-80 md:w-96 md:h-[28rem] rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/80 to-transparent z-10" />
                  <Image
                    src={PARVEEN_ARORA.imagePath}
                    alt={`${PARVEEN_ARORA.name} — ${displayTitle}, ${PARVEEN_ARORA.brokerage}`}
                    fill
                    className="object-cover object-top"
                    priority
                    sizes="(max-width: 768px) 288px, 384px"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {market && (
          <section className="py-12 bg-secondary border-b border-border">
            <div className="container mx-auto px-4 max-w-5xl">
              <h2 className="text-2xl font-bold text-primary mb-6 text-center">
                {cityName} Real Estate Market — Local Expertise
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="bg-card rounded-xl p-6 border border-border text-center">
                  <TrendingUp className="w-8 h-8 text-accent mx-auto mb-2" />
                  <div className="text-2xl font-bold text-primary">{market.avgPrice}</div>
                  <div className="text-sm text-muted-foreground">Avg. Home Price</div>
                </div>
                <div className="bg-card rounded-xl p-6 border border-border text-center">
                  <Home className="w-8 h-8 text-accent mx-auto mb-2" />
                  <div className="text-sm font-semibold text-primary">{market.marketTrend}</div>
                  <div className="text-sm text-muted-foreground mt-1">Market Trend</div>
                </div>
                <div className="bg-card rounded-xl p-6 border border-border text-center">
                  <MapPin className="w-8 h-8 text-accent mx-auto mb-2" />
                  <div className="text-sm font-semibold text-primary">{market.region}</div>
                  <div className="text-sm text-muted-foreground mt-1">Region</div>
                </div>
              </div>
              <p className="text-muted-foreground leading-relaxed mb-4">{market.description}</p>
              <p className="text-sm text-muted-foreground">
                <strong className="text-foreground">Top neighbourhoods served:</strong>{" "}
                {market.neighborhoods.join(" · ")}
              </p>
              <div className="text-center mt-6">
                <Link
                  href={`/home-value-estimator/${citySlug}`}
                  className="text-accent font-semibold hover:underline"
                >
                  Get a free {cityName} home value estimate →
                </Link>
              </div>
            </div>
          </section>
        )}

        <section className="bg-gradient-to-r from-accent to-yellow-400 py-8">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6 max-w-5xl mx-auto">
              <div className="text-primary">
                <h3 className="text-2xl font-bold mb-1">Curious what your {cityName} home is worth?</h3>
                <p className="font-medium opacity-90">AI-powered valuation by {PARVEEN_ARORA.name}&apos;s team.</p>
              </div>
              <Link
                href="/estimate"
                className="bg-primary text-white font-bold text-lg px-8 py-4 rounded-xl hover:bg-primary/90 transition-colors shadow-lg whitespace-nowrap"
              >
                Get Free AI Home Evaluation
              </Link>
            </div>
          </div>
        </section>

        <section className="py-16 bg-white text-primary border-b border-border">
          <div className="container mx-auto px-4">
            <div className="flex flex-wrap justify-center gap-12 text-center max-w-5xl mx-auto">
              {stats.map((stat) => (
                <div key={stat.label} className="flex-1 min-w-[200px]">
                  <div className="text-4xl md:text-5xl font-bold tracking-tight mb-2">{stat.value}</div>
                  <div className="text-sm font-medium text-muted-foreground uppercase tracking-widest">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <ReviewsTrustSection cityName={cityName} />

        <section className="py-24 bg-background">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-primary mb-6 tracking-tight">
                  Why {cityName} Sellers Trust {PARVEEN_ARORA.name}
                </h2>
                <div className="space-y-6 text-muted-foreground leading-relaxed text-lg font-light">
                  <p>
                    Selling in {cityName} requires deep local knowledge, aggressive marketing, and a massive buyer
                    network. <strong className="text-foreground font-medium">{PARVEEN_ARORA.name}</strong>, Broker of Record at{" "}
                    {PARVEEN_ARORA.brokerage}, leads {PARVEEN_ARORA.teamName} with {PARVEEN_ARORA.yearsExperience}+
                    years and {CLIENT_REVIEWS.totalDisplay} verified client reviews.
                  </p>
                  <p>
                    {buildReviewsSummaryText()} Read reviews on{" "}
                    <a href={CLIENT_REVIEWS.platforms[0].url} target="_blank" rel="noopener noreferrer" className="text-accent font-medium hover:underline">Google</a>,{" "}
                    <a href={CLIENT_REVIEWS.platforms[1].url} target="_blank" rel="noopener noreferrer" className="text-accent font-medium hover:underline">Rank My Agent</a>, and{" "}
                    <a href={CLIENT_REVIEWS.platforms[2].url} target="_blank" rel="noopener noreferrer" className="text-accent font-medium hover:underline">Rate My Agent</a>.
                    {PARVEEN_ARORA.name} is also a{" "}
                    <a href="https://news.remax.com/remax-luminary-of-distinction" target="_blank" rel="noopener noreferrer" className="text-accent font-medium hover:underline">
                      RE/MAX Luminary of Distinction
                    </a>.
                  </p>
                  <p>
                    {PARVEEN_ARORA.teamName} speaks {PARVEEN_ARORA.languagesServed} languages including{" "}
                    {PARVEEN_ARORA.languages.join(", ")} — essential for {cityName}&apos;s diverse communities.
                  </p>
                </div>
                <div className="mt-10 flex flex-wrap gap-4">
                  <Link
                    href="/parveen-arora"
                    className="inline-flex items-center gap-2 text-primary font-semibold hover:text-accent transition-colors"
                  >
                    Full profile &amp; credentials →
                  </Link>
                  <Link
                    href={PARVEEN_ARORA.profileUrl}
                    target="_blank"
                    rel="noopener"
                    className="inline-flex items-center gap-2 bg-primary text-white font-semibold px-8 py-4 rounded-xl hover:bg-primary/90 transition-colors shadow-soft"
                  >
                    <ExternalLink className="w-4 h-4" />
                    TeamArora.com
                  </Link>
                </div>
              </div>
              <div className="bg-secondary rounded-3xl p-10 border border-border shadow-soft">
                <h3 className="font-bold text-2xl text-primary mb-8 flex items-center gap-3">
                  <Trophy className="w-7 h-7 text-accent" />
                  Verified Industry Authority
                </h3>
                <ul className="space-y-5">
                  {PARVEEN_ARORA.awards.map((award) => (
                    <li key={award} className="flex items-start gap-4">
                      <Award className="w-6 h-6 text-accent flex-shrink-0 mt-0.5" />
                      <span className="text-foreground font-medium text-lg">{award}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section className="py-20 bg-background border-t border-border">
          <div className="container mx-auto px-4 max-w-4xl">
            <div className="bg-card rounded-2xl p-8 md:p-12 border border-border shadow-sm flex flex-col md:flex-row gap-10 items-center">
              <div className="relative w-40 h-48 flex-shrink-0 rounded-xl overflow-hidden border-2 border-accent/30">
                <Image
                  src={PARVEEN_ARORA.imagePath}
                  alt={`Contact ${PARVEEN_ARORA.name}, ${cityName} real estate agent`}
                  fill
                  className="object-cover object-top"
                  sizes="160px"
                />
              </div>
              <div className="flex-1 space-y-6">
                <h2 className="text-3xl font-bold text-primary mb-2">Contact {PARVEEN_ARORA.teamName}</h2>
                <p className="text-muted-foreground">
                  Ready to buy or sell in {cityName}? Speak with {PARVEEN_ARORA.name} directly.
                </p>
                <div className="space-y-4">
                  <div className="flex items-start gap-4">
                    <Phone className="w-5 h-5 text-accent mt-1" />
                    <div>
                      <div className="font-semibold">Phone</div>
                      <div className="text-muted-foreground text-sm mt-1">
                        <div>Direct: {PARVEEN_ARORA.phone}</div>
                        <div>Office: {PARVEEN_ARORA.officePhone}</div>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <Mail className="w-5 h-5 text-accent mt-1" />
                    <div>
                      <div className="font-semibold">Email</div>
                      <a href={`mailto:${PARVEEN_ARORA.email}`} className="text-accent hover:underline text-sm">
                        {PARVEEN_ARORA.email}
                      </a>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <MapPin className="w-5 h-5 text-accent mt-1" />
                    <div>
                      <div className="font-semibold">Mississauga Headquarters</div>
                      <div className="text-muted-foreground text-sm mt-1">
                        {PARVEEN_ARORA.address.streetAddress}
                        <br />
                        {PARVEEN_ARORA.address.addressLocality}, {PARVEEN_ARORA.address.addressRegion}{" "}
                        {PARVEEN_ARORA.address.postalCode}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-20 bg-background">
          <div className="container mx-auto px-4 max-w-3xl">
            <h2 className="text-3xl font-bold text-primary mb-8 text-center">{cityName} Real Estate FAQ</h2>
            <div className="space-y-4">
              {faqs.map((faq) => (
                <details key={faq.q} className="group bg-card border border-border rounded-xl overflow-hidden">
                  <summary className="flex items-center justify-between p-5 cursor-pointer font-semibold text-foreground hover:text-accent transition-colors list-none">
                    {faq.q}
                    <span className="text-muted-foreground text-xl group-open:rotate-180 transition-transform flex-shrink-0 ml-4">
                      ↓
                    </span>
                  </summary>
                  <div className="px-5 pb-5 text-muted-foreground leading-relaxed border-t border-border pt-4">
                    {faq.a}
                  </div>
                </details>
              ))}
            </div>
          </div>
        </section>

        {routeBase && routeBase !== "best-real-estate-agent" && (
          <section className="py-6 bg-amber-50 border-y border-amber-200">
            <p className="container mx-auto px-4 text-center text-sm text-amber-900">
              Also see:{" "}
              <Link href={getAgentPageUrl(citySlug)} className="font-semibold underline text-primary">
                Best Real Estate Agent in {cityName}
              </Link>
            </p>
          </section>
        )}

        <section className="py-12 bg-secondary border-t border-border">
          <div className="container mx-auto px-4 max-w-4xl text-center">
            <h3 className="text-xl font-bold text-primary mb-4">More {cityName} Real Estate Resources</h3>
            <div className="flex flex-wrap justify-center gap-4">
              {variantLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm font-medium text-accent hover:text-primary transition-colors underline underline-offset-4"
                >
                  {link.label.replace("No 1", "No. 1")} — {cityName}
                </Link>
              ))}
              {!isGTA && (
                <Link
                  href={`/home-value-estimator/${citySlug}`}
                  className="text-sm font-medium text-accent hover:text-primary transition-colors underline underline-offset-4"
                >
                  {cityName} Home Value Estimator
                </Link>
              )}
            </div>
          </div>
        </section>
      </main>
    </>
  )
}
