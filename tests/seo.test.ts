import { describe, expect, it } from "vitest";

import { siteConfig } from "@/content/site";
import { createPageMetadata, getLocalBusinessJsonLd } from "@/lib/seo";

describe("createPageMetadata", () => {
  it("sets canonical and open graph URLs for a page path", () => {
    const metadata = createPageMetadata({
      title: "Contact — Cat Hotel & Kitten Enquiries Basildon",
      description: "Contact Royal Puffy Purrs in Basildon, Essex.",
      path: "/contact",
    });

    expect(metadata.alternates?.canonical).toBe("/contact");
    expect(metadata.openGraph?.url).toBe(`${siteConfig.url}/contact`);
    expect(metadata.openGraph?.title).toBe(
      "Contact — Cat Hotel & Kitten Enquiries Basildon",
    );
  });

  it("supports absolute homepage titles", () => {
    const metadata = createPageMetadata({
      title: {
        absolute:
          "Luxury Cat Hotel Basildon | British Shorthair Kittens Essex | Royal Puffy Purrs",
      },
      description: "Luxury cat boarding in Basildon, Essex.",
      path: "/",
    });

    expect(metadata.title).toEqual({
      absolute:
        "Luxury Cat Hotel Basildon | British Shorthair Kittens Essex | Royal Puffy Purrs",
    });
    expect(metadata.alternates?.canonical).toBe("/");
  });
});

describe("getLocalBusinessJsonLd", () => {
  it("includes local business details for search engines", () => {
    const jsonLd = getLocalBusinessJsonLd();

    expect(jsonLd["@type"]).toBe("LocalBusiness");
    expect(jsonLd.name).toBe(siteConfig.name);
    expect(jsonLd.url).toBe(siteConfig.url);
    expect(jsonLd.address).toMatchObject({
      addressLocality: "Basildon",
      addressRegion: "Essex",
      postalCode: "SS13",
      addressCountry: "GB",
    });
    expect(jsonLd.openingHoursSpecification).toHaveLength(2);
    expect(jsonLd.knowsAbout).toContain("Luxury cat boarding");
  });
});
