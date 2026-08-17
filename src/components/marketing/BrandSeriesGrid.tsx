import { cn } from "../../lib/cn";
import { productImageObjectPosition } from "../../lib/productImageStyle";
import { Container } from "../ui/Container";
import type { BrandSeries } from "../../data/producers";

type BrandSeriesGridProps = {
  title: string;
  titleId?: string;
  series: readonly BrandSeries[];
  className?: string;
};

export function BrandSeriesGrid({
  title,
  titleId = "brand-series-title",
  series,
  className,
}: BrandSeriesGridProps) {
  return (
    <section
      aria-labelledby={titleId}
      className={cn(
        "border-t border-neutral-200 py-[clamp(2.5rem,6vw,4rem)]",
        className,
      )}
    >
      <Container size="content">
        <h2
          id={titleId}
          className="m-0 font-heading text-h2 leading-[1.1] font-medium tracking-tight text-neutral-900"
        >
          {title}
        </h2>
        <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {series.map((item) => (
            <a
              key={item.id}
              href={item.href}
              className="group flex flex-col gap-3 no-underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neutral-800"
            >
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
