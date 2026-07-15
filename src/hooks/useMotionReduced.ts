import { useReducedMotion } from "motion/react";
import { useEffect, useState } from "react";
import { isMotionPaused, subscribeMotionPreference } from "../lib/a11yPreferences";

export function useMotionReduced() {
  const systemReduce = useReducedMotion();
  const [paused, setPaused] = useState(() =>
    typeof window !== "undefined" ? isMotionPaused() : false,
  );

  useEffect(() => subscribeMotionPreference(setPaused), []);

  return Boolean(systemReduce || paused);
}
