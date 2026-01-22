import Link from "next/link"
import { Facebook, Instagram, Linkedin, Mail, Phone, MapPin } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-primary text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-accent rounded-lg flex items-center justify-center">
                <span className="text-primary font-bold text-xl">PV</span>
              </div>
              <div>
                <div className="font-bold text-lg">PropValue AI</div>
                <div className="text-xs text-white/70 -mt-1">Smart Estimates</div>
              </div>
            </div>
            <p className="text-sm text-white/70">
              Get instant AI-powered property valuations. Fast, accurate, and free home value estimates for Ontario.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/" className="text-white/70 hover:text-accent transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/estimate" className="text-white/70 hover:text-accent transition-colors">
                  Get Estimate
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-white/70 hover:text-accent transition-colors">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-semibold mb-4">Services</h3>
            <ul className="space-y-2 text-sm text-white/70">
              <li>Property Valuation</li>
              <li>Home Selling</li>
              <li>Home Buying</li>
              <li>Market Analysis</li>
              <li>Free Consultation</li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold mb-4">Contact</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center gap-2 text-white/70">
                <Mail className="w-4 h-4 text-accent" />
                <a href="mailto:hello@propvalue.ai" className="hover:text-accent transition-colors">
                  hello@propvalue.ai
                </a>
              </li>
            </ul>
            <div className="flex gap-3 mt-4">
              <a
                href="#"
                className="w-8 h-8 bg-white/10 rounded-full flex items-center justify-center hover:bg-accent transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href="#"
                className="w-8 h-8 bg-white/10 rounded-full flex items-center justify-center hover:bg-accent transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="#"
                className="w-8 h-8 bg-white/10 rounded-full flex items-center justify-center hover:bg-accent transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 mt-8 pt-8 text-center text-sm text-white/70">
          <p>&copy; {new Date().getFullYear()} PropValue AI. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
