import type { ProductImage } from "../types/product";

/** Konwertuje focal point (0–100, jak w Drupal) na wartość CSS object-position. */
export function productImageObjectPosition(image: ProductImage): string | undefined {
  if (!image.focalPoint) return undefined;
  return `${image.focalPoint.x}% ${image.focalPoint.y}%`;
}
