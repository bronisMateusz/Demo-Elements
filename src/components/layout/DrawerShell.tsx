import { useEffect, useRef, type ReactNode } from "react";
import { AnimatePresence, motion } from "motion/react";
import { cn } from "../../lib/cn";
import { EASE_LUXURY } from "../../lib/motionEase";
import { lockPageScroll } from "../../hooks/useSiteChrome";
import { useMotionReduced } from "../../hooks/useMotionReduced";
import { IconButton } from "../ui/IconButton";

const PANEL_DURATION_S = 0.4;
const BACKDROP_DURATION_S = 0.28;

type DrawerShellProps = {
  open: boolean;
  onClose: () => void;
  label: string;
  closeLabel: string;
  children: ReactNode;
  /** Extra classes on the fixed root (e.g. `lg:hidden`). */
  className?: string;
};

export function DrawerShell({
  open,
  onClose,
  label,
  closeLabel,
  children,
  className,
}: DrawerShellProps) {
  const reduce = useMotionReduced();
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    lockPageScroll(open);
    return () => lockPageScroll(false);
  }, [open]);

  useEffect(() => {
    if (!open) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    document.addEventListener("keydown", onKeyDown);
    panelRef.current?.focus();
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open, onClose]);

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

type DrawerHeaderProps = {
  title: string;
  description?: string;
  closeLabel: string;
  onClose: () => void;
  /** Compact header without description (e.g. mobile menu). */
  compact?: boolean;
};

export function DrawerHeader({
  title,
  description,
  closeLabel,
  onClose,
  compact = false,
}: DrawerHeaderProps) {
  if (compact) {
    return (
      <div className="flex items-center justify-between border-b border-neutral-200 px-gutter py-8">
        <span className="font-heading text-xl text-neutral-900">{title}</span>
        <IconButton label={closeLabel} iconClass="ph ph-x" onClick={onClose} />
      </div>
    );
  }

  return (
    <div className="flex items-start justify-between gap-4 border-b border-neutral-200 px-gutter pt-8 pb-8">
      <div className="min-w-0 pr-2">
        <p className="m-0 font-body text-xl font-medium text-neutral-900">{title}</p>
        {description ? (
          <p className="mt-2 mb-0 text-sm leading-relaxed text-neutral-500">{description}</p>
        ) : null}
      </div>
      <IconButton
        label={closeLabel}
        iconClass="ph ph-x"
        onClick={onClose}
        className="-mt-2 -mr-2"
      />
    </div>
  );
}
