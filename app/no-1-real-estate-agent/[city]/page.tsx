import type { Metadata } from "next"
import { AgentCityPage, generateAgentMetadata } from "@/components/agent-city-page"

export function generateMetadata({ params }: { params: { city: string } }): Metadata {
  return generateAgentMetadata(params.city, "No. 1", "no-1-real-estate-agent")
}

export default function No1RealEstateAgentPage({ params }: { params: { city: string } }) {
  return <AgentCityPage citySlug={params.city} keywordPrefix="No. 1" />
}
