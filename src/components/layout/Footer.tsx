import { FooterLegal, FooterMain } from "./footer/FooterSections";
import { SiteSalonsPresence } from "./SiteSalonsPresence";

export function Footer() {
  return (
    <footer className="mt-16" role="contentinfo">
      <SiteSalonsPresence />
      <div className="bg-neutral-50">
        <FooterMain />
        <FooterLegal />
      </div>
    </footer>
  );
}
