import { useEffect, useRef, useState } from "react";
import { cn } from "../lib/cn";
import {
  isMotionPaused,
  subscribeMotionPreference,
} from "../lib/a11yPreferences";

type UseRevealOnScrollOptions = {
  threshold?: number;
  rootMargin?: string;
};

function getInitialVisibility() {
  if (typeof window === "undefined") return false;
  return isMotionPaused();
}

/** True when any part of the element intersects the viewport. */
function isInViewport(element: HTMLElement) {
  const rect = element.getBoundingClientRect();
  return rect.top < window.innerHeight && rect.bottom > 0;
}

export function useRevealOnScroll<T extends HTMLElement = HTMLDivElement>(
  options: UseRevealOnScrollOptions = {},
) {
  const ref = useRef<T>(null);
  const [isVisible, setIsVisible] = useState(getInitialVisibility);

  useEffect(() => {
    const element = ref.current;
    if (!element || isMotionPaused()) return;

    // Tall sections (category grids, salon lists) never reach a high
    // intersection ratio while only the top is on screen - use threshold 0.
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      {
        threshold: options.threshold ?? 0,
        rootMargin: options.rootMargin ?? "0px 0px -40px 0px",
      },
    );

    observer.observe(element);

    // Reveal immediately when already in view on mount (no wait for IO).
    if (isInViewport(element)) {
      setIsVisible(true);
      observer.disconnect();
    }

    return () => observer.disconnect();
  }, [options.rootMargin, options.threshold]);

  useEffect(() => {
    return subscribeMotionPreference((paused) => {
      if (paused) setIsVisible(true);
    });
  }, []);

  return {
    ref,
    isVisible,
    className: cn(
      "translate-y-3 opacity-0 transition-[opacity,transform] duration-base ease-luxury",
      isVisible && "translate-y-0 opacity-100",
    ),
  };
}
