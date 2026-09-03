import { getLocalBusinessJsonLd } from "@/lib/seo";

export function LocalBusinessJsonLd() {
  const jsonLd = getLocalBusinessJsonLd();

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
