import { useEffect, useState } from "react";
import { cn } from "../../lib/cn";
import { useProductFavorites } from "../../hooks/useProductFavorites";
import type { ProductImage } from "../../types/product";
import { Button } from "../ui/Button";
import { productFixedBarClassName } from "../ui/askFabClassName";
import { productImageObjectPosition } from "../../lib/productImageStyle";
import { AskDrawer } from "./AskDrawer";

/** Hide when footer top enters this band above the viewport bottom. */
const FOOTER_CLEARANCE_PX = 160;
const DEFAULT_SHOW_AFTER_SCROLL_PX = 320;

/** Prefer showing after the PDP hero leaves view - falls back to a fixed offset. */
function getShowAfterScrollPx(fallback: number): number {
  const hero = document.querySelector<HTMLElement>('[aria-label="Prezentacja produktu"]');
  if (!hero) return fallback;
  return Math.max(fallback, hero.offsetTop + hero.offsetHeight - 160);
}

type AskFabProps = {
  /** Favorite storage key (usually product id). */
  sku: string;
  title: string;
  brand: string;
  /** Catalog / display SKU shown in the ask drawer. */
  productSku: string;
  price: string;
  image: ProductImage;
  askLabel?: string;
  className?: string;
  /** Scroll offset (px) after which the bar becomes visible (minimum / non-PDP fallback). */
  showAfterScroll?: number;
  footerSelector?: string;
  /** Controlled open - when provided with onAskOpenChange. */
  askOpen?: boolean;
  onAskOpenChange?: (open: boolean) => void;
};

export function AskFab({
  sku,
  title,
  brand,
  productSku,
  price,
  image,
  askLabel = "Zadaj pytanie",
  className,
  showAfterScroll = DEFAULT_SHOW_AFTER_SCROLL_PX,
  footerSelector = 'footer[role="contentinfo"]',
  askOpen: askOpenProp,
  onAskOpenChange,
}: AskFabProps) {
  const [visible, setVisible] = useState(false);
  const [askOpenInternal, setAskOpenInternal] = useState(false);
  const { isFavorite, toggle } = useProductFavorites(sku);
  const askOpen = askOpenProp ?? askOpenInternal;
  const setAskOpen = onAskOpenChange ?? setAskOpenInternal;

  useEffect(() => {
    const footer = document.querySelector<HTMLElement>(footerSelector);
    if (!footer) return;

    const threshold = () => getShowAfterScrollPx(showAfterScroll);
    let scrolledEnough = window.scrollY > threshold();
    let footerNear = false;

    const syncVisible = () => setVisible(scrolledEnough && !footerNear);

    const onScroll = () => {
      scrolledEnough = window.scrollY > threshold();
      syncVisible();
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        footerNear = entry.isIntersecting;
        syncVisible();
      },
      { rootMargin: `0px 0px -${FOOTER_CLEARANCE_PX}px 0px`, threshold: 0 },
    );

    observer.observe(footer);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", onScroll);
    };
  }, [showAfterScroll, footerSelector]);

  return (
    <>
      <aside
        id="askFab"
        className={cn(productFixedBarClassName({ visible, className }))}
        aria-hidden={!visible}
        aria-label="Szybkie akcje produktu"
      >
        <div className="flex items-center gap-3 border border-neutral-200/80 bg-neutral-0 px-4 py-3 shadow-2 max-lg:border-x-0 max-lg:border-b-0 lg:gap-5 lg:px-5 lg:py-4">
          <div className="hidden size-12 shrink-0 overflow-hidden bg-neutral-100 lg:block">
            <img
              src={image.src}
              alt=""
              className="h-full w-full object-cover"
              style={{ objectPosition: productImageObjectPosition(image) }}
              width={48}
              height={48}
              draggable={false}
            />
          </div>

          <div className="hidden min-w-0 flex-1 lg:block">
            <p className="m-0 truncate font-heading text-[18px] leading-tight text-neutral-900">
              {title}
            </p>
            <p className="mt-1 mb-0 font-body text-ui tabular-nums text-neutral-700">{price}</p>
          </div>

          <div className="flex w-full gap-2 lg:w-auto lg:shrink-0">
            <Button
              as="button"
              type="button"
              variant="secondary"
              size="lg"
              className={cn(
                "min-w-0 flex-1 lg:flex-none",
                isFavorite && "border-gold-500 text-gold-500 hover:border-gold-500 hover:text-neutral-0",
              )}
              ariaLabel={isFavorite ? "Usuń ze schowka" : "Dodaj do schowka"}
              ariaPressed={isFavorite}
              onClick={toggle}
            >
              <i
                className={isFavorite ? "ph-fill ph-bookmark-simple" : "ph ph-bookmark-simple"}
                aria-hidden="true"
              />
              <span className="truncate">{isFavorite ? "W schowku" : "Dodaj do schowka"}</span>
            </Button>

            <Button
              as="button"
              type="button"
              variant="primary"
              size="lg"
              className="min-w-0 flex-1 lg:flex-none"
              ariaLabel={askLabel}
              onClick={() => setAskOpen(true)}
            >
              <i className="ph ph-chat-circle" aria-hidden="true" />
              <span className="truncate">{askLabel}</span>
            </Button>
          </div>
        </div>
      </aside>

      <AskDrawer
        open={askOpen}
        onClose={() => setAskOpen(false)}
        productTitle={title}
        productBrand={brand}
        productSku={productSku}
        productImage={image}
      />
    </>
  );
}
