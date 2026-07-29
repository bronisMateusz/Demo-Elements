import { cn } from "../../../lib/cn";
import { productImageObjectPosition } from "../../../lib/productImageStyle";
import type { VariantThumbnailProps } from "./types";

export function VariantThumbnail({
  label,
  image,
  selected,
  unavailable,
  onClick,
}: VariantThumbnailProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={unavailable}
      aria-pressed={selected}
      aria-label={label}
      title={label}
      className={cn(
        "group relative z-10 flex flex-col items-stretch rounded-xs bg-transparent",
        "transition-[opacity] duration-base ease-out",
        "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neutral-800",
        selected ? "bg-neutral-50" : "bg-transparent",
        unavailable && "pointer-events-none cursor-not-allowed opacity-45",
      )}
    >
      <span className="flex aspect-square w-20 items-center justify-center overflow-hidden bg-product-stage">
        <img
          src={image.src}
          alt=""
          className={cn(
            "max-size-full origin-center object-contain transform-gpu backface-hidden",
            "transition-transform duration-base ease-luxury",
            "motion-reduce:transition-none",
            "group-hover:scale-[1.06] group-focus-visible:scale-[1.06]",
            "motion-reduce:group-hover:scale-100 motion-reduce:group-focus-visible:scale-100",
          )}
          style={{ objectPosition: productImageObjectPosition(image) }}
          loading="lazy"
          draggable={false}
        />
      </span>
      <span
        className={cn(
          "block h-px w-full",
          selected ? "bg-neutral-900" : "bg-transparent",
        )}
        aria-hidden="true"
      />
      <span className="sr-only">{label}</span>
    </button>
  );
}
