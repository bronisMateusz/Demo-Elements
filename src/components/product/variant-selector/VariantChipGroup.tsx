import { LayoutGroup, motion } from "motion/react";
import { useId } from "react";
import { cn } from "../../../lib/cn";
import { MotionFieldGroup } from "../../motion/MotionFieldGroup";
import { SharedLayoutBg } from "../../motion/SharedLayoutBg";
import { VariantChip } from "./VariantChip";
import type { VariantAxisGroupProps } from "./types";

export function VariantChipGroup({ options, selectedId, axisLabel, onSelect }: VariantAxisGroupProps) {
  const selectedLayoutId = useId();

  return (
    <div role="group" aria-label={axisLabel}>
      <LayoutGroup id={`variant-chip-${selectedLayoutId}`}>
        <MotionFieldGroup>
          <SharedLayoutBg className="inline-flex gap-1" pillClassName="rounded-xs bg-neutral-100">
            {options.map((option) => {
              const selected = selectedId === option.id;

              return (
                <div
                  key={option.id}
                  data-hoverable={option.unavailable ? false : undefined}
                  className={cn(
                    "group relative shrink-0 rounded-xs border bg-neutral-0 transition-[border-color] duration-base ease-out",
                    selected ? "border-transparent" : "border-neutral-200 hover:border-neutral-300",
                    option.unavailable && "cursor-not-allowed",
                  )}
                >
                  {selected ? (
                    <motion.span
                      layoutId={selectedLayoutId}
                      className="absolute inset-0 rounded-xs bg-neutral-900"
                      aria-hidden="true"
                    />
                  ) : null}
                  <VariantChip
                    label={option.label}
                    selected={selected}
                    unavailable={option.unavailable}
                    onClick={() => onSelect(option.id)}
                  />
                </div>
              );
            })}
          </SharedLayoutBg>
        </MotionFieldGroup>
      </LayoutGroup>
    </div>
  );
}
