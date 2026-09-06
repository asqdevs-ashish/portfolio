import Link from "next/link";
import { ArrowRight, ArrowUpRight, ChevronRight } from "lucide-react";
import { Container } from "@/components/Container";
import { JsonLd } from "@/components/JsonLd";
import { BookCallButton } from "@/components/booking";
import { projects, projectSlug } from "@/lib/projects";
import { processSteps, services, type Service } from "@/lib/services";
import { site } from "@/lib/site";

/**
 * Shared layout for the /services/[slug] pages — a genuinely useful page per
 * service, built entirely from real data (projects, technologies, FAQ).
 */
export function ServicePage({ service }: { service: Service }) {
  const url = `${site.domain}services/${service.slug}`;
  const related = projects.filter((p) =>
    service.projectTitles.includes(p.title),
  );

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: site.domain },
      {
        "@type": "ListItem",
        position: 2,
        name: "Services",
        item: `${site.domain}#services`,
      },
      { "@type": "ListItem", position: 3, name: service.name, item: url },
    ],
  };

  const webpageJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: service.name,
    description: service.metaDescription,
    url,
    inLanguage: "en",
    author: {
      "@type": "Person",
      name: site.name,
      url: site.domain,
    },
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
              <Link
                href="/"
                className="transition-colors hover:text-primary"
              >
                Home
              </Link>
            </li>
            <li aria-hidden>
              <ChevronRight size={13} />
            </li>
            <li>
              <Link
                href="/#services"
                className="transition-colors hover:text-primary"
              >
                Services
              </Link>
            </li>
            <li aria-hidden>
              <ChevronRight size={13} />
            </li>
            <li aria-current="page" className="text-foreground/90">
              {service.name}
            </li>
          </ol>
        </nav>

        {/* Header */}
        <header className="mt-10 max-w-3xl">
          <p className="eyebrow">
            <span className="eyebrow-index">Services</span>
            <span>Freelance · Solo engineer</span>
          </p>
          <h1 className="mt-5 font-display text-4xl leading-tight text-foreground md:text-5xl">
            {service.name}
          </h1>
          <p className="mt-4 text-lg text-muted-foreground">
            {service.tagline}
          </p>
          <div className="mt-7 space-y-4 text-[15px] leading-relaxed text-foreground/85 md:text-base">
            {service.intro.map((paragraph) => (
              <p key={paragraph.slice(0, 40)}>{paragraph}</p>
            ))}
          </div>
        </header>

        {/* What I build */}
        <section className="mt-16">
          <h2 className="text-2xl font-semibold tracking-tight text-foreground md:text-3xl">
            What I build
          </h2>
          <ul className="mt-7 border-t border-border">
            {service.builds.map((item, i) => (
              <li
                key={item.title}
                className="grid gap-2 border-b border-border py-6 md:grid-cols-12 md:gap-6"
              >
                <span className="font-mono text-xs text-primary md:col-span-1">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="text-lg font-semibold tracking-tight text-foreground md:col-span-4">
                  {item.title}
                </h3>
                <p className="mt-1.5 max-w-md text-[15px] leading-relaxed text-muted-foreground md:col-span-7 md:mt-0">
                  {item.body}
                </p>
              </li>
            ))}
          </ul>
        </section>

        {/* Who it's for */}
        <section className="mt-14">
          <h2 className="text-2xl font-semibold tracking-tight text-foreground md:text-3xl">
            Who it’s for
          </h2>
          <ul className="mt-6 grid gap-3 md:grid-cols-3">
            {service.audience.map((item) => (
              <li
                key={item.slice(0, 40)}
                className="rounded-xl border border-border bg-surface p-5 text-sm leading-relaxed text-muted-foreground"
              >
                {item}
              </li>
            ))}
          </ul>
        </section>

        {/* Relevant real projects */}
        {related.length > 0 && (
          <section className="mt-14">
            <h2 className="text-2xl font-semibold tracking-tight text-foreground md:text-3xl">
              Recent {service.name.toLowerCase()} work
            </h2>
            <p className="mt-3 max-w-xl text-[15px] leading-relaxed text-muted-foreground">
              Real projects I’ve built — each with a full case study showing
              the problem and the fix.
            </p>
            <ul className="mt-7 grid gap-4 sm:grid-cols-2">
              {related.map((project) => (
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
        )}

        {/* Process */}
        <section className="mt-14">
          <h2 className="text-2xl font-semibold tracking-tight text-foreground md:text-3xl">
            How it works
          </h2>
          <ol className="mt-7 border-l border-border pl-6 md:pl-8">
            {processSteps.map((step, i) => (
              <li key={step.title} className="pb-7 last:pb-0">
                <div className="flex items-baseline gap-3">
                  <span className="font-mono text-xs text-primary">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="text-lg font-semibold tracking-tight text-foreground">
                    {step.title}
                  </h3>
                </div>
                <p className="mt-2 max-w-xl text-[15px] leading-relaxed text-muted-foreground">
                  {step.body}
                </p>
              </li>
            ))}
          </ol>
        </section>

        {/* Technologies */}
        <section className="mt-14">
          <h2 className="text-2xl font-semibold tracking-tight text-foreground md:text-3xl">
            Technologies I use for this
          </h2>
          <ul className="mt-6 flex flex-wrap gap-2">
            {service.tech.map((tech) => (
              <li key={tech} className="chip">
                {tech}
              </li>
            ))}
          </ul>
        </section>

        {/* FAQ */}
        <section className="mt-14">
          <h2 className="text-2xl font-semibold tracking-tight text-foreground md:text-3xl">
            Common questions
          </h2>
          <div className="mt-6 max-w-3xl border-t border-border">
            {service.faqs.map((faq, i) => (
              <details
                key={faq.q}
                className="group border-b border-border"
                open={i === 0}
              >
                <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-5 text-left text-[15px] font-medium text-foreground transition-colors hover:text-primary md:py-6 md:text-base [&::-webkit-details-marker]:hidden">
                  {faq.q}
                  <span
                    aria-hidden
                    className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-border-strong text-muted-foreground transition-all duration-300 group-open:rotate-45 group-open:border-primary/60 group-open:text-primary"
                  >
                    +
                  </span>
                </summary>
                <p className="max-w-2xl pb-6 pr-4 text-[15px] leading-relaxed text-muted-foreground md:pr-12">
                  {faq.a}
                </p>
              </details>
            ))}
          </div>
        </section>

        {/* Related services */}
        <section className="mt-14">
          <h2 className="text-2xl font-semibold tracking-tight text-foreground md:text-3xl">
            Related services
          </h2>
          <ul className="mt-6 flex flex-wrap gap-3">
            {service.related.map((slug) => {
              const relatedService = services.find((s) => s.slug === slug);
              if (!relatedService) return null;
              return (
                <li key={slug}>
                  <Link
                    href={`/services/${slug}`}
                    className="btn btn-secondary text-sm"
                  >
                    {relatedService.name}
                    <ArrowUpRight size={14} aria-hidden />
                  </Link>
                </li>
              );
            })}
          </ul>
        </section>

        {/* CTA */}
        <section className="mt-16 border-t border-border pt-12">
          <h2 className="max-w-2xl text-3xl font-semibold tracking-[-0.02em] text-foreground md:text-4xl">
            Need this built?
          </h2>
          <p className="mt-4 max-w-xl text-[15px] leading-relaxed text-muted-foreground md:text-base">
            Tell me what you’re working on, or book a short discovery call —
            either way you’ll get a reply within 24 hours.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Link href="/#contact" className="btn btn-primary">
              Start a Project
              <ArrowRight size={16} aria-hidden />
            </Link>
            <BookCallButton />
          </div>
        </section>
      </Container>
    </section>
  );
}