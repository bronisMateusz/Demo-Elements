import {
  InspirationGallery,
  type InspirationGalleryControls,
} from "../inspiration/InspirationGallery";
import type { InspirationArrangement } from "../../types/product";

export type ProductInspirationControls = InspirationGalleryControls;

type ProductInspirationProps = {
  arrangements: InspirationArrangement[];
  eyebrow?: string;
  title?: string;
  /** `header` - beside title; `footer` - under the track (default); `none` - parent owns nav. */
  navPlacement?: "header" | "footer" | "none";
  onControlsChange?: (controls: ProductInspirationControls) => void;
};

/** PDP inspirations - same gallery module as home “Poznaj nasze aranżacje”. */
export function ProductInspiration({
  arrangements,
  eyebrow = "Produkt w aranżacji",
  title = "Inspiracje producenta",
  navPlacement = "footer",
  onControlsChange,
}: ProductInspirationProps) {
  return (
    <InspirationGallery
      arrangements={arrangements}
      eyebrow={eyebrow}
      title={title}
      titleId="inspiration-title"
      navPlacement={navPlacement}
      onControlsChange={onControlsChange}
      seeMoreHref="#inspiracje"
      seeMoreLabel="Zobacz więcej aranżacji"
      endCap={{
        label: "Kliknij poniżej",
        title: "Pełna galeria aranżacji",
        description:
          "Zobacz więcej inspiracji i dobierz produkty do swojej łazienki.",
      }}
    />
  );
}
