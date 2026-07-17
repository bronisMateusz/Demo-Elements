import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { cn } from "../../lib/cn";
import { favoritesNav, mainNavItems, salonNav } from "../../data/nav";
import { useProductFavoritesCount } from "../../hooks/useProductFavorites";
import { lockPageScroll } from "../../hooks/useSiteChrome";
import { IconButton } from "../ui/IconButton";

type MobileDrawerProps = {
  open: boolean;
  onClose: () => void;
};

export function MobileDrawer({ open, onClose }: MobileDrawerProps) {
  const panelRef = useRef<HTMLDivElement>(null);
  const favoritesCount = useProductFavoritesCount();

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
          "absolute right-0 top-0 flex h-full w-[min(100%,320px)] flex-col bg-neutral-0 shadow-2",
        )}
        role="dialog"
        aria-modal="true"
        aria-label="Menu nawigacji"
        tabIndex={-1}
      >
        <div className="flex items-center justify-between border-b border-neutral-200 px-6 py-5">
          <span className="font-heading text-xl text-neutral-900">Menu</span>
          <IconButton label="Zamknij menu" iconClass="ph ph-x" onClick={onClose} />
        </div>
        <nav className="flex-1 overflow-y-auto px-6 py-8" aria-label="Menu mobilne">
          <ul className="flex list-none flex-col gap-1">
            {mainNavItems.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  className="flex items-center gap-2 py-3 font-body text-lg text-neutral-900 no-underline transition-colors hover:text-gold-500"
                  onClick={onClose}
                >
                  {item.label}
                  {item.hasMenu ? (
                    <i className="ph ph-caret-down text-sm text-neutral-500" aria-hidden="true" />
                  ) : null}
                </a>
              </li>
            ))}
          </ul>

          <div className="mt-8 flex flex-col gap-4 border-t border-neutral-200 pt-8">
            <a
              href={salonNav.href}
              className="flex items-center gap-2.5 no-underline"
              onClick={onClose}
            >
              <i className="ph ph-map-pin text-xl text-neutral-700" aria-hidden="true" />
              <span>
                <span className="block font-body text-ui text-neutral-900">{salonNav.label}</span>
                <span className="mt-0.5 block text-xs text-neutral-500">{salonNav.note}</span>
              </span>
            </a>
            <a
              href={favoritesNav.href}
              className="flex items-center gap-3 font-body text-ui text-neutral-900 no-underline hover:text-gold-500"
              onClick={onClose}
            >
              <i
                className={
                  favoritesCount > 0
                    ? "ph-fill ph-bookmark-simple text-xl"
                    : "ph ph-bookmark-simple text-xl"
                }
                aria-hidden="true"
              />
              <span>
                {favoritesNav.label}
                {favoritesCount > 0 ? ` (${favoritesCount})` : ""}
              </span>
            </a>
          </div>
        </nav>
        <div className="border-t border-neutral-200 px-6 py-6">
          <Link
            to="/biblioteka"
            className="text-ui text-neutral-600 no-underline hover:text-neutral-900"
            onClick={onClose}
          >
            Biblioteka komponentów
          </Link>
        </div>
      </div>
    </div>
  );
}
