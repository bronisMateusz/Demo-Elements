import { useId, useState } from "react";
import { pdpSectionScrollMarginClassName } from "../../constants/pdpSubnav";
import { architectZonePage } from "../../data/architectZone";
import { cn } from "../../lib/cn";
import { AccordionCollapse } from "../motion/AccordionCollapse";
import { TextRevealLead } from "../motion/TextRevealLead";
import { Section } from "../structural/Section";
import { Container } from "../ui/Container";
import { Eyebrow } from "../ui/Eyebrow";

const { faq } = architectZonePage;

/**
 * Architect FAQ - desktop two columns (eyebrow+H2 | accordion list).
 * Multiple panels can stay open; first question starts expanded.
 */
export function ArchitectFaq() {
  const baseId = useId();
  const [openIds, setOpenIds] = useState<ReadonlySet<string>>(
    () => new Set([faq.items[0]?.id].filter(Boolean) as string[]),
  );

  const toggle = (id: string) => {
    setOpenIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  return (
    <Section
      id={faq.id}
      ariaLabelledby="architect-faq-title"
      className={pdpSectionScrollMarginClassName}
    >
      <Container size="content">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-14 xl:gap-16">
          <div className="min-w-0 lg:sticky lg:top-32 lg:self-start">
            <Eyebrow variant="muted" className="mb-3">
              {faq.eyebrow}
            </Eyebrow>
            <TextRevealLead
              id="architect-faq-title"
              revealUnit="word"
              typographyClassName="font-heading text-h2 leading-[1.1] tracking-tight font-medium"
              mutedClassName="text-neutral-900/20"
              fillClassName="text-neutral-900"
            >
              {faq.title}
            </TextRevealLead>
          </div>

          <ul className="m-0 list-none divide-y divide-neutral-300 border-y border-neutral-300 p-0">
            {faq.items.map((item, index) => {
              const open = openIds.has(item.id);
              const panelId = `${baseId}-panel-${item.id}`;
              const buttonId = `${baseId}-button-${item.id}`;

              return (
                <li key={item.id}>
                  <h3 className="m-0">
                    <button
                      type="button"
                      id={buttonId}
                      className={cn(
                        "flex w-full cursor-pointer items-start justify-between gap-4 py-5 text-start",
                        "font-heading text-lg leading-snug font-medium text-neutral-900 md:text-xl",
                        "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-500",
                      )}
                      aria-expanded={open}
                      aria-controls={panelId}
                      onClick={() => toggle(item.id)}
                    >
                      <span className="min-w-0">
                        <span className="me-3 font-body text-sm tabular-nums text-neutral-500">
                          {String(index + 1).padStart(2, "0")}
                        </span>
                        {item.question}
                      </span>
                      <i
                        className={cn(
                          "ph shrink-0 text-xl leading-none text-neutral-700 transition-transform duration-base ease-luxury",
                          open ? "ph-minus rotate-0" : "ph-plus",
                        )}
                        aria-hidden="true"
                      />
                    </button>
                  </h3>
                  <AccordionCollapse
                    open={open}
                    id={panelId}
                    innerClassName="pb-5"
                  >
                    <p
                      className="m-0 max-w-prose ps-10 font-body text-ui leading-relaxed text-neutral-600"
                      role="region"
                      aria-labelledby={buttonId}
                    >
                      {item.answer}
                    </p>
                  </AccordionCollapse>
                </li>
              );
            })}
          </ul>
        </div>
      </Container>
    </Section>
  );
}
