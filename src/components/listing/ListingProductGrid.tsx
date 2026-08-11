import { cn } from "../../lib/cn";
import type { ListingProduct } from "../../types/listing";
import { ProductCarouselCard } from "../product/ProductCarouselCard";
import { Button } from "../ui/Button";

type ListingProductGridProps = {
  products: ListingProduct[];
  onClearFilters?: () => void;
  className?: string;
};

export function ListingProductGrid({
  products,
  onClearFilters,
  className,
}: ListingProductGridProps) {
  if (products.length === 0) {
    return (
      <div
        className={cn(
          "flex flex-col items-start gap-4 rounded-xs bg-neutral-50 px-5 py-10 sm:px-8",
          className,
        )}
      >
        <p className="m-0 font-heading text-lg font-medium text-neutral-900">
          Brak produktów dla wybranych filtrów
        </p>
        <p className="m-0 max-w-md font-body text-sm leading-relaxed text-neutral-600">
          Spróbuj zmienić kryteria albo wyczyść filtry, aby zobaczyć pełną
          ofertę.
        </p>
        {onClearFilters ? (
          <Button
            as="button"
            type="button"
            variant="primary"
            onClick={onClearFilters}
          >
            Wyczyść filtry
          </Button>
        ) : null}
      </div>
    );
  }

  return (
    <ul
      className={cn(
        "m-0 grid list-none grid-cols-2 gap-x-3 gap-y-8 p-0 sm:gap-x-4 md:grid-cols-3 md:gap-y-10 xl:grid-cols-3",
        className,
      )}
    >
      {products.map((product) => (
        <li key={product.id} className="min-w-0">
          <ProductCarouselCard product={product} />
        </li>
      ))}
    </ul>
  );
}
