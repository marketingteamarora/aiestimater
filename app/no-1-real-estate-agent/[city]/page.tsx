import type { Metadata } from "next"
import { AgentCityPage } from "@/components/agent-city-page"
import { generateAgentMetadata, generateAgentStaticParams } from "@/lib/seo/agent-routes"

export function generateStaticParams() {
  return generateAgentStaticParams()
}

export function generateMetadata({ params }: { params: Promise<{ city: string }> }): Promise<Metadata> {
  return params.then(({ city }) => generateAgentMetadata(city, "No. 1", "no-1-real-estate-agent"))
}

export default async function No1RealEstateAgentPage({ params }: { params: Promise<{ city: string }> }) {
  const { city } = await params
  return <AgentCityPage citySlug={city} keywordPrefix="No. 1" routeBase="no-1-real-estate-agent" />
}
