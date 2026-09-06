import { ArrowRight } from "lucide-react";
import { Container } from "@/components/Container";
import { Reveal } from "@/components/Reveal";
import { BookCallButton } from "@/components/booking";
import { site } from "@/lib/site";

export function FinalCTA() {
  return (
    <section className="border-t border-border/70 py-20 md:py-24">
      <Container>
        <Reveal>
          <div className="mx-auto max-w-3xl text-center">
            <p className="eyebrow justify-center">
              <span className="eyebrow-index">Next step</span>
            </p>
            <h2 className="mt-5 text-balance text-4xl font-semibold leading-[1.1] tracking-[-0.02em] text-foreground sm:text-5xl">
              Have something{" "}
              <span className="font-display font-normal italic">
                worth building?
              </span>
            </h2>
            <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-muted-foreground md:text-lg">
              Whether you’re building a website, web app, SaaS product or
              mobile app — tell me what you’re working on. I’ll reply within 24
              hours.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <a href="#contact" className="btn btn-primary">
                Start a Project
                <ArrowRight size={16} aria-hidden />
              </a>
              <BookCallButton />
            </div>
            <p className="mt-5 text-sm text-muted-foreground">
              Prefer email?{" "}
              <a
                href={`mailto:${site.email}`}
                className="font-medium text-foreground underline decoration-primary/50 underline-offset-4 transition-colors hover:text-primary"
              >
                {site.email}
              </a>
            </p>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
