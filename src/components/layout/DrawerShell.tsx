import { useEffect, useRef, type ReactNode } from "react";
import { createPortal } from "react-dom";
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

  if (typeof document === "undefined") return null;

  // Portal past reveal `translate` ancestors so fixed covers the viewport
  // above the sticky header instead of clipping under it.
  return createPortal(
    <AnimatePresence>
      {open ? (
        <div
          className={cn("fixed inset-0 z-200", className)}
          role="presentation"
        >
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
            className="absolute inset-e-0 top-0 flex h-full w-[95vw] max-w-125 flex-col bg-neutral-0 shadow-2 will-change-transform"
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
    </AnimatePresence>,
    document.body,
  );
}

type DrawerHeaderProps = {
  title: string;
  description?: string;
  closeLabel: string;
  onClose: () => void;
  /** Compact header without description (e.g. mobile menu). */
  compact?: boolean;
  /** Optional back control (drill-down panels). */
  onBack?: () => void;
  backLabel?: string;
  /** Phosphor icon beside the title (drill-down category headers). */
  titleIconClass?: string;
  /** Optional actions before the close control (e.g. “Wyczyść”). */
  actions?: ReactNode;
};

export function DrawerHeader({
  title,
  description,
  closeLabel,
  onClose,
  compact = false,
  onBack,
  backLabel = "Wróć",
  titleIconClass,
  actions,
}: DrawerHeaderProps) {
  if (compact) {
    return (
      <div className="flex h-18 shrink-0 items-center gap-2 border-b border-neutral-300 px-[clamp(0.75rem,2.222vw,2.5rem)]">
        {onBack ? (
          <IconButton
            label={backLabel}
            iconClass="ph ph-caret-left"
            variant="ghost"
            onClick={onBack}
          />
        ) : null}
        <span className="flex min-w-0 flex-1 items-center gap-2.5">
          {titleIconClass ? (
            <i
              className={cn(
                titleIconClass,
                "shrink-0 text-xl leading-none text-gold-500",
              )}
              aria-hidden="true"
            />
          ) : null}
          <span className="min-w-0 truncate font-heading text-xl leading-none text-neutral-900">
            {title}
          </span>
        </span>
        {actions}
        <IconButton
          label={closeLabel}
          iconClass="ph ph-x"
          variant="ghost"
          onClick={onClose}
        />
      </div>
    );
  }

  const hasDescription = Boolean(description);

  return (
    <div
      className={cn(
        "flex justify-between gap-4 border-b border-neutral-300 px-[clamp(0.75rem,2.222vw,2.5rem)]",
        hasDescription ? "items-start py-4 md:py-8" : "items-center py-4",
      )}
    >
      <div className="min-w-0 pe-2">
        <p className="m-0 font-body text-xl leading-none font-medium text-neutral-900">
          {title}
        </p>
        {hasDescription ? (
          <p className="mt-1.5 mb-0 text-sm leading-relaxed text-neutral-500 md:mt-2">
            {description}
          </p>
        ) : null}
      </div>
      <div className="flex shrink-0 items-center gap-2">
        {actions}
        <IconButton
          label={closeLabel}
          iconClass="ph ph-x"
          variant="ghost"
          onClick={onClose}
        />
      </div>
    </div>
  );
}
