export type SiteConfig = typeof siteConfig

export const siteConfig = {
  name: "Redeen",
  description:
    "Beautifully designed components built with Radix UI and Tailwind CSS.",
  mainNav: [
    {
      title: "Inicio",
      href: "/",
    },
    {
      title: "Perfil",
      href: "/perfil",
    },
  ],
  links: {
    twitter: "https://twitter.com/shadcn",
    github: "https://github.com/shadcn/ui",
    docs: "https://ui.shadcn.com",
  },
}
