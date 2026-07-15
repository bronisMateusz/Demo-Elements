import { useCallback, useEffect, useState, type PropsWithChildren } from "react";
import { LibraryDevModeContext } from "./library-dev-mode-context";

const STORAGE_KEY = "elements-library-dev-mode";

function readInitialDevMode() {
  if (typeof window === "undefined") return false;

  const params = new URLSearchParams(window.location.search);
  if (params.get("dev") === "1") return true;

  try {
    return sessionStorage.getItem(STORAGE_KEY) === "1";
  } catch {
    return false;
  }
}

function persistDevMode(enabled: boolean) {
  try {
    sessionStorage.setItem(STORAGE_KEY, enabled ? "1" : "0");
  } catch {
    /* ignore */
  }
}

export function LibraryDevModeProvider({ children }: PropsWithChildren) {
  const [devMode, setDevModeState] = useState(readInitialDevMode);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const params = new URLSearchParams(window.location.search);
    if (params.get("dev") === "1") {
      persistDevMode(true);
    }
  }, []);

  const setDevMode = useCallback((enabled: boolean) => {
    setDevModeState(enabled);
    persistDevMode(enabled);
  }, []);

  return (
    <LibraryDevModeContext.Provider value={{ devMode, setDevMode }}>
      {children}
    </LibraryDevModeContext.Provider>
  );
}
