"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import { Container } from "@/components/Container";
import { Reveal } from "@/components/Reveal";
import { SectionIntro } from "@/components/SectionIntro";

const faqs = [
  {
    question: "What kind of projects do you take on?",
    answer:
      "Websites, web applications, cross-platform mobile apps, SaaS products and AI-integrated tools — marketing sites, dashboards, portals, MVPs and production-ready products. If it runs in a browser or on a phone, it’s probably in scope.",
  },
  {
    question: "Do I work directly with you?",
    answer:
      "Yes. You work directly with me from the first message to launch — no account managers and no handoffs. Planning, development and deployment are all handled by one person: me.",
  },
  {
    question: "Can you handle both frontend and backend?",
    answer:
      "Yes — that’s the full-stack part. Frontend with React and Next.js, mobile with React Native, backend with Node.js and APIs, databases like PostgreSQL and MongoDB, and deployment on AWS or Vercel.",
  },
  {
    question: "Can you build mobile apps as well as websites?",
    answer:
      "Yes. I build cross-platform iOS and Android applications using React Native from a single codebase, so one build serves both platforms.",
  },
  {
    question: "Can the same backend support both web and mobile?",
    answer:
      "Yes. Where it makes sense, I structure the backend and APIs so web and mobile products share the same core services — no duplicated logic or data.",
  },
  {
    question: "Can you work with an existing application or codebase?",
    answer:
      "Yes — including existing React Native apps. I can step into a codebase, understand the architecture and ship features, fixes or improvements without disrupting what’s already working.",
  },
  {
    question: "Can you integrate AI features into a product?",
    answer:
      "Yes. I add practical AI capabilities — LLM-powered tools, smart search and automation — across websites, web apps and mobile products, when they make sense for the product and its users.",
  },
  {
    question: "How do we get started?",
    answer:
      "Send a message through the form below or reach out on WhatsApp. Tell me what you’re building, your timeline and your budget. I’ll reply within 24 hours.",
  },
];

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="scroll-mt-24 border-t border-border/70 py-20 md:py-24">
      <Container>
        <Reveal>
          <SectionIntro
            index="07"
            label="FAQ"
            title={
              <>
                Before we{" "}
                <span className="font-display font-normal italic">start.</span>
              </>
            }
            intro="The practical questions people ask before getting in touch."
          />
        </Reveal>

        <div className="mt-12 max-w-3xl border-t border-border">
          {faqs.map((faq, i) => {
            const isOpen = openIndex === i;
            return (
              <Reveal key={faq.question} delay={i * 50}>
                <div className="border-b border-border">
                  <h3>
                    <button
                      type="button"
                      id={`faq-question-${i}`}
                      aria-expanded={isOpen}
                      aria-controls={`faq-answer-${i}`}
                      onClick={() => setOpenIndex(isOpen ? null : i)}
                      className="group flex w-full items-center justify-between gap-6 py-4 text-left md:py-5"
                    >
                      <span
                        className={`text-[15px] font-medium transition-colors duration-200 md:text-base ${
                          isOpen ? "text-primary" : "text-foreground group-hover:text-primary"
                        }`}
                      >
                        {faq.question}
                      </span>
                      <span
                        aria-hidden
                        className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full border transition-all duration-300 ${
                          isOpen
                            ? "rotate-45 border-primary/60 text-primary"
                            : "border-border-strong text-muted-foreground group-hover:border-primary/40"
                        }`}
                      >
                        <Plus size={15} />
                      </span>
                    </button>
                  </h3>
                  {/* Always in the DOM so the content stays crawlable;
                      CSS collapses it when closed. */}
                  <div
                    id={`faq-answer-${i}`}
                    role="region"
                    aria-labelledby={`faq-question-${i}`}
                    aria-hidden={!isOpen}
                    inert={!isOpen}
                    className={`grid transition-all duration-500 ease-out ${
                      isOpen
                        ? "grid-rows-[1fr] opacity-100"
                        : "grid-rows-[0fr] opacity-0"
                    }`}
                  >
                    <div className="min-h-0 overflow-hidden">
                      <p className="max-w-2xl pb-5 pr-4 text-[15px] leading-relaxed text-muted-foreground md:pr-12">
                        {faq.answer}
                      </p>
                    </div>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
