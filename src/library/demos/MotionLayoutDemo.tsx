import { useState } from "react";
import { cn } from "../../lib/cn";
import { SharedLayoutBg } from "../../components/motion/SharedLayoutBg";
import { SharedLayoutUnderline } from "../../components/motion/SharedLayoutUnderline";

const tabClassName =
  "relative z-10 inline-flex min-h-11 items-center justify-center rounded-xs px-4 py-2 text-sm font-medium leading-none text-neutral-900 transition-colors";

const thumbClassName =
  "relative z-10 flex aspect-square w-[5.5rem] items-center justify-center rounded-xs text-sm text-neutral-900 transition-colors";

function DemoTab({ label }: { label: string }) {
  return <div className={tabClassName}>{label}</div>;
}

export function SharedLayoutBgDemo() {
  return (
    <SharedLayoutBg className="inline-flex gap-1.5" pillClassName="rounded-xs bg-neutral-100">
      {["60 cm", "80 cm", "100 cm"].map((label) => (
        <div
          key={label}
          className="relative shrink-0 rounded-xs border border-neutral-200 bg-neutral-0 transition-[border-color] duration-base"
        >
          <DemoTab label={label} />
        </div>
      ))}
    </SharedLayoutBg>
  );
}

export function SharedLayoutUnderlineDemo() {
  const [selected, setSelected] = useState("Biały");

  return (
    <SharedLayoutUnderline className="inline-flex" lineClassName="bg-neutral-900/40">
      {["Biały", "Grafit", "Dąb"].map((label) => {
        const isSelected = selected === label;

        return (
          <button
            key={label}
            type="button"
            aria-pressed={isSelected}
            aria-label={label}
            className="relative shrink-0"
            onClick={() => setSelected(label)}
          >
            <div className={cn(thumbClassName, isSelected ? "bg-neutral-50" : "bg-transparent")}>
              <span aria-hidden="true">{label.slice(0, 1)}</span>
            </div>
            <span
              className={cn("block h-px w-full", isSelected ? "bg-neutral-900" : "bg-transparent")}
              aria-hidden="true"
            />
          </button>
        );
      })}
    </SharedLayoutUnderline>
  );
}

export function SharedLayoutBgSegmentDemo() {
  return (
    <div className="inline-flex rounded-xs border border-neutral-200 bg-neutral-0 p-1">
      <SharedLayoutBg className="inline-flex gap-1" pillClassName="rounded-xs bg-neutral-100">
        {["Lista", "Siatka"].map((label) => (
          <div key={label} className="relative shrink-0">
            <DemoTab label={label} />
          </div>
        ))}
      </SharedLayoutBg>
    </div>
  );
}
