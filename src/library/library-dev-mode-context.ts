import { createContext } from "react";

export type LibraryDevModeContextValue = {
  devMode: boolean;
  setDevMode: (enabled: boolean) => void;
};

export const LibraryDevModeContext = createContext<LibraryDevModeContextValue | null>(null);
