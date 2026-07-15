import { useEffect, useState, type RefObject } from "react";

/** Width from element's left edge to the viewport right (for right-bleed carousels). */
export function useBleedRightWidth(ref: RefObject<HTMLElement | null>, fallback?: number) {
  const [width, setWidth] = useState(fallback);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const measure = () => {
      const left = el.getBoundingClientRect().left;
      const next = Math.max(0, window.innerWidth - left);
      if (next > 0) setWidth(next);
    };

    measure();

    const observer = typeof ResizeObserver !== "undefined" ? new ResizeObserver(measure) : null;
    observer?.observe(el);
    window.addEventListener("resize", measure);

    return () => {
      observer?.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, [ref]);

  return width;
}
