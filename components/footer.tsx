// Footer component - displays only the brand logo

export default function Footer() {
  return (
    <footer className="bg-primary text-white">
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-center">
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
          </div>
        </div>
      </div>
    </footer>
  )
}
