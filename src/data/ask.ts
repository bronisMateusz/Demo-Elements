export const askDrawerCopy = {
  title: "Masz pytanie o ten produkt?",
  description:
    "Podaj kod pocztowy - przekażemy je do najbliższego salonu. Odpowiemy w 1 dzień roboczy.",
  nameLabel: "Imię i nazwisko",
  namePlaceholder: "Jan Kowalski",
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
  marketingLabel: "Zgody marketingowe",
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

/** Default chrome for AdvisorAskDrawer (inspiracje / doradztwo - not PDP). */
export const advisorAskDrawerCopy = {
  title: "W czym możemy Ci pomóc?",
  description:
    "Zadaj pytanie o aranżację lub poproś o konsultację - doradca Elements odpowie w 1 dzień roboczy.",
  /** Lead above the embedded salon list (Drupal #askDrawer body). */
  salonPickerLead: "Wybierz salon, do którego trafi Twoje zapytanie.",
  changeSalonLabel: "Zmień salon",
  /** Step 1 = products drawer; step 2 = form (salon picker is skipped when already selected). */
  step1Eyebrow: "Krok 1 z 2 · Produkty aranżacji",
  step2Eyebrow: "Krok 2 z 2 · Formularz",
  /** Step 2 when booking a salon visit from InspirationProductsDrawer. */
  step2SalonEyebrow: "Krok 2 z 2 · Wybór salonu",
  /** Shown only when salon must be picked (not counted as a numbered step after products). */
  salonStepEyebrow: "Wybór salonu",
  salonStepOf2Eyebrow: "Krok 1 z 2 · Wybór salonu",
  backToSalonLabel: "Wróć do wyboru salonu",
  backToProductsLabel: "Wróć do produktów",
  topicLabel: "Czego dotyczy zapytanie?",
  topics: [
    { id: "arrangement", label: "Aranżacja" },
    { id: "advice", label: "Doradztwo / dobór produktów" },
    { id: "other", label: "Inny" },
  ] as const,
  messageLabel: "Wiadomość",
  messageTemplate:
    "Dzień dobry, proszę o ofertę i dostępność do aranżacji: {title}.",
  emailPlaceholder: "jan@example.com",
  consent:
    "Wyrażam zgodę na kontakt w sprawie mojego zapytania. Administratorem danych jest Grupa HBH - szczegóły w",
  privacyLabel: "Polityce prywatności",
  privacyHref: "#polityka-prywatnosci",
  submitLabel: "Wyślij wiadomość",
} as const;

export type AdvisorAskTopicId =
  (typeof advisorAskDrawerCopy.topics)[number]["id"];

export function buildArrangementAskMessage(title: string) {
  return advisorAskDrawerCopy.messageTemplate.replace("{title}", title);
}

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
  marketingEyebrow: "Zgody marketingowe",
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
