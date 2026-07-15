import { clsx, type ClassValue } from "clsx";
import { extendTailwindMerge } from "tailwind-merge";

const twMerge = extendTailwindMerge({
  extend: {
    classGroups: {
      "font-size": [
        "text-display-xl",
        "text-h1",
        "text-h2",
        "text-h3",
        "text-h4",
        "text-body-lg",
        "text-body",
        "text-ui",
        "text-small",
        "text-eyebrow",
      ],
    },
  },
});

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
