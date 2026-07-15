import { useEffect, useRef, useState } from "react";
import { isMotionPaused, subscribeMotionPreference } from "../lib/a11yPreferences";

type UseRevealOnScrollOptions = {
  threshold?: number;
  rootMargin?: string;
};

function getInitialVisibility() {
  if (typeof window === "undefined") return false;
  return isMotionPaused();
}

export function useRevealOnScroll<T extends HTMLElement = HTMLDivElement>(
  options: UseRevealOnScrollOptions = {},
) {
  const ref = useRef<T>(null);
  const [isVisible, setIsVisible] = useState(getInitialVisibility);

  useEffect(() => {
    const element = ref.current;
    if (!element || isMotionPaused()) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      {
        threshold: options.threshold ?? 0.12,
        rootMargin: options.rootMargin ?? "0px 0px -8% 0px",
      },
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [options.rootMargin, options.threshold]);

  useEffect(() => {
    return subscribeMotionPreference((paused) => {
      if (paused) setIsVisible(true);
    });
  }, []);

  return { ref, isVisible, className: isVisible ? "reveal-on-scroll is-visible" : "reveal-on-scroll" };
}
