import { assetUrl } from "../app/assets";

/** Hero covers scraped from each salon page on elements-show.pl. */
export const salonDirectoryImagesById = {
  warszawa: assetUrl("salon/directory/warszawa.jpg"),
  sekocin: assetUrl("salon/directory/sekocin.jpg"),
  krakow: assetUrl("salon/directory/krakow.jpg"),
  poznan: assetUrl("salon/directory/poznan.jpg"),
  wroclaw: assetUrl("salon/directory/wroclaw.jpg"),
  gdansk: assetUrl("salon/directory/gdansk.jpg"),
  lodz: assetUrl("salon/directory/lodz.jpg"),
  szczecin: assetUrl("salon/directory/szczecin.jpg"),
  bydgoszcz: assetUrl("salon/directory/bydgoszcz.jpg"),
  torun: assetUrl("salon/directory/torun.jpg"),
  kielce: assetUrl("salon/directory/kielce.jpg"),
  rzeszow: assetUrl("salon/directory/rzeszow.jpg"),
  opole: assetUrl("salon/directory/opole.jpg"),
  gliwice1: assetUrl("salon/directory/gliwice1.jpg"),
  gliwice2: assetUrl("salon/directory/gliwice2.jpg"),
  jgora: assetUrl("salon/directory/jgora.jpg"),
  klodzko: assetUrl("salon/directory/klodzko.webp"),
  koszalin1: assetUrl("salon/directory/koszalin1.jpg"),
  koszalin2: assetUrl("salon/directory/koszalin2.jpg"),
} as const;

const salonDirectoryFallbackImage = salonDirectoryImagesById.bydgoszcz;

export function salonDirectoryImageFor(salonId: string): string {
  return (
    salonDirectoryImagesById[
      salonId as keyof typeof salonDirectoryImagesById
    ] ?? salonDirectoryFallbackImage
  );
}

export const salonsPage = {
  title: "Salony Elements",
  description:
    "19 salonów w całej Polsce - ekspozycje, na których zobaczysz produkty na żywo i porozmawiasz z doradcą.",
  breadcrumbs: [
    { label: "Strona główna", to: "/" },
    { label: "Salony", current: true },
  ],
  usps: [
    {
      iconClass: "ph ph-cube",
      label: "Ekspozycja na żywo",
      text: "ceramika, armatura i płytki w aranżacjach",
    },
    {
      iconClass: "ph ph-users",
      label: "Doradca",
      text: "dobierze wyposażenie i policzy kosztorys",
    },
    {
      iconClass: "ph ph-pencil-line",
      label: "Projekt",
      text: "zaprojektujesz łazienkę z architektem",
    },
  ],
  find: {
    title: "Znajdź najbliższy salon",
    searchPlaceholder: "Miasto lub kod pocztowy",
    geoLabel: "Użyj mojej lokalizacji",
    locatingLabel: "Lokalizowanie…",
    locateUnsupported: "Twoja przeglądarka nie obsługuje geolokalizacji.",
    locateDenied: "Nie udało się pobrać lokalizacji - sprawdź uprawnienia.",
    locateUnavailable: "Lokalizacja jest chwilowo niedostępna.",
  },
  nearby: {
    title: "Najbliższe salony",
    learnMoreLabel: "Dowiedz się więcej",
    selectLabel: "Wybierz salon",
  },
  directory: {
    title: "19 salonów w całej Polsce",
    listLabel: "Lista",
    mapLabel: "Mapa",
    allVoivLabel: "Wszystkie",
  },
} as const;

export function salonCountLabel(count: number): string {
  if (count === 1) return "1 salon";
  if (count < 5) return `${count} salony`;
  return `${count} salonów`;
}
