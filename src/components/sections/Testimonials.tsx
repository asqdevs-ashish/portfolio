import { Container } from "@/components/Container";
import { Reveal } from "@/components/Reveal";
import { SectionIntro } from "@/components/SectionIntro";
import { testimonials } from "@/lib/testimonials";

/**
 * Renders nothing until real client quotes are added to src/lib/testimonials.ts
 * — the section never shows empty placeholders.
 */
export function Testimonials() {
  if (testimonials.length === 0) return null;

  return (
    <section className="border-t border-border/70 py-20 md:py-24">
      <Container>
        <Reveal>
          <SectionIntro
            label="Kind Words"
            title={
              <>
                What clients say after{" "}
                <span className="font-display font-normal italic">
                  the launch.
                </span>
              </>
            }
            intro="A few honest notes from people I’ve worked with directly."
          />
        </Reveal>

        <Reveal delay={100}>
          <div className="mt-10 grid gap-x-10 gap-y-10 md:grid-cols-2 lg:grid-cols-3">
            {testimonials.map((t) => (
              <figure key={t.name} className="border-t border-border pt-6">
                <blockquote>
                  <p className="text-lg leading-relaxed text-foreground/90">
                    “{t.quote}”
                  </p>
                </blockquote>
                <figcaption className="mt-5">
                  <p className="text-sm font-semibold text-foreground">
                    {t.name}
                  </p>
                  <p className="mt-0.5 text-xs text-muted-foreground">
                    {t.context}
                  </p>
                </figcaption>
              </figure>
            ))}
          </div>
        </Reveal>
      </Container>
    </section>
  );
}