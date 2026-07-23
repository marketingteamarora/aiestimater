/** Verified review counts across third-party platforms — updated for trust & schema */

export const GOOGLE_REVIEW_LISTINGS = [
  {
    id: "google-main",
    name: "Team Arora — RE/MAX Optimum Realty",
    location: "268 Derry Rd W, Mississauga",
    count: 432,
    url: "https://www.google.com/maps/place/RE%2FMAX+Optimum+Realty,+268+Derry+Rd+W+Unit+101,+Mississauga,+ON+L5W+0H6",
  },
  {
    id: "google-brampton",
    name: "Team Arora #1 Real Estate Agent in Brampton",
    location: "Brampton, ON",
    count: 23,
    url: "https://www.google.com/maps/place/Team+Arora+%231+Real+Estate+Agent+in+Brampton+%7C+Top+Real+Estate+Agent+Brampton/data=!4m7!3m6!1s0x882b3f148b8e5db1:0x2fad4a9e150f2890!8m2!3d43.6629165!4d-79.727803!16s%2Fg%2F11np3pxsnv",
  },
  {
    id: "google-staging",
    name: "Team Arora Staging Warehouse",
    location: "Mississauga, ON",
    count: 9,
    url: "https://www.google.com/maps/place/Team+Arora+Staging+Warehouse/data=!4m7!3m6!1s0x882b171785f415c5:0x6ddebd0fee5b1002!8m2!3d43.6196573!4d-79.7854018!16s%2Fg%2F11nmt6t5vh",
  },
] as const

const GOOGLE_REVIEWS_TOTAL = GOOGLE_REVIEW_LISTINGS.reduce((sum, listing) => sum + listing.count, 0)

const RANK_MY_AGENT_COUNT = 123
const RATE_MY_AGENT_COUNT = 71
const VERIFIED_REVIEW_TOTAL = GOOGLE_REVIEWS_TOTAL + RANK_MY_AGENT_COUNT + RATE_MY_AGENT_COUNT

export const CLIENT_REVIEWS = {
  totalDisplay: "650+",
  totalCount: VERIFIED_REVIEW_TOTAL,
  aggregateRating: 4.9,
  summary:
    "Trusted by homeowners across Brampton, Mississauga, and the GTA — with verified reviews on Google, Rank My Agent, and Rate My Agent.",
  googleListings: GOOGLE_REVIEW_LISTINGS,
  googleTotal: GOOGLE_REVIEWS_TOTAL,
  googleTotalDisplay: String(GOOGLE_REVIEWS_TOTAL),
  platforms: [
    {
      id: "google",
      name: "Google Reviews",
      countDisplay: String(GOOGLE_REVIEWS_TOTAL),
      count: GOOGLE_REVIEWS_TOTAL,
      rating: 4.8,
      url: GOOGLE_REVIEW_LISTINGS[0].url,
      description: "Verified Google reviews across Team Arora locations.",
    },
    {
      id: "rankmyagent",
      name: "Rank My Agent",
      countDisplay: "123+",
      count: RANK_MY_AGENT_COUNT,
      rating: 4.98,
      url: "https://rankmyagent.com/parveenarora",
      description: "Verified ratings on Rank My Agent.",
      verified: true,
    },
    {
      id: "ratemyagent",
      name: "Rate My Agent",
      countDisplay: "71+",
      count: RATE_MY_AGENT_COUNT,
      rating: 4.94,
      url: "https://www.rate-my-agent.com/parveen-arora-ratings-mississauga-7286",
      description: "Verified reviews on Rate My Agent.",
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

export function getReviewSourceLinks() {
  return [
    ...GOOGLE_REVIEW_LISTINGS.map((listing) => ({
      id: listing.id,
      name: listing.name,
      count: listing.count,
      url: listing.url,
    })),
    {
      id: "rankmyagent",
      name: "Rank My Agent",
      count: RANK_MY_AGENT_COUNT,
      url: "https://rankmyagent.com/parveenarora",
    },
    {
      id: "ratemyagent",
      name: "Rate My Agent",
      count: RATE_MY_AGENT_COUNT,
      url: "https://www.rate-my-agent.com/parveen-arora-ratings-mississauga-7286",
    },
  ]
}

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
