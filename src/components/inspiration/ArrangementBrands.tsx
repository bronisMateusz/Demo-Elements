import { BrandLogoTile } from "../marketing/BrandLogoTile";
import { cn } from "../../lib/cn";
import { producerBrandByName, type ProducerBrand } from "../../data/producers";
import { contentDividerTopClassName } from "../../lib/layoutTokens";
import type { RelatedProduct } from "../../types/product";

type ArrangementBrandsProps = {
  products: readonly RelatedProduct[];
  className?: string;
};

/** Unique brands from arrangement products - same tiles as ProducersDirectory. */
export function ArrangementBrands({
  products,
  className,
}: ArrangementBrandsProps) {
  const brands: ProducerBrand[] = [];
  for (const product of products) {
    const name = product.brand.trim();
    if (!name) continue;
    if (
      brands.some((entry) => entry.name.toLowerCase() === name.toLowerCase())
    ) {
      continue;
    }
    brands.push(producerBrandByName(name));
  }

  if (brands.length === 0) return null;

  return (
    <div className={cn(contentDividerTopClassName, "mt-8 pt-6 pb-8", className)}>
      <h3 className="m-0 mb-4 font-heading text-h4 leading-[1.25] font-medium tracking-tight text-neutral-900 md:mb-5">
        Marki w tej aranżacji
      </h3>
      <div className="grid grid-cols-2 gap-x-5 gap-y-4">
        {brands.map((brand) => (
          <BrandLogoTile key={brand.slug} brand={brand} showName={false} />
        ))}
      </div>
    </div>
  );
}
