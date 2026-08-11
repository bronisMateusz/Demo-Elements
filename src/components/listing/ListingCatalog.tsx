import { useMemo, useRef, useState } from "react";
import {
  createEmptyListingFilterState,
  listingProducts,
} from "../../data/listing";
import { filterAndSortListingProducts } from "../../lib/listingFilters";
import type { ListingFilterState } from "../../types/listing";
import { cn } from "../../lib/cn";
import { stickyUnderHeaderClassName } from "../../lib/layoutTokens";
import { ListingFilters } from "./ListingFilters";
import { ListingFiltersDrawer } from "./ListingFiltersDrawer";
import { ListingPagination } from "./ListingPagination";
import { ListingProductGrid } from "./ListingProductGrid";
import { ListingToolbar } from "./ListingToolbar";

const LISTING_PAGE_SIZE = 12;

type ListingCatalogProps = {
  className?: string;
  /** Show desktop sidebar filters (default true). */
  showSidebar?: boolean;
};

/** Interactive PLP catalog: facets + toolbar + product grid. */
export function ListingCatalog({
  className,
  showSidebar = true,
}: ListingCatalogProps) {
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [page, setPage] = useState(1);
  const catalogRef = useRef<HTMLDivElement>(null);
  const [filterState, setFilterState] = useState<ListingFilterState>(() =>
    createEmptyListingFilterState(),
  );

  const filteredProducts = useMemo(
    () => filterAndSortListingProducts(listingProducts, filterState),
    [filterState],
  );

  const pageCount = Math.max(
    1,
    Math.ceil(filteredProducts.length / LISTING_PAGE_SIZE),
  );
  const safePage = Math.min(page, pageCount);

  const pageProducts = useMemo(() => {
    const start = (safePage - 1) * LISTING_PAGE_SIZE;
    return filteredProducts.slice(start, start + LISTING_PAGE_SIZE);
  }, [filteredProducts, safePage]);

  const updateFilters = (next: ListingFilterState) => {
    setFilterState(next);
    setPage(1);
  };

  const clearFilters = () => {
    updateFilters(createEmptyListingFilterState(filterState.sort));
  };

  const goToPage = (nextPage: number) => {
    setPage(nextPage);
    catalogRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <>
      <div
        ref={catalogRef}
        className={cn(
          showSidebar &&
            "grid items-start gap-8 lg:grid-cols-[minmax(0,16rem)_minmax(0,1fr)] lg:gap-10 xl:grid-cols-[minmax(0,18rem)_minmax(0,1fr)]",
          className,
        )}
      >
        {showSidebar ? (
          <aside className="hidden self-stretch lg:block">
            <div className={stickyUnderHeaderClassName}>
              <ListingFilters
                state={filterState}
                onChange={updateFilters}
                onClear={clearFilters}
                collapseOnScroll
              />
            </div>
          </aside>
        ) : null}

        <div className="min-w-0">
          <ListingToolbar
            resultCount={filteredProducts.length}
            filterState={filterState}
            onFilterChange={updateFilters}
            onOpenFilters={() => setFiltersOpen(true)}
            className="mb-6 md:mb-8"
          />
          <ListingProductGrid
            products={pageProducts}
            onClearFilters={clearFilters}
          />
          <ListingPagination
            page={safePage}
            pageCount={pageCount}
            onPageChange={goToPage}
          />
        </div>
      </div>

      <ListingFiltersDrawer
        open={filtersOpen}
        onClose={() => setFiltersOpen(false)}
        state={filterState}
        onChange={updateFilters}
        onClear={clearFilters}
      />
    </>
  );
}
