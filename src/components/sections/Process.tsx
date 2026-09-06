import { Container } from "@/components/Container";
import { Reveal } from "@/components/Reveal";
import { SectionIntro } from "@/components/SectionIntro";

const steps = [
  {
    title: "Understand",
    body: "We talk about what you’re building, who it’s for and what success looks like — on the web, on mobile, or both.",
  },
  {
    title: "Plan",
    body: "Product structure, user experience and technical approach are defined up front — across web, backend and mobile where the product needs it.",
  },
  {
    title: "Build",
    body: "Focused iterations with working progress you can see — whether that’s a web screen in the browser or an app build on device.",
  },
  {
    title: "Refine",
    body: "We review and test together — on web and on device — polishing the details that make a product feel finished.",
  },
  {
    title: "Launch",
    body: "Deployment, final checks and a clean handover. Live on the web, or ready for iOS and Android.",
  },
];

export function Process() {
  return (
    <section id="process" className="scroll-mt-24 border-t border-border/70 py-20 md:py-24">
      <Container className="grid gap-14 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-5">
          <Reveal>
            <SectionIntro
            index="06"
            label="How I Work"
              title={
                <>
                  A process designed{" "}
                  <span className="font-display font-normal italic">
                    to feel calm.
                  </span>
                </>
              }
              intro="No chaos, no guesswork. You always know what’s happening and what comes next."
            />
          </Reveal>
        </div>

        <div className="lg:col-span-7">
          <Reveal delay={80}>
            <ol className="relative ml-2 border-l border-border md:ml-3">
              {steps.map((step, i) => (
                <li key={step.title} className="relative pb-10 pl-8 last:pb-0 md:pl-12">
                  <span
                    aria-hidden
                    className="absolute -left-[5px] top-1.5 h-2 w-2 rounded-full bg-primary"
                  />
                  <div className="flex items-baseline gap-3">
                    <span className="font-mono text-xs text-primary">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <h3 className="text-xl font-semibold tracking-tight text-foreground md:text-[1.35rem]">
                      {step.title}
                    </h3>
                  </div>
                  <p className="mt-2.5 max-w-lg text-[15px] leading-relaxed text-muted-foreground">
                    {step.body}
                  </p>
                </li>
              ))}
            </ol>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
