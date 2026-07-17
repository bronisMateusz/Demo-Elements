import { useCallback, useEffect, useState } from "react";

const STORAGE_KEY = "elements-product-favorites";
const CHANGE_EVENT = "elements-favorites-changed";

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
  window.dispatchEvent(new Event(CHANGE_EVENT));
}

function useFavoritesList() {
  const [favorites, setFavorites] = useState(readFavorites);

  useEffect(() => {
    const sync = () => setFavorites(readFavorites());
    window.addEventListener(CHANGE_EVENT, sync);
    window.addEventListener("storage", sync);
    return () => {
      window.removeEventListener(CHANGE_EVENT, sync);
      window.removeEventListener("storage", sync);
    };
  }, []);

  return [favorites, setFavorites] as const;
}

export function useProductFavorites(sku: string) {
  const [favorites, setFavorites] = useFavoritesList();

  const isFavorite = favorites.includes(sku);

  const toggle = useCallback(() => {
    setFavorites((current) => {
      const next = current.includes(sku)
        ? current.filter((entry) => entry !== sku)
        : [...current, sku];

      writeFavorites(next);
      return next;
    });
  }, [setFavorites, sku]);

  return { isFavorite, toggle };
}

/** Bookmark count for header / drawer badge — stays in sync across tabs and toggles. */
export function useProductFavoritesCount() {
  const [favorites] = useFavoritesList();
  return favorites.length;
}
