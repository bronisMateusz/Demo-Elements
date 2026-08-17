import { useEffect, useId, useMemo, useRef, useState } from "react";
import { LayoutGroup, motion } from "motion/react";
import { resolveFavoriteProducts } from "../../data/favoriteProductCatalog";
import { wishlistArrangementCatalog, wishlistPage } from "../../data/wishlist";
import { useMotionReduced } from "../../hooks/useMotionReduced";
import {
  clearAllFavorites,
  useFavoriteArrangementIds,
  useFavoriteProductIds,
} from "../../hooks/useProductFavorites";
import { isMotionPaused } from "../../lib/a11yPreferences";
import { cn } from "../../lib/cn";
import {
  readHeaderOffsetPx,
  stickyUnderHeaderClassName,
} from "../../lib/layoutTokens";
import { SPRING_LAYOUT } from "../../lib/motionEase";
import { InspirationGalleryCard } from "../inspiration/InspirationGalleryCard";
import { AdvisorAskDrawer } from "../marketing/AdvisorAskDrawer";
import { ShareLinkModal } from "../marketing/ShareLinkModal";
import { SharedLayoutUnderline } from "../motion/SharedLayoutUnderline";
import { ProductCarouselCard } from "../product/ProductCarouselCard";
import { Button } from "../ui/Button";
import { Container } from "../ui/Container";
import { EmptyState } from "../ui/EmptyState";

type WishlistSectionId = "schowek-produkty" | "schowek-aranzacje";

const SECTION_GAP_PX = 8;
const NAV_FALLBACK_PX = 44;

const wishlistSections: {
  id: WishlistSectionId;
  label: string;
}[] = [
  { id: "schowek-produkty", label: wishlistPage.segments.products },
  { id: "schowek-aranzacje", label: wishlistPage.segments.arrangements },
];

const sectionScrollMtClassName =
  "scroll-mt-[calc(var(--site-header-bar-height,7.25rem)+var(--wishlist-subnav-height,2.75rem)+0.5rem)] lg:scroll-mt-[calc(7.25rem+var(--wishlist-subnav-height,2.75rem)+0.5rem)] header-concealed:lg:scroll-mt-[calc(4.5rem+var(--wishlist-subnav-height,2.75rem)+0.5rem)]";

const asideStickyClassName =
  "lg:sticky lg:top-[calc(7.25rem+var(--wishlist-subnav-height,2.75rem)+0.5rem)] header-concealed:lg:top-[calc(4.5rem+var(--wishlist-subnav-height,2.75rem)+0.5rem)]";

type WishlistDirectoryProps = {
  className?: string;
};

function readWishlistNavHeightPx(nav: HTMLElement | null) {
  if (nav?.offsetHeight) return nav.offsetHeight;
  return NAV_FALLBACK_PX;
}

function readWishlistScrollOffsetPx(nav: HTMLElement | null) {
  return readHeaderOffsetPx() + readWishlistNavHeightPx(nav) + SECTION_GAP_PX;
}

export function WishlistDirectory({ className }: WishlistDirectoryProps) {
  const productIds = useFavoriteProductIds();
  const arrangementIds = useFavoriteArrangementIds();
  const [askOpen, setAskOpen] = useState(false);
  const [shareOpen, setShareOpen] = useState(false);
  const reduce = useMotionReduced();
  const tabLayoutId = useId();
  const navRef = useRef<HTMLElement>(null);
  const [activeSection, setActiveSection] =
    useState<WishlistSectionId>("schowek-produkty");

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

  useEffect(() => {
    const nav = navRef.current;
    if (!nav) return;

    const syncHeight = () => {
      document.documentElement.style.setProperty(
        "--wishlist-subnav-height",
        `${nav.offsetHeight}px`,
      );
    };
    syncHeight();
    if (typeof ResizeObserver === "undefined") return;

    const observer = new ResizeObserver(syncHeight);
    observer.observe(nav);
    return () => {
      observer.disconnect();
      document.documentElement.style.removeProperty("--wishlist-subnav-height");
    };
  }, [isEmpty]);

  useEffect(() => {
    if (isEmpty) return;

    const updateActive = () => {
      const offset = readWishlistScrollOffsetPx(navRef.current);
      let current: WishlistSectionId = "schowek-produkty";
      for (const section of wishlistSections) {
        const element = document.getElementById(section.id);
        if (!element) continue;
        if (element.getBoundingClientRect().top <= offset) {
          current = section.id;
        }
      }
      setActiveSection(current);
    };

    updateActive();
    window.addEventListener("scroll", updateActive, { passive: true });
    window.addEventListener("resize", updateActive);
    return () => {
      window.removeEventListener("scroll", updateActive);
      window.removeEventListener("resize", updateActive);
    };
  }, [isEmpty, products.length, arrangements.length]);

  const scrollToSection = (id: WishlistSectionId) => {
    const element = document.getElementById(id);
    if (!element) return;

    const top =
      element.getBoundingClientRect().top +
      window.scrollY -
      readWishlistScrollOffsetPx(navRef.current) +
      1;

    window.scrollTo({
      top,
      behavior: isMotionPaused() ? "auto" : "smooth",
    });
    setActiveSection(id);

    if (history.replaceState) {
      history.replaceState(null, "", `#${id}`);
    }
  };

  return (
    <div className={cn("w-full", className)}>
      {!isEmpty ? (
        <nav
          ref={navRef}
          aria-label={wishlistPage.segments.aria}
          className={cn(
            stickyUnderHeaderClassName,
            "z-20 w-full border-b border-neutral-200 bg-neutral-0/95 backdrop-blur-sm",
          )}
        >
          <Container size="content">
            <div className="min-w-0 overflow-x-auto scrollbar-none [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
              <LayoutGroup id={`wishlist-tabs-${tabLayoutId}`}>
                <SharedLayoutUnderline
                  className="mx-auto flex w-max min-w-full items-stretch justify-center gap-0 md:gap-1"
                  lineClassName="h-0.5 bg-neutral-900/45"
                  insetX={12}
                  bottom={0}
                >
                  {wishlistSections.map((section) => {
                    const selected = section.id === activeSection;
                    return (
                      <a
                        key={section.id}
                        href={`#${section.id}`}
                        aria-current={selected ? "true" : undefined}
                        className={cn(
                          "relative inline-flex min-h-11 items-center px-3 py-2 font-body text-sm leading-none text-neutral-600 no-underline transition-colors duration-fast ease-out md:min-h-14.5 md:px-4 md:py-3 md:text-ui",
                          "hover:text-neutral-900",
                          "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neutral-800",
                          selected && "text-neutral-900",
                        )}
                        onClick={(event) => {
                          event.preventDefault();
                          scrollToSection(section.id);
                        }}
                      >
                        {selected ? (
                          <motion.span
                            layoutId={`wishlist-tab-active-line-${tabLayoutId}`}
                            className="pointer-events-none absolute inset-x-3 bottom-0 z-20 h-0.5 bg-neutral-900 md:inset-x-4"
                            transition={
                              reduce ? { duration: 0 } : SPRING_LAYOUT
                            }
                            aria-hidden="true"
                          />
                        ) : null}
                        {section.label}
                      </a>
                    );
                  })}
                </SharedLayoutUnderline>
              </LayoutGroup>
            </div>
          </Container>
        </nav>
      ) : null}

      <Container size="content" className="mt-8">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(18rem,22rem)] lg:items-start lg:gap-10">
          <div className="min-w-0">
            {isEmpty ? (
              <EmptyState
                layout="panel"
                iconClass="ph ph-bookmark-simple"
                title={wishlistPage.empty.title}
                description={wishlistPage.empty.description}
                actions={[
                  {
                    label: wishlistPage.empty.primaryLabel,
                    href: wishlistPage.empty.primaryHref,
                  },
                  {
                    label: wishlistPage.empty.secondaryLabel,
                    href: wishlistPage.empty.secondaryHref,
                    variant: "secondary",
                  },
                ]}
              />
            ) : (
              <div className="flex flex-col gap-12 md:gap-16">
                <section
                  id="schowek-produkty"
                  aria-labelledby="schowek-produkty-title"
                  className={sectionScrollMtClassName}
                >
                  <h2
                    id="schowek-produkty-title"
                    className="m-0 font-heading text-h4 font-medium tracking-tight text-neutral-900"
                  >
                    {wishlistPage.segments.products}
                  </h2>
                  {products.length > 0 ? (
                    <div className="mt-6 grid grid-cols-2 gap-x-4 gap-y-8 md:grid-cols-3">
                      {products.map((product) => (
                        <ProductCarouselCard
                          key={product.id}
                          product={product}
                        />
                      ))}
                    </div>
                  ) : (
                    <EmptyState
                      layout="panel"
                      className="mt-6"
                      iconClass="ph ph-bookmark-simple"
                      title={wishlistPage.emptyProducts.title}
                      description={wishlistPage.emptyProducts.description}
                      actions={[
                        {
                          label: wishlistPage.emptyProducts.actionLabel,
                          href: wishlistPage.emptyProducts.actionHref,
                        },
                      ]}
                    />
                  )}
                </section>

                <section
                  id="schowek-aranzacje"
                  aria-labelledby="schowek-aranzacje-title"
                  className={sectionScrollMtClassName}
                >
                  <h2
                    id="schowek-aranzacje-title"
                    className="m-0 font-heading text-h4 font-medium tracking-tight text-neutral-900"
                  >
                    {wishlistPage.segments.arrangements}
                  </h2>
                  {arrangements.length > 0 ? (
                    <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2">
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
                  ) : (
                    <EmptyState
                      layout="panel"
                      className="mt-6"
                      iconClass="ph ph-images"
                      title={wishlistPage.emptyArrangements.title}
                      description={wishlistPage.emptyArrangements.description}
                      actions={[
                        {
                          label: wishlistPage.emptyArrangements.actionLabel,
                          href: wishlistPage.emptyArrangements.actionHref,
                        },
                      ]}
                    />
                  )}
                </section>
              </div>
            )}
          </div>

          <aside
            className={cn(
              "rounded-xs border border-neutral-200 bg-neutral-0 p-5",
              !isEmpty && asideStickyClassName,
              isEmpty && "lg:sticky lg:top-33 header-concealed:lg:top-22",
            )}
          >
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
      </Container>

      <ShareLinkModal open={shareOpen} onClose={() => setShareOpen(false)} />
      <AdvisorAskDrawer
        open={askOpen}
        onClose={() => setAskOpen(false)}
        topicTitle="Kosztorys schowka"
      />
    </div>
  );
}
