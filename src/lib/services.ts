/**
 * Service pages live at /services/[slug]. Each page is built from this data so
 * the content stays honest and maintainable: real projects, real technologies
 * and real FAQ answers — nothing invented.
 */

export const processSteps = [
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

export type Service = {
  slug: string;
  name: string;
  tagline: string;
  metaTitle: string;
  metaDescription: string;
  intro: string[];
  builds: { title: string; body: string }[];
  audience: string[];
  tech: string[];
  /** Titles of real projects relevant to this service (from src/lib/projects.ts). */
  projectTitles: string[];
  faqs: { q: string; a: string }[];
  related: string[];
};

export const services: Service[] = [
  {
    slug: "web-development",
    name: "Web Development",
    tagline:
      "Modern websites and web applications built around real product and business goals.",
    metaTitle: "Web Development — Freelance Next.js Web Developer",
    metaDescription:
      "Freelance web developer building modern websites and web applications with Next.js, React and Node.js for startups, SaaS companies and growing businesses.",
    intro: [
      "I’m Ashish Pathak, a freelance web developer. I build marketing sites, web applications and SaaS products with Next.js, React and Node.js — working directly with startups, SaaS companies and growing businesses from the first conversation to deployment.",
      "The goal is a website or application that’s fast, easy to use and built around what your product actually needs — not a template that looks like everything else.",
    ],
    builds: [
      {
        title: "Marketing sites & landing pages",
        body: "Clean, fast websites that explain what you do and turn visitors into enquiries.",
      },
      {
        title: "Web applications",
        body: "Dashboards, portals and custom tools with authentication, databases and APIs under the hood.",
      },
      {
        title: "SaaS platforms",
        body: "MVPs and production-ready platforms — frontend, backend and deployment handled end to end.",
      },
    ],
    audience: [
      "Startup founders validating an idea and needing a first web product.",
      "SaaS companies shipping or improving a dashboard or customer-facing app.",
      "Growing businesses replacing an outdated website with something that actually converts.",
    ],
    tech: ["Next.js", "React", "TypeScript", "Node.js", "PostgreSQL", "MongoDB", "AWS"],
    projectTitles: ["A² Properties", "India Tours", "A² Academy", "A² Trade"],
    faqs: [
      {
        q: "Can you handle both frontend and backend?",
        a: "Yes — that’s the full-stack part. Frontend with React and Next.js, backend with Node.js and APIs, databases like PostgreSQL and MongoDB, and deployment on AWS or Vercel.",
      },
      {
        q: "Can you work with an existing application or codebase?",
        a: "Yes. I can step into a codebase, understand the architecture and ship features, fixes or improvements without disrupting what’s already working.",
      },
      {
        q: "How do we get started?",
        a: "Send a message through the contact form, book a short discovery call or reach out on WhatsApp. Tell me what you’re building, your timeline and your budget — I’ll reply within 24 hours.",
      },
    ],
    related: ["mobile-app-development", "saas-development", "ai-integration"],
  },
  {
    slug: "mobile-app-development",
    name: "Mobile App Development",
    tagline:
      "iOS and Android apps built with React Native from a single shared codebase.",
    metaTitle: "React Native Mobile App Development",
    metaDescription:
      "Freelance React Native developer building cross-platform iOS and Android apps from a single codebase — for startups, SaaS companies and growing businesses.",
    intro: [
      "When a product needs to live on a phone, I build cross-platform mobile apps with React Native. One codebase, one team, one person — and the result runs on both iOS and Android.",
      "I can build a mobile app from scratch, or take a product you already have on the web and bring it to mobile — sharing the same backend and APIs where it makes sense.",
    ],
    builds: [
      {
        title: "Cross-platform iOS & Android apps",
        body: "Native-feeling mobile apps built with React Native from a single shared codebase.",
      },
      {
        title: "Mobile versions of web products",
        body: "The same product, built for the phone — with a shared backend and APIs instead of duplicated logic.",
      },
      {
        title: "Real-time mobile features",
        body: "Live sync, chat and real-time data in mobile apps using WebSockets and a Node.js backend.",
      },
    ],
    audience: [
      "Founders with a web product who want an iOS and Android app for the same product.",
      "Teams building a mobile-first product who want to move fast with one codebase.",
      "Businesses that need an app without maintaining two separate native teams.",
    ],
    tech: ["React Native", "TypeScript", "Node.js", "WebSockets", "MongoDB"],
    projectTitles: ["Chain Arrow Lock", "My Bunny"],
    faqs: [
      {
        q: "Can you build mobile apps as well as websites?",
        a: "Yes. I build cross-platform iOS and Android applications using React Native from a single codebase, so one build serves both platforms.",
      },
      {
        q: "Can the same backend support both web and mobile?",
        a: "Yes. Where it makes sense, I structure the backend and APIs so web and mobile products share the same core services — no duplicated logic or data.",
      },
      {
        q: "Can you work with an existing React Native app?",
        a: "Yes. I can step into an existing codebase, understand the architecture and ship features, fixes or improvements without disrupting what’s already working.",
      },
    ],
    related: ["web-development", "saas-development", "ai-integration"],
  },
  {
    slug: "saas-development",
    name: "SaaS Development",
    tagline: "MVPs and production-ready SaaS products — from frontend to backend.",
    metaTitle: "SaaS Development & MVPs",
    metaDescription:
      "Freelance SaaS developer building MVPs and production-ready SaaS products end to end — Next.js, React, Node.js, PostgreSQL and deployment included.",
    intro: [
      "I build SaaS products end to end: accounts and dashboards, real-time data, the APIs behind them, and deployment. For a first version I focus on the smallest useful scope, then iterate as real users give real feedback.",
      "Because one person handles the frontend, backend and infrastructure, there’s no coordination overhead between teams — just a product that ships.",
    ],
    builds: [
      {
        title: "SaaS MVPs",
        body: "A focused first version built around the core workflow — not a kitchen sink.",
      },
      {
        title: "Dashboards & customer-facing apps",
        body: "Clean interfaces for complex data, built with React and Next.js.",
      },
      {
        title: "Real-time product features",
        body: "Live data over WebSockets — market data, notifications, collaborative state.",
      },
    ],
    audience: [
      "Founders with a validated idea who need a working MVP to show users and investors.",
      "Early-stage products iterating quickly and shipping new features regularly.",
      "Teams who want one accountable engineer across the whole product stack.",
    ],
    tech: ["Next.js", "React", "TypeScript", "Node.js", "PostgreSQL", "MongoDB", "AWS"],
    projectTitles: ["A² Trade", "A² Properties"],
    faqs: [
      {
        q: "What kind of projects do you take on?",
        a: "Websites, web applications, cross-platform mobile apps, SaaS products and AI-integrated tools — marketing sites, dashboards, portals, MVPs and production-ready products.",
      },
      {
        q: "Can you handle both frontend and backend?",
        a: "Yes — that’s the full-stack part. Frontend with React and Next.js, backend with Node.js and APIs, databases like PostgreSQL and MongoDB, and deployment on AWS or Vercel.",
      },
      {
        q: "How do we get started?",
        a: "Send a message through the contact form, book a short discovery call or reach out on WhatsApp. Tell me what you’re building, your timeline and your budget — I’ll reply within 24 hours.",
      },
    ],
    related: ["web-development", "mobile-app-development", "ai-integration"],
  },
  {
    slug: "ai-integration",
    name: "AI Integration",
    tagline:
      "Practical AI features built into websites, web apps and mobile products.",
    metaTitle: "AI Integration for Web & Mobile Apps",
    metaDescription:
      "Freelance engineer adding practical AI features — LLM-powered tools, smart search and automation — to websites, web applications and mobile apps.",
    intro: [
      "I add AI where it changes the product for the better: LLM-powered tools, smart search and automation, inside websites, web apps and mobile apps.",
      "The measure is always the same — does the feature make the product more useful for the people using it? If AI doesn’t add real value to your product, I’ll tell you that too.",
    ],
    builds: [
      {
        title: "LLM-powered features",
        body: "Chat assistants, content generation and document tools built on modern LLM APIs.",
      },
      {
        title: "Smart search & automation",
        body: "Better search, classification and workflow automation inside existing products.",
      },
      {
        title: "AI in mobile apps",
        body: "The same AI features working inside React Native apps, powered by shared backend services.",
      },
    ],
    audience: [
      "Teams with an existing product who want to add AI without rebuilding it.",
      "Founders building AI-assisted tools as part of a broader web or mobile product.",
      "Businesses exploring where AI genuinely helps — before committing to a big build.",
    ],
    tech: ["Next.js", "React Native", "Node.js", "LLM APIs", "TypeScript"],
    projectTitles: [],
    faqs: [
      {
        q: "Can you integrate AI features into a product?",
        a: "Yes. I add practical AI capabilities — LLM-powered tools, smart search and automation — across websites, web apps and mobile products, when they make sense for the product and its users.",
      },
      {
        q: "What kind of projects do you take on?",
        a: "Websites, web applications, cross-platform mobile apps, SaaS products and AI-integrated tools — marketing sites, dashboards, portals, MVPs and production-ready products.",
      },
      {
        q: "How do we get started?",
        a: "Send a message through the contact form, book a short discovery call or reach out on WhatsApp. Tell me what you’re building, your timeline and your budget — I’ll reply within 24 hours.",
      },
    ],
    related: ["web-development", "mobile-app-development", "saas-development"],
  },
];

export function getService(slug: string) {
  return services.find((s) => s.slug === slug);
}