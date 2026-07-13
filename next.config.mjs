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
    const legacyPrefixes = ["best-real-estate-agent", "top-real-estate-agent", "real-estate-agent"]
    return legacyPrefixes.flatMap((prefix) =>
      cities.map((city) => ({
        source: `/${prefix}/${city}`,
        destination: `/no-1-real-estate-agent/${city}`,
        permanent: true,
      })),
    )
  },
}

export default nextConfig
