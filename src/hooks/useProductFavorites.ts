import { useCallback, useSyncExternalStore } from "react";
import {
  defaultWishlistArrangementIds,
  defaultWishlistProductIds,
} from "../data/wishlist";

const PRODUCT_KEY = "elements-product-favorites-v2";
const ARRANGEMENT_KEY = "elements-arrangement-favorites-v2";

type Listener = () => void;

const listeners = new Set<Listener>();

function notify() {
  listeners.forEach((listener) => listener());
}

function readIds(key: string, fallback: readonly string[]): string[] {
  try {
    const raw = localStorage.getItem(key);
    if (raw === null) return [...fallback];

    const parsed: unknown = JSON.parse(raw);
    return Array.isArray(parsed)
      ? parsed.filter((entry): entry is string => typeof entry === "string")
      : [...fallback];
  } catch {
    return [...fallback];
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

function readProductIds() {
  return readIds(PRODUCT_KEY, defaultWishlistProductIds);
}

function readArrangementIds() {
  return readIds(ARRANGEMENT_KEY, defaultWishlistArrangementIds);
}

/** Stable string snapshot so useSyncExternalStore can bail out on equal data. */
function getProductSnapshot() {
  return readProductIds().join("\0");
}

function getArrangementSnapshot() {
  return readArrangementIds().join("\0");
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
    const current = readProductIds();
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
    const current = readArrangementIds();
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
