import Link from "next/link"
import { MapPin, Phone, Mail, ExternalLink } from "lucide-react"

const cities = [
  { name: "Brampton", href: "/home-value-estimator/brampton" },
  { name: "Mississauga", href: "/home-value-estimator/mississauga" },
  { name: "Toronto", href: "/home-value-estimator/toronto" },
  { name: "Scarborough", href: "/home-value-estimator/scarborough" },
  { name: "Cambridge", href: "/home-value-estimator/cambridge" },
  { name: "Oakville", href: "/home-value-estimator/oakville" },
]

export default function Footer() {
  return (
    <footer className="bg-primary text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-accent rounded-lg flex items-center justify-center">
                <span className="text-primary font-bold text-xl">HE</span>
              </div>
              <div>
                <div className="font-bold text-lg">GetHomeEvaluation.ca</div>
                <div className="text-xs text-white/60 -mt-1">Free Home Value Estimator</div>
              </div>
            </div>
            <p className="text-sm text-white/70 leading-relaxed">
              Free AI-powered home value estimates for Ontario homeowners. Serving Brampton,
              Mississauga, Toronto, and all of Ontario.
            </p>
            <div className="space-y-2 text-sm text-white/70">
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-accent flex-shrink-0" />
                <span>(905) 488-7827</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-accent flex-shrink-0" />
                <span>info@gethomeevaluation.ca</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-accent flex-shrink-0" />
                <span>Brampton, Ontario, Canada</span>
              </div>
            </div>
          </div>

          {/* City Pages */}
          <div>
            <h3 className="font-semibold text-white mb-4 text-sm uppercase tracking-wider">
              Home Value by City
            </h3>
            <ul className="space-y-2">
              {cities.map((city) => (
                <li key={city.name}>
                  <Link
                    href={city.href}
                    className="text-sm text-white/70 hover:text-accent transition-colors flex items-center gap-1"
                  >
                    <MapPin className="w-3 h-3" />
                    {city.name} Home Value Estimator
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-white mb-4 text-sm uppercase tracking-wider">
              Quick Links
            </h3>
            <ul className="space-y-2">
              {[
                { label: "Free Home Estimate", href: "/estimate" },
                { label: "Contact Us", href: "/contact" },
                { label: "RE/MAX Optimum Realty", href: "https://teamarora.com", external: true },
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
            <div className="mt-6">
              <p className="text-xs text-white/50 leading-relaxed">
                Home value estimates are for informational purposes only and do not constitute a
                formal appraisal. Consult a licensed real estate agent for a complete market
                analysis.
              </p>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 mt-10 pt-6 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-white/50">
          <span>© {new Date().getFullYear()} GetHomeEvaluation.ca — All rights reserved.</span>
          <span>Powered by RE/MAX Optimum Realty, Brampton, Ontario</span>
        </div>
      </div>
    </footer>
  )
}
