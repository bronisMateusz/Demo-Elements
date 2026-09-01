import type { InspirationArrangement } from "../../types/product";
import type { InspirationGalleryCardAction } from "./InspirationGalleryCard";

/** Card action derived from arrangement fields (shared by carousel and grid). */
export function inspirationCardActionFor(
  arrangement: InspirationArrangement,
): InspirationGalleryCardAction {
  if (arrangement.href) return "link";
  if (arrangement.showProducts) return "products";
  return "lightbox";
}
