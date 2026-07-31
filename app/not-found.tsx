import Link from "next/link";

import { Container } from "@/components/layout/container";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <Container className="flex min-h-[50vh] flex-col items-center justify-center py-20 text-center">
      <p className="text-sm font-semibold uppercase tracking-widest text-accent">
        404
      </p>
      <h1 className="mt-4 font-display text-4xl font-semibold">
        This page wandered off
      </h1>
      <p className="mt-4 max-w-md text-muted-foreground">
        Like a curious kitten, this page isn&apos;t where we expected. Let&apos;s
        get you back to familiar territory.
      </p>
      <Button asChild className="mt-8" variant="accent">
        <Link href="/">Return home</Link>
      </Button>
    </Container>
  );
}
