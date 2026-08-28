import {
  iconButtonClassName,
  type IconButtonVariant,
} from "./iconButtonClassName";
import { phosphorGlyphClassName } from "../../lib/phosphorIconInFlexClassName";

type IconButtonProps = {
  label: string;
  iconClass: string;
  variant?: IconButtonVariant;
  active?: boolean;
  className?: string;
  onClick?: () => void;
  type?: "button" | "submit";
};

export function IconButton({
  label,
  iconClass,
  variant = "default",
  active = false,
  className,
  onClick,
  type = "button",
}: IconButtonProps) {
  return (
    <button
      type={type}
      className={iconButtonClassName({ variant, active, className })}
      aria-label={label}
      onClick={onClick}
    >
      <i className={phosphorGlyphClassName(iconClass)} aria-hidden="true" />
    </button>
  );
}

export function IconLink({
  href,
  label,
  iconClass,
  variant = "default",
  className,
  count,
}: {
  href: string;
  label: string;
  iconClass: string;
  variant?: IconButtonVariant;
  className?: string;
  /** Count badge - shown when greater than 0. */
  count?: number;
}) {
  const badge =
    count && count > 0 ? (count > 99 ? "99+" : String(count)) : null;

  return (
    <a
      href={href}
      className={iconButtonClassName({ variant, className })}
      aria-label={label}
    >
      <i className={phosphorGlyphClassName(iconClass)} aria-hidden="true" />
      {badge ? (
        <span
          className="pointer-events-none absolute inset-e-1 top-1 z-2 flex min-h-4 min-w-4 items-center justify-center rounded-xs bg-gold-500 px-0.5 font-body text-xs font-medium leading-none text-neutral-0 tabular-nums"
          aria-hidden="true"
        >
          {badge}
        </span>
      ) : null}
    </a>
  );
}
