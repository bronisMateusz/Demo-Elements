import { useId, useState } from "react";
import { Container } from "../ui/Container";
import { SectionHeader } from "../structural/SectionHeader";
import type { ProductSpec } from "../../types/product";
import { cn } from "../../lib/cn";

type ProductSpecificationsProps = {
  specs: ProductSpec[];
};

/** Set to true to truncate specs and show the expand/collapse control. */
const SPECIFICATIONS_EXPAND_ENABLED = false;
const VISIBLE_COUNT = 6;

export function ProductSpecifications({ specs }: ProductSpecificationsProps) {
  const [expanded, setExpanded] = useState(false);
  const panelId = useId();
  const showExpandToggle = SPECIFICATIONS_EXPAND_ENABLED && specs.length > VISIBLE_COUNT;
  const visibleSpecs =
    !SPECIFICATIONS_EXPAND_ENABLED || expanded ? specs : specs.slice(0, VISIBLE_COUNT);

  return (
    <section aria-labelledby="specs-title">
      <Container>
        <SectionHeader title="Specyfikacja techniczna" titleId="specs-title" />
        <dl className="grid gap-x-12 gap-y-0 border-t border-neutral-200 sm:grid-cols-2">
          {visibleSpecs.map((spec) => (
            <div
              key={spec.label}
              className="grid grid-cols-[1fr_auto] gap-4 border-b border-neutral-200 py-4"
            >
              <dt className="text-ui text-neutral-600">{spec.label}</dt>
              <dd className="text-ui text-neutral-900 text-right">{spec.value}</dd>
            </div>
          ))}
        </dl>
        {showExpandToggle ? (
          <button
            type="button"
            className={cn(
              "mt-6 inline-flex items-center gap-2 font-body text-ui text-neutral-800 underline-offset-4 hover:underline",
            )}
            aria-expanded={expanded}
            aria-controls={panelId}
            onClick={() => setExpanded((value) => !value)}
          >
            {expanded ? "Zwiń specyfikację" : "Rozwiń specyfikację"}
            <i
              className={cn("ph ph-caret-down transition-transform", expanded && "rotate-180")}
              aria-hidden="true"
            />
          </button>
        ) : null}
        {showExpandToggle ? (
          <div id={panelId} className="sr-only">
            {expanded ? "Pełna specyfikacja widoczna" : "Skrócona specyfikacja"}
          </div>
        ) : null}
      </Container>
    </section>
  );
}
