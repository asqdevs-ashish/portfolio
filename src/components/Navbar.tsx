"use client";

import Link from "next/link";
import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { trackCta } from "@/lib/track";
import { site } from "@/lib/site";

const navLinks = [
  { href: "/work", label: "Work" },
  { href: "/#services", label: "Services" },
  { href: "/about", label: "About" },
  { href: "/#faq", label: "FAQ" },
];

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <header
      id="top"
      className={`fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,backdrop-filter] duration-300 ${
        isScrolled || menuOpen
          ? "border-b border-border/80 bg-background/85 backdrop-blur-md"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <nav
        aria-label="Main"
        className="shell flex h-16 items-center justify-between md:h-[4.5rem]"
      >
        <a
          href="#top"
          className="text-[15px] font-semibold tracking-tight text-foreground"
          aria-label={`${site.name} — back to top`}
        >
          {site.name}
          <span aria-hidden className="text-primary">
            .
          </span>
        </a>

        {/* Desktop links */}
        <div className="hidden items-center gap-8 md:flex">
          <ul className="flex items-center gap-8">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
          <Link
            href="/#contact"
            onClick={() => trackCta("start_project")}
            className="btn btn-primary px-5 py-2.5 text-sm"
          >
            Start a Project
          </Link>
        </div>

        {/* Mobile toggle */}
        <button
          type="button"
          className="-mr-2 rounded-md p-2 text-foreground md:hidden"
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          onClick={() => setMenuOpen((open) => !open)}
        >
          {menuOpen ? <X size={22} aria-hidden /> : <Menu size={22} aria-hidden />}
        </button>
      </nav>

      {/* Mobile menu */}
      {menuOpen && (
        <div
          id="mobile-menu"
          className="border-t border-border/60 bg-background md:hidden"
        >
          <div className="shell flex flex-col pb-8 pt-2">
            <ul>
              {navLinks.map((link) => (
                <li key={link.href} className="border-b border-border/60">
                  <Link
                    href={link.href}
                    onClick={() => setMenuOpen(false)}
                    className="flex items-center justify-between py-4 text-[15px] text-foreground/90 transition-colors hover:text-primary"
                  >
                    {link.label}
                    <span aria-hidden className="text-xs text-muted-foreground">
                      ↗
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
            <Link
              href="/#contact"
              onClick={() => {
                setMenuOpen(false);
                trackCta("start_project");
              }}
              className="btn btn-primary mt-6 w-full text-sm"
            >
              Start a Project
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
