import { FooterLegal, FooterMain, FooterNewsletter } from "./footer/FooterSections";

export function Footer() {
  return (
    <footer className="mt-16 border-t border-border bg-bg-muted" role="contentinfo">
      <FooterNewsletter />
      <FooterMain />
      <FooterLegal />
    </footer>
  );
}
