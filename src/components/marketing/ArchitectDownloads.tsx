import { useId, useState } from "react";
import type {
  ArchitectDownloadFile,
  ArchitectDownloadGroup,
} from "../../data/architectDownloads";
import { cn } from "../../lib/cn";
import { AccordionCollapse } from "../motion/AccordionCollapse";
import { SharedLayoutBg } from "../motion/SharedLayoutBg";
import { SectionHeader } from "../structural/SectionHeader";
import { Container } from "../ui/Container";

type ArchitectDownloadsProps = {
  groups: readonly ArchitectDownloadGroup[];
  title: string;
  titleId?: string;
  description?: string;
  className?: string;
};

function DownloadList({ files }: { files: readonly ArchitectDownloadFile[] }) {
  return (
    <div className="border-t border-neutral-200">
      <SharedLayoutBg
        className="grid w-full lg:grid-cols-2"
        pillClassName="rounded-xs bg-neutral-100"
      >
        {files.map((file) => (
          <a
            key={file.href + file.title}
            href={file.href}
            className="relative flex items-center justify-between gap-4 border-b border-neutral-200 px-4 py-5 no-underline lg:odd:border-e"
          >
            <div className="relative z-10 flex min-w-0 items-center gap-4">
              <span className="font-body text-xs tracking-[0.12em] text-neutral-500 uppercase">
                {file.format}
              </span>
              <div className="min-w-0">
                <p className="m-0 font-body text-ui text-neutral-900">
                  {file.title}
                </p>
              </div>
            </div>
            <span className="relative z-10 inline-flex shrink-0 items-center gap-2 font-body text-ui text-neutral-600">
              Pobierz
              <i className="ph ph-download-simple" aria-hidden="true" />
            </span>
          </a>
        ))}
      </SharedLayoutBg>
    </div>
  );
}

/** Brand-grouped CAD / 3D download accordions for the architect zone. */
export function ArchitectDownloads({
  groups,
  title,
  titleId = "architect-downloads-title",
  description,
  className,
}: ArchitectDownloadsProps) {
  const baseId = useId();
  const [openId, setOpenId] = useState<string | null>(null);

  return (
    <section aria-labelledby={titleId} className={className}>
      <Container size="content">
        <SectionHeader
          title={title}
          titleId={titleId}
          lead={description}
          className="mb-8 md:mb-10"
        />

        <div className="border-t border-neutral-200">
          {groups.map((group) => {
            const open = openId === group.id;
            const panelId = `${baseId}-${group.id}`;
            const count = group.files.length;

            return (
              <div
                key={group.id}
                className="border-b border-neutral-200 last:border-b-0"
              >
                <button
                  type="button"
                  className={cn(
                    "flex min-h-14 w-full cursor-pointer items-center justify-between gap-3 py-3 text-start",
                    "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neutral-800",
                  )}
                  aria-expanded={open}
                  aria-controls={panelId}
                  onClick={() =>
                    setOpenId((current) =>
                      current === group.id ? null : group.id,
                    )
                  }
                >
                  <span className="font-heading text-h4 leading-snug font-medium text-neutral-900">
                    {group.label}
                    <span className="ms-2 font-body text-sm font-normal text-neutral-500 tabular-nums">
                      ({count})
                    </span>
                  </span>
                  <i
                    className={cn(
                      "ph ph-caret-down shrink-0 text-xl leading-none text-neutral-500 transition-transform duration-base ease-luxury",
                      open && "rotate-180",
                    )}
                    aria-hidden="true"
                  />
                </button>

                <AccordionCollapse open={open} id={panelId}>
                  <DownloadList files={group.files} />
                </AccordionCollapse>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
