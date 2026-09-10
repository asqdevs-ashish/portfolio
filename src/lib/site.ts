export const site = {
  name: "Ashish Pathak",
  role: "AI & Full-Stack Engineer",
  focus: "Web & Mobile Development",
  domain: "https://ashish-pathak.online",
  email: "asqdevs.ashish@gmail.com",

  phone: "+91 7404296309",
  phoneHref: "tel:+917404296309",
  whatsappNumber: "917404296309",

  description:
    "Ashish Pathak is a freelance AI & full-stack engineer building modern websites, web applications and cross-platform mobile apps for startups, SaaS companies and growing businesses.",
} as const;

export const defaultProjectMessage =
  "Hi Ashish, I explored your portfolio and I would like to discuss a project with you.";

export const availability = {
  show: true,
  label: "Available for new projects",
} as const;

export const testimonialRequestMessage =
  "Hi {client}! Thanks again for the project. If you have a moment, a 2–3 line note about working together would mean a lot — I’d love to share it (with your permission) on my portfolio: {reviewUrl}";

export const booking = {
  calUrl: "",
  eventName: "Project Discovery Call",
  description:
    "A short call to understand what you’re building, what you need, and whether I’m a good fit for the project.",
} as const;

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
