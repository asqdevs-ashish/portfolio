import { Container } from "@/components/Container";
import { Reveal } from "@/components/Reveal";
import { SectionIntro } from "@/components/SectionIntro";

const reasons = [
  {
    title: "Direct communication",
    body: "You work directly with me — no account managers, no handoffs and no context lost between people.",
  },
  {
    title: "Full-stack ownership",
    body: "Web, mobile, backend, database and deployment. One person accountable for the whole product, start to finish.",
  },
  {
    title: "Product thinking",
    body: "I care about how the product behaves for the people using it — not just whether the code runs.",
  },
  {
    title: "Web + Mobile capability",
    body: "Built a website and now need an app? The same engineer who built the web product can take it to iOS and Android with React Native.",
  },
  {
    title: "A clear, calm process",
    body: "Straightforward scope, honest timelines and focused iterations. You always know where things stand.",
  },
];

export function WhyWorkWithMe() {
  return (
    <section className="border-y border-border/70 py-20 md:py-24">
      <Container className="grid gap-14 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-5">
          <Reveal>
            <SectionIntro
            index="04"
            label="Why Work With Me"
              title={
                <>
                  One person, one{" "}
                  <span className="font-display font-normal italic">
                    point of contact.
                  </span>
                </>
              }
              intro="Hiring an independent engineer should feel simpler than hiring an agency — not riskier."
            />
          </Reveal>
        </div>

        <div className="lg:col-span-7">
          <ul>
            {reasons.map((reason, i) => (
              <Reveal key={reason.title} delay={i * 70}>
                <li className="group border-t border-border py-7 last:border-b last:pb-0 md:py-8">
                  <div className="grid gap-3 sm:grid-cols-12 sm:gap-6">
                    <span className="font-mono text-xs text-primary sm:col-span-2 md:pt-1.5">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <div className="sm:col-span-10">
                      <h3 className="text-lg font-semibold tracking-tight text-foreground transition-colors duration-300 group-hover:text-primary md:text-xl">
                        {reason.title}
                      </h3>
                      <p className="mt-2 max-w-lg text-[15px] leading-relaxed text-muted-foreground">
                        {reason.body}
                      </p>
                    </div>
                  </div>
                </li>
              </Reveal>
            ))}
          </ul>
          <Reveal delay={120}>
            <p className="mt-6 border-l-2 border-primary/60 pl-4 text-[15px] italic leading-relaxed text-foreground/80">
              In short: you’ll always know who’s doing the work, and what
              happens next.
            </p>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
