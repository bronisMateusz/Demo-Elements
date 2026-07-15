import { FooterLegal, FooterMain, FooterNewsletter } from "./footer/FooterSections";

export function Footer() {
  return (
    <footer className="mt-16 border-t border-neutral-200 bg-neutral-50" role="contentinfo">
      <FooterNewsletter />
      <FooterMain />
      <FooterLegal />
    </footer>
  );
}
