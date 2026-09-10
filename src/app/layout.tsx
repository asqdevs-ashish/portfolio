import type { Metadata, Viewport } from "next";
import { Inter, Instrument_Serif } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";

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
  metadataBase: new URL(`${site.domain}/`),

  title: {
    default: `${site.name} | AI & Full-Stack Engineer`,
    template: `%s | ${site.name}`,
  },

  description: site.description,

  alternates: {
    canonical: `${site.domain}/`,
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },

  openGraph: {
    type: "website",
    url: `${site.domain}/`,
    siteName: site.name,
    title: `${site.name} | AI & Full-Stack Engineer`,
    description: site.description,
    locale: "en_US",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: `${site.name} — AI & Full-Stack Engineer`,
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: `${site.name} | AI & Full-Stack Engineer`,
    description: site.description,
    creator: "@ashish_dev404",
    images: ["/opengraph-image"],
  },

  icons: {
    icon: [
      {
        url: "/favicon.svg",
        type: "image/svg+xml",
      },
    ],
  },

  creator: site.name,
  publisher: site.name,

  category: "technology",

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
  "@id": `${site.domain}/#person`,
  name: site.name,
  url: `${site.domain}/`,
  jobTitle: site.role,
  description: site.description,
  image: `${site.domain}/pfp1.jpeg`,
  email: `mailto:${site.email}`,
  telephone: site.phone,

  knowsAbout: [
    "Web Development",
    "Web Application Development",
    "Full-Stack Development",
    "Next.js",
    "React",
    "TypeScript",
    "Node.js",
    "React Native",
    "Mobile App Development",
    "SaaS Development",
    "PostgreSQL",
    "MongoDB",
    "AWS",
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
  "@id": `${site.domain}/#website`,
  name: site.name,
  url: `${site.domain}/`,
  description: site.description,
  inLanguage: "en-US",
  publisher: {
    "@id": `${site.domain}/#person`,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${instrumentSerif.variable}`}>
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
        <SpeedInsights />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(personJsonLd),
          }}
        />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(websiteJsonLd),
          }}
        />
      </body>
    </html>
  );
}
