import type { Metadata } from "next";
import { Container } from "@/components/Container";
import { Work } from "@/components/sections/Work";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Selected Work",
  description:
    "A curated selection of websites, web applications, cross-platform mobile apps and SaaS products designed and built by Ashish Pathak — a freelance AI & full-stack engineer.",
  alternates: {
    canonical: `${site.domain}/work`,
  },
  openGraph: {
    type: "website",
    url: `${site.domain}/work`,
    siteName: site.name,
    title: `Selected Work | ${site.name}`,
    description:
      "Websites, web applications, cross-platform mobile apps and SaaS products designed and built by Ashish Pathak.",
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
    title: `Selected Work | ${site.name}`,
    description:
      "Websites, web applications, cross-platform mobile apps and SaaS products designed and built by Ashish Pathak.",
    creator: "@ashish_dev404",
    images: ["/opengraph-image"],
  },
};

export default function WorkPage() {
  return (
    <>
      <section className="border-b border-border/70 pb-10 pt-28 md:pt-36">
        <Container>
          <p className="eyebrow">
            <span className="eyebrow-index">Work</span>
            <span>Selected projects</span>
          </p>
          <h1 className="mt-5 max-w-3xl text-balance text-4xl font-semibold leading-[1.12] tracking-[-0.02em] text-foreground md:text-5xl md:leading-[1.08]">
            Websites, web apps &amp;{" "}
            <span className="font-display font-normal italic">
              mobile products
            </span>{" "}
            I’ve designed and built.
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg">
            A curated selection of projects by Ashish Pathak, freelance AI
            &amp; full-stack engineer — each with a full case study covering the
            problem, the fix and the technology.
          </p>
        </Container>
      </section>
      <Work />
    </>
  );
}