import { cn } from "../../lib/cn";
import { stickyListingFiltersScrollClassName } from "../../lib/layoutTokens";
import type { RelatedProduct } from "../../types/product";
import { ArrangementBrands } from "./ArrangementBrands";
import { ArrangementProductRow } from "./ArrangementProductRow";

type InspirationArticleProductsPanelProps = {
  products: readonly RelatedProduct[];
  title?: string;
  titleId?: string;
  className?: string;
};

/** Products list + brands - desktop sidebar or drawer body. */
export function InspirationArticleProductsPanel({
  products,
  title = "Produkty z tej aranżacji",
  titleId = "inspiration-article-products-title",
  className,
}: InspirationArticleProductsPanelProps) {
  return (
    <div
      className={cn("flex min-h-0 max-h-[inherit] flex-col pt-4", className)}
    >
      <h2
        id={titleId}
        className="m-0 mb-4 shrink-0 font-heading text-h4 leading-[1.25] font-medium tracking-tight text-neutral-900 md:mb-5"
      >
        {title}
      </h2>

      <div
        className={cn(stickyListingFiltersScrollClassName, "min-h-0 flex-1")}
      >
        {products.length > 0 ? (
          <ul className="m-0 list-none p-0" aria-labelledby={titleId}>
            {products.map((product) => (
              <ArrangementProductRow key={product.id} product={product} />
            ))}
          </ul>
        ) : (
          <p className="m-0 text-ui text-neutral-500">
            Brak produktów w tej aranżacji.
          </p>
        )}
        <ArrangementBrands products={products} />
      </div>
    </div>
  );
}
