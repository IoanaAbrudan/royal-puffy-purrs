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
  // Suite and photo indices live in one state value so that moving to another
  // suite always lands on its first photo.
  const [position, setPosition] = useState({ suite: 0, photo: 0 });
  const { suite: suiteIndex, photo: photoIndex } = position;
  const suite = suites[suiteIndex];
  const photos = suite?.images ?? [];
  const totalSuites = suites.length;
  const totalPhotos = photos.length;
  const activePhoto = photos[photoIndex] ?? photos[0];
  const usesPhotoCarousel = totalPhotos > 1;

  const showSuite = useCallback((index: number) => {
    setPosition({ suite: index, photo: 0 });
  }, []);

  const showPhoto = useCallback((index: number) => {
    setPosition((current) => ({ ...current, photo: index }));
  }, []);

  const goPrev = useCallback(() => {
    setPosition((current) =>
      usesPhotoCarousel
        ? {
            ...current,
            photo: current.photo === 0 ? totalPhotos - 1 : current.photo - 1,
          }
        : {
            suite: current.suite === 0 ? totalSuites - 1 : current.suite - 1,
            photo: 0,
          },
    );
  }, [totalPhotos, totalSuites, usesPhotoCarousel]);

  const goNext = useCallback(() => {
    setPosition((current) =>
      usesPhotoCarousel
        ? {
            ...current,
            photo: current.photo === totalPhotos - 1 ? 0 : current.photo + 1,
          }
        : {
            suite: current.suite === totalSuites - 1 ? 0 : current.suite + 1,
            photo: 0,
          },
    );
  }, [totalPhotos, totalSuites, usesPhotoCarousel]);

  if (totalSuites === 0) {
    return (
      <p className="text-muted-foreground mt-12 text-center">
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
          className="border-border/80 bg-card shadow-soft absolute top-1/2 -left-2 z-10 h-11 w-11 -translate-y-1/2 rounded-full sm:-left-14"
          aria-label={usesPhotoCarousel ? "Previous photo" : "Previous room"}
          onClick={goPrev}
        >
          <ChevronLeft className="h-5 w-5" />
        </Button>

        <Card className="border-border/80 shadow-soft-lg overflow-hidden">
          <div className="bg-muted/25 relative aspect-square w-full overflow-hidden sm:aspect-[5/4]">
            <Image
              key={`${suite.id}-${photoIndex}`}
              src={activePhoto.image}
              alt={activePhoto.imageAlt}
              fill
              quality={95}
              sizes="(max-width: 768px) 100vw, 672px"
              className="suite-photo object-contain p-2 sm:p-3"
              style={{ objectPosition: activePhoto.objectPosition }}
              priority={suiteIndex === 0 && photoIndex === 0}
            />
            <span className="bg-background/90 text-muted-foreground absolute top-3 right-3 rounded-full px-3 py-1 text-xs font-medium backdrop-blur-sm">
              {usesPhotoCarousel
                ? `${photoIndex + 1} / ${totalPhotos}`
                : `${suiteIndex + 1} / ${totalSuites}`}
            </span>
          </div>
          <CardHeader>
            <CardTitle className="font-display flex items-center gap-2 text-xl">
              <PawIcon size={18} className="text-accent" />
              {suite.title}
            </CardTitle>
            <CardDescription className="text-base">
              {suite.description}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="text-muted-foreground space-y-2 text-sm">
              {suite.highlights.map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <PawIcon size={14} className="text-accent mt-0.5 shrink-0" />
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
          className="border-border/80 bg-card shadow-soft absolute top-1/2 -right-2 z-10 h-11 w-11 -translate-y-1/2 rounded-full sm:-right-14"
          aria-label={usesPhotoCarousel ? "Next photo" : "Next room"}
          onClick={goNext}
        >
          <ChevronRight className="h-5 w-5" />
        </Button>
      </div>

      <div
        className="mt-6 flex items-center justify-center gap-2"
        role="tablist"
        aria-label={usesPhotoCarousel ? "Choose a photo" : "Choose a suite"}
      >
        {(usesPhotoCarousel ? photos : suites).map((_, i) => (
          <button
            key={usesPhotoCarousel ? `${suite.id}-photo-${i}` : suites[i].id}
            type="button"
            role="tab"
            aria-selected={
              usesPhotoCarousel ? i === photoIndex : i === suiteIndex
            }
            aria-label={
              usesPhotoCarousel
                ? `Photo ${i + 1} of ${suite.title}`
                : suites[i].title
            }
            className={cn(
              "h-2.5 rounded-full transition-all",
              (usesPhotoCarousel ? i === photoIndex : i === suiteIndex)
                ? "bg-primary w-8"
                : "bg-border hover:bg-accent w-2.5",
            )}
            onClick={() => (usesPhotoCarousel ? showPhoto(i) : showSuite(i))}
          />
        ))}
      </div>
    </div>
  );
}
