import { AnimatePresence, motion, type Transition } from "motion/react";
import { useMotionReduced } from "../../hooks/useMotionReduced";
import { cn } from "../../lib/cn";
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
/** Full-width promo must sit on a row boundary for both 2-col and 3-col grids (LCM). */
const PROMO_ROW_STEP = 6;

function resultsKey(products: ListingProduct[], promo?: ListingGridPromo) {
  if (products.length === 0) return "empty";
  const productKey = products.map((product) => product.id).join("|");
  if (!promo) return productKey;
  return `${productKey}|promo:${promo.afterIndex}:${promo.href}`;
}

/** Snap insert index so a full-span promo never leaves an incomplete row above. */
function alignPromoInsertIndex(index: number, productCount: number) {
  const clamped = Math.min(Math.max(0, index), productCount);
  if (clamped === 0 || clamped === productCount) return clamped;
  const aligned = Math.round(clamped / PROMO_ROW_STEP) * PROMO_ROW_STEP;
  return Math.min(Math.max(0, aligned), productCount);
}

function buildGridSlots(
  products: ListingProduct[],
  promo?: ListingGridPromo,
): GridSlot[] {
  const productSlots: GridSlot[] = products.map((product) => ({
    kind: "product",
    product,
    key: product.id,
  }));

  if (!promo || products.length === 0) return productSlots;

  const insertAt = alignPromoInsertIndex(promo.afterIndex, productSlots.length);
  const slots = [...productSlots];
  slots.splice(insertAt, 0, {
    kind: "promo",
    promo,
    key: `promo-${promo.href}-${insertAt}`,
  });
  return slots;
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
  const isEmpty = products.length === 0;
  const key = resultsKey(products, promo);
  const slots = buildGridSlots(products, promo);
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
            <ul className="m-0 grid list-none grid-cols-1 gap-y-8 p-0 xs:grid-cols-2 xs:gap-x-3 sm:gap-x-4 md:grid-cols-3 md:gap-y-10">
              {slots.map((slot, index) => (
                <motion.li
                  key={slot.key}
                  className={cn(
                    "min-w-0",
                    slot.kind === "promo" && "col-span-full",
                  )}
                  initial={reduceMotion ? false : { opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={
                    reduceMotion ? { duration: 0 } : cardEnterTransition(index)
                  }
                >
                  {slot.kind === "promo" ? (
                    <ListingPromoTile promo={slot.promo} />
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
