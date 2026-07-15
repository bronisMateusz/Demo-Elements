import { useEffect, useState, type RefObject } from "react";
import { isMotionPaused, subscribeMotionPreference } from "../lib/a11yPreferences";

type UseScrollRevealProgressOptions = {
  /** Viewport ratio where reveal starts (element top). Default 0.85 */
  start?: number;
  /** Viewport ratio where reveal completes. Default 0.3 */
  end?: number;
};

export function useScrollRevealProgress(
  ref: RefObject<HTMLElement | null>,
  { start = 0.85, end = 0.3 }: UseScrollRevealProgressOptions = {},
) {
  const [progress, setProgress] = useState(() => (isMotionPaused() ? 1 : 0));

  useEffect(() => {
    const element = ref.current;
    if (!element || isMotionPaused()) return;

    const update = () => {
      const rect = element.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      const startY = viewportHeight * start;
      const endY = viewportHeight * end;

      if (rect.top >= startY) {
        setProgress(0);
        return;
      }

      if (rect.top <= endY) {
        setProgress(1);
        return;
      }

      setProgress((startY - rect.top) / (startY - endY));
    };

    let raf = 0;
    const scheduleUpdate = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(update);
    };

    scheduleUpdate();
    window.addEventListener("scroll", scheduleUpdate, { passive: true });
    window.addEventListener("resize", scheduleUpdate);

    const unsubscribe = subscribeMotionPreference((paused) => {
      if (paused) setProgress(1);
      else scheduleUpdate();
    });

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", scheduleUpdate);
      window.removeEventListener("resize", scheduleUpdate);
      unsubscribe();
    };
  }, [ref, start, end]);

  return progress;
}
