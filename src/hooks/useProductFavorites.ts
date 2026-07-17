import { useCallback, useSyncExternalStore } from "react";

const STORAGE_KEY = "elements-product-favorites";

type Listener = () => void;

const listeners = new Set<Listener>();

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
  listeners.forEach((listener) => listener());
}

function subscribe(listener: Listener) {
  listeners.add(listener);
  const onStorage = (event: StorageEvent) => {
    if (event.key === STORAGE_KEY || event.key === null) listener();
  };
  window.addEventListener("storage", onStorage);
  return () => {
    listeners.delete(listener);
    window.removeEventListener("storage", onStorage);
  };
}

/** Stable string snapshot so useSyncExternalStore can bail out on equal data. */
function getFavoritesSnapshot() {
  return readFavorites().join("\0");
}

function getFavoritesServerSnapshot() {
  return "";
}

function useFavoritesList() {
  const snapshot = useSyncExternalStore(
    subscribe,
    getFavoritesSnapshot,
    getFavoritesServerSnapshot,
  );
  return snapshot === "" ? [] : snapshot.split("\0");
}

export function useProductFavorites(sku: string) {
  const favorites = useFavoritesList();
  const isFavorite = favorites.includes(sku);

  const toggle = useCallback(() => {
    const current = readFavorites();
    const next = current.includes(sku)
      ? current.filter((entry) => entry !== sku)
      : [...current, sku];
    writeFavorites(next);
  }, [sku]);

  return { isFavorite, toggle };
}

/** Bookmark count for header / drawer badge - stays in sync across tabs and toggles. */
export function useProductFavoritesCount() {
  return useFavoritesList().length;
}
