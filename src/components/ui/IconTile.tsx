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
  /** Visible corner CTA + accessible name when `href` is set (defaults to `label`). */
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
      <div className="flex w-full items-center justify-between gap-3">
        <i
          className={cn(
            iconClass,
            "shrink-0 text-3xl leading-none text-neutral-900",
          )}
          aria-hidden="true"
        />
        {interactive ? (
          <span
            className={cn(
              "inline-flex min-w-0 items-center gap-1",
              "font-body text-xs font-medium uppercase leading-none tracking-[0.12em] text-neutral-900",
            )}
          >
            {ctaLabel ? (
              <span className="hidden truncate sm:inline">{ctaLabel}</span>
            ) : null}
            <i
              className="ph ph-arrow-right shrink-0 text-base leading-none transition-transform duration-base ease-out group-hover/tile:translate-x-0.5"
              aria-hidden="true"
            />
          </span>
        ) : null}
      </div>
      <span
        className={cn(
          "font-body text-sm leading-snug font-medium text-balance text-neutral-900 md:text-ui",
          !text && "mt-auto",
        )}
      >
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
