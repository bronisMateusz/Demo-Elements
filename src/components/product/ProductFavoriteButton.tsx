import { cn } from "../../lib/cn";
import type { MouseEvent } from "react";
import { useProductFavorites } from "../../hooks/useProductFavorites";
import {
  iconButtonClassName,
  type IconButtonVariant,
} from "../ui/iconButtonClassName";

type ProductFavoriteButtonProps = {
  sku: string;
  className?: string;
  stopPropagation?: boolean;
  variant?: IconButtonVariant;
};

export function ProductFavoriteButton({
  sku,
  className,
  stopPropagation = false,
  variant = "default",
}: ProductFavoriteButtonProps) {
  const { isFavorite, toggle } = useProductFavorites(sku);

  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    if (stopPropagation) {
      event.preventDefault();
      event.stopPropagation();
    }
    toggle();
  };

  return (
    <button
      type="button"
      className={iconButtonClassName({
        variant,
        active: isFavorite,
        className: cn(isFavorite && "text-gold-500 hover:text-gold-500", className),
      })}
      aria-label={isFavorite ? "Usuń z ulubionych" : "Dodaj do ulubionych"}
      aria-pressed={isFavorite}
      onClick={handleClick}
    >
      <i className={isFavorite ? "ph-fill ph-heart" : "ph ph-heart"} aria-hidden="true" />
    </button>
  );
}
