import { assetUrl } from "../app/assets";
import { ctaContextImages } from "../lib/ctaContextImages";
import type { PdpSubnavItem } from "../constants/pdpSubnav";
import { inspirationCarouselArrangements } from "./inspirationCarousel";
import { subcategoryPage } from "./subcategory";

export const architectZoneSubnavItems: PdpSubnavItem[] = [
  { id: "korzysci", label: "Korzyści" },
  { id: "proces", label: "Proces współpracy" },
  { id: "opiekunowie", label: "Opiekunowie architektów" },
  { id: "aktualnosci", label: "Aktualności" },
];

export const architectZonePage = {
  title: "Strefa Architekta",
  metaDescription:
    "Showroomy, szeroka oferta marek, dedykowani opiekunowie i wsparcie na każdym etapie projektu.",
  breadcrumbs: [
    { label: "Strona główna", to: "/" },
    { label: "Strefa architekta", current: true },
  ],
  hero: {
    eyebrow: "Strefa Architekta Elements",
    title: "Projektujesz wnętrza? Zrealizuj je z ELEMENTS",
    lead: "Showroomy, szeroka oferta marek, dedykowani opiekunowie i wsparcie na każdym etapie projektu.",
    askLabel: "Poznaj korzyści współpracy",
    askHref: "#korzysci",
    productsLabel: "Pobierz materiały projektowe",
    productsHref: "/pliki-do-pobrania",
    gallery: {
      columnOne: [
        {
          src: assetUrl("home/partners-architects.jpg"),
          alt: "Architekt w salonie Elements",
          fit: "cover" as const,
          focalPoint: { x: 55, y: 22 },
        },
        {
          src: assetUrl("home/architect-loyalty.jpg"),
          alt: "Praca nad projektem łazienki",
          fit: "cover" as const,
          focalPoint: { x: 50, y: 45 },
        },
      ],
      columnTwo: [
        {
          src: assetUrl("home/about-salon.png"),
          alt: "Rozmowa z doradcą w salonie",
          fit: "cover" as const,
          focalPoint: { x: 50, y: 40 },
        },
        {
          src: assetUrl("home/advisor-consultation.jpg"),
          alt: "Konsultacja projektu łazienki",
          fit: "cover" as const,
          focalPoint: { x: 50, y: 45 },
        },
        {
          src: assetUrl("salon/expo/bydgoszcz-4.png"),
          alt: "Ekspozycja w salonie Elements",
          fit: "cover" as const,
          focalPoint: { x: 50, y: 45 },
        },
      ],
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
    title: "Co zyskujesz, współpracując z Elements?",
    items: [
      {
        title: "Możliwość spotykania się z klientami w naszej przestrzeni",
        text: "19 salonów Elements, w których pokażesz klientowi produkty i materiały na żywo",
        image: {
          src: assetUrl("architect/salon-elements-warszawa-02.webp"),
          alt: "Ekspozycja salonu Elements Warszawa",
          fit: "cover" as const,
          focalPoint: { x: 50, y: 45 },
        },
      },
      {
        title: "Szeroki wybór produktów i marek premium",
        text: "Wszystko, czego szukasz w jednym miejscu - bez krążenia między dostawcami",
        logos: [
          {
            label: "Villeroy&Boch",
            logoSrc: assetUrl("brands/villeroy-boch.svg"),
          },
          { label: "Geberit", logoSrc: assetUrl("brands/geberit.svg") },
          { label: "Duravit", logoSrc: assetUrl("brands/duravit.svg") },
          { label: "Hansgrohe", logoSrc: assetUrl("brands/hansgrohe.svg") },
          { label: "Grohe", logoSrc: assetUrl("brands/grohe.svg") },
          { label: "Roca", logoSrc: assetUrl("brands/roca.svg") },
          { label: "Marazzi", logoSrc: assetUrl("brands/marazzi.svg") },
          { label: "Tubądzin", logoSrc: assetUrl("brands/tubadzin.png") },
          { label: "Oristo", logoSrc: assetUrl("brands/oristo.svg") },
          { label: "Omnires", logoSrc: assetUrl("brands/omnires.svg") },
          {
            label: "Ideal Standard",
            logoSrc: assetUrl("brands/ideal-standard.svg"),
          },
          { label: "Excellent", logoSrc: assetUrl("brands/excellent.svg") },
        ],
      },
      {
        title: "Próbki materiałów i pliki 3D/CAD",
        text: "Wzorniki, modele i tekstury w preferowanym formacie",
        arcStack: [
          {
            src: assetUrl("architect/samples/trinnity-gres.webp"),
            alt: "Płytki Trinnity gres",
            fit: "cover" as const,
            zoom: 0.95,
          },
          {
            src: assetUrl("architect/samples/trinnity-bateria.webp"),
            alt: "Bateria zlewozmywakowa Trinnity",
            fit: "cover" as const,
            zoom: 0.92,
          },
          {
            src: assetUrl("architect/samples/trinnity-odplyw.jpg"),
            alt: "Odpływ Trinnity",
            fit: "cover" as const,
            zoom: 1.12,
          },
          {
            src: assetUrl("architect/samples/trinnity-plytka.png"),
            alt: "Płytka Trinnity",
            fit: "cover" as const,
            zoom: 1.15,
          },
          {
            src: assetUrl("architect/samples/lorros.jpg"),
            alt: "Produkt Lorros",
            fit: "cover" as const,
            zoom: 1.85,
          },
          {
            src: assetUrl("architect/samples/nobili.png"),
            alt: "Produkt Nobili",
            fit: "cover" as const,
            zoom: 1.75,
          },
          {
            src: assetUrl("architect/samples/manzoni.png"),
            alt: "Produkt Manzoni",
            fit: "cover" as const,
            zoom: 1.3,
          },
        ],
      },
      {
        title: "Wsparcie na miejscu",
        text: "Nasi specjaliści pomogą Ci w doborze produktów i rozwiązań pasujących do projektu",
        image: ctaContextImages.washbasin,
        video: "video/architect-cta.mp4",
      },
      {
        title: "Kontakt z opiekunem architektów",
        text: "W każdym salonie znajdziesz dedykowanego opiekuna współpracy z architektami",
        image: ctaContextImages.advisorConsultation,
      },
      {
        title: "Wsparcie przy realizacji",
        text: "Nie kończymy naszej pomocy na wycenie - możemy pomóc także w dostawie i podczas realizacji",
        overlapPhotos: {
          back: {
            src: assetUrl("architect/o-elements-blok.webp"),
            alt: "Zespół Elements przy projekcie",
            fit: "cover" as const,
            focalPoint: { x: 50, y: 40 },
          },
          front: {
            src: assetUrl("architect/delivery-support.jpg"),
            alt: "Dostawa i realizacja zamówienia",
            fit: "cover" as const,
            focalPoint: { x: 50, y: 45 },
          },
        },
      },
    ],
  },
  extraBenefits: {
    eyebrow: "Dodatkowe korzyści",
    title: "A ponadto otrzymasz dostęp do:",
    items: [
      {
        iconClass: "ph ph-hand-coins",
        title: "Programu prowizyjnego",
        text: "Wynagrodzenie za projekty zrealizowane z Elements.",
      },
      {
        iconClass: "ph ph-airplane-tilt",
        title: "Programu „Elements w Podróży”",
        text: "Wyjazdy i nagrody za długofalową współpracę.",
      },
      {
        iconClass: "ph ph-megaphone",
        title: "Możliwości promowania projektów",
        text: "W dziale Inspiracje - dodatkowa ekspozycja i źródło nowych klientów.",
      },
      {
        iconClass: "ph ph-chalkboard-teacher",
        title: "Szkoleń i wydarzeń specjalnych",
        text: "Premiery marek, warsztaty produktowe, spotkania branżowe.",
      },
      {
        iconClass: "ph ph-envelope-simple",
        title: "Newslettera dla architektów",
        text: "Nowości i zaproszenia na wydarzenia prosto na e-mail.",
      },
      {
        iconClass: "ph ph-books",
        title: "Dodatkowych materiałów",
        text: "Katalogi i inne narzędzia pomocne we współpracy z klientami.",
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
    eyebrow: "Proces współpracy",
    title: "Jak wygląda współpraca z Elements na co dzień?",
    items: [
      {
        title: "Poznajmy Twój projekt",
        text: "Opowiedz o potrzebach klienta i wybierz opiekuna.",
      },
      {
        title: "Dobierz produkty",
        text: "Skorzystaj z próbek, ekspozycji, katalogów i wsparcia technicznego.",
      },
      {
        title: "Pokaż rozwiązania klientowi",
        text: "Spotkajcie się w salonie i porównajcie materiały na żywo.",
      },
      {
        title: "Zrealizuj projekt",
        text: "Elements zajmie się wyceną, zamówieniem i dostawą na miejsce.",
      },
    ],
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
    askDrawerTitle: "Rozpocznij współpracę",
    askDrawerDescription:
      "Zostaw kontakt - opiekun architekta odezwie się w 1 dzień roboczy.",
    image: ctaContextImages.advisorConsultation,
  },
} as const;
