import { Link } from "react-router-dom";
import {
  productImageFitClassName,
  productImageObjectPosition,
} from "../../lib/productImageStyle";
import { cn } from "../../lib/cn";
import { useProductFavorites } from "../../hooks/useProductFavorites";
import type { RelatedProduct } from "../../types/product";
import { IconButton } from "../ui/IconButton";
import { ProductCardPrice } from "../product/ProductCardPrice";

type ArrangementProductRowProps = {
  product: RelatedProduct;
};

/** Compact product row for arrangement / article product lists. */
export function ArrangementProductRow({ product }: ArrangementProductRowProps) {
  const { isFavorite, toggle } = useProductFavorites(product.id);
  const isCover = product.image.fit === "cover";

  return (
    <li className="flex items-center gap-3 border-b border-neutral-300 py-5 first:pt-0 last:border-b-0">
      <Link
        to={product.href}
        className="group/row flex min-w-0 flex-1 items-center gap-4 text-inherit no-underline"
      >
        <div className="size-16 shrink-0 overflow-hidden bg-neutral-0 sm:size-18">
          <img
            src={product.image.src}
            alt=""
            className={cn(
              "size-full",
              productImageFitClassName(product.image),
              !isCover && "p-1",
            )}
            style={{
              objectPosition: productImageObjectPosition(product.image),
            }}
            width={72}
            height={72}
            loading="lazy"
            draggable={false}
          />
        </div>

        <div className="min-w-0 flex-1">
          <p className="m-0 text-xs tracking-[0.08em] text-neutral-500 uppercase">
            {product.brand}
          </p>
          <p className="mt-1 mb-0 font-body text-ui leading-snug font-medium text-neutral-900 transition-colors duration-fast ease-out group-hover/row:text-gold-500">
            {product.title}
          </p>
          {product.price ? (
            <ProductCardPrice
              price={product.price}
              pricePrevious={product.pricePrevious}
              size="row"
              className="mt-1.5"
            />
          ) : null}
        </div>
      </Link>

      <IconButton
        label={isFavorite ? "Usuń ze schowka" : "Dodaj do schowka"}
        iconClass={
          isFavorite ? "ph-fill ph-bookmark-simple" : "ph ph-bookmark-simple"
        }
        variant="elevated"
        active={isFavorite}
        className="shadow-subtle"
        onClick={toggle}
      />
    </li>
  );
}
