import type { Metadata } from "next";

import { CtaSection } from "@/components/sections/cta";
import { FeaturedCatsSection } from "@/components/sections/featured-cats";
import { HeroSection } from "@/components/sections/hero";
import { HotelGallerySection } from "@/components/sections/hotel-gallery";
import { siteConfig } from "@/content/site";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: {
    absolute:
      "Luxury Cat Hotel Basildon | British Shorthair Kittens Essex | Royal Puffy Purrs",
  },
  description:
    "Book luxury cat boarding in Basildon, Essex or enquire about British Shorthair kittens. Royal Puffy Purrs offers premium cat hotel suites and ethical cattery breeding.",
  path: "/",
  image: {
    url: siteConfig.heroImage.src,
    alt: siteConfig.heroImage.alt,
  },
});

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <HotelGallerySection />
      <FeaturedCatsSection />
      <CtaSection />
    </>
  );
}
