import { useEffect, useState } from "react";
import { useGutterPx } from "./useGutterPx";

const CONTENT_MAX_FALLBACK_PX = 1536; // 96rem at 16px root

/**
 * Left inset that aligns bleed tracks with the content rail's text edge
 * (centered max-width box + gutter padding) - same line as section titles.
 */
export function useContentInsetPx(fallbackGutter = 40) {
  const gutterPx = useGutterPx(fallbackGutter);
  const [insetPx, setInsetPx] = useState(fallbackGutter);

  useEffect(() => {
    const measure = () => {
      const probe = document.createElement("div");
      probe.style.cssText =
        "position:absolute;visibility:hidden;width:var(--max-width-content);pointer-events:none;";
      document.body.appendChild(probe);
      const contentMax = probe.getBoundingClientRect().width || CONTENT_MAX_FALLBACK_PX;
      probe.remove();

      const viewport = window.innerWidth;
      const railMargin = Math.max(0, (viewport - contentMax) / 2);
      setInsetPx(railMargin + gutterPx);
    };

    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [gutterPx]);

  return insetPx;
}
