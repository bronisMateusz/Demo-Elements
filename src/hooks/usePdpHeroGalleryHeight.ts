import { useLayoutEffect, useRef, useState } from "react";

const LG_MIN_WIDTH_PX = 1024;
const VIEWPORT_HEIGHT_RATIO = 0.8;

/**
 * Caps PDP hero gallery on desktop: max-height = min(buy column span, 80svh).
 * Uses bounding rects so grid row height from the gallery cannot skew the measure.
 */
export function usePdpHeroGalleryHeight() {
  const buyColumnRef = useRef<HTMLDivElement>(null);
  const buyContentRef = useRef<HTMLDivElement>(null);
  const [galleryMaxHeightPx, setGalleryMaxHeightPx] = useState<number | null>(
    null,
  );

  useLayoutEffect(() => {
    const buyColumn = buyColumnRef.current;
    const buyContent = buyContentRef.current;
    if (!buyColumn || !buyContent) return;

    const sync = () => {
      if (!window.matchMedia(`(min-width: ${LG_MIN_WIDTH_PX}px)`).matches) {
        setGalleryMaxHeightPx(null);
        return;
      }

      const columnTop = buyColumn.getBoundingClientRect().top;
      const contentBottom = buyContent.getBoundingClientRect().bottom;
      const buySpanPx = Math.ceil(contentBottom - columnTop);
      const viewportCapPx = Math.floor(
        window.innerHeight * VIEWPORT_HEIGHT_RATIO,
      );

      if (buySpanPx <= 0) return;

      setGalleryMaxHeightPx(Math.min(buySpanPx, viewportCapPx));
    };

    sync();
    const rafId = requestAnimationFrame(sync);

    const observer =
      typeof ResizeObserver !== "undefined" ? new ResizeObserver(sync) : null;
    observer?.observe(buyColumn);
    observer?.observe(buyContent);

    window.addEventListener("resize", sync);
    window.addEventListener("load", sync, true);

    return () => {
      cancelAnimationFrame(rafId);
      observer?.disconnect();
      window.removeEventListener("resize", sync);
      window.removeEventListener("load", sync, true);
    };
  }, []);

  return { buyColumnRef, buyContentRef, galleryMaxHeightPx };
}
