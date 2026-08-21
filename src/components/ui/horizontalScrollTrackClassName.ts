import { cn } from "../../lib/cn";

export const horizontalScrollCueClassName = cn(
  "inline-grid shrink-0 place-items-center text-neutral-500",
  "h-11 w-9 md:h-14.5",
  "transition-colors duration-fast ease-out hover:text-neutral-900",
  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neutral-800",
  "[&_i]:text-base [&_i]:leading-none",
);

export const horizontalScrollerClassName = cn(
  "min-w-0 flex-1 touch-pan-x overflow-x-auto overscroll-x-contain",
  "scrollbar-none [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden",
);
