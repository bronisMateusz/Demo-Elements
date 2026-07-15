import { useEffect, useState } from "react";
import type { RelatedProduct } from "../types/product";

const STORAGE_KEY = "elements-recently-viewed";
const RECENTLY_VIEWED_EVENT = "elements:recently-viewed";
const MAX_ITEMS = 12;

function isRelatedProduct(value: unknown): value is RelatedProduct {
  if (!value || typeof value !== "object") return false;
  const entry = value as RelatedProduct;
  return (
    typeof entry.id === "string" &&
    typeof entry.brand === "string" &&
    typeof entry.title === "string" &&
    typeof entry.href === "string" &&
    entry.image &&
    typeof entry.image.src === "string"
  );
}

function readRecentlyViewed(): RelatedProduct[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];

    const parsed: unknown = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];

    return parsed.filter(isRelatedProduct);
  } catch {
    return [];
  }
}

function writeRecentlyViewed(items: RelatedProduct[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
}

function resolveRecentlyViewedProducts(
  currentProductId: string,
  seedProducts: RelatedProduct[],
): RelatedProduct[] {
  const stored = readRecentlyViewed().filter((item) => item.id !== currentProductId);
  return stored.length ? stored : seedProducts;
}

export function recordRecentlyViewedProduct(entry: RelatedProduct) {
  const next = [entry, ...readRecentlyViewed().filter((item) => item.id !== entry.id)].slice(
    0,
    MAX_ITEMS,
  );
  writeRecentlyViewed(next);
  window.dispatchEvent(new CustomEvent(RECENTLY_VIEWED_EVENT));
}

export function useRecentlyViewedProducts(
  currentProductId: string,
  seedProducts: RelatedProduct[] = [],
) {
  const [items, setItems] = useState(() =>
    resolveRecentlyViewedProducts(currentProductId, seedProducts),
  );

  useEffect(() => {
    const sync = () => setItems(resolveRecentlyViewedProducts(currentProductId, seedProducts));

    window.addEventListener(RECENTLY_VIEWED_EVENT, sync);
    return () => window.removeEventListener(RECENTLY_VIEWED_EVENT, sync);
  }, [currentProductId, seedProducts]);

  return items;
}
