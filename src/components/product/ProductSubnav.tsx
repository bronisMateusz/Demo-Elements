import { useEffect, useRef } from "react";
import { LayoutGroup, motion } from "motion/react";
import { cn } from "../../lib/cn";
import type { PdpSubnavItem } from "../../constants/pdpSubnav";
import { usePdpSubnav } from "../../hooks/usePdpSubnav";
import { useMotionReduced } from "../../hooks/useMotionReduced";
import { SPRING_LAYOUT } from "../../lib/motionEase";
import { SharedLayoutUnderline } from "../motion/SharedLayoutUnderline";
import { HorizontalScrollTrack } from "../ui/HorizontalScrollTrack";

type ProductSubnavProps = {
  items: PdpSubnavItem[];
};

function syncPdpSubnavHeightVar(node: HTMLElement | null) {
  if (!node) return;
  document.documentElement.style.setProperty(
    "--pdp-subnav-height",
    `${node.offsetHeight}px`,
  );
}

export function ProductSubnav({ items }: ProductSubnavProps) {
  const { activeId, stuck, sentinelRef, scrollToSection } = usePdpSubnav(items);
  const reduce = useMotionReduced();
  const scrollerRef = useRef<HTMLDivElement>(null);
  const navRef = useRef<HTMLElement>(null);
  const linkRefs = useRef(new Map<string, HTMLAnchorElement>());

  useEffect(() => {
    const nav = navRef.current;
    if (!nav) return;
    syncPdpSubnavHeightVar(nav);
    if (typeof ResizeObserver === "undefined") return;

    const observer = new ResizeObserver(() => syncPdpSubnavHeightVar(nav));
    observer.observe(nav);
    return () => {
      observer.disconnect();
      document.documentElement.style.removeProperty("--pdp-subnav-height");
    };
  }, []);

  useEffect(() => {
    const link = linkRefs.current.get(activeId);
    const scroller = scrollerRef.current;
    if (!link || !scroller) return;

    const scrollerRect = scroller.getBoundingClientRect();
    const linkRect = link.getBoundingClientRect();
    const pad = 12;
    const fullyVisible =
      linkRect.left >= scrollerRect.left + pad &&
      linkRect.right <= scrollerRect.right - pad;

    if (fullyVisible) return;

    // Keep vertical page scroll untouched - only nudge the horizontal track.
    const linkCenter =
      linkRect.left -
      scrollerRect.left +
      scroller.scrollLeft +
      linkRect.width / 2;
    const nextLeft = linkCenter - scroller.clientWidth / 2;
    scroller.scrollTo({
      left: Math.max(0, nextLeft),
      behavior: reduce ? "auto" : "smooth",
    });
  }, [activeId, reduce]);

  if (items.length === 0) return null;

  return (
    <>
      <div
        ref={sentinelRef}
        id="pdp-subnav-sentinel"
        className="h-px"
        aria-hidden="true"
      />
      <nav
        ref={navRef}
        id="pdpSubnav"
        className={cn(
          "pdp-subnav sticky top-[var(--site-header-bar-height,7.5rem)] z-99 border-b border-transparent bg-neutral-0/95 backdrop-blur-sm xl:top-29 header-concealed:xl:top-18",
          stuck &&
            "is-stuck border-neutral-200 bg-[color-mix(in_oklch,var(--color-neutral-0)_92%,transparent)]",
        )}
        aria-label="Sekcje strony produktu"
      >
        <HorizontalScrollTrack
          className="mx-auto w-full max-w-384 px-1 sm:px-1.5"
          scrollerRef={scrollerRef}
        >
          <LayoutGroup id="pdp-subnav-active">
            <SharedLayoutUnderline
              className="mx-auto flex w-max min-w-full items-stretch justify-start gap-0 md:justify-center md:gap-1"
              lineClassName="h-0.5 bg-neutral-900/45"
              insetX={12}
              bottom={0}
            >
              {items.map((item) => {
                const isActive = item.id === activeId;
                return (
                  <a
                    key={item.id}
                    ref={(node) => {
                      if (node) linkRefs.current.set(item.id, node);
                      else linkRefs.current.delete(item.id);
                    }}
                    href={`#${item.id}`}
                    className={cn(
                      "relative inline-flex min-h-11 items-center px-3 py-2 font-body text-sm leading-none text-neutral-600 no-underline transition-colors duration-fast ease-out md:min-h-14.5 md:px-4 md:py-3 md:text-ui",
                      "hover:text-neutral-900",
                      "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neutral-800",
                      isActive && "text-neutral-900",
                    )}
                    aria-current={isActive ? "true" : undefined}
                    onClick={(event) => {
                      event.preventDefault();
                      scrollToSection(item.id);
                    }}
                  >
                    {isActive ? (
                      <motion.span
                        layoutId="pdp-subnav-active-line"
                        className="pointer-events-none absolute inset-x-3 bottom-0 z-20 h-0.5 bg-neutral-900 md:inset-x-4"
                        transition={reduce ? { duration: 0 } : SPRING_LAYOUT}
                        aria-hidden="true"
                      />
                    ) : null}
                    {item.label}
                  </a>
                );
              })}
            </SharedLayoutUnderline>
          </LayoutGroup>
        </HorizontalScrollTrack>
      </nav>
    </>
  );
}
