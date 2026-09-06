export const site = {
  name: "Ashish Kumar",
  role: "AI & Full-Stack Engineer",
  focus: "Web & Mobile Development",
  domain: "https://ashish-pathak.online/",
  email: "asqdevs.ashish@gmail.com",
  /** Displayed phone number (with country spacing). */
  phone: "+91 7404296309",
  /** Clickable phone link — no spaces allowed in tel: URLs. */
  phoneHref: "tel:+917404296309",
  /** International format used in wa.me links — digits only. */
  whatsappNumber: "917404296309",
  description:
    "Freelance AI & full-stack engineer building modern websites, web applications and cross-platform mobile apps with React Native for startups, SaaS companies and growing businesses.",
};

export const defaultProjectMessage =
  "Hi Ashish, I explored your portfolio and I would like to discuss a project with you.";

/**
 * Availability status shown as a small chip in the hero.
 * Update `label` whenever your schedule changes (or set `show: false`).
 */
export const availability = {
  show: true,
  label: "Available for new projects",
};

/** Ready-to-send message for collecting a testimonial after a project ships. */
export const testimonialRequestMessage =
  "Hi {client}! Thanks again for the project. If you have a moment, a 2–3 line note about working together would mean a lot — I'd love to share it (with your permission) on my portfolio: {reviewUrl}";

/**
 * Cal.com booking configuration.
 *
 * Paste your event link below, e.g.:
 *   calUrl: "https://cal.com/your-username/project-discovery-call"
 * The event should be named “Project Discovery Call”. Leave empty to show
 * the email/WhatsApp fallback in the booking modal.
 */
export const booking = {
  calUrl: "",
  eventName: "Project Discovery Call",
  description:
    "A short call to understand what you’re building, what you need, and whether I’m a good fit for the project.",
};

export function whatsappUrl(message: string = defaultProjectMessage): string {
  return `https://wa.me/${site.whatsappNumber}?text=${encodeURIComponent(message)}`;
}

export const socialLinks = [
  {
    label: "GitHub",
    href: "https://github.com/asqdevs-ashish",
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/ashish-pathak-968632400/",
  },
  {
    label: "X",
    href: "https://x.com/ashish_dev404",
  },
  {
    label: "YouTube",
    href: "https://www.youtube.com/channel/UCwbCbJ30Cvz5dLxZ6I9enHg",
  },
  {
    label: "Email",
    href: `mailto:${site.email}`,
  },
] as const;
