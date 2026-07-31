import Image from "next/image";
import Link from "next/link";

import { Container } from "@/components/layout/container";
import { PawIcon } from "@/components/ui/cat-decorations";
import { Button } from "@/components/ui/button";
import { heroContent, siteConfig } from "@/content/site";

export function HeroSection() {
  return (
    <section className="relative min-h-[min(88vh,820px)] overflow-hidden border-b border-border">
      <Image
        src={siteConfig.heroImage.src}
        alt=""
        fill
        priority
        quality={92}
        sizes="100vw"
        className="object-cover object-center"
        aria-hidden
      />
      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/80 to-background/55"
      />
      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-t from-background/90 via-transparent to-background/40"
      />

      <Container className="relative flex min-h-[min(88vh,820px)] items-center py-16 sm:py-20">
        <div className="max-w-xl rounded-3xl border border-border/50 bg-background/75 p-8 shadow-soft-lg backdrop-blur-md sm:max-w-lg sm:p-10">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-accent">
            {heroContent.eyebrow}
          </p>
          <h1 className="mt-4 font-display text-4xl font-semibold leading-tight text-balance sm:text-5xl">
            {heroContent.title}
          </h1>
          <p className="mt-5 text-lg leading-relaxed text-muted-foreground text-balance">
            {heroContent.description}
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button asChild size="lg" variant="accent">
              <Link href={heroContent.primaryCta.href}>
                <PawIcon size={18} />
                {heroContent.primaryCta.label}
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="bg-background/60">
              <Link href={heroContent.secondaryCta.href}>
                {heroContent.secondaryCta.label}
              </Link>
            </Button>
          </div>

          <dl className="mt-8 grid grid-cols-3 gap-2 sm:gap-3">
            {heroContent.stats.map((stat) => (
              <div
                key={stat.label}
                className="rounded-xl border border-border/50 bg-card/60 px-2 py-3 text-center"
              >
                <dt className="text-[10px] font-medium text-muted-foreground sm:text-xs">
                  {stat.label}
                </dt>
                <dd className="mt-1 font-display text-base font-semibold text-primary sm:text-lg">
                  {stat.value}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </Container>
    </section>
  );
}
