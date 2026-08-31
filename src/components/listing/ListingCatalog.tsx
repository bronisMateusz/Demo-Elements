import { useMemo, useRef, useState } from "react";
import {
  createEmptyListingFilterState,
  listingPage,
  listingProducts,
} from "../../data/listing";
import { filterAndSortListingProducts } from "../../lib/listingFilters";
import type { ListingFilterState } from "../../types/listing";
import { cn } from "../../lib/cn";
import { ListingFilters } from "./ListingFilters";
import { ListingFiltersDrawer } from "./ListingFiltersDrawer";
import { ListingFiltersSticky } from "./ListingFiltersSticky";
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

  const totalCount = filteredProducts.length;
  const pageCount = Math.max(1, Math.ceil(totalCount / LISTING_PAGE_SIZE));
  const safePage = Math.min(page, pageCount);
  const shownCount = Math.min(safePage * LISTING_PAGE_SIZE, totalCount);

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
    const clamped = Math.min(Math.max(1, nextPage), pageCount);
    setPage(clamped);
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
            <ListingFiltersSticky>
              <ListingFilters
                state={filterState}
                onChange={updateFilters}
                onClear={clearFilters}
              />
            </ListingFiltersSticky>
          </aside>
        ) : null}

        <div className="min-w-0">
          <ListingToolbar
            resultCount={totalCount}
            filterState={filterState}
            onFilterChange={updateFilters}
            onOpenFilters={() => setFiltersOpen(true)}
            className="mb-6 md:mb-8"
          />
          <ListingProductGrid
            products={pageProducts}
            promo={listingPage.gridPromo}
            onClearFilters={clearFilters}
          />
          <ListingPagination
            shownCount={shownCount}
            totalCount={totalCount}
            page={safePage}
            pageCount={pageCount}
            onShowMore={() => goToPage(safePage + 1)}
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
        resultCount={totalCount}
      />
    </>
  );
}
