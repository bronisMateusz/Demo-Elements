import { useEffect, useRef, useState } from "react";
import { isMotionPaused } from "../lib/a11yPreferences";
import type { PdpSubnavItem } from "../constants/pdpSubnav";
import { PDP_HEADER_HEIGHT_PX, PDP_SUBNAV_HEIGHT_PX } from "../constants/pdpSubnav";

const SUBNAV_GAP_PX = 8;

function readHeaderHeightPx() {
  const raw = getComputedStyle(document.documentElement)
    .getPropertyValue("--spacing-header-h")
    .trim();
  const value = Number.parseFloat(raw);
  return Number.isFinite(value) ? value : PDP_HEADER_HEIGHT_PX;
}

function readHeaderOffsetPx() {
  const raw = getComputedStyle(document.documentElement)
    .getPropertyValue("--spacing-header-offset")
    .trim();
  const value = Number.parseFloat(raw);
  return Number.isFinite(value) ? value : PDP_HEADER_HEIGHT_PX;
}

function readSubnavScrollOffsetPx() {
  return readHeaderOffsetPx() + PDP_SUBNAV_HEIGHT_PX + SUBNAV_GAP_PX;
}

export function usePdpSubnav(items: PdpSubnavItem[]) {
  const sectionIds = items.map((item) => item.id);
  const [activeId, setActiveId] = useState(() => items[0]?.id ?? "");
  const [stuck, setStuck] = useState(false);
  const sentinelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const sentinel = sentinelRef.current;
    if (!sentinel) return;

    // Fixed to the *current* full header height - must NOT follow --spacing-header-offset,
    // or concealing the header flips stuck on/off and the chrome flickers.
    const observe = () => {
      const headerH = readHeaderHeightPx();
      const observer = new IntersectionObserver(
        ([entry]) => setStuck(!entry.isIntersecting),
        { threshold: 0, rootMargin: `-${headerH}px 0px 0px 0px` },
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
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle("pdp-subnav-stuck", stuck);
    return () => document.documentElement.classList.remove("pdp-subnav-stuck");
  }, [stuck]);

  useEffect(() => {
    if (sectionIds.length === 0) return;

    const updateActive = () => {
      const offset = readSubnavScrollOffsetPx();
      let current = sectionIds[0];
      for (const id of sectionIds) {
        const element = document.getElementById(id);
        if (!element) continue;
        if (element.getBoundingClientRect().top <= offset) {
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
      element.getBoundingClientRect().top + window.scrollY - readSubnavScrollOffsetPx() + 1;

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
