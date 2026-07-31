import { Heart } from "lucide-react";
import Link from "next/link";

import { Container } from "@/components/layout/container";
import { PawIcon } from "@/components/ui/cat-decorations";
import { footerNav } from "@/content/navigation";
import { siteConfig } from "@/content/site";

export function Footer() {
  return (
    <footer className="border-t border-border bg-gradient-to-b from-secondary/30 to-blush/20">
      <Container className="py-12">
        <div className="grid gap-10 md:grid-cols-4">
          <div className="md:col-span-2">
            <div className="flex items-center gap-3">
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <PawIcon size={18} />
              </span>
              <p className="font-display text-xl font-semibold">
                {siteConfig.name}
              </p>
            </div>
            <p className="mt-3 max-w-md text-sm leading-relaxed text-muted-foreground">
              {siteConfig.description}
            </p>
            <p className="mt-4 flex items-start gap-2 text-sm text-muted-foreground">
              <PawIcon size={16} className="mt-0.5 shrink-0 text-accent" />
              {siteConfig.contact.address}
            </p>
            <p className="mt-4 flex items-center gap-1.5 text-sm text-muted-foreground">
              <Heart className="h-4 w-4 fill-accent text-accent" aria-hidden />
              Made with love for every whisker
            </p>
          </div>

          <div>
            <h2 className="flex items-center gap-2 text-sm font-semibold uppercase tracking-wide">
              <PawIcon size={14} className="text-primary" />
              Services
            </h2>
            <ul className="mt-4 space-y-2">
              {footerNav.services.map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-primary"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="flex items-center gap-2 text-sm font-semibold uppercase tracking-wide">
              <Heart className="h-3.5 w-3.5 fill-accent text-accent" aria-hidden />
              Company
            </h2>
            <ul className="mt-4 space-y-2">
              {footerNav.company.map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-primary"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-2 border-t border-border/60 pt-6 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <p className="flex items-center gap-2">
            <PawIcon size={14} className="text-accent" />
            © {new Date().getFullYear()} {siteConfig.name}. All rights reserved.
          </p>
          <p>
            <a
              href={`mailto:${siteConfig.contact.email}`}
              className="hover:text-primary"
            >
              {siteConfig.contact.email}
            </a>
            {" · "}
            <a
              href={`tel:${siteConfig.contact.phone.replace(/\s/g, "")}`}
              className="hover:text-primary"
            >
              {siteConfig.contact.phone}
            </a>
          </p>
        </div>
      </Container>
    </footer>
  );
}
