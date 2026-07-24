import { useEffect, useState } from "react";
import { GUTTER } from "../lib/layoutTokens";

/** Resolved pixel width of the page gutter clamp (off-screen measure). */
export function useGutterPx(fallback = 40) {
  const [px, setPx] = useState(fallback);

  useEffect(() => {
    const measure = () => {
      const probe = document.createElement("div");
      probe.style.cssText = `position:absolute;visibility:hidden;width:${GUTTER};pointer-events:none;`;
      document.body.appendChild(probe);
      const width = probe.getBoundingClientRect().width;
      probe.remove();
      if (width > 0) setPx(width);
    };

    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [fallback]);

  return px;
}
