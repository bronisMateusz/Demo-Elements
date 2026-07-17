import { useEffect, useId, useRef } from "react";
import { Link } from "react-router-dom";
import { assetUrl } from "../../../app/assets";
import { cn } from "../../../lib/cn";
import { favoritesNav, mainNavItems, salonNav } from "../../../data/nav";
import { useProductFavoritesCount } from "../../../hooks/useProductFavorites";
import { IconButton } from "../../ui/IconButton";
import { ProductsMegaMenu } from "./ProductsMegaMenu";

type HeaderBarProps = {
  onMenuToggle: () => void;
  onSalonToggle: () => void;
  salonOpen?: boolean;
  isScrolled: boolean;
  productsOpen: boolean;
  onProductsOpenChange: (open: boolean) => void;
};

const CLOSE_DELAY_MS = 120;

function HeaderSalonButton({
  onClick,
  open = false,
}: {
  onClick: () => void;
  open?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-haspopup="dialog"
      aria-expanded={open}
      className={cn(
        "group/salon hidden min-w-0 items-center gap-2.5 self-stretch rounded-xs px-3 text-left transition-colors duration-fast ease-out lg:flex",
        "hover:bg-neutral-100",
        "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[var(--spacing-focus-ring-offset)] focus-visible:outline-neutral-800",
      )}
    >
      <i
        className="ph ph-map-pin shrink-0 text-xl leading-none text-neutral-800 transition-colors duration-fast ease-out group-hover/salon:text-gold-500"
        aria-hidden="true"
      />
      <span className="min-w-0">
        <span className="block font-body text-ui leading-compact text-neutral-800 transition-colors duration-fast ease-out group-hover/salon:text-gold-500">
          {salonNav.label}
        </span>
        <span className="mt-0.5 block text-xs leading-compact text-neutral-500 transition-colors duration-fast ease-out group-hover/salon:text-neutral-700">
          {salonNav.note}
        </span>
      </span>
      <i
        className="ph ph-caret-down shrink-0 text-xs leading-none text-neutral-500 transition-colors duration-fast ease-out group-hover/salon:text-gold-500"
        aria-hidden="true"
      />
    </button>
  );
}

function HeaderFavoritesLink() {
  const count = useProductFavoritesCount();
  const label =
    count > 0 ? `${favoritesNav.label} (${count})` : favoritesNav.label;

  return (
    <a
      href={favoritesNav.href}
      className={cn(
        "icon-btn relative inline-flex h-12 w-12 min-h-12 min-w-12 shrink-0 items-center justify-center rounded-xs border border-transparent bg-transparent text-neutral-800 transition-[background-color,color,border-color] duration-fast ease-out",
        "hover:bg-neutral-100 hover:text-neutral-900",
        "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[var(--spacing-focus-ring-offset)] focus-visible:outline-neutral-800",
        "[&_i]:text-xl",
      )}
      aria-label={label}
    >
      <i
        className={count > 0 ? "ph-fill ph-bookmark-simple" : "ph ph-bookmark-simple"}
        aria-hidden="true"
      />
      <span className="absolute top-1.5 right-1.5 flex size-4 items-center justify-center rounded-full bg-neutral-900 text-[10px] leading-none font-medium text-neutral-0">
        {count > 9 ? "9+" : count}
      </span>
    </a>
  );
}

export function HeaderBar({
  onMenuToggle,
  onSalonToggle,
  salonOpen = false,
  isScrolled,
  productsOpen,
  onProductsOpenChange,
}: HeaderBarProps) {
  const megaId = useId().replace(/:/g, "");
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const rootRef = useRef<HTMLDivElement>(null);

  const clearCloseTimer = () => {
    if (closeTimer.current) {
      clearTimeout(closeTimer.current);
      closeTimer.current = null;
    }
  };

  const openProducts = () => {
    clearCloseTimer();
    onProductsOpenChange(true);
  };

  const scheduleCloseProducts = () => {
    clearCloseTimer();
    closeTimer.current = setTimeout(() => onProductsOpenChange(false), CLOSE_DELAY_MS);
  };

  useEffect(() => () => clearCloseTimer(), []);

  useEffect(() => {
    if (!productsOpen) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onProductsOpenChange(false);
    };

    const onPointerDown = (event: MouseEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) {
        onProductsOpenChange(false);
      }
    };

    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("mousedown", onPointerDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("mousedown", onPointerDown);
    };
  }, [productsOpen, onProductsOpenChange]);

  return (
    <div
      ref={rootRef}
      className="relative"
      onMouseLeave={scheduleCloseProducts}
    >
      <div className="container flex h-header-bar-h items-center gap-4 xl:gap-6">
        <Link
          to="/"
          className="inline-flex shrink-0 items-center no-underline"
          aria-label="Elements — strona główna"
        >
          <img
            src={assetUrl("logo-elements.svg")}
            alt=""
            width={108}
            height={106}
            className="h-[clamp(32px,4vw,44px)] w-auto"
          />
        </Link>

        <nav className="hidden min-w-0 flex-1 self-stretch lg:block" aria-label="Główne menu">
          <ul className="m-0 flex h-full list-none items-stretch gap-1 xl:gap-2">
            {mainNavItems.map((item) => {
              if (item.hasMenu) {
                return (
                  <li
                    key={item.href}
                    className="flex shrink-0"
                    onMouseEnter={openProducts}
                  >
                    <a
                      href={item.href}
                      className={cn(
                        "group/navlink inline-flex h-full items-center gap-1 px-2.5 font-body text-ui no-underline transition-colors duration-fast ease-out xl:px-3",
                        productsOpen
                          ? "text-gold-500"
                          : "text-neutral-800 hover:text-gold-500",
                      )}
                      aria-haspopup="true"
                      aria-expanded={productsOpen}
                      aria-controls={megaId}
                      onClick={(event) => {
                        event.preventDefault();
                        onProductsOpenChange(!productsOpen);
                      }}
                    >
                      {item.label}
                      <i
                        className={cn(
                          "ph ph-caret-down text-xs transition-[color,transform] duration-fast ease-out",
                          productsOpen
                            ? "rotate-180 text-gold-500"
                            : "text-neutral-500 group-hover/navlink:text-gold-500",
                        )}
                        aria-hidden="true"
                      />
                    </a>
                  </li>
                );
              }

              return (
                <li key={item.href} className="flex shrink-0">
                  <a
                    href={item.href}
                    className="group/navlink inline-flex h-full items-center gap-1 px-2.5 font-body text-ui text-neutral-800 no-underline transition-colors duration-fast ease-out hover:text-gold-500 xl:px-3"
                    onMouseEnter={() => onProductsOpenChange(false)}
                  >
                    {item.label}
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="ml-auto flex h-full shrink-0 items-center gap-1 border-l border-neutral-200 pl-3 lg:ml-0 lg:pl-4">
          <HeaderSalonButton onClick={onSalonToggle} open={salonOpen} />
          <IconButton label="Szukaj" iconClass="ph ph-magnifying-glass" variant="default" />
          <HeaderFavoritesLink />
          <IconButton
            label="Otwórz menu"
            iconClass="ph ph-list"
            variant="default"
            className="lg:hidden"
            onClick={onMenuToggle}
          />
        </div>

        <span className="sr-only">{isScrolled ? "Nagłówek po przewinięciu" : ""}</span>
      </div>

      <div className="hidden lg:block" onMouseEnter={openProducts}>
        <ProductsMegaMenu open={productsOpen} id={megaId} />
      </div>
    </div>
  );
}
