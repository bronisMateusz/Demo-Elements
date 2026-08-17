import type { MouseEvent } from "react";
import { useArrangementFavorites } from "../../hooks/useProductFavorites";
import {
  iconButtonClassName,
  type IconButtonVariant,
} from "../ui/iconButtonClassName";

type ArrangementFavoriteButtonProps = {
  id: string;
  className?: string;
  variant?: IconButtonVariant;
};

export function ArrangementFavoriteButton({
  id,
  className,
  variant = "elevated",
}: ArrangementFavoriteButtonProps) {
  const { isFavorite, toggle } = useArrangementFavorites(id);
  const label = isFavorite
    ? "Usuń aranżację ze schowka"
    : "Dodaj aranżację do schowka";

  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    event.stopPropagation();
    toggle();
  };

  return (
    <button
      type="button"
      className={iconButtonClassName({
        variant,
        active: isFavorite,
        className,
      })}
      aria-label={label}
      aria-pressed={isFavorite}
      onClick={handleClick}
    >
      <i
        className={
          isFavorite ? "ph-fill ph-bookmark-simple" : "ph ph-bookmark-simple"
        }
        aria-hidden="true"
      />
    </button>
  );
}
