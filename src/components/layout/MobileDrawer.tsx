import { useCallback, useState } from "react";
import { Link } from "react-router-dom";
import { cn } from "../../lib/cn";
import { favoritesNav, mainNavItems, productsMegaMenu, salonNav } from "../../data/nav";
import { useProductFavoritesCount } from "../../hooks/useProductFavorites";
import { useSelectedSalon } from "../../hooks/useSelectedSalon";
import { DrawerHeader, DrawerShell } from "./DrawerShell";

type MobileDrawerProps = {
  open: boolean;
  onClose: () => void;
  onSalonOpen?: () => void;
};

export function MobileDrawer({ open, onClose, onSalonOpen }: MobileDrawerProps) {
  const favoritesCount = useProductFavoritesCount();
  const { salon } = useSelectedSalon();
  const [productsExpanded, setProductsExpanded] = useState(false);

  const handleClose = useCallback(() => {
    setProductsExpanded(false);
    onClose();
  }, [onClose]);

  return (
    <DrawerShell
      open={open}
      onClose={handleClose}
      label="Menu nawigacji"
      closeLabel="Zamknij menu"
      className="lg:hidden"
    >
        <DrawerHeader title="Menu" closeLabel="Zamknij menu" onClose={handleClose} compact />
        <nav className="flex-1 overflow-y-auto px-gutter py-8" aria-label="Menu mobilne">
          <ul className="flex list-none flex-col gap-1">
            {mainNavItems.map((item) => {
              if (item.hasMenu) {
                return (
                  <li key={item.href}>
                    <button
                      type="button"
                      className="flex w-full items-center justify-between gap-2 py-3 text-left font-body text-lg text-neutral-900 transition-colors hover:text-gold-500"
                      aria-expanded={productsExpanded}
                      onClick={() => setProductsExpanded((value) => !value)}
                    >
                      {item.label}
                      <i
                        className={cn(
                          "ph ph-caret-down text-sm text-neutral-500 transition-transform duration-fast ease-out",
                          productsExpanded && "rotate-180",
                        )}
                        aria-hidden="true"
                      />
                    </button>
                    {productsExpanded ? (
                      <ul className="mb-3 ml-1 flex list-none flex-col gap-5 border-l border-neutral-200 pl-4">
                        {productsMegaMenu.flatMap((column) =>
                          column.groups.map((group) => (
                            <li key={group.href}>
                              <a
                                href={group.href}
                                className="mb-2 inline-flex items-center gap-1.5 font-heading text-lg text-neutral-900 no-underline hover:text-gold-500"
                                onClick={handleClose}
                              >
                                {group.title}
                                <i className="ph ph-arrow-right text-xs text-neutral-400" aria-hidden="true" />
                              </a>
                              <ul className="flex list-none flex-col">
                                {group.links.map((link) => (
                                  <li key={link.href}>
                                    <a
                                      href={link.href}
                                      className="block w-full py-1.5 text-sm text-neutral-600 no-underline hover:text-gold-500"
                                      onClick={handleClose}
                                    >
                                      {link.label}
                                    </a>
                                  </li>
                                ))}
                              </ul>
                            </li>
                          )),
                        )}
                      </ul>
                    ) : null}
                  </li>
                );
              }

              return (
                <li key={item.href}>
                  <a
                    href={item.href}
                    className="flex items-center gap-2 py-3 font-body text-lg text-neutral-900 no-underline transition-colors hover:text-gold-500"
                    onClick={handleClose}
                  >
                    {item.label}
                  </a>
                </li>
              );
            })}
          </ul>

          <div className="mt-8 flex flex-col gap-4 border-t border-neutral-200 pt-8">
            <button
              type="button"
              className="flex w-full items-center gap-2.5 text-left"
              onClick={() => {
                handleClose();
                onSalonOpen?.();
              }}
            >
              <i className="ph ph-map-pin text-xl text-neutral-700" aria-hidden="true" />
              <span className="min-w-0 flex-1">
                <span className="block truncate font-body text-ui text-neutral-900">
                  {salon?.name ?? salonNav.label}
                </span>
                <span className="mt-0.5 block text-xs text-neutral-500">
                  {salon ? salonNav.changeNote : salonNav.note}
                </span>
              </span>
              <i className="ph ph-caret-right text-sm text-neutral-500" aria-hidden="true" />
            </button>
            <a
              href={favoritesNav.href}
              className="flex items-center gap-3 font-body text-ui text-neutral-900 no-underline hover:text-gold-500"
              onClick={handleClose}
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
        <div className="border-t border-neutral-200 px-gutter py-8">
          <Link
            to="/biblioteka"
            className="text-ui text-neutral-600 no-underline hover:text-neutral-900"
            onClick={handleClose}
          >
            Biblioteka komponentów
          </Link>
        </div>
    </DrawerShell>
  );
}
