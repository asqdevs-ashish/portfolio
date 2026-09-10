# Ashish Pathak — Personal Portfolio

Personal portfolio for **Ashish Pathak, AI & Full-Stack Engineer**.
A single-page, editorial-style site built to feel calm, premium and
hand-crafted — converting visitors into project enquiries.

## Stack

- **Next.js 16** (App Router, static export-ready)
- **React 19**
- **TypeScript** (strict)
- **Tailwind CSS v4**
- **lucide-react** (UI icons) · **@vercel/analytics** (web vitals)

Fonts are self-hosted via `next/font/google`: **Inter** (sans) and
**Instrument Serif** (editorial italic accents).

## Commands

```bash
npm install      # install dependencies
npm run dev      # local dev server (http://localhost:3000)
npm run build    # production build + type check
npm start        # serve the production build
npm run lint     # eslint
npm run typecheck
```

## Project structure

```
src/
  app/                 # routes & root layout
    layout.tsx         # fonts, SEO metadata, JSON-LD, navbar/footer shell
    page.tsx           # homepage section order
    not-found.tsx      # 404
    robots.ts          # /robots.txt
    sitemap.ts         # /sitemap.xml
    about/             # /about (ProfilePage schema)
    work/              # /work (selected projects)
    contact/           # /contact
    manifest.ts        # web app manifest
    opengraph-image.tsx             # homepage OG image (PNG, generated)
    work/[slug]/       # per-project case-study pages + OG images
    services/[slug]/   # /services/* pages (web, mobile, SaaS, AI)
  components/
    sections/          # Hero, Work, Services, WhyWorkWithMe, About,
                       # Process, FAQ, FinalCTA, Contact
    ServicePage.tsx    # shared layout for /services/* pages
    Navbar.tsx         # fixed nav + mobile menu
    Footer.tsx
    ContactForm.tsx    # opens a pre-filled WhatsApp message on submit
    Reveal.tsx         # restrained scroll-reveal (respects reduced motion)
    SectionIntro.tsx   # consistent editorial section headers
    icons.tsx          # inline brand SVGs
    JsonLd.tsx         # JSON-LD script helper
  lib/
    site.ts            # name, email, WhatsApp helper, social links
    projects.ts        # project data shown in Selected Work
    services.ts        # content for the /services/* pages
    og.tsx             # shared OG image renderer (brand fonts)
public/
  projects/            # project screenshots (real assets)
  pfp1.jpeg            # portrait used across the site
  favicon.svg
  resume.pdf
```

## Editing content

Almost all content lives in two files:

- `src/lib/projects.ts` — add, remove or reorder projects. The first entry is
  shown as the featured project in Selected Work. Web screenshots
  use `object-cover object-top`; set `mockup: true` for phone-style shots.
- `src/lib/site.ts` — identity, email, social profiles and the WhatsApp
  number used by every “Start a Project” button.

Section copy is at the top of each file in `src/components/sections/`.

## Contact flow

- **Start a Project** → the contact form (opens a pre-filled WhatsApp message
  on submit — no backend needed; see `src/lib/site.ts` → `whatsappUrl`).
  WhatsApp, email and phone (`+91 7404296309`, `tel:+917404296309`) all read
  from `src/lib/site.ts` — change them in one place.
- **Book a Call** → opens a Cal.com booking modal. Paste your event link in
  `src/lib/site.ts` → `booking.calUrl` (e.g.
  `https://cal.com/your-username/project-discovery-call`). Until a link is
  set, the modal shows an email/WhatsApp fallback.
- Email and WhatsApp stay available as secondary options in the contact
  section and footer.

Projects in `src/components/sections/Work.tsx` expand inline case studies
(Problem + Fix) — the copy lives per project in `src/lib/projects.ts`.

## Content you can drop in (single place each)

- **Hero intro video**: drop your introduction at
  `public/videos/ashish-intro.mp4` (1920×1080 web-optimized) plus a poster
  frame `public/videos/ashish-intro-poster.jpg` (paths in `src/lib/media.ts` →
  `heroVideo` / `heroVideoPoster`). It keeps its native 16:9 ratio, attempts
  autoplay **with sound** first, and falls back gracefully to muted autoplay
  with an "Unmute" button when the browser blocks audio. Custom accessible
  controls: play/pause, ±3s skip, seek, mute and fullscreen. A lighter 720p
  variant (`ashish-intro-720.mp4`) is served on phones. Until the files exist
  the hero shows the poster, then the profile photo — never a broken image.
- **Videos** (hero intro, About intro + per-project demo): `src/lib/media.ts` —
  slots stay hidden until a URL is added.
- **Testimonials**: `src/lib/testimonials.ts` — the section only renders when
  real quotes exist.
- **Availability chip**: `src/lib/site.ts` → `availability` (label + show).
- **Cal.com booking link**: `src/lib/site.ts` → `booking.calUrl`.
- **Per-project case-study pages**: `/work/[slug]` (SEO) auto-generated from
  `src/lib/projects.ts`.

Conversion events (`start_project`, `book_call`, `whatsapp`, `contact_form`,
`similar_project`) are sent to Vercel Analytics — see `src/lib/track.ts`.

## SEO

- Canonical domain: `https://ashish-pathak.online/` (set in `src/lib/site.ts`).
- Generated files: `/robots.txt`, `/sitemap.xml`, `/manifest.webmanifest`,
  and PNG Open Graph images (homepage + one per project, generated at build
  from `src/lib/og.tsx`).
- JSON-LD: Person + WebSite on every page; ProfilePage (pointing at the
  shared Person entity) on `/about`; BreadcrumbList + WebPage on project and
  service pages.
- FAQ answers on the homepage stay in the DOM when collapsed, so all content
  is crawlable.

## Deployment

The site is fully static and deploys cleanly on Vercel (import this repo —
no configuration needed). Replace the domain references in `src/lib/site.ts`
and regenerate `/robots.txt` + `/sitemap.xml` (they are generated from
`src/app/robots.ts` and `src/app/sitemap.ts`) if the domain changes.
