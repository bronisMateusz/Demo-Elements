import { useCallback, useSyncExternalStore } from "react";

const PRODUCT_KEY = "elements-product-favorites";
const ARRANGEMENT_KEY = "elements-arrangement-favorites";

type Listener = () => void;

const listeners = new Set<Listener>();

function notify() {
  listeners.forEach((listener) => listener());
}

function readIds(key: string): string[] {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return [];

    const parsed: unknown = JSON.parse(raw);
    return Array.isArray(parsed)
      ? parsed.filter((entry): entry is string => typeof entry === "string")
      : [];
  } catch {
    return [];
  }
}

function writeIds(key: string, ids: string[]) {
  localStorage.setItem(key, JSON.stringify(ids));
  notify();
}

function subscribe(listener: Listener) {
  listeners.add(listener);
  const onStorage = (event: StorageEvent) => {
    if (
      event.key === PRODUCT_KEY ||
      event.key === ARRANGEMENT_KEY ||
      event.key === null
    ) {
      listener();
    }
  };
  window.addEventListener("storage", onStorage);
  return () => {
    listeners.delete(listener);
    window.removeEventListener("storage", onStorage);
  };
}

/** Stable string snapshot so useSyncExternalStore can bail out on equal data. */
function getProductSnapshot() {
  return readIds(PRODUCT_KEY).join("\0");
}

function getArrangementSnapshot() {
  return readIds(ARRANGEMENT_KEY).join("\0");
}

function getServerSnapshot() {
  return "";
}

function useIdList(getSnapshot: () => string) {
  const snapshot = useSyncExternalStore(
    subscribe,
    getSnapshot,
    getServerSnapshot,
  );
  return snapshot === "" ? [] : snapshot.split("\0");
}

export function useProductFavorites(sku: string) {
  const favorites = useIdList(getProductSnapshot);
  const isFavorite = favorites.includes(sku);

  const toggle = useCallback(() => {
    const current = readIds(PRODUCT_KEY);
    const next = current.includes(sku)
      ? current.filter((entry) => entry !== sku)
      : [...current, sku];
    writeIds(PRODUCT_KEY, next);
  }, [sku]);

  return { isFavorite, toggle };
}

/** Bookmark count for header / drawer badge - stays in sync across tabs and toggles. */
export function useProductFavoritesCount() {
  return useIdList(getProductSnapshot).length;
}

export function useFavoriteProductIds() {
  return useIdList(getProductSnapshot);
}

export function useFavoriteArrangementIds() {
  return useIdList(getArrangementSnapshot);
}

export function useArrangementFavorites(id: string) {
  const favorites = useIdList(getArrangementSnapshot);
  const isFavorite = favorites.includes(id);

  const toggle = useCallback(() => {
    const current = readIds(ARRANGEMENT_KEY);
    const next = current.includes(id)
      ? current.filter((entry) => entry !== id)
      : [...current, id];
    writeIds(ARRANGEMENT_KEY, next);
  }, [id]);

  return { isFavorite, toggle };
}

export function clearAllFavorites() {
  writeIds(PRODUCT_KEY, []);
  writeIds(ARRANGEMENT_KEY, []);
}

export function useFavoritesTotalCount() {
  return (
    useIdList(getProductSnapshot).length +
    useIdList(getArrangementSnapshot).length
  );
}
