import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, ArrowRight, ArrowUpRight, ChevronRight } from "lucide-react";
import { Container } from "@/components/Container";
import { ProjectImage } from "@/components/ProjectImage";
import { VideoEmbed } from "@/components/VideoEmbed";
import { BookCallButton } from "@/components/booking";
import { JsonLd } from "@/components/JsonLd";
import { projects, projectSlug, type Project } from "@/lib/projects";
import { media } from "@/lib/media";
import { services } from "@/lib/services";
import { site } from "@/lib/site";

export const dynamicParams = false;

export function generateStaticParams() {
  return projects.map((p) => ({ slug: projectSlug(p.title) }));
}

const serviceSlugsByCategory: Record<Project["category"], string> = {
  "Web App": "web-development",
  "Mobile App": "mobile-app-development",
  SaaS: "saas-development",
  "AI Product": "ai-integration",
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((p) => projectSlug(p.title) === slug);
  if (!project) return {};

  const url = `${site.domain}work/${slug}`;
  return {
    title: `${project.title} — ${project.subtitle} | Ashish Kumar`,
    description: project.description,
    alternates: { canonical: url },
    openGraph: {
      type: "website",
      url,
      siteName: site.name,
      title: `${project.title} — ${project.subtitle} | Ashish Kumar`,
      description: project.description,
    },
  };
}

export default async function WorkCaseStudyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = projects.find((p) => projectSlug(p.title) === slug);
  if (!project) notFound();

  const video = media.projectVideos[project.title];
  const index = projects.findIndex((p) => p.title === project.title);
  const prev = projects[(index - 1 + projects.length) % projects.length];
  const next = projects[(index + 1) % projects.length];
  const serviceSlug = serviceSlugsByCategory[project.category];
  const service = services.find((s) => s.slug === serviceSlug);
  const url = `${site.domain}work/${slug}`;

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: site.domain },
      {
        "@type": "ListItem",
        position: 2,
        name: "Work",
        item: `${site.domain}#work`,
      },
      { "@type": "ListItem", position: 3, name: project.title, item: url },
    ],
  };

  const webpageJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: project.title,
    description: project.description,
    url,
    inLanguage: "en",
    author: { "@type": "Person", name: site.name, url: site.domain },
    isPartOf: { "@type": "WebSite", name: site.name, url: site.domain },
  };

  return (
    <section className="border-b border-border/70 pb-24 pt-28 md:pb-32 md:pt-36">
      <Container>
        <JsonLd data={breadcrumbJsonLd} />
        <JsonLd data={webpageJsonLd} />

        {/* Breadcrumbs */}
        <nav aria-label="Breadcrumb">
          <ol className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
            <li>
              <Link href="/" className="transition-colors hover:text-primary">
                Home
              </Link>
            </li>
            <li aria-hidden>
              <ChevronRight size={13} />
            </li>
            <li>
              <Link
                href="/#work"
                className="transition-colors hover:text-primary"
              >
                Work
              </Link>
            </li>
            <li aria-hidden>
              <ChevronRight size={13} />
            </li>
            <li aria-current="page" className="text-foreground/90">
              {project.title}
            </li>
          </ol>
        </nav>

        <header className="mt-10 max-w-3xl">
          <p className="eyebrow">
            <span className="eyebrow-index">Case Study</span>
            <span>{project.category}</span>
          </p>
          <h1 className="mt-5 font-display text-4xl leading-tight text-foreground md:text-5xl">
            {project.title}
          </h1>
          <p className="mt-3 text-lg text-muted-foreground">
            {project.subtitle}
          </p>
          <p className="mt-6 text-base leading-relaxed text-foreground/85 md:text-lg">
            {project.description}
          </p>
        </header>

        <div className="mt-12">
          <ProjectImage project={project} priority />
        </div>

        <div className="mt-14 grid gap-10 md:grid-cols-2 md:gap-12">
          <div>
            <p className="eyebrow">
              <span className="eyebrow-index">01</span>
              <span>The Problem</span>
            </p>
            <p className="mt-3 text-[15px] leading-relaxed text-foreground/85 md:text-base">
              {project.problem}
            </p>
          </div>
          <div>
            <p className="eyebrow">
              <span className="eyebrow-index">02</span>
              <span>The Fix</span>
            </p>
            <p className="mt-3 text-[15px] leading-relaxed text-foreground/85 md:text-base">
              {project.fix}
            </p>
          </div>
        </div>

        <VideoEmbed src={video} className="mt-10" />

        <dl className="mt-10 flex flex-wrap gap-x-12 gap-y-5 border-t border-border pt-7">
          <div>
            <dt className="text-[10px] font-medium uppercase tracking-[0.16em] text-muted-foreground">
              Project type
            </dt>
            <dd className="mt-1.5 text-sm text-foreground/90">
              {project.category}
            </dd>
          </div>
          <div>
            <dt className="text-[10px] font-medium uppercase tracking-[0.16em] text-muted-foreground">
              Technology
            </dt>
            <dd className="mt-1.5 text-sm text-foreground/90">
              {project.tags.join(" · ")}
            </dd>
          </div>
          <div>
            <dt className="text-[10px] font-medium uppercase tracking-[0.16em] text-muted-foreground">
              My role
            </dt>
            <dd className="mt-1.5 text-sm text-foreground/90">
              {project.role}
            </dd>
          </div>
        </dl>

        {service && (
          <p className="mt-8 text-sm text-muted-foreground">
            Part of my{" "}
            <Link
              href={`/services/${service.slug}`}
              className="font-medium text-foreground underline decoration-primary/50 underline-offset-4 transition-colors hover:text-primary"
            >
              {service.name} services
            </Link>
            .
          </p>
        )}

        {project.link && (
          <div className="mt-8 flex items-center gap-3">
            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-secondary px-5 py-2.5 text-sm"
            >
              Live project
              <ArrowUpRight size={14} aria-hidden />
            </a>
          </div>
        )}

        {/* Prev / next project */}
        <nav
          aria-label="More projects"
          className="mt-16 grid gap-4 border-t border-border pt-10 sm:grid-cols-2"
        >
          <Link
            href={`/work/${projectSlug(prev.title)}`}
            className="group rounded-xl border border-border bg-surface p-5 transition-colors hover:border-primary/40"
          >
            <span className="text-[10px] font-medium uppercase tracking-[0.16em] text-muted-foreground">
              Previous project
            </span>
            <span className="mt-2 flex items-center gap-2 text-[15px] font-semibold text-foreground transition-colors group-hover:text-primary">
              <ArrowLeft size={15} aria-hidden />
              {prev.title}
            </span>
          </Link>
          <Link
            href={`/work/${projectSlug(next.title)}`}
            className="group rounded-xl border border-border bg-surface p-5 text-right transition-colors hover:border-primary/40 sm:col-start-2"
          >
            <span className="text-[10px] font-medium uppercase tracking-[0.16em] text-muted-foreground">
              Next project
            </span>
            <span className="mt-2 flex items-center justify-end gap-2 text-[15px] font-semibold text-foreground transition-colors group-hover:text-primary">
              {next.title}
              <ArrowRight size={15} aria-hidden />
            </span>
          </Link>
        </nav>

        <div className="mt-16 border-t border-border pt-12">
          <h2 className="max-w-2xl text-3xl font-semibold tracking-[-0.02em] text-foreground md:text-4xl">
            Have something similar in mind?
          </h2>
          <p className="mt-4 max-w-xl text-[15px] leading-relaxed text-muted-foreground md:text-base">
            Tell me what you’re building, or book a short discovery call —
            either way you’ll get a reply within 24 hours.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Link href="/#contact" className="btn btn-primary">
              Start a Project
              <ArrowRight size={16} aria-hidden />
            </Link>
            <BookCallButton />
          </div>
        </div>
      </Container>
    </section>
  );
}