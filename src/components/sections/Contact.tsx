"use client";

import {
  ArrowRight,
  CalendarDays,
  Mail,
  MessageCircle,
  Phone,
} from "lucide-react";
import { Container } from "@/components/Container";
import { Reveal } from "@/components/Reveal";
import { SectionIntro } from "@/components/SectionIntro";
import { ContactForm } from "@/components/ContactForm";
import { useBooking } from "@/components/booking";
import { site, whatsappUrl } from "@/lib/site";
import { trackCta } from "@/lib/track";

export function Contact() {
  const { openBooking } = useBooking();

  return (
    <section
      id="contact"
      className="scroll-mt-24 border-t border-border/70 py-20 md:py-24"
    >
      <Container className="grid gap-12 lg:grid-cols-12 lg:gap-14">
        {/* Narrative */}
        <div className="lg:col-span-5">
          <Reveal>
            <SectionIntro
              index="08"
              label="Contact"
              title={
                <>
                  Tell me about{" "}
                  <span className="font-display font-normal italic">
                    your project.
                  </span>
                </>
              }
            />
            <p className="mt-5 max-w-md text-[15px] leading-relaxed text-muted-foreground md:text-base">
              A few honest sentences are enough — a website, a web app, a SaaS
              product or a mobile app, and where you are with it. Every enquiry
              gets a personal reply, usually within 24 hours.
            </p>

            <div className="mt-7 max-w-md border-t border-border pt-5">
              <p className="text-xs font-medium uppercase tracking-[0.16em] text-muted-foreground">
                Pick whatever feels easiest
              </p>
              <ul className="mt-4 space-y-3 text-sm text-muted-foreground">
                <li>
                  Prefer writing it down?{" "}
                  <span className="text-foreground/90">
                    Start a Project with the form.
                  </span>
                </li>
                <li>
                  Prefer talking first?{" "}
                  <span className="text-foreground/90">
                    Book a short discovery call.
                  </span>
                </li>
                <li>
                  Quick question?{" "}
                  <span className="text-foreground/90">WhatsApp me.</span>
                </li>
                <li>
                  Formal brief?{" "}
                  <span className="text-foreground/90">Send an email.</span>
                </li>
              </ul>
            </div>

            <div className="mt-7 max-w-md rounded-xl border border-border bg-surface/60 p-5 sm:p-6">
              <p className="text-xs font-medium uppercase tracking-[0.16em] text-muted-foreground">
                How engagements work
              </p>
              <ul className="mt-4 space-y-2.5 text-[13px] leading-relaxed text-muted-foreground">
                <li>Clear scope before we start — fixed-price or hourly.</li>
                <li>Milestone-based payments — you pay as work ships.</li>
                <li>The code and assets are yours.</li>
                <li>Weekly updates, so you always know where things stand.</li>
                <li>A post-launch support window is included.</li>
              </ul>
            </div>
          </Reveal>
        </div>

        {/* Paths + form */}
        <div className="lg:col-span-7">
          <Reveal delay={100}>
            <div className="grid gap-3 sm:grid-cols-2">
              {/* Option 1 — form */}
              <a
                href="#project-form"
                className="group rounded-xl border border-border bg-surface p-5 transition-colors hover:border-primary/40"
              >
                <div className="flex items-center justify-between gap-3">
                  <p className="text-[15px] font-semibold tracking-tight text-foreground">
                    Start a Project
                  </p>
                  <ArrowRight
                    size={16}
                    aria-hidden
                    className="shrink-0 text-muted-foreground transition-all duration-300 group-hover:translate-x-0.5 group-hover:text-primary"
                  />
                </div>
                <p className="mt-1.5 text-[13px] leading-relaxed text-muted-foreground">
                  Prefer writing it down? The form below takes two minutes.
                </p>
              </a>

              {/* Option 2 — call */}
              <button
                type="button"
                onClick={openBooking}
                className="group rounded-xl border border-border bg-surface p-5 text-left transition-colors hover:border-primary/40"
              >
                <div className="flex items-center justify-between gap-3">
                  <p className="text-[15px] font-semibold tracking-tight text-foreground">
                    Book a Call
                  </p>
                  <CalendarDays
                    size={16}
                    aria-hidden
                    className="shrink-0 text-muted-foreground transition-colors duration-300 group-hover:text-primary"
                  />
                </div>
                <p className="mt-1.5 text-[13px] leading-relaxed text-muted-foreground">
                  Not sure where to start? A short discovery call is usually the
                  easiest way.
                </p>
              </button>
            </div>

            {/* Project form */}
            <div id="project-form" className="mt-4 scroll-mt-28">
              <ContactForm />
            </div>

            {/* Supporting options */}
            <div className="mt-4 flex flex-wrap items-center justify-between gap-x-6 gap-y-3 px-1 text-sm">
              <p className="text-muted-foreground">Prefer something quicker?</p>
              <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
                <a
                  href={`mailto:${site.email}`}
                  className="inline-flex items-center gap-2 text-foreground/90 transition-colors hover:text-primary"
                >
                  <Mail size={15} aria-hidden />
                  Email
                </a>
                <a
                  href={site.phoneHref}
                  className="inline-flex items-center gap-2 text-foreground/90 transition-colors hover:text-primary"
                >
                  <Phone size={15} aria-hidden />
                  {site.phone}
                </a>
                <a
                  href={whatsappUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackCta("whatsapp")}
                  className="inline-flex items-center gap-2 text-foreground/90 transition-colors hover:text-primary"
                >
                  <MessageCircle size={15} aria-hidden />
                  WhatsApp
                </a>
              </div>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
