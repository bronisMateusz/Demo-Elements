import { assetUrl } from "../app/assets";
import { ctaContextImages } from "../lib/ctaContextImages";
import type { PdpSubnavItem } from "../constants/pdpSubnav";
import { inspirationCarouselArrangements } from "./inspirationCarousel";
import { subcategoryPage } from "./subcategory";

export const architectZoneSubnavItems: PdpSubnavItem[] = [
  { id: "opiekunowie", label: "Opiekunowie architektów" },
  { id: "korzysci", label: "Korzyści" },
  { id: "inspiracje", label: "Inspiracje" },
  { id: "proces", label: "Proces współpracy" },
  { id: "pliki", label: "Pliki do pobrania" },
  { id: "aktualnosci", label: "Aktualności" },
];

export const architectZonePage = {
  title: "Strefa Architekta",
  metaDescription:
    "Pełna oferta wiodących marek, materiały do projektu, dedykowany opiekun i 19 salonów z przestrzenią do spotkań z Twoim klientem.",
  breadcrumbs: [
    { label: "Strona główna", to: "/" },
    { label: "Strefa architekta", current: true },
  ],
  hero: {
    title: "Strefa Architekta",
    lead: "Pełna oferta wiodących marek, materiały do projektu, dedykowany opiekun i 19 salonów z przestrzenią do spotkań z Twoim klientem. Wszystko w jednym miejscu.",
    askLabel: "Rozpocznij współpracę",
    productsLabel: "Pliki do pobrania",
    productsHref: "#pliki",
    image: {
      src: assetUrl("home/partners-architects.jpg"),
      alt: "Architekt w salonie Elements - strefa pracy z próbkami",
      fit: "cover" as const,
      focalPoint: { x: 55, y: 22 },
    },
  },
  guardian: {
    id: "opiekunowie",
    title: "Twój opiekun architekta",
    lead: "Każdy z 19 salonów Elements ma dedykowanego opiekuna architekta.",
    selectLabel: "Wybierz salon",
    selectPlaceholder: "Wskaż salon Elements…",
    emptyTitle:
      "Wybierz salon, aby zobaczyć dane kontaktowe opiekuna architekta.",
    contactNote:
      "Twój bezpośredni kontakt w tym salonie. Odezwij się od razu - telefonicznie lub mailowo. Odpowiadamy w 1 dzień roboczy.",
    contact: {
      name: "Anna Kowalska",
      role: "Opiekun architekta",
      phone: "+48 510 023 038",
      phoneHref: "tel:+48510023038",
      email: "architekci@elements-show.pl",
      emailHref: "mailto:architekci@elements-show.pl",
    },
  },
  benefits: {
    id: "korzysci",
    title: "Co zyskujesz, współpracując z Elements",
    items: [
      {
        iconClass: "ph ph-user-circle",
        title: "Dedykowany opiekun architekta",
        text: "Jedna osoba prowadzi Twoje projekty od zapytania po realizację.",
      },
      {
        iconClass: "ph ph-buildings",
        title: "Komplet marek premium",
        text: "Villeroy & Boch, Geberit, Duravit, Hansgrohe, Grohe, Roca, Laufen, Kaldewei, Marazzi, Tubądzin i inne.",
      },
      {
        iconClass: "ph ph-folder-open",
        title: "Materiały do projektu",
        text: "Modele 3D, pliki CAD/DWG, tekstury, karty techniczne i katalogi - pod ręką.",
      },
      {
        iconClass: "ph ph-storefront",
        title: "19 salonów z przestrzenią do spotkań",
        text: "Zaproś klienta, pokażcie ofertę przy dobrej kawie, dobierzcie rozwiązania na żywo.",
      },
      {
        iconClass: "ph ph-squares-four",
        title: "Próbki i wzorniki",
        text: "Dostęp do próbek płytek, armatury i materiałów - także z dostawą na miejsce inwestycji.",
      },
      {
        iconClass: "ph ph-airplane-tilt",
        title: "Szkolenia i „Elements w Podróży”",
        text: "Bądź na bieżąco z trendami i markami - wydarzenia, szkolenia i wyjazdy.",
      },
    ],
  },
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
  loyalty: {
    eyebrow: "Program partnerski",
    title: "Korzystny system prowizyjny i program lojalnościowy",
    description:
      "Oferujemy atrakcyjny system prowizyjny oraz program lojalnościowy „Elements w Podróży”, które pozwalają zwiększyć zyski z realizowanych projektów. Doceniamy długofalowe relacje i nagradzamy zaangażowanie.",
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
  process: {
    id: "proces",
    title: "Jak wygląda współpraca",
    items: [
      {
        iconClass: "ph ph-coffee",
        title: "Spotkanie",
        text: "Wypełnij formularz kontaktowy i umów się na spotkanie z Doradcą Architekta. Przy filiżance kawy porozmawiamy o potrzebach Twoich projektów i możliwościach współpracy.",
      },
      {
        iconClass: "ph ph-pencil-ruler",
        title: "Projekt",
        text: "Wykorzystuj zasoby z naszej bazy w swoich projektach - jeśli potrzebujesz dodatkowych materiałów, zorganizujemy je we współpracy z producentami.",
      },
      {
        iconClass: "ph ph-presentation-chart",
        title: "Ekspozycja",
        text: "Zaproś do nas swoich klientów, a my przedstawimy im ofertę produktów, po czym wspólnie wybierzemy idealne rozwiązanie.",
      },
      {
        iconClass: "ph ph-truck",
        title: "Realizacja",
        text: "Realizujemy zamówienie Twoich klientów zawsze zgodnie z Twoimi wytycznymi i dostarczamy je do miejsca inwestycji.",
      },
    ],
  },
  downloads: {
    id: "pliki",
    title: "Chmura architekta ELEMENTS",
    description:
      "Dla wybranych produktów dostępnych tylko w Salonach Elements udostępniamy bazę modeli CAD. Dołącz do grona architektów korzystających z zasobów 3D i przyspiesz swoją pracę dzięki naszym plikom.",
    catalogCta: {
      slogan: ["Katalogi i materiały", "do Twojego projektu"] as const,
      title: "Zobacz pełną bazę katalogów",
      description:
        "Foldery producentów, karty techniczne, deklaracje i certyfikaty - w jednym miejscu online. Pobieraj to, czego potrzebujesz do pracy z klientem.",
      ctaLabel: "Przejdź do bazy",
      href: "https://www.elements-show.pl/do-pobrania",
      image: {
        src: assetUrl("home/architect-catalog-cta.jpg"),
        alt: "Architekt omawia plan domu z klientem nad rzutami",
        fit: "cover" as const,
        focalPoint: { x: 50, y: 55 },
      },
    },
  },
  blog: {
    id: "aktualnosci",
    title: "Aktualności i wydarzenia dla architektów",
    seeAllLabel: subcategoryPage.blog.seeAllLabel,
    seeAllHref: subcategoryPage.blog.seeAllHref,
    articles: subcategoryPage.blog.articles,
  },
  newsletter: {
    eyebrow: "Newsletter",
    title: "Newsletter dla architektów",
    description:
      "Premiery marek, zaproszenia na szkolenia i wyjazdy „Elements w Podróży” oraz nowe materiały do projektu - prosto na Twój e-mail.",
    image: {
      src: assetUrl("home/partners-architects.jpg"),
      alt: "Architekt przy pracy - materiały projektowe i współpraca z Elements",
    },
  },
  advisor: {
    id: "wspolpraca",
    eyebrow: "Współpraca",
    title: "Rozpocznij współpracę z Elements",
    description:
      "Wypełnij formularz - opiekun architekta odezwie się i ustali szczegóły współpracy.",
    askLabel: "Rozpocznij współpracę",
    bookLabel: "Umów spotkanie",
    image: ctaContextImages.advisorConsultation,
  },
} as const;
