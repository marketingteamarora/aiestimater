"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Menu, X, Phone, ChevronDown, Zap } from "lucide-react"

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-border shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-accent font-bold text-xl">HE</span>
            </div>
            <div className="hidden sm:block">
              <div className="font-bold text-lg text-primary">GetHomeEvaluation.ca</div>
              <div className="text-xs text-muted-foreground -mt-1">Free Home Value Estimator</div>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            <Link href="/" className="text-sm font-medium text-foreground hover:text-accent transition-colors">
              Home
            </Link>
            <Link href="/estimate" className="text-sm font-medium text-foreground hover:text-accent transition-colors">
              Get Estimate
            </Link>
            <div className="relative group">
              <button className="flex items-center gap-1 text-sm font-medium text-foreground hover:text-accent transition-colors py-2">
                Top Agent <ChevronDown className="w-4 h-4" />
              </button>
              <div className="absolute top-full left-0 w-[400px] bg-white border border-border rounded-xl shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50 overflow-hidden">
                <div className="p-4 bg-secondary border-b border-border">
                  <div className="text-sm font-bold text-primary mb-1">Find Your Local Expert</div>
                  <div className="text-xs text-muted-foreground">Team Arora serves the entire Greater Toronto Area.</div>
                </div>
                <div className="grid grid-cols-2 p-2">
                  <Link href="/top-agent/brampton" className="block px-4 py-2 text-sm text-foreground hover:bg-secondary hover:text-accent rounded-md transition-colors">
                    Brampton
                  </Link>
                  <Link href="/top-agent/mississauga" className="block px-4 py-2 text-sm text-foreground hover:bg-secondary hover:text-accent rounded-md transition-colors">
                    Mississauga
                  </Link>
                  <Link href="/top-agent/toronto" className="block px-4 py-2 text-sm text-foreground hover:bg-secondary hover:text-accent rounded-md transition-colors">
                    Toronto
                  </Link>
                  <Link href="/top-agent/oakville" className="block px-4 py-2 text-sm text-foreground hover:bg-secondary hover:text-accent rounded-md transition-colors">
                    Oakville
                  </Link>
                  <Link href="/top-agent/vaughan" className="block px-4 py-2 text-sm text-foreground hover:bg-secondary hover:text-accent rounded-md transition-colors">
                    Vaughan
                  </Link>
                  <Link href="/top-agent/markham" className="block px-4 py-2 text-sm text-foreground hover:bg-secondary hover:text-accent rounded-md transition-colors">
                    Markham
                  </Link>
                  <Link href="/top-agent/caledon" className="block px-4 py-2 text-sm text-foreground hover:bg-secondary hover:text-accent rounded-md transition-colors">
                    Caledon
                  </Link>
                  <Link href="/top-agent/gta" className="block px-4 py-2 text-sm font-medium text-accent hover:bg-secondary rounded-md transition-colors">
                    View All GTA
                  </Link>
                </div>
                <div className="p-3 bg-primary/5 border-t border-border">
                  <Link href="/estimate" className="flex items-center justify-center gap-2 w-full py-2 bg-accent text-primary font-bold rounded-lg hover:bg-yellow-400 transition-colors">
                    <Zap className="w-4 h-4" />
                    Free AI Home Estimate
                  </Link>
                </div>
              </div>
            </div>
            <Link href="/home-value-estimator/brampton" className="text-sm font-medium text-foreground hover:text-accent transition-colors">
              Cities
            </Link>
            <Link href="/contact" className="text-sm font-medium text-foreground hover:text-accent transition-colors">
              Contact
            </Link>
          </nav>

          {/* CTA Button */}
          <div className="hidden md:flex items-center gap-4">
            <Button asChild className="bg-accent text-accent-foreground hover:bg-gold-dark">
              <Link href="/estimate">
                Get Free Estimate
              </Link>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 text-foreground"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="md:hidden py-4 border-t border-border">
            <div className="flex flex-col gap-4">
              <Link
                href="/"
                className="text-sm font-medium text-foreground hover:text-accent transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <Link
                href="/estimate"
                className="text-sm font-medium text-foreground hover:text-accent transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Get Estimate
              </Link>
              <div className="py-2 space-y-2 border-y border-border my-2">
                <div className="text-sm font-semibold text-foreground px-2 pt-2">Top Agent Areas</div>
                <div className="grid grid-cols-2 gap-1 px-2">
                  <Link href="/top-agent/brampton" className="block text-sm text-muted-foreground hover:text-accent transition-colors p-2" onClick={() => setIsMenuOpen(false)}>Brampton</Link>
                  <Link href="/top-agent/mississauga" className="block text-sm text-muted-foreground hover:text-accent transition-colors p-2" onClick={() => setIsMenuOpen(false)}>Mississauga</Link>
                  <Link href="/top-agent/toronto" className="block text-sm text-muted-foreground hover:text-accent transition-colors p-2" onClick={() => setIsMenuOpen(false)}>Toronto</Link>
                  <Link href="/top-agent/oakville" className="block text-sm text-muted-foreground hover:text-accent transition-colors p-2" onClick={() => setIsMenuOpen(false)}>Oakville</Link>
                  <Link href="/top-agent/vaughan" className="block text-sm text-muted-foreground hover:text-accent transition-colors p-2" onClick={() => setIsMenuOpen(false)}>Vaughan</Link>
                  <Link href="/top-agent/markham" className="block text-sm text-muted-foreground hover:text-accent transition-colors p-2" onClick={() => setIsMenuOpen(false)}>Markham</Link>
                </div>
                <div className="px-2 pb-2">
                  <Link href="/estimate" className="flex items-center justify-center gap-2 w-full py-2 bg-accent text-primary font-bold rounded-lg hover:bg-yellow-400 transition-colors mt-2" onClick={() => setIsMenuOpen(false)}>
                    <Zap className="w-4 h-4" /> Free AI Home Estimate
                  </Link>
                </div>
              </div>
              <Link
                href="/contact"
                className="text-sm font-medium text-foreground hover:text-accent transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Contact
              </Link>
              <Button asChild className="bg-accent text-accent-foreground hover:bg-gold-dark w-full">
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
