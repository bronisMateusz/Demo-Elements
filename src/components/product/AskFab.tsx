import { useState } from "react";
import { cn } from "../../lib/cn";
import { useFloatingCtaVisibility } from "../../hooks/useFloatingCtaVisibility";
import { useProductFavorites } from "../../hooks/useProductFavorites";
import type { ProductImage } from "../../types/product";
import { Button } from "../ui/Button";
import { productFixedBarClassName } from "../ui/productFixedBarClassName";
import { productImageObjectPosition } from "../../lib/productImageStyle";
import { AskDrawer } from "./AskDrawer";

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
  showAfterScroll,
  footerSelector,
  askOpen: askOpenProp,
  onAskOpenChange,
}: AskFabProps) {
  const [askOpenInternal, setAskOpenInternal] = useState(false);
  const { isFavorite, toggle } = useProductFavorites(sku);
  const askOpen = askOpenProp ?? askOpenInternal;
  const setAskOpen = onAskOpenChange ?? setAskOpenInternal;
  const visible = useFloatingCtaVisibility({
    showAfterScroll,
    footerSelector,
    heroSelector: '[aria-label="Prezentacja produktu"]',
  });

  return (
    <>
      <aside
        id="askFab"
        className={cn(productFixedBarClassName({ visible, className }))}
        aria-hidden={!visible}
        aria-label="Szybkie akcje produktu"
      >
        <div className="flex items-center gap-2 border border-neutral-200/80 bg-neutral-0 px-3 py-2 shadow-2 max-lg:border-x-0 max-lg:border-b-0 lg:gap-5 lg:px-5 lg:py-4">
          <div className="hidden size-12 shrink-0 overflow-hidden bg-neutral-0 lg:block">
            <img
              src={image.src}
              alt=""
              className="size-full object-cover"
              style={{ objectPosition: productImageObjectPosition(image) }}
              width={48}
              height={48}
              draggable={false}
            />
          </div>

          <div className="hidden min-w-0 flex-1 lg:block">
            <p className="m-0 text-xs tracking-[0.08em] text-neutral-500 uppercase">
              {brand}
            </p>
            <p className="mt-1 mb-0 truncate font-heading text-lg leading-tight text-neutral-900">
              {title}
            </p>
            <p className="mt-1 mb-0 font-body text-ui tabular-nums text-neutral-700">
              {price}
            </p>
          </div>

          <div className="flex w-full gap-2 lg:w-auto lg:shrink-0">
            <Button
              as="button"
              type="button"
              variant="secondary"
              size="lg"
              className={cn(
                "shrink-0 max-lg:h-11 max-lg:aspect-square max-lg:px-0 lg:h-13",
                isFavorite &&
                  "border-gold-500 text-gold-500 hover:border-gold-500 hover:text-neutral-0",
              )}
              ariaLabel={isFavorite ? "Usuń ze schowka" : "Dodaj do schowka"}
              ariaPressed={isFavorite}
              onClick={toggle}
            >
              <i
                className={
                  isFavorite
                    ? "ph-fill ph-bookmark-simple"
                    : "ph ph-bookmark-simple"
                }
                aria-hidden="true"
              />
              <span className="hidden truncate lg:inline">
                {isFavorite ? "W schowku" : "Dodaj do schowka"}
              </span>
            </Button>

            <Button
              as="button"
              type="button"
              variant="primary"
              size="lg"
              className="min-w-0 flex-1 max-lg:h-11 max-lg:px-5 lg:h-13 lg:flex-none"
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
