import { AnimatePresence, motion, type Transition } from "motion/react";
import { useSyncExternalStore } from "react";
import { useMotionReduced } from "../../hooks/useMotionReduced";
import { cn } from "../../lib/cn";
import { XL_MIN_WIDTH_PX } from "../../lib/layoutTokens";
import { EASE_LUXURY } from "../../lib/motionEase";
import type { ListingGridPromo, ListingProduct } from "../../types/listing";
import { ProductCarouselCard } from "../product/ProductCarouselCard";
import { listingPage } from "../../data/listing";
import { EmptyState } from "../ui/EmptyState";
import { ListingPromoTile } from "./ListingPromoTile";

type ListingProductGridProps = {
  products: ListingProduct[];
  promo?: ListingGridPromo;
  onClearFilters?: () => void;
  className?: string;
};

type GridSlot =
  | { kind: "product"; product: ListingProduct; key: string }
  | { kind: "promo"; promo: ListingGridPromo; key: string };

const FADE_S = 0.26;
const ENTER_STAGGER_S = 0.028;
const ENTER_STAGGER_MAX = 5;

const XL_MQ = `(min-width: ${XL_MIN_WIDTH_PX}px)`;

function subscribeXl(onStoreChange: () => void) {
  const media = window.matchMedia(XL_MQ);
  media.addEventListener("change", onStoreChange);
  return () => media.removeEventListener("change", onStoreChange);
}

function getXlSnapshot() {
  return window.matchMedia(XL_MQ).matches;
}

function getXlServerSnapshot() {
  return false;
}

function useIsXl() {
  return useSyncExternalStore(subscribeXl, getXlSnapshot, getXlServerSnapshot);
}

function resultsKey(
  products: ListingProduct[],
  promo: ListingGridPromo | undefined,
  insertAt: number,
) {
  if (products.length === 0) return "empty";
  const productKey = products.map((product) => product.id).join("|");
  if (!promo) return productKey;
  return `${productKey}|promo:${insertAt}:${promo.href}`;
}

/**
 * Snap promo insert for a clean row edge:
 * - 2-col (full-width promo): even count so tiles split evenly above/below
 * - 3-col (promo in cols 2-3): count ≡ 1 (mod 3) so col 1 has a product
 */
function alignPromoInsertIndex(
  index: number,
  productCount: number,
  columns: 2 | 3,
) {
  const clamped = Math.min(Math.max(0, index), productCount);
  if (clamped === 0 || clamped === productCount) return clamped;

  if (columns === 2) {
    // Prefer an even mid-page split when the preferred index is near the middle.
    const halfEven = Math.floor(productCount / 2 / 2) * 2;
    const preferredEven = Math.round(clamped / 2) * 2;
    const useHalf =
      Math.abs(clamped - halfEven) <= Math.abs(clamped - preferredEven) + 1;
    return Math.min(useHalf ? halfEven : preferredEven, productCount);
  }

  const mod = (clamped - 1) % 3;
  const aligned = mod === 0 ? clamped : clamped + (3 - mod);
  return Math.min(aligned, productCount);
}

function buildGridSlots(
  products: ListingProduct[],
  promo: ListingGridPromo | undefined,
  columns: 2 | 3,
): { slots: GridSlot[]; insertAt: number } {
  const productSlots: GridSlot[] = products.map((product) => ({
    kind: "product",
    product,
    key: product.id,
  }));

  if (!promo || products.length === 0) {
    return { slots: productSlots, insertAt: -1 };
  }

  const insertAt = alignPromoInsertIndex(
    promo.afterIndex,
    productSlots.length,
    columns,
  );
  const slots = [...productSlots];
  slots.splice(insertAt, 0, {
    kind: "promo",
    promo,
    key: `promo-${promo.href}-${insertAt}`,
  });
  return { slots, insertAt };
}

function cardEnterTransition(index: number): Transition {
  const delay =
    FADE_S * 0.15 + Math.min(index, ENTER_STAGGER_MAX) * ENTER_STAGGER_S;
  return {
    opacity: { duration: 0.3, ease: EASE_LUXURY, delay },
    y: { duration: 0.36, ease: EASE_LUXURY, delay },
  };
}

export function ListingProductGrid({
  products,
  promo,
  onClearFilters,
  className,
}: ListingProductGridProps) {
  const reduceMotion = useMotionReduced();
  const isXl = useIsXl();
  const columns: 2 | 3 = isXl ? 3 : 2;
  const isEmpty = products.length === 0;
  const { slots, insertAt } = buildGridSlots(products, promo, columns);
  const key = resultsKey(products, promo, insertAt);
  const fadeTransition = reduceMotion
    ? { duration: 0 }
    : { duration: FADE_S, ease: EASE_LUXURY };

  return (
    <div
      className={cn("relative bg-neutral-0", isEmpty && "min-h-96", className)}
    >
      {/*
        mode="wait": fade current results out to white, then fade the next
        set in - avoids mid-filter layout jumps between overlapping cards.
      */}
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={key}
          initial={reduceMotion ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={
            reduceMotion
              ? undefined
              : { opacity: 0, transition: fadeTransition }
          }
          transition={fadeTransition}
        >
          {isEmpty ? (
            <EmptyState
              layout="section"
              title={listingPage.empty.title}
              description={listingPage.empty.description}
              actions={
                onClearFilters
                  ? [
                      {
                        label: listingPage.empty.actionLabel,
                        onClick: onClearFilters,
                      },
                    ]
                  : undefined
              }
            />
          ) : (
            <ul className="m-0 grid list-none grid-cols-1 gap-y-8 p-0 sm:grid-cols-2 sm:gap-x-4 md:gap-y-10 xl:grid-cols-3">
              {slots.map((slot, index) => (
                <motion.li
                  key={slot.key}
                  className={cn(
                    "min-w-0",
                    slot.kind === "promo" &&
                      "sm:col-span-2 xl:col-start-2 xl:col-span-2",
                  )}
                  initial={reduceMotion ? false : { opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={
                    reduceMotion ? { duration: 0 } : cardEnterTransition(index)
                  }
                >
                  {slot.kind === "promo" ? (
                    <ListingPromoTile promo={slot.promo} density="grid" />
                  ) : (
                    <ProductCarouselCard product={slot.product} />
                  )}
                </motion.li>
              ))}
            </ul>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
