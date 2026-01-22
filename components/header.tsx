"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Menu, X, Phone } from "lucide-react"

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-border shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-accent font-bold text-xl">PV</span>
            </div>
            <div className="hidden sm:block">
              <div className="font-bold text-lg text-primary">PropValue AI</div>
              <div className="text-xs text-muted-foreground -mt-1">Smart Estimates</div>
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
