import Link from "next/link"
import { MapPin, ExternalLink } from "lucide-react"
import { getAgentPageUrl, getAgentPageUrlByKeyword } from "@/lib/seo/parveen-arora"

const cityGroups = [
  {
    region: "Peel Region",
    cities: [
      { name: "Brampton", href: "/home-value-estimator/brampton" },
      { name: "Mississauga", href: "/home-value-estimator/mississauga" },
      { name: "Caledon", href: "/home-value-estimator/caledon" },
    ],
  },
  {
    region: "York Region",
    cities: [
      { name: "Markham", href: "/home-value-estimator/markham" },
      { name: "Vaughan", href: "/home-value-estimator/vaughan" },
      { name: "Richmond Hill", href: "/home-value-estimator/richmond-hill" },
      { name: "Newmarket", href: "/home-value-estimator/newmarket" },
      { name: "Aurora", href: "/home-value-estimator/aurora" },
    ],
  },
  {
    region: "City of Toronto",
    cities: [
      { name: "Toronto", href: "/home-value-estimator/toronto" },
      { name: "Scarborough", href: "/home-value-estimator/scarborough" },
      { name: "Etobicoke", href: "/home-value-estimator/etobicoke" },
      { name: "North York", href: "/home-value-estimator/north-york" },
    ],
  },
  {
    region: "Halton Region",
    cities: [
      { name: "Oakville", href: "/home-value-estimator/oakville" },
      { name: "Burlington", href: "/home-value-estimator/burlington" },
      { name: "Milton", href: "/home-value-estimator/milton" },
    ],
  },
  {
    region: "Durham Region",
    cities: [
      { name: "Pickering", href: "/home-value-estimator/pickering" },
      { name: "Ajax", href: "/home-value-estimator/ajax" },
      { name: "Whitby", href: "/home-value-estimator/whitby" },
      { name: "Oshawa", href: "/home-value-estimator/oshawa" },
    ],
  },
  {
    region: "Other",
    cities: [
      { name: "Hamilton", href: "/home-value-estimator/hamilton" },
      { name: "Cambridge", href: "/home-value-estimator/cambridge" },
    ],
  },
]

export default function Footer() {
  return (
    <footer className="bg-primary text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-accent rounded-lg flex items-center justify-center">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 3L2 12H5V21H19V12H22L12 3Z" fill="white" />
                  <path d="M12 8C10.8954 8 10 8.89543 10 10C10 11.1046 10.8954 12 12 12C13.1046 12 14 11.1046 14 10C14 8.89543 13.1046 8 12 8Z" fill="white" />
                  <circle cx="12" cy="10" r="1.5" fill="#2563eb" />
                  <path d="M9 16H15" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
                  <path d="M10.5 19H13.5" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              </div>
              <div>
                <div className="font-bold text-lg">GetHomeEvaluation.ca</div>
                <div className="text-xs text-white/60 -mt-1">Free Home Value Estimator</div>
              </div>
            </div>
            <p className="text-sm text-white/70 leading-relaxed">
              Free AI-powered home value estimates for Ontario homeowners, provided by Parveen Arora, #1 Real Estate Agent in Brampton & Mississauga.
            </p>
            <div className="space-y-2 text-sm text-white/70">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-accent flex-shrink-0" />
                <span>Brampton, Ontario, Canada</span>
              </div>
            </div>
            <div className="pt-2">
              <h3 className="font-semibold text-white mb-2 text-sm uppercase tracking-wider">
                Quick Links
              </h3>
              <ul className="space-y-1">
                {[
                  { label: "Parveen Arora Profile", href: "/parveen-arora" },
                  { label: "Best Agent in Brampton", href: getAgentPageUrl("brampton") },
                  { label: "Best Agent in Mississauga", href: getAgentPageUrl("mississauga") },
                  { label: "#1 Agent in Brampton", href: getAgentPageUrlByKeyword("brampton", "no1") },
                  { label: "Free Home Estimate", href: "/estimate" },
                  { label: "Contact Us", href: "/contact" },
                  { label: "TeamArora.com", href: "https://teamarora.com", external: true },
                ].map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      target={link.external ? "_blank" : undefined}
                      rel={link.external ? "noopener" : undefined}
                      className="text-sm text-white/70 hover:text-accent transition-colors flex items-center gap-1"
                    >
                      {link.external && <ExternalLink className="w-3 h-3" />}
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* City Pages - organized by region across 3 columns */}
          {[
            // Column 1: Peel + York
            [cityGroups[0], cityGroups[1]],
            // Column 2: Toronto + Halton
            [cityGroups[2], cityGroups[3]],
            // Column 3: Durham + Other
            [cityGroups[4], cityGroups[5]],
          ].map((column, colIdx) => (
            <div key={colIdx} className="space-y-6">
              {column.map((group) => (
                <div key={group.region}>
                  <h3 className="font-semibold text-white mb-2 text-sm uppercase tracking-wider">
                    {group.region}
                  </h3>
                  <ul className="space-y-1">
                    {group.cities.map((city) => {
                      const slug = city.href.split("/").pop() ?? ""
                      return (
                        <li key={city.name} className="space-y-0.5">
                          <Link
                            href={city.href}
                            className="text-sm text-white/70 hover:text-accent transition-colors flex items-center gap-1"
                          >
                            <MapPin className="w-3 h-3 flex-shrink-0" />
                            {city.name} Estimate
                          </Link>
                          <Link
                            href={getAgentPageUrl(slug)}
                            className="text-xs text-white/50 hover:text-accent transition-colors pl-4"
                          >
                            Best Agent
                          </Link>
                        </li>
                      )
                    })}
                  </ul>
                </div>
              ))}
            </div>
          ))}
        </div>

        <div className="border-t border-white/10 mt-10 pt-6">
          <p className="text-xs text-white/40 leading-relaxed mb-4">
            Home value estimates are for informational purposes only and do not constitute a
            formal appraisal. Consult a licensed real estate agent for a complete Comparative
            Market Analysis (CMA). All data is sourced from publicly available records and recent
            MLS sales in your area.
          </p>
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-white/50">
            <span>© {new Date().getFullYear()} GetHomeEvaluation.ca — All rights reserved.</span>
            <span>Powered by Parveen Arora, RE/MAX Optimum Realty</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
