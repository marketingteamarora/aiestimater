import type { Metadata } from "next"
import Link from "next/link"
import { MapPin, Zap, CheckCircle2, TrendingUp, Brain, Users, Star } from "lucide-react"

interface CityConfig {
  name: string
  slug: string
  region: string
  description: string
  avgPrice: string
  marketTrend: string
  highlights: string[]
  neighborhoods: string[]
}

const cities: Record<string, CityConfig> = {
  brampton: {
    name: "Brampton",
    slug: "brampton",
    region: "Peel Region",
    description:
      "Brampton is one of Canada's fastest-growing cities and one of Ontario's hottest real estate markets. With strong demand driven by proximity to Toronto, excellent transit connections, and diverse communities, Brampton home values have seen consistent appreciation. Our free home value estimator gives you an accurate, data-driven estimate for your Brampton property.",
    avgPrice: "$950,000+",
    marketTrend: "Strong demand driven by population growth",
    highlights: [
      "Major GO Transit hub connecting to downtown Toronto",
      "Rapidly growing tech and business sector",
      "Diverse, family-friendly neighbourhoods",
      "Strong long-term appreciation history",
    ],
    neighborhoods: [
      "Springdale",
      "Heart Lake",
      "Castlemore",
      "Fletcher's Meadow",
      "Bramalea",
      "Mount Pleasant",
    ],
  },
  mississauga: {
    name: "Mississauga",
    slug: "mississauga",
    region: "Peel Region",
    description:
      "Mississauga is Ontario's second-largest city and one of the most desirable real estate markets in the Greater Toronto Area. From Port Credit waterfront condos to Streetsville detached homes, Mississauga offers a wide range of property types. Our AI-powered home value estimator provides accurate valuations across all Mississauga neighbourhoods.",
    avgPrice: "$1,000,000+",
    marketTrend: "Premium market with consistent demand",
    highlights: [
      "Home to major corporate headquarters",
      "Port Credit and Lakeview waterfront communities",
      "Excellent MiWay and GO Transit access",
      "Strong condo and detached home market",
    ],
    neighborhoods: [
      "Port Credit",
      "Streetsville",
      "Erin Mills",
      "Meadowvale",
      "Cooksville",
      "Lakeview",
    ],
  },
  toronto: {
    name: "Toronto",
    slug: "toronto",
    region: "City of Toronto",
    description:
      "Toronto is Canada's largest city and most dynamic real estate market. Whether you own a downtown condo, a midtown semi-detached, or a north Toronto bungalow, knowing your home's current value is essential. Our free home value estimator uses real Toronto MLS sales data to give you an accurate property valuation instantly.",
    avgPrice: "$1,100,000+",
    marketTrend: "Canada's most liquid real estate market",
    highlights: [
      "Canada's financial and cultural capital",
      "Strongest condo appreciation in North America",
      "Extensive TTC subway and transit network",
      "Diverse neighbourhoods from Scarborough to Etobicoke",
    ],
    neighborhoods: ["Downtown Core", "North York", "Etobicoke", "East York", "Midtown", "West End"],
  },
  scarborough: {
    name: "Scarborough",
    slug: "scarborough",
    region: "City of Toronto (East)",
    description:
      "Scarborough offers some of the most affordable entry points into the Toronto real estate market, with strong detached home values and growing condo development. From Agincourt to Cliffside, Scarborough home values have been appreciating steadily. Get your free Scarborough home value estimate in seconds.",
    avgPrice: "$850,000+",
    marketTrend: "Strong value appreciation, increasing demand",
    highlights: [
      "More affordable entry into the Toronto market",
      "Bluffers Park and waterfront communities",
      "Strong STC and transit connectivity",
      "Growing tech and business presence",
    ],
    neighborhoods: [
      "Agincourt",
      "Malvern",
      "Cliffside",
      "West Hill",
      "Rouge",
      "Wexford-Maryvale",
    ],
  },
  cambridge: {
    name: "Cambridge",
    slug: "cambridge",
    region: "Waterloo Region",
    description:
      "Cambridge is one of the fastest-appreciating real estate markets in Ontario's Waterloo Region. With strong employment from major manufacturers and tech companies, Cambridge home values have surged in recent years. Our AI-powered estimator uses local Cambridge sales data for accurate, instant property valuations.",
    avgPrice: "$750,000+",
    marketTrend: "High appreciation driven by tech corridor",
    highlights: [
      "Access to Waterloo tech corridor employment",
      "Significantly more affordable than GTA cities",
      "Strong rental demand from universities",
      "ION Light Rail Transit expansion",
    ],
    neighborhoods: ["Galt", "Preston", "Hespeler", "Blair", "Alison", "Westview"],
  },
  oakville: {
    name: "Oakville",
    slug: "oakville",
    region: "Halton Region",
    description:
      "Oakville is one of Ontario's most prestigious real estate markets, known for its luxury homes, excellent schools, and waterfront communities. Oakville consistently ranks among Canada's wealthiest communities, with home values reflecting its premium status. Get an accurate free home value estimate for your Oakville property.",
    avgPrice: "$1,500,000+",
    marketTrend: "Premium luxury market with high demand",
    highlights: [
      "Top-rated schools including Appleby College",
      "Upscale waterfront and golf course communities",
      "Strong GO Transit connection to Toronto",
      "One of Canada's highest median household incomes",
    ],
    neighborhoods: [
      "Old Oakville",
      "Bronte",
      "Glen Abbey",
      "Joshua Creek",
      "Iroquois Ridge",
      "West Oak Trails",
    ],
  },
  markham: {
    name: "Markham",
    slug: "markham",
    region: "York Region",
    description:
      "Markham is Canada's high-tech capital and one of the GTA's most desirable real estate markets. Known for its excellent schools, vibrant multicultural communities, and booming tech sector, Markham home values have consistently outperformed GTA averages. Our free home value estimator uses real Markham MLS data for accurate property valuations.",
    avgPrice: "$1,200,000+",
    marketTrend: "Tech-driven demand with strong appreciation",
    highlights: [
      "Canada's high-tech capital with IBM, AMD, Qualcomm",
      "Top-ranked public and private schools",
      "Rapidly expanding Viva transit network",
      "Strong multicultural communities driving demand",
    ],
    neighborhoods: [
      "Unionville",
      "Markham Village",
      "Cornell",
      "Cathedraltown",
      "Berczy",
      "Wismer Commons",
    ],
  },
  vaughan: {
    name: "Vaughan",
    slug: "vaughan",
    region: "York Region",
    description:
      "Vaughan is one of the fastest-growing cities in the GTA, anchored by the Vaughan Metropolitan Centre and Canada's Wonderland corridor. With the TTC subway extension bringing rapid transit, Vaughan real estate has seen exceptional appreciation. Get your free Vaughan home value estimate instantly with our AI tool.",
    avgPrice: "$1,150,000+",
    marketTrend: "Subway-driven growth and new development",
    highlights: [
      "TTC Line 1 extension to Vaughan Metropolitan Centre",
      "Major retail and entertainment hub",
      "Rapidly growing condo and townhouse market",
      "Strategic location at Highways 400 and 407",
    ],
    neighborhoods: [
      "Kleinburg",
      "Woodbridge",
      "Maple",
      "Thornhill",
      "Concord",
      "Patterson",
    ],
  },
  "richmond-hill": {
    name: "Richmond Hill",
    slug: "richmond-hill",
    region: "York Region",
    description:
      "Richmond Hill is one of York Region's most sought-after communities, offering a blend of suburban living with excellent transit connections to downtown Toronto. With top-rated schools, lush green spaces, and a thriving local economy, Richmond Hill home values remain strong. Get your free home value estimate for Richmond Hill today.",
    avgPrice: "$1,300,000+",
    marketTrend: "Steady demand driven by schools and transit",
    highlights: [
      "Top-rated schools attracting families",
      "GO Transit and Viva rapid transit access",
      "Richmond Green Sports Centre and park system",
      "Diverse dining and shopping along Yonge Street",
    ],
    neighborhoods: [
      "Oak Ridges",
      "Mill Pond",
      "Jefferson",
      "Westbrook",
      "Rouge Woods",
      "Bayview Hill",
    ],
  },
  newmarket: {
    name: "Newmarket",
    slug: "newmarket",
    region: "York Region",
    description:
      "Newmarket offers an appealing mix of small-town charm and modern amenities in York Region. With a revitalized historic Main Street, excellent schools, and more affordable entry points than southern York Region, Newmarket is attracting young families and investors alike. Get your free Newmarket home value estimate.",
    avgPrice: "$900,000+",
    marketTrend: "Growing demand with improving transit links",
    highlights: [
      "Charming historic Main Street district",
      "More affordable than Markham and Vaughan",
      "Strong GO Transit commuter connection",
      "Excellent recreation and trail system",
    ],
    neighborhoods: [
      "Stonehaven",
      "Woodland Hills",
      "Bristol-London",
      "Summerhill Estates",
      "Glenway",
      "College Manor",
    ],
  },
  aurora: {
    name: "Aurora",
    slug: "aurora",
    region: "York Region",
    description:
      "Aurora is a premium residential community in York Region, known for its heritage architecture, excellent schools, and family-friendly atmosphere. With strong demand from professionals commuting to Toronto, Aurora home values have shown consistent long-term growth. Get an accurate free home value estimate for your Aurora property.",
    avgPrice: "$1,100,000+",
    marketTrend: "Premium residential market with consistent growth",
    highlights: [
      "Heritage homes and mature tree-lined streets",
      "Highly rated public and Catholic schools",
      "GO Transit express service to Union Station",
      "Award-winning parks and recreation facilities",
    ],
    neighborhoods: [
      "Aurora Village",
      "Bayview Northeast",
      "Aurora Highlands",
      "Hills of St. Andrew's",
      "Stonebridge",
      "Aurora Grove",
    ],
  },
  milton: {
    name: "Milton",
    slug: "milton",
    region: "Halton Region",
    description:
      "Milton has been one of Canada's fastest-growing towns for over a decade, driven by new family-friendly developments and proximity to major GTA employment centres. With more affordable pricing compared to Oakville and Burlington, Milton offers strong value for buyers. Our AI estimates Milton home values using the latest local sales data.",
    avgPrice: "$950,000+",
    marketTrend: "Fast growth with strong new construction",
    highlights: [
      "One of Canada's fastest-growing municipalities",
      "Significantly more affordable than south Halton",
      "Strong GO Transit Milton line service",
      "New schools and community infrastructure",
    ],
    neighborhoods: [
      "Old Milton",
      "Willmott",
      "Bronte Meadows",
      "Scott",
      "Harrison",
      "Dempsey",
    ],
  },
  burlington: {
    name: "Burlington",
    slug: "burlington",
    region: "Halton Region",
    description:
      "Burlington is a vibrant lakefront city offering a high quality of life with excellent schools, a revitalized downtown, and stunning waterfront trails. Burlington real estate attracts families, professionals, and retirees alike with its blend of urban amenities and natural beauty. Get your free Burlington home value estimate.",
    avgPrice: "$1,050,000+",
    marketTrend: "Stable premium market with lakefront demand",
    highlights: [
      "Beautiful Lake Ontario waterfront and Spencer Smith Park",
      "Revitalized downtown with dining and shops",
      "Strong GO Transit connection to Toronto and Hamilton",
      "Top-rated schools in Halton District School Board",
    ],
    neighborhoods: [
      "Downtown Burlington",
      "Aldershot",
      "Tyandaga",
      "Orchard",
      "Millcroft",
      "Palmer",
    ],
  },
  hamilton: {
    name: "Hamilton",
    slug: "hamilton",
    region: "City of Hamilton",
    description:
      "Hamilton has emerged as one of Ontario's hottest real estate markets, driven by relative affordability, a revitalized downtown arts scene, and excellent GO Transit connections to Toronto. Known as the 'Hammer,' Hamilton's diverse neighbourhoods offer everything from Victorian heritage homes to modern condos. Get your free Hamilton home value estimate.",
    avgPrice: "$750,000+",
    marketTrend: "Strong appreciation driven by GTA affordability migration",
    highlights: [
      "Most affordable major GTA-adjacent city",
      "Booming arts, culture, and restaurant scene",
      "GO Transit expansion with all-day service",
      "McMaster University driving rental demand",
    ],
    neighborhoods: [
      "Westdale",
      "Locke Street",
      "Dundas",
      "Ancaster",
      "Stoney Creek",
      "Waterdown",
    ],
  },
  whitby: {
    name: "Whitby",
    slug: "whitby",
    region: "Durham Region",
    description:
      "Whitby is Durham Region's most popular residential community, offering excellent schools, family-friendly neighbourhoods, and strong GO Transit connections to Toronto. With Brooklin's rapid growth and the waterfront harbour area, Whitby provides diverse housing options. Get your free Whitby home value estimate instantly.",
    avgPrice: "$850,000+",
    marketTrend: "Strong family demand with new developments",
    highlights: [
      "Top-rated Durham District School Board schools",
      "Whitby GO Station with express Toronto service",
      "Brooklin — one of GTA's fastest-growing communities",
      "Beautiful harbour and waterfront trail system",
    ],
    neighborhoods: [
      "Brooklin",
      "Williamsburg",
      "Blue Grass Meadows",
      "Port Whitby",
      "Lynde Creek",
      "Pringle Creek",
    ],
  },
  oshawa: {
    name: "Oshawa",
    slug: "oshawa",
    region: "Durham Region",
    description:
      "Oshawa offers some of the most affordable home prices in the GTA, making it an attractive market for first-time buyers and investors. With Ontario Tech University, a revitalizing downtown, and strong GO Transit service, Oshawa home values have been steadily climbing. Get your free Oshawa home value estimate.",
    avgPrice: "$700,000+",
    marketTrend: "Affordable entry point with strong upside",
    highlights: [
      "Most affordable entry into the GTA market",
      "Ontario Tech University and Durham College driving demand",
      "GO Transit Lakeshore East line to Toronto",
      "Major revitalization of downtown core",
    ],
    neighborhoods: [
      "Taunton",
      "Windfields",
      "Northwood",
      "Samac",
      "Lakeview",
      "McLaughlin",
    ],
  },
  ajax: {
    name: "Ajax",
    slug: "ajax",
    region: "Durham Region",
    description:
      "Ajax is a growing lakefront community in Durham Region, known for its excellent waterfront trails, family-friendly neighbourhoods, and strong commuter rail connections. With a mix of new developments and established communities, Ajax offers strong value in the eastern GTA. Get your free Ajax home value estimate.",
    avgPrice: "$800,000+",
    marketTrend: "Waterfront community with growing demand",
    highlights: [
      "Beautiful Lake Ontario waterfront and trail system",
      "Ajax GO Station with frequent Toronto service",
      "New commercial development at Harwood and Salem",
      "Award-winning community parks and recreation",
    ],
    neighborhoods: [
      "South Ajax",
      "Pickering Beach",
      "Audley",
      "Village Green",
      "Central East Ajax",
      "Central West Ajax",
    ],
  },
  pickering: {
    name: "Pickering",
    slug: "pickering",
    region: "Durham Region",
    description:
      "Pickering sits at the gateway to Durham Region, offering excellent GO Transit access and proximity to both Toronto and the eastern GTA. With the massive Pickering City Centre development underway, the city is poised for significant growth. Get your free Pickering home value estimate using our AI-powered tool.",
    avgPrice: "$900,000+",
    marketTrend: "Major development driving future growth",
    highlights: [
      "Gateway to Durham Region — closest to Toronto",
      "Pickering Town Centre and new City Centre development",
      "Rouge National Urban Park on western border",
      "Excellent GO Transit with express Toronto service",
    ],
    neighborhoods: [
      "Village East",
      "Amberlea",
      "Dunbarton",
      "Highbush",
      "Liverpool",
      "Bay Ridges",
    ],
  },
  caledon: {
    name: "Caledon",
    slug: "caledon",
    region: "Peel Region",
    description:
      "Caledon is Peel Region's most spacious and rural community, offering large lots, estate homes, and a peaceful lifestyle while remaining within the GTA. With Bolton's growth as a commercial hub, Caledon attracts buyers seeking space and privacy. Get your free Caledon home value estimate.",
    avgPrice: "$1,100,000+",
    marketTrend: "Estate and rural premium market",
    highlights: [
      "Large lot sizes and estate properties",
      "Bruce Trail and Caledon Trailway access",
      "Bolton — growing commercial and retail hub",
      "Rural charm with GTA proximity",
    ],
    neighborhoods: [
      "Bolton",
      "Palgrave",
      "Caledon Village",
      "Caledon East",
      "Inglewood",
      "Cheltenham",
    ],
  },
  etobicoke: {
    name: "Etobicoke",
    slug: "etobicoke",
    region: "City of Toronto (West)",
    description:
      "Etobicoke is Toronto's western district, offering everything from luxury waterfront condos along the Humber Bay corridor to affordable family homes in established neighbourhoods. With strong transit connections and proximity to Pearson Airport, Etobicoke remains one of Toronto's most diverse real estate markets. Get your free Etobicoke home value estimate.",
    avgPrice: "$900,000+",
    marketTrend: "Diverse market with waterfront premium",
    highlights: [
      "Humber Bay waterfront condo corridor",
      "Proximity to Toronto Pearson International Airport",
      "Strong TTC subway and GO Transit access",
      "Established family neighbourhoods with mature trees",
    ],
    neighborhoods: [
      "Humber Bay",
      "Mimico",
      "Islington-City Centre West",
      "Kingsway South",
      "Long Branch",
      "Rexdale",
    ],
  },
  "north-york": {
    name: "North York",
    slug: "north-york",
    region: "City of Toronto (North)",
    description:
      "North York is Toronto's dynamic northern district, home to the Yonge and Sheppard condo corridor, family-friendly suburbs, and excellent schools. With three TTC subway stations and rapid condo development, North York home values have seen exceptional appreciation. Get your free North York home value estimate.",
    avgPrice: "$950,000+",
    marketTrend: "Condo corridor growth with strong family demand",
    highlights: [
      "Yonge-Sheppard and Yonge-Finch condo corridors",
      "Three TTC subway lines running through the district",
      "Top-ranked North York schools",
      "Strong mix of condos, semis, and detached homes",
    ],
    neighborhoods: [
      "Willowdale",
      "Bayview Village",
      "Don Mills",
      "Downsview",
      "York Mills",
      "Bathurst Manor",
    ],
  },
}

export async function generateStaticParams() {
  return Object.keys(cities).map((slug) => ({ city: slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ city: string }>
}): Promise<Metadata> {
  const { city } = await params
  const config = cities[city]
  if (!config) return {}
  return {
    title: `${config.name} AI Home Value Estimator — Free Property Valuation`,
    description: `Get a free, instant home value estimate for your ${config.name} property. AI-powered tool analyzes real ${config.name} MLS data to tell you what your home is worth today. ${config.region}, Ontario.`,
    alternates: {
      canonical: `/home-value-estimator/${config.slug}`,
    },
    openGraph: {
      title: `${config.name} AI Home Value Estimator — Free Property Valuation`,
      description: `Find out what your ${config.name} home is worth in seconds. Free AI-powered valuation using real ${config.name} market data.`,
    },
  }
}

export default async function CityPage({
  params,
}: {
  params: Promise<{ city: string }>
}) {
  const { city } = await params
  const config = cities[city]

  if (!config) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">City not found</h1>
          <Link href="/" className="text-accent hover:underline">
            Go back to home
          </Link>
        </div>
      </div>
    )
  }

  const cityJsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: `${config.name} Home Value Estimator`,
    description: config.description,
    areaServed: {
      "@type": "City",
      name: config.name,
      containedInPlace: { "@type": "State", name: "Ontario" },
    },
    provider: {
      "@type": "LocalBusiness",
      name: "RE/MAX Optimum Realty — GetHomeEvaluation.ca",
      url: "https://gethomeevaluation.ca",
    },
    url: `https://gethomeevaluation.ca/home-value-estimator/${config.slug}`,
    serviceType: "Free Home Valuation",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "CAD",
      description: `Free home value estimate for ${config.name} properties`,
    },
  }

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://gethomeevaluation.ca",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Home Value Estimator",
        item: "https://gethomeevaluation.ca/estimate",
      },
      {
        "@type": "ListItem",
        position: 3,
        name: `${config.name} Home Value Estimator`,
        item: `https://gethomeevaluation.ca/home-value-estimator/${config.slug}`,
      },
    ],
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(cityJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <main className="min-h-screen">
        {/* Hero */}
        <section className="relative bg-gradient-to-br from-primary via-primary to-blue-900 text-white py-20 overflow-hidden">
          <div className="absolute inset-0">
            <div className="absolute top-10 left-10 w-72 h-72 bg-accent/10 rounded-full blur-3xl animate-pulse" />
            <div className="absolute bottom-10 right-10 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
          </div>
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-3xl mx-auto text-center space-y-6">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 border border-white/20 rounded-full text-sm font-medium">
                <MapPin className="w-4 h-4 text-accent" />
                {config.region}, Ontario
              </div>
              <h1 className="text-4xl md:text-6xl font-bold leading-tight">
                {config.name} AI Home Value Estimator
              </h1>
              <p className="text-xl text-white/80 max-w-2xl mx-auto">
                Get a free, instant estimate of what your {config.name} home is worth today.
                AI-powered using real local market data.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
                <Link
                  href={`/estimate?city=${config.name}`}
                  className="inline-flex items-center justify-center gap-2 bg-accent text-primary font-bold text-lg px-8 py-4 rounded-xl hover:bg-yellow-400 transition-colors shadow-lg"
                >
                  <Zap className="w-5 h-5" />
                  Get Free {config.name} Estimate
                </Link>
              </div>
              <p className="text-white/50 text-sm">100% Free · No Obligation · Instant Results</p>
            </div>
          </div>
        </section>

        {/* Stats */}
        <section className="py-8 bg-primary/5 border-b border-border">
          <div className="container mx-auto px-4">
            <div className="flex flex-wrap justify-center gap-10 text-center">
              {[
                { value: config.avgPrice, label: `Avg ${config.name} Home Price` },
                { value: "95%", label: "Estimation Accuracy" },
                { value: "30 sec", label: "Instant Results" },
                { value: "Free", label: "No Cost, Ever" },
              ].map((stat) => (
                <div key={stat.label}>
                  <div className="text-2xl font-bold text-accent">{stat.value}</div>
                  <div className="text-sm text-muted-foreground mt-1">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* About the market */}
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4 max-w-4xl">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-start">
              <div>
                <h2 className="text-2xl md:text-3xl font-bold text-primary mb-4">
                  {config.name} Real Estate Market
                </h2>
                <p className="text-muted-foreground leading-relaxed">{config.description}</p>
                <div className="mt-6 flex items-center gap-2 text-sm font-medium bg-accent/10 text-primary px-4 py-2 rounded-lg">
                  <TrendingUp className="w-4 h-4 text-accent" />
                  {config.marketTrend}
                </div>
              </div>
              <div>
                <h3 className="font-bold text-lg text-foreground mb-4">
                  Why {config.name} Homeowners Choose Us
                </h3>
                <ul className="space-y-3">
                  {config.highlights.map((h) => (
                    <li key={h} className="flex gap-3">
                      <CheckCircle2 className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                      <span className="text-muted-foreground text-sm">{h}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Neighbourhoods */}
        <section className="py-16 bg-secondary">
          <div className="container mx-auto px-4 max-w-4xl">
            <h2 className="text-2xl md:text-3xl font-bold text-primary mb-2 text-center">
              {config.name} Neighbourhoods We Cover
            </h2>
            <p className="text-muted-foreground text-center mb-8">
              Our AI analyzes sales data across all {config.name} neighbourhoods
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              {config.neighborhoods.map((n) => (
                <span
                  key={n}
                  className="px-4 py-2 bg-card border border-border rounded-full text-sm font-medium text-foreground"
                >
                  <MapPin className="w-3 h-3 inline mr-1 text-accent" />
                  {n}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* How it works */}
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4 max-w-3xl">
            <h2 className="text-2xl md:text-3xl font-bold text-primary mb-10 text-center">
              How to Get Your Free {config.name} Home Value Estimate
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {[
                {
                  icon: MapPin,
                  step: "1",
                  title: "Enter Your Address",
                  desc: `Type your ${config.name} property address`,
                },
                {
                  icon: Brain,
                  step: "2",
                  title: "Add Property Details",
                  desc: "Beds, baths, size, condition — takes 60 seconds",
                },
                {
                  icon: Zap,
                  step: "3",
                  title: "Get Your Estimate",
                  desc: "Instant AI-powered valuation with market context",
                },
              ].map((item) => (
                <div key={item.title} className="text-center">
                  <div className="w-14 h-14 bg-primary rounded-xl flex items-center justify-center mx-auto mb-3 relative">
                    <item.icon className="w-7 h-7 text-accent" />
                    <div className="absolute -top-2 -right-2 w-6 h-6 bg-accent rounded-full flex items-center justify-center">
                      <span className="text-xs font-bold text-primary">{item.step}</span>
                    </div>
                  </div>
                  <h3 className="font-bold text-foreground mb-1">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">{item.desc}</p>
                </div>
              ))}
            </div>
            <div className="text-center mt-10">
              <Link
                href={`/estimate?city=${config.name}`}
                className="inline-flex items-center gap-2 bg-accent text-primary font-bold text-lg px-8 py-4 rounded-xl hover:bg-yellow-400 transition-colors shadow-lg"
              >
                <Zap className="w-5 h-5" />
                Get My Free {config.name} Estimate
              </Link>
            </div>
          </div>
        </section>

        {/* Meet the Expert / City Specific */}
        <section className="py-20 bg-background border-t border-border">
          <div className="container mx-auto px-4 max-w-4xl text-center">
            <h2 className="text-3xl font-bold text-primary mb-4">
              Speak with {config.name}'s Top-Selling Real Estate Expert
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto mb-8">
              This free tool is provided by <strong>Parveen Arora</strong>, owner of RE/MAX Optimum Realty and the #1 real estate agent serving {config.name} and the Greater Toronto Area. Whether you're ready to list or just exploring your options, get expert advice from a team that has sold thousands of homes.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link
                href="https://www.teamarora.com"
                target="_blank"
                rel="noopener"
                className="inline-flex items-center justify-center gap-2 bg-primary text-white font-bold text-lg px-8 py-4 rounded-xl hover:bg-primary/90 transition-colors shadow-lg"
              >
                Connect with Parveen Arora
              </Link>
              <Link
                href={`/top-agent/${config.slug === 'brampton' || config.slug === 'mississauga' ? config.slug : 'gta'}`}
                className="inline-flex items-center justify-center gap-2 bg-secondary text-primary font-bold text-lg px-8 py-4 rounded-xl hover:bg-secondary/80 transition-colors"
              >
                Why Choose Team Arora?
              </Link>
            </div>
          </div>
        </section>

        {/* Other cities */}
        <section className="py-12 bg-secondary border-t border-border">
          <div className="container mx-auto px-4 max-w-4xl text-center">
            <h2 className="text-xl font-bold text-primary mb-6">
              Also Serving These Ontario Markets
            </h2>
            <div className="flex flex-wrap justify-center gap-3">
              {Object.values(cities)
                .filter((c) => c.slug !== config.slug)
                .map((c) => (
                  <Link
                    key={c.slug}
                    href={`/home-value-estimator/${c.slug}`}
                    className="px-4 py-2 bg-card border border-border rounded-full text-sm font-medium text-foreground hover:border-accent hover:text-accent transition-colors"
                  >
                    {c.name}
                  </Link>
                ))}
            </div>
          </div>
        </section>
      </main>
    </>
  )
}
