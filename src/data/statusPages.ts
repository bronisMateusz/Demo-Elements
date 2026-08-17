export const statusPages = {
  notFound: {
    code: "404",
    title: "Strona nie została znaleziona",
    description: "Szukana strona nie istnieje lub została przeniesiona.",
    actionLabel: "Wróć na stronę główną",
    actionHref: "/",
  },
  forbidden: {
    code: "403",
    title: "Brak dostępu",
    description: "Nie masz uprawnień, żeby zobaczyć tę stronę.",
    actionLabel: "Wróć na stronę główną",
    actionHref: "/",
  },
  maintenance: {
    code: "Przerwa techniczna",
    title: "Trwa aktualizacja serwisu",
    description:
      "Przepraszamy za utrudnienia. Spróbuj ponownie za kilka minut.",
    actionLabel: "Odśwież stronę",
  },
} as const;

export type StatusPageId = keyof typeof statusPages;
