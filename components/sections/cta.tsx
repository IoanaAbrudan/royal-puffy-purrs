import Link from "next/link";

import { Container } from "@/components/layout/container";
import { Button } from "@/components/ui/button";
import { ctaContent } from "@/content/site";

export function CtaSection() {
  return (
    <section className="py-16 sm:py-20" aria-labelledby="cta-heading">
      <Container>
        <div className="rounded-3xl bg-primary px-6 py-12 text-center text-primary-foreground shadow-soft-lg sm:px-12">
          <h2
            id="cta-heading"
            className="font-display text-3xl font-semibold text-balance sm:text-4xl"
          >
            {ctaContent.title}
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-primary-foreground/85 text-balance">
            {ctaContent.description}
          </p>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <Button asChild size="lg" variant="accent">
              <Link href={ctaContent.primary.href}>{ctaContent.primary.label}</Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-primary-foreground/30 bg-transparent text-primary-foreground hover:bg-primary-foreground/10"
            >
              <a href={ctaContent.secondary.href}>{ctaContent.secondary.label}</a>
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}
