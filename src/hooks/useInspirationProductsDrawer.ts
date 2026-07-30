import { useEffect } from "react";
import type { InspirationArrangement } from "../types/product";

const OPEN_EVENT = "elements-inspiration-products-open";

/** Opens the site-wide arrangement products drawer (listened to by Header). */
export function requestInspirationProductsDrawer(
  arrangement: InspirationArrangement,
) {
  window.dispatchEvent(
    new CustomEvent<InspirationArrangement>(OPEN_EVENT, {
      detail: arrangement,
    }),
  );
}

export function useInspirationProductsDrawerRequest(
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
