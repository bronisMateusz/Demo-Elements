import { cn } from "../../../lib/cn";
import { salonNav } from "../../../data/nav";
import { useSelectedSalon } from "../../../hooks/useSelectedSalon";

type HeaderSalonStripProps = {
  onClick: () => void;
  open?: boolean;
  className?: string;
};

/** Mobile-only strip under the main bar - same copy/icon as desktop salon control. */
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
        "border-t border-neutral-200 bg-neutral-0 lg:hidden",
        className,
      )}
    >
      <button
        type="button"
        onClick={onClick}
        aria-haspopup="dialog"
        aria-expanded={open}
        className={cn(
          "group/salon flex w-full items-center gap-2.5 px-[clamp(1.25rem,2.222vw,2.5rem)] py-3 text-start",
          "transition-colors duration-fast ease-out hover:bg-neutral-50",
          "focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-neutral-800",
        )}
      >
        <i
          className="ph ph-map-pin shrink-0 text-xl leading-none text-neutral-800 transition-colors duration-fast ease-out group-hover/salon:text-gold-500"
          aria-hidden="true"
        />
        <span className="min-w-0 flex-1">
          <span className="block truncate font-body text-ui leading-[1.4] text-neutral-800 transition-colors duration-fast ease-out group-hover/salon:text-gold-500">
            {label}
          </span>
          <span className="mt-0.5 block truncate text-xs leading-[1.4] text-neutral-500 transition-colors duration-fast ease-out group-hover/salon:text-neutral-700">
            {note}
          </span>
        </span>
        <i
          className="ph ph-caret-down shrink-0 text-xs leading-none text-neutral-500 transition-colors duration-fast ease-out group-hover/salon:text-gold-500"
          aria-hidden="true"
        />
      </button>
    </div>
  );
}
