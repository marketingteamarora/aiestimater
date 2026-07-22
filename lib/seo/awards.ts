/**
 * Parveen Arora / Team Arora — RE/MAX Awards
 *
 * All badge assets are official RE/MAX award graphics (2024 awards program).
 * Source: news.remax.com/resources-to-amplify-remax-awards
 *
 * IMAGE_BASE can be swapped to a Supabase Storage public URL later
 * without touching any award records.
 */
export const AWARD_IMAGE_BASE = "/awards"

export const AWARD_CATEGORIES = {
  career: {
    id: "career",
    label: "RE/MAX Career Awards",
    description:
      "Career Awards recognize lifetime mastery — based on cumulative gross commission income and years of RE/MAX affiliation.",
  },
  team: {
    id: "team",
    label: "RE/MAX Team Production Awards",
    description:
      "Team Production Awards are annual honours based on Team Arora's gross commission income each year.",
  },
} as const

export type AwardCategoryId = keyof typeof AWARD_CATEGORIES

export interface Award {
  id: string
  name: string
  year?: string
  image: string
  category: AwardCategoryId
  description?: string
}

/**
 * Ordered from most prestigious to entry-level within each category.
 * "year" indicates when the award was earned or most recently awarded.
 */
export const AWARDS: readonly Award[] = [
  // Career Awards (individual — Parveen Arora)
  {
    id: "luminary-of-distinction",
    name: "Luminary of Distinction",
    year: "2024",
    image: `${AWARD_IMAGE_BASE}/luminary-of-distinction.jpg`,
    category: "career",
    description:
      "The highest tier of RE/MAX Career Awards recognizing exceptional lifetime achievement and long-term brand affiliation.",
  },
  {
    id: "circle-of-legends",
    name: "Circle of Legends",
    image: `${AWARD_IMAGE_BASE}/circle-of-legends.jpg`,
    category: "career",
    description:
      "Awarded for reaching legendary status in career commissions and dedication to RE/MAX.",
  },
  {
    id: "lifetime-achievement",
    name: "Lifetime Achievement",
    image: `${AWARD_IMAGE_BASE}/lifetime-achievement.jpg`,
    category: "career",
    description:
      "Recognizes sustained career-long production and commitment to RE/MAX.",
  },
  {
    id: "hall-of-fame",
    name: "Hall of Fame",
    image: `${AWARD_IMAGE_BASE}/hall-of-fame.jpg`,
    category: "career",
    description:
      "Career achievement award for RE/MAX associates reaching a major cumulative milestone in earnings.",
  },

  // Team Production Awards (Team Arora)
  {
    id: "pinnacle-club-team",
    name: "Pinnacle Club Team",
    year: "2024",
    image: `${AWARD_IMAGE_BASE}/pinnacle-club-team.jpg`,
    category: "team",
    description:
      "The top-tier RE/MAX team production award for exceptional annual gross commission income.",
  },
  {
    id: "diamond-club-team",
    name: "Diamond Club Team",
    year: "2024",
    image: `${AWARD_IMAGE_BASE}/diamond-club-team.jpg`,
    category: "team",
    description:
      "Elite team production tier — reserved for the highest-performing RE/MAX teams.",
  },
  {
    id: "titan-club-team",
    name: "Titan Club Team",
    image: `${AWARD_IMAGE_BASE}/titan-club-team.jpg`,
    category: "team",
    description:
      "Recognizes teams delivering outstanding annual production.",
  },
  {
    id: "chairmans-club-team",
    name: "Chairman's Club Team",
    image: `${AWARD_IMAGE_BASE}/chairmans-club-team.jpg`,
    category: "team",
    description: "Awarded to top-producing RE/MAX teams each year.",
  },
  {
    id: "platinum-club-team",
    name: "Platinum Club Team",
    image: `${AWARD_IMAGE_BASE}/platinum-club-team.jpg`,
    category: "team",
    description: "Prestigious annual production honour for high-performing teams.",
  },
  {
    id: "hundred-percent-club-team",
    name: "100% Club Team",
    image: `${AWARD_IMAGE_BASE}/hundred-percent-club-team.jpg`,
    category: "team",
    description: "Long-standing annual RE/MAX team production award.",
  },
  {
    id: "executive-club-team",
    name: "Executive Club Team",
    image: `${AWARD_IMAGE_BASE}/executive-club-team.jpg`,
    category: "team",
    description: "Foundational annual RE/MAX team production award.",
  },
]

export function getAwardsByCategory(categoryId: AwardCategoryId): Award[] {
  return AWARDS.filter((award) => award.category === categoryId)
}

export interface OtherRecognition {
  id: string
  name: string
  year?: string
  organization?: string
}

/**
 * Non-RE/MAX recognitions (community, third-party). These don't have official
 * badge graphics — they'll be displayed as a text list.
 */
export const OTHER_RECOGNITION: readonly OtherRecognition[] = [
  { id: "top-team-canada-2018", name: "#1 RE/MAX Team in Canada", year: "2018", organization: "RE/MAX Canada" },
  { id: "top-100-canada-2022", name: "Top 100 Agents in Canada", year: "2022", organization: "RE/MAX Canada" },
  { id: "best-of-mississauga-2023", name: "Best of Mississauga", year: "2023", organization: "Best of Mississauga Awards" },
  { id: "best-of-mississauga-2022", name: "Best of Mississauga", year: "2022", organization: "Best of Mississauga Awards" },
  { id: "rank-my-agent-top-2024", name: "Top Nominee", year: "2024", organization: "Rank My Agent" },
  { id: "top-choice-award", name: "Top Choice Award / Mark of Excellence", organization: "Top Choice Awards" },
]
