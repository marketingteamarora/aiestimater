import { buildAggregateRatingJsonLd, CLIENT_REVIEWS, buildReviewsSummaryText } from "@/lib/seo/reviews"
import { AWARDS, OTHER_RECOGNITION } from "@/lib/seo/awards"

export const SITE_URL = "https://gethomeevaluation.ca"

/** Primary agent landing URL — "best" is the main SEO keyword */
export const PRIMARY_AGENT_ROUTE = "best-real-estate-agent"

export const AGENT_KEYWORD_ROUTES = {
  best: "best-real-estate-agent",
  no1: "no-1-real-estate-agent",
  top: "top-real-estate-agent",
} as const

export function getAgentPageUrl(citySlug: string): string {
  return `/${PRIMARY_AGENT_ROUTE}/${citySlug}`
}

export function getAgentPageUrlByKeyword(
  citySlug: string,
  keyword: keyof typeof AGENT_KEYWORD_ROUTES,
): string {
  return `/${AGENT_KEYWORD_ROUTES[keyword]}/${citySlug}`
}

const AGENT_YEARS_EXPERIENCE = 21
const AGENT_TRANSACTIONS = "5,000+"
const AGENT_TRANSACTIONS_START_YEAR = 2005
const AGENT_SALES_VOLUME = "$3.5 Billion"
const AGENT_TEAM_SIZE = "45+"
const AGENT_LANGUAGES_SERVED = "10+"

export const AGENT_STATS_DISCLAIMER = `${AGENT_TRANSACTIONS} transactions represent completed sales from ${AGENT_TRANSACTIONS_START_YEAR} to present, as per RE/MAX stats.`

export function buildParveenBio(): string {
  return `Parveen Arora is the Broker of Record and owner of RE/MAX Optimum Realty, leading Team Arora — one of the highest-volume real estate teams in the Greater Toronto Area. With ${AGENT_YEARS_EXPERIENCE}+ years of experience, ${AGENT_TRANSACTIONS} successful transactions, ${AGENT_SALES_VOLUME} in career sales volume, and ${CLIENT_REVIEWS.totalDisplay} client reviews across Google, Rank My Agent, Rate My Agent, and more, Parveen is recognized across Brampton, Mississauga, and the GTA as a top-producing RE/MAX agent. His team of ${AGENT_TEAM_SIZE} professionals serves clients in English, Hindi, Punjabi, and ${AGENT_LANGUAGES_SERVED} languages.`
}

export function getAgentStats(variant: "profile" | "city" = "profile") {
  if (variant === "city") {
    return [
      { value: CLIENT_REVIEWS.totalDisplay, label: "Client Reviews" },
      { value: AGENT_TRANSACTIONS, label: "Successful Transactions" },
      { value: AGENT_SALES_VOLUME, label: "Career Sales Volume" },
      { value: "#1", label: "RE/MAX Team in Canada (2018)" },
    ]
  }

  return [
    { value: `${AGENT_YEARS_EXPERIENCE}+`, label: "Years Experience" },
    { value: AGENT_TRANSACTIONS, label: "Transactions" },
    { value: AGENT_SALES_VOLUME, label: "Sales Volume" },
    { value: CLIENT_REVIEWS.totalDisplay, label: "Client Reviews" },
  ]
}

export const PARVEEN_ARORA = {
  name: "Parveen Arora",
  jobTitle: "Broker of Record & Owner",
  brokerage: "RE/MAX Optimum Realty",
  teamName: "Team Arora",
  imagePath: "/parveen-arora.png",
  imageUrl: `${SITE_URL}/parveen-arora.png`,
  profileUrl: "https://www.teamarora.com",
  phone: "416-910-8923",
  officePhone: "905-488-1260",
  fax: "905-456-1107",
  email: "parveen@teamarora.com",
  address: {
    streetAddress: "268 Derry Rd W Unit 101, 102 & 103",
    addressLocality: "Mississauga",
    addressRegion: "ON",
    postalCode: "L5W 0H6",
    addressCountry: "CA",
  },
  yearsExperience: AGENT_YEARS_EXPERIENCE,
  languages: ["English", "Hindi", "Punjabi"],
  transactions: AGENT_TRANSACTIONS,
  salesVolume: AGENT_SALES_VOLUME,
  teamSize: AGENT_TEAM_SIZE,
  languagesServed: AGENT_LANGUAGES_SERVED,
  serviceAreas: [
    "Brampton",
    "Mississauga",
    "Toronto",
    "Caledon",
    "Vaughan",
    "Markham",
    "Oakville",
    "Scarborough",
    "Hamilton",
    "Burlington",
    "Milton",
    "Richmond Hill",
    "Cambridge",
    "Kitchener",
    "Waterloo",
    "Georgetown",
    "Halton Hills",
  ],
  sameAs: [
    "https://www.teamarora.com",
    "https://www.remax.ca/on/parveen-arora-39110-ag",
    "https://rankmyagent.com/parveenarora",
    "https://www.rate-my-agent.com/parveen-arora-ratings-mississauga-7286",
    "https://listings.teamarora.com",
    "https://news.remax.com/remax-luminary-of-distinction",
  ],
  awards: [
    "RE/MAX Luminary of Distinction (2024)",
    "#1 RE/MAX Team in Canada (2018)",
    "RE/MAX Circle of Legends",
    "RE/MAX Hall of Fame",
    "RE/MAX Lifetime Achievement Award",
    "Best of Mississauga (2022 & 2023)",
    "Top 100 Agents in Canada (2022)",
    "Rank My Agent Top Nominee (2024)",
    "Top Choice Award / Mark of Excellence",
  ],
  specialties: [
    "Luxury homes",
    "Residential sales",
    "New construction",
    "Investment properties",
    "Condominiums",
    "Relocation",
    "Buyer brokerage",
  ],
  bio: buildParveenBio(),
  reviews: CLIENT_REVIEWS,
} as const

// Legacy alias
export const PARVEEN_REVIEW_COUNT = CLIENT_REVIEWS.totalDisplay

export function buildParveenPersonJsonLd(options?: { cityName?: string; description?: string }) {
  const cityName = options?.cityName
  return {
    "@context": "https://schema.org",
    "@type": "RealEstateAgent",
    "@id": `${SITE_URL}/parveen-arora#person`,
    name: PARVEEN_ARORA.name,
    jobTitle: PARVEEN_ARORA.jobTitle,
    description:
      options?.description ??
      `${PARVEEN_ARORA.name} is a top RE/MAX real estate agent serving ${cityName ?? "the Greater Toronto Area"}, Ontario with ${PARVEEN_ARORA.transactions} transactions and ${PARVEEN_ARORA.salesVolume} in sales.`,
    url: `${SITE_URL}/parveen-arora`,
    image: PARVEEN_ARORA.imageUrl,
    telephone: PARVEEN_ARORA.phone,
    email: PARVEEN_ARORA.email,
    sameAs: PARVEEN_ARORA.sameAs,
    knowsAbout: [
      ...PARVEEN_ARORA.specialties,
      ...(cityName ? [`${cityName} real estate`, `${cityName} home sales`] : []),
      "GTA real estate",
      "Property valuation",
    ],
    worksFor: {
      "@type": "RealEstateAgent",
      name: PARVEEN_ARORA.brokerage,
      url: PARVEEN_ARORA.profileUrl,
      telephone: PARVEEN_ARORA.officePhone,
      address: {
        "@type": "PostalAddress",
        streetAddress: PARVEEN_ARORA.address.streetAddress,
        addressLocality: PARVEEN_ARORA.address.addressLocality,
        addressRegion: PARVEEN_ARORA.address.addressRegion,
        postalCode: PARVEEN_ARORA.address.postalCode,
        addressCountry: PARVEEN_ARORA.address.addressCountry,
      },
    },
    areaServed: cityName
      ? [{ "@type": "City", name: cityName }, { "@type": "State", name: "Ontario" }]
      : PARVEEN_ARORA.serviceAreas.map((name) => ({ "@type": "City", name })),
    aggregateRating: buildAggregateRatingJsonLd(),
    award: [
      ...AWARDS.map((a) => (a.year ? `${a.name} (${a.year}) — RE/MAX` : `${a.name} — RE/MAX`)),
      ...OTHER_RECOGNITION.map((r) =>
        r.year ? `${r.name} (${r.year})${r.organization ? ` — ${r.organization}` : ""}` : r.name,
      ),
    ],
  }
}

export { buildReviewsSummaryText, CLIENT_REVIEWS }

export function buildAgentOpenGraph(title: string, description: string) {
  return {
    title,
    description,
    url: SITE_URL,
    siteName: "GetHomeEvaluation.ca",
    locale: "en_CA" as const,
    type: "website" as const,
    images: [
      {
        url: PARVEEN_ARORA.imageUrl,
        width: 1200,
        height: 1200,
        alt: `${PARVEEN_ARORA.name} — RE/MAX Optimum Realty, Top GTA Real Estate Agent`,
      },
    ],
  }
}
