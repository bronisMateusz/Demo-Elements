import { cn } from "../../lib/cn";

/** Shared text-field surface - use for all site inputs/textareas. */
export const inputClassName = cn(
  "h-12 w-full rounded-xs border border-neutral-200 bg-neutral-0 px-4",
  "font-body text-ui text-neutral-900 placeholder:text-neutral-400",
  "outline-none transition-[border-color,background-color,box-shadow] duration-fast ease-out",
  "hover:border-neutral-800 hover:bg-neutral-50 hover:shadow-subtle",
  "focus:border-neutral-900 focus:bg-neutral-0 focus:shadow-none",
);
