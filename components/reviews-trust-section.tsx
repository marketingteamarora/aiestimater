import Link from "next/link"
import { ExternalLink, ShieldCheck, Star } from "lucide-react"
import { CLIENT_REVIEWS } from "@/lib/seo/reviews"
import { PARVEEN_ARORA } from "@/lib/seo/parveen-arora"

function StarRow({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5" aria-label={`${rating} out of 5 stars`}>
      {[1, 2, 3, 4, 5].map((i) => (
        <Star
          key={i}
          className={`w-4 h-4 ${i <= Math.round(rating) ? "fill-accent text-accent" : "text-border"}`}
        />
      ))}
    </div>
  )
}

interface ReviewsTrustSectionProps {
  cityName?: string
  variant?: "light" | "dark"
}

export function ReviewsTrustSection({ cityName, variant = "light" }: ReviewsTrustSectionProps) {
  const isDark = variant === "dark"

  return (
    <section className={isDark ? "py-16 bg-primary text-white" : "py-16 bg-secondary border-y border-border"}>
      <div className="container mx-auto px-4 max-w-5xl">
        <div className="text-center mb-10">
          <div
            className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold mb-4 ${
              isDark ? "bg-white/10 border border-white/20 text-accent" : "bg-accent/10 border border-accent/30 text-primary"
            }`}
          >
            <ShieldCheck className="w-4 h-4" />
            Verified Client Reviews
          </div>
          <h2 className={`text-3xl md:text-4xl font-bold mb-3 ${isDark ? "text-white" : "text-primary"}`}>
            {CLIENT_REVIEWS.totalDisplay} Reviews — Trusted Across the GTA
          </h2>
          <p className={`max-w-2xl mx-auto leading-relaxed ${isDark ? "text-white/75" : "text-muted-foreground"}`}>
            {cityName
              ? `${PARVEEN_ARORA.name} and ${PARVEEN_ARORA.teamName} are among the most reviewed real estate agents serving ${cityName}. `
              : ""}
            {CLIENT_REVIEWS.summary}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {CLIENT_REVIEWS.platforms.map((platform) => (
            <Link
              key={platform.id}
              href={platform.url}
              target="_blank"
              rel="noopener noreferrer"
              className={`group block rounded-xl border p-5 transition-all hover:shadow-lg ${
                isDark
                  ? "bg-white/5 border-white/15 hover:border-accent/50"
                  : "bg-card border-border hover:border-accent"
              }`}
            >
              <div className="flex items-start justify-between gap-2 mb-3">
                <div className={`font-bold text-sm ${isDark ? "text-white" : "text-primary"}`}>{platform.name}</div>
                <ExternalLink
                  className={`w-4 h-4 shrink-0 opacity-50 group-hover:opacity-100 ${isDark ? "text-accent" : "text-accent"}`}
                />
              </div>
              <div className={`text-2xl font-black mb-1 ${isDark ? "text-accent" : "text-primary"}`}>
                {platform.countDisplay}
                {platform.id !== "remax" && (
                  <span className={`text-sm font-medium ml-1 ${isDark ? "text-white/60" : "text-muted-foreground"}`}>
                    reviews
                  </span>
                )}
              </div>
              {platform.rating ? <StarRow rating={platform.rating} /> : null}
              <p className={`text-xs mt-3 leading-relaxed ${isDark ? "text-white/60" : "text-muted-foreground"}`}>
                {platform.description}
              </p>
            </Link>
          ))}
        </div>

        <p
          className={`text-center text-sm mt-8 ${isDark ? "text-white/60" : "text-muted-foreground"}`}
        >
          {CLIENT_REVIEWS.aggregateRating}/5 average rating across verified platforms
        </p>
      </div>
    </section>
  )
}
