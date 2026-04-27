import type { Metadata } from "next"
import { Suspense } from "react"
import EstimateContent from "./estimate-content"

export const metadata: Metadata = {
  title: "Free Home Value Estimate — Enter Your Address",
  description:
    "Enter your Ontario property address to get a free, instant AI-powered home value estimate. Takes less than 2 minutes. Serving Brampton, Mississauga, Toronto, Scarborough & all of Ontario.",
  alternates: {
    canonical: "/estimate",
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function EstimatePage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
      <EstimateContent />
    </Suspense>
  )
}
