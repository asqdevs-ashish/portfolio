import Image from "next/image";
import type { Project } from "@/lib/projects";

/**
 * Project visual with uniform panel heights:
 *  - phone screenshots (device or mockup) render in a device frame,
 *  - web screenshots render full-bleed cover.
 */
export function ProjectImage({
  project,
  priority = false,
  sizes,
}: {
  project: Project;
  priority?: boolean;
  /** Override the responsive sizes hint (featured visuals are wider). */
  sizes?: string;
}) {
  const alt = `${project.title} — ${project.subtitle}`;
  const isPhone = project.device || project.mockup;
  const webSizes =
    sizes ??
    "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 720px";

  return (
    <div className="relative overflow-hidden rounded-xl border border-border-strong bg-surface">
      <span className="img-label">{project.category}</span>

      {isPhone ? (
        <div className="flex justify-center px-6 py-8">
          <div className="w-[min(100%,280px)] rounded-[1.8rem] border border-border-strong bg-[#0c0c0d] p-2 shadow-[0_30px_60px_-28px_rgba(0,0,0,0.85)]">
            <div className="relative aspect-[9/19.5] overflow-hidden rounded-[1.25rem] bg-[#050505]">
              <Image
                src={project.image}
                alt={alt}
                fill
                priority={priority}
                quality={90}
                sizes="280px"
                className={
                  project.device ? "object-cover object-top" : "object-contain"
                }
              />
            </div>
          </div>
        </div>
      ) : (
        <Image
          src={project.image}
          alt={alt}
          width={1600}
          height={900}
          priority={priority}
          quality={88}
          sizes={webSizes}
          className="aspect-[16/10] h-auto w-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.015]"
        />
      )}
    </div>
  );
}