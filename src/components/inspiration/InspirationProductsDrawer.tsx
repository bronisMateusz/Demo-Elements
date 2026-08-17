import { Link } from "react-router-dom";
import { productImageObjectPosition } from "../../lib/productImageStyle";
import { requestSalonDrawer } from "../../hooks/useSelectedSalon";
import { useProductFavorites } from "../../hooks/useProductFavorites";
import type {
  InspirationArrangement,
  RelatedProduct,
} from "../../types/product";
import { Button } from "../ui/Button";
import { IconButton } from "../ui/IconButton";
import { DrawerHeader, DrawerShell } from "../layout/DrawerShell";
import { ProductCardPrice } from "../product/ProductCardPrice";

type InspirationProductsDrawerProps = {
  open: boolean;
  arrangement: InspirationArrangement | null;
  onClose: () => void;
};

/** Polish count label: 1 produkt / 2–4 produkty / 5+ produktów. */
function formatProductCountLabel(count: number) {
  if (count === 1) return "1 produkt";
  const mod10 = count % 10;
  const mod100 = count % 100;
  if (mod10 >= 2 && mod10 <= 4 && (mod100 < 12 || mod100 > 14)) {
    return `${count} produkty`;
  }
  return `${count} produktów`;
}

function ArrangementProductRow({ product }: { product: RelatedProduct }) {
  const { isFavorite, toggle } = useProductFavorites(product.id);

  return (
    <li className="flex items-center gap-3 border-b border-neutral-200 py-5 first:pt-0 last:border-b-0">
      <Link
        to={product.href}
        className="group/row flex min-w-0 flex-1 items-center gap-4 text-inherit no-underline"
      >
        <div className="size-16 shrink-0 overflow-hidden bg-neutral-0 sm:size-18">
          <img
            src={product.image.src}
            alt=""
            className="size-full object-cover"
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

export function InspirationProductsDrawer({
  open,
  arrangement,
  onClose,
}: InspirationProductsDrawerProps) {
  const title = arrangement?.title ?? "Produkty w aranżacji";
  const products = arrangement?.products ?? [];
  const countLabel = formatProductCountLabel(products.length);

  const openSalon = () => {
    onClose();
    requestSalonDrawer();
  };

  return (
    <DrawerShell
      open={open}
      onClose={onClose}
      label={title}
      closeLabel="Zamknij"
    >
      <DrawerHeader
        title={title}
        description={products.length > 0 ? countLabel : undefined}
        closeLabel="Zamknij"
        onClose={onClose}
      />

      <div className="flex min-h-0 flex-1 flex-col">
        <div className="flex-1 overflow-y-auto px-6 pt-6 sm:px-8 sm:pt-8">
          {products.length > 0 ? (
            <ul className="m-0 list-none p-0" aria-label={countLabel}>
              {products.map((product) => (
                <ArrangementProductRow key={product.id} product={product} />
              ))}
            </ul>
          ) : (
            <p className="m-0 py-6 text-ui text-neutral-500">
              Brak produktów w tej aranżacji.
            </p>
          )}
        </div>

        <div className="shrink-0 border-t border-neutral-200 px-6 py-5 sm:px-8">
          <div className="flex flex-col gap-3">
            <Button href="#kontakt" variant="primary" className="w-full">
              Zapytaj o tę aranżację
            </Button>
            <Button
              as="button"
              type="button"
              variant="secondary"
              className="w-full"
              onClick={openSalon}
            >
              Umów spotkanie w salonie
            </Button>
          </div>
        </div>
      </div>
    </DrawerShell>
  );
}
