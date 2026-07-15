import { useContext } from "react";
import { LibraryDevModeContext } from "../library-dev-mode-context";

export function useLibraryDevMode() {
  const context = useContext(LibraryDevModeContext);
  if (!context) {
    throw new Error("useLibraryDevMode must be used within LibraryDevModeProvider");
  }
  return context.devMode;
}

export function useLibraryDevModeActions() {
  const context = useContext(LibraryDevModeContext);
  if (!context) {
    throw new Error("useLibraryDevModeActions must be used within LibraryDevModeProvider");
  }
  return { devMode: context.devMode, setDevMode: context.setDevMode };
}
