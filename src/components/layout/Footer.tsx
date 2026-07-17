import { FooterLegal, FooterMain, FooterNewsletter } from "./footer/FooterSections";

export function Footer() {
  return (
    <footer className="mt-16" role="contentinfo">
      <div className="relative z-10">
        <FooterNewsletter />
      </div>
      {/* Half of newsletter min-height so fill starts mid-banner. */}
      <div className="relative -mt-footer-newsletter-overlap bg-neutral-50 pt-footer-newsletter-overlap md:-mt-footer-newsletter-overlap-md md:pt-footer-newsletter-overlap-md">
        <FooterMain />
        <FooterLegal />
      </div>
    </footer>
  );
}
