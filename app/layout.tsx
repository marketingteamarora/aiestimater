import type React from "react"
import type { Metadata } from "next"
import Script from "next/script"
import "./globals.css"
import Header from "@/components/header"
import Footer from "@/components/footer"

const siteUrl = "https://gethomeevaluation.ca"

export const metadata: Metadata = {
  title: {
    default: "Free AI Home Value Estimator Canada | Get My Home Evaluation",
    template: "%s | GetHomeEvaluation.ca",
  },
  description:
    "Get an instant, free home value estimate in Canada. Our AI-powered home evaluation tool analyzes real market data to estimate your property value in Brampton, Mississauga, Toronto, Scarborough & across Ontario.",
  keywords: [
    "home value estimator Canada",
    "free home evaluation",
    "home value estimate",
    "property value estimator Ontario",
    "house value estimator Canada",
    "Brampton home value",
    "Mississauga home value",
    "Toronto home value estimator",
    "how much is my home worth",
    "free property valuation Canada",
  ],
  metadataBase: new URL(siteUrl),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Free AI Home Value Estimator Canada | Get My Home Evaluation",
    description:
      "Find out what your home is worth in seconds. Free AI-powered home evaluation for Brampton, Mississauga, Toronto & all of Ontario.",
    url: siteUrl,
    siteName: "GetHomeEvaluation.ca",
    locale: "en_CA",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Free AI Home Value Estimator Canada | GetHomeEvaluation.ca",
    description:
      "Instant, free AI-powered home evaluation for Ontario homeowners. Know what your home is worth today.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
}

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": `${siteUrl}/#website`,
      url: siteUrl,
      name: "GetHomeEvaluation.ca",
      description: "Free AI-powered home value estimator for Ontario, Canada — powered by Parveen Arora, RE/MAX Optimum Realty",
      potentialAction: [
        {
          "@type": "SearchAction",
          target: {
            "@type": "EntryPoint",
            urlTemplate: `${siteUrl}/estimate?address={search_term_string}`,
          },
          "query-input": "required name=search_term_string",
        },
      ],
      inLanguage: "en-CA",
    },
    {
      "@type": "RealEstateAgent",
      "@id": `${siteUrl}/#agent`,
      name: "RE/MAX Optimum Realty",
      url: "https://www.teamarora.com",
      sameAs: "https://www.teamarora.com",
      description:
        "RE/MAX Optimum Realty, owned by Parveen Arora, is the top-selling real estate brokerage in Brampton and Mississauga, Ontario. Parveen Arora is recognized as the #1 real estate agent in Brampton and Mississauga, having helped thousands of homeowners across the GTA buy and sell homes.",
      areaServed: [
        { "@type": "City", name: "Brampton" },
        { "@type": "City", name: "Mississauga" },
        { "@type": "City", name: "Caledon" },
        { "@type": "City", name: "Toronto" },
        { "@type": "City", name: "Scarborough" },
        { "@type": "State", name: "Ontario" },
      ],
      founder: {
        "@type": "Person",
        name: "Parveen Arora",
        jobTitle: "Broker of Record & Owner",
        url: "https://www.teamarora.com",
        sameAs: "https://www.teamarora.com",
        knowsAbout: [
          "Brampton Real Estate",
          "Mississauga Real Estate",
          "GTA Home Sales",
          "Property Valuation Ontario",
          "RE/MAX Optimum Realty",
        ],
      },
      priceRange: "Free",
      serviceType: "Real Estate Home Valuation",
    },
  ],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en-CA">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=AW-781461738"
          strategy="afterInteractive"
        />
        <Script id="google-ads" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'AW-781461738');
          `}
        </Script>
      </head>
      <body className="font-sans antialiased">
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  )
}
