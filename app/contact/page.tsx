import type { Metadata } from "next";
import { Suspense } from "react";

import { Container } from "@/components/layout/container";
import { ContactForm } from "@/components/sections/contact-form";
import { PageHeader } from "@/components/sections/page-header";
import { siteConfig } from "@/content/site";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Contact — Cat Hotel & Kitten Enquiries Basildon",
  description:
    "Book a luxury cat hotel suite in Basildon or enquire about British Shorthair kittens in Essex. Call Royal Puffy Purrs or send a message online.",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <>
      <PageHeader
        eyebrow="Concierge"
        title="We'd love to hear from you"
        description="Whether you're planning a cat hotel stay or enquiring about a kitten, our team is here to help."
      />
      <Container className="py-14 sm:py-16">
        <div className="grid gap-12 lg:grid-cols-2">
          <div>
            <h2 className="font-display text-2xl font-semibold">Visit us</h2>
            <address className="text-muted-foreground mt-4 space-y-2 not-italic">
              <p>{siteConfig.contact.address}</p>
              <p>
                <a
                  href={`mailto:${siteConfig.contact.email}`}
                  className="hover:text-foreground"
                >
                  {siteConfig.contact.email}
                </a>
              </p>
              <p>
                <a
                  href={`tel:${siteConfig.contact.phone.replace(/\s/g, "")}`}
                  className="hover:text-foreground"
                >
                  {siteConfig.contact.phone}
                </a>
              </p>
            </address>
            <div className="border-border bg-secondary/30 text-muted-foreground mt-8 rounded-xl border p-6 text-sm">
              <p className="text-foreground font-medium">Opening hours</p>
              <p className="mt-2">Mon–Sat: 8:00 – 19:00</p>
              <p>Sun: 9:00 – 17:00</p>
              <p className="mt-4">
                Kitten viewings are available by appointment — contact us to
                meet Duchess Mabel or enquire about future litters.
              </p>
            </div>
          </div>
          <div>
            <h2 className="font-display text-2xl font-semibold">
              Send a message
            </h2>
            <div className="mt-6">
              <Suspense
                fallback={
                  <p className="text-muted-foreground">Loading form…</p>
                }
              >
                <ContactForm />
              </Suspense>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
}
