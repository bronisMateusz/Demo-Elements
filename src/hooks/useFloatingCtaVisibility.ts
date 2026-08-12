import { useEffect, useState } from "react";

/** Hide when footer top enters this band above the viewport bottom. */
export const FLOATING_CTA_FOOTER_CLEARANCE_PX = 160;
export const FLOATING_CTA_DEFAULT_SHOW_AFTER_SCROLL_PX = 320;

type UseFloatingCtaVisibilityOptions = {
  showAfterScroll?: number;
  footerSelector?: string;
  /** Optional hero selector - when found, show after the hero leaves view. */
  heroSelector?: string;
};

/** Prefer showing after a hero leaves view - falls back to a fixed offset. */
function getShowAfterScrollPx(fallback: number, heroSelector?: string): number {
  if (!heroSelector) return fallback;
  const hero = document.querySelector<HTMLElement>(heroSelector);
  if (!hero) return fallback;
  return Math.max(fallback, hero.offsetTop + hero.offsetHeight - 160);
}

/** Scroll + footer intersection visibility for sticky floating CTAs. */
export function useFloatingCtaVisibility({
  showAfterScroll = FLOATING_CTA_DEFAULT_SHOW_AFTER_SCROLL_PX,
  footerSelector = 'footer[role="contentinfo"]',
  heroSelector,
}: UseFloatingCtaVisibilityOptions = {}): boolean {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const footer = document.querySelector<HTMLElement>(footerSelector);
    if (!footer) return;

    const threshold = () => getShowAfterScrollPx(showAfterScroll, heroSelector);
    let scrolledEnough = window.scrollY > threshold();
    let footerNear = false;

    const syncVisible = () => setVisible(scrolledEnough && !footerNear);

    const onScroll = () => {
      scrolledEnough = window.scrollY > threshold();
      syncVisible();
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        footerNear = entry.isIntersecting;
        syncVisible();
      },
      {
        rootMargin: `0px 0px -${FLOATING_CTA_FOOTER_CLEARANCE_PX}px 0px`,
        threshold: 0,
      },
    );

    observer.observe(footer);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", onScroll);
    };
  }, [showAfterScroll, footerSelector, heroSelector]);

  return visible;
}
