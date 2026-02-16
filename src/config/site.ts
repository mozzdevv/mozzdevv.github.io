// Site configuration for SEO and JSON-LD schemas
export const siteConfig = {
  name: "Mazin Osman",
  description:
    "Sr. Digital Project & Program Manager — Portfolio. 10+ years delivering complex digital projects for Microsoft, Allergan, and government clients.",
  url: "https://mozzdevv.github.io",
  ogImage: "https://mozzdevv.github.io/images/openGraph/facebook.png",
  twitterImage: "https://mozzdevv.github.io/images/openGraph/twitter.png",
  author: {
    name: "Mazin Osman",
    url: "https://mozzdevv.github.io",
    twitter: "@mozzdevv",
  },
  links: {
    twitter: "https://twitter.com/mozzdevv",
    github: "https://github.com/mozzdevv",
  },
  // Organization info for JSON-LD
  organization: {
    name: "Mazin Osman",
    logo: "https://mozzdevv.github.io/images/logos/symbol.svg",
    sameAs: [
      "https://github.com/mozzdevv",
      "https://linkedin.com/in/mozzdevv",
    ],
  },
} as const;

export type SiteConfig = typeof siteConfig;
