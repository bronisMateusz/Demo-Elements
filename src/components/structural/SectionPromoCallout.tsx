import { cn } from "../../lib/cn";

export type SectionPromoCalloutContent = {
  iconClass: string;
  title: string;
  description: string;
};

type SectionPromoCalloutProps = SectionPromoCalloutContent & {
  className?: string;
};

/** Compact icon + copy callout above section content (e.g. architect inspirations). */
export function SectionPromoCallout({
  iconClass,
  title,
  description,
  className,
}: SectionPromoCalloutProps) {
  return (
    <div
      className={cn(
        "flex items-start gap-4 rounded-xs bg-gold-50 px-4 py-5 sm:items-center sm:gap-5 sm:px-5 sm:py-6",
        className,
      )}
    >
      <i
        className={cn(iconClass, "shrink-0 text-3xl leading-none text-neutral-900")}
        aria-hidden="true"
      />
      <div className="min-w-0">
        <p className="m-0 font-body text-sm leading-snug font-medium text-neutral-900 md:text-ui">
          {title}
        </p>
        <p className="mt-1.5 mb-0 font-body text-sm leading-snug text-neutral-600">
          {description}
        </p>
      </div>
    </div>
  );
}
