import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { cn } from "../../lib/cn";
import { mainNavItems } from "../../data/nav";
import { lockPageScroll } from "../../hooks/useSiteChrome";
import { IconButton } from "../ui/IconButton";

type MobileDrawerProps = {
  open: boolean;
  onClose: () => void;
};

export function MobileDrawer({ open, onClose }: MobileDrawerProps) {
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
    <div className="fixed inset-0 z-[200] lg:hidden" role="presentation">
      <button
        type="button"
        className="absolute inset-0 bg-neutral-900/20 backdrop-blur-[2px]"
        aria-label="Zamknij menu"
        onClick={onClose}
      />
      <div
        ref={panelRef}
        className={cn(
          "absolute right-0 top-0 flex h-full w-[min(100%,320px)] flex-col bg-bg shadow-2",
        )}
        role="dialog"
        aria-modal="true"
        aria-label="Menu nawigacji"
        tabIndex={-1}
      >
        <div className="flex items-center justify-between border-b border-border px-6 py-5">
          <span className="font-heading text-xl text-text">Menu</span>
          <IconButton label="Zamknij menu" iconClass="ph ph-x" onClick={onClose} />
        </div>
        <nav className="flex-1 overflow-y-auto px-6 py-8" aria-label="Menu mobilne">
          <ul className="flex list-none flex-col gap-1">
            {mainNavItems.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  className="block py-3 font-body text-body-lg text-text no-underline transition-colors hover:text-gold"
                  onClick={onClose}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <div className="border-t border-border px-6 py-6">
          <Link
            to="/biblioteka"
            className="text-ui text-text-body no-underline hover:text-text"
            onClick={onClose}
          >
            Biblioteka komponentów
          </Link>
        </div>
      </div>
    </div>
  );
}
