import { type ReactNode } from "react";
import { cn } from "../../lib/cn";

export type EyebrowVariant = "default" | "gold" | "muted";

const eyebrowTextVariants: Record<EyebrowVariant, string> = {
  default: "text-neutral-500",
  gold: "text-gold-500",
  muted: "text-neutral-600",
};

const eyebrowRuleVariants: Record<EyebrowVariant, string> = {
  default: "bg-neutral-300",
  gold: "bg-gold-500",
  muted: "bg-neutral-200",
};

type EyebrowProps = {
  children: ReactNode;
  variant?: EyebrowVariant;
  className?: string;
  showRule?: boolean;
};

export function Eyebrow({
  children,
  variant = "default",
  className,
  showRule = true,
}: EyebrowProps) {
  return (
    <span
      className={cn(
        "mb-4 inline-flex items-center gap-3 font-body text-xs font-medium uppercase leading-none tracking-wide",
        eyebrowTextVariants[variant],
        className,
      )}
    >
      {showRule ? (
        <span
          className={cn("inline-block h-px w-6 shrink-0", eyebrowRuleVariants[variant])}
          aria-hidden="true"
        />
      ) : null}
      {children}
    </span>
  );
}
