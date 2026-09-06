import type { ReactNode } from "react";

type SectionIntroProps = {
  /** Small gold index label, e.g. "01". */
  index?: string;
  label: string;
  title: ReactNode;
  /** Optional supporting copy rendered below the title. */
  intro?: ReactNode;
  align?: "left" | "center";
  className?: string;
};

/**
 * The consistent editorial section header:
 * eyebrow label with a gold index, then a display heading.
 * Pass a <span className="font-display italic"> phrase </span>
 * inside `title` for a serif accent.
 */
export function SectionIntro({
  index,
  label,
  title,
  intro,
  align = "left",
  className = "",
}: SectionIntroProps) {
  const centered = align === "center";

  return (
    <div className={`${centered ? "mx-auto text-center" : ""} ${className}`}>
      <p
        className={`eyebrow ${centered ? "justify-center" : ""}`}
      >
        {index && <span className="eyebrow-index">{index}</span>}
        <span>{label}</span>
        {!centered && <span aria-hidden className="h-px w-10 bg-border-strong" />}
      </p>
      <h2
        className={`mt-5 text-3xl font-semibold tracking-[-0.02em] leading-[1.12] text-balance sm:text-4xl md:text-[2.75rem] md:leading-[1.08] ${
          centered ? "mx-auto max-w-3xl" : "max-w-2xl"
        }`}
      >
        {title}
      </h2>
      {intro && (
        <p
          className={`mt-4 max-w-xl text-[15px] leading-relaxed text-muted-foreground md:text-base ${
            centered ? "mx-auto" : ""
          }`}
        >
          {intro}
        </p>
      )}
    </div>
  );
}
