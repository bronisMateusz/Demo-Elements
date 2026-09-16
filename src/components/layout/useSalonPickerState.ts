import { useId, useMemo, useState } from "react";
import { distanceKm } from "../../lib/geo";
import { salonDrawerCopy, salonOptions } from "../../data/nav";
import type { SalonPickerResult } from "./salonPickerTypes";

type UserCoords = {
  lat: number;
  lng: number;
};

type LocateStatus = "idle" | "loading" | "ready" | "error";

export function useSalonPickerState(selectedSalonId?: string | null) {
  const searchId = useId();
  const [query, setQuery] = useState("");
  const [userCoords, setUserCoords] = useState<UserCoords | null>(null);
  const [locateStatus, setLocateStatus] = useState<LocateStatus>("idle");
  const [locateError, setLocateError] = useState<string | null>(null);

  const filteredSalons = useMemo((): SalonPickerResult[] => {
    const normalized = query.trim().toLowerCase();
    const matched = normalized
      ? salonOptions.filter(
          (salon) =>
            salon.name.toLowerCase().includes(normalized) ||
            salon.address.toLowerCase().includes(normalized),
        )
      : [...salonOptions];

    if (!userCoords) {
      return matched.map((salon) => ({
        salon,
        distanceKm: null as number | null,
      }));
    }

    return matched
      .map((salon) => ({
        salon,
        distanceKm: distanceKm(
          userCoords.lat,
          userCoords.lng,
          salon.lat,
          salon.lng,
        ),
      }))
      .sort((a, b) => (a.distanceKm ?? 0) - (b.distanceKm ?? 0));
  }, [query, userCoords]);

  const locateNearestSalon = () => {
    if (!navigator.geolocation) {
      setLocateStatus("error");
      setLocateError(salonDrawerCopy.locateUnsupported);
      return;
    }

    setLocateStatus("loading");
    setLocateError(null);

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setUserCoords({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
        setQuery("");
        setLocateStatus("ready");
      },
      (error) => {
        setLocateStatus("error");
        setLocateError(
          error.code === error.PERMISSION_DENIED
            ? salonDrawerCopy.locateDenied
            : salonDrawerCopy.locateUnavailable,
        );
      },
      {
        enableHighAccuracy: false,
        timeout: 12_000,
        maximumAge: 60_000,
      },
    );
  };

  return {
    searchId,
    query,
    setQuery,
    filteredSalons,
    locateNearestSalon,
    locateBusy: locateStatus === "loading",
    locateError,
    showNearestHint: locateStatus === "ready" && Boolean(userCoords),
    selectedSalonId,
  };
}
