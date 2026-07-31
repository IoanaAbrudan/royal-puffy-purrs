import type { Metadata } from "next";

import { CtaSection } from "@/components/sections/cta";
import { FeaturedCatsSection } from "@/components/sections/featured-cats";
import { HeroSection } from "@/components/sections/hero";
import { HotelGallerySection } from "@/components/sections/hotel-gallery";
import { siteConfig } from "@/content/site";

export const metadata: Metadata = {
  openGraph: {
    images: [
      {
        url: siteConfig.heroImage.src,
        alt: siteConfig.heroImage.alt,
      },
    ],
  },
  twitter: {
    images: [siteConfig.heroImage.src],
  },
};

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
