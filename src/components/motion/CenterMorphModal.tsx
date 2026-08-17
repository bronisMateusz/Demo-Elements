// beui.dev/components/motion/center-morph-modal
// Surface unfolds from the panel center via clip-path (radius stays constant).

import { AnimatePresence, motion, useIsPresent } from "motion/react";
import { useEffect, useId, useRef, type ReactNode } from "react";
import { createPortal } from "react-dom";
import { useMotionReduced } from "../../hooks/useMotionReduced";
import { lockPageScroll } from "../../hooks/useSiteChrome";
import { cn } from "../../lib/cn";
import { EASE_OUT } from "../../lib/motionEase";
import { IconButton } from "../ui/IconButton";

const FOCUSABLE_SELECTOR = [
  "a[href]",
  "button:not([disabled])",
  "input:not([disabled])",
  "select:not([disabled])",
  "textarea:not([disabled])",
  '[tabindex]:not([tabindex="-1"])',
].join(",");

const CLIP_RADIUS_PX = 2;
const CENTER_FOLDED_CLIP = `inset(48% 48% 48% 48% round ${CLIP_RADIUS_PX}px)`;
const CENTER_OPEN_CLIP = `inset(0% 0% 0% 0% round ${CLIP_RADIUS_PX}px)`;
const CENTER_UNFOLD_EASE = [0.2, 0, 0.2, 1] as const;
const CENTER_UNFOLD_TRANSITION = {
  duration: 0.43,
  ease: CENTER_UNFOLD_EASE,
} as const;

type CenterMorphModalProps = {
  open: boolean;
  onClose: () => void;
  title: string;
  description?: string;
  closeLabel?: string;
  children?: ReactNode;
  className?: string;
};

function getFocusableElements(root: HTMLElement | null) {
  if (!root) return [];
  return Array.from(
    root.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR),
  ).filter((element) => element.tabIndex >= 0);
}

function PresencePointerGate({
  children,
}: {
  children: (isPresent: boolean) => ReactNode;
}) {
  return children(useIsPresent());
}

export function CenterMorphModal({
  open,
  onClose,
  title,
  description,
  closeLabel = "Zamknij",
  children,
  className,
}: CenterMorphModalProps) {
  const reduce = useMotionReduced();
  const titleId = useId();
  const descriptionId = useId();
  const overlayRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const lastFocusRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    lockPageScroll(open);
    return () => lockPageScroll(false);
  }, [open]);

  useEffect(() => {
    if (!open) return;

    lastFocusRef.current =
      document.activeElement instanceof HTMLElement
        ? document.activeElement
        : null;

    const focusFrame = requestAnimationFrame(() => {
      const [firstFocusable] = getFocusableElements(overlayRef.current);
      (firstFocusable ?? panelRef.current)?.focus();
    });

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        onClose();
        return;
      }

      if (event.key !== "Tab") return;
      const focusable = getFocusableElements(overlayRef.current);
      if (focusable.length === 0) {
        event.preventDefault();
        panelRef.current?.focus();
        return;
      }

      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (!first || !last) return;
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => {
      cancelAnimationFrame(focusFrame);
      window.removeEventListener("keydown", onKeyDown);
      lastFocusRef.current?.focus();
    };
  }, [open, onClose]);

  if (typeof document === "undefined") return null;

  return createPortal(
    <AnimatePresence>
      {open ? (
        <motion.div
          key="center-morph-modal"
          ref={overlayRef}
          className="fixed inset-0 z-300 flex items-center justify-center px-4"
          role="presentation"
          initial={false}
          exit={{ opacity: 1 }}
          transition={
            reduce
              ? { duration: 0.14, ease: EASE_OUT }
              : CENTER_UNFOLD_TRANSITION
          }
        >
          <PresencePointerGate>
            {(isPresent) => (
              <>
                <motion.button
                  type="button"
                  aria-label={closeLabel}
                  tabIndex={-1}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  style={{ pointerEvents: isPresent ? "auto" : "none" }}
                  transition={{
                    duration: reduce ? 0.1 : 0.28,
                    ease: EASE_OUT,
                  }}
                  onClick={onClose}
                  className="absolute inset-0 cursor-default bg-black/50"
                />

                <div className="relative w-full max-w-160 filter-[drop-shadow(0_0.5rem_1.5rem_rgba(26,24,21,0.18))]">
                  <motion.div
                    ref={panelRef}
                    role="dialog"
                    aria-modal="true"
                    aria-labelledby={titleId}
                    aria-describedby={description ? descriptionId : undefined}
                    tabIndex={-1}
                    initial={
                      reduce
                        ? { opacity: 0, clipPath: CENTER_OPEN_CLIP }
                        : { opacity: 1, clipPath: CENTER_FOLDED_CLIP }
                    }
                    animate={{ opacity: 1, clipPath: CENTER_OPEN_CLIP }}
                    exit={
                      reduce
                        ? { opacity: 0, clipPath: CENTER_OPEN_CLIP }
                        : { opacity: 1, clipPath: CENTER_FOLDED_CLIP }
                    }
                    style={{ pointerEvents: isPresent ? "auto" : "none" }}
                    transition={
                      reduce
                        ? { duration: 0.14, ease: EASE_OUT }
                        : CENTER_UNFOLD_TRANSITION
                    }
                    className={cn(
                      "relative origin-center overflow-hidden rounded-xs border border-neutral-200 bg-neutral-0 will-change-[clip-path]",
                      className,
                    )}
                  >
                    <div className="p-6 md:p-8">
                      <div className="flex items-center justify-between gap-4">
                        <h2
                          id={titleId}
                          className="m-0 font-heading text-xl leading-none font-medium text-neutral-900"
                        >
                          {title}
                        </h2>
                        <motion.div
                          className="shrink-0"
                          initial={
                            reduce ? { opacity: 0 } : { opacity: 0, scale: 0.8 }
                          }
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{
                            opacity: 0,
                            scale: reduce ? 1 : 0.88,
                            transition: { duration: 0.1, ease: EASE_OUT },
                          }}
                          transition={{
                            delay: reduce ? 0 : 0.16,
                            duration: reduce ? 0.12 : 0.2,
                            ease: EASE_OUT,
                          }}
                        >
                          <IconButton
                            label={closeLabel}
                            iconClass="ph ph-x"
                            onClick={onClose}
                          />
                        </motion.div>
                      </div>
                      {description ? (
                        <p
                          id={descriptionId}
                          className="mt-3 mb-0 font-body text-sm leading-relaxed text-neutral-600"
                        >
                          {description}
                        </p>
                      ) : null}
                      {children}
                    </div>
                  </motion.div>
                </div>
              </>
            )}
          </PresencePointerGate>
        </motion.div>
      ) : null}
    </AnimatePresence>,
    document.body,
  );
}
