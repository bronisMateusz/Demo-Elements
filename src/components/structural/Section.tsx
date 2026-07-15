import { type ReactNode } from "react";
import { cn } from "../../lib/cn";

export type SectionTone = "default" | "muted" | "warm";

const sectionTones: Record<SectionTone, string> = {
  default: "bg-bg",
  muted: "bg-bg-muted",
  warm: "bg-bg-warm",
};

type SectionProps = {
  children: ReactNode;
  tone?: SectionTone;
  className?: string;
  id?: string;
  ariaLabelledby?: string;
};

export function Section({
  children,
  tone = "default",
  className,
  id,
  ariaLabelledby,
}: SectionProps) {
  return (
    <section
      id={id}
      aria-labelledby={ariaLabelledby}
      className={cn(
        "py-[var(--spacing-section-sm)] md:py-[var(--spacing-section)]",
        sectionTones[tone],
        className,
      )}
    >
      {children}
    </section>
  );
}
