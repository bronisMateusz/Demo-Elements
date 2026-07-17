import { Link } from "react-router-dom";
import { assetUrl } from "../../../app/assets";
import { cn } from "../../../lib/cn";
import { favoritesNav, mainNavItems, salonNav } from "../../../data/nav";
import { useProductFavoritesCount } from "../../../hooks/useProductFavorites";
import { IconButton } from "../../ui/IconButton";

type HeaderBarProps = {
  onMenuToggle: () => void;
  isScrolled: boolean;
};

function HeaderSalonLink() {
  return (
    <a
      href={salonNav.href}
      className={cn(
        "group/salon hidden min-w-0 items-center gap-2 rounded-xs px-2 py-1.5 no-underline transition-colors duration-fast ease-out lg:flex",
        "hover:bg-neutral-100",
        "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[var(--spacing-focus-ring-offset)] focus-visible:outline-neutral-800",
      )}
    >
      <i
        className="ph ph-map-pin shrink-0 text-xl leading-none text-neutral-700 transition-colors group-hover/salon:text-neutral-900"
        aria-hidden="true"
      />
      <span className="min-w-0">
        <span className="flex items-center gap-1 font-body text-ui leading-compact text-neutral-700 transition-colors group-hover/salon:text-neutral-900">
          {salonNav.label}
          <i className="ph ph-caret-down text-[11px] text-neutral-500" aria-hidden="true" />
        </span>
        <span className="mt-0.5 block text-xs leading-compact text-neutral-500">
          {salonNav.note}
        </span>
      </span>
    </a>
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

export function HeaderBar({ onMenuToggle, isScrolled }: HeaderBarProps) {
  return (
    <div className="container flex h-header-h items-center gap-4 xl:gap-6">
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

      <nav className="hidden min-w-0 flex-1 lg:block" aria-label="Główne menu">
        <ul className="m-0 flex list-none items-center gap-5 xl:gap-7">
          {mainNavItems.map((item) => (
            <li key={item.href} className="shrink-0">
              <a
                href={item.href}
                className="inline-flex items-center gap-1 font-body text-ui text-neutral-700 no-underline transition-colors hover:text-neutral-900"
              >
                {item.label}
                {item.hasMenu ? (
                  <i className="ph ph-caret-down text-xs text-neutral-500" aria-hidden="true" />
                ) : null}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      <div className="ml-auto flex shrink-0 items-center gap-1 border-l border-neutral-200 pl-3 lg:ml-0 lg:pl-4">
        <HeaderSalonLink />
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
  );
}
