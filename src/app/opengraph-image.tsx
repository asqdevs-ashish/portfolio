import { renderOg, serifAccent } from "@/lib/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "Ashish Kumar — Freelance AI & Full-Stack Engineer";

export default async function Image() {
  return renderOg({
    eyebrow: "Ashish Kumar",
    footerLeft: "Freelance AI & Full-Stack Engineer · Web · Mobile · SaaS · AI",
    children: (
      <>
        Websites, web apps &{" "}
        <span style={serifAccent}>mobile apps</span> for startups &amp; SaaS.
      </>
    ),
  });
}