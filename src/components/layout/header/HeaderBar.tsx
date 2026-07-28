import { useEffect, useId, useRef } from "react";
import { Link } from "react-router-dom";
import { assetUrl } from "../../../app/assets";
import { cn } from "../../../lib/cn";
import { mainNavItems, salonNav } from "../../../data/nav";
import { useSelectedSalon } from "../../../hooks/useSelectedSalon";
import { IconButton } from "../../ui/IconButton";
import { iconButtonClassName } from "../../ui/iconButtonClassName";
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
  const { salon } = useSelectedSalon();
  const label = salon?.name ?? salonNav.label;
  const note = salon ? salonNav.changeNote : salonNav.note;

  return (
    <button
      type="button"
      onClick={onClick}
      aria-haspopup="dialog"
      aria-expanded={open}
      className={cn(
        "group/salon hidden min-w-0 items-center gap-2.5 self-stretch rounded-xs px-3 text-start transition-colors duration-fast ease-out lg:flex",
        "hover:bg-neutral-100",
        "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neutral-800",
      )}
    >
      <i
        className="ph ph-map-pin shrink-0 text-xl leading-none text-neutral-800 transition-colors duration-fast ease-out group-hover/salon:text-gold-500"
        aria-hidden="true"
      />
      <span className="min-w-0">
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
  );
}

/** Compact location control for viewports where the labeled salon button is hidden. */
function HeaderSalonIconButton({
  onClick,
  open = false,
}: {
  onClick: () => void;
  open?: boolean;
}) {
  const { salon } = useSelectedSalon();
  const label = salon?.name ?? salonNav.label;

  return (
    <button
      type="button"
      onClick={onClick}
      aria-haspopup="dialog"
      aria-expanded={open}
      aria-label={label}
      className={cn(iconButtonClassName({ variant: "default" }), "lg:hidden")}
    >
      <i className="ph ph-map-pin" aria-hidden="true" />
    </button>
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
      <div className="container flex h-18 items-center gap-4 xl:gap-6">
        <Link
          to="/"
          className="inline-flex shrink-0 items-center no-underline"
          aria-label="Elements - strona główna"
        >
          <img
            src={assetUrl("logo-elements.svg")}
            alt=""
            width={108}
            height={106}
            className="h-[clamp(2rem,4vw,2.75rem)] w-auto"
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

        <div className="ms-auto flex h-full shrink-0 items-center gap-1 border-s border-neutral-200 ps-3 lg:ms-0 lg:ps-4">
          <HeaderSalonButton onClick={onSalonToggle} open={salonOpen} />
          <IconButton label="Szukaj" iconClass="ph ph-magnifying-glass" variant="default" />
          <HeaderSalonIconButton onClick={onSalonToggle} open={salonOpen} />
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
