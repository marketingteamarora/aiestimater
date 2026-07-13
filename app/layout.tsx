import type React from "react"
import type { Metadata } from "next"
import Script from "next/script"
import "./globals.css"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { PARVEEN_ARORA, SITE_URL, buildAgentOpenGraph } from "@/lib/seo/parveen-arora"

const siteUrl = SITE_URL

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
    ...buildAgentOpenGraph(
      "Free AI Home Value Estimator Canada | Get My Home Evaluation",
      "Find out what your home is worth in seconds. Free AI-powered home evaluation for Brampton, Mississauga, Toronto & all of Ontario.",
    ),
    url: siteUrl,
  },
  twitter: {
    card: "summary_large_image",
    title: "Free AI Home Value Estimator Canada | GetHomeEvaluation.ca",
    description:
      "Instant, free AI-powered home evaluation for Ontario homeowners. Powered by Parveen Arora, RE/MAX Optimum Realty.",
    images: [PARVEEN_ARORA.imageUrl],
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
      name: PARVEEN_ARORA.brokerage,
      url: PARVEEN_ARORA.profileUrl,
      image: PARVEEN_ARORA.imageUrl,
      telephone: PARVEEN_ARORA.officePhone,
      email: PARVEEN_ARORA.email,
      sameAs: PARVEEN_ARORA.sameAs,
      address: {
        "@type": "PostalAddress",
        streetAddress: PARVEEN_ARORA.address.streetAddress,
        addressLocality: PARVEEN_ARORA.address.addressLocality,
        addressRegion: PARVEEN_ARORA.address.addressRegion,
        postalCode: PARVEEN_ARORA.address.postalCode,
        addressCountry: PARVEEN_ARORA.address.addressCountry,
      },
      description:
        `${PARVEEN_ARORA.brokerage}, owned by ${PARVEEN_ARORA.name}, is a top-selling real estate brokerage in Brampton and Mississauga. ${PARVEEN_ARORA.name} has ${PARVEEN_ARORA.transactions} transactions and ${PARVEEN_ARORA.salesVolume} in career sales.`,
      areaServed: PARVEEN_ARORA.serviceAreas.map((name) => ({ "@type": "City", name })),
      founder: {
        "@type": "Person",
        name: PARVEEN_ARORA.name,
        jobTitle: PARVEEN_ARORA.jobTitle,
        url: `${siteUrl}/parveen-arora`,
        image: PARVEEN_ARORA.imageUrl,
        telephone: PARVEEN_ARORA.phone,
        email: PARVEEN_ARORA.email,
        sameAs: PARVEEN_ARORA.sameAs,
        knowsAbout: [
          "Brampton Real Estate",
          "Mississauga Real Estate",
          "GTA Home Sales",
          "Property Valuation Ontario",
          PARVEEN_ARORA.brokerage,
        ],
      },
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
