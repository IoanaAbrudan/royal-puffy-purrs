export const siteConfig = {
  name: "Royal Puffy Purrs",
  tagline: "Where every whisker gets the royal treatment",
  description:
    "A new luxury cat hotel in Basildon, Essex with lovingly raised British Shorthair companions coming soon. Premium boarding under one calm, caring roof.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://royalpuffypurrs.com",
  contact: {
    email: "cattery@royalpuffypurrs.com",
    phone: "07575 444336",
    address: "SS13, Basildon",
  },
  logo: {
    src: "/brand/logo.png",
    alt: "Royal Puffy Purrs — Cats Hotel & Cat Sell logo with two cats",
  },
  heroImage: {
    src: "/brand/storefront.png",
    alt: "Cats Hotel storefront entrance with luxury boarding signage and welcoming glass doors",
  },
} as const;

export const heroContent = {
  eyebrow: "Now open for cat hotel bookings",
  title: "Royal comfort for your purrfect companion",
  description:
    "A brand-new boutique cattery offering five-star hotel stays for your cat. Our British Shorthair kittens are being raised with care — sales coming soon.",
  primaryCta: { label: "Book a Suite", href: "/#cat-hotel" },
  secondaryCta: { label: "Cats for sale — coming soon", href: "/#cats-for-sale" },
  stats: [
    { value: "New", label: "Boutique cattery" },
    { value: "24/7", label: "Feline care" },
    { value: "1:1", label: "Personal attention" },
  ],
} as const;

export const servicesContent = {
  eyebrow: "Services",
  title: "What we offer",
  description:
    "Book a stay for your cat or register interest in our upcoming kittens.",
  items: [
    {
      id: "cat-hotel",
      icon: "hotel" as const,
      title: "Book a stay",
      description:
        "Luxury cat hotel suites with daily care, play time, and webcam check-ins while you are away.",
      features: [
        "Private climate-controlled suites",
        "Daily grooming & enrichment",
        "Live updates for peace of mind",
      ],
      cta: { label: "Book a stay", href: "/#cat-hotel" },
    },
    {
      id: "cats-for-sale",
      icon: "heart" as const,
      title: "Cats for sale",
      description:
        "Our first British Shorthair kittens are still growing. Join the waitlist to hear when they are ready.",
      features: [
        "Raised in our Essex cattery",
        "Pedigree & health records planned",
        "Coming soon — not available yet",
      ],
      cta: { label: "Join the waitlist", href: "/contact?inquiry=sale" },
    },
  ],
} as const;

export const ctaContent = {
  title: "Ready to give your cat the royal treatment?",
  description:
    "Book a suite for your next trip or join the waitlist for our upcoming kittens. We reply within one business day.",
  primary: { label: "Get in touch", href: "/contact" },
  secondary: { label: "Call us", href: "tel:+447575444336" },
} as const;

export const aboutContent = {
  title: "A sanctuary built for whiskers and wonder",
  intro:
    "Royal Puffy Purrs is a new Essex cattery in Basildon built on a simple belief: cats deserve the same care and dignity we expect for ourselves. We are opening our doors for luxury hotel stays while we lovingly raise our first British Shorthair companions.",
  values: [
    {
      title: "Gentle expertise",
      description:
        "Our handlers are feline-first specialists trained in low-stress handling and enrichment.",
    },
    {
      title: "Transparent care",
      description:
        "Daily updates, open cattery visits, and clear health records for every hotel guest.",
    },
    {
      title: "Ethical breeding",
      description:
        "Our kittens are raised slowly and thoughtfully at home in our cattery — not rushed to market.",
    },
  ],
  story:
    "We are a brand-new boutique cattery combining quiet luxury with veterinary-backed protocols. Every suite is designed for privacy, stimulation, and rest — because a relaxed cat is a happy cat.",
} as const;

export const catsForSaleContent = {
  eyebrow: "Now available",
  title: "Cats for sale",
  description:
    "Meet our lovingly raised British Shorthair kittens. Duchess Mabel is ready for her new home — contact us to arrange a visit.",
  waitlistCta: { label: "Enquire about a kitten", href: "/contact?inquiry=sale" },
} as const;

export const privacyContent = {
  title: "Privacy Policy",
  lastUpdated: "3 July 2026",
  sections: [
    {
      heading: "Information we collect",
      body: "We collect contact details you submit through our forms, booking preferences, and optional communication history to provide cat hotel and future sales services.",
    },
    {
      heading: "How we use your data",
      body: "Your information is used to process bookings, waitlist enquiries, send service updates, and improve our care standards. We never sell your personal data.",
    },
    {
      heading: "Data retention",
      body: "Booking records are retained for seven years for regulatory compliance. Marketing preferences can be withdrawn at any time by emailing us.",
    },
    {
      heading: "Contact",
      body: "For privacy requests, email cattery@royalpuffypurrs.com with the subject line 'Privacy Request'.",
    },
  ],
} as const;
