export const askDrawerCopy = {
  title: "Masz pytanie o ten produkt?",
  description:
    "Podaj kod pocztowy - przekażemy je do najbliższego salonu. Odpowiemy w 1 dzień roboczy.",
  nameLabel: "Imię",
  namePlaceholder: "Twoje imię",
  lastNameLabel: "Nazwisko",
  lastNamePlaceholder: "Twoje nazwisko",
  phoneLabel: "Telefon",
  phonePlaceholder: "np. +48 600 000 000",
  emailLabel: "E-mail",
  emailPlaceholder: "np. jan@pracownia.pl",
  postalLabel: "Kod pocztowy",
  postalHint: "wskażemy najbliższy salon",
  postalPlaceholder: "np. 00-001",
  messageLabel: "Wiadomość",
  messageTemplate:
    "Dzień dobry, proszę o ofertę i dostępność produktu: {title} ({sku}).",
  consent:
    "Wyrażam zgodę na kontakt w sprawie mojego zapytania. Administratorem danych jest Grupa HBH - szczegóły w",
  privacyLabel: "Polityce prywatności",
  privacyHref: "#polityka-prywatnosci",
  marketingLabel: "Zgody marketingowe (opcjonalne)",
  marketingHref: "#zgody-marketingowe",
  submitLabel: "Wyślij zapytanie",
  footerNote:
    "Na podstawie kodu pocztowego skierujemy zapytanie do najbliższego salonu.",
  footerNoteWithSalon:
    "Zapytanie trafia bezpośrednio do doradcy w salonie {salon}.",
  altContactTitle: "Wolisz inną formę kontaktu?",
  altCallTitle: "Zadzwoń do doradcy",
  altVisitTitle: "Przyjdź do salonu",
  successTitle: "Dziękujemy",
  successMessage:
    "Twoja wiadomość została przyjęta. Skontaktujemy się wkrótce.",
  closeLabel: "Zamknij",
  salonEmptyHint: "Wskaż salon, do którego trafi zapytanie.",
} as const;

/** Extra fields for architect / cooperation ask drawer (makieta #azForm). */
export const architectAskFormCopy = {
  salonLabel: "Salon Elements, z którym współpracuję / najbliższy",
  salonUnknown: "Nie wiem / dobierzcie najbliższy",
  salonCities: [
    "Warszawa",
    "Kraków",
    "Wrocław",
    "Poznań",
    "Gdańsk",
    "Łódź",
    "Katowice",
    "Szczecin",
  ],
  roleConfirm:
    "Jestem architektem, projektantem lub studentem kierunku architektura.",
  marketingEyebrow: "Zgody marketingowe (opcjonalne - nie blokują wysłania)",
  marketingIntro:
    "Chcę otrzymywać informacje o szkoleniach, promocjach i nowościach dotyczących oferty Elements za pośrednictwem i wyrażam zgodę:",
  marketingEmail:
    "Wyrażam zgodę na przetwarzanie moich danych osobowych przez Grupę HBH* w celu marketingu bezpośredniego oferty Elements za pośrednictwem poczty elektronicznej (e-mail).",
  marketingPhone:
    "Wyrażam zgodę na przetwarzanie moich danych osobowych przez Grupę HBH* w celu marketingu bezpośredniego oferty Elements za pośrednictwem numeru telefonu.",
  submitLabel: "Wyślij",
  adminNoteBeforeEmail:
    "Administratorem danych osobowych jest Grupa HBH*; kontakt: ",
  adminEmail: "ochrona.danych@grupa-hbh.pl",
  adminNoteAfterEmail:
    ", która przetwarza dane osobowe w celu podjęcia działań na Państwa żądanie oraz w celach promocyjno-marketingowych (o ile wyrazili Państwo na to zgodę). Informujemy, że przysługuje Państwu prawo dostępu do swoich danych osobowych, ich sprostowania, ograniczenia przetwarzania, przenoszenia, wycofania zgody oraz złożenia skargi do organu nadzorczego. Szczegółowe informacje dostępne są w naszej ",
  adminPrivacyLabel: "Polityce prywatności i plików cookies",
  adminPrivacyHref: "#polityka-prywatnosci",
  adminNoteEnd: ".",
} as const;

/** Strip catalog prefix (e.g. `KBN: `) for UI matching the eh prototype. */
export function formatAskSku(sku: string) {
  return sku.replace(/^KBN:\s*/i, "").trim();
}

export function buildAskMessage(title: string, sku: string) {
  return askDrawerCopy.messageTemplate
    .replace("{title}", title)
    .replace("{sku}", formatAskSku(sku));
}

export function buildAskFooterNote(salonName: string | null | undefined) {
  if (!salonName) return askDrawerCopy.footerNote;
  return askDrawerCopy.footerNoteWithSalon.replace("{salon}", salonName);
}
