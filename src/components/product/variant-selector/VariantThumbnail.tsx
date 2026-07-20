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
        "focus-visible:outline-2 focus-visible:outline-offset-[var(--spacing-focus-ring-offset)] focus-visible:outline-neutral-800",
        selected ? "bg-neutral-50" : "bg-transparent",
        unavailable && "pointer-events-none cursor-not-allowed opacity-45",
      )}
    >
      <span className="flex aspect-square w-20 items-center justify-center bg-transparent">
        <img
          src={image.src}
          alt=""
          className="max-h-full max-w-full object-contain"
          style={{ objectPosition: productImageObjectPosition(image) }}
          loading="lazy"
          draggable={false}
        />
      </span>
      <span
        className={cn("block h-px w-full", selected ? "bg-neutral-900" : "bg-transparent")}
        aria-hidden="true"
      />
      <span className="sr-only">{label}</span>
    </button>
  );
}
