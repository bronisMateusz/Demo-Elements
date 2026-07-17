import { useCallback, useEffect, useState } from "react";
import { salonOptions, type SalonOption } from "../data/nav";

const STORAGE_KEY = "elements-selected-salon";
const CHANGE_EVENT = "elements-salon-changed";
const OPEN_EVENT = "elements-salon-open";

function readSelectedSalonId(): string | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    return salonOptions.some((salon) => salon.id === raw) ? raw : null;
  } catch {
    return null;
  }
}

function writeSelectedSalonId(id: string | null) {
  if (id == null) {
    localStorage.removeItem(STORAGE_KEY);
  } else {
    localStorage.setItem(STORAGE_KEY, id);
  }
  window.dispatchEvent(new Event(CHANGE_EVENT));
}

/** Opens the site-wide salon drawer (listened to by Header). */
export function requestSalonDrawer() {
  window.dispatchEvent(new Event(OPEN_EVENT));
}

export function useSalonDrawerRequest(onOpen: () => void) {
  useEffect(() => {
    window.addEventListener(OPEN_EVENT, onOpen);
    return () => window.removeEventListener(OPEN_EVENT, onOpen);
  }, [onOpen]);
}

export function useSelectedSalon() {
  const [salonId, setSalonId] = useState(readSelectedSalonId);

  useEffect(() => {
    const sync = () => setSalonId(readSelectedSalonId());
    window.addEventListener(CHANGE_EVENT, sync);
    window.addEventListener("storage", sync);
    return () => {
      window.removeEventListener(CHANGE_EVENT, sync);
      window.removeEventListener("storage", sync);
    };
  }, []);

  const salon: SalonOption | null =
    salonOptions.find((entry) => entry.id === salonId) ?? null;

  const select = useCallback((id: string) => {
    if (!salonOptions.some((entry) => entry.id === id)) return;
    writeSelectedSalonId(id);
    setSalonId(id);
  }, []);

  const clear = useCallback(() => {
    writeSelectedSalonId(null);
    setSalonId(null);
  }, []);

  return { salon, select, clear };
}
