import { cn } from "../../lib/cn";

export const askRowClassName = cn(
  "group/ask motion-fill-surface relative isolate flex w-full min-h-12 cursor-pointer items-center gap-3 overflow-hidden rounded-xs border border-neutral-200 bg-neutral-50 px-4 py-3 font-body text-ui font-normal leading-compact text-neutral-600 no-underline transition-[color,border-color,transform] duration-fast ease-out",
  "before:pointer-events-none before:absolute before:inset-0 before:z-0 before:origin-bottom before:scale-y-0 before:bg-gold-500 before:transition-transform before:duration-slow before:ease-luxury before:content-['']",
  "hover:before:scale-y-100 focus-visible:before:scale-y-100",
  "hover:border-gold-500 hover:text-neutral-0 focus-visible:border-gold-500 focus-visible:text-neutral-0",
  "focus-visible:outline-2 focus-visible:outline-offset-[var(--spacing-focus-ring-offset)] focus-visible:outline-neutral-800",
  "active:translate-y-px",
);

export const askRowTextClassName = "relative z-[1] min-w-0";

export const askRowActionClassName = cn(
  "font-semibold text-neutral-900 transition-colors duration-fast ease-out",
  "group-hover/ask:text-neutral-0 group-focus-visible/ask:text-neutral-0",
);

export const askRowIconClassName = cn(
  "relative z-[1] shrink-0 text-xl leading-none text-neutral-500 transition-[color,transform] duration-fast ease-out motion-fill-chevron",
  "group-hover/ask:text-neutral-0 group-focus-visible/ask:text-neutral-0",
);

export const askRowChevronClassName = cn(
  askRowIconClassName,
  "ml-auto group-hover/ask:translate-x-1 group-focus-visible/ask:translate-x-1",
);

export function askRowPreviewClassName(
  state: "default" | "hover" | "focus" | "active" = "default",
  className?: string,
) {
  return cn(
    state === "hover" &&
      "before:scale-y-100 border-gold-500 text-neutral-0 [&_strong]:text-neutral-0 [&_i]:text-neutral-0 [&_i:last-child]:translate-x-1",
    state === "active" &&
      "before:scale-y-100 translate-y-px border-gold-500 text-neutral-0 [&_strong]:text-neutral-0 [&_i]:text-neutral-0 [&_i:last-child]:translate-x-1",
    state === "focus" &&
      "outline-2 outline-offset-[var(--spacing-focus-ring-offset)] outline-neutral-800",
    className,
  );
}
