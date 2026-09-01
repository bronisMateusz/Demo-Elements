import { useId, useState } from "react";
import { Container } from "../ui/Container";
import { SectionHeader } from "../structural/SectionHeader";
import type { ProductSpec } from "../../types/product";
import { pdpAccordionToggleClassName } from "../../constants/pdpSubnav";
import { usePdpSectionAccordion } from "../../hooks/usePdpSectionAccordion";
import { AccordionCollapse } from "../motion/AccordionCollapse";
import { cn } from "../../lib/cn";

type ProductSpecificationsProps = {
  specs: ProductSpec[];
  title?: string;
  titleId?: string;
  /**
   * When set, mobile accordion opens when the PDP subnav navigates to this
   * section id (or the URL hash matches). Closed by default on mobile.
   */
  expandOnSectionId?: string;
};

/** Set to true to truncate specs and show the expand/collapse control. */
const SPECIFICATIONS_EXPAND_ENABLED = false;
const VISIBLE_COUNT = 6;

export function ProductSpecifications({
  specs,
  title = "Specyfikacja techniczna",
  titleId = "specs-title",
  expandOnSectionId,
}: ProductSpecificationsProps) {
  const [listExpanded, setListExpanded] = useState(false);
  const panelId = useId();
  const truncatePanelId = useId();
  const { open, setOpen, accordionEnabled } =
    usePdpSectionAccordion(expandOnSectionId);

  const showExpandToggle =
    SPECIFICATIONS_EXPAND_ENABLED && specs.length > VISIBLE_COUNT;
  const visibleSpecs =
    !SPECIFICATIONS_EXPAND_ENABLED || listExpanded
      ? specs
      : specs.slice(0, VISIBLE_COUNT);

  const list = (
    <>
      <dl className="grid gap-x-16 gap-y-0 overflow-hidden border border-neutral-300 bg-white px-4 sm:grid-cols-2 sm:gap-x-20 sm:px-5 xl:grid-cols-3 xl:gap-x-24">
        {visibleSpecs.map((spec) => (
          <div
            key={spec.label}
            className="grid grid-cols-[1fr_auto] gap-4 border-b border-neutral-300 py-3.5 last:border-b-0"
          >
            <dt className="text-ui font-semibold text-neutral-900">
              {spec.label}
            </dt>
            <dd className="text-ui text-end text-neutral-700">{spec.value}</dd>
          </div>
        ))}
      </dl>
      {showExpandToggle ? (
        <button
          type="button"
          className={cn(
            "mt-6 inline-flex items-center gap-2 font-body text-ui text-neutral-800 underline-offset-4 hover:underline",
          )}
          aria-expanded={listExpanded}
          aria-controls={truncatePanelId}
          onClick={() => setListExpanded((value) => !value)}
        >
          {listExpanded ? "Zwiń specyfikację" : "Rozwiń specyfikację"}
          <i
            className={cn(
              "ph ph-caret-down transition-transform",
              listExpanded && "rotate-180",
            )}
            aria-hidden="true"
          />
        </button>
      ) : null}
      {showExpandToggle ? (
        <div id={truncatePanelId} className="sr-only">
          {listExpanded
            ? "Pełna specyfikacja widoczna"
            : "Skrócona specyfikacja"}
        </div>
      ) : null}
    </>
  );

  return (
    <section aria-labelledby={titleId}>
      <Container size="content">
        {accordionEnabled ? (
          <>
            <button
              type="button"
              className={pdpAccordionToggleClassName}
              aria-expanded={open}
              aria-controls={panelId}
              onClick={() => setOpen((value) => !value)}
            >
              <span
                id={titleId}
                className="font-heading text-h2 leading-[1.1] font-medium tracking-tight text-neutral-900"
              >
                {title}
              </span>
              <i
                className={cn(
                  "ph ph-caret-down shrink-0 text-xl leading-none text-neutral-500 transition-transform duration-base ease-luxury",
                  open && "rotate-180",
                )}
                aria-hidden="true"
              />
            </button>

            <div className="hidden md:block">
              <SectionHeader title={title} titleId={`${titleId}-desktop`} />
              {list}
            </div>

            <AccordionCollapse
              open={open}
              id={panelId}
              className="md:hidden"
              innerClassName="pt-4"
            >
              {list}
            </AccordionCollapse>
          </>
        ) : (
          <>
            <SectionHeader title={title} titleId={titleId} />
            {list}
          </>
        )}
      </Container>
    </section>
  );
}
