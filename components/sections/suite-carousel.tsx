"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useCallback, useState } from "react";

import { PawIcon } from "@/components/ui/cat-decorations";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import type { HotelSuite } from "@/content/hotel";

type SuiteCarouselProps = {
  suites: readonly HotelSuite[];
};

export function SuiteCarousel({ suites }: SuiteCarouselProps) {
  const [index, setIndex] = useState(0);
  const suite = suites[index];
  const total = suites.length;

  const goPrev = useCallback(() => {
    setIndex((i) => (i === 0 ? total - 1 : i - 1));
  }, [total]);

  const goNext = useCallback(() => {
    setIndex((i) => (i === total - 1 ? 0 : i + 1));
  }, [total]);

  if (total === 0) {
    return (
      <p className="mt-12 text-center text-muted-foreground">
        Suite photos coming soon.
      </p>
    );
  }

  return (
    <div className="mx-auto mt-12 max-w-2xl">
      <div className="relative">
        <Button
          type="button"
          variant="outline"
          size="icon"
          className="absolute -left-2 top-1/2 z-10 h-11 w-11 -translate-y-1/2 rounded-full border-border/80 bg-card shadow-soft sm:-left-14"
          aria-label="Previous room"
          onClick={goPrev}
        >
          <ChevronLeft className="h-5 w-5" />
        </Button>

        <Card className="overflow-hidden border-border/80 shadow-soft-lg">
          <div className="relative aspect-square w-full overflow-hidden bg-muted/25 sm:aspect-[5/4]">
            <Image
              key={suite.id}
              src={suite.image}
              alt={suite.imageAlt}
              fill
              quality={95}
              sizes="(max-width: 768px) 100vw, 672px"
              className="suite-photo object-contain p-2 sm:p-3"
              style={{ objectPosition: "center" }}
              priority={index === 0}
            />
            <span className="absolute right-3 top-3 rounded-full bg-background/90 px-3 py-1 text-xs font-medium text-muted-foreground backdrop-blur-sm">
              {index + 1} / {total}
            </span>
          </div>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 font-display text-xl">
              <PawIcon size={18} className="text-accent" />
              {suite.title}
            </CardTitle>
            <CardDescription className="text-base">
              {suite.description}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-sm text-muted-foreground">
              {suite.highlights.map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <PawIcon size={14} className="mt-0.5 shrink-0 text-accent" />
                  {item}
                </li>
              ))}
            </ul>
            <Button asChild className="mt-6 w-full" variant="accent">
              <Link
                href={`/contact?inquiry=hotel&suite=${encodeURIComponent(suite.title)}`}
              >
                Book this suite
              </Link>
            </Button>
          </CardContent>
        </Card>

        <Button
          type="button"
          variant="outline"
          size="icon"
          className="absolute -right-2 top-1/2 z-10 h-11 w-11 -translate-y-1/2 rounded-full border-border/80 bg-card shadow-soft sm:-right-14"
          aria-label="Next room"
          onClick={goNext}
        >
          <ChevronRight className="h-5 w-5" />
        </Button>
      </div>

      <div
        className="mt-6 flex items-center justify-center gap-2"
        role="tablist"
        aria-label="Choose a suite"
      >
        {suites.map((s, i) => (
          <button
            key={s.id}
            type="button"
            role="tab"
            aria-selected={i === index}
            aria-label={s.title}
            className={cn(
              "h-2.5 rounded-full transition-all",
              i === index
                ? "w-8 bg-primary"
                : "w-2.5 bg-border hover:bg-accent",
            )}
            onClick={() => setIndex(i)}
          />
        ))}
      </div>
    </div>
  );
}
