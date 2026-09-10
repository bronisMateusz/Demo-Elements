import { cn } from "../../lib/cn";
import { useFloatingCtaVisibility } from "../../hooks/useFloatingCtaVisibility";
import { requestInspirationProductsDrawer } from "../../hooks/useInspirationProductsDrawer";
import type {
  InspirationArrangement,
  RelatedProduct,
} from "../../types/product";
import { Button } from "../ui/Button";
import { productFixedBarClassName } from "../ui/productFixedBarClassName";

type InspirationArticleProductsBarProps = {
  arrangement: InspirationArrangement;
  products: readonly RelatedProduct[];
  className?: string;
};

/** Mobile fixed bar - opens the shared InspirationProductsDrawer. */
export function InspirationArticleProductsBar({
  arrangement,
  products,
  className,
}: InspirationArticleProductsBarProps) {
  const visible = useFloatingCtaVisibility({
    heroSelector: "[data-inspiration-article-hero]",
  });

  const count = products.length;
  const label =
    count > 0 ? `Produkty z aranżacji (${count})` : "Produkty z aranżacji";

  return (
    <aside
      className={cn(
        productFixedBarClassName({ visible, className }),
        "lg:hidden",
      )}
      aria-hidden={!visible}
      aria-label="Produkty z aranżacji"
    >
      <div className="border border-neutral-300/80 border-x-0 border-b-0 bg-neutral-0 px-3 py-2 shadow-2">
        <Button
          as="button"
          type="button"
          variant="primary"
          size="lg"
          className="h-11 w-full"
          ariaLabel={label}
          onClick={() =>
            requestInspirationProductsDrawer({
              ...arrangement,
              products: [...products],
            })
          }
        >
          <i className="ph ph-cube" aria-hidden="true" />
          <span className="truncate">{label}</span>
        </Button>
      </div>
    </aside>
  );
}
