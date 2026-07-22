import Image from "next/image"
import { Trophy, Award as AwardIcon, Sparkles } from "lucide-react"
import {
  AWARD_CATEGORIES,
  OTHER_RECOGNITION,
  getAwardsByCategory,
  type AwardCategoryId,
  type Award,
} from "@/lib/seo/awards"

interface AwardsShowcaseProps {
  variant?: "full" | "compact"
  className?: string
}

function AwardCard({ award }: { award: Award }) {
  const isFeatured = award.featured
  return (
    <div
      className={`group relative rounded-xl overflow-hidden transition-all ${
        isFeatured
          ? "border-2 border-accent bg-white shadow-hover ring-4 ring-accent/10"
          : "border border-border bg-white shadow-soft hover:shadow-hover"
      }`}
    >
      {isFeatured ? (
        <div className="absolute top-3 left-3 z-10 inline-flex items-center gap-1 rounded-full bg-accent px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-white shadow-lg">
          <Sparkles className="w-3 h-3" />
          Top Tier
        </div>
      ) : null}
      <div className="absolute top-3 right-3 z-10 rounded-full bg-primary/90 px-2 py-1 text-[10px] font-bold uppercase tracking-wider text-white">
        Tier {award.tier}/{award.totalTiers}
      </div>
      <div className="relative aspect-square bg-secondary">
        <Image
          src={award.image}
          alt={`${award.name}${award.year ? ` ${award.year}` : ""} — RE/MAX award earned by Parveen Arora & Team Arora`}
          fill
          className="object-contain p-2"
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          loading="lazy"
        />
      </div>
      <div className={`p-4 ${isFeatured ? "bg-gradient-to-b from-white to-secondary/40" : ""}`}>
        <div className="flex items-start justify-between gap-2 mb-1">
          <h3 className="font-bold text-primary text-sm leading-tight">{award.name}</h3>
          {award.year ? (
            <span className="text-xs font-bold text-accent shrink-0 bg-accent/10 rounded-full px-2 py-0.5">
              {award.year}
            </span>
          ) : null}
        </div>
        {award.description ? (
          <p className="text-xs text-muted-foreground leading-relaxed mt-1">
            {award.description}
          </p>
        ) : null}
      </div>
    </div>
  )
}

function CategorySection({ categoryId }: { categoryId: AwardCategoryId }) {
  const category = AWARD_CATEGORIES[categoryId]
  const items = getAwardsByCategory(categoryId)
  if (items.length === 0) return null

  const topTier = items[0]

  return (
    <div className="mb-12 last:mb-0">
      <div className="mb-6">
        <h3 className="text-2xl font-bold text-primary mb-2 flex items-center gap-2">
          {categoryId === "career" ? (
            <Trophy className="w-6 h-6 text-accent" />
          ) : (
            <AwardIcon className="w-6 h-6 text-accent" />
          )}
          {category.label}
        </h3>
        <p className="text-sm text-muted-foreground leading-relaxed max-w-3xl">
          {category.description}
        </p>
        {topTier ? (
          <p className="text-xs font-semibold text-accent mt-2 uppercase tracking-wider">
            Currently held: {topTier.name}
            {topTier.year ? ` (${topTier.year})` : ""} — Tier 1 of {topTier.totalTiers}
          </p>
        ) : null}
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {items.map((award) => (
          <AwardCard key={award.id} award={award} />
        ))}
      </div>
    </div>
  )
}

export function AwardsShowcase({ variant = "full", className = "" }: AwardsShowcaseProps) {
  const sortedRecognition = [...OTHER_RECOGNITION].sort((a, b) => a.priority - b.priority)

  return (
    <section className={`py-16 md:py-20 bg-secondary border-y border-border ${className}`}>
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-accent/10 border border-accent/30 rounded-full text-sm font-semibold text-primary mb-4">
            <Trophy className="w-4 h-4 text-accent" />
            Officially Recognized by RE/MAX
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-3 tracking-tight">
            Awards &amp; Recognition
          </h2>
          <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto">
            Parveen Arora and Team Arora have earned some of RE/MAX&apos;s most prestigious
            honours — recognizing career-long production, team performance, and industry impact.
          </p>
        </div>

        <CategorySection categoryId="career" />
        <CategorySection categoryId="team" />

        {variant === "full" && sortedRecognition.length > 0 ? (
          <div className="mt-12 pt-10 border-t border-border">
            <h3 className="text-xl font-bold text-primary mb-4 flex items-center gap-2">
              <AwardIcon className="w-5 h-5 text-accent" />
              Additional Recognition
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {sortedRecognition.map((item) => (
                <div
                  key={item.id}
                  className="flex items-start gap-3 bg-white border border-border rounded-lg p-4"
                >
                  <AwardIcon className="w-5 h-5 text-accent shrink-0 mt-0.5" />
                  <div>
                    <div className="font-semibold text-primary text-sm">
                      {item.name}
                      {item.year ? (
                        <span className="text-accent font-bold ml-2">{item.year}</span>
                      ) : null}
                    </div>
                    {item.organization ? (
                      <div className="text-xs text-muted-foreground mt-0.5">{item.organization}</div>
                    ) : null}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : null}
      </div>
    </section>
  )
}
