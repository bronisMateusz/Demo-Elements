import { useMemo, useState } from "react";
import { listingProducts } from "../../data/listing";
import { wishlistArrangementCatalog, wishlistPage } from "../../data/wishlist";
import {
  clearAllFavorites,
  useFavoriteArrangementIds,
  useFavoriteProductIds,
} from "../../hooks/useProductFavorites";
import { cn } from "../../lib/cn";
import { InspirationGalleryCard } from "../inspiration/InspirationGalleryCard";
import { AdvisorAskDrawer } from "../marketing/AdvisorAskDrawer";
import { ProductCarouselCard } from "../product/ProductCarouselCard";
import { Button } from "../ui/Button";
import { Container } from "../ui/Container";

type WishlistDirectoryProps = {
  className?: string;
};

export function WishlistDirectory({ className }: WishlistDirectoryProps) {
  const productIds = useFavoriteProductIds();
  const arrangementIds = useFavoriteArrangementIds();
  const [askOpen, setAskOpen] = useState(false);
  const [shareOpen, setShareOpen] = useState(false);

  const products = useMemo(
    () =>
      productIds
        .map((id) => listingProducts.find((product) => product.id === id))
        .filter((product): product is (typeof listingProducts)[number] =>
          Boolean(product),
        ),
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

  const total = products.length + arrangements.length;
  const isEmpty = total === 0;

  return (
    <Container size="content" className={cn(className)}>
      <p className="m-0 font-body text-sm text-neutral-600 md:text-ui">
        {wishlistPage.countLabel(total)}
      </p>

      <nav
        className="mt-6 flex flex-wrap gap-2"
        aria-label={wishlistPage.segments.aria}
      >
        <a
          href="#sekcja-produkty"
          className="rounded-xs border border-neutral-200 px-4 py-2 font-body text-sm font-medium text-neutral-900 no-underline transition-colors duration-fast hover:border-neutral-800"
        >
          {wishlistPage.segments.products} ({products.length})
        </a>
        <a
          href="#sekcja-aranzacje"
          className="rounded-xs border border-neutral-200 px-4 py-2 font-body text-sm font-medium text-neutral-900 no-underline transition-colors duration-fast hover:border-neutral-800"
        >
          {wishlistPage.segments.arrangements} ({arrangements.length})
        </a>
      </nav>

      <div className="mt-8 grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(16rem,20rem)] lg:items-start lg:gap-10">
        <div className="min-w-0">
          {isEmpty ? (
            <div className="rounded-xs border border-dashed border-neutral-300 px-6 py-14 text-center">
              <i
                className="ph ph-bookmark-simple text-4xl text-neutral-400"
                aria-hidden="true"
              />
              <h2 className="mt-4 mb-0 font-heading text-h3 font-medium tracking-tight text-neutral-900">
                {wishlistPage.empty.title}
              </h2>
              <p className="mx-auto mt-3 mb-0 max-w-xl font-body text-sm leading-relaxed text-neutral-600">
                {wishlistPage.empty.description}
              </p>
              <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
                <Button
                  href={wishlistPage.empty.primaryHref}
                  variant="primary"
                  size="lg"
                >
                  {wishlistPage.empty.primaryLabel}
                </Button>
                <Button
                  href={wishlistPage.empty.secondaryHref}
                  variant="secondary"
                  size="lg"
                >
                  {wishlistPage.empty.secondaryLabel}
                </Button>
              </div>
            </div>
          ) : (
            <div className="flex flex-col gap-12">
              <section id="sekcja-produkty" className="scroll-mt-28">
                <h2 className="m-0 font-heading text-h3 font-medium tracking-tight text-neutral-900">
                  {wishlistPage.productsHeading}{" "}
                  <span className="text-neutral-500">{products.length}</span>
                </h2>
                {products.length > 0 ? (
                  <div className="mt-6 grid grid-cols-2 gap-x-4 gap-y-8 md:grid-cols-3">
                    {products.map((product) => (
                      <ProductCarouselCard key={product.id} product={product} />
                    ))}
                  </div>
                ) : (
                  <p className="mt-4 mb-0 font-body text-sm text-neutral-600">
                    Brak produktów w schowku.
                  </p>
                )}
              </section>

              <section id="sekcja-aranzacje" className="scroll-mt-28">
                <h2 className="m-0 font-heading text-h3 font-medium tracking-tight text-neutral-900">
                  {wishlistPage.arrangementsHeading}{" "}
                  <span className="text-neutral-500">
                    {arrangements.length}
                  </span>
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
                      />
                    ))}
                  </div>
                ) : (
                  <p className="mt-4 mb-0 font-body text-sm text-neutral-600">
                    Brak aranżacji w schowku.
                  </p>
                )}
              </section>
            </div>
          )}
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
              {wishlistPage.summary.quoteLabel}
            </Button>
            <div className="grid grid-cols-2 gap-2">
              <Button
                as="button"
                type="button"
                variant="secondary"
                disabled={isEmpty}
                onClick={() => {
                  window.alert(wishlistPage.summary.pdfHint);
                }}
              >
                {wishlistPage.summary.pdfLabel}
              </Button>
              <Button
                as="button"
                type="button"
                variant="secondary"
                disabled={isEmpty}
                onClick={() => setShareOpen(true)}
              >
                {wishlistPage.summary.shareLabel}
              </Button>
            </div>
            <button
              type="button"
              className="mt-1 cursor-pointer border-0 bg-transparent p-0 text-start font-body text-sm text-neutral-600 underline-offset-2 hover:text-neutral-900 hover:underline disabled:cursor-not-allowed disabled:opacity-40"
              disabled={isEmpty}
              onClick={() => clearAllFavorites()}
            >
              {wishlistPage.summary.clearLabel}
            </button>
          </div>

          {shareOpen ? (
            <div
              className="mt-5 rounded-xs border border-neutral-200 bg-neutral-50 p-4"
              role="dialog"
              aria-label={wishlistPage.summary.shareLabel}
            >
              <p className="m-0 font-body text-sm text-neutral-600">
                {wishlistPage.summary.shareNote}
              </p>
              <input
                readOnly
                value={wishlistPage.summary.shareUrl}
                className="mt-3 w-full rounded-xs border border-neutral-200 bg-neutral-0 px-3 py-2 font-body text-sm text-neutral-900"
              />
              <Button
                as="button"
                type="button"
                variant="secondary"
                className="mt-3"
                onClick={() => setShareOpen(false)}
              >
                Zamknij
              </Button>
            </div>
          ) : null}
        </aside>
      </div>

      <AdvisorAskDrawer
        open={askOpen}
        onClose={() => setAskOpen(false)}
        topicTitle="Kosztorys schowka"
      />
    </Container>
  );
}
