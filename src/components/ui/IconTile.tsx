import type { ReactNode } from "react";
import { cn } from "../../lib/cn";

const iconTileClassName = cn(
  "group/tile relative flex h-full flex-col items-start gap-3 rounded-xs bg-gold-50 px-4 py-5 sm:px-5 sm:py-6",
  "transition-[background-color,color] duration-base ease-out",
);

type IconTileProps = {
  iconClass: string;
  label: string;
  text?: string;
  href?: string;
  /** Accessible name when `href` is set (defaults to `label`). */
  ctaLabel?: string;
  className?: string;
};

export function IconTile({
  iconClass,
  label,
  text,
  href,
  ctaLabel,
  className,
}: IconTileProps) {
  const interactive = Boolean(href);
  // Corner arrow only for explicit CTAs (e.g. salon USP), not plain category links.
  const showArrow = Boolean(ctaLabel);
  const shellClassName = cn(
    iconTileClassName,
    interactive && "hover:bg-gold-100",
    interactive &&
      "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-500",
    interactive && "no-underline",
    className,
  );

  const content: ReactNode = (
    <>
      {showArrow ? (
        <i
          className="ph ph-arrow-right absolute top-5 inset-e-4 text-base leading-none text-neutral-900 transition-transform duration-base ease-out group-hover/tile:translate-x-0.5 sm:top-6 sm:inset-e-5"
          aria-hidden="true"
        />
      ) : null}
      <i
        className={cn(iconClass, "shrink-0 text-3xl leading-none text-neutral-900")}
        aria-hidden="true"
      />
      <span className="font-body text-sm font-medium text-neutral-900 md:text-ui">
        {label}
      </span>
      {text ? (
        <span className="font-body text-sm leading-snug text-neutral-600">
          {text}
        </span>
      ) : null}
    </>
  );

  if (href) {
    return (
      <a href={href} aria-label={ctaLabel ?? label} className={shellClassName}>
        {content}
      </a>
    );
  }

  return <div className={shellClassName}>{content}</div>;
}
