import { ArrowUpRight } from "lucide-react";
import { Container } from "@/components/Container";
import { Reveal } from "@/components/Reveal";
import { SectionIntro } from "@/components/SectionIntro";
import { whatsappUrl } from "@/lib/site";

const services = [
  {
    slug: "web-development",
    title: "Websites",
    description:
      "Marketing sites, landing pages and business websites — clean, fast and built to turn visitors into enquiries.",
  },
  {
    slug: "web-development",
    title: "Web Applications",
    description:
      "Dashboards, portals and custom applications with authentication, databases and APIs under the hood.",
  },
  {
    slug: "mobile-app-development",
    title: "Cross-Platform Mobile Apps",
    description:
      "iOS and Android applications built with React Native from a single shared codebase.",
  },
  {
    slug: "saas-development",
    title: "SaaS & AI Products",
    description:
      "MVPs and production-ready SaaS platforms — plus practical AI features added where they create real value.",
  },
];

export function Services() {
  return (
    <section id="services" className="scroll-mt-24 py-20 md:py-24">
      <Container>
        <Reveal>
          <SectionIntro
            index="02"
            label="What I Build"
            title={
              <>
                Websites to web apps{" "}
                <span className="font-display font-normal italic">
                  to mobile apps.
                </span>
              </>
            }
            intro="Every project is scoped around what your product actually needs — web, mobile or both. The stack follows the problem, never the other way around."
          />
        </Reveal>

        <Reveal delay={100}>
          <ul className="mt-12 border-t border-border md:mt-14">
            {services.map((service, i) => (
              <li
                key={service.title}
                className="group grid gap-2 border-b border-border py-7 transition-colors duration-300 hover:border-primary/25 md:grid-cols-12 md:items-baseline md:gap-6 md:py-8"
              >
                <span className="font-mono text-xs text-primary md:col-span-1">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div className="md:col-span-4">
                  <h3 className="text-2xl font-semibold tracking-tight text-foreground transition-transform duration-300 group-hover:translate-x-1 md:text-[1.7rem]">
                    {service.title}
                  </h3>
                  <a
                    href={`/services/${service.slug}`}
                    className="mt-2 inline-flex items-center gap-1 text-xs text-muted-foreground underline decoration-primary/40 underline-offset-4 transition-colors hover:text-primary"
                  >
                    Service details
                    <ArrowUpRight size={12} aria-hidden />
                  </a>
                </div>
                <p className="mt-2 max-w-md text-[15px] leading-relaxed text-muted-foreground md:col-span-7 md:mt-0">
                  {service.description}
                </p>
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal delay={150}>
          <p className="mt-6 text-sm text-muted-foreground">
            Not sure which bucket your project fits?{" "}
            <a
              href={whatsappUrl("Hi Ashish, I have a project in mind and I'd like to talk it through with you.")}
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-foreground underline decoration-primary/60 underline-offset-4 transition-colors hover:text-primary"
            >
              Let’s talk it through
            </a>{" "}
            — it takes one message.
          </p>
        </Reveal>
      </Container>
    </section>
  );
}
