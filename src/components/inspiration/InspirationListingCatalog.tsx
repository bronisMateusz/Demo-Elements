import { useMemo, useState } from "react";
import type {
  ListingGridAdvisorCta,
  ListingGridLocateCta,
  ListingGridPromo,
} from "../../types/listing";
import type {
  InspirationListingFilter,
  InspirationListingItem,
} from "../../types/inspiration";
import { useStickyUnderHeader } from "../../hooks/useStickyUnderHeader";
import { cn } from "../../lib/cn";
import {
  internalSubnavMarginBottomClassName,
  pxGutterClassName,
  stickyUnderHeaderClassName,
} from "../../lib/layoutTokens";
import { InternalSubnav } from "../ui/InternalSubnav";
import { ListingPagination } from "../listing/ListingPagination";
import type { InspirationGalleryCardAction } from "./InspirationGalleryCard";
import { InspirationListingGrid } from "./InspirationListingGrid";

export type InspirationListingCatalogProps = {
  items: InspirationListingItem[];
  filters: readonly InspirationListingFilter[];
  pageSize: number;
  itemLabel: string;
  progressAriaLabel: string;
  navAriaLabel: string;
  filterAriaLabel: string;
  /** Field used for chip filtering (styleTags array or producerTag string). */
  filterMode: "styleTags" | "producerTag";
  cardAction?: InspirationGalleryCardAction;
  showFavorite?: boolean;
  promo?: ListingGridPromo;
  onPromoCtaClick?: () => void;
  advisorCta?: ListingGridAdvisorCta;
  onAdvisorAskOpen?: () => void;
  onAdvisorBookOpen?: () => void;
  locateCta?: ListingGridLocateCta;
  onLocateCtaClick?: () => void;
  emptyTitle?: string;
  emptyDescription?: string;
  columns?: 2 | 3;
};

function filterItems(
  items: InspirationListingItem[],
  filterId: string,
  filterMode: InspirationListingCatalogProps["filterMode"],
) {
  if (filterId === "all") return items;
  if (filterMode === "producerTag") {
    return items.filter((item) => item.producerTag === filterId);
  }
  return items.filter((item) => item.styleTags?.includes(filterId));
}

export function InspirationListingCatalog({
  items,
  filters,
  pageSize,
  itemLabel,
  progressAriaLabel,
  navAriaLabel,
  filterAriaLabel,
  filterMode,
  cardAction,
  showFavorite = false,
  promo,
  onPromoCtaClick,
  advisorCta,
  onAdvisorAskOpen,
  onAdvisorBookOpen,
  locateCta,
  onLocateCtaClick,
  emptyTitle,
  emptyDescription,
  columns = 2,
}: InspirationListingCatalogProps) {
  const [activeFilter, setActiveFilter] = useState(filters[0]?.id ?? "all");
  const [page, setPage] = useState(1);
  const { stuck, sentinelRef } = useStickyUnderHeader();

  const filteredItems = useMemo(
    () => filterItems(items, activeFilter, filterMode),
    [items, activeFilter, filterMode],
  );

  const totalCount = filteredItems.length;
  const pageCount = Math.max(1, Math.ceil(totalCount / pageSize));
  const safePage = Math.min(Math.max(1, page), pageCount);
  const shownCount = Math.min(safePage * pageSize, totalCount);

  const pageItems = useMemo(() => {
    const start = (safePage - 1) * pageSize;
    return filteredItems.slice(start, start + pageSize);
  }, [filteredItems, safePage, pageSize]);

  const chips = filters.map((filter) => ({
    id: filter.id,
    label: filter.label,
  }));

  const selectFilter = (id: string) => {
    setActiveFilter(id);
    setPage(1);
  };

  return (
    <div>
      <div ref={sentinelRef} className="h-px" aria-hidden="true" />
      <div
        className={cn(
          stickyUnderHeaderClassName,
          internalSubnavMarginBottomClassName,
          "z-99",
          stuck &&
            "w-screen ms-[calc(50%-50vw)] border-b border-neutral-300 bg-neutral-0/95 backdrop-blur-sm",
        )}
      >
        <InternalSubnav
          items={chips}
          activeId={activeFilter}
          onSelect={selectFilter}
          ariaLabel={filterAriaLabel}
          trackClassName={stuck ? pxGutterClassName : undefined}
        />
      </div>

      <InspirationListingGrid
        items={pageItems}
        promo={promo}
        onPromoCtaClick={onPromoCtaClick}
        advisorCta={advisorCta}
        onAdvisorAskOpen={onAdvisorAskOpen}
        onAdvisorBookOpen={onAdvisorBookOpen}
        locateCta={locateCta}
        onLocateCtaClick={onLocateCtaClick}
        cardAction={cardAction}
        showFavorite={showFavorite}
        emptyTitle={emptyTitle}
        emptyDescription={emptyDescription}
        columns={columns}
      />

      <ListingPagination
        shownCount={shownCount}
        totalCount={totalCount}
        page={safePage}
        pageCount={pageCount}
        itemLabel={itemLabel}
        progressAriaLabel={progressAriaLabel}
        navAriaLabel={navAriaLabel}
        onShowMore={() => setPage((value) => Math.min(pageCount, value + 1))}
        onPageChange={setPage}
      />
    </div>
  );
}
