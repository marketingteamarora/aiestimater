export const SOCIAL_LINKS = [
  {
    id: "whatsapp",
    name: "WhatsApp",
    href: "https://api.whatsapp.com/send?phone=14169108923",
    label: "Message Team Arora on WhatsApp",
  },
  {
    id: "instagram",
    name: "Instagram",
    href: "https://www.instagram.com/team.arora/",
    label: "Follow Team Arora on Instagram",
  },
  {
    id: "facebook",
    name: "Facebook",
    href: "https://www.facebook.com/TeamArora/",
    label: "Follow Team Arora on Facebook",
  },
  {
    id: "youtube",
    name: "YouTube",
    href: "https://www.youtube.com/channel/UCEANf3xcPZnAfA7v-8OMxlA/featured",
    label: "Subscribe to Team Arora on YouTube",
  },
] as const

export const SOCIAL_LINK_URLS = SOCIAL_LINKS.map((link) => link.href)
