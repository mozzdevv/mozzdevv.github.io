// Site configuration for SEO and JSON-LD schemas
export const siteConfig = {
  name: "Bearnie",
  description:
    "A professional, accessible UI component library built with Astro, Tailwind CSS v4, and TypeScript.",
  url: "https://bearnie.dev",
  ogImage: "https://bearnie.dev/images/openGraph/facebook.png",
  twitterImage: "https://bearnie.dev/images/openGraph/twitter.png",
  author: {
    name: "Bearnie Team",
    url: "https://bearnie.dev",
    twitter: "@astroui",
  },
  links: {
    twitter: "https://twitter.com/mike_andreuzza",
    github: "https://github.com/michael-andreuzza/bearnie",
  },
  // Organization info for JSON-LD
  organization: {
    name: "Bearnie",
    logo: "https://bearnie.dev/images/logos/symbol.svg",
    sameAs: [
      "https://twitter.com/astroui",
      "https://github.com/michael-andreuzza/bearnie",
    ],
  },
} as const;

export type SiteConfig = typeof siteConfig;
