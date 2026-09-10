import { assetUrl } from "../../app/assets";
import { AskDrawer } from "../product/AskDrawer";

type AdvisorAskDrawerProps = {
  open: boolean;
  onClose: () => void;
  topicTitle?: string;
  /** Drawer header - defaults to product-ask chrome. */
  title?: string;
  description?: string;
};

const advisorImage = {
  src: assetUrl("home/about-salon.png"),
  alt: "Doradztwo Elements",
  fit: "cover" as const,
};

/** Generic ask drawer for category / salon pages (no PDP product context). */
export function AdvisorAskDrawer({
  open,
  onClose,
  topicTitle = "Doradztwo Elements",
  title,
  description,
}: AdvisorAskDrawerProps) {
  return (
    <AskDrawer
      open={open}
      onClose={onClose}
      productTitle={topicTitle}
      productBrand="Elements"
      productSku="DORADZTWO"
      productImage={advisorImage}
      title={title}
      description={description}
      showContextSummaries={false}
      showRoutingFields={false}
      showArchitectFields
    />
  );
}
