import { homeInspiration } from "../../data/home";
import { InspirationGallery } from "../inspiration/InspirationGallery";
import { Section } from "../structural/Section";

export function HomeInspiration() {
  return (
    <Section ariaLabelledby="inspiration-gallery-title">
      <InspirationGallery
        arrangements={homeInspiration.arrangements}
        eyebrow={homeInspiration.eyebrow}
        title={homeInspiration.title}
        navPlacement="header"
        footerActions={homeInspiration.footerActions}
        endCap={{
          label: "Kliknij poniżej",
          title: "Pełna galeria aranżacji",
          description:
            "Zobacz wszystkie inspiracje i dobierz produkty do swojej łazienki.",
        }}
      />
    </Section>
  );
}
