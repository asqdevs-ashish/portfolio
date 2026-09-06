import { Container } from "@/components/Container";
import { Reveal } from "@/components/Reveal";
import { SectionIntro } from "@/components/SectionIntro";

const layers = [
  {
    label: "Web",
    tech: "Next.js · React",
    note: "Sites, web apps & dashboards",
  },
  {
    label: "Mobile",
    tech: "React Native",
    note: "iOS & Android, one codebase",
  },
  {
    label: "Backend",
    tech: "Node.js · APIs · Databases",
    note: "One set of services for web & mobile",
  },
  {
    label: "AI",
    tech: "LLM-powered features",
    note: "Added where they create real value",
  },
];

/**
 * Communicates that a product can grow beyond the browser —
 * across mobile, backend and AI — without changing who builds it.
 */
export function WebMobile() {
  return (
    <section className="py-16 md:py-20">
      <Container>
        <Reveal>
          <SectionIntro
            index="03"
            label="Web + Mobile"
            title={
              <>
                Products don’t stop{" "}
                <span className="font-display font-normal italic">
                  at the browser.
                </span>
              </>
            }
            intro="When a product needs to live on a phone as well as the web, it doesn’t mean a new team — it means the same engineer, one codebase and a shared backend."
          />
        </Reveal>

        <Reveal delay={100}>
          <div className="mt-10 grid gap-y-12 sm:grid-cols-2 sm:gap-x-10 lg:mt-12 lg:grid-cols-4 lg:gap-0 lg:divide-x lg:divide-border">
            {layers.map((layer, i) => (
              <div key={layer.label} className="lg:pl-8 lg:first:pl-0">
                <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-primary">
                  {String(i + 1).padStart(2, "0")} · {layer.label}
                </p>
                <p className="mt-4 text-[15px] font-medium text-foreground">
                  {layer.tech}
                </p>
                <p className="mt-2 text-[13px] leading-relaxed text-muted-foreground">
                  {layer.note}
                </p>
              </div>
            ))}
          </div>
        </Reveal>

        <Reveal delay={150}>
          <p className="mt-8 max-w-2xl text-[15px] leading-relaxed text-muted-foreground">
            Need a web-only build right now? That’s fine too — every engagement
            starts with what the product actually needs today, and leaves room
            for what it needs next.
          </p>
        </Reveal>
      </Container>
    </section>
  );
}
