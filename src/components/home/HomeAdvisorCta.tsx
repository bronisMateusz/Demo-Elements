import { AdvisorCta } from "../marketing/AdvisorCta";

type HomeAdvisorCtaProps = {
  titleId?: string;
  /** When set, ask CTA opens ask flow instead of navigating to the default href. */
  onPrimaryClick?: () => void;
};

/** Home / category / subcategory alias for shared AdvisorCta (ask primary). */
export function HomeAdvisorCta({
  titleId = "home-advisor-cta-title",
  onPrimaryClick,
}: HomeAdvisorCtaProps = {}) {
  return (
    <AdvisorCta
      titleId={titleId}
      onAskOpen={onPrimaryClick}
      primaryAction="ask"
    />
  );
}
