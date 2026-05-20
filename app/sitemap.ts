import type { MetadataRoute } from "next"
import { agentCities } from "@/components/agent-city-page"

const siteUrl = "https://gethomeevaluation.ca"

const cities = [
  "brampton",
  "mississauga",
  "toronto",
  "scarborough",
  "cambridge",
  "oakville",
  "markham",
  "vaughan",
  "richmond-hill",
  "newmarket",
  "aurora",
  "milton",
  "burlington",
  "hamilton",
  "whitby",
  "oshawa",
  "ajax",
  "pickering",
  "caledon",
  "etobicoke",
  "north-york",
]

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: siteUrl,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${siteUrl}/estimate`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${siteUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
  ]

  const cityPages: MetadataRoute.Sitemap = cities.map((city) => ({
    url: `${siteUrl}/home-value-estimator/${city}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.85,
  }))

  const agentSlugs = Object.keys(agentCities)
  const agentPrefixes = ["real-estate-agent", "best-real-estate-agent", "top-real-estate-agent", "no-1-real-estate-agent"]
  
  const agentPages: MetadataRoute.Sitemap = agentPrefixes.flatMap((prefix) => 
    agentSlugs.map((slug) => ({
      url: `${siteUrl}/${prefix}/${slug}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: prefix === "best-real-estate-agent" ? 0.9 : 0.8, // Slightly higher priority for main variant
    }))
  )

  return [...staticPages, ...cityPages, ...agentPages]
}
