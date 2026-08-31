import { cn } from "../../lib/cn";

export type FloatingBottomShellPlacement = "bar" | "end";

type FloatingBottomShellClassNameOptions = {
  visible?: boolean;
  /** `bar` = PDP AskFab (centered wide); `end` = marketing chip (inset-e). */
  placement?: FloatingBottomShellPlacement;
  className?: string;
};

/**
 * Shared fixed bottom slide-in chrome for AskFab and FloatingAdvisorCta.
 */
export function floatingBottomShellClassName({
  visible = true,
  placement = "bar",
  className,
}: FloatingBottomShellClassNameOptions = {}) {
  return cn(
    "fixed inset-x-0 bottom-0 z-90 transition-transform duration-base ease-luxury",
    placement === "bar" &&
      "lg:inset-x-auto lg:bottom-5 lg:inset-s-1/2 lg:w-[min(calc(100%-2*clamp(0.75rem,2.222vw,2.5rem)),96rem)] lg:-translate-x-1/2",
    placement === "end" &&
      cn(
        "px-[clamp(0.75rem,2.222vw,2.5rem)] pb-4",
        "sm:inset-x-auto sm:bottom-5 sm:inset-e-[clamp(0.75rem,2.222vw,2.5rem)] sm:w-auto sm:px-0 sm:pb-0",
      ),
    visible
      ? "translate-y-0"
      : "pointer-events-none translate-y-[calc(100%+1.25rem)]",
    className,
  );
}
