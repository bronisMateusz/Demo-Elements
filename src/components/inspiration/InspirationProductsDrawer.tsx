import { advisorAskDrawerCopy } from "../../data/ask";
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
  /**
   * Render panel body only (parent owns DrawerShell) - seamless step switch
   * into the ask flow.
   */
  embedded?: boolean;
  /** When set, used instead of the global ask-drawer event. */
  onAsk?: (arrangement: InspirationArrangement) => void;
  /**
   * When set (Header shared shell), salon booking is step 2 in the same drawer.
   * Otherwise closes and opens the standalone SalonDrawer.
   */
  onBookSalon?: () => void;
};

export function InspirationProductsDrawer({
  open,
  arrangement,
  onClose,
  embedded = false,
  onAsk,
  onBookSalon,
}: InspirationProductsDrawerProps) {
  const title = arrangement?.title ?? "Produkty w aranżacji";
  const products = arrangement?.products ?? [];

  const openSalon = () => {
    if (onBookSalon) {
      onBookSalon();
      return;
    }
    onClose();
    requestSalonDrawer();
  };

  const openAsk = () => {
    if (!arrangement) return;
    if (onAsk) {
      onAsk(arrangement);
      return;
    }
    onClose();
    requestInspirationAskDrawer(arrangement);
  };

  const body = (
    <>
      <DrawerHeader
        title={title}
        closeLabel="Zamknij"
        onClose={onClose}
        eyebrow={advisorAskDrawerCopy.step1Eyebrow}
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
    </>
  );

  if (embedded) {
    return body;
  }

  return (
    <DrawerShell
      open={open}
      onClose={onClose}
      label={title}
      closeLabel="Zamknij"
    >
      {body}
    </DrawerShell>
  );
}
