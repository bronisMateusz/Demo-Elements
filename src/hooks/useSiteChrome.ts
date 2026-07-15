import { useEffect } from "react";

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
  document.documentElement.classList.toggle("has-drawer-open", locked);
}

export function lockLightboxScroll(locked: boolean) {
  document.documentElement.classList.toggle("has-lightbox-open", locked);
}
