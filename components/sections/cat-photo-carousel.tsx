"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import { useCallback, useState } from "react";

import { Button } from "@/components/ui/button";
import type { CatListingImage } from "@/content/cats";

type CatPhotoCarouselProps = {
  photos: readonly CatListingImage[];
  name: string;
};

export function CatPhotoCarousel({ photos, name }: CatPhotoCarouselProps) {
  const [photoIndex, setPhotoIndex] = useState(0);
  const totalPhotos = photos.length;
  const activePhoto = photos[photoIndex] ?? photos[0];

  const goPrev = useCallback(() => {
    setPhotoIndex((index) => (index === 0 ? totalPhotos - 1 : index - 1));
  }, [totalPhotos]);

  const goNext = useCallback(() => {
    setPhotoIndex((index) => (index === totalPhotos - 1 ? 0 : index + 1));
  }, [totalPhotos]);

  if (!activePhoto) return null;

  return (
    <div className="relative aspect-square w-full bg-muted/25">
      <Image
        src={activePhoto.image}
        alt={activePhoto.imageAlt}
        fill
        quality={95}
        sizes="(max-width: 448px) 100vw, 448px"
        className="object-contain p-3"
      />
      {totalPhotos > 1 && (
        <>
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 rounded-full bg-background/90 px-3 py-1 text-xs font-medium shadow-sm">
            {photoIndex + 1} / {totalPhotos}
          </div>
          <Button
            type="button"
            variant="secondary"
            size="icon"
            className="absolute left-3 top-1/2 h-9 w-9 -translate-y-1/2 rounded-full shadow-sm"
            onClick={goPrev}
            aria-label={`Previous photo of ${name}`}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button
            type="button"
            variant="secondary"
            size="icon"
            className="absolute right-3 top-1/2 h-9 w-9 -translate-y-1/2 rounded-full shadow-sm"
            onClick={goNext}
            aria-label={`Next photo of ${name}`}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </>
      )}
    </div>
  );
}
