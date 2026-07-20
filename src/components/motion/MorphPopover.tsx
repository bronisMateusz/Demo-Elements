// beui.dev/components/motion/popover (Morph variant)

import { AnimatePresence, motion } from "motion/react";
import {
  cloneElement,
  createContext,
  isValidElement,
  useCallback,
  useContext,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
  type ReactElement,
  type ReactNode,
} from "react";
import { cn } from "../../lib/cn";
import { SPRING_PANEL } from "../../lib/motionEase";
import { useMotionReduced } from "../../hooks/useMotionReduced";

type Side = "top" | "bottom";
type Align = "start" | "end";
type TriggerMode = "click" | "hover";

const HOVER_CLOSE_DELAY_MS = 120;

type MorphContextValue = {
  open: boolean;
  setOpen: (open: boolean) => void;
  toggle: () => void;
  triggerMode: TriggerMode;
  triggerId: string;
  contentId: string;
};

const MorphContext = createContext<MorphContextValue | null>(null);

function useMorphContext(component: string) {
  const ctx = useContext(MorphContext);
  if (!ctx) throw new Error(`${component} must be used within <MorphPopover>`);
  return ctx;
}

export type MorphPopoverProps = {
  children: ReactNode;
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  /** How the popover is summoned. Default "click". */
  trigger?: TriggerMode;
  className?: string;
};

/**
 * Panel morphs open from the trigger corner: laid out full size but clipped to
 * the nearest corner, then unclips as one piece. Closes on outside pointer /
 * Escape (click mode) or after a short hover grace window.
 */
export function MorphPopover({
  children,
  open: controlledOpen,
  defaultOpen = false,
  onOpenChange,
  trigger = "click",
  className,
}: MorphPopoverProps) {
  const baseId = useId();
  const rootRef = useRef<HTMLDivElement>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [internalOpen, setInternalOpen] = useState(defaultOpen);
  const controlled = controlledOpen !== undefined;
  const open = controlled ? controlledOpen : internalOpen;

  const setOpen = useCallback(
    (next: boolean) => {
      if (!controlled) setInternalOpen(next);
      onOpenChange?.(next);
    },
    [controlled, onOpenChange],
  );

  const cancelClose = useCallback(() => {
    if (closeTimer.current) {
      clearTimeout(closeTimer.current);
      closeTimer.current = null;
    }
  }, []);

  const openHover = useCallback(() => {
    cancelClose();
    setOpen(true);
  }, [cancelClose, setOpen]);

  const scheduleClose = useCallback(() => {
    cancelClose();
    closeTimer.current = setTimeout(() => setOpen(false), HOVER_CLOSE_DELAY_MS);
  }, [cancelClose, setOpen]);

  const toggle = useCallback(() => setOpen(!open), [setOpen, open]);

  useEffect(() => () => cancelClose(), [cancelClose]);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    const onPointer = (event: PointerEvent) => {
      if (rootRef.current && !rootRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };
    window.addEventListener("keydown", onKey);
    if (trigger === "click") {
      window.addEventListener("pointerdown", onPointer);
    }
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("pointerdown", onPointer);
    };
  }, [open, setOpen, trigger]);

  const ctx = useMemo<MorphContextValue>(
    () => ({
      open,
      setOpen,
      toggle,
      triggerMode: trigger,
      triggerId: `${baseId}-trigger`,
      contentId: `${baseId}-content`,
    }),
    [open, setOpen, toggle, trigger, baseId],
  );

  const hoverHandlers =
    trigger === "hover"
      ? { onMouseEnter: openHover, onMouseLeave: scheduleClose }
      : {};

  return (
    <MorphContext.Provider value={ctx}>
      <div
        ref={rootRef}
        className={cn("relative inline-flex", className)}
        {...hoverHandlers}
      >
        {children}
      </div>
    </MorphContext.Provider>
  );
}

export type MorphPopoverTriggerProps = {
  children: ReactElement;
};

/** Wraps a single focusable element. Click mode toggles; hover mode only wires a11y. */
export function MorphPopoverTrigger({ children }: MorphPopoverTriggerProps) {
  const ctx = useMorphContext("MorphPopoverTrigger");
  if (!isValidElement(children)) return children;

  const child = children as ReactElement<Record<string, unknown>>;
  const childOnClick = child.props.onClick as ((event: unknown) => void) | undefined;

  return cloneElement(child, {
    id: ctx.triggerId,
    onClick: (event: unknown) => {
      childOnClick?.(event);
      if (ctx.triggerMode === "click") ctx.toggle();
    },
    onFocus: (event: unknown) => {
      const childOnFocus = child.props.onFocus as ((e: unknown) => void) | undefined;
      childOnFocus?.(event);
      if (ctx.triggerMode === "hover") ctx.setOpen(true);
    },
    onBlur: (event: unknown) => {
      const childOnBlur = child.props.onBlur as ((e: unknown) => void) | undefined;
      childOnBlur?.(event);
      if (ctx.triggerMode === "hover") ctx.setOpen(false);
    },
    "aria-haspopup": "dialog",
    "aria-expanded": ctx.open,
    "aria-controls": ctx.open ? ctx.contentId : undefined,
  });
}

const originFor = (side: Side, align: Align) =>
  `${side === "bottom" ? "top" : "bottom"} ${align === "end" ? "right" : "left"}`;

function clipHidden(side: Side, align: Align, radius: number) {
  const top = side === "bottom" ? "0%" : "92%";
  const bottom = side === "bottom" ? "92%" : "0%";
  const right = align === "end" ? "0%" : "92%";
  const left = align === "end" ? "92%" : "0%";
  return `inset(${top} ${right} ${bottom} ${left} round ${radius}px)`;
}

const clipShown = (radius: number) => `inset(0% 0% 0% 0% round ${radius}px)`;

export type MorphPopoverContentProps = {
  children: ReactNode;
  side?: Side;
  align?: Align;
  /** Gap between trigger and panel, in px. Default 8. */
  sideOffset?: number;
  /** Panel corner radius, in px. Default 2 (Elements rounded-xs). */
  radius?: number;
  className?: string;
};

export function MorphPopoverContent({
  children,
  side = "bottom",
  align = "end",
  sideOffset = 8,
  radius = 2,
  className,
}: MorphPopoverContentProps) {
  const ctx = useMorphContext("MorphPopoverContent");
  const reduce = useMotionReduced();

  const posClass = cn(
    side === "bottom" ? "top-full" : "bottom-full",
    align === "end" ? "right-0" : "left-0",
  );
  const marginStyle =
    side === "bottom" ? { marginTop: sideOffset } : { marginBottom: sideOffset };

  const wrap = reduce
    ? undefined
    : {
        hidden: { opacity: 0, scale: 0.96 },
        show: { opacity: 1, scale: 1, transition: SPRING_PANEL },
        exit: { opacity: 0, scale: 0.96, transition: SPRING_PANEL },
      };
  const clip = reduce
    ? undefined
    : {
        hidden: { clipPath: clipHidden(side, align, radius) },
        show: { clipPath: clipShown(radius), transition: SPRING_PANEL },
        exit: {
          clipPath: clipHidden(side, align, radius),
          transition: SPRING_PANEL,
        },
      };

  return (
    <AnimatePresence>
      {ctx.open ? (
        <motion.div
          variants={wrap}
          initial={reduce ? { opacity: 0 } : "hidden"}
          animate={reduce ? { opacity: 1 } : "show"}
          exit={reduce ? { opacity: 0 } : "exit"}
          transition={reduce ? { duration: 0.12 } : undefined}
          style={{ transformOrigin: originFor(side, align), ...marginStyle }}
          className={cn(
            "absolute z-30 [filter:drop-shadow(0_8px_24px_rgba(26,26,26,0.18))]",
            posClass,
          )}
        >
          <motion.div
            id={ctx.contentId}
            role="tooltip"
            variants={clip}
            style={{ borderRadius: radius }}
            className={cn("overflow-hidden", className)}
          >
            {children}
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
