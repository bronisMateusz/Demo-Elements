import { cn } from "../../lib/cn";
import type { MouseEvent } from "react";
import { assetUrl } from "../../app/assets";
import { favoritesTooltipCopy } from "../../data/favorites";
import { useProductFavorites } from "../../hooks/useProductFavorites";
import {
  MorphPopover,
  MorphPopoverContent,
  MorphPopoverTrigger,
} from "../motion/MorphPopover";
import {
  iconButtonClassName,
  type IconButtonVariant,
} from "../ui/iconButtonClassName";

type ProductFavoriteButtonProps = {
  sku: string;
  className?: string;
  stopPropagation?: boolean;
  variant?: IconButtonVariant;
  /** Quiet hover tip with morph-open animation - buy box only. */
  showTooltip?: boolean;
};

export function ProductFavoriteButton({
  sku,
  className,
  stopPropagation = false,
  variant = "default",
  showTooltip = false,
}: ProductFavoriteButtonProps) {
  const { isFavorite, toggle } = useProductFavorites(sku);
  const label = isFavorite ? "Usuń ze schowka" : "Dodaj do schowka";

  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    if (stopPropagation) {
      event.preventDefault();
      event.stopPropagation();
    }
    toggle();
  };

  const button = (
    <button
      type="button"
      className={iconButtonClassName({
        variant,
        active: isFavorite,
        className: cn(isFavorite && "text-gold-500 hover:text-gold-500", className),
      })}
      aria-label={label}
      aria-pressed={isFavorite}
      onClick={handleClick}
    >
      <i
        className={isFavorite ? "ph-fill ph-bookmark-simple" : "ph ph-bookmark-simple"}
        aria-hidden="true"
      />
    </button>
  );

  if (!showTooltip) return button;

  return (
    <MorphPopover trigger="hover" className="shrink-0">
      <MorphPopoverTrigger>{button}</MorphPopoverTrigger>
      <MorphPopoverContent
        side="bottom"
        align="end"
        sideOffset={8}
        className="w-64 bg-neutral-900 px-5 py-4 text-left"
      >
        <p className="m-0 mb-2.5 font-body text-sm font-medium text-neutral-0">
          {favoritesTooltipCopy.title}
        </p>
        <ul className="m-0 flex list-none flex-col gap-2 p-0">
          {favoritesTooltipCopy.features.map((feature) => (
            <li
              key={feature}
              className="flex items-start gap-2 text-sm leading-snug text-neutral-0/80"
            >
              <img
                src={assetUrl("sygnet.svg")}
                alt=""
                aria-hidden="true"
                className="mt-0.5 size-3 shrink-0 brightness-0 invert opacity-70"
                width={12}
                height={12}
              />
              <span>{feature}</span>
            </li>
          ))}
        </ul>
      </MorphPopoverContent>
    </MorphPopover>
  );
}
