import HeroSection from "@/components/hero-section"
import { Card, CardContent } from "@/components/ui/card"
import { Brain, TrendingUp, Shield, Zap } from "lucide-react"

export default function HomePage() {
  return (
    <main className="min-h-screen">
      <HeroSection />

      <section className="py-20 bg-secondary">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">Powered by Advanced AI Technology</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Get the most accurate property valuations using cutting-edge artificial intelligence
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            <Card className="border-2 hover:border-accent transition-colors">
              <CardContent className="pt-6 text-center space-y-3">
                <div className="w-14 h-14 bg-accent/10 rounded-full flex items-center justify-center mx-auto">
                  <Brain className="w-7 h-7 text-primary" />
                </div>
                <h3 className="font-bold text-lg">AI Analysis</h3>
                <p className="text-sm text-muted-foreground">
                  Machine learning algorithms analyze millions of property records
                </p>
              </CardContent>
            </Card>

            <Card className="border-2 hover:border-accent transition-colors">
              <CardContent className="pt-6 text-center space-y-3">
                <div className="w-14 h-14 bg-accent/10 rounded-full flex items-center justify-center mx-auto">
                  <Zap className="w-7 h-7 text-primary" />
                </div>
                <h3 className="font-bold text-lg">Instant Results</h3>
                <p className="text-sm text-muted-foreground">Get your property estimate in seconds, not days</p>
              </CardContent>
            </Card>

            <Card className="border-2 hover:border-accent transition-colors">
              <CardContent className="pt-6 text-center space-y-3">
                <div className="w-14 h-14 bg-accent/10 rounded-full flex items-center justify-center mx-auto">
                  <TrendingUp className="w-7 h-7 text-primary" />
                </div>
                <h3 className="font-bold text-lg">Market Trends</h3>
                <p className="text-sm text-muted-foreground">Real-time data from local market conditions</p>
              </CardContent>
            </Card>

            <Card className="border-2 hover:border-accent transition-colors">
              <CardContent className="pt-6 text-center space-y-3">
                <div className="w-14 h-14 bg-accent/10 rounded-full flex items-center justify-center mx-auto">
                  <Shield className="w-7 h-7 text-primary" />
                </div>
                <h3 className="font-bold text-lg">95% Accurate</h3>
                <p className="text-sm text-muted-foreground">Trusted by thousands of homeowners across Ontario</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </main>
  )
}
