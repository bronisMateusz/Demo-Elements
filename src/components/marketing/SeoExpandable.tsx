import { useId, useMemo, useState, type ReactNode } from "react";
import type { SeoBlock } from "../../data/seoBlocks";
import { cn } from "../../lib/cn";
import { Container } from "../ui/Container";
import { Section } from "../structural/Section";

type SeoExpandableProps = {
  id?: string;
  blocks: SeoBlock[];
  collapsedMaxHeightClassName?: string;
  expandLabel?: string;
  collapseLabel?: string;
};

function blockWeight(block: SeoBlock): number {
  if (block.type === "ul") {
    return block.items.reduce((sum, item) => sum + item.length, 0);
  }
  return block.text.length;
}

/** Split into two stable columns (grid), preferring a cut before an h2 near mid-length. */
function splitBlocksIntoColumns(blocks: SeoBlock[]): [SeoBlock[], SeoBlock[]] {
  if (blocks.length <= 1) return [blocks, []];

  const total = blocks.reduce((sum, block) => sum + blockWeight(block), 0);
  const target = total / 2;
  let running = 0;
  let midIndex = Math.ceil(blocks.length / 2);

  for (let index = 0; index < blocks.length; index += 1) {
    running += blockWeight(blocks[index]!);
    if (running >= target) {
      midIndex = index + 1;
      break;
    }
  }

  // Prefer breaking before the next h2 so a section is not split mid-way.
  const searchFrom = Math.max(1, midIndex - 2);
  const searchTo = Math.min(blocks.length - 1, midIndex + 3);
  for (let index = searchFrom; index <= searchTo; index += 1) {
    if (blocks[index]?.type === "h2") {
      midIndex = index;
      break;
    }
  }

  if (midIndex <= 0 || midIndex >= blocks.length) {
    midIndex = Math.ceil(blocks.length / 2);
  }

  return [blocks.slice(0, midIndex), blocks.slice(midIndex)];
}

function SeoBlockList({
  blocks,
  startIndex,
}: {
  blocks: SeoBlock[];
  startIndex: number;
}) {
  return (
    <div className="min-w-0">
      {blocks.map((block, index) => {
        const key = `${block.type}-${startIndex + index}`;
        const isFirst = startIndex + index === 0 && index === 0;
        const isColumnStart = index === 0 && startIndex > 0;

        if (block.type === "h2") {
          return (
            <h2
              key={key}
              className={cn(
                "font-heading text-h3 leading-[1.15] font-medium tracking-tight text-neutral-900",
                isFirst || isColumnStart ? "mt-0 mb-4" : "mt-8 mb-4",
              )}
            >
              {block.text}
            </h2>
          );
        }
        if (block.type === "h3") {
          return (
            <h3
              key={key}
              className="mt-6 mb-3 font-heading text-h4 leading-[1.2] font-medium tracking-tight text-neutral-900"
            >
              {block.text}
            </h3>
          );
        }
        if (block.type === "ul") {
          return (
            <ul
              key={key}
              className="mt-3 mb-0 list-disc space-y-2 ps-5 font-body text-sm leading-relaxed text-neutral-700 md:text-ui"
            >
              {block.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          );
        }
        return (
          <p
            key={key}
            className="mt-3 mb-0 font-body text-sm leading-relaxed text-neutral-700 md:text-ui"
          >
            {block.text}
          </p>
        );
      })}
    </div>
  );
}

export function SeoExpandable({
  id = "seo",
  blocks,
  collapsedMaxHeightClassName = "max-h-85",
  expandLabel = "Pokaż więcej",
  collapseLabel = "Pokaż mniej",
}: SeoExpandableProps) {
  const [expanded, setExpanded] = useState(false);
  const bodyId = useId();
  const [leftBlocks, rightBlocks] = useMemo(
    () => splitBlocksIntoColumns(blocks),
    [blocks],
  );

  let columns: ReactNode;
  if (rightBlocks.length === 0) {
    columns = <SeoBlockList blocks={leftBlocks} startIndex={0} />;
  } else {
    columns = (
      <div className="grid gap-8 md:grid-cols-2 md:gap-x-10 lg:gap-x-12">
        <SeoBlockList blocks={leftBlocks} startIndex={0} />
        <SeoBlockList blocks={rightBlocks} startIndex={leftBlocks.length} />
      </div>
    );
  }

  return (
    <Section id={id} ariaLabelledby={undefined} tone="default">
      <Container size="content">
        <div className="relative">
          <div
            id={bodyId}
            className={cn(
              "overflow-hidden",
              !expanded && collapsedMaxHeightClassName,
            )}
          >
            {columns}
          </div>

          {!expanded ? (
            <div
              className="pointer-events-none absolute inset-x-0 bottom-0 h-28 bg-linear-to-t from-neutral-0 to-transparent"
              aria-hidden="true"
            />
          ) : null}
        </div>

        <button
          type="button"
          className={cn(
            "mx-auto mt-6 flex items-center gap-2 font-body text-sm font-medium text-gold-700 md:mx-0",
            "transition-colors duration-fast ease-out hover:text-gold-500",
            "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-500",
          )}
          aria-expanded={expanded}
          aria-controls={bodyId}
          onClick={() => setExpanded((value) => !value)}
        >
          {expanded ? collapseLabel : expandLabel}
          <i
            className={cn(
              "ph text-sm",
              expanded ? "ph-caret-up" : "ph-caret-down",
            )}
            aria-hidden="true"
          />
        </button>
      </Container>
    </Section>
  );
}
