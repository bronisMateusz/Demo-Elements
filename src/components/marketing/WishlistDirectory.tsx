import { useId, useMemo, useState } from "react";
import { AnimatePresence, LayoutGroup, motion } from "motion/react";
import { resolveFavoriteProducts } from "../../data/favoriteProductCatalog";
import { wishlistArrangementCatalog, wishlistPage } from "../../data/wishlist";
import { useMotionReduced } from "../../hooks/useMotionReduced";
import {
  clearAllFavorites,
  useFavoriteArrangementIds,
  useFavoriteProductIds,
} from "../../hooks/useProductFavorites";
import { cn } from "../../lib/cn";
import { EASE_LUXURY, SPRING_LAYOUT } from "../../lib/motionEase";
import { InspirationGalleryCard } from "../inspiration/InspirationGalleryCard";
import { AdvisorAskDrawer } from "../marketing/AdvisorAskDrawer";
import { ShareLinkModal } from "../marketing/ShareLinkModal";
import { SharedLayoutUnderline } from "../motion/SharedLayoutUnderline";
import { ProductCarouselCard } from "../product/ProductCarouselCard";
import { Button } from "../ui/Button";
import { Container } from "../ui/Container";
import { EmptyState } from "../ui/EmptyState";

type WishlistSegmentId = "products" | "arrangements";

const PANEL_TRANSITION = { duration: 0.3, ease: EASE_LUXURY } as const;

const wishlistSegments: {
  id: WishlistSegmentId;
  label: string;
}[] = [
  { id: "products", label: wishlistPage.segments.products },
  { id: "arrangements", label: wishlistPage.segments.arrangements },
];

type WishlistDirectoryProps = {
  className?: string;
};

export function WishlistDirectory({ className }: WishlistDirectoryProps) {
  const productIds = useFavoriteProductIds();
  const arrangementIds = useFavoriteArrangementIds();
  const [askOpen, setAskOpen] = useState(false);
  const [shareOpen, setShareOpen] = useState(false);

  const products = useMemo(
    () => resolveFavoriteProducts(productIds),
    [productIds],
  );

  const arrangements = useMemo(
    () =>
      arrangementIds
        .map((id) => wishlistArrangementCatalog.find((item) => item.id === id))
        .filter((item): item is (typeof wishlistArrangementCatalog)[number] =>
          Boolean(item),
        ),
    [arrangementIds],
  );

  const total = productIds.length + arrangementIds.length;
  const isEmpty = total === 0;
  const reduce = useMotionReduced();
  const tabLayoutId = useId();
  const [activeSegment, setActiveSegment] =
    useState<WishlistSegmentId>("products");
  const emptyCopy =
    activeSegment === "products"
      ? wishlistPage.emptyProducts
      : wishlistPage.emptyArrangements;
  const viewIsEmpty =
    activeSegment === "products"
      ? products.length === 0
      : arrangements.length === 0;

  return (
    <Container size="content" className={cn(className)}>
      <div
        role="tablist"
        aria-label={wishlistPage.segments.aria}
        className="mt-6 min-w-0 overflow-x-auto scrollbar-none [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
      >
        <LayoutGroup id={`wishlist-tabs-${tabLayoutId}`}>
          <SharedLayoutUnderline
            className="w-max min-w-full flex-nowrap gap-2 border-b border-neutral-200"
            lineClassName="h-0.5 bg-gold-500/45"
            insetX={12}
            bottom={0}
          >
            {wishlistSegments.map((segment) => {
              const selected = segment.id === activeSegment;
              return (
                <button
                  key={segment.id}
                  type="button"
                  role="tab"
                  id={`wishlist-tab-${segment.id}`}
                  aria-selected={selected}
                  aria-controls={`wishlist-panel-${segment.id}`}
                  tabIndex={selected ? 0 : -1}
                  className={cn(
                    "shrink-0 px-3 py-2.5 font-body text-sm font-medium transition-colors duration-fast",
                    "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neutral-800",
                    selected
                      ? "text-neutral-900"
                      : "text-neutral-500 hover:text-neutral-800",
                  )}
                  onClick={() => setActiveSegment(segment.id)}
                >
                  {selected ? (
                    <motion.span
                      layoutId={`wishlist-tab-active-line-${tabLayoutId}`}
                      className="pointer-events-none absolute inset-x-3 bottom-0 z-20 h-0.5 bg-gold-500"
                      transition={reduce ? { duration: 0 } : SPRING_LAYOUT}
                      aria-hidden="true"
                    />
                  ) : null}
                  {segment.label}
                </button>
              );
            })}
          </SharedLayoutUnderline>
        </LayoutGroup>
      </div>

      <div className="mt-8 grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(18rem,22rem)] lg:items-start lg:gap-10">
        <div className="min-w-0">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={activeSegment}
              role="tabpanel"
              id={`wishlist-panel-${activeSegment}`}
              aria-labelledby={`wishlist-tab-${activeSegment}`}
              initial={reduce ? false : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduce ? undefined : { opacity: 0, y: -10 }}
              transition={reduce ? { duration: 0 } : PANEL_TRANSITION}
            >
              {activeSegment === "products" && products.length > 0 ? (
                <div className="grid grid-cols-2 gap-x-4 gap-y-8 md:grid-cols-3">
                  {products.map((product) => (
                    <ProductCarouselCard key={product.id} product={product} />
                  ))}
                </div>
              ) : null}
              {activeSegment === "arrangements" && arrangements.length > 0 ? (
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                  {arrangements.map((item) => (
                    <InspirationGalleryCard
                      key={item.id}
                      title={item.title}
                      image={item.image}
                      action="link"
                      href={item.href ?? "#inspiracje"}
                      favoriteId={item.id}
                    />
                  ))}
                </div>
              ) : null}
              {viewIsEmpty ? (
                <EmptyState
                  layout="panel"
                  iconClass={
                    activeSegment === "products"
                      ? "ph ph-bookmark-simple"
                      : "ph ph-images"
                  }
                  title={emptyCopy.title}
                  description={emptyCopy.description}
                  actions={[
                    {
                      label: emptyCopy.actionLabel,
                      href: emptyCopy.actionHref,
                    },
                  ]}
                />
              ) : null}
            </motion.div>
          </AnimatePresence>
        </div>

        <aside className="rounded-xs border border-neutral-200 bg-neutral-0 p-5 lg:sticky lg:top-28">
          <h2 className="m-0 font-heading text-h4 font-medium tracking-tight text-neutral-900">
            {wishlistPage.summary.title}
          </h2>
          <p className="mt-3 mb-0 font-body text-sm leading-relaxed text-neutral-600">
            {wishlistPage.summary.lead}
          </p>
          <div className="mt-6 flex flex-col gap-3">
            <Button
              as="button"
              type="button"
              variant="primary"
              size="lg"
              full
              disabled={isEmpty}
              onClick={() => setAskOpen(true)}
            >
              <i className="ph ph-chat-circle" aria-hidden="true" />
              {wishlistPage.summary.quoteLabel}
            </Button>
            <div className="flex flex-col gap-2">
              <Button
                as="button"
                type="button"
                variant="secondary"
                full
                disabled={isEmpty}
                onClick={() => {
                  window.alert(wishlistPage.summary.pdfHint);
                }}
              >
                <i className="ph ph-download-simple" aria-hidden="true" />
                {wishlistPage.summary.pdfLabel}
              </Button>
              <Button
                as="button"
                type="button"
                variant="secondary"
                full
                disabled={isEmpty}
                onClick={() => setShareOpen(true)}
              >
                <i className="ph ph-share-network" aria-hidden="true" />
                {wishlistPage.summary.shareLabel}
              </Button>
            </div>
            <button
              type="button"
              className="group mt-1 inline-flex w-full cursor-pointer items-center justify-center gap-1.5 border-0 bg-transparent p-0 font-body text-sm text-neutral-600 hover:text-neutral-900 disabled:cursor-not-allowed disabled:opacity-40"
              disabled={isEmpty}
              onClick={() => clearAllFavorites()}
            >
              <i className="ph ph-trash text-base" aria-hidden="true" />
              <span className="underline-offset-2 group-hover:underline">
                {wishlistPage.summary.clearLabel}
              </span>
            </button>
          </div>
        </aside>
      </div>

      <ShareLinkModal open={shareOpen} onClose={() => setShareOpen(false)} />
      <AdvisorAskDrawer
        open={askOpen}
        onClose={() => setAskOpen(false)}
        topicTitle="Kosztorys schowka"
      />
    </Container>
  );
}
