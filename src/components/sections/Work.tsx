"use client";

import { Fragment, useEffect, useRef, useState } from "react";
import { ArrowRight, ArrowUpRight, ChevronDown } from "lucide-react";
import { Container } from "@/components/Container";
import { Reveal } from "@/components/Reveal";
import { SectionIntro } from "@/components/SectionIntro";
import { ProjectImage } from "@/components/ProjectImage";
import { VideoEmbed } from "@/components/VideoEmbed";
import { projects, projectSlug, type Project } from "@/lib/projects";
import { media } from "@/lib/media";
import { whatsappUrl } from "@/lib/site";
import { trackCta } from "@/lib/track";

function caseId(project: Project) {
  return "case-" + projectSlug(project.title);
}

function projectNumber(project: Project) {
  return String(projects.indexOf(project) + 1).padStart(2, "0");
}

/* ----------------------------- toggle & region ----------------------------- */

function CaseStudyToggle({
  open,
  panelId,
  buttonId,
  onToggle,
}: {
  open: boolean;
  panelId: string;
  buttonId: string;
  onToggle: () => void;
}) {
  return (
    <button
      id={buttonId}
      type="button"
      aria-expanded={open}
      aria-controls={panelId}
      onClick={onToggle}
      className="inline-flex items-center gap-2 text-sm font-medium text-foreground/90 transition-colors hover:text-primary"
    >
      {open ? "Hide Case Study" : "View Case Study"}
      <ChevronDown
        size={15}
        aria-hidden
        className={`transition-transform duration-300 ${open ? "rotate-180" : ""}`}
      />
    </button>
  );
}

/**
 * Full-width editorial case study. Always mounted (smooth collapse + content
 * stays crawlable); spans the whole container because it lives outside the
 * card grid — never inside a grid cell.
 */
function CaseStudyRegion({
  project,
  number,
  open,
  className = "",
}: {
  project: Project;
  number: string;
  open: boolean;
  className?: string;
}) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const id = caseId(project);
  const toggleId = `${id}-toggle`;
  const video = media.projectVideos[project.title];

  useEffect(() => {
    if (open) wrapRef.current?.scrollIntoView({ block: "nearest" });
  }, [open]);

  return (
    <div
      ref={wrapRef}
      id={id}
      role="region"
      aria-hidden={!open}
      aria-labelledby={toggleId}
      inert={!open}
      className={`grid transition-all duration-500 ease-out ${className} ${
        open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
      }`}
    >
      <div className="min-h-0 overflow-hidden">
        <div className="border-t border-border pt-5 md:pt-6">
          <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2">
            <p className="eyebrow">
              <span className="eyebrow-index">{number}</span>
              <span>Case Study — {project.title}</span>
            </p>
            <a
              href={`/work/${projectSlug(project.title)}`}
              className="inline-flex items-center gap-1 text-xs text-muted-foreground underline decoration-primary/40 underline-offset-4 transition-colors hover:text-primary"
            >
              Full case study
              <ArrowUpRight size={12} aria-hidden />
            </a>
          </div>

          <div className="mt-6 grid gap-7 md:grid-cols-2 md:gap-12">
            <div>
              <p className="eyebrow">
                <span className="eyebrow-index">01</span>
                <span>The Problem</span>
              </p>
              <p className="mt-2.5 text-[15px] leading-relaxed text-foreground/85">
                {project.problem}
              </p>
            </div>
            <div>
              <p className="eyebrow">
                <span className="eyebrow-index">02</span>
                <span>The Fix</span>
              </p>
              <p className="mt-2.5 text-[15px] leading-relaxed text-foreground/85">
                {project.fix}
              </p>
            </div>
          </div>

          <VideoEmbed src={video} className="mt-6" />

          <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-3 border-t border-border pt-4">
            <p className="text-xs text-muted-foreground">
              Built with{" "}
              <span className="text-foreground/85">
                {project.tags.join(" · ")}
              </span>
            </p>
            <div className="ml-auto flex flex-wrap items-center gap-x-5 gap-y-3">
              {project.link && (
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-sm text-foreground/90 transition-colors hover:text-primary"
                >
                  Live Project
                  <ArrowUpRight size={14} aria-hidden />
                </a>
              )}
              <a
                href={whatsappUrl(
                  `Hi Ashish, I'm interested in building something similar to ${project.title}. Can we talk?`,
                )}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackCta("similar_project")}
                className="inline-flex items-center gap-1.5 text-sm text-foreground/90 transition-colors hover:text-primary"
              >
                Have a similar project?
                <ArrowRight size={14} aria-hidden />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------ project card ------------------------------ */

function ProjectCard({
  project,
  number,
  open,
  onToggle,
  wide = false,
}: {
  project: Project;
  number: string;
  open: boolean;
  onToggle: () => void;
  /** Full-width split layout for a lone project in a row. */
  wide?: boolean;
}) {
  const id = caseId(project);
  const toggleId = `${id}-toggle`;

  const meta = (
    <>
      <div className="flex items-baseline justify-between gap-4">
        <h3 className="text-lg font-semibold tracking-tight text-foreground transition-colors group-hover:text-primary">
          <span className="mr-2.5 align-baseline font-mono text-[11px] font-normal tracking-wide text-primary">
            {number}
          </span>
          {project.title}
        </h3>
        {project.link && !wide && (
          <a
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Visit ${project.title} live site`}
            className="inline-flex shrink-0 items-center gap-1 text-xs font-medium text-muted-foreground transition-colors hover:text-primary"
          >
            Live
            <ArrowUpRight size={13} aria-hidden />
          </a>
        )}
      </div>

      <p className="mt-1 text-xs text-muted-foreground">{project.subtitle}</p>
      <p className="mt-2.5 max-w-md text-sm leading-relaxed text-muted-foreground">
        {project.description}
      </p>
      <p className="mt-2.5 text-xs text-muted-foreground">
        {project.tags.join(" · ")}
      </p>

      <div className="mt-4">
        <CaseStudyToggle
          open={open}
          panelId={id}
          buttonId={toggleId}
          onToggle={onToggle}
        />
      </div>
    </>
  );

  if (wide) {
    return (
      <article className="group grid items-center gap-6 md:grid-cols-2 lg:gap-12">
        <ProjectImage project={project} />
        <div className="flex flex-col">{meta}</div>
      </article>
    );
  }

  return (
    <article className="group">
      <ProjectImage project={project} />
      <div className="mt-4 flex flex-col">{meta}</div>
    </article>
  );
}

/* --------------------- row chunk with case study region -------------------- */

/**
 * One row of supporting projects. On desktop the two cards share row 1 and
 * each case study is a full-width region on its own row directly below —
 * never a half-width cell, never a blank column. On mobile the DOM order
 * (card → region → card → region) places each case study right under its own
 * card.
 */
function ProjectRow({
  row,
  openKey,
  onToggle,
}: {
  row: Project[];
  openKey: string | null;
  onToggle: (key: string) => void;
}) {
  const wide = row.length === 1;

  return (
    <div className="grid items-start gap-x-8 md:grid-cols-2 lg:gap-x-10">
      {row.map((project, i) => {
        const id = caseId(project);
        return (
          <Fragment key={project.title}>
            <div
              className={`mb-8 md:mb-0 ${
                wide ? "md:col-span-2 md:row-start-1" : ""
              } ${!wide && i === 0 ? "md:col-start-1 md:row-start-1" : ""} ${
                !wide && i === 1 ? "md:col-start-2 md:row-start-1" : ""
              }`}
            >
              <ProjectCard
                project={project}
                number={projectNumber(project)}
                open={openKey === id}
                onToggle={() => onToggle(id)}
                wide={wide}
              />
            </div>
            <CaseStudyRegion
              project={project}
              number={projectNumber(project)}
              open={openKey === id}
              className={`md:col-span-2 ${
                wide || i === 0 ? "md:row-start-2" : "md:row-start-3"
              } ${openKey === id ? "mt-5 md:mt-7" : ""}`}
            />
          </Fragment>
        );
      })}
    </div>
  );
}

/* --------------------------------- section --------------------------------- */

export function Work() {
  const [openKey, setOpenKey] = useState<string | null>(null);
  const toggle = (key: string) => setOpenKey((k) => (k === key ? null : key));

  const [featured, ...rest] = projects;
  const featuredId = caseId(featured);
  const featuredOpen = openKey === featuredId;
  const featuredToggleId = `${featuredId}-toggle`;

  // Balanced order (rest = projects minus the featured one): the two web
  // apps pair up, the two mobile apps pair up (same phone-frame height), and
  // the remaining web project closes the section as a full-width split card
  // — no row ever leaves a blank half.
  const rows: Project[][] = [
    [rest[0], rest[1]],
    [rest[3], rest[4]],
    [rest[2]],
  ];

  return (
    <section id="work" className="scroll-mt-24 border-t border-border/70 py-20 md:py-24">
      <Container>
        <Reveal>
          <SectionIntro
            index="01"
            label="Selected Work"
            title={
              <>
                Work that went{" "}
                <span className="font-display font-normal italic">
                  from idea to launch.
                </span>
              </>
            }
            intro="A curated selection of websites, web applications and mobile products I've designed and built — the products themselves are the proof."
          />
        </Reveal>

        {/* Featured project — full-width product showcase */}
        <Reveal delay={80}>
          <article className="mt-8 md:mt-10">
            <div className="group">
              <ProjectImage project={featured} priority sizes="(max-width: 640px) 100vw, 1100px" />
            </div>
            <div className="mt-4 flex flex-col gap-6 md:flex-row md:items-end md:justify-between md:gap-10">
              <div className="max-w-2xl">
                <p className="eyebrow">
                  <span className="eyebrow-index">01</span>
                  <span>Featured project</span>
                </p>
                <h3 className="mt-2 text-2xl font-semibold tracking-tight text-foreground md:text-3xl">
                  {featured.title}
                </h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  {featured.subtitle} · {featured.category}
                </p>
                <p className="mt-3 text-[15px] leading-relaxed text-foreground/85">
                  {featured.description}
                </p>
                <p className="mt-3 text-xs text-muted-foreground">
                  {featured.tags.join(" · ")}
                </p>
              </div>
              <div className="flex shrink-0 flex-wrap items-center gap-x-6 gap-y-3">
                <CaseStudyToggle
                  open={featuredOpen}
                  panelId={featuredId}
                  buttonId={featuredToggleId}
                  onToggle={() => toggle(featuredId)}
                />
                {featured.link && (
                  <a
                    href={featured.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-primary"
                  >
                    Live Project
                    <ArrowUpRight size={14} aria-hidden />
                  </a>
                )}
              </div>
            </div>
          </article>

          <CaseStudyRegion
            project={featured}
            number="01"
            open={featuredOpen}
            className={featuredOpen ? "mt-6 md:mt-8" : ""}
          />
        </Reveal>

        {/* Supporting projects — paired rows + full-width case studies */}
        <Reveal delay={120}>
          <div className="border-t border-border/70 pt-6 lg:pt-8">
            {rows.map((row, i) => (
              <div key={i} className={i > 0 ? "mt-7 lg:mt-9" : ""}>
                <ProjectRow row={row} openKey={openKey} onToggle={toggle} />
              </div>
            ))}
          </div>
        </Reveal>
      </Container>
    </section>
  );
}