import { renderOg, serifAccent } from "@/lib/og";
import { projects, projectSlug } from "@/lib/projects";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "Ashish Pathak — project case study";

export const dynamicParams = false;

export const generateStaticParams = async () =>
  projects.map((p) => ({ slug: projectSlug(p.title) }));

export default async function Image({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = projects.find((p) => projectSlug(p.title) === slug);
  const title = project?.title ?? "Selected work";
  const subtitle = project
    ? `${project.subtitle} · ${project.category}`
    : "Case study";

  return renderOg({
    eyebrow: "Case Study",
    footerLeft: subtitle,
    children: (
      <>
        {title} <span style={serifAccent}>— built by Ashish Pathak.</span>
      </>
    ),
  });
}