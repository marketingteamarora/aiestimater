import type { MetadataRoute } from "next"
import { agentCitySlugs } from "@/lib/seo/agent-cities"
import { AGENT_KEYWORD_ROUTES, SITE_URL } from "@/lib/seo/parveen-arora"
import { citySlugs } from "@/lib/seo/city-market-data"

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

  const keywordRoutes = [
    { route: AGENT_KEYWORD_ROUTES.best, priority: 0.95 },
    { route: AGENT_KEYWORD_ROUTES.no1, priority: 0.92 },
    { route: AGENT_KEYWORD_ROUTES.top, priority: 0.9 },
  ]

  const agentPages: MetadataRoute.Sitemap = keywordRoutes.flatMap(({ route, priority }) =>
    agentCitySlugs.map((slug) => ({
      url: `${SITE_URL}/${route}/${slug}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: slug === "brampton" || slug === "mississauga" ? priority : priority - 0.05,
    })),
  )

  return [...staticPages, ...cityPages, ...agentPages]
}
