import { useMemo, useState } from "react";
import { cn } from "../../lib/cn";
import { stickyListingFiltersScrollClassName } from "../../lib/layoutTokens";
import type { RelatedProduct } from "../../types/product";
import { InternalSubnav } from "../ui/InternalSubnav";
import { ArrangementBrands } from "./ArrangementBrands";
import { ArrangementProductRow } from "./ArrangementProductRow";

type PanelTab = "products" | "brands";

type InspirationArticleProductsPanelProps = {
  products: readonly RelatedProduct[];
  title?: string;
  titleId?: string;
  className?: string;
};

const PANEL_TABS = [
  { id: "products" as const, label: "Produkty" },
  { id: "brands" as const, label: "Marki" },
];

/** Products / brands tabs - desktop sidebar or drawer body. */
export function InspirationArticleProductsPanel({
  products,
  title = "Produkty z tej aranżacji",
  titleId = "inspiration-article-products-title",
  className,
}: InspirationArticleProductsPanelProps) {
  const hasBrands = useMemo(() => {
    const seen = new Set<string>();
    for (const product of products) {
      const brand = product.brand.trim().toLowerCase();
      if (brand) seen.add(brand);
    }
    return seen.size > 0;
  }, [products]);

  const tabs = hasBrands ? PANEL_TABS : PANEL_TABS.slice(0, 1);
  const [tab, setTab] = useState<PanelTab>("products");
  const activeTab = tabs.some((item) => item.id === tab) ? tab : "products";

  return (
    <div
      className={cn("flex min-h-0 max-h-[inherit] flex-col pt-4", className)}
    >
      <div className="shrink-0">
        <h2
          id={titleId}
          className="m-0 mb-3 font-heading text-h4 leading-[1.25] font-medium tracking-tight text-neutral-900 md:mb-4"
        >
          {title}
        </h2>
        {tabs.length > 1 ? (
          <InternalSubnav
            items={tabs}
            activeId={activeTab}
            onSelect={(id) => setTab(id as PanelTab)}
            ariaLabel="Produkty i marki w aranżacji"
            centered={false}
            className="border-b border-neutral-300"
          />
        ) : null}
      </div>

      <div
        className={cn(
          stickyListingFiltersScrollClassName,
          "min-h-0 flex-1 pt-5",
        )}
      >
        {activeTab === "products" ? (
          products.length > 0 ? (
            <ul className="m-0 list-none p-0" aria-labelledby={titleId}>
              {products.map((product) => (
                <ArrangementProductRow key={product.id} product={product} />
              ))}
            </ul>
          ) : (
            <p className="m-0 text-ui text-neutral-500">
              Brak produktów w tej aranżacji.
            </p>
          )
        ) : (
          <ArrangementBrands products={products} embedded />
        )}
      </div>
    </div>
  );
}
