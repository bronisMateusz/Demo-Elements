import { useEffect } from "react";
import type { InspirationArrangement } from "../types/product";

const OPEN_EVENT = "elements-inspiration-ask-open";

/** Opens the site-wide arrangement ask drawer (listened to by Header). */
export function requestInspirationAskDrawer(
  arrangement: InspirationArrangement,
) {
  window.dispatchEvent(
    new CustomEvent<InspirationArrangement>(OPEN_EVENT, {
      detail: arrangement,
    }),
  );
}

export function useInspirationAskDrawerRequest(
  onOpen: (arrangement: InspirationArrangement) => void,
) {
  useEffect(() => {
    const handler = (event: Event) => {
      const arrangement = (event as CustomEvent<InspirationArrangement>).detail;
      if (arrangement) onOpen(arrangement);
    };

    window.addEventListener(OPEN_EVENT, handler);
    return () => window.removeEventListener(OPEN_EVENT, handler);
  }, [onOpen]);
}
