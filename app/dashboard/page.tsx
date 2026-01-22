"use client"

import { Suspense } from "react"
import EstimateDashboard from "@/components/estimate-dashboard"

function DashboardContent() {
  return <EstimateDashboard />
}

export default function DashboardPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
      <DashboardContent />
    </Suspense>
  )
}
