export const mainNav = [
  { label: "Home", href: "/" },
  { label: "Book a stay", href: "/#cat-hotel" },
  { label: "Cats for sale", href: "/#cats-for-sale" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
] as const;

export const footerNav = {
  services: [
    { label: "Book a stay", href: "/contact?inquiry=hotel" },
    { label: "Cats for sale", href: "/#cats-for-sale" },
  ],
  company: [
    { label: "About Us", href: "/about" },
    { label: "Contact", href: "/contact" },
    { label: "Privacy Policy", href: "/privacy" },
  ],
} as const;
