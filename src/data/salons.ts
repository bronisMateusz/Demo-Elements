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

/** Alternate tabs listing (`/salony-b`) - copy + card helpers. */
export const salonsPageB = {
  title: "Salony Elements",
  description:
    "19 salonów w całej Polsce - ekspozycje, na których zobaczysz produkty na żywo i porozmawiasz z doradcą.",
  breadcrumbs: [
    { label: "Strona główna", to: "/" },
    { label: "Salony", to: "/salony" },
    { label: "Wariant B", current: true },
  ],
  usps: salonsPage.usps,
  location: {
    title: "Wybierz lokalizację",
    voivLabel: "Województwo",
    cityLabel: "Miasto",
    groupByVoiv: "Województwa",
    groupByCity: "Miasta",
    groupByAria: "Grupowanie salonów",
  },
  card: {
    addressLabel: "Adres",
    directionsLabel: "Wyznacz trasę",
    offerLabel: "Przygotowanie oferty, doradztwo techniczne",
    architectsLabel: "Wsparcie techniczne dla projektantów i architektów",
    hoursLabel: "Godziny otwarcia",
    emailLabel: "E-mail",
    bookLabel: "Umów spotkanie",
    bookSelectedLabel: "Wybrany",
    salonPageLabel: "Przejdź do strony salonu",
    imageAltPrefix: "Zdjęcie salonu",
  },
  advisor: {
    eyebrow: "Pomoc",
    title: "Nie wiesz, który salon wybrać?",
    description:
      "Napisz do nas - podpowiemy najbliższą ekspozycję i umówimy Cię na spotkanie z doradcą w dogodnym terminie.",
    askLabel: "Napisz do doradcy",
    bookLabel: "Umów spotkanie",
  },
} as const;

export type SalonPhoneGroup = {
  label: string;
  phones: readonly string[];
  email?: string;
};

type SalonDirectionsInput = {
  lat: number;
  lng: number;
  address: string;
};

type SalonPhoneInput = {
  phones: readonly string[];
  email: string;
};

/** Google Maps directions to salon coordinates. */
export function salonDirectionsHref(salon: SalonDirectionsInput): string {
  return `https://www.google.com/maps/dir/?api=1&destination=${salon.lat},${salon.lng}`;
}

/**
 * Split phones into offer vs architects groups for tab cards.
 * With 2+ numbers the last goes to architects; email is shown separately.
 */
export function salonTabPhoneGroups(
  salon: SalonPhoneInput,
  labels: { offer: string; architects: string },
): SalonPhoneGroup[] {
  const phones = [...salon.phones];
  if (phones.length >= 2) {
    return [
      {
        label: labels.offer,
        phones: phones.slice(0, -1),
      },
      {
        label: labels.architects,
        phones: [phones[phones.length - 1]!],
      },
    ];
  }
  return [
    {
      label: labels.offer,
      phones,
    },
    {
      label: labels.architects,
      phones: [],
    },
  ].filter((group) => group.phones.length > 0);
}

export function salonTelHref(phone: string): string {
  return `tel:${phone.replace(/[\s()-]/g, "")}`;
}

/** City chip label from presence label (“Warszawa - Elektronowa” → “Warszawa”). */
export function salonCityChipLabel(presenceLabel: string): string {
  const sep = " - ";
  const index = presenceLabel.indexOf(sep);
  return index === -1 ? presenceLabel : presenceLabel.slice(0, index);
}
