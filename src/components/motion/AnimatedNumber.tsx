// beui.dev/components/motion/number — AnimatedNumber (count-up on view)

import { animate, useInView, useMotionValue, useMotionValueEvent } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { cn } from "../../lib/cn";
import { EASE_OUT } from "../../lib/motionEase";
import { useMotionReduced } from "../../hooks/useMotionReduced";

export type AnimatedNumberProps = {
  value: number;
  duration?: number;
  format?: (n: number) => string;
  className?: string;
  startOnView?: boolean;
};

export function AnimatedNumber({
  value,
  duration = 1.2,
  format = (n) => Math.round(n).toLocaleString("pl-PL"),
  className,
  startOnView = true,
}: AnimatedNumberProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const reduce = useMotionReduced();
  const motionValue = useMotionValue(0);
  const [display, setDisplay] = useState(0);
  const fromRef = useRef(0);
  const shouldRun = !startOnView || inView;

  useMotionValueEvent(motionValue, "change", (latest) => {
    setDisplay(latest);
  });

  useEffect(() => {
    if (!shouldRun) return;

    if (reduce) {
      fromRef.current = value;
      motionValue.set(value);
      return;
    }

    const controls = animate(fromRef.current, value, {
      duration,
      ease: EASE_OUT,
      onUpdate: (v) => motionValue.set(v),
    });
    fromRef.current = value;
    return () => controls.stop();
  }, [value, duration, shouldRun, reduce, motionValue]);

  return (
    <span ref={ref} className={cn("tabular-nums", className)}>
      {format(display)}
    </span>
  );
}
