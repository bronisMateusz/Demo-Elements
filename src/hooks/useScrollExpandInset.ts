import { useEffect, useRef, useState, type RefObject } from "react";
import {
  useReducedMotion,
  useScroll,
  useTransform,
  type MotionValue,
} from "motion/react";
import { useGutterPx } from "./useGutterPx";

const WIDE_MAX_FALLBACK_PX = 1792; // 112rem at 16px root

type UseScrollExpandInsetOptions = {
  /** CSS length var for the starting max width (default: `--max-width-wide`). */
  maxWidthVar?: string;
  fallbackMaxPx?: number;
};

type UseScrollExpandInsetResult = {
  targetRef: RefObject<HTMLElement | null>;
  sideInset: MotionValue<number>;
};

/**
 * Horizontal inset that starts at a wide-shell margin and eases to the page
 * gutter as the target scrolls into view (scroll-expand panels).
 */
export function useScrollExpandInset({
  maxWidthVar = "--max-width-wide",
  fallbackMaxPx = WIDE_MAX_FALLBACK_PX,
}: UseScrollExpandInsetOptions = {}): UseScrollExpandInsetResult {
  const targetRef = useRef<HTMLElement | null>(null);
  const reducedMotion = useReducedMotion();
  const gutterPx = useGutterPx();
  const [startInsetPx, setStartInsetPx] = useState(gutterPx);

  useEffect(() => {
    const measure = () => {
      const probe = document.createElement("div");
      probe.style.cssText = `position:absolute;visibility:hidden;width:var(${maxWidthVar});pointer-events:none;`;
      document.body.appendChild(probe);
      const wideMax = probe.getBoundingClientRect().width || fallbackMaxPx;
      probe.remove();
      setStartInsetPx(Math.max(gutterPx, (window.innerWidth - wideMax) / 2));
    };

    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [fallbackMaxPx, gutterPx, maxWidthVar]);

  const { scrollYProgress } = useScroll({
    target: targetRef,
    // Finish expand sooner - while the block is still entering the viewport.
    offset: ["start end", "start 0.45"],
  });

  const sideInset = useTransform(scrollYProgress, (progress) => {
    if (reducedMotion) return gutterPx;
    const t = Math.min(1, Math.max(0, progress));
    return startInsetPx + (gutterPx - startInsetPx) * t;
  });

  return { targetRef, sideInset };
}
