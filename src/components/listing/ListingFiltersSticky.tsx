import { useEffect, useRef, useState, type ReactNode } from "react";
import { cn } from "../../lib/cn";
import {
  stickyListingFiltersScrollClassName,
  stickyListingFiltersShellClassName,
} from "../../lib/layoutTokens";

type ListingFiltersStickyProps = {
  children: ReactNode;
};

type ScrollEdges = {
  top: boolean;
  bottom: boolean;
};

function readEdges(el: HTMLElement): ScrollEdges {
  const slack = 2;
  const { scrollTop, scrollHeight, clientHeight } = el;
  return {
    top: scrollTop > slack,
    bottom: scrollTop + clientHeight < scrollHeight - slack,
  };
}

/**
 * Sticky filter column with edge fades that hint overflow when content
 * does not fit the viewport.
 */
export function ListingFiltersSticky({ children }: ListingFiltersStickyProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [edges, setEdges] = useState<ScrollEdges>({ top: false, bottom: false });

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    const sync = () => setEdges(readEdges(el));
    sync();

    el.addEventListener("scroll", sync, { passive: true });
    const resizeObserver = new ResizeObserver(sync);
    resizeObserver.observe(el);
    for (const child of el.children) {
      resizeObserver.observe(child);
    }

    const headerClassObserver = new MutationObserver(sync);
    headerClassObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });
    window.addEventListener("resize", sync, { passive: true });

    return () => {
      el.removeEventListener("scroll", sync);
      resizeObserver.disconnect();
      headerClassObserver.disconnect();
      window.removeEventListener("resize", sync);
    };
  }, []);

  return (
    <div className={stickyListingFiltersShellClassName}>
      <div
        ref={scrollRef}
        className={cn(stickyListingFiltersScrollClassName, "pb-8")}
      >
        {children}
      </div>
      <div
        aria-hidden="true"
        className={cn(
          "pointer-events-none absolute inset-x-0 top-0 z-2 h-14 bg-linear-to-b from-neutral-0 from-35% via-neutral-0/70 to-transparent transition-opacity duration-fast ease-out",
          edges.top ? "opacity-100" : "opacity-0",
        )}
      />
      <div
        aria-hidden="true"
        className={cn(
          "pointer-events-none absolute inset-x-0 bottom-0 z-2 h-16 bg-linear-to-t from-neutral-0 from-40% via-neutral-0/75 to-transparent transition-opacity duration-fast ease-out",
          edges.bottom ? "opacity-100" : "opacity-0",
        )}
      />
    </div>
  );
}
