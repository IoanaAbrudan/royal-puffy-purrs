import type { Metadata } from "next";
import { Suspense } from "react";

import { Container } from "@/components/layout/container";
import { ContactForm } from "@/components/sections/contact-form";
import { PageHeader } from "@/components/sections/page-header";
import { siteConfig } from "@/content/site";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Book a luxury cat hotel suite or join the waitlist for upcoming kittens at Royal Puffy Purrs.",
};

export default function ContactPage() {
  return (
    <>
      <PageHeader
        eyebrow="Concierge"
        title="We'd love to hear from you"
        description="Whether you're planning a cat hotel stay or would like to join our kitten waitlist, our team is here to help."
      />
      <Container className="py-14 sm:py-16">
        <div className="grid gap-12 lg:grid-cols-2">
          <div>
            <h2 className="font-display text-2xl font-semibold">Visit us</h2>
            <address className="mt-4 space-y-2 text-muted-foreground not-italic">
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
            <div className="mt-8 rounded-xl border border-border bg-secondary/30 p-6 text-sm text-muted-foreground">
              <p className="font-medium text-foreground">Opening hours</p>
              <p className="mt-2">Mon–Sat: 8:00 – 19:00</p>
              <p>Sun: 9:00 – 17:00</p>
              <p className="mt-4">
                Cattery visits for kittens will open when our first litters are
                ready — join the waitlist to hear first.
              </p>
            </div>
          </div>
          <div>
            <h2 className="font-display text-2xl font-semibold">
              Send a message
            </h2>
            <div className="mt-6">
              <Suspense fallback={<p className="text-muted-foreground">Loading form…</p>}>
                <ContactForm />
              </Suspense>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
}
