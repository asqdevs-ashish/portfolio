import Image from "next/image";
import { ArrowRight, FileText } from "lucide-react";
import { Container } from "@/components/Container";
import { Reveal } from "@/components/Reveal";
import { SectionIntro } from "@/components/SectionIntro";
import { VideoEmbed } from "@/components/VideoEmbed";
import { media } from "@/lib/media";
import { site } from "@/lib/site";

const tools = [
  "Next.js",
  "React",
  "TypeScript",
  "Node.js",
  "React Native",
  "PostgreSQL",
  "MongoDB",
  "AWS",
];

export function About() {
  return (
    <section id="about" className="scroll-mt-24 py-20 md:py-24">
      <Container>
        <SectionIntro
          index="05"
          label="About"
          title={
            <>
              The person behind{" "}
              <span className="font-display font-normal italic">
                the projects.
              </span>
            </>
          }
        />

        <div className="mt-12 grid items-start gap-12 lg:grid-cols-12 lg:gap-14">
          {/* Photo — shown whole, at its natural portrait ratio */}
          <Reveal className="lg:col-span-5">
            <figure className="mx-auto w-full max-w-sm lg:mx-0 lg:max-w-none">
              <div className="overflow-hidden rounded-xl border border-border-strong">
                <Image
                  src="/pfp1.jpeg"
                  alt="Portrait of Ashish Kumar, AI & Full-Stack Engineer"
                  width={721}
                  height={1280}
                  quality={90}
                  sizes="(max-width: 1024px) 26rem, 40vw"
                  className="h-auto w-full"
                />
              </div>
              <figcaption className="mt-3 flex items-center justify-between text-xs text-muted-foreground">
                <span>
                  {site.name} — {site.role}
                </span>
                <span className="hidden sm:inline">Web Development</span>
              </figcaption>
            </figure>
          </Reveal>

          {/* Story */}
          <Reveal delay={100} className="lg:col-span-7">
            <h3 className="text-2xl font-semibold tracking-tight text-foreground md:text-[1.9rem] md:leading-snug">
              I’m Ashish — an AI &amp; full-stack engineer focused on building
              modern digital products across web and mobile.
            </h3>
            <div className="mt-5 max-w-xl space-y-4 text-[15px] leading-relaxed text-muted-foreground md:text-base">
              <p>
                I work directly with startups, SaaS companies and growing
                businesses — taking ideas and requirements and turning them into
                products people actually use, whether that’s a website, a web
                app or a mobile app.
              </p>
              <p>
                My work spans web development, cross-platform mobile apps with
                React Native, backend systems, APIs, deployment and AI
                integrations — wherever they genuinely add value to the product.
              </p>
              <p>
                The way I like to work is simple: understand the problem first,
                build something focused, keep you in the loop and ship on time.
              </p>
            </div>

            {/* 30–60s intro video — add a URL in src/lib/media.ts to show it */}
            <VideoEmbed src={media.aboutVideo} className="mt-8" />

            <div className="mt-7">
              <p className="text-xs font-medium uppercase tracking-[0.16em] text-muted-foreground">
                Tools I work with
              </p>
              <ul className="mt-4 flex flex-wrap gap-2">
                {tools.map((tool) => (
                  <li key={tool} className="chip">
                    {tool}
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href={`mailto:${site.email}`}
                className="btn btn-primary text-sm"
              >
                Say hello
                <ArrowRight size={15} aria-hidden />
              </a>
              <a
                href="/resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-secondary text-sm"
              >
                <FileText size={15} aria-hidden />
                Résumé
              </a>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
