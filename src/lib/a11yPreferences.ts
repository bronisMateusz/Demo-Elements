const MOTION_KEY = "elements-pause-motion";
const MOTION_EVENT = "elements:motion-preference";

export function isMotionPaused(): boolean {
  const stored = localStorage.getItem(MOTION_KEY);
  if (stored === "1") return true;
  if (stored === "0") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function setMotionPaused(paused: boolean): void {
  localStorage.setItem(MOTION_KEY, paused ? "1" : "0");
  applyPreferences();
}

export function applyPreferences(): void {
  const motionPaused = isMotionPaused();
  document.documentElement.classList.toggle("elements-pause-motion", motionPaused);

  window.dispatchEvent(
    new CustomEvent(MOTION_EVENT, { detail: { paused: motionPaused } }),
  );
}

export function subscribeMotionPreference(callback: (paused: boolean) => void): () => void {
  const handler = (event: Event) => {
    const custom = event as CustomEvent<{ paused: boolean }>;
    callback(custom.detail.paused);
  };
  window.addEventListener(MOTION_EVENT, handler);
  return () => window.removeEventListener(MOTION_EVENT, handler);
}

let initialized = false;

export function initA11yPreferences(): void {
  if (initialized) return;
  initialized = true;

  applyPreferences();

  window.elementsMotion = {
    isPaused: isMotionPaused,
    setPaused: setMotionPaused,
    subscribe: subscribeMotionPreference,
  };

  window.matchMedia("(prefers-reduced-motion: reduce)").addEventListener("change", () => {
    if (localStorage.getItem(MOTION_KEY) === null) applyPreferences();
  });
}

declare global {
  interface Window {
    elementsMotion?: {
      isPaused: () => boolean;
      setPaused: (paused: boolean) => void;
      subscribe: (callback: (paused: boolean) => void) => () => void;
    };
  }
}
