import { Clock, Heart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { Container } from "@/components/layout/container";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { CatListing } from "@/content/cats";
import { catsForSaleContent } from "@/content/site";
import { getCats } from "@/lib/cats-store";

export async function FeaturedCatsSection() {
  const { cats } = await getCats();

  return (
    <section
      id="cats-for-sale"
      className="scroll-mt-24 border-y border-border bg-gradient-to-b from-secondary/50 to-background py-16 sm:py-20"
      aria-labelledby="cats-heading"
    >
      <Container>
        <div className="mx-auto max-w-2xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full bg-blush/60 px-4 py-1.5 text-sm font-semibold text-primary">
            <Clock className="h-4 w-4" aria-hidden />
            {catsForSaleContent.eyebrow}
            <Heart className="h-3.5 w-3.5 fill-accent text-accent" aria-hidden />
          </div>
          <h2
            id="cats-heading"
            className="mt-4 text-3xl font-semibold sm:text-4xl"
          >
            {catsForSaleContent.title}
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            {catsForSaleContent.description}
          </p>
        </div>

        <div className="mt-12 flex flex-col items-center gap-8">
          {cats.length === 0 ? (
            <p className="text-muted-foreground">
              New kittens will be announced here soon.
            </p>
          ) : (
            cats.map((cat) => <CatCard key={cat.id} cat={cat} />)
          )}

          <Button asChild variant="accent" size="lg">
            <Link href={catsForSaleContent.waitlistCta.href}>
              {catsForSaleContent.waitlistCta.label}
            </Link>
          </Button>
        </div>
      </Container>
    </section>
  );
}

function CatCard({ cat }: { cat: CatListing }) {
  const isComingSoon = cat.status === "coming-soon";

  return (
    <article className="w-full max-w-md overflow-hidden rounded-3xl border-2 border-dashed border-border/70 bg-card/80 shadow-soft">
      {cat.image && (
        <div className="relative aspect-square w-full bg-muted/25">
          <Image
            src={cat.image}
            alt={cat.imageAlt ?? cat.name}
            fill
            quality={95}
            sizes="(max-width: 448px) 100vw, 448px"
            className="object-contain p-3"
          />
        </div>
      )}
      <div className="p-6 sm:p-8">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h3 className="font-display text-2xl font-semibold">{cat.name}</h3>
            <p className="mt-1 text-sm font-medium text-primary">{cat.breed}</p>
            <p className="mt-2 text-sm text-muted-foreground">
              {cat.age} · {cat.color}
            </p>
          </div>
          <Badge variant="muted">
            <Clock className="mr-1 h-3 w-3" aria-hidden />
            {isComingSoon ? "Coming soon" : "Available"}
          </Badge>
        </div>

        <p className="mt-6 rounded-2xl bg-muted/60 p-4 text-sm leading-relaxed text-muted-foreground">
          {cat.temperament}
        </p>

        {isComingSoon && (
          <p className="mt-4 rounded-2xl border border-border/60 bg-secondary/40 px-4 py-3 text-center text-sm text-muted-foreground">
            Not available for sale yet — we will announce when kittens are ready
            to meet.
          </p>
        )}
      </div>
    </article>
  );
}
