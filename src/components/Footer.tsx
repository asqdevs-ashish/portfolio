import { Mail } from "lucide-react";
import { socialLinks, site } from "@/lib/site";
import { Container } from "@/components/Container";
import {
  GitHubIcon,
  LinkedInIcon,
  XIcon,
  YouTubeIcon,
} from "@/components/icons";

const icons = {
  GitHub: GitHubIcon,
  LinkedIn: LinkedInIcon,
  X: XIcon,
  YouTube: YouTubeIcon,
  Email: Mail,
} as const;

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-background">
      <Container className="pb-10 pt-12 md:pt-14">
        <div className="flex flex-col gap-10 md:flex-row md:items-start md:justify-between">
          <div className="max-w-sm">
            <p className="text-[15px] font-semibold tracking-tight">
              {site.name}
              <span aria-hidden className="text-primary">
                .
              </span>
            </p>
            <p className="mt-1.5 text-sm text-muted-foreground">
              {site.role} — {site.focus}
            </p>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
              Building modern digital products across web and mobile for
              startups, SaaS companies and growing businesses.
            </p>
          </div>

          <div className="flex flex-col gap-10 sm:flex-row sm:items-start sm:gap-16">
            <nav aria-label="Services">
              <p className="text-xs font-medium uppercase tracking-[0.16em] text-muted-foreground">
                Services
              </p>
              <ul className="mt-4 space-y-2.5 text-sm">
                {[
                  {
                    href: "/services/web-development",
                    label: "Web Development",
                  },
                  {
                    href: "/services/mobile-app-development",
                    label: "Mobile App Development",
                  },
                  {
                    href: "/services/saas-development",
                    label: "SaaS Development",
                  },
                  { href: "/services/ai-integration", label: "AI Integration" },
                ].map((item) => (
                  <li key={item.href}>
                    <a
                      href={item.href}
                      className="text-muted-foreground transition-colors hover:text-foreground"
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>

            <nav aria-label="Work">
              <p className="text-xs font-medium uppercase tracking-[0.16em] text-muted-foreground">
                Work
              </p>
              <ul className="mt-4 space-y-2.5 text-sm">
                {[
                  { href: "/work/a2-trade", label: "A² Trade" },
                  { href: "/work/chain-arrow-lock", label: "Chain Arrow Lock" },
                  { href: "/work/my-bunny", label: "My Bunny" },
                ].map((item) => (
                  <li key={item.href}>
                    <a
                      href={item.href}
                      className="text-muted-foreground transition-colors hover:text-foreground"
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>

            <div className="flex items-center gap-2.5">
              {socialLinks.map((link) => {
                const Icon = icons[link.label as keyof typeof icons];
                const isProfile = [
                  "GitHub",
                  "LinkedIn",
                  "X",
                  "YouTube",
                ].includes(link.label);
                return (
                  <a
                    key={link.label}
                    href={link.href}
                    target="_blank"
                    rel={
                      isProfile
                        ? "me noopener noreferrer"
                        : "noopener noreferrer"
                    }
                    aria-label={link.label}
                    className="flex h-10 w-10 items-center justify-center rounded-lg border border-border text-muted-foreground transition-colors hover:border-primary/40 hover:text-foreground"
                  >
                    <Icon size={17} />
                  </a>
                );
              })}
            </div>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-2 border-t border-border pt-5 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {site.name}. All rights reserved.
          </p>
          <p>Websites · Web apps · Mobile apps · SaaS · AI features</p>
        </div>
      </Container>
    </footer>
  );
}
