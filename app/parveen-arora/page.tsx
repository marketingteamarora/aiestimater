import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { ExternalLink, MapPin, Phone, Mail, Star } from "lucide-react"
import { agentCities } from "@/lib/seo/agent-cities"
import { PARVEEN_ARORA, buildAgentOpenGraph, buildParveenPersonJsonLd, getAgentPageUrl, CLIENT_REVIEWS, getAgentStats } from "@/lib/seo/parveen-arora"
import { AgentStatsDisclaimer } from "@/components/agent-stats-disclaimer"
import { AwardsShowcase } from "@/components/awards-showcase"
import { ReviewsTrustSection } from "@/components/reviews-trust-section"

export const metadata: Metadata = {
  title: "Parveen Arora — #1 RE/MAX Real Estate Agent in Brampton & GTA",
  description: `${PARVEEN_ARORA.name} is Broker of Record at ${PARVEEN_ARORA.brokerage}, leading ${PARVEEN_ARORA.teamName} with ${CLIENT_REVIEWS.totalDisplay} reviews, ${PARVEEN_ARORA.transactions} transactions, and ${PARVEEN_ARORA.salesVolume} in sales across Brampton, Mississauga, and Ontario.`,
  alternates: { canonical: "/parveen-arora" },
  openGraph: buildAgentOpenGraph(
    `Parveen Arora — Top RE/MAX Agent in Brampton & GTA`,
    PARVEEN_ARORA.bio,
  ),
}

const faqs = [
  {
    q: "Who is Parveen Arora?",
    a: `${PARVEEN_ARORA.name} is the Broker of Record and owner of ${PARVEEN_ARORA.brokerage}, leading ${PARVEEN_ARORA.teamName}. With ${PARVEEN_ARORA.yearsExperience}+ years of experience, ${PARVEEN_ARORA.transactions} transactions, and ${PARVEEN_ARORA.salesVolume} in career sales, he is recognized as one of the top RE/MAX agents in Brampton, Mississauga, and the Greater Toronto Area.`,
  },
  {
    q: "Is Parveen Arora the best real estate agent in Brampton?",
    a: `${PARVEEN_ARORA.name} is widely recognized as a top-producing agent in Brampton and Peel Region. Team Arora was ranked the #1 RE/MAX Team in Canada in 2018, and Parveen holds RE/MAX Luminary of Distinction (2024), Hall of Fame, Circle of Legends, and Lifetime Achievement honours.`,
  },
  {
    q: "How many reviews does Parveen Arora have?",
    a: `${PARVEEN_ARORA.name} and ${PARVEEN_ARORA.teamName} have ${CLIENT_REVIEWS.totalDisplay} client reviews across Google Reviews, Rank My Agent, Rate My Agent, RE/MAX, and other verified platforms — with a ${CLIENT_REVIEWS.aggregateRating}/5 average rating.`,
  },
  {
    q: "What areas does Parveen Arora serve?",
    a: `${PARVEEN_ARORA.name} and ${PARVEEN_ARORA.teamName} serve ${PARVEEN_ARORA.serviceAreas.join(", ")}, and surrounding Ontario markets. Office: ${PARVEEN_ARORA.address.streetAddress}, ${PARVEEN_ARORA.address.addressLocality}.`,
  },
  {
    q: "How do I contact Parveen Arora?",
    a: `Call ${PARVEEN_ARORA.phone} (direct) or ${PARVEEN_ARORA.officePhone} (office), email ${PARVEEN_ARORA.email}, or visit ${PARVEEN_ARORA.profileUrl}.`,
  },
]

export default function ParveenAroraPage() {
  const personJsonLd = buildParveenPersonJsonLd({
    description: PARVEEN_ARORA.bio,
  })

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.q,
      acceptedAnswer: { "@type": "Answer", text: faq.a },
    })),
  }

  const cityLinks = Object.values(agentCities).filter((c) => c.slug !== "gta")

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />

      <main className="min-h-screen">
        <section className="bg-gradient-to-br from-primary via-primary to-blue-900 text-white py-20">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <p className="text-accent font-semibold mb-2">{PARVEEN_ARORA.brokerage}</p>
                <h1 className="text-4xl md:text-5xl font-bold mb-4">{PARVEEN_ARORA.name}</h1>
                <p className="text-xl text-white/90 mb-2">{PARVEEN_ARORA.jobTitle}</p>
                <p className="text-lg text-white/75 leading-relaxed mb-8">{PARVEEN_ARORA.bio}</p>
                <div className="flex flex-wrap gap-4">
                  <Link
                    href={getAgentPageUrl("brampton")}
                    className="bg-accent text-primary font-bold px-6 py-3 rounded-xl hover:bg-gold-dark transition-colors"
                  >
                    Best Agent in Brampton
                  </Link>
                  <Link
                    href={PARVEEN_ARORA.profileUrl}
                    target="_blank"
                    rel="noopener"
                    className="border border-white/30 font-bold px-6 py-3 rounded-xl hover:bg-white/10 transition-colors inline-flex items-center gap-2"
                  >
                    <ExternalLink className="w-4 h-4" />
                    TeamArora.com
                  </Link>
                </div>
              </div>
              <div className="flex justify-center">
                <div className="relative w-80 h-96 rounded-2xl overflow-hidden border-4 border-accent/50 shadow-2xl">
                  <Image
                    src={PARVEEN_ARORA.imagePath}
                    alt={`${PARVEEN_ARORA.name} — Broker of Record, ${PARVEEN_ARORA.brokerage}, top Brampton and Mississauga real estate agent`}
                    fill
                    className="object-cover object-top"
                    priority
                    sizes="320px"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 bg-white border-b">
          <div className="container mx-auto px-4 max-w-5xl">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              {getAgentStats("profile").map((s) => (
                <div key={s.label}>
                  <div className="text-3xl font-black text-primary">{s.value}</div>
                  <div className="text-sm text-muted-foreground mt-1">{s.label}</div>
                </div>
              ))}
            </div>
            <AgentStatsDisclaimer />
          </div>
        </section>

        <AwardsShowcase />

        <section className="py-20 bg-background">
          <div className="container mx-auto px-4 max-w-5xl grid md:grid-cols-2 gap-12">
            <div>
              <h2 className="text-3xl font-bold text-primary mb-6">Verified Reviews</h2>
              <p className="text-muted-foreground mb-6">
                Read {CLIENT_REVIEWS.totalDisplay} verified client reviews across trusted platforms.
              </p>
              <div className="space-y-2 text-sm">
                {CLIENT_REVIEWS.platforms
                  .filter((platform) => platform.count > 0)
                  .map((platform) => (
                    <p key={platform.id}>
                      <a
                        href={platform.url}
                        className="text-accent hover:underline"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {platform.countDisplay} on {platform.name} →
                      </a>
                    </p>
                  ))}
              </div>
            </div>
            <div>
              <h2 className="text-3xl font-bold text-primary mb-6">Contact</h2>
              <div className="space-y-4 bg-card border rounded-2xl p-8">
                <div className="flex gap-3">
                  <Phone className="w-5 h-5 text-accent" />
                  <div>
                    <div className="font-semibold">Phone</div>
                    <div className="text-muted-foreground text-sm">Direct: {PARVEEN_ARORA.phone}</div>
                    <div className="text-muted-foreground text-sm">Office: {PARVEEN_ARORA.officePhone}</div>
                  </div>
                </div>
                <div className="flex gap-3">
                  <Mail className="w-5 h-5 text-accent" />
                  <div>
                    <div className="font-semibold">Email</div>
                    <a href={`mailto:${PARVEEN_ARORA.email}`} className="text-accent text-sm">{PARVEEN_ARORA.email}</a>
                  </div>
                </div>
                <div className="flex gap-3">
                  <MapPin className="w-5 h-5 text-accent" />
                  <div>
                    <div className="font-semibold">Office</div>
                    <div className="text-muted-foreground text-sm">
                      {PARVEEN_ARORA.address.streetAddress}<br />
                      {PARVEEN_ARORA.address.addressLocality}, {PARVEEN_ARORA.address.addressRegion} {PARVEEN_ARORA.address.postalCode}
                    </div>
                  </div>
                </div>
              </div>
              <p className="mt-6 text-muted-foreground text-sm">
                Languages: {PARVEEN_ARORA.languages.join(", ")} · Team speaks {PARVEEN_ARORA.languagesServed} languages
              </p>
            </div>
          </div>
        </section>

        <ReviewsTrustSection />

        <section className="py-20 bg-secondary">
          <div className="container mx-auto px-4 max-w-5xl">
            <h2 className="text-3xl font-bold text-primary mb-8 text-center">
              Parveen Arora — Best Agent by City
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
              {cityLinks.map((city) => (
                <Link
                  key={city.slug}
                  href={getAgentPageUrl(city.slug)}
                  className="p-4 bg-card border rounded-xl hover:border-accent hover:shadow-md transition-all text-center"
                >
                  <Star className="w-4 h-4 text-accent mx-auto mb-1" />
                  <div className="font-semibold text-sm">{city.name}</div>
                  <div className="text-xs text-muted-foreground">Best Agent</div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20 bg-background">
          <div className="container mx-auto px-4 max-w-3xl">
            <h2 className="text-3xl font-bold text-primary mb-8 text-center">FAQ</h2>
            <div className="space-y-4">
              {faqs.map((faq) => (
                <details key={faq.q} className="bg-card border rounded-xl p-5">
                  <summary className="font-semibold cursor-pointer">{faq.q}</summary>
                  <p className="mt-4 text-muted-foreground leading-relaxed">{faq.a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>
      </main>
    </>
  )
}
