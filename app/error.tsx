"use client";

import Link from "next/link";
import { useEffect } from "react";

import { Container } from "@/components/layout/container";
import { Button } from "@/components/ui/button";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <Container className="flex min-h-[50vh] flex-col items-center justify-center py-20 text-center">
      <p className="text-sm font-semibold uppercase tracking-widest text-accent">
        Something went wrong
      </p>
      <h1 className="mt-4 font-display text-4xl font-semibold">
        We hit a snag
      </h1>
      <p className="mt-4 max-w-md text-muted-foreground">
        Our team has been notified. You can try again or head back to the
        homepage.
      </p>
      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <Button variant="accent" onClick={reset}>
          Try again
        </Button>
        <Button asChild variant="outline">
          <Link href="/">Return home</Link>
        </Button>
      </div>
    </Container>
  );
}
