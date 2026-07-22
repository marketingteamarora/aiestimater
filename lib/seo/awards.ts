/**
 * Parveen Arora / Team Arora — RE/MAX Awards
 *
 * Ordered strictly by RE/MAX prestige hierarchy (highest tier first).
 *
 * Career Awards (cumulative career GCI + affiliation years):
 *   Tier 1: Luminary of Distinction  (highest earned)
 *   Tier 2: Circle of Legends
 *   Tier 3: Lifetime Achievement
 *   Tier 4: Hall of Fame
 *
 * Team Production Awards (annual team GCI):
 *   Tier 1: Pinnacle Club Team  (highest, current)
 *   Tier 2: Diamond Club Team
 *   Tier 3: Titan Club Team
 *   Tier 4: Chairman's Club Team
 *   Tier 5: Platinum Club Team
 *   Tier 6: 100% Club Team
 *   Tier 7: Executive Club Team
 *
 * All badge assets are official RE/MAX 2024 award graphics from
 * news.remax.com/resources-to-amplify-remax-awards.
 *
 * AWARD_IMAGE_BASE can be swapped to a Supabase Storage public URL later
 * without touching any award records.
 */
export const AWARD_IMAGE_BASE = "/awards"

export const AWARD_CATEGORIES = {
  career: {
    id: "career",
    label: "RE/MAX Career Awards",
    description:
      "Career Awards recognize lifetime mastery — based on cumulative gross commission income and years of RE/MAX affiliation. Listed from highest tier down.",
  },
  team: {
    id: "team",
    label: "RE/MAX Team Production Awards",
    description:
      "Annual honours awarded to Team Arora based on each year's gross commission income. Team Arora has climbed every tier — listed from top tier down.",
  },
} as const

export type AwardCategoryId = keyof typeof AWARD_CATEGORIES

export interface Award {
  id: string
  name: string
  /** Prestige rank within category (1 = highest). Used for ordering + display. */
  tier: number
  /** Total tiers in this category — used to display "Tier X of Y". */
  totalTiers: number
  year?: string
  image: string
  category: AwardCategoryId
  /** Highest tier currently held — gets top-tier visual treatment. */
  featured?: boolean
  description?: string
}

/**
 * Ordered from most prestigious to entry level within each category.
 */
export const AWARDS: readonly Award[] = [
  // ─── Career Awards (individual — Parveen Arora) ────────────────────
  {
    id: "luminary-of-distinction",
    name: "Luminary of Distinction",
    tier: 1,
    totalTiers: 4,
    year: "2024",
    image: `${AWARD_IMAGE_BASE}/luminary-of-distinction.jpg`,
    category: "career",
    featured: true,
    description:
      "The highest RE/MAX Career Award held by Parveen Arora — recognizing exceptional lifetime achievement and long-term brand affiliation.",
  },
  {
    id: "circle-of-legends",
    name: "Circle of Legends",
    tier: 2,
    totalTiers: 4,
    image: `${AWARD_IMAGE_BASE}/circle-of-legends.jpg`,
    category: "career",
    description:
      "Awarded for reaching legendary status in career commissions and dedication to RE/MAX.",
  },
  {
    id: "lifetime-achievement",
    name: "Lifetime Achievement",
    tier: 3,
    totalTiers: 4,
    image: `${AWARD_IMAGE_BASE}/lifetime-achievement.jpg`,
    category: "career",
    description:
      "Recognizes sustained career-long production and commitment to RE/MAX.",
  },
  {
    id: "hall-of-fame",
    name: "Hall of Fame",
    tier: 4,
    totalTiers: 4,
    image: `${AWARD_IMAGE_BASE}/hall-of-fame.jpg`,
    category: "career",
    description:
      "Career achievement award for reaching a major cumulative earnings milestone.",
  },

  // ─── Team Production Awards (Team Arora) ───────────────────────────
  {
    id: "pinnacle-club-team",
    name: "Pinnacle Club Team",
    tier: 1,
    totalTiers: 7,
    year: "2024",
    image: `${AWARD_IMAGE_BASE}/pinnacle-club-team.jpg`,
    category: "team",
    featured: true,
    description:
      "The top-tier RE/MAX team production award — Team Arora's current annual achievement.",
  },
  {
    id: "diamond-club-team",
    name: "Diamond Club Team",
    tier: 2,
    totalTiers: 7,
    image: `${AWARD_IMAGE_BASE}/diamond-club-team.jpg`,
    category: "team",
    description:
      "Elite team production tier — reserved for the highest-performing RE/MAX teams.",
  },
  {
    id: "titan-club-team",
    name: "Titan Club Team",
    tier: 3,
    totalTiers: 7,
    image: `${AWARD_IMAGE_BASE}/titan-club-team.jpg`,
    category: "team",
    description: "Recognizes teams delivering outstanding annual production.",
  },
  {
    id: "chairmans-club-team",
    name: "Chairman's Club Team",
    tier: 4,
    totalTiers: 7,
    image: `${AWARD_IMAGE_BASE}/chairmans-club-team.jpg`,
    category: "team",
    description: "Awarded to top-producing RE/MAX teams each year.",
  },
  {
    id: "platinum-club-team",
    name: "Platinum Club Team",
    tier: 5,
    totalTiers: 7,
    image: `${AWARD_IMAGE_BASE}/platinum-club-team.jpg`,
    category: "team",
    description: "Annual production honour for high-performing teams.",
  },
  {
    id: "hundred-percent-club-team",
    name: "100% Club Team",
    tier: 6,
    totalTiers: 7,
    image: `${AWARD_IMAGE_BASE}/hundred-percent-club-team.jpg`,
    category: "team",
    description: "Long-standing annual RE/MAX team production award.",
  },
  {
    id: "executive-club-team",
    name: "Executive Club Team",
    tier: 7,
    totalTiers: 7,
    image: `${AWARD_IMAGE_BASE}/executive-club-team.jpg`,
    category: "team",
    description: "Foundational annual RE/MAX team production award.",
  },
]

export function getAwardsByCategory(categoryId: AwardCategoryId): Award[] {
  return AWARDS.filter((award) => award.category === categoryId).sort(
    (a, b) => a.tier - b.tier,
  )
}

export interface OtherRecognition {
  id: string
  name: string
  year?: string
  organization?: string
  /** Priority for display order (1 = most important). */
  priority: number
}

/**
 * Non-RE/MAX recognitions — ordered by importance.
 */
export const OTHER_RECOGNITION: readonly OtherRecognition[] = [
  {
    id: "top-team-canada-2018",
    name: "#1 RE/MAX Team in Canada",
    year: "2018",
    organization: "RE/MAX Canada",
    priority: 1,
  },
  {
    id: "top-100-canada-2022",
    name: "Top 100 Agents in Canada",
    year: "2022",
    organization: "RE/MAX Canada",
    priority: 2,
  },
  {
    id: "best-of-mississauga-2023",
    name: "Best of Mississauga",
    year: "2023",
    organization: "Best of Mississauga Awards",
    priority: 3,
  },
  {
    id: "best-of-mississauga-2022",
    name: "Best of Mississauga",
    year: "2022",
    organization: "Best of Mississauga Awards",
    priority: 4,
  },
  {
    id: "rank-my-agent-top-2024",
    name: "Top Nominee",
    year: "2024",
    organization: "Rank My Agent",
    priority: 5,
  },
  {
    id: "top-choice-award",
    name: "Top Choice Award / Mark of Excellence",
    organization: "Top Choice Awards",
    priority: 6,
  },
]
