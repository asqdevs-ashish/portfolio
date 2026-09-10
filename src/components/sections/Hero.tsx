import { existsSync } from "node:fs";
import path from "node:path";
import Image from "next/image";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { Container } from "@/components/Container";
import { HeroVideo } from "@/components/HeroVideo";
import { media } from "@/lib/media";
import { availability, site } from "@/lib/site";

const capabilities = ["Web", "Mobile", "SaaS", "AI"];

// The hero plays Ashish's 15-second intro video (native 16:9, with sound when
// the browser allows it). Until a video file exists it quietly shows the
// poster frame, falling back to the real profile photo — so the right side of
// the hero is never a broken image or a project screenshot.
const HAS_HERO_VIDEO = existsSync(
  path.join(process.cwd(), "public", media.heroVideo.replace(/^\//, "")),
);
const HAS_HERO_POSTER = existsSync(
  path.join(
    process.cwd(),
    "public",
    media.heroVideoPoster.replace(/^\//, ""),
  ),
);

export function Hero() {
  return (
    <section className="relative overflow-hidden">
      <Container className="grid items-center gap-10 pb-14 pt-24 md:gap-12 md:pb-16 md:pt-32 lg:grid-cols-12 lg:gap-8 lg:pb-20">
        {/* Copy */}
        <div className="max-w-2xl lg:col-span-7">
          {availability.show && (
            <p className="mb-5 inline-flex items-center gap-2 rounded-md border border-primary/30 bg-primary/[0.06] px-3 py-1.5 text-xs font-medium text-primary/90">
              <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-primary" />
              {availability.label}
            </p>
          )}
          <p className="eyebrow flex-wrap">
            <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-primary" />
            {site.name}&nbsp;·&nbsp;AI &amp; Full-Stack Engineer
          </p>

          <h1 className="mt-6 text-balance text-[2.3rem] font-semibold leading-[1.08] tracking-[-0.025em] sm:text-5xl lg:text-[3.4rem]">
            I build websites, web applications &amp;{" "}
            <span className="font-display font-normal italic tracking-normal">
              cross-platform mobile apps.
            </span>
          </h1>

          <p className="mt-6 max-w-xl text-base leading-relaxed text-muted-foreground md:text-lg">
            Freelance AI &amp; full-stack engineer helping startups, SaaS
            companies and growing businesses turn ideas into polished digital
            products.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <a href="#contact" className="btn btn-primary">
              Start a Project
              <ArrowRight size={16} aria-hidden />
            </a>
            <a
              href="#work"
              className="btn btn-secondary"
              aria-label="View my work — scroll to selected projects"
            >
              View My Work
              <ArrowUpRight size={16} aria-hidden />
            </a>
          </div>

          <ul className="mt-9 flex flex-wrap items-center gap-x-3 gap-y-2 text-[13px] text-muted-foreground">
            {capabilities.map((item, i) => (
              <li key={item} className="flex items-center gap-3">
                {i > 0 && (
                  <span aria-hidden className="h-1 w-1 rounded-full bg-primary/70" />
                )}
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* 20-second intro video — the human first impression */}
        <div className="relative lg:col-span-5">
          <div
            aria-hidden
            className="absolute -left-3 -top-3 hidden h-16 w-16 border-l border-t border-primary/40 sm:block lg:-left-5 lg:-top-5"
          />
          <div
            aria-hidden
            className="absolute -bottom-3 -right-3 hidden h-16 w-16 border-b border-r border-border-strong sm:block lg:-bottom-5 lg:-right-5"
          />

          {HAS_HERO_VIDEO ? (
            <HeroVideo
              src={media.heroVideo}
              mobileSrc={media.heroVideoMobile}
              poster={HAS_HERO_POSTER ? media.heroVideoPoster : undefined}
              caption="Introduction"
            />
          ) : (
            <figure className="relative">
              <div className="relative aspect-[4/5] w-full overflow-hidden rounded-xl border border-border-strong bg-surface shadow-[0_28px_70px_-32px_rgba(0,0,0,0.8)]">
                {HAS_HERO_POSTER ? (
                  <Image
                    src={media.heroVideoPoster}
                    alt={`${site.name} — AI & Full-Stack Engineer`}
                    fill
                    priority
                    quality={90}
                    sizes="(max-width: 1024px) 100vw, 42vw"
                    className="object-contain"
                  />
                ) : (
                  <Image
                    src="/pfp1.jpeg"
                    alt={`${site.name} — AI & Full-Stack Engineer`}
                    fill
                    priority
                    quality={90}
                    sizes="(max-width: 1024px) 100vw, 42vw"
                    className="object-cover object-top"
                  />
                )}
              </div>
            </figure>
          )}
        </div>
      </Container>
    </section>
  );
}