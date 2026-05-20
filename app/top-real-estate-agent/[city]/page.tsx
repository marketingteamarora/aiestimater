import type { Metadata } from "next"
import { AgentCityPage, generateAgentMetadata } from "@/components/agent-city-page"

export function generateMetadata({ params }: { params: { city: string } }): Metadata {
  return generateAgentMetadata(params.city, "Top", "top-real-estate-agent")
}

export default function TopRealEstateAgentPage({ params }: { params: { city: string } }) {
  return <AgentCityPage citySlug={params.city} keywordPrefix="Top" />
}
