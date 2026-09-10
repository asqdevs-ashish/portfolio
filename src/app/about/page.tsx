import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, FileText } from "lucide-react";
import { Container } from "@/components/Container";
import { JsonLd } from "@/components/JsonLd";
import { projects, projectSlug } from "@/lib/projects";
import { site, socialLinks } from "@/lib/site";

export const metadata: Metadata = {
  title: "About",
  description:
    "Ashish Pathak is a freelance AI & full-stack engineer building modern websites, web applications, cross-platform mobile apps and SaaS products for startups, SaaS companies and growing businesses.",
  alternates: {
    canonical: `${site.domain}/about`,
  },
  openGraph: {
    type: "website",
    url: `${site.domain}/about`,
    siteName: site.name,
    title: `About Ashish Pathak | AI & Full-Stack Engineer`,
    description:
      "Ashish Pathak is a freelance AI & full-stack engineer building modern websites, web applications, cross-platform mobile apps and SaaS products for startups, SaaS companies and growing businesses.",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: `${site.name} — AI & Full-Stack Engineer`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `About Ashish Pathak | AI & Full-Stack Engineer`,
    description:
      "Ashish Pathak is a freelance AI & full-stack engineer building modern websites, web applications, cross-platform mobile apps and SaaS products.",
    creator: "@ashish_dev404",
    images: ["/opengraph-image"],
  },
};

const profilePageJsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfilePage",
  "@id": `${site.domain}/about#profilepage`,
  name: "About Ashish Pathak",
  url: `${site.domain}/about`,
  inLanguage: "en",
  mainEntity: { "@id": `${site.domain}/#person` },
};

const focusAreas = [
  {
    title: "Web",
    body: "Marketing sites, web applications and dashboards built with Next.js, React and Node.js.",
  },
  {
    title: "Mobile",
    body: "Cross-platform iOS and Android apps from a single React Native codebase.",
  },
  {
    title: "SaaS",
    body: "MVPs and production-ready SaaS products — frontend, backend and deployment end to end.",
  },
  {
    title: "AI",
    body: "Practical LLM-powered features and automation inside web and mobile products.",
  },
];

const featuredProjects = projects.slice(0, 4);

export default function AboutPage() {
  return (
    <section className="border-b border-border/70 pb-24 pt-28 md:pb-32 md:pt-36">
      <Container>
        <JsonLd data={profilePageJsonLd} />

        <header className="max-w-3xl">
          <p className="eyebrow">
            <span className="eyebrow-index">About</span>
            <span>Ashish Pathak</span>
          </p>
          <h1 className="mt-5 text-balance text-4xl font-semibold leading-[1.12] tracking-[-0.02em] text-foreground md:text-5xl md:leading-[1.08]">
            I’m {site.name} — an AI &amp; full-stack engineer building modern
            digital products across web and mobile.
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg">
            I work directly with startups, SaaS companies and growing businesses
            — turning ideas into products people actually use: websites, web
            applications, cross-platform mobile apps and AI-powered features.
          </p>
        </header>

        <div className="mt-14 grid items-start gap-12 lg:grid-cols-12 lg:gap-14">
          {/* Photo */}
          <figure className="lg:col-span-5">
            <div className="mx-auto w-full max-w-sm overflow-hidden rounded-xl border border-border-strong lg:mx-0 lg:max-w-none">
              <Image
                src="/pfp1.jpeg"
                alt={`${site.name} — AI & Full-Stack Engineer`}
                width={721}
                height={1280}
                quality={90}
                sizes="(max-width: 1024px) 26rem, 40vw"
                className="h-auto w-full"
              />
            </div>
            <figcaption className="mx-auto mt-3 flex max-w-sm items-center justify-between text-xs text-muted-foreground lg:mx-0 lg:max-w-none">
              <span>
                {site.name} — {site.role}
              </span>
              <span className="hidden sm:inline">{site.focus}</span>
            </figcaption>
          </figure>

          {/* Story */}
          <div className="lg:col-span-7">
            <div className="max-w-xl space-y-4 text-[15px] leading-relaxed text-muted-foreground md:text-base">
              <p>
                I’m a freelance engineer focused on {site.focus}. I build
                marketing sites, web applications, SaaS products and
                cross-platform mobile apps with React Native — and I add AI
                features where they genuinely make the product better.
              </p>
              <p>
                The way I like to work is simple: understand the problem first,
                build something focused, keep you in the loop and ship on time.
              </p>
            </div>

            {/* What I do */}
            <div className="mt-9">
              <p className="text-xs font-medium uppercase tracking-[0.16em] text-muted-foreground">
                What I do
              </p>
              <ul className="mt-4 grid gap-3 sm:grid-cols-2">
                {focusAreas.map((area) => (
                  <li
                    key={area.title}
                    className="rounded-xl border border-border bg-surface p-5"
                  >
                    <h2 className="text-[15px] font-semibold tracking-tight text-foreground">
                      {area.title}
                    </h2>
                    <p className="mt-1.5 text-[13px] leading-relaxed text-muted-foreground">
                      {area.body}
                    </p>
                  </li>
                ))}
              </ul>
            </div>

            {/* Tools */}
            <div className="mt-8">
              <p className="text-xs font-medium uppercase tracking-[0.16em] text-muted-foreground">
                Tools I work with
              </p>
              <ul className="mt-4 flex flex-wrap gap-2">
                {[
                  "Next.js",
                  "React",
                  "TypeScript",
                  "Node.js",
                  "React Native",
                  "PostgreSQL",
                  "MongoDB",
                  "AWS",
                ].map((tool) => (
                  <li key={tool} className="chip">
                    {tool}
                  </li>
                ))}
              </ul>
            </div>

            {/* Professional links */}
            <div className="mt-8">
              <p className="text-xs font-medium uppercase tracking-[0.16em] text-muted-foreground">
                Find me online
              </p>
              <ul className="mt-4 flex flex-wrap gap-2">
                {socialLinks.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-secondary px-4 py-2 text-sm"
                    >
                      {link.label}
                      <ArrowUpRight size={14} aria-hidden />
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/work" className="btn btn-primary text-sm">
                View selected work
                <ArrowRight size={15} aria-hidden />
              </Link>
              <Link href="/contact" className="btn btn-secondary text-sm">
                Get in touch
              </Link>
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
          </div>
        </div>

        {/* Real project references */}
        <section className="mt-20 border-t border-border pt-14">
          <div className="flex flex-wrap items-end justify-between gap-x-8 gap-y-4">
            <div className="max-w-2xl">
              <p className="eyebrow">
                <span className="eyebrow-index">Projects</span>
                <span>Selected work</span>
              </p>
              <h2 className="mt-5 text-3xl font-semibold tracking-[-0.02em] text-foreground md:text-4xl">
                Real projects I’ve designed and built.
              </h2>
            </div>
            <Link
              href="/work"
              className="inline-flex items-center gap-1.5 text-sm text-foreground/90 transition-colors hover:text-primary"
            >
              View all work
              <ArrowUpRight size={14} aria-hidden />
            </Link>
          </div>

          <ul className="mt-9 grid gap-4 sm:grid-cols-2">
            {featuredProjects.map((project) => (
              <li key={project.title}>
                <Link
                  href={`/work/${projectSlug(project.title)}`}
                  className="group flex h-full flex-col justify-between rounded-xl border border-border bg-surface p-5 transition-colors hover:border-primary/40"
                >
                  <div>
                    <p className="text-[10px] font-medium uppercase tracking-[0.16em] text-muted-foreground">
                      {project.category}
                    </p>
                    <h3 className="mt-2 text-lg font-semibold tracking-tight text-foreground transition-colors group-hover:text-primary">
                      {project.title}
                    </h3>
                    <p className="mt-1 text-sm text-muted-foreground">
                      {project.subtitle}
                    </p>
                  </div>
                  <span className="mt-5 inline-flex items-center gap-1.5 text-sm text-foreground/80 transition-colors group-hover:text-primary">
                    View case study
                    <ArrowUpRight
                      size={14}
                      aria-hidden
                      className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                    />
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </section>

        {/* CTA */}
        <section className="mt-16 border-t border-border pt-12">
          <h2 className="max-w-2xl text-3xl font-semibold tracking-[-0.02em] text-foreground md:text-4xl">
            Have a project in mind?
          </h2>
          <p className="mt-4 max-w-xl text-[15px] leading-relaxed text-muted-foreground md:text-base">
            Tell me what you’re building — a website, a web app, a SaaS product
            or a mobile app. Every enquiry gets a personal reply, usually within
            24 hours.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Link href="/contact" className="btn btn-primary">
              Start a Project
              <ArrowRight size={16} aria-hidden />
            </Link>
            <Link href="/work" className="btn btn-secondary">
              View selected work
            </Link>
          </div>
        </section>
      </Container>
    </section>
  );
}