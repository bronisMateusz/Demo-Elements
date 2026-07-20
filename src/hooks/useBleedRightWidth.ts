import { useLayoutEffect, useState, type RefObject } from "react";

/** Width from element's left edge to the viewport right (for right-bleed carousels). */
export function useBleedRightWidth(ref: RefObject<HTMLElement | null>, fallback?: number) {
  const [width, setWidth] = useState(fallback);

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;

    const measure = () => {
      const left = el.getBoundingClientRect().left;
      // Prefer layout viewport width so preview iframes / scrollbars stay consistent.
      const viewport = document.documentElement.clientWidth || window.innerWidth;
      const next = Math.max(0, Math.ceil(viewport - left));
      setWidth((prev) => (prev === next ? prev : next));
    };

    measure();

    const observer = typeof ResizeObserver !== "undefined" ? new ResizeObserver(measure) : null;
    observer?.observe(el);
    if (el.parentElement) observer?.observe(el.parentElement);

    window.addEventListener("resize", measure);
    window.addEventListener("scroll", measure, { passive: true });

    return () => {
      observer?.disconnect();
      window.removeEventListener("resize", measure);
      window.removeEventListener("scroll", measure);
    };
  }, [ref]);

  return width;
}
