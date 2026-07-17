import { FooterLegal, FooterMain, FooterNewsletter } from "./footer/FooterSections";

export function Footer() {
  return (
    <footer className="mt-16" role="contentinfo">
      <div className="relative z-10">
        <FooterNewsletter />
      </div>
      {/* Half of newsletter min-height so fill starts mid-banner. */}
      <div className="relative -mt-[140px] bg-neutral-50 pt-[140px] md:-mt-[160px] md:pt-[160px]">
        <FooterMain />
        <FooterLegal />
      </div>
    </footer>
  );
}
