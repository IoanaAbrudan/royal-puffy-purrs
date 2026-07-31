import type { Metadata } from "next";

import { Container } from "@/components/layout/container";
import { PageHeader } from "@/components/sections/page-header";
import { privacyContent } from "@/content/site";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Privacy policy for Royal Puffy Purrs cat hotel and sales services.",
};

export default function PrivacyPage() {
  return (
    <>
      <PageHeader
        title={privacyContent.title}
        description={`Last updated: ${privacyContent.lastUpdated}`}
      />
      <Container className="py-14 sm:py-16">
        <div className="max-w-3xl space-y-8">
          {privacyContent.sections.map((section) => (
            <section key={section.heading}>
              <h2 className="font-display text-xl font-semibold">
                {section.heading}
              </h2>
              <p className="mt-3 text-muted-foreground">{section.body}</p>
            </section>
          ))}
        </div>
      </Container>
    </>
  );
}
