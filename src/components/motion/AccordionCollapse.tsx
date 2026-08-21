import { AnimatePresence, motion } from "motion/react";
import type { ReactNode } from "react";
import { useMotionReduced } from "../../hooks/useMotionReduced";
import { EASE_LUXURY } from "../../lib/motionEase";
import { cn } from "../../lib/cn";

const ACCORDION_DURATION_S = 0.45;

type AccordionCollapseProps = {
  open: boolean;
  id?: string;
  children: ReactNode;
  className?: string;
  /** Extra class on the inner padded wrapper (e.g. `pt-4`). */
  innerClassName?: string;
};

/** Height + opacity collapse used by PDP / footer mobile accordions. */
export function AccordionCollapse({
  open,
  id,
  children,
  className,
  innerClassName,
}: AccordionCollapseProps) {
  const reduceMotion = useMotionReduced();
  const transition = reduceMotion
    ? { duration: 0 }
    : { duration: ACCORDION_DURATION_S, ease: EASE_LUXURY };

  return (
    <AnimatePresence initial={false}>
      {open ? (
        <motion.div
          id={id}
          key="accordion-panel"
          initial={reduceMotion ? false : { height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={transition}
          className={cn("overflow-hidden", className)}
        >
          <div className={innerClassName}>{children}</div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
