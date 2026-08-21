import { useEffect, useRef, type ReactNode, type RefObject } from "react";
import { cn } from "../../lib/cn";
import { isMotionPaused } from "../../lib/a11yPreferences";
import { useHorizontalScrollEdges } from "../../hooks/useHorizontalScrollEdges";
import {
  horizontalScrollCueClassName,
  horizontalScrollerClassName,
} from "./horizontalScrollTrackClassName";

type HorizontalScrollTrackProps = {
  children: ReactNode;
  /** Outer flex row (cues + scroller). */
  className?: string;
  scrollerClassName?: string;
  /** When set, keeps `[aria-current=true]` centered in the track. */
  activeKey?: string;
  /** Optional external scroller ref (e.g. ProductSubnav link centering). */
  scrollerRef?: RefObject<HTMLDivElement | null>;
};

/** Horizontal menu track with edge caret cues (PDP subnav pattern). */
export function HorizontalScrollTrack({
  children,
  className,
  scrollerClassName,
  activeKey,
  scrollerRef: scrollerRefProp,
}: HorizontalScrollTrackProps) {
  const localRef = useRef<HTMLDivElement>(null);
  const scrollerRef = scrollerRefProp ?? localRef;
  const { edges, scrollByPage } = useHorizontalScrollEdges(
    scrollerRef,
    activeKey,
  );

  useEffect(() => {
    if (activeKey == null) return;
    const scroller = scrollerRef.current;
    if (!scroller) return;
    const selected = scroller.querySelector<HTMLElement>(
      '[aria-current="true"]',
    );
    if (!selected) return;

    const scrollerBox = scroller.getBoundingClientRect();
    const selectedBox = selected.getBoundingClientRect();
    const nextLeft =
      scroller.scrollLeft +
      (selectedBox.left + selectedBox.width / 2) -
      (scrollerBox.left + scrollerBox.width / 2);

    scroller.scrollTo({
      left: nextLeft,
      behavior: isMotionPaused() ? "auto" : "smooth",
    });
  }, [activeKey, scrollerRef]);

  return (
    <div className={cn("flex items-center", className)}>
      {edges.start ? (
        <button
          type="button"
          className={horizontalScrollCueClassName}
          aria-label="Przewiń w lewo"
          onClick={() => scrollByPage(-1)}
        >
          <i className="ph ph-caret-left" aria-hidden="true" />
        </button>
      ) : null}

      <div
        ref={scrollerRef}
        className={cn(horizontalScrollerClassName, scrollerClassName)}
      >
        {children}
      </div>

      {edges.end ? (
        <button
          type="button"
          className={horizontalScrollCueClassName}
          aria-label="Przewiń w prawo"
          onClick={() => scrollByPage(1)}
        >
          <i className="ph ph-caret-right" aria-hidden="true" />
        </button>
      ) : null}
    </div>
  );
}
