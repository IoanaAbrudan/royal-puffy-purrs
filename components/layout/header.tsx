"use client";

import { Heart, Menu, Moon, Sun, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";
import { useState, useSyncExternalStore } from "react";

import { Button } from "@/components/ui/button";
import { PawIcon } from "@/components/ui/cat-decorations";
import { Container } from "@/components/layout/container";
import { mainNav } from "@/content/navigation";
import { siteConfig } from "@/content/site";
import { cn } from "@/lib/utils";

const emptySubscribe = () => () => {};

export function Header() {
  const pathname = usePathname();
  const { theme, setTheme } = useTheme();
  const mounted = useSyncExternalStore(emptySubscribe, () => true, () => false);
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-border/60 bg-background/85 backdrop-blur-md">
      <Container>
        <div className="flex h-16 items-center justify-between gap-4">
          <Link
            href="/"
            className="group flex shrink-0 items-center gap-3 font-display text-lg font-semibold text-foreground"
          >
            <Image
              src={siteConfig.logo.src}
              alt=""
              width={44}
              height={44}
              className="h-11 w-11 rounded-full bg-white object-contain p-0.5 shadow-soft ring-2 ring-border/60 transition-transform group-hover:scale-105"
              aria-hidden
            />
            <span className="hidden sm:inline">{siteConfig.name}</span>
          </Link>

          <nav className="hidden items-center gap-1 md:flex" aria-label="Main">
            {mainNav.map((item) => {
              const isActive =
                item.href === "/"
                  ? pathname === "/"
                  : pathname === item.href ||
                    (item.href.startsWith("/#") && pathname === "/");

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "rounded-xl px-3 py-2 text-sm font-medium transition-colors hover:bg-secondary",
                    isActive && "bg-secondary text-primary",
                  )}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-2">
            {mounted && (
              <Button
                variant="ghost"
                size="icon"
                aria-label="Toggle theme"
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              >
                {theme === "dark" ? (
                  <Sun className="h-5 w-5" />
                ) : (
                  <Moon className="h-5 w-5" />
                )}
              </Button>
            )}
            <Button asChild className="hidden sm:inline-flex" variant="accent">
              <Link href="/contact">
                <Heart className="h-4 w-4 fill-current" aria-hidden />
                Book now
              </Link>
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              aria-label={open ? "Close menu" : "Open menu"}
              onClick={() => setOpen((prev) => !prev)}
            >
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {open && (
          <nav
            className="border-t border-border py-4 md:hidden"
            aria-label="Mobile"
          >
            <ul className="flex flex-col gap-1">
              {mainNav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="flex items-center gap-2 rounded-xl px-3 py-2 text-sm font-medium hover:bg-secondary"
                    onClick={() => setOpen(false)}
                  >
                    <PawIcon size={14} className="text-accent" />
                    {item.label}
                  </Link>
                </li>
              ))}
              <li className="pt-2">
                <Button asChild variant="accent" className="w-full">
                  <Link href="/contact" onClick={() => setOpen(false)}>
                    Book now
                  </Link>
                </Button>
              </li>
            </ul>
          </nav>
        )}
      </Container>
    </header>
  );
}
