import type {
  ListingGridAdvisorCta,
  ListingGridLocateCta,
  ListingGridPromo,
} from "../../types/listing";
import type { InspirationListingItem } from "../../types/inspiration";
import { cn } from "../../lib/cn";
import { fullBleedBreakoutClassName } from "../../lib/layoutTokens";
import { requestInspirationProductsDrawer } from "../../hooks/useInspirationProductsDrawer";
import type { InspirationArrangement } from "../../types/product";
import { AdvisorCta } from "../marketing/AdvisorCta";
import { LocateCta } from "../marketing/LocateCta";
import { ListingPromoTile } from "../listing/ListingPromoTile";
import { EmptyState } from "../ui/EmptyState";
import {
  InspirationGalleryCard,
  type InspirationGalleryCardAction,
} from "./InspirationGalleryCard";
import { inspirationCardActionFor } from "./inspirationCardAction";

type GridSlot =
  | { kind: "item"; item: InspirationListingItem; key: string }
  | { kind: "promo"; promo: ListingGridPromo; key: string }
  | { kind: "advisor"; advisorCta: ListingGridAdvisorCta; key: string }
  | { kind: "locate"; locateCta: ListingGridLocateCta; key: string };

/** Snap insert index so a full-span break never leaves an incomplete row above. */
const PROMO_ROW_STEP_BY_COLUMNS: Record<2 | 3, number> = {
  2: 4,
  3: 6,
};

function alignPromoInsertIndex(
  index: number,
  itemCount: number,
  columns: 2 | 3,
) {
  const step = PROMO_ROW_STEP_BY_COLUMNS[columns];
  const clamped = Math.min(Math.max(0, index), itemCount);
  if (clamped === 0 || clamped === itemCount) return clamped;
  const aligned = Math.round(clamped / step) * step;
  return Math.min(Math.max(0, aligned), itemCount);
}

function buildGridSlots(
  items: InspirationListingItem[],
  columns: 2 | 3,
  promo?: ListingGridPromo,
  advisorCta?: ListingGridAdvisorCta,
  locateCta?: ListingGridLocateCta,
): GridSlot[] {
  const itemSlots: GridSlot[] = items.map((item) => ({
    kind: "item",
    item,
    key: item.id,
  }));

  if (items.length === 0) return itemSlots;

  if (promo) {
    const insertAt = alignPromoInsertIndex(
      promo.afterIndex,
      itemSlots.length,
      columns,
    );
    const slots = [...itemSlots];
    slots.splice(insertAt, 0, {
      kind: "promo",
      promo,
      key: `promo-${promo.href}-${insertAt}`,
    });
    return slots;
  }

  if (advisorCta) {
    const insertAt = alignPromoInsertIndex(
      advisorCta.afterIndex,
      itemSlots.length,
      columns,
    );
    const slots = [...itemSlots];
    slots.splice(insertAt, 0, {
      kind: "advisor",
      advisorCta,
      key: `advisor-${advisorCta.title}-${insertAt}`,
    });
    return slots;
  }

  if (locateCta) {
    const insertAt = alignPromoInsertIndex(
      locateCta.afterIndex,
      itemSlots.length,
      columns,
    );
    const slots = [...itemSlots];
    slots.splice(insertAt, 0, {
      kind: "locate",
      locateCta,
      key: `locate-${locateCta.title}-${insertAt}`,
    });
    return slots;
  }

  return itemSlots;
}

type InspirationListingGridProps = {
  items: InspirationListingItem[];
  promo?: ListingGridPromo;
  onPromoCtaClick?: () => void;
  advisorCta?: ListingGridAdvisorCta;
  onAdvisorAskOpen?: () => void;
  onAdvisorBookOpen?: () => void;
  locateCta?: ListingGridLocateCta;
  onLocateCtaClick?: () => void;
  /** Override card action for all items (defaults to per-item inference). */
  cardAction?: InspirationGalleryCardAction;
  showFavorite?: boolean;
  emptyTitle?: string;
  emptyDescription?: string;
  /** Desktop column count (default 2). */
  columns?: 2 | 3;
  className?: string;
};

export function InspirationListingGrid({
  items,
  promo,
  onPromoCtaClick,
  advisorCta,
  onAdvisorAskOpen,
  onAdvisorBookOpen,
  locateCta,
  onLocateCtaClick,
  cardAction,
  showFavorite = false,
  emptyTitle = "Brak aranżacji",
  emptyDescription = "Spróbuj zmienić filtr, aby zobaczyć więcej inspiracji.",
  columns = 2,
  className,
}: InspirationListingGridProps) {
  if (items.length === 0) {
    return <EmptyState title={emptyTitle} description={emptyDescription} />;
  }

  const slots = buildGridSlots(items, columns, promo, advisorCta, locateCta);

  return (
    <ul
      className={cn(
        "m-0 grid list-none grid-cols-1 gap-x-5 gap-y-8 p-0 sm:grid-cols-2 md:gap-y-12",
        columns === 3 && "lg:grid-cols-3",
        className,
      )}
    >
      {slots.map((slot) => {
        if (slot.kind === "promo") {
          return (
            <li key={slot.key} className="col-span-full">
              <ListingPromoTile
                promo={slot.promo}
                onCtaClick={onPromoCtaClick}
              />
            </li>
          );
        }

        if (slot.kind === "advisor") {
          const cta = slot.advisorCta;
          return (
            <li
              key={slot.key}
              className={cn("col-span-full", fullBleedBreakoutClassName)}
            >
              <AdvisorCta
                titleId="inspirations-listing-advisor-cta-title"
                content={cta}
                onAskOpen={onAdvisorAskOpen}
                onBookOpen={onAdvisorBookOpen}
              />
            </li>
          );
        }

        if (slot.kind === "locate") {
          const cta = slot.locateCta;
          return (
            <li key={slot.key} className="col-span-full">
              <LocateCta
                embedded
                title={cta.title}
                description={cta.description}
                ctaLabel={cta.ctaLabel}
                image={cta.image}
                onCtaClick={onLocateCtaClick}
              />
            </li>
          );
        }

        return (
          <li key={slot.key}>
            <ArrangementGridCard
              item={slot.item}
              cardAction={cardAction}
              showFavorite={showFavorite}
            />
          </li>
        );
      })}
    </ul>
  );
}

function ArrangementGridCard({
  item,
  cardAction,
  showFavorite,
}: {
  item: InspirationListingItem;
  cardAction?: InspirationGalleryCardAction;
  showFavorite: boolean;
}) {
  const action = cardAction ?? inspirationCardActionFor(item);
  const productCount = item.products?.length ?? item.items.length;

  return (
    <div className="flex flex-col gap-3">
      <InspirationGalleryCard
        title={item.title}
        image={item.image}
        action={action}
        href={item.href}
        favoriteId={showFavorite ? item.id : undefined}
        productCount={productCount}
        onProductsOpen={
          action === "products"
            ? () =>
                requestInspirationProductsDrawer(item as InspirationArrangement)
            : undefined
        }
      />
      {item.description ? (
        <p className="m-0 font-body text-sm leading-relaxed text-neutral-600">
          {item.description}
        </p>
      ) : null}
    </div>
  );
}
