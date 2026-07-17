import { cn } from "../../lib/cn";

/** Shared text-field surface - use for all site inputs/textareas. */
export const inputClassName = cn(
  "h-12 w-full rounded-xs border border-neutral-200 bg-neutral-50 px-4",
  "font-body text-ui text-neutral-900 placeholder:text-neutral-400",
  "outline-none transition-[border-color,background-color] duration-fast ease-out",
  "focus:border-neutral-800 focus:bg-neutral-0",
);
