import { cn } from "../../lib/cn";
import { contentDividerTopClassName } from "../../lib/layoutTokens";
import { requestInspirationAskDrawer } from "../../hooks/useInspirationAskDrawer";
import { requestSalonDrawer } from "../../hooks/useSelectedSalon";
import type { InspirationArrangement } from "../../types/product";
import { Button } from "../ui/Button";
import { DrawerHeader, DrawerShell } from "../layout/DrawerShell";
import { InspirationArticleProductsPanel } from "./InspirationArticleProductsPanel";

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

  const openAsk = () => {
    if (arrangement) {
      onClose();
      requestInspirationAskDrawer(arrangement);
    }
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
        <div className="flex min-h-0 flex-1 flex-col px-6 sm:px-8">
          <InspirationArticleProductsPanel
            products={products}
            title="Z tej aranżacji"
            titleId="inspiration-drawer-products-title"
            className="pt-4"
          />
        </div>

        <div
          className={cn(
            "shrink-0 px-6 py-5 sm:px-8",
            contentDividerTopClassName,
          )}
        >
          <div className="flex flex-col gap-3">
            <Button
              as="button"
              type="button"
              variant="primary"
              className="w-full"
              onClick={openAsk}
            >
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
