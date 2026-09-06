import type { Metadata, Viewport } from "next";
import { Inter, Instrument_Serif } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { BookingProvider } from "@/components/booking";
import { site } from "@/lib/site";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const instrumentSerif = Instrument_Serif({
  weight: "400",
  style: ["normal", "italic"],
  subsets: ["latin"],
  variable: "--font-instrument-serif",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.domain),
  title: "Freelance Web Developer for Startups & SaaS | Ashish Kumar",
  description: site.description,
  alternates: { canonical: site.domain },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    url: site.domain,
    siteName: site.name,
    title: "Ashish Kumar — Freelance AI & Full-Stack Engineer",
    description: site.description,
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Ashish Kumar — Freelance AI & Full-Stack Engineer",
    description: site.description,
    creator: "@ashish_dev404",
  },
  icons: {
    icon: [{ url: "/favicon.svg", type: "image/svg+xml" }],
  },
  creator: site.name,
  appleWebApp: {
    title: site.name,
    statusBarStyle: "default",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0a0a0b",
};

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: site.name,
  url: site.domain,
  jobTitle: site.role,
  description: site.description,
  email: "mailto:" + site.email,
  telephone: site.phone,
  knowsAbout: [
    "Web Development",
    "Mobile App Development",
    "Cross-Platform Development",
    "React Native",
    "Next.js",
    "React",
    "Node.js",
    "TypeScript",
    "PostgreSQL",
    "MongoDB",
    "SaaS Development",
    "AI Integration",
  ],
  sameAs: [
    "https://github.com/asqdevs-ashish",
    "https://www.linkedin.com/in/ashish-pathak-968632400/",
    "https://x.com/ashish_dev404",
    "https://www.youtube.com/channel/UCwbCbJ30Cvz5dLxZ6I9enHg",
  ],
};

const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: site.name,
  url: site.domain,
  author: { "@type": "Person", name: site.name },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${instrumentSerif.variable}`}
    >
      <body
        suppressHydrationWarning
        className="flex min-h-dvh flex-col bg-background font-sans text-foreground antialiased"
      >
        <a
          href="#main-content"
          className="sr-only z-[60] rounded-md bg-foreground px-4 py-2 text-sm font-medium text-background focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
        >
          Skip to content
        </a>
        <BookingProvider>
          <Navbar />
          <main id="main-content" className="flex-1">
            {children}
          </main>
          <Footer />
        </BookingProvider>
        <Analytics />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
        />
      </body>
    </html>
  );
}
