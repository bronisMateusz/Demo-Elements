// beui.dev/components/motion/checkbox

import { AnimatePresence, motion } from "motion/react";
import { useId, type ReactNode } from "react";
import { cn } from "../../lib/cn";
import { EASE_OUT, SPRING_PRESS } from "../../lib/motionEase";
import { useMotionReduced } from "../../hooks/useMotionReduced";

const CHECK_PATH = "M5 13l4 4L19 7";
const INDETERMINATE_PATH = "M6 12h12";

export type CheckboxProps = {
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
  disabled?: boolean;
  indeterminate?: boolean;
  /** Plain string label - prefer `children` for rich copy with links. */
  label?: string;
  children?: ReactNode;
  className?: string;
  id?: string;
  name?: string;
  required?: boolean;
  "aria-label"?: string;
};

export function Checkbox({
  checked,
  onCheckedChange,
  disabled,
  indeterminate,
  label,
  children,
  className,
  id: idProp,
  name,
  required,
  "aria-label": ariaLabel,
}: CheckboxProps) {
  const autoId = useId();
  const id = idProp ?? autoId;
  const reduce = useMotionReduced();
  const showMark = checked || Boolean(indeterminate);
  const path = indeterminate ? INDETERMINATE_PATH : CHECK_PATH;
  const labelContent = children ?? label;

  return (
    <label
      htmlFor={id}
      className={cn(
        "inline-flex items-start gap-2.5",
        disabled ? "cursor-not-allowed" : "cursor-pointer",
        className,
      )}
    >
      {/* Native input keeps form `required` / name wiring. */}
      <input
        type="checkbox"
        name={name}
        checked={checked}
        required={required}
        disabled={disabled}
        tabIndex={-1}
        aria-hidden="true"
        className="sr-only"
        onChange={() => {
          if (!disabled) onCheckedChange(!checked);
        }}
      />
      <motion.button
        id={id}
        type="button"
        role="checkbox"
        aria-checked={indeterminate ? "mixed" : checked}
        aria-label={ariaLabel}
        aria-required={required || undefined}
        disabled={disabled}
        onClick={() => {
          if (!disabled) onCheckedChange(!checked);
        }}
        whileTap={reduce || disabled ? undefined : { scale: 0.92 }}
        transition={SPRING_PRESS}
        data-state={
          checked ? "checked" : indeterminate ? "indeterminate" : "unchecked"
        }
        className={cn(
          "mt-0.5 inline-flex size-4 shrink-0 items-center justify-center rounded-xs border-2 outline-none",
          "transition-colors duration-fast ease-out",
          "focus-visible:outline-2 focus-visible:outline-offset-[var(--spacing-focus-ring-offset)] focus-visible:outline-neutral-800",
          "disabled:cursor-not-allowed disabled:opacity-60",
          showMark
            ? "border-neutral-900 bg-neutral-900 text-neutral-0"
            : "border-neutral-300 bg-neutral-0 hover:border-neutral-600",
        )}
      >
        <AnimatePresence initial={false}>
          {showMark ? (
            <motion.svg
              key={indeterminate ? "indeterminate" : "checked"}
              width="10"
              height="10"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={3}
              strokeLinecap="round"
              strokeLinejoin="round"
              initial={reduce ? { opacity: 1 } : { opacity: 0, scale: 0.5 }}
              animate={reduce ? { opacity: 1 } : { opacity: 1, scale: 1 }}
              exit={
                reduce
                  ? { opacity: 0 }
                  : { opacity: 0, scale: 0.5, filter: "blur(4px)" }
              }
              transition={reduce ? { duration: 0 } : { duration: 0.16, ease: EASE_OUT }}
              aria-hidden
            >
              <motion.path
                d={path}
                initial={reduce ? { pathLength: 1 } : { pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={
                  reduce
                    ? { duration: 0 }
                    : {
                        duration: indeterminate ? 0.2 : 0.3,
                        ease: EASE_OUT,
                        delay: 0.04,
                      }
                }
              />
            </motion.svg>
          ) : null}
        </AnimatePresence>
      </motion.button>
      {labelContent ? (
        <span className={cn("min-w-0 select-none", disabled && "opacity-60")}>
          {labelContent}
        </span>
      ) : null}
    </label>
  );
}
