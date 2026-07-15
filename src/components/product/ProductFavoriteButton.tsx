import { cn } from "../../lib/cn";
import { useProductFavorites } from "../../hooks/useProductFavorites";
import { iconButtonClassName } from "../ui/iconButtonClassName";

type ProductFavoriteButtonProps = {
  sku: string;
  className?: string;
};

export function ProductFavoriteButton({ sku, className }: ProductFavoriteButtonProps) {
  const { isFavorite, toggle } = useProductFavorites(sku);

  return (
    <button
      type="button"
      className={iconButtonClassName({
        variant: "bordered",
        active: isFavorite,
        className: cn(
          isFavorite && "border-gold text-gold hover:border-gold hover:text-gold",
          className,
        ),
      })}
      aria-label={isFavorite ? "Usuń z ulubionych" : "Dodaj do ulubionych"}
      aria-pressed={isFavorite}
      onClick={toggle}
    >
      <i className={isFavorite ? "ph-fill ph-heart" : "ph ph-heart"} aria-hidden="true" />
    </button>
  );
}
