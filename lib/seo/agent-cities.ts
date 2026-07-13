import { cityMarketData, citySlugs } from "@/lib/seo/city-market-data"

export interface AgentCityConfig {
  name: string
  region: string
  title: string
  slug: string
}

function titleForCity(name: string): string {
  return `${name}'s #1 Real Estate Agent`
}

/** All cities with dedicated agent landing pages — aligned with estimator coverage */
export const agentCities: Record<string, AgentCityConfig> = Object.fromEntries(
  citySlugs.map((slug) => {
    const market = cityMarketData[slug]
    return [
      slug,
      {
        slug,
        name: market.name,
        region: market.region,
        title: titleForCity(market.name),
      },
    ]
  }),
)

agentCities.gta = {
  slug: "gta",
  name: "Greater Toronto Area",
  region: "Ontario",
  title: "GTA's #1 Real Estate Team",
}

export const agentCitySlugs = [...citySlugs, "gta"]

export const AGENT_ROUTE_VARIANTS = [
  "no-1-real-estate-agent",
  "best-real-estate-agent",
  "top-real-estate-agent",
  "real-estate-agent",
] as const
