import { type ReactNode, type Ref } from "react";
import { AnimatePresence, motion } from "motion/react";
import { cn } from "../../lib/cn";
import { EASE_LUXURY } from "../../lib/motionEase";
import { useMotionReduced } from "../../hooks/useMotionReduced";

const PANEL_DURATION_S = 0.4;
const BACKDROP_DURATION_S = 0.28;

type DrawerShellProps = {
  open: boolean;
  onClose: () => void;
  label: string;
  closeLabel: string;
  children: ReactNode;
  panelRef?: Ref<HTMLDivElement>;
  /** Extra classes on the fixed root (e.g. `lg:hidden`). */
  className?: string;
};

export function DrawerShell({
  open,
  onClose,
  label,
  closeLabel,
  children,
  panelRef,
  className,
}: DrawerShellProps) {
  const reduce = useMotionReduced();

  return (
    <AnimatePresence>
      {open ? (
        <div className={cn("fixed inset-0 z-[200]", className)} role="presentation">
          <motion.button
            type="button"
            className="absolute inset-0 bg-black/50"
            aria-label={closeLabel}
            onClick={onClose}
            initial={reduce ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{
              duration: reduce ? 0 : BACKDROP_DURATION_S,
              ease: EASE_LUXURY,
            }}
          />
          <motion.div
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-label={label}
            tabIndex={-1}
            className="absolute right-0 top-0 flex h-full w-[95vw] max-w-drawer flex-col bg-neutral-0 shadow-2 will-change-transform"
            initial={reduce ? false : { x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{
              duration: reduce ? 0 : PANEL_DURATION_S,
              ease: EASE_LUXURY,
            }}
          >
            {children}
          </motion.div>
        </div>
      ) : null}
    </AnimatePresence>
  );
}
