import type { Metadata } from "next";

import { siteConfig } from "@/content/site";

type PageMetadataOptions = {
  title: string | { absolute: string };
  description: string;
  path?: string;
  image?: {
    url: string;
    alt: string;
  };
};

function resolveTitle(title: PageMetadataOptions["title"]) {
  if (typeof title === "string") {
    return { metadataTitle: title, displayTitle: title };
  }

  return { metadataTitle: title, displayTitle: title.absolute };
}

export function createPageMetadata({
  title,
  description,
  path = "",
  image,
}: PageMetadataOptions): Metadata {
  const canonicalPath = path || "/";
  const pageUrl = `${siteConfig.url}${canonicalPath === "/" ? "" : canonicalPath}`;
  const { metadataTitle, displayTitle } = resolveTitle(title);

  return {
    title: metadataTitle,
    description,
    alternates: {
      canonical: canonicalPath,
    },
    openGraph: {
      title: displayTitle,
      description,
      url: pageUrl,
      ...(image
        ? {
            images: [
              {
                url: image.url,
                alt: image.alt,
              },
            ],
          }
        : {}),
    },
    twitter: {
      title: displayTitle,
      description,
      ...(image ? { images: [image.url] } : {}),
    },
  };
}

export function getLocalBusinessJsonLd() {
  const { contact, seo } = siteConfig;

  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    additionalType: "https://schema.org/PetStore",
    name: siteConfig.name,
    description: siteConfig.description,
    url: siteConfig.url,
    image: `${siteConfig.url}${siteConfig.heroImage.src}`,
    logo: `${siteConfig.url}${siteConfig.logo.src}`,
    telephone: contact.phone.replace(/\s/g, ""),
    email: contact.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: seo.address.streetAddress,
      addressLocality: seo.address.locality,
      addressRegion: seo.address.region,
      postalCode: seo.address.postalCode,
      addressCountry: seo.address.country,
    },
    areaServed: seo.areaServed.map((area) => ({
      "@type": "AdministrativeArea",
      name: area,
    })),
    openingHoursSpecification: seo.openingHours.map((hours) => ({
      "@type": "OpeningHoursSpecification",
      dayOfWeek: hours.days,
      opens: hours.opens,
      closes: hours.closes,
    })),
    sameAs: seo.sameAs,
    knowsAbout: seo.knowsAbout,
  };
}
