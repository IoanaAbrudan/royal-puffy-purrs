import type { Metadata } from "next";

import { Container } from "@/components/layout/container";
import { PageHeader } from "@/components/sections/page-header";
import { aboutContent } from "@/content/site";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "About Our Essex Cattery in Basildon",
  description:
    "Learn about Royal Puffy Purrs — a luxury cat hotel and ethical British Shorthair cattery in Basildon, Essex offering premium boarding and kitten sales.",
  path: "/about",
});

export default function AboutPage() {
  return (
    <>
      <PageHeader
        eyebrow="Our story"
        title={aboutContent.title}
        description={aboutContent.intro}
      />
      <Container className="py-14 sm:py-16">
        <p className="text-muted-foreground max-w-3xl text-lg">
          {aboutContent.story}
        </p>
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {aboutContent.values.map((value) => (
            <article
              key={value.title}
              className="border-border bg-card rounded-xl border p-6"
            >
              <h2 className="font-display text-xl font-semibold">
                {value.title}
              </h2>
              <p className="text-muted-foreground mt-3">{value.description}</p>
            </article>
          ))}
        </div>
      </Container>
    </>
  );
}
