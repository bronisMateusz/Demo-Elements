import { useEffect, useRef, useState } from "react";
import { isMotionPaused } from "../lib/a11yPreferences";
import type { PdpSubnavItem } from "../constants/pdpSubnav";
import { PDP_HEADER_HEIGHT_PX, PDP_SUBNAV_SCROLL_OFFSET_PX } from "../constants/pdpSubnav";

export function usePdpSubnav(items: PdpSubnavItem[]) {
  const sectionIds = items.map((item) => item.id);
  const [activeId, setActiveId] = useState(() => items[0]?.id ?? "");
  const [stuck, setStuck] = useState(false);
  const sentinelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const sentinel = sentinelRef.current;
    if (!sentinel) return;

    const observer = new IntersectionObserver(
      ([entry]) => setStuck(!entry.isIntersecting),
      { threshold: 0, rootMargin: `-${PDP_HEADER_HEIGHT_PX}px 0px 0px 0px` },
    );

    observer.observe(sentinel);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (sectionIds.length === 0) return;

    const updateActive = () => {
      let current = sectionIds[0];
      for (const id of sectionIds) {
        const element = document.getElementById(id);
        if (!element) continue;
        if (element.getBoundingClientRect().top <= PDP_SUBNAV_SCROLL_OFFSET_PX) {
          current = id;
        }
      }
      setActiveId(current);
    };

    updateActive();
    window.addEventListener("scroll", updateActive, { passive: true });
    window.addEventListener("resize", updateActive);
    return () => {
      window.removeEventListener("scroll", updateActive);
      window.removeEventListener("resize", updateActive);
    };
  }, [sectionIds]);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (!element) return;

    const top =
      element.getBoundingClientRect().top + window.scrollY - PDP_SUBNAV_SCROLL_OFFSET_PX + 1;

    window.scrollTo({
      top,
      behavior: isMotionPaused() ? "auto" : "smooth",
    });

    if (history.replaceState) {
      history.replaceState(null, "", `#${id}`);
    } else {
      window.location.hash = id;
    }
  };

  return { activeId, stuck, sentinelRef, scrollToSection };
}
