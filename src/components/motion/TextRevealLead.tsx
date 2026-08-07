import { cn } from "../../lib/cn";

export const textRevealLeadTypographyClassName =
  "font-heading text-[clamp(1.625rem,2.8vw,2.375rem)] leading-[1.3] tracking-tight font-medium text-neutral-900";

type TextRevealLeadProps = {
  children: string;
  className?: string;
  id?: string;
  /** Kept for API compatibility; scroll reveal is disabled. */
  revealUnit?: "line" | "word";
  typographyClassName?: string;
  mutedClassName?: string;
  fillClassName?: string;
};

/** Section lead heading. Scroll word/line reveal is disabled - renders solid text. */
export function TextRevealLead({
  children,
  className,
  id,
  typographyClassName = textRevealLeadTypographyClassName,
  fillClassName = "text-neutral-900",
}: TextRevealLeadProps) {
  return (
    <p
      id={id}
      className={cn(
        typographyClassName,
        fillClassName,
        "max-w-prose",
        className,
      )}
    >
      {children}
    </p>
  );
}
