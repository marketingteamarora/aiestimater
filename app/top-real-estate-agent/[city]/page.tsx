import type { Metadata } from "next"
import { AgentCityPage } from "@/components/agent-city-page"
import { generateAgentMetadata, generateAgentStaticParams } from "@/lib/seo/agent-routes"

export function generateStaticParams() {
  return generateAgentStaticParams()
}

export function generateMetadata({ params }: { params: Promise<{ city: string }> }): Promise<Metadata> {
  return params.then(({ city }) => generateAgentMetadata(city, "Top", "top-real-estate-agent"))
}

export default async function TopRealEstateAgentPage({ params }: { params: Promise<{ city: string }> }) {
  const { city } = await params
  return <AgentCityPage citySlug={city} keywordPrefix="Top" routeBase="top-real-estate-agent" />
}
