import { assetUrl } from "../app/assets";
import { ctaContextImages } from "../lib/ctaContextImages";
import type { PdpSubnavItem } from "../constants/pdpSubnav";
import { inspirationCarouselArrangements } from "./inspirationCarousel";
import { subcategoryPage } from "./subcategory";

export const architectZoneSubnavItems: PdpSubnavItem[] = [
  { id: "wsparcie", label: "Wsparcie" },
  { id: "opiekunowie", label: "Opiekun" },
  { id: "dodatkowe", label: "Dodatkowe korzyści" },
  { id: "materialy", label: "Materiały" },
  { id: "aktualnosci", label: "Aktualności" },
  { id: "faq", label: "FAQ" },
];

export const architectZonePage = {
  title: "Strefa Architekta",
  metaDescription:
    "Od ponad 20 lat wspieramy architektów i projektantów - od pierwszej inspiracji po finalną realizację.",
  breadcrumbs: [
    { label: "Strona główna", to: "/" },
    { label: "Strefa architekta", current: true },
  ],
  hero: {
    eyebrow: "Witaj w Strefie Architekta Elements",
    title: "Tworzysz wyjątkowe wnętrza. Zrealizuj je z ELEMENTS.",
    lead: "Od ponad 20 lat wspieramy architektów i projektantów - od pierwszej inspiracji po finalną realizację.",
    askLabel: "Rozpocznij współpracę",
    productsLabel: "Przejdź do materiałów projektowych",
    productsHref: "/pliki-do-pobrania",
    /** Single static frame - brief: no auto slider. */
    image: {
      src: assetUrl("home/partners-architects.jpg"),
      alt: "Architekt przy pracy nad projektem w salonie Elements",
      fit: "cover" as const,
      focalPoint: { x: 55, y: 28 },
    },
  },
  support: {
    id: "wsparcie",
    title:
      "Wsparcie, które pomaga przeprowadzić projekt od koncepcji do realizacji",
    items: [
      {
        iconClass: "ph ph-user-circle",
        title: "Dedykowany opiekun",
        text: "Jedna osoba zna Twój projekt i koordynuje kontakt z salonem.",
        href: "#opiekunowie",
        ctaLabel: "Znajdź opiekuna",
      },
      {
        iconClass: "ph ph-cube",
        title: "Próbki, tekstury i modele 3D",
        text: "Materiały do prezentacji, wizualizacji i dokumentacji projektu.",
        href: "#materialy",
        ctaLabel: "Zobacz materiały",
      },
      {
        iconClass: "ph ph-buildings",
        title: "Przestrzeń do pracy z klientem",
        text: "Umów spotkanie w showroomie i porównaj materiały na żywo.",
      },
      {
        iconClass: "ph ph-graduation-cap",
        title: "Wiedza produktowa i szkolenia",
        text: "Konsultacje techniczne, premiery marek i spotkania branżowe.",
      },
    ],
  },
  guardian: {
    id: "opiekunowie",
    title: "Znajdź opiekuna w swoim salonie ELEMENTS",
    lead: "Wybierz salon, aby zobaczyć bezpośredni kontakt do osoby, która zna lokalną ofertę i pomoże Ci przeprowadzić projekt od doboru rozwiązań po realizację.",
    selectLabel: "Wybierz salon",
    selectPlaceholder: "Zacznij wpisywać miasto lub wybierz z listy",
    emptyTitle:
      "Wybierz salon, aby zobaczyć dane kontaktowe opiekuna architekta.",
    emptyDescription:
      "Stan początkowy: wybierz salon, aby wyświetlić dane opiekuna.",
    contactNote:
      "Twój bezpośredni kontakt w tym salonie. Odezwij się od razu - telefonicznie lub mailowo. Odpowiadamy w 1 dzień roboczy.",
    callLabel: "Zadzwoń",
    emailLabel: "Napisz e-mail",
    contact: {
      name: "Anna Kowalska",
      role: "Opiekun architekta",
      phone: "+48 510 023 038",
      phoneHref: "tel:+48510023038",
      email: "architekci@elements-show.pl",
      emailHref: "mailto:architekci@elements-show.pl",
    },
  },
  extraBenefits: {
    id: "dodatkowe",
    title: "Dodatkowe możliwości dla współpracujących architektów",
    items: [
      {
        iconClass: "ph ph-handshake",
        title: "Umowa o współpracy",
        text: "Jasne zasady i warunki uzgadniane z opiekunem.",
        href: "#wspolpraca",
        ctaLabel: "Rozpocznij współpracę",
      },
      {
        iconClass: "ph ph-airplane-tilt",
        title: "ELEMENTS w Podróży",
        text: "Wyjazdy i nagrody za długofalową współpracę.",
        href: "#opiekunowie",
        ctaLabel: "Zapytaj opiekuna",
      },
      {
        iconClass: "ph ph-megaphone",
        title: "Promocja projektów",
        text: "Możliwość prezentacji realizacji w kanałach ELEMENTS.",
        href: "/inspiracje-listing",
        ctaLabel: "Zobacz inspiracje",
      },
      {
        iconClass: "ph ph-chalkboard-teacher",
        title: "Wydarzenia branżowe",
        text: "Premiery, warsztaty produktowe i spotkania w salonach.",
        href: "#aktualnosci",
        ctaLabel: "Zobacz wydarzenia",
      },
    ],
  },
  materials: {
    id: "materialy",
    eyebrow: "Baza projektowa",
    title: "Wszystko, czego potrzebujesz do pracy.",
    description:
      "Modele 3D, pliki CAD i DWG, tekstury, karty techniczne, deklaracje i certyfikaty - uporządkowane w jednym miejscu.",
    ctaLabel: "Przejdź do bazy materiałów",
    href: "/pliki-do-pobrania",
    note: "Dostęp bez rejestracji.",
    image: {
      src: assetUrl("home/architect-catalog-cta.jpg"),
      alt: "Architekt omawia plan z klientem nad rzutami",
      fit: "cover" as const,
      focalPoint: { x: 50, y: 55 },
    },
  },
  showroom: {
    eyebrow: "Na żywo znaczy więcej",
    title: "Zobacz materiały. Poczuj faktury. Porównaj kolory.",
    description:
      "Zapraszamy Ciebie i Twojego klienta do showroomu. Przygotujemy próbki i produkty, które chcesz porównać.",
    ctaLabel: "Umów spotkanie w salonie",
    image: ctaContextImages.salonBydgoszcz,
  },
  /** Kept for CTA showcase / library demos. */
  inviteSalon: {
    eyebrow: "Salony Elements",
    title: "Zaproś klienta do salonu",
    description:
      "19 salonów w całej Polsce - 10 000 m² ekspozycji, strefy do spotkań i pełna oferta na żywo.",
    items: [
      "Klient zobaczy materiały, kolory i wykończenia na żywo - zamiast na zdjęciach z katalogu.",
      "Decyzje zapadają szybciej, gdy można dotknąć produktu i porównać kolekcje obok siebie.",
      "Spotkanie w komfortowej, neutralnej przestrzeni wzmacnia Twój profesjonalny wizerunek.",
      "Doradca salonu wspiera Cię merytorycznie i odciąża podczas prezentacji oferty.",
    ],
    image: ctaContextImages.salonBydgoszcz,
  },
  /** Kept for CTA showcase / library demos - not shown on the page. */
  loyalty: {
    eyebrow: "Program partnerski",
    title: "Program lojalnościowy „Elements w Podróży”",
    description:
      "Doceniamy długofalowe relacje i nagradzamy zaangażowanie wyjazdami oraz nagrodami w programie „Elements w Podróży”.",
    ctaLabel: "Dołącz do programu „Elements w Podróży”",
    ctaHref: "#wspolpraca",
    image: ctaContextImages.architectWorkspace,
  },
  inspiration: {
    id: "inspiracje",
    title: "Inspiracje z projektów architektów",
    description:
      "Wizualizacje w dziale Inspiracje to realne realizacje architektów współpracujących z Elements - gotowa baza pomysłów dla Ciebie i Twoich klientów.",
    promo: {
      iconClass: "ph ph-megaphone",
      title: "Promujemy Twoje projekty",
      description:
        "Realizacje naszych architektów partnerskich prezentujemy w dziale Inspiracje - to dodatkowa ekspozycja Twojej pracy i źródło nowych klientów.",
    },
    arrangements: inspirationCarouselArrangements("az-insp"),
  },
  blog: {
    id: "aktualnosci",
    title: "Aktualności i wydarzenia",
    lead: "Poznaj realizacje, premiery produktów, szkolenia i wydarzenia w salonach ELEMENTS.",
    seeAllLabel: "Zobacz wszystkie aktualności",
    seeAllHref: subcategoryPage.blog.seeAllHref,
    articles: subcategoryPage.blog.articles,
  },
  newsletter: {
    eyebrow: "Newsletter",
    title: "Bądź na bieżąco z materiałami i wydarzeniami dla architektów",
    description:
      "Nowe materiały projektowe, premiery, szkolenia i zaproszenia z salonów ELEMENTS.",
    image: {
      src: assetUrl("home/partners-architects.jpg"),
      alt: "Architekt przy pracy - materiały projektowe i współpraca z Elements",
    },
  },
  faq: {
    id: "faq",
    eyebrow: "Najczęstsze pytania",
    title: "Wszystko jasne?",
    items: [
      {
        id: "faq-start",
        question: "Jak rozpocząć współpracę z ELEMENTS?",
        answer:
          "Wybierz najbliższy salon i skontaktuj się z opiekunem architekta. Omówicie projekt, zakres wsparcia i kolejne kroki.",
      },
      {
        id: "faq-studio",
        question: "Czy współpraca jest przeznaczona tylko dla dużych pracowni?",
        answer:
          "Nie. Współpracujemy zarówno z niezależnymi projektantami, jak i z większymi biurami. Zakres wsparcia dopasowujemy do projektu.",
      },
      {
        id: "faq-client",
        question: "Czy mogę spotkać się z klientem w salonie?",
        answer:
          "Tak. Możesz umówić spotkanie z klientem, obejrzeć ekspozycje i porównać materiały z pomocą opiekuna.",
      },
      {
        id: "faq-quote",
        question: "Czy ELEMENTS przygotuje wycenę całego projektu?",
        answer:
          "Opiekun skoordynuje wycenę wyposażenia z oferty ELEMENTS, sprawdzi dostępność produktów oraz pomoże zaplanować zamówienie i dostawę.",
      },
      {
        id: "faq-files",
        question: "Gdzie znajdę modele 3D i pliki techniczne?",
        answer:
          "W bazie materiałów projektowych. Znajdziesz tam modele 3D, pliki CAD i DWG, tekstury, karty techniczne, deklaracje oraz certyfikaty.",
      },
    ],
  },
  advisor: {
    id: "wspolpraca",
    eyebrow: "Współpraca",
    title: "Masz projekt? Zrealizujmy go razem.",
    description:
      "Wybierz salon i porozmawiaj z opiekunem, który pomoże dobrać rozwiązania, przygotować wycenę i przeprowadzić realizację.",
    askLabel: "Rozpocznij współpracę",
    bookLabel: "Umów spotkanie",
    askDrawerTitle: "Rozpocznij współpracę",
    askDrawerDescription:
      "Zostaw kontakt - opiekun architekta odezwie się w 1 dzień roboczy.",
    image: ctaContextImages.advisorConsultation,
  },
} as const;
