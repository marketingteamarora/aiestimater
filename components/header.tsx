"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Menu, X, ChevronDown, Zap, MapPin, Star } from "lucide-react"
import { agentCities, agentCitySlugs } from "@/lib/seo/agent-cities"
import { getAgentPageUrl, getAgentPageUrlByKeyword } from "@/lib/seo/parveen-arora"

const navAgentCities = agentCitySlugs.filter((s) => s !== "gta")

function formatCityLabel(slug: string): string {
  return agentCities[slug]?.name ?? slug.replace(/-/g, " ")
}

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isAgentMenuOpen, setIsAgentMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-border shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2 shrink-0">
            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-accent font-bold text-xl">HE</span>
            </div>
            <div className="hidden sm:block">
              <div className="font-bold text-lg text-primary">GetHomeEvaluation.ca</div>
              <div className="text-xs text-muted-foreground -mt-1">Free Home Value Estimator</div>
            </div>
          </Link>

          <nav className="hidden lg:flex items-center gap-5">
            <Link
              href="/"
              className="text-sm font-medium text-foreground hover:text-gold-dark transition-colors"
            >
              Home
            </Link>
            <Link
              href="/estimate"
              className="text-sm font-medium text-foreground hover:text-gold-dark transition-colors"
            >
              Get Estimate
            </Link>
            <Link
              href="/parveen-arora"
              className="text-sm font-medium text-foreground hover:text-gold-dark transition-colors"
            >
              Parveen Arora
            </Link>

            {/* Agent dropdown — bridge padding prevents hover gap */}
            <div
              className="relative"
              onMouseEnter={() => setIsAgentMenuOpen(true)}
              onMouseLeave={() => setIsAgentMenuOpen(false)}
            >
              <button
                type="button"
                className="flex items-center gap-1.5 text-sm font-medium text-foreground hover:text-gold-dark transition-colors py-2"
                aria-expanded={isAgentMenuOpen}
                aria-haspopup="true"
              >
                <Star className="w-4 h-4 text-accent shrink-0" />
                Best Agent
                <ChevronDown
                  className={`w-4 h-4 text-foreground shrink-0 transition-transform ${isAgentMenuOpen ? "rotate-180" : ""}`}
                />
              </button>

              {isAgentMenuOpen && (
                <div className="absolute top-full left-0 pt-2 w-[440px] z-50">
                  <div className="bg-white border border-border rounded-xl shadow-xl overflow-hidden">
                    <div className="p-4 bg-secondary border-b border-border">
                      <div className="text-sm font-bold text-primary">Parveen Arora — RE/MAX Optimum Realty</div>
                      <div className="text-xs text-muted-foreground mt-1">
                        Best, #1, and top agent pages by city
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-1 p-2 max-h-64 overflow-y-auto">
                      {navAgentCities.map((slug) => (
                        <Link
                          key={slug}
                          href={getAgentPageUrl(slug)}
                          className="flex items-center gap-2 px-3 py-2.5 text-sm text-foreground hover:bg-secondary hover:text-primary rounded-md transition-colors"
                        >
                          <MapPin className="w-3.5 h-3.5 text-accent shrink-0" />
                          <span className="font-medium">Best Agent — {formatCityLabel(slug)}</span>
                        </Link>
                      ))}
                    </div>

                    <div className="grid grid-cols-3 gap-2 p-3 border-t border-border bg-muted/30 text-center">
                      <Link
                        href={getAgentPageUrlByKeyword("brampton", "best")}
                        className="text-xs font-semibold text-primary hover:text-gold-dark py-1"
                      >
                        Best
                      </Link>
                      <Link
                        href={getAgentPageUrlByKeyword("brampton", "no1")}
                        className="text-xs font-semibold text-primary hover:text-gold-dark py-1"
                      >
                        #1
                      </Link>
                      <Link
                        href={getAgentPageUrlByKeyword("brampton", "top")}
                        className="text-xs font-semibold text-primary hover:text-gold-dark py-1"
                      >
                        Top
                      </Link>
                    </div>

                    <div className="p-3 border-t border-border">
                      <Link
                        href="/estimate"
                        className="flex items-center justify-center gap-2 w-full py-2.5 bg-accent text-primary font-bold rounded-lg hover:bg-gold-dark transition-colors"
                      >
                        <Zap className="w-4 h-4 shrink-0" />
                        Free AI Home Estimate
                      </Link>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <Link
              href="/home-value-estimator/brampton"
              className="text-sm font-medium text-foreground hover:text-gold-dark transition-colors"
            >
              Cities
            </Link>
            <Link
              href="/contact"
              className="text-sm font-medium text-foreground hover:text-gold-dark transition-colors"
            >
              Contact
            </Link>
          </nav>

          <div className="hidden lg:flex items-center gap-4">
            <Button asChild className="bg-accent text-primary hover:bg-gold-dark font-semibold">
              <Link href="/estimate">Get Free Estimate</Link>
            </Button>
          </div>

          <button
            type="button"
            className="lg:hidden p-2 text-primary"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {isMenuOpen && (
          <nav className="lg:hidden py-4 border-t border-border">
            <div className="flex flex-col gap-3">
              <Link href="/" className="text-sm font-medium text-foreground py-2" onClick={() => setIsMenuOpen(false)}>
                Home
              </Link>
              <Link href="/estimate" className="text-sm font-medium text-foreground py-2" onClick={() => setIsMenuOpen(false)}>
                Get Estimate
              </Link>
              <Link href="/parveen-arora" className="text-sm font-medium text-foreground py-2" onClick={() => setIsMenuOpen(false)}>
                Parveen Arora
              </Link>

              <div className="py-3 border-y border-border space-y-2">
                <div className="flex items-center gap-2 text-sm font-semibold text-primary px-1">
                  <Star className="w-4 h-4 text-accent" />
                  Best Agent by City
                </div>
                <div className="grid grid-cols-2 gap-1 max-h-52 overflow-y-auto">
                  {navAgentCities.slice(0, 10).map((slug) => (
                    <Link
                      key={slug}
                      href={getAgentPageUrl(slug)}
                      className="flex items-center gap-1.5 text-sm text-foreground hover:text-gold-dark p-2 rounded-md hover:bg-secondary"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <MapPin className="w-3.5 h-3.5 text-accent shrink-0" />
                      {formatCityLabel(slug)}
                    </Link>
                  ))}
                </div>
                <Link
                  href="/estimate"
                  className="flex items-center justify-center gap-2 w-full py-2.5 bg-accent text-primary font-bold rounded-lg hover:bg-gold-dark mt-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <Zap className="w-4 h-4 shrink-0" />
                  Free AI Home Estimate
                </Link>
              </div>

              <Link href="/contact" className="text-sm font-medium text-foreground py-2" onClick={() => setIsMenuOpen(false)}>
                Contact
              </Link>
              <Button asChild className="bg-accent text-primary hover:bg-gold-dark w-full font-semibold">
                <Link href="/estimate" onClick={() => setIsMenuOpen(false)}>
                  Get Free Estimate
                </Link>
              </Button>
            </div>
          </nav>
        )}
      </div>
    </header>
  )
}
