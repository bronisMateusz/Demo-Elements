import { useId } from "react";
import { Container } from "../ui/Container";
import { SectionHeader } from "../structural/SectionHeader";
import { SharedLayoutBg } from "../motion/SharedLayoutBg";
import { AccordionCollapse } from "../motion/AccordionCollapse";
import type { ProductDownload } from "../../types/product";
import { usePdpSectionAccordion } from "../../hooks/usePdpSectionAccordion";
import { cn } from "../../lib/cn";

type ProductDownloadsProps = {
  downloads: readonly ProductDownload[];
  title?: string;
  titleId?: string;
  /**
   * When set, mobile accordion opens when the PDP subnav navigates to this
   * section id (or the URL hash matches). Closed by default on mobile.
   */
  expandOnSectionId?: string;
};

export function ProductDownloads({
  downloads,
  title = "Pliki do pobrania",
  titleId = "downloads-title",
  expandOnSectionId,
}: ProductDownloadsProps) {
  const panelId = useId();
  const { open, setOpen, accordionEnabled } =
    usePdpSectionAccordion(expandOnSectionId);

  const list = (
    <div className="border-t border-neutral-200">
      <SharedLayoutBg
        className="grid w-full lg:grid-cols-2"
        pillClassName="rounded-xs bg-neutral-100"
      >
        {downloads.map((file) => (
          <a
            key={file.title}
            href={file.href}
            className="relative flex items-center justify-between gap-4 border-b border-neutral-200 px-4 py-5 no-underline lg:odd:border-e"
          >
            <div className="relative z-10 flex min-w-0 items-center gap-4">
              <span className="font-body text-xs uppercase tracking-[0.12em] text-neutral-500">
                {file.format}
              </span>
              <div className="min-w-0">
                <p className="text-ui text-neutral-900">{file.title}</p>
                <p className="text-sm text-neutral-500">{file.size}</p>
              </div>
            </div>
            <span className="relative z-10 inline-flex shrink-0 items-center gap-2 text-ui text-neutral-600">
              Pobierz
              <i className="ph ph-download-simple" aria-hidden="true" />
            </span>
          </a>
        ))}
      </SharedLayoutBg>
    </div>
  );

  return (
    <section aria-labelledby={titleId}>
      <Container size="content">
        {accordionEnabled ? (
          <>
            <button
              type="button"
              className={cn(
                "flex w-full items-center justify-between gap-3 py-1 text-start md:hidden",
                "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neutral-800",
              )}
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
