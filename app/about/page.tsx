import type { Metadata } from "next";

import { Container } from "@/components/layout/container";
import { PageHeader } from "@/components/sections/page-header";
import { aboutContent } from "@/content/site";

export const metadata: Metadata = {
  title: "About",
  description:
    "Learn about Royal Puffy Purrs — a new luxury cat hotel and ethical British Shorthair cattery in Basildon, Essex.",
};

export default function AboutPage() {
  return (
    <>
      <PageHeader
        eyebrow="Our story"
        title={aboutContent.title}
        description={aboutContent.intro}
      />
      <Container className="py-14 sm:py-16">
        <p className="max-w-3xl text-lg text-muted-foreground">
          {aboutContent.story}
        </p>
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {aboutContent.values.map((value) => (
            <article
              key={value.title}
              className="rounded-xl border border-border bg-card p-6"
            >
              <h2 className="font-display text-xl font-semibold">
                {value.title}
              </h2>
              <p className="mt-3 text-muted-foreground">{value.description}</p>
            </article>
          ))}
        </div>
      </Container>
    </>
  );
}
