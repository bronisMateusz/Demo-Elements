import { useEffect, useRef, useState } from "react";
import { readHeaderHeightPx } from "../lib/layoutTokens";

type UseStickyUnderHeaderOptions = {
  /** When sticky nav has `mt-12`, sentinel sits above that margin - delay stuck until pin. */
  stickyMarginTopPx?: number;
};

/** Sentinel + stuck flag for chrome that pins just under the site header. */
export function useStickyUnderHeader({
  stickyMarginTopPx = 0,
}: UseStickyUnderHeaderOptions = {}) {
  const [stuck, setStuck] = useState(false);
  const sentinelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const sentinel = sentinelRef.current;
    if (!sentinel) return;

    const observe = () => {
      const headerH = readHeaderHeightPx();
      const rootTop = headerH + stickyMarginTopPx;
      const observer = new IntersectionObserver(
        ([entry]) => setStuck(!entry.isIntersecting),
        { threshold: 0, rootMargin: `-${rootTop}px 0px 0px 0px` },
      );
      observer.observe(sentinel);
      return observer;
    };

    let observer = observe();
    const onResize = () => {
      observer.disconnect();
      observer = observe();
    };
    window.addEventListener("resize", onResize);

    return () => {
      observer.disconnect();
      window.removeEventListener("resize", onResize);
    };
  }, [stickyMarginTopPx]);

  return { stuck, sentinelRef };
}
