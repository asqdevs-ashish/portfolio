import type { Metadata } from "next";
import { Container } from "@/components/Container";
import { Contact } from "@/components/sections/Contact";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with Ashish Pathak, freelance AI & full-stack engineer. Tell me about your website, web app, SaaS product or mobile app — every enquiry gets a personal reply within 24 hours.",
  alternates: {
    canonical: `${site.domain}/contact`,
  },
  openGraph: {
    type: "website",
    url: `${site.domain}/contact`,
    siteName: site.name,
    title: `Contact | ${site.name}`,
    description:
      "Get in touch with Ashish Pathak, freelance AI & full-stack engineer, about your website, web app, SaaS product or mobile app.",
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
    title: `Contact | ${site.name}`,
    description:
      "Get in touch with Ashish Pathak, freelance AI & full-stack engineer.",
    creator: "@ashish_dev404",
    images: ["/opengraph-image"],
  },
};

export default function ContactPage() {
  return (
    <>
      <section className="border-b border-border/70 pb-10 pt-28 md:pt-36">
        <Container>
          <p className="eyebrow">
            <span className="eyebrow-index">Contact</span>
            <span>Start a conversation</span>
          </p>
          <h1 className="mt-5 max-w-3xl text-balance text-4xl font-semibold leading-[1.12] tracking-[-0.02em] text-foreground md:text-5xl md:leading-[1.08]">
            Let’s talk about{" "}
            <span className="font-display font-normal italic">
              your project.
            </span>
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg">
            A few honest sentences are enough — a website, a web app, a SaaS
            product or a mobile app. Every enquiry gets a personal reply from
            Ashish Pathak, usually within 24 hours.
          </p>
        </Container>
      </section>
      <Contact />
    </>
  );
}