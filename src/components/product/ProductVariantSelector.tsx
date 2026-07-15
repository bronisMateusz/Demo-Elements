import { cn } from "../../lib/cn";
import { productImageObjectPosition } from "../../lib/productImageStyle";
import type { ProductImage, ProductVariantAxis, ProductVariants } from "../../types/product";

type ProductVariantSelectorProps = {
  variants: ProductVariants;
  selection: Record<string, string>;
  onSelect: (axisId: string, optionId: string) => void;
};

function VariantChip({
  label,
  selected,
  unavailable,
  onClick,
}: {
  label: string;
  selected: boolean;
  unavailable?: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={unavailable}
      aria-pressed={selected}
      className={cn(
        "min-h-11 min-w-[4.5rem] rounded-sm border px-4 py-2 text-small font-medium transition-colors duration-fast ease-out",
        "focus-visible:outline-2 focus-visible:outline-offset-[var(--focus-ring-offset)] focus-visible:outline-focus-ring",
        selected
          ? "border-text bg-text text-text-on-primary"
          : "border-border bg-bg text-text hover:border-border-strong",
        unavailable && "cursor-not-allowed opacity-45",
      )}
    >
      {label}
    </button>
  );
}

function VariantSwatch({
  label,
  swatch,
  selected,
  onClick,
}: {
  label: string;
  swatch: string;
  selected: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={selected}
      aria-label={label}
      title={label}
      className={cn(
        "relative flex size-11 items-center justify-center rounded-full border transition-[box-shadow,transform] duration-fast ease-out",
        "focus-visible:outline-2 focus-visible:outline-offset-[var(--focus-ring-offset)] focus-visible:outline-focus-ring",
        selected
          ? "border-text ring-2 ring-text ring-offset-2 ring-offset-bg"
          : "border-border-strong hover:scale-[1.03]",
      )}
    >
      <span
        className="block size-8 rounded-full border border-black/10"
        style={{ backgroundColor: swatch }}
        aria-hidden="true"
      />
      <span className="sr-only">{label}</span>
    </button>
  );
}

function VariantThumbnail({
  label,
  image,
  selected,
  unavailable,
  onClick,
}: {
  label: string;
  image: ProductImage;
  selected: boolean;
  unavailable?: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={unavailable}
      aria-pressed={selected}
      aria-label={label}
      title={label}
      className={cn(
        "group relative flex flex-col items-stretch rounded-sm p-2 transition-colors duration-fast ease-out",
        "focus-visible:outline-2 focus-visible:outline-offset-[var(--focus-ring-offset)] focus-visible:outline-focus-ring",
        selected ? "bg-bg-muted" : "bg-transparent",
        unavailable && "cursor-not-allowed opacity-45",
      )}
    >
      <span className="flex aspect-square w-[5.5rem] items-center justify-center bg-neutral-0">
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
        aria-hidden="true"
        className={cn(
          "mt-2 h-px w-full bg-transparent transition-colors duration-fast ease-out",
          selected && "bg-text",
          !selected && !unavailable && "group-hover:bg-text group-focus-visible:bg-text",
        )}
      />
      <span className="sr-only">{label}</span>
    </button>
  );
}

function VariantAxisField({
  axis,
  selection,
  onSelect,
  labelId,
}: {
  axis: ProductVariantAxis;
  selection: Record<string, string>;
  onSelect: (axisId: string, optionId: string) => void;
  labelId: string;
}) {
  const selectedOption = axis.options.find((option) => option.id === selection[axis.id]);

  return (
    <div role="group" aria-labelledby={labelId}>
      <p id={labelId} className="mb-3 block text-small text-text">
        <span className="text-text-body">{axis.label}:</span>{" "}
        {selectedOption ? <span>{selectedOption.label}</span> : null}
      </p>

      <div
        className={cn(
          "flex flex-wrap",
          axis.type === "chip" && "gap-1.5",
          axis.type === "thumbnail" && "gap-2",
          axis.type === "swatch" && "gap-2",
        )}
        role={axis.type === "chip" ? "group" : undefined}
        aria-label={axis.label}
      >
        {axis.options.map((option) => {
          if (axis.type === "thumbnail" && option.image) {
            return (
              <VariantThumbnail
                key={option.id}
                label={option.label}
                image={option.image}
                selected={selection[axis.id] === option.id}
                unavailable={option.unavailable}
                onClick={() => onSelect(axis.id, option.id)}
              />
            );
          }

          if (axis.type === "swatch") {
            return (
              <VariantSwatch
                key={option.id}
                label={option.label}
                swatch={option.swatch ?? "#e8e4df"}
                selected={selection[axis.id] === option.id}
                onClick={() => onSelect(axis.id, option.id)}
              />
            );
          }

          return (
            <VariantChip
              key={option.id}
              label={option.label}
              selected={selection[axis.id] === option.id}
              unavailable={option.unavailable}
              onClick={() => onSelect(axis.id, option.id)}
            />
          );
        })}
      </div>

      {selectedOption?.unavailableNote ? (
        <p className="mt-2 text-small text-text-muted">{selectedOption.unavailableNote}</p>
      ) : null}
    </div>
  );
}

export function ProductVariantSelector({
  variants,
  selection,
  onSelect,
}: ProductVariantSelectorProps) {
  return (
    <div className="mb-8 flex flex-col gap-12">
      {variants.axes.map((axis) => (
        <VariantAxisField
          key={axis.id}
          axis={axis}
          selection={selection}
          onSelect={onSelect}
          labelId={`variant-axis-${axis.id}`}
        />
      ))}
    </div>
  );
}
