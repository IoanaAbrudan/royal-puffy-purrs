import { Container } from "@/components/layout/container";
import { PawIcon } from "@/components/ui/cat-decorations";
import { hotelContent } from "@/content/hotel";
import { getHotelSuites } from "@/lib/hotel-store";

import { SuiteCarousel } from "./suite-carousel";

export async function HotelGallerySection() {
  const { suites } = await getHotelSuites();

  return (
    <section
      id="cat-hotel"
      className="scroll-mt-24 border-y border-border bg-gradient-to-b from-background to-secondary/40 py-16 sm:py-20"
      aria-labelledby="hotel-gallery-heading"
    >
      <Container>
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-accent">
            {hotelContent.eyebrow}
          </p>
          <h2
            id="hotel-gallery-heading"
            className="mt-3 text-3xl font-semibold sm:text-4xl"
          >
            {hotelContent.title}
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            {hotelContent.description}
          </p>
          <p className="mt-4">
            <span className="inline-block rounded-full border border-accent/30 bg-accent/10 px-4 py-1.5 text-base font-semibold text-foreground">
              {hotelContent.pricing.label}
            </span>
          </p>
          <p className="mt-2 text-sm text-muted-foreground">
            {hotelContent.pricing.note}
          </p>
        </div>

        <ul className="mt-6 flex flex-wrap justify-center gap-3">
          {hotelContent.features.map((feature) => (
            <li
              key={feature}
              className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-card/80 px-4 py-2 text-sm text-muted-foreground shadow-soft"
            >
              <PawIcon size={14} className="text-accent" />
              {feature}
            </li>
          ))}
        </ul>

        <SuiteCarousel suites={suites} />
      </Container>
    </section>
  );
}
