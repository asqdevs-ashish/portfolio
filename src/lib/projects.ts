export type ProjectCategory = "Web App" | "Mobile App" | "SaaS" | "AI Product";

export function projectSlug(title: string) {
  return title
    .toLowerCase()
    .replace(/²/g, "2")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

export type Project = {
  title: string;
  subtitle: string;
  category: ProjectCategory;
  description: string;
  tags: string[];
  image: string;
  link?: string;
  mockup?: boolean;
  device?: boolean;
  problem: string;
  fix: string;
  role: string;
};

export const projects: Project[] = [
  {
    title: "Harmony Drift",
    subtitle: "High-Performance Music Streaming App",
    category: "Mobile App",
    description:
      "A sleek cross-platform music streaming app featuring background playback, resilient queue persistence, and sub-second screen load speeds.",
    tags: [
      "React Native",
      "Expo",
      "Firebase",
      "Node.js",
      "PostgreSQL",
      "Neon DB",
    ],
    image: "/projects/harmony.png",
    link: "https://harmony-web-hope.vercel.app",
    problem:
      "Standard mobile music apps often suffer from choppy playback state loss during app crashes, slow cold-start screen loads, and bloated auth workflows.",
    fix: "Engineered a resilient mobile app using React Native & Expo, integrating native Firebase Google Auth, audio state persistence for crash recovery, skeleton UI optimization, and a serverless Neon PostgreSQL backend.",
    role: "Mobile Architecture, Full-Stack Development & UI/UX Design",
  },
  {
    title: "Namashkar",
    subtitle: "Random Video Matching & Social Discovery Platform",
    category: "Web App",
    description:
      "An Omegle-meets-Google-Meet web application enabling instant 1-on-1 random video matching, screen sharing, voice messaging, and persistent social networking.",
    tags: ["Next.js", "WebRTC", "Socket.io", "Node.js", "Tailwind CSS"],
    image: "/projects/namashkar.png",
    link: "https://namashkar-call.vercel.app/",
    problem:
      "Standard video platforms require pre-scheduled meeting links, while anonymous video chat apps lack persistent social features like friend requests, voice notes, and screen sharing.",
    fix: "Engineered a low-latency WebRTC platform combining sub-second peer-to-peer random matchmaking with full screen sharing, real-time socket signaling, instant friend requests, and voice messaging in a unified UI.",
    role: "Full-Stack WebRTC Architecture, Real-Time Systems & UI/UX Design",
  },
  {
    title: "A² Properties",
    subtitle: "Real estate discovery platform",
    category: "Web App",
    description:
      "A property discovery and inquiry platform built for a calmer browsing experience, with site-visit bookings and lead capture.",
    tags: ["Next.js", "Node.js", "PostgreSQL", "Tailwind CSS"],
    image: "/projects/a2-properties.png",
    link: "https://a2-real-estate.vercel.app",
    problem:
      "Users had difficulty finding relevant properties quickly, and the existing experience made inquiries unnecessarily complicated.",
    fix: "I built a responsive property discovery and inquiry experience with clearer navigation, structured listings and a streamlined contact and site-visit flow.",
    role: "Product design & full-stack engineering",
  },
  {
    title: "India Tours",
    subtitle: "Travel booking platform",
    category: "Web App",
    description:
      "A travel booking platform with curated packages, custom itineraries and multi-city trip planning.",
    tags: ["Next.js", "Node.js", "UI/UX", "Tailwind CSS"],
    image: "/projects/india-tours.png",
    link: "https://tour-agency-akash.vercel.app",
    problem:
      "Planning a multi-city trip across India meant piecing together tours from scattered pages and endless back-and-forth messages.",
    fix: "I built a travel booking platform with curated tour packages, a custom itinerary builder and multi-city planning — so a whole trip is designed in one place.",
    role: "Product design & full-stack engineering",
  },
  {
    title: "Chain Arrow Lock",
    subtitle: "Mobile puzzle game",
    category: "Mobile App",
    description:
      "A logic-based puzzle game with multi-directional arrow mechanics, level progression and daily challenges — built with React Native.",
    tags: ["React Native", "Game logic", "Mobile UI"],
    image: "/projects/chain-arrow-lock.jpeg",
    device: true,
    problem:
      "Simple puzzle games lose players fast — levels repeat, and there’s little reason to come back the next day.",
    fix: "I built a logic puzzle game in React Native with multi-directional arrow mechanics, steady level progression and daily challenges that give players a reason to return.",
    role: "Game design & mobile development",
  },
  {
    title: "My Bunny",
    subtitle: "Partner companion app",
    category: "Mobile App",
    description:
      "A private companion app with real-time partner sync, daily love notes, habit reminders and mood check-ins.",
    tags: ["React Native", "Node.js", "WebSockets", "MongoDB"],
    image: "/projects/my-bunny.jpeg",
    mockup: true,
    problem:
      "Thoughtful couples were scattered across separate apps for notes, reminders and check-ins — nothing kept the two of them in sync.",
    fix: "I built a private companion app with real-time partner sync, daily love notes, habit reminders and mood check-ins — one shared space for two people.",
    role: "Product concept, design & full-stack development",
  },
];
