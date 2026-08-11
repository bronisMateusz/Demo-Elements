import { AdvisorCta, type AdvisorCtaContent } from "../marketing/AdvisorCta";
import { homeAdvisorCta } from "../../data/home";

const homeAdvisorContent: AdvisorCtaContent = {
  eyebrow: homeAdvisorCta.eyebrow,
  title: homeAdvisorCta.title,
  description: homeAdvisorCta.description,
  image: homeAdvisorCta.image,
  askLabel: homeAdvisorCta.primaryCta.label,
  bookLabel: homeAdvisorCta.secondaryCta.label,
  askHref: homeAdvisorCta.primaryCta.href,
};

type HomeAdvisorCtaProps = {
  titleId?: string;
  /** Page-specific copy. Defaults to home/category advisor text. */
  content?: AdvisorCtaContent;
  /** When set, ask CTA opens ask flow instead of navigating to the default href. */
  onPrimaryClick?: () => void;
  /** When set, book CTA opens book flow instead of `bookHref`. */
  onBookOpen?: () => void;
  /** Which CTA is primary. Subcategory uses book; home/category use ask. */
  primaryAction?: "ask" | "book";
};

/** Thin wrapper around AdvisorCta used on home, category, listing. */
export function HomeAdvisorCta({
  titleId = "home-advisor-cta-title",
  content = homeAdvisorContent,
  onPrimaryClick,
  onBookOpen,
  primaryAction = "ask",
}: HomeAdvisorCtaProps) {
  return (
    <AdvisorCta
      titleId={titleId}
      content={content}
      onAskOpen={onPrimaryClick}
      onBookOpen={onBookOpen}
      primaryAction={primaryAction}
    />
  );
}
