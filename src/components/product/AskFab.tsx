import { useEffect, useState } from "react";
import { cn } from "../../lib/cn";
import { useProductFavorites } from "../../hooks/useProductFavorites";
import type { ProductImage } from "../../types/product";
import { Button } from "../ui/Button";
import { productFixedBarClassName } from "../ui/askFabClassName";
import { productImageObjectPosition } from "../../lib/productImageStyle";

/** Hide when footer top enters this band above the viewport bottom. */
const FOOTER_CLEARANCE_PX = 160;

type AskFabProps = {
  sku: string;
  title: string;
  price: string;
  image: ProductImage;
  askHref?: string;
  askLabel?: string;
  className?: string;
  /** Scroll offset (px) after which the bar becomes visible. */
  showAfterScroll?: number;
  footerSelector?: string;
};

export function AskFab({
  sku,
  title,
  price,
  image,
  askHref = "#kontakt",
  askLabel = "Zadaj pytanie",
  className,
  showAfterScroll = 320,
  footerSelector = 'footer[role="contentinfo"]',
}: AskFabProps) {
  const [visible, setVisible] = useState(false);
  const { isFavorite, toggle } = useProductFavorites(sku);

  useEffect(() => {
    const footer = document.querySelector<HTMLElement>(footerSelector);
    if (!footer) return;

    let scrolledEnough = window.scrollY > showAfterScroll;
    let footerNear = false;

    const syncVisible = () => setVisible(scrolledEnough && !footerNear);

    const onScroll = () => {
      scrolledEnough = window.scrollY > showAfterScroll;
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
            className="min-w-0 flex-1 lg:flex-none"
            ariaLabel={isFavorite ? "Usuń ze schowka" : "Dodaj do schowka"}
            onClick={toggle}
          >
            <i
              className={isFavorite ? "ph-fill ph-bookmark-simple" : "ph ph-bookmark-simple"}
              aria-hidden="true"
            />
            <span className="truncate">{isFavorite ? "W schowku" : "Dodaj do schowka"}</span>
          </Button>

          <Button
            href={askHref}
            variant="primary"
            size="lg"
            className="min-w-0 flex-1 no-underline lg:flex-none"
            ariaLabel={askLabel}
          >
            <i className="ph ph-chat-circle" aria-hidden="true" />
            <span className="truncate">{askLabel}</span>
          </Button>
        </div>
      </div>
    </aside>
  );
}
