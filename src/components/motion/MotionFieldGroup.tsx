import { MotionConfig } from "motion/react";
import type { ReactNode } from "react";
import { useMotionReduced } from "../../hooks/useMotionReduced";
import { SPRING_LAYOUT } from "../../lib/motionEase";

type MotionFieldGroupProps = {
  children: ReactNode;
};

/** MotionConfig wrapper with reduced-motion fallback for variant fields and similar UI. */
export function MotionFieldGroup({ children }: MotionFieldGroupProps) {
  const reduce = useMotionReduced();

  return (
    <MotionConfig transition={reduce ? { duration: 0 } : SPRING_LAYOUT}>{children}</MotionConfig>
  );
}
