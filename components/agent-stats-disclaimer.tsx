import { AGENT_STATS_DISCLAIMER } from "@/lib/seo/parveen-arora"

interface AgentStatsDisclaimerProps {
  className?: string
}

export function AgentStatsDisclaimer({
  className = "text-xs text-muted-foreground leading-relaxed text-center mt-4 max-w-3xl mx-auto",
}: AgentStatsDisclaimerProps) {
  return <p className={className}>{AGENT_STATS_DISCLAIMER}</p>
}
