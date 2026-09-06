import type { MetadataRoute } from "next";
import { site } from "@/lib/site";
import { projects, projectSlug } from "@/lib/projects";
import { services } from "@/lib/services";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  // Root canonical is emitted by Next without a trailing slash — keep the
  // sitemap URL identical to it.
  const rootUrl = site.domain.replace(/\/$/, "");
  return [
    {
      url: rootUrl,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1,
    },
    ...services.map((service) => ({
      url: `${site.domain}services/${service.slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
    ...projects.map((project) => ({
      url: `${site.domain}work/${projectSlug(project.title)}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
  ];
}