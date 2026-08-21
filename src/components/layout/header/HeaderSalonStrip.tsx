import { cn } from "../../../lib/cn";
import { salonNav } from "../../../data/nav";
import { useSelectedSalon } from "../../../hooks/useSelectedSalon";
import {
  btnAnimatedBaseClassName,
  btnAnimatedFillLightClassName,
} from "../../ui/btnAnimatedClassName";

type HeaderSalonStripProps = {
  onClick: () => void;
  open?: boolean;
  className?: string;
};

/** Phone-only strip under the main bar - from sm the salon control sits in HeaderBar. */
export function HeaderSalonStrip({
  onClick,
  open = false,
  className,
}: HeaderSalonStripProps) {
  const { salon } = useSelectedSalon();
  const label = salon?.name ?? salonNav.label;
  const note = salon ? salonNav.changeNote : salonNav.note;

  return (
    <div
      className={cn(
        "border-t border-neutral-200 bg-neutral-0 sm:hidden",
        className,
      )}
    >
      <button
        type="button"
        onClick={onClick}
        aria-haspopup="dialog"
        aria-expanded={open}
        className={cn(
          "group/salon flex w-full items-center gap-2.5 px-[clamp(0.75rem,2.222vw,2.5rem)] py-2 text-start",
          btnAnimatedBaseClassName,
          btnAnimatedFillLightClassName,
          "hover:text-neutral-0 focus-visible:text-neutral-0",
          "focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-neutral-800",
        )}
      >
        <i
          className="ph ph-map-pin relative z-1 shrink-0 text-xl leading-none text-neutral-800 transition-colors duration-base ease-luxury group-hover/salon:text-neutral-0"
          aria-hidden="true"
        />
        <span className="relative z-1 min-w-0 flex-1">
          <span className="block truncate font-body text-ui leading-[1.4] text-neutral-800 transition-colors duration-base ease-luxury group-hover/salon:text-neutral-0">
            {label}
          </span>
          <span className="mt-0.5 block truncate text-xs leading-[1.4] text-neutral-500 transition-colors duration-base ease-luxury group-hover/salon:text-neutral-0">
            {note}
          </span>
        </span>
        <i
          className="ph ph-caret-down relative z-1 shrink-0 text-xs leading-none text-neutral-500 transition-colors duration-base ease-luxury group-hover/salon:text-neutral-0"
          aria-hidden="true"
        />
      </button>
    </div>
  );
}
