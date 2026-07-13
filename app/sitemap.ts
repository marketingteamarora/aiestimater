import type { MetadataRoute } from "next"
import { agentCitySlugs } from "@/lib/seo/agent-cities"
import { citySlugs } from "@/lib/seo/city-market-data"
import { PRIMARY_AGENT_ROUTE, SITE_URL } from "@/lib/seo/parveen-arora"

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: SITE_URL,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${SITE_URL}/parveen-arora`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.95,
    },
    {
      url: `${SITE_URL}/estimate`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/contact`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
  ]

  const cityPages: MetadataRoute.Sitemap = citySlugs.map((city) => ({
    url: `${SITE_URL}/home-value-estimator/${city}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.85,
  }))

  const agentPages: MetadataRoute.Sitemap = agentCitySlugs.map((slug) => ({
    url: `${SITE_URL}/${PRIMARY_AGENT_ROUTE}/${slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: slug === "brampton" || slug === "mississauga" ? 0.95 : 0.9,
  }))

  return [...staticPages, ...cityPages, ...agentPages]
}
