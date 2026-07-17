import { useEffect, useRef } from "react";
import { cn } from "../../lib/cn";
import { salonNav, salonOptions } from "../../data/nav";
import { lockPageScroll } from "../../hooks/useSiteChrome";
import { IconButton } from "../ui/IconButton";

type SalonDrawerProps = {
  open: boolean;
  onClose: () => void;
};

export function SalonDrawer({ open, onClose }: SalonDrawerProps) {
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

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[200]" role="presentation">
      <button
        type="button"
        className="absolute inset-0 bg-neutral-900/20 backdrop-blur-[2px]"
        aria-label="Zamknij wybór salonu"
        onClick={onClose}
      />
      <div
        ref={panelRef}
        className={cn(
          "absolute right-0 top-0 flex h-full w-[min(100%,400px)] flex-col bg-neutral-0 shadow-2",
        )}
        role="dialog"
        aria-modal="true"
        aria-label={salonNav.label}
        tabIndex={-1}
      >
        <div className="flex items-center justify-between border-b border-neutral-200 px-6 py-5">
          <div>
            <p className="m-0 font-heading text-xl text-neutral-900">{salonNav.label}</p>
            <p className="mt-1 mb-0 text-sm text-neutral-500">{salonNav.note}</p>
          </div>
          <IconButton label="Zamknij" iconClass="ph ph-x" onClick={onClose} />
        </div>

        <ul className="m-0 flex list-none flex-col gap-1 overflow-y-auto px-3 py-4">
          {salonOptions.map((salon) => (
            <li key={salon.id}>
              <button
                type="button"
                className="flex w-full flex-col gap-1 rounded-xs px-4 py-4 text-left transition-colors duration-fast ease-out hover:bg-neutral-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[var(--spacing-focus-ring-offset)] focus-visible:outline-neutral-800"
                onClick={onClose}
              >
                <span className="font-body text-ui text-neutral-900">{salon.name}</span>
                <span className="text-sm text-neutral-500">{salon.address}</span>
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
