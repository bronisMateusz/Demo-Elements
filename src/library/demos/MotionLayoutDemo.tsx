import { cn } from "../../lib/cn";
import { SharedLayoutBg } from "../../components/motion/SharedLayoutBg";
import { SharedLayoutUnderline } from "../../components/motion/SharedLayoutUnderline";

const tabClassName =
  "relative z-10 min-h-11 rounded-xs px-4 py-2 text-sm font-medium text-neutral-900 transition-colors";

const thumbClassName =
  "relative z-10 flex aspect-square w-20 items-center justify-center rounded-xs bg-neutral-50 text-sm text-neutral-900";

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
  return (
    <SharedLayoutUnderline className="inline-flex" lineClassName="bg-neutral-900/40">
      {["Biały", "Grafit", "Dąb"].map((label) => (
        <div key={label} className="relative shrink-0">
          <div className={cn(thumbClassName, "w-[5.5rem]")}>
            <span aria-hidden="true">{label.slice(0, 1)}</span>
            <span className="sr-only">{label}</span>
          </div>
          <span className="block h-px w-full bg-neutral-900" aria-hidden="true" />
        </div>
      ))}
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
