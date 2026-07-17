import { cn } from "../../lib/cn";

/** @deprecated Kept for library state previews of the previous full-bleed ask row. */
export function askRowPreviewClassName(
  state: "default" | "hover" | "focus" | "active" = "default",
  className?: string,
) {
  return cn(
    state === "hover" && "opacity-90",
    state === "active" && "translate-y-px",
    state === "focus" &&
      "outline-2 outline-offset-[var(--spacing-focus-ring-offset)] outline-neutral-800",
    className,
  );
}
