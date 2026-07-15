import { Link } from "react-router-dom";
import { cn } from "../../../lib/cn";
import { mainNavItems } from "../../../data/nav";
import { IconButton } from "../../ui/IconButton";

type HeaderBarProps = {
  onMenuToggle: () => void;
  isScrolled: boolean;
};

export function HeaderBar({ onMenuToggle, isScrolled }: HeaderBarProps) {
  return (
    <div
      className={cn(
        "container flex h-[var(--header-h)] items-center justify-between gap-6",
      )}
    >
      <Link
        to="/"
        className="font-heading text-[clamp(22px,2.5vw,28px)] tracking-tight text-text no-underline"
        aria-label="Elements — strona główna"
      >
        Elements
      </Link>

      <nav className="absolute left-1/2 hidden -translate-x-1/2 lg:block" aria-label="Główne menu">
        <ul className="flex list-none items-center gap-8">
          {mainNavItems.map((item) => (
            <li key={item.href}>
              <a
                href={item.href}
                className="font-body text-ui text-text-body no-underline transition-colors hover:text-text"
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      <div className="flex items-center gap-1">
        <IconButton label="Szukaj" iconClass="ph ph-magnifying-glass" variant="default" />
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
