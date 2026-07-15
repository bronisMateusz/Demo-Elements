import { type ReactNode } from "react";
import { assetUrl } from "../../app/assets";
import { cn } from "../../lib/cn";

export type EyebrowVariant = "default" | "gold" | "muted";

const eyebrowTextVariants: Record<EyebrowVariant, string> = {
  default: "text-neutral-500",
  gold: "text-gold-500",
  muted: "text-neutral-600",
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
        "mb-4 inline-flex items-center gap-2 font-body text-xs font-medium uppercase leading-none tracking-wide",
        eyebrowTextVariants[variant],
        className,
      )}
    >
      {showRule ? (
        <img
          src={assetUrl("sygnet.svg")}
          alt=""
          aria-hidden="true"
          className="size-3.5 shrink-0"
          width={14}
          height={14}
        />
      ) : null}
      {children}
    </span>
  );
}
