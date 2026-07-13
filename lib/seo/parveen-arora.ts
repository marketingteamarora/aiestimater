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
  yearsExperience: 21,
  languages: ["English", "Hindi", "Punjabi"],
  transactions: "4,500+",
  salesVolume: "$3.5 Billion",
  teamSize: "45+",
  languagesServed: "10+",
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
  bio: `Parveen Arora is the Broker of Record and owner of RE/MAX Optimum Realty, leading Team Arora — one of the highest-volume real estate teams in the Greater Toronto Area. With 21+ years of experience, 4,500+ successful transactions, and $3.5 billion in career sales volume, Parveen is recognized across Brampton, Mississauga, and the GTA as a top-producing RE/MAX agent. His team of 45+ professionals serves clients in English, Hindi, Punjabi, and 10+ languages.`,
  rankMyAgentReviews: 116,
} as const

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
  }
}

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
