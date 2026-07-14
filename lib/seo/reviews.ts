/** Verified review counts across third-party platforms — updated for trust & schema */
export const CLIENT_REVIEWS = {
  totalDisplay: "630+",
  totalCount: 638,
  aggregateRating: 4.9,
  summary:
    "Parveen Arora and Team Arora have earned 630+ client reviews across Google, Rank My Agent, Rate My Agent, RE/MAX, and other verified platforms — one of the most reviewed real estate teams in Brampton and Mississauga.",
  platforms: [
    {
      id: "google",
      name: "Google Reviews",
      countDisplay: "450+",
      count: 453,
      rating: 4.8,
      url: "https://www.google.com/maps/search/Team+Arora+REMAX+268+Derry+Rd+Mississauga+reviews",
      description: "Team Arora Realty on Google — trusted by hundreds of GTA homeowners.",
    },
    {
      id: "rankmyagent",
      name: "Rank My Agent",
      countDisplay: "116+",
      count: 116,
      rating: 4.98,
      url: "https://rankmyagent.com/parveenarora",
      description: "116+ verified ratings and reviews on Rank My Agent.",
      verified: true,
    },
    {
      id: "ratemyagent",
      name: "Rate My Agent",
      countDisplay: "69+",
      count: 69,
      rating: 4.94,
      url: "https://www.rate-my-agent.com/parveen-arora-ratings-mississauga-7286",
      description: "69+ reviews across 13 cities — 100% recommend ratio.",
      verified: true,
    },
    {
      id: "remax",
      name: "RE/MAX Canada",
      countDisplay: "Verified",
      count: 0,
      rating: 5,
      url: "https://www.remax.ca/on/parveen-arora-39110-ag",
      description: "Official RE/MAX agent profile with client testimonials.",
    },
  ],
} as const

export function buildAggregateRatingJsonLd() {
  return {
    "@type": "AggregateRating",
    ratingValue: String(CLIENT_REVIEWS.aggregateRating),
    reviewCount: String(CLIENT_REVIEWS.totalCount),
    bestRating: "5",
    worstRating: "1",
  }
}

export function buildReviewsSummaryText(): string {
  const listed = CLIENT_REVIEWS.platforms
    .filter((p) => p.count > 0)
    .map((p) => `${p.countDisplay} on ${p.name}`)
    .join(", ")
  return `${CLIENT_REVIEWS.totalDisplay} total client reviews (${listed}, and more).`
}
