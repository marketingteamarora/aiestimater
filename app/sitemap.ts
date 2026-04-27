import type { MetadataRoute } from "next"

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

  return [...staticPages, ...cityPages]
}
