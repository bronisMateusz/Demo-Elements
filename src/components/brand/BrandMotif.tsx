import { assetUrl } from "../../app/assets";
import { cn } from "../../lib/cn";

export type BrandMotifName =
  | "arc-dark"
  | "arc-light"
  | "circle-beige"
  | "bar-gold"
  | "dots-grid";

type BrandMotifProps = {
  name: BrandMotifName;
  className?: string;
};

/**
 * Decorative brand graphic from assets/brand. Non-interactive, hidden from a11y.
 */
export function BrandMotif({ name, className }: BrandMotifProps) {
  return (
    <img
      src={assetUrl(`brand/${name}.svg`)}
      alt=""
      aria-hidden="true"
      draggable={false}
      className={cn("pointer-events-none select-none", className)}
    />
  );
}
