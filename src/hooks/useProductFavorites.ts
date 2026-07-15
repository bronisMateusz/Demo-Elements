import { useCallback, useState } from "react";

const STORAGE_KEY = "elements-product-favorites";

function readFavorites(): string[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];

    const parsed: unknown = JSON.parse(raw);
    return Array.isArray(parsed)
      ? parsed.filter((entry): entry is string => typeof entry === "string")
      : [];
  } catch {
    return [];
  }
}

function writeFavorites(favorites: string[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites));
}

export function useProductFavorites(sku: string) {
  const [favorites, setFavorites] = useState(readFavorites);

  const isFavorite = favorites.includes(sku);

  const toggle = useCallback(() => {
    setFavorites((current) => {
      const next = current.includes(sku)
        ? current.filter((entry) => entry !== sku)
        : [...current, sku];

      writeFavorites(next);
      return next;
    });
  }, [sku]);

  return { isFavorite, toggle };
}
