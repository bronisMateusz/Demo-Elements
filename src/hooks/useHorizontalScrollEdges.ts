import { useEffect, useState, type RefObject } from "react";
import { useMotionReduced } from "./useMotionReduced";

export type HorizontalScrollEdges = {
  start: boolean;
  end: boolean;
};

export function readHorizontalScrollEdges(
  el: HTMLElement,
): HorizontalScrollEdges {
  const slack = 2;
  const { scrollLeft, scrollWidth, clientWidth } = el;
  return {
    start: scrollLeft > slack,
    end: scrollLeft + clientWidth < scrollWidth - slack,
  };
}

/** Tracks overflow edges and page-nudges a horizontal scroller. */
export function useHorizontalScrollEdges(
  scrollerRef: RefObject<HTMLElement | null>,
  /** Extra key that should re-measure (e.g. active tab id). */
  remountKey?: string,
) {
  const reduce = useMotionReduced();
  const [edges, setEdges] = useState<HorizontalScrollEdges>({
    start: false,
    end: false,
  });

  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;

    const sync = () => setEdges(readHorizontalScrollEdges(el));
    sync();

    el.addEventListener("scroll", sync, { passive: true });
    window.addEventListener("resize", sync, { passive: true });

    const resizeObserver =
      typeof ResizeObserver === "undefined" ? null : new ResizeObserver(sync);
    resizeObserver?.observe(el);
    for (const child of el.children) {
      resizeObserver?.observe(child);
    }

    return () => {
      el.removeEventListener("scroll", sync);
      window.removeEventListener("resize", sync);
      resizeObserver?.disconnect();
    };
  }, [scrollerRef, remountKey]);

  const scrollByPage = (direction: -1 | 1) => {
    const el = scrollerRef.current;
    if (!el) return;
    const amount = Math.max(el.clientWidth * 0.65, 8 * 16);
    el.scrollBy({
      left: direction * amount,
      behavior: reduce ? "auto" : "smooth",
    });
  };

  return { edges, scrollByPage };
}
