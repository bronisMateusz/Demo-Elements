import { assetUrl } from "../app/assets";
import { homeInspiration } from "./home";
import type { PdpSubnavItem } from "../constants/pdpSubnav";

export const salonSubnavItems: PdpSubnavItem[] = [
  { id: "o-salonie", label: "O salonie" },
  { id: "marki", label: "Marki" },
  { id: "wystawa", label: "Ekspozycja" },
  { id: "aktualnosci", label: "Aktualności" },
  { id: "warto-zobaczyc", label: "Warto zobaczyć" },
];

export const salonPage = {
  title: "Salon łazienek Elements Bydgoszcz",
  metaDescription:
    "Salon łazienek Elements w Bydgoszczy - ekspozycja, doradztwo i umówienie wizyty.",
  breadcrumbs: [
    { label: "Strona główna", to: "/" },
    { label: "Salony", to: "/salony" },
    { label: "Bydgoszcz", current: true },
  ],
  hero: {
    titleLead: "Salon łazienek",
    titleStrong: "Elements Bydgoszcz",
    address: "ul. Hermana Frankego 1, Bydgoszcz",
    hours: [
      { days: "PN - PT", time: "08:30 - 17:00" },
      { days: "SOB", time: "09:00 - 14:00" },
    ],
    bookLabel: "Umów spotkanie",
    directionsLabel: "Jak dojechać",
    email: "bydgoszcz@elements-show.pl",
    emailHref: "mailto:bydgoszcz@elements-show.pl",
    phoneGroups: [
      {
        label: "Przygotowanie oferty, doradztwo techniczne",
        phones: [
          { label: "+48 523 269 626", href: "tel:+48523269626" },
          { label: "+48 797 903 529", href: "tel:+48797903529" },
          { label: "+48 523 269 621", href: "tel:+48523269621" },
          { label: "+48 523 269 648", href: "tel:+48523269648" },
        ],
      },
      {
        label: "Wsparcie techniczne dla projektantów i architektów",
        phones: [{ label: "+48 510 023 038", href: "tel:+48510023038" }],
      },
    ],
    image: {
      src: assetUrl("salon/bydgoszcz-hero_upscayl_2x_upscayl-standard-4x.png"),
      alt: "Salon Elements Bydgoszcz - ekspozycja showroomu",
      fit: "cover" as const,
      focalPoint: { x: 50, y: 45 },
    },
  },
  usps: {
    title: "Dlaczego warto wybrać salon Bydgoszcz",
    items: [
      {
        iconClass: "ph ph-cube",
        title: "Najlepsza dostępność towaru w Polsce",
      },
      {
        iconClass: "ph ph-storefront",
        title: "Odbiór w salonie lub dostawa do domu",
      },
      {
        iconClass: "ph ph-pencil-line",
        title: "Zaprojektujesz łazienkę z profesjonalnym projektantem",
        cta: { label: "Więcej", href: "#projektowanie" },
      },
      {
        iconClass: "ph ph-truck",
        title: "Darmowa dostawa na terenie woj. kujawsko-pomorskiego",
      },
    ],
  },
  about: {
    id: "o-salonie",
    eyebrow: "O salonie",
    title:
      "Elements Bydgoszcz - miejsce, gdzie estetyka spotyka się z jakością",
    lead: "Salon łazienek Elements w Bydgoszczy to miejsce stworzone z myślą o profesjonalistach i osobach poszukujących wyjątkowych, kompleksowych rozwiązań do wnętrz. Na ekspozycji prezentujemy starannie dobraną ofertę armatury, ceramiki sanitarnej, wanien, brodzików, mebli łazienkowych oraz szeroki wybór płytek - w tym kolekcje od topowych marek takich jak GRESPANIA, MARAZZI, CAESAR, TUBĄDZIN czy VIGOUR.",
    paragraphs: [
      "Nasz showroom premium to przestrzeń inspiracji - znajdziesz tu najnowsze trendy w aranżacji łazienek. Prezentujemy różne style - od nowoczesnych, przez minimalistyczne i industrialne, aż po klasyczne czy rustykalne. Wszystkie produkty łączą estetykę z funkcjonalnością.",
      "Oferujemy również kompleksowe wsparcie projektowe, jak również profesjonalne doradztwo w wyborze materiałów. Na miejscu skorzystasz z konsultacji z doświadczonymi doradcami oraz projektantami. Dzięki wizualizacjom 3D możesz zobaczyć swoją łazienkę zanim przystąpisz do realizacji. Dla projektantów i architektów przygotowaliśmy dodatkowe udogodnienia, w tym katalogi, próbki i wsparcie w przygotowaniu projektów pod konkretnego klienta.",
      "Salon zlokalizowany jest przy ul. Hermana Frankego 1, na parterze - z łatwym dostępem również dla osób z niepełnosprawnościami. Na miejscu zapoznasz się z pełną ofertą oraz aktualnymi kolekcjami.",
    ],
    closing:
      "Zapraszamy do Elements Bydgoszcz - miejsca, gdzie estetyka spotyka się z jakością, a pomysły z profesjonalnym wsparciem w ich realizacji. Postaw na innowacyjne rozwiązania dla każdej przestrzeni.",
  },
  stats: {
    id: "dlaczego-warto",
    title: "Dlaczego warto nas odwiedzić",
    lead: "Zobacz skalę naszej ekspozycji i dostępne wsparcie - zanim podejmiesz decyzję.",
    items: [
      { value: 800, suffix: "m²", label: "wyjątkowej ekspozycji na żywo" },
      { value: 6, label: "doradców na miejscu, gotowych do obsługi" },
      { value: 20, label: "zaaranżowanych boksów pokazowych" },
    ],
  },
  brands: {
    title: "Renomowani producenci w jednym miejscu",
    description: "W naszym salonie obejrzysz produkty m.in. takich marek jak:",
  },
  expo: {
    id: "wystawa",
    title: "Zobacz naszą ekspozycję",
    lead: "Tak wygląda salon Bydgoszcz - przyjdź i zobacz materiały, kolory i faktury na żywo.",
    images: Array.from({ length: 14 }, (_, index) => {
      const n = index + 1;
      return {
        id: `expo-${n}`,
        src: assetUrl(`salon/expo/bydgoszcz-${n}.png`),
        alt: `Salon Łazienek Elements Bydgoszcz - ekspozycja ${n}`,
        fit: "cover" as const,
      };
    }),
  },
  news: {
    id: "aktualnosci",
    title: "Aktualności salonu Bydgoszcz",
    items: [
      {
        id: "news-1",
        date: "15.07.2026",
        title: "Najlepsze produkty w super cenach!",
        excerpt: "Sprawdź ofertę produktową salonu Elements!",
        href: "https://www.elements-show.pl/salony/aktualnosci/najlepsze-produkty-w-super-cenach",
        image: {
          src: assetUrl("salon/news/news-01.png"),
          alt: "super oferta top trendy",
          fit: "cover" as const,
        },
      },
      {
        id: "news-2",
        date: "19.01.2026",
        title: "10-lecie salonów ELEMENTS",
        excerpt:
          "Dekadę temu zaczęliśmy budować w Polsce sieć salonów, które miały ułatwiać tworzenie wymarzonych wnętrz.",
        href: "https://www.elements-show.pl/salony/aktualnosci/10-lecie-salonow-elements",
        image: {
          src: assetUrl("salon/news/news-02.png"),
          alt: "10-lecie ELEMENTS",
          fit: "cover" as const,
        },
      },
      {
        id: "news-3",
        date: "16.12.2025",
        title: "ACQUABELLA na wyłączność - brodziki, wanny, panele",
        excerpt:
          "Produkty ACQUABELLA - wanny, brodziki i przyciągające wzrok panele.",
        href: "https://www.elements-show.pl/salony/aktualnosci/acquabella-na-wylacznosc-brodziki-wanny-panele",
        image: {
          src: assetUrl("salon/news/news-03.png"),
          alt: "wanny",
          fit: "cover" as const,
        },
      },
      {
        id: "news-4",
        date: "16.12.2025",
        title: "Kabiny Ophalis i Etna od RONAL na wyłączność w Elements",
        excerpt:
          "Kabiny prysznicowe Ophalis i Etna od RONAL to synonim niezawodności i luksusowej estetyki.",
        href: "https://www.elements-show.pl/salony/aktualnosci/kabiny-ophalis-i-etna-od-ronal-na-wylacznosc-w-elements",
        image: {
          src: assetUrl("salon/news/news-04.png"),
          alt: "kabiny",
          fit: "cover" as const,
        },
      },
      {
        id: "news-5",
        date: "16.12.2025",
        title: "Bateria Motivo od Valvex - na wyłączność w salonach Elements",
        excerpt:
          "Baterie MOTIVO od VALVEX to kolekcja, która pozwala na nieograniczoną personalizację.",
        href: "https://www.elements-show.pl/salony/aktualnosci/bateria-motivo-od-valvex-na-wylacznosc-w-salonach-elements",
        image: {
          src: assetUrl("salon/news/news-05.png"),
          alt: "motivo",
          fit: "cover" as const,
        },
      },
      {
        id: "news-6",
        date: "15.12.2025",
        title: "Wyjątkowy luksus i komfort - toaleta myjąca EMPORA 2.0",
        excerpt: "Toaleta myjąca EMPORA 2.0 to synonim higieny i wygody.",
        href: "https://www.elements-show.pl/bydgoszcz/aktualnosci/wyjatkowy-luksus-i-komfort-toaleta-myjaca-empora-20",
        image: {
          src: assetUrl("salon/news/news-06.png"),
          alt: "empora 2-0",
          fit: "cover" as const,
        },
      },
      {
        id: "news-7",
        date: "15.12.2025",
        title:
          "Miski WC EMPORA 2.0 - na wyłączność w salonach łazienek Elements",
        excerpt:
          "Seria misek WC EMPORA 2.0 od Villeroy & Boch to synonim komfortu i bezkompromisowej czystości.",
        href: "https://www.elements-show.pl/salony/aktualnosci/miski-wc-empora-20-na-wylacznosc-w-salonach-lazienek-elements",
        image: {
          src: assetUrl("salon/news/news-07.png"),
          alt: "empora",
          fit: "cover" as const,
        },
      },
      {
        id: "news-8",
        date: "20.11.2025",
        title: "OUTLET w salonach ELEMENTS!",
        excerpt:
          "W salonach ELEMENTS właśnie ruszyła unikatowa oferta typu OUTLET. To świetna okazja, aby kupić pełnowartościowe, nowe produkty w wyjątkowo atrakcyjnych cenach.",
        href: "https://www.elements-show.pl/salony/aktualnosci/outlet-w-salonach-elements",
        image: {
          src: assetUrl("salon/news/news-08.png"),
          alt: "outlet",
          fit: "cover" as const,
        },
      },
      {
        id: "news-9",
        date: "13.10.2025",
        title: "Zyskaj zwrot gotówki z kolekcją CALUNA i Geberit!",
        excerpt:
          "Wystartowała nowa promocja cashback, w której możesz otrzymać zwrot pieniędzy na swoje konto za zakup zestawu WC z kolekcji Geberit CALUNA. To doskonała okazja, aby odświeżyć swoją łazienkę i przy tym zyskać dodatkowe korzyści finansowe.",
        href: "https://www.elements-show.pl/salony/aktualnosci/zyskaj-zwrot-gotowki-z-kolekcja-caluna-i-geberit",
        image: {
          src: assetUrl("salon/news/news-09.png"),
          alt: "promocja-geberit-caluna",
          fit: "cover" as const,
        },
      },
      {
        id: "news-10",
        date: "10.10.2025",
        title: "Nowa seria mebli MELLOW",
        excerpt:
          "Seria wyróżnia się minimalistycznym designem, wysoką jakością wykonania oraz możliwościami personalizacji.",
        href: "https://www.elements-show.pl/salony/aktualnosci/nowa-seria-mebli-mellow",
        image: {
          src: assetUrl("salon/news/news-10.png"),
          alt: "mellow",
          fit: "cover" as const,
        },
      },
      {
        id: "news-11",
        date: "08.10.2025",
        title: "Kolekcja CALUNA na wyłączność w ELEMENTS",
        excerpt: "Sprawdź ofertę produktów CALUNA w salonie Elements",
        href: "https://www.elements-show.pl/salony/aktualnosci/kolekcja-caluna-na-wylacznosc-w-elements",
        image: {
          src: assetUrl("salon/news/news-11.png"),
          alt: "caluna",
          fit: "cover" as const,
        },
      },
      {
        id: "news-12",
        date: "22.01.2025",
        title: "Toaleta myjąca GROHE SENSIA PRO",
        excerpt:
          "Toaleta myjąca Sensia Pro do montażu z podtynkowym systemem spłukującym.",
        href: "https://www.elements-show.pl/salony/aktualnosci/toaleta-myjaca-grohe-sensia-pro",
        image: {
          src: assetUrl("salon/news/news-12.png"),
          alt: "toaleta myjąca",
          fit: "cover" as const,
        },
      },
      {
        id: "news-13",
        date: "26.08.2024",
        title:
          "Toalety myjące Geberit Aqua Clean Alba: funkcjonalność i design na najwyższym poziomie",
        excerpt:
          "Korzystanie z toalet myjących Geberit Aqua Clean zapewnia czystość i świeżość przez cały dzień. W tym roku seria została uzupełniona o kolejne produkty, które czynią dbałość o higienę intymną jeszcze łatwiejszą i przyjemniejszą.",
        href: "https://www.elements-show.pl/salony/aktualnosci/toalety-myjace-geberit-aqua-clean-alba-funkcjonalnosc-i-design-na-najwyzszym",
        image: {
          src: assetUrl("salon/news/news-13.png"),
          alt: "toaleta myjąca geberit",
          fit: "cover" as const,
        },
      },
      {
        id: "news-14",
        date: "06.07.2023",
        title: "GEBERIT Aquaclean: montaż gratis i wydłużona gwarancja!",
        excerpt:
          "Dowiedz się jak uzyskać montaż gratis i jak bezpłatnie przedłużyć o rok gwarancję producenta.",
        href: "https://www.elements-show.pl/salony/aktualnosci/geberit-aquaclean-montaz-gratis-i-wydluzona-gwarancja",
        image: {
          src: assetUrl("salon/news/news-14.png"),
          alt: "Toaleta myjąca GEBERIT Aquaclean",
          fit: "cover" as const,
        },
      },
      {
        id: "news-15",
        date: "22.06.2023",
        title: "Już jest! Nowa odsłona wanny XEA",
        excerpt:
          "Poznaj nową czarną wannę XEA - to wyjątkowa dbałość o detale zarówno w aspekcie wizualnym, jak i funkcjonalnym",
        href: "https://www.elements-show.pl/salony/aktualnosci/czarna-wanna-xea",
        image: {
          src: assetUrl("salon/news/news-15.png"),
          alt: "Czarna Wanna Geometryczna XEA",
          fit: "cover" as const,
        },
      },
      {
        id: "news-16",
        date: "30.08.2022",
        title:
          "IDEALNA HARMONIA W ŁAZIENCE - poznaj dodatki AddStoris marki Hansgrohe.",
        excerpt:
          "Nowa linia akcesoriów AddStoris marki Hansgrohe ze zróżnicowanymi produktami o nowoczesnym, minimalistycznym wzornictwie.",
        href: "https://www.elements-show.pl/salony/aktualnosci/idealna-harmonia-w-lazience-poznaj-dodatki-addstoris-marki-hansgrohe",
        image: {
          src: assetUrl("salon/news/news-16.png"),
          alt: "dodatki hangrohe",
          fit: "cover" as const,
        },
      },
      {
        id: "news-17",
        date: "20.07.2022",
        title: "Nowości w ofercie przycisków do WC Trinnity",
        excerpt:
          "Najnowsze modele przycisków do montażu z wybranym stelażem Trinnity są już dostępna w naszych salonach. Modna ponadczasowa czerń oraz spieki odwzorowujące naturalny kamień to najnowsze propozycje w seriach M08 oraz M11",
        href: "https://www.elements-show.pl/salony/aktualnosci/nowosci-w-ofercie-przyciskow-do-wc-trinnity",
        image: {
          src: assetUrl("salon/news/news-17.png"),
          alt: "Nowości w ofercie przycisków do WC Trinnity",
          fit: "cover" as const,
        },
      },
      {
        id: "news-18",
        date: "20.07.2022",
        title: "Nowe dodatki z serii Vogue i Individual",
        excerpt:
          "Do linii dodatków marki VIGOUR dołączyły najnowsze propozycje koszyków i akcesoriów z serii individual oraz vogue.",
        href: "https://www.elements-show.pl/salony/aktualnosci/nowe-dodatki-z-serii-vogue-i-individual",
        image: {
          src: assetUrl("salon/news/news-18.png"),
          alt: "Nowe dodatki z serii Vogue i Individual",
          fit: "cover" as const,
        },
      },
      {
        id: "news-19",
        date: "20.07.2022",
        title: "NOWOŚĆ! Wanna XEA dostępna wyłącznie w salonach ELements",
        excerpt:
          "Poznaj nową wannę XEA - to wyjątkowa dbałość o detale zarówno w aspekcie wizualnym, jak i funkcjonalnym",
        href: "https://www.elements-show.pl/salony/aktualnosci/nowosc-wanna-xea-dostepna-wylacznie-w-salonach-elements",
        image: {
          src: assetUrl("salon/news/news-19.png"),
          alt: "Wyjątkowa odsłona geometrii - poznaj nową wannę XEA",
          fit: "cover" as const,
        },
      },
      {
        id: "news-20",
        date: "12.05.2022",
        title: "Poznaj nasze nowości - wanna SanitaOne w nowej kolorystyce!",
        excerpt:
          "Już jest! Jedna z ulubionych wanien naszych klientów w dwóch zupełnie nowych odsłonach.",
        href: "https://www.elements-show.pl/salony/aktualnosci/poznaj-nasze-nowosci-wanna-sanitaone-w-nowej-kolorystyce",
        image: {
          src: assetUrl("salon/news/news-20.png"),
          alt: "Wanna wolnostojąca SanitaOne",
          fit: "cover" as const,
        },
      },
      {
        id: "news-21",
        date: "19.03.2020",
        title: "Zakres Usług Architekta Elements",
        excerpt:
          "Przedstawiamy zakres usług architektonicznych w naszym salonie.",
        href: "https://www.elements-show.pl/bydgoszcz/aktualnosci/zakres-uslug-architekta-elements",
        image: {
          src: assetUrl("salon/news/news-21.png"),
          alt: "dyżury",
          fit: "cover" as const,
        },
      },
    ],
  },
  inspiration: {
    id: "warto-zobaczyc",
    title: "Inspiracje, które warto zobaczyć",
    endCap: {
      title: "Więcej aranżacji w salonie",
      description:
        "Obejrzyj inspiracje na żywo i dobierz produkty z doradcą Elements.",
    },
    arrangements: [
      {
        ...homeInspiration.arrangements[0],
        id: "salon-insp-1",
        title: "Strefa SPA z wanną wolnostojącą",
      },
      {
        ...homeInspiration.arrangements[1],
        id: "salon-insp-2",
        title: "Trendy łazienkowe 2026 - czego szukać",
      },
      {
        ...homeInspiration.arrangements[2],
        id: "salon-insp-3",
        title: "Beton i czarna armatura",
      },
      {
        ...homeInspiration.arrangements[3],
        id: "salon-insp-4",
        title: "Mała łazienka do 4 m²",
      },
      {
        ...homeInspiration.arrangements[4],
        id: "salon-insp-5",
        title: "Elegancja w ciepłej palecie",
      },
      {
        ...homeInspiration.arrangements[5],
        id: "salon-insp-6",
        title: "Jak zaplanować oświetlenie łazienki",
      },
    ],
  },
  design: {
    id: "projektowanie",
    eyebrow: "Usługa projektowa",
    title: "Zaprojektuj łazienkę z doradcą Elements",
    description:
      "Od koncepcji i doboru produktów po wizualizację 3D - zobacz efekt, zanim cokolwiek kupisz. Bezpłatna konsultacja na start.",
    ctaLabel: "Dowiedz się więcej",
    ctaHref: "#",
    image: {
      src: assetUrl("home/about-salon.jpg"),
      alt: "Konsultacja projektowa w salonie Elements",
      focalPoint: { x: 50, y: 40 },
    },
    video: "video/architect-cta.mp4",
  },
  downloads: {
    title: "Formularze reklamacyjne",
    items: [
      {
        title: "Formularz reklamacyjny - Gwarancja",
        format: "PDF",
        size: "0,4 MB",
        href: "#",
      },
      {
        title: "Formularz reklamacyjny - Rękojmia",
        format: "PDF",
        size: "0,3 MB",
        href: "#",
      },
    ],
  },
  visit: {
    id: "wizyta",
    eyebrow: "Wizyta w salonie",
    title: "Zaplanuj wizytę w salonie Bydgoszcz",
    description:
      "Zostaw kontakt - doradca z salonu Bydgoszcz potwierdzi dogodny termin.",
    note: "Bezpłatna konsultacja · Bez zobowiązań",
    primaryLabel: "Umów spotkanie",
    secondaryLabel: "Napisz do doradcy",
    image: {
      src: assetUrl("home/about-salon.jpg"),
      alt: "Salon Elements Bydgoszcz - zaproszenie do wizyty",
      focalPoint: { x: 50, y: 40 },
    },
  },
} as const;
