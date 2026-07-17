export const askDrawerCopy = {
  title: "Masz pytanie o ten produkt?",
  description:
    "Podaj kod pocztowy - przekażemy je do najbliższego salonu. Odpowiemy w 1 dzień roboczy.",
  nameLabel: "Imię",
  namePlaceholder: "Twoje imię",
  contactLabel: "Telefon lub e-mail",
  contactPlaceholder: "Jak mamy się odezwać?",
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
  footerNote: "Na podstawie kodu pocztowego skierujemy zapytanie do najbliższego salonu.",
  successTitle: "Dziękujemy",
  successMessage: "Twoja wiadomość została przyjęta. Skontaktujemy się wkrótce.",
  closeLabel: "Zamknij",
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
