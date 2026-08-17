import { AnimatePresence, motion, type Transition } from "motion/react";
import { useMotionReduced } from "../../hooks/useMotionReduced";
import { cn } from "../../lib/cn";
import { EASE_LUXURY } from "../../lib/motionEase";
import type { ListingProduct } from "../../types/listing";
import { ProductCarouselCard } from "../product/ProductCarouselCard";
import { listingPage } from "../../data/listing";
import { EmptyState } from "../ui/EmptyState";

type ListingProductGridProps = {
  products: ListingProduct[];
  onClearFilters?: () => void;
  className?: string;
};

const FADE_S = 0.26;
const ENTER_STAGGER_S = 0.028;
const ENTER_STAGGER_MAX = 5;

function resultsKey(products: ListingProduct[]) {
  if (products.length === 0) return "empty";
  return products.map((product) => product.id).join("|");
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
  onClearFilters,
  className,
}: ListingProductGridProps) {
  const reduceMotion = useMotionReduced();
  const isEmpty = products.length === 0;
  const key = resultsKey(products);
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
              {products.map((product, index) => (
                <motion.li
                  key={product.id}
                  className="min-w-0"
                  initial={reduceMotion ? false : { opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={
                    reduceMotion ? { duration: 0 } : cardEnterTransition(index)
                  }
                >
                  <ProductCarouselCard product={product} />
                </motion.li>
              ))}
            </ul>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
