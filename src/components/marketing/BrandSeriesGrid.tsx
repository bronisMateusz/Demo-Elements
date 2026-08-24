import { cn } from "../../lib/cn";
import { sectionPaddingClassName } from "../../lib/layoutTokens";
import { productImageObjectPosition } from "../../lib/productImageStyle";
import { Container } from "../ui/Container";
import type { BrandSeries } from "../../data/producers";

type BrandSeriesGridProps = {
  title: string;
  titleId?: string;
  series: readonly BrandSeries[];
  className?: string;
};

const seriesGridClassName = [
  "mt-8 grid gap-5",
  "max-md:auto-cols-[70%] max-md:grid-flow-col max-md:grid-cols-none",
  "max-md:overflow-x-auto max-md:overscroll-x-contain max-md:snap-x max-md:snap-mandatory",
  "max-md:scrollbar-none",
  "md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5",
].join(" ");

const seriesTileClassName =
  "group flex max-md:snap-start flex-col gap-3 no-underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neutral-800";

export function BrandSeriesGrid({
  title,
  titleId = "brand-series-title",
  series,
  className,
}: BrandSeriesGridProps) {
  return (
    <section
      aria-labelledby={titleId}
      className={cn(sectionPaddingClassName, className)}
    >
      <Container size="content">
        <h2
          id={titleId}
          className="m-0 font-heading text-h2 leading-[1.1] font-medium tracking-tight text-neutral-900"
        >
          {title}
        </h2>
        <div className={seriesGridClassName}>
          {series.map((item) => (
            <a key={item.id} href={item.href} className={seriesTileClassName}>
              <div className="relative aspect-4/3 overflow-hidden rounded-xs border border-neutral-200 bg-neutral-100 transition-[border-color] duration-fast ease-out group-hover:border-gold-500">
                <img
                  src={item.image.src}
                  alt={item.image.alt}
                  className="absolute inset-0 size-full object-cover transition-transform duration-slow ease-luxury group-hover:scale-105"
                  style={{
                    objectPosition: productImageObjectPosition(item.image),
                  }}
                  loading="lazy"
                  decoding="async"
                  draggable={false}
                />
              </div>
              <div className="flex items-center justify-between gap-3">
                <span className="font-body text-base font-medium tracking-tight text-neutral-900 transition-colors duration-fast group-hover:text-neutral-700">
                  {item.name}
                </span>
                <i
                  className="ph ph-arrow-right text-base text-neutral-500"
                  aria-hidden="true"
                />
              </div>
            </a>
          ))}
        </div>
      </Container>
    </section>
  );
}
