import { cn } from "../../../lib/cn";
import { MotionFieldGroup } from "../../motion/MotionFieldGroup";
import { SharedLayoutUnderline } from "../../motion/SharedLayoutUnderline";
import { VariantThumbnail } from "./VariantThumbnail";
import type { VariantAxisGroupProps } from "./types";

export function VariantThumbnailGroup({
  options,
  selectedId,
  axisLabel,
  onSelect,
}: VariantAxisGroupProps) {
  return (
    <div role="group" aria-label={axisLabel}>
      <MotionFieldGroup>
        <SharedLayoutUnderline className="inline-flex flex-wrap" lineClassName="bg-neutral-900/40">
          {options.map((option) => {
            if (!option.image) return null;

            return (
              <div
                key={option.id}
                data-hoverable={option.unavailable ? false : undefined}
                className={cn("shrink-0", option.unavailable && "cursor-not-allowed")}
              >
                <VariantThumbnail
                  label={option.label}
                  image={option.image}
                  selected={selectedId === option.id}
                  unavailable={option.unavailable}
                  onClick={() => onSelect(option.id)}
                />
              </div>
            );
          })}
        </SharedLayoutUnderline>
      </MotionFieldGroup>
    </div>
  );
}
