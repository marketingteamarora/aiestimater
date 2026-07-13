/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "listings.teamarora.com",
      },
    ],
  },
  async redirects() {
    const cities = [
      "brampton",
      "mississauga",
      "toronto",
      "oakville",
      "vaughan",
      "markham",
      "caledon",
      "gta",
      "scarborough",
      "cambridge",
      "richmond-hill",
      "newmarket",
      "aurora",
      "milton",
      "burlington",
      "hamilton",
      "whitby",
      "oshawa",
      "ajax",
      "pickering",
      "etobicoke",
      "north-york",
    ]
    // Only redirect the generic slug; keep best, no-1, and top as separate indexed pages
    return cities.map((city) => ({
      source: `/real-estate-agent/${city}`,
      destination: `/best-real-estate-agent/${city}`,
      permanent: true,
    }))
  },
}

export default nextConfig
