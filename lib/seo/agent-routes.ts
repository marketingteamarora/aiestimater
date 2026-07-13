import { notFound } from "next/navigation"
import type { Metadata } from "next"
import { agentCities, agentCitySlugs, AGENT_ROUTE_VARIANTS } from "@/lib/seo/agent-cities"
import {
  PRIMARY_AGENT_ROUTE,
  PARVEEN_ARORA,
  SITE_URL,
  buildAgentOpenGraph,
} from "@/lib/seo/parveen-arora"

export function generateAgentStaticParams() {
  return agentCitySlugs.map((city) => ({ city }))
}

export function resolveAgentCity(citySlug: string) {
  const config = agentCities[citySlug]
  if (!config) notFound()
  return config
}

export function generateAgentMetadata(
  citySlug: string,
  keywordPrefix: string,
  routeBase: string,
): Metadata {
  const cityConfig = agentCities[citySlug]
  if (!cityConfig) return { title: "Top Real Estate Agent" }

  const cityName = cityConfig.name
  const capitalizedPrefix = keywordPrefix
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ")

  const displayPrefix = capitalizedPrefix ? `${capitalizedPrefix} ` : ""
  const displayTitle = `${displayPrefix}Real Estate Agent in ${cityName}`
  const canonicalPath = `/${PRIMARY_AGENT_ROUTE}/${citySlug}`
  const pageTitle = `${displayTitle} — ${PARVEEN_ARORA.name} | #1 RE/MAX Team`
  const description = `Looking for the ${displayTitle.toLowerCase()}? ${PARVEEN_ARORA.name} & ${PARVEEN_ARORA.teamName} have ${PARVEEN_ARORA.salesVolume} in sales, ${PARVEEN_ARORA.transactions} transactions, and ${PARVEEN_ARORA.yearsExperience}+ years of experience.`

  return {
    title: pageTitle,
    description,
    alternates: {
      canonical: canonicalPath,
    },
    openGraph: buildAgentOpenGraph(
      `${displayTitle} — ${PARVEEN_ARORA.name}`,
      description,
    ),
    twitter: {
      card: "summary_large_image",
      title: pageTitle,
      description,
      images: [PARVEEN_ARORA.imageUrl],
    },
    robots:
      routeBase !== PRIMARY_AGENT_ROUTE
        ? { index: false, follow: true }
        : undefined,
  }
}

export function getAgentVariantLinks(citySlug: string) {
  return AGENT_ROUTE_VARIANTS.map((prefix) => ({
    prefix,
    href: `/${prefix}/${citySlug}`,
    label: prefix
      .replace(/-/g, " ")
      .replace(/\b\w/g, (c) => c.toUpperCase()),
  }))
}

export { PRIMARY_AGENT_ROUTE, SITE_URL }
