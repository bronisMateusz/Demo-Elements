import { assetUrl } from "../../app/assets";
import { advisorAskDrawerCopy } from "../../data/ask";
import type { ProductImage } from "../../types/product";
import { AskDrawer } from "../product/AskDrawer";

type AdvisorAskDrawerProps = {
  open: boolean;
  onClose: () => void;
  topicTitle?: string;
  topicBrand?: string;
  topicImage?: ProductImage;
  /** Drawer header - defaults to advisor / arrangement ask chrome. */
  title?: string;
  description?: string;
  /**
   * `consultation` - salon list first (Drupal #askDrawer), then contact form.
   * `architect` - cooperation form (#azForm) with role + marketing consents.
   */
  variant?: "consultation" | "architect";
  /** Salon/form are steps 2–3 after InspirationProductsDrawer. */
  fromProductsStep?: boolean;
  onBackToProducts?: () => void;
  /** Parent owns DrawerShell - seamless handoff from products step. */
  embedded?: boolean;
};

const advisorImage = {
  src: assetUrl("home/about-salon.png"),
  alt: "Doradztwo Elements",
  fit: "cover" as const,
};

/** Generic ask drawer for category / salon / architect / inspiration pages. */
export function AdvisorAskDrawer({
  open,
  onClose,
  topicTitle = "Doradztwo Elements",
  topicBrand = "Elements",
  topicImage = advisorImage,
  title = advisorAskDrawerCopy.title,
  description = advisorAskDrawerCopy.description,
  variant = "consultation",
  fromProductsStep = false,
  onBackToProducts,
  embedded = false,
}: AdvisorAskDrawerProps) {
  const isArchitect = variant === "architect";

  return (
    <AskDrawer
      open={open}
      onClose={onClose}
      productTitle={topicTitle}
      productBrand={topicBrand}
      productSku=""
      productImage={topicImage}
      title={title}
      description={description}
      showContextSummaries
      showRoutingFields={false}
      showArchitectFields={isArchitect}
      embedSalonPicker={!isArchitect}
      fromProductsStep={fromProductsStep}
      onBackToProducts={onBackToProducts}
      embedded={embedded}
    />
  );
}
