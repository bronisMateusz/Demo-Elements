import { useEffect } from "react";

const SCROLLBAR_COMPENSATION_VAR = "--scrollbar-compensation";

function applyScrollLock(className: "has-drawer-open" | "has-lightbox-open", locked: boolean) {
  const root = document.documentElement;
  const isLocked = root.classList.contains(className);
  if (locked === isLocked) return;

  if (locked) {
    // Reserve the scrollbar width so removing overflow does not shift the layout.
    const scrollbar = Math.max(0, window.innerWidth - root.clientWidth);
    if (scrollbar > 0) {
      root.style.setProperty(SCROLLBAR_COMPENSATION_VAR, `${scrollbar}px`);
      root.style.paddingInlineEnd = `${scrollbar}px`;
    }
    root.classList.add(className);
    return;
  }

  root.classList.remove(className);
  // Keep compensation while the other lock class is still active.
  if (
    !root.classList.contains("has-drawer-open") &&
    !root.classList.contains("has-lightbox-open")
  ) {
    root.style.paddingInlineEnd = "";
    root.style.removeProperty(SCROLLBAR_COMPENSATION_VAR);
  }
}

export function useSiteChrome() {
  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        document.documentElement.classList.remove("has-drawer-open");
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, []);
}

export function lockPageScroll(locked: boolean) {
  applyScrollLock("has-drawer-open", locked);
}

export function lockLightboxScroll(locked: boolean) {
  applyScrollLock("has-lightbox-open", locked);
}

/** Lift the sticky header above the lightbox while the closing fly-back plays. */
export function liftHeaderAboveLightbox(lifted: boolean) {
  document.documentElement.classList.toggle("lightbox-closing", lifted);
}
