export const bookAppointmentCopy = {
  title: "UMÓW SPOTKANIE",
  closeLabel: "Zamknij formularz spotkania",
  changeSalonLabel: "Zmień",
  noSalonLabel: "Wybierz salon",
  salonFallbackHint: "Wskaż salon, w którym chcesz umówić spotkanie.",
  nameLabel: "Imię i nazwisko",
  namePlaceholder: "Jan Kowalski",
  emailLabel: "E-mail",
  emailPlaceholder: "jan@example.com",
  phoneLabel: "Telefon",
  phoneHint: "potwierdzimy termin",
  phonePlaceholder: "np. 600 100 200",
  slotLabel: "Preferowany termin i godzina",
  slotOptional: "opcjonalnie",
  slotPlaceholder: "np. wtorek po 16:00 albo weekend rano",
  reasonLabel: "Powód spotkania",
  reasonOptional: "opcjonalnie",
  reasonOptions: [
    { id: "new", label: "Nowa łazienka" },
    { id: "renovation", label: "Remont" },
    { id: "other", label: "Inny" },
  ],
  messageLabel: "Wiadomość",
  messageOptional: "opcjonalnie",
  messagePlaceholder:
    "Napisz, w czym możemy pomóc podczas spotkania - np. metraż, budżet, styl...",
  consent:
    "Wyrażam zgodę na kontakt w sprawie umówienia spotkania. Administratorem danych jest Grupa HBH - szczegóły w",
  privacyLabel: "Polityce prywatności",
  privacyHref: "#polityka-prywatnosci",
  submitLabel: "Umów spotkanie",
  successTitle: "Dziękujemy",
  successMessage:
    "Twoje zgłoszenie zostało przyjęte. Salon skontaktuje się, aby potwierdzić termin.",
  closeSuccessLabel: "Zamknij",
} as const;

export type BookAppointmentReasonId =
  (typeof bookAppointmentCopy.reasonOptions)[number]["id"];
