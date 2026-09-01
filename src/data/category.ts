import { assetUrl } from "../app/assets";
import { ctaContextImages } from "../lib/ctaContextImages";

export type CategorySub = {
  label: string;
  href: string;
  image: {
    src: string;
    alt: string;
    fit?: "cover" | "contain";
  };
};

export type CategoryRow = {
  name: string;
  href: string;
  seeAllLabel: string;
  subs: CategorySub[];
  banner?: {
    eyebrow: string;
    title: string;
    description: string;
    href: string;
    label: string;
    image: {
      src: string;
      alt: string;
      fit?: "cover" | "contain";
      focalPoint?: { x: number; y: number };
    };
  };
  locateAfter?: boolean;
};

export const categoryPage = {
  title: "Łazienka",
  description:
    "Łazienka to jedno z najważniejszych pomieszczeń w domu - łączy funkcję użytkową z relaksem. Przejrzyj pełną ofertę wyposażenia w naszych kategoriach i dobierz produkty pasujące do Twojego stylu.",
  breadcrumbs: [
    { label: "Strona główna", to: "/" },
    { label: "Łazienka", current: true },
  ],
  locate: {
    slogan: ["Twoja nowa łazienka", "zaczyna się od spotkania"] as const,
    title: "Umów spotkanie w salonie",
    description:
      "Nasz doradca będzie czekał na Ciebie w salonie - pozna Twój projekt, pokaże produkty na żywo i pomoże dobrać całe wyposażenie. Bez pośpiechu, w dogodnym terminie.",
    ctaLabel: "Umów spotkanie",
    image: ctaContextImages.locateCta,
  },
  advisorCta: {
    eyebrow: "Doradztwo",
    title: "Nie wiesz, od czego zacząć?\nPorozmawiaj z doradcą.",
    description:
      "Napisz do nas online albo umów się na spotkanie w salonie - doradca pomoże dobrać całe wyposażenie Twojej łazienki.",
    image: ctaContextImages.advisorConsultation,
    primaryCta: { label: "Napisz do doradcy", href: "#kontakt" },
    secondaryCta: { label: "Umów spotkanie" },
  },
} as const;

export const categoryRows: CategoryRow[] = [
  {
    name: "Umywalki",
    href: "/podkategoria",
    seeAllLabel: "Zobacz wszystkie",
    subs: [
      {
        label: "Półpostumenty",
        href: "/podkategoria",
        image: {
          src: assetUrl("category/subs/polpostumenty.webp"),
          alt: "Półpostumenty",
          fit: "cover",
        },
      },
      {
        label: "Umywalki meblowe",
        href: "/podkategoria",
        image: {
          src: assetUrl("category/subs/umywalkimeblowe.webp"),
          alt: "Umywalki meblowe",
          fit: "cover",
        },
      },
      {
        label: "Umywalki nablatowe",
        href: "/podkategoria",
        image: {
          src: assetUrl("category/subs/umywalkinablatowe.webp"),
          alt: "Umywalki nablatowe",
          fit: "cover",
        },
      },
      {
        label: "Umywalki wiszące",
        href: "/listing",
        image: {
          src: assetUrl("category/subs/umywalkiwiszace.png"),
          alt: "Umywalki wiszące",
          fit: "cover",
        },
      },
      {
        label: "Umywalki z szafką",
        href: "/podkategoria",
        image: {
          src: assetUrl("category/subs/umywalkizszafka.webp"),
          alt: "Umywalki z szafką",
          fit: "cover",
        },
      },
    ],
    banner: {
      eyebrow: "Promocja",
      title: "Umywalki Duravit - do -25%",
      description: "Taki baner może zostać wstawiony po każdej z kategorii.",
      href: "/listing",
      label: "Zobacz ofertę",
      image: {
        src: assetUrl("category/subs/umywalkiwiszace.png"),
        alt: "Umywalki wiszące w aranżacji łazienki",
        fit: "cover",
      },
    },
  },
  {
    name: "Armatura",
    href: "#",
    seeAllLabel: "Zobacz wszystkie",
    subs: [
      {
        label: "Baterie bidetowe",
        href: "#",
        image: {
          src: assetUrl("category/subs/bateriebidetowe.webp"),
          alt: "Baterie bidetowe",
          fit: "cover",
        },
      },
      {
        label: "Baterie natryskowe",
        href: "#",
        image: {
          src: assetUrl("category/subs/baterienatryskowe.webp"),
          alt: "Baterie natryskowe",
          fit: "cover",
        },
      },
      {
        label: "Baterie termostatyczne",
        href: "#",
        image: {
          src: assetUrl("category/subs/baterietermostatyczne.webp"),
          alt: "Baterie termostatyczne",
          fit: "cover",
        },
      },
      {
        label: "Baterie umywalkowe",
        href: "#",
        image: {
          src: assetUrl("category/subs/baterieumywalkowe.webp"),
          alt: "Baterie umywalkowe",
          fit: "cover",
        },
      },
      {
        label: "Baterie wannowe",
        href: "#",
        image: {
          src: assetUrl("category/subs/bateriewannowe.webp"),
          alt: "Baterie wannowe",
          fit: "cover",
        },
      },
      {
        label: "Głowice natrysku",
        href: "#",
        image: {
          src: assetUrl("category/subs/glowicenatrysku.webp"),
          alt: "Głowice natrysku",
          fit: "cover",
        },
      },
      {
        label: "Systemy natryskowe",
        href: "#",
        image: {
          src: assetUrl("category/subs/systemynatryskowe.webp"),
          alt: "Systemy natryskowe",
          fit: "cover",
        },
      },
    ],
  },
  {
    name: "Toaleta",
    href: "#",
    seeAllLabel: "Zobacz wszystkie",
    subs: [
      {
        label: "Bidety",
        href: "#",
        image: {
          src: assetUrl("category/subs/bidety.webp"),
          alt: "Bidety",
          fit: "cover",
        },
      },
      {
        label: "Deski do misek WC",
        href: "#",
        image: {
          src: assetUrl("category/subs/deskidomisekwc.webp"),
          alt: "Deski do misek WC",
          fit: "cover",
        },
      },
      {
        label: "Deski i miski myjące",
        href: "#",
        image: {
          src: assetUrl("category/subs/deskiimiskimyjace.webp"),
          alt: "Deski i miski myjące",
          fit: "cover",
        },
      },
      {
        label: "Miski WC",
        href: "#",
        image: {
          src: assetUrl("category/subs/miskiwc.webp"),
          alt: "Miski WC",
          fit: "cover",
        },
      },
      {
        label: "Pisuary",
        href: "#",
        image: {
          src: assetUrl("category/subs/pisuary.webp"),
          alt: "Pisuary",
          fit: "cover",
        },
      },
      {
        label: "Przyciski spłukujące",
        href: "#",
        image: {
          src: assetUrl("category/subs/przyciskisplukujace.webp"),
          alt: "Przyciski spłukujące",
          fit: "cover",
        },
      },
      {
        label: "Toalety myjące",
        href: "#",
        image: {
          src: assetUrl("category/subs/toaletymyjace.webp"),
          alt: "Toalety myjące",
          fit: "cover",
        },
      },
    ],
  },
  {
    name: "Wanny",
    href: "#",
    seeAllLabel: "Zobacz wszystkie",
    subs: [
      {
        label: "Wanny geometryczne",
        href: "#",
        image: {
          src: assetUrl("category/subs/wannygeometryczne.webp"),
          alt: "Wanny geometryczne",
          fit: "cover",
        },
      },
      {
        label: "Wanny owalne",
        href: "#",
        image: {
          src: assetUrl("category/subs/wannyowalne.webp"),
          alt: "Wanny owalne",
          fit: "cover",
        },
      },
      {
        label: "Wanny prostokątne",
        href: "#",
        image: {
          src: assetUrl("category/subs/wannyprostokatne.webp"),
          alt: "Wanny prostokątne",
          fit: "cover",
        },
      },
      {
        label: "Wanny wolnostojące",
        href: "#",
        image: {
          src: assetUrl("category/subs/wannywolnostojace.webp"),
          alt: "Wanny wolnostojące",
          fit: "cover",
        },
      },
    ],
  },
  {
    name: "Brodziki",
    href: "#",
    seeAllLabel: "Zobacz wszystkie",
    subs: [
      {
        label: "Brodziki akrylowe",
        href: "#",
        image: {
          src: assetUrl("category/subs/brodzikiakrylowe.webp"),
          alt: "Brodziki akrylowe",
          fit: "cover",
        },
      },
      {
        label: "Brodziki konglomeratowe",
        href: "#",
        image: {
          src: assetUrl("category/subs/brodzikikonglomeratowe.webp"),
          alt: "Brodziki konglomeratowe",
          fit: "cover",
        },
      },
      {
        label: "Brodziki półokrągłe",
        href: "#",
        image: {
          src: assetUrl("category/subs/brodzikipolokragle.webp"),
          alt: "Brodziki półokrągłe",
          fit: "cover",
        },
      },
      {
        label: "Brodziki prostokątne i kwadratowe",
        href: "#",
        image: {
          src: assetUrl("category/subs/brodzikiprostokatneikwadratowe.webp"),
          alt: "Brodziki prostokątne i kwadratowe",
          fit: "cover",
        },
      },
    ],
  },
  {
    name: "Prysznic",
    href: "#",
    seeAllLabel: "Zobacz wszystkie",
    subs: [
      {
        label: "Drzwi do wnęki",
        href: "#",
        image: {
          src: assetUrl("category/subs/drzwidowneki.webp"),
          alt: "Drzwi do wnęki",
          fit: "cover",
        },
      },
      {
        label: "Kabiny kwadratowe i prostokątne",
        href: "#",
        image: {
          src: assetUrl("category/subs/kabinykwadratoweiprostokatne.webp"),
          alt: "Kabiny kwadratowe i prostokątne",
          fit: "cover",
        },
      },
      {
        label: "Kabiny półokrągłe",
        href: "#",
        image: {
          src: assetUrl("category/subs/kabinypolokragle.webp"),
          alt: "Kabiny półokrągłe",
          fit: "cover",
        },
      },
      {
        label: "Konfigurator kabin",
        href: "#",
        image: {
          src: assetUrl("category/subs/konfiguratorkabin.webp"),
          alt: "Konfigurator kabin",
          fit: "cover",
        },
      },
      {
        label: "Odpływy liniowe i ścienne",
        href: "#",
        image: {
          src: assetUrl("category/subs/odplywylinioweiscienne.webp"),
          alt: "Odpływy liniowe i ścienne",
          fit: "cover",
        },
      },
      {
        label: "Ścianki wannowe",
        href: "#",
        image: {
          src: assetUrl("category/subs/sciankiwannowe.webp"),
          alt: "Ścianki wannowe",
          fit: "cover",
        },
      },
      {
        label: "Walk-in",
        href: "#",
        image: {
          src: assetUrl("category/subs/walkin.webp"),
          alt: "Walk-in",
          fit: "cover",
        },
      },
    ],
    locateAfter: true,
  },
  {
    name: "Dodatki",
    href: "#",
    seeAllLabel: "Zobacz wszystkie",
    subs: [
      {
        label: "Dozowniki mydła, kubki i mydelniczki",
        href: "#",
        image: {
          src: assetUrl("category/subs/dozownikimydlakubkiimydelniczki.webp"),
          alt: "Dozowniki mydła, kubki i mydelniczki",
          fit: "cover",
        },
      },
      {
        label: "Koszyki pod prysznic",
        href: "#",
        image: {
          src: assetUrl("category/subs/koszykipodprysznic.webp"),
          alt: "Koszyki pod prysznic",
          fit: "cover",
        },
      },
      {
        label: "Łazienka bez barier",
        href: "#",
        image: {
          src: assetUrl("category/subs/lazienkabezbarier.webp"),
          alt: "Łazienka bez barier",
          fit: "cover",
        },
      },
      {
        label: "Lustra i inne",
        href: "#",
        image: {
          src: assetUrl("category/subs/lustraiinne.webp"),
          alt: "Lustra i inne",
          fit: "cover",
        },
      },
      {
        label: "Półki",
        href: "#",
        image: {
          src: assetUrl("category/subs/polki.webp"),
          alt: "Półki",
          fit: "cover",
        },
      },
      {
        label: "Szafki podumywalkowe",
        href: "#",
        image: {
          src: assetUrl("category/subs/szafkipodumywalkowe.webp"),
          alt: "Szafki podumywalkowe",
          fit: "cover",
        },
      },
      {
        label: "Uchwyty na papier toaletowy",
        href: "#",
        image: {
          src: assetUrl("category/subs/uchwytynapapiertoaletowy.webp"),
          alt: "Uchwyty na papier toaletowy",
          fit: "cover",
        },
      },
      {
        label: "Uchwyty wannowe, siedziska, taborety",
        href: "#",
        image: {
          src: assetUrl("category/subs/uchwytywannowesiedziskataborety.webp"),
          alt: "Uchwyty wannowe, siedziska, taborety",
          fit: "cover",
        },
      },
      {
        label: "Wieszaki na ręczniki",
        href: "#",
        image: {
          src: assetUrl("category/subs/wieszakinareczniki.webp"),
          alt: "Wieszaki na ręczniki",
          fit: "cover",
        },
      },
      {
        label: "Zestawy szczotki WC",
        href: "#",
        image: {
          src: assetUrl("category/subs/zestawyszczotkiwc.webp"),
          alt: "Zestawy szczotki WC",
          fit: "cover",
        },
      },
    ],
  },
  {
    name: "Meble",
    href: "#",
    seeAllLabel: "Zobacz wszystkie",
    subs: [
      {
        label: "Blaty",
        href: "#",
        image: {
          src: assetUrl("category/subs/blaty.webp"),
          alt: "Blaty",
          fit: "cover",
        },
      },
      {
        label: "Szafki podumywalkowe",
        href: "#",
        image: {
          src: assetUrl("category/subs/szafkipodumywalkowe.webp"),
          alt: "Szafki podumywalkowe",
          fit: "cover",
        },
      },
      {
        label: "Szafki wysokie",
        href: "#",
        image: {
          src: assetUrl("category/subs/szafkiwysokie.webp"),
          alt: "Szafki wysokie",
          fit: "cover",
        },
      },
      {
        label: "Szafki, półki i regały",
        href: "#",
        image: {
          src: assetUrl("category/subs/szafkipolkiiregaly.webp"),
          alt: "Szafki, półki i regały",
          fit: "cover",
        },
      },
      {
        label: "Serie mebli łazienkowych",
        href: "#",
        image: {
          src: assetUrl("category/subs/seriemeblilazienkowych.webp"),
          alt: "Serie mebli łazienkowych",
          fit: "cover",
        },
      },
      {
        label: "Słupki łazienkowe białe",
        href: "#",
        image: {
          src: assetUrl("category/subs/slupkilazienkowebiale.webp"),
          alt: "Słupki łazienkowe białe",
          fit: "cover",
        },
      },
    ],
  },
  {
    name: "Stelaże i przyciski",
    href: "#",
    seeAllLabel: "Zobacz wszystkie",
    subs: [
      {
        label: "Przyciski spłukujące",
        href: "#",
        image: {
          src: assetUrl("category/subs/przyciskisplukujace.webp"),
          alt: "Przyciski spłukujące",
          fit: "cover",
        },
      },
      {
        label: "Stelaże podtynkowe i moduły",
        href: "#",
        image: {
          src: assetUrl("category/subs/stelazepodtynkoweimoduly.webp"),
          alt: "Stelaże podtynkowe i moduły",
          fit: "cover",
        },
      },
    ],
  },
  {
    name: "Domowe spa",
    href: "#",
    seeAllLabel: "Zobacz wszystkie",
    subs: [
      {
        label: "Sauny fińskie",
        href: "#",
        image: {
          src: assetUrl("category/subs/saunyfinskie.webp"),
          alt: "Sauny fińskie",
          fit: "cover",
        },
      },
      {
        label: "Schody do wanny my spa",
        href: "#",
        image: {
          src: assetUrl("category/subs/schodydowannymyspa.webp"),
          alt: "Schody do wanny my spa",
          fit: "cover",
        },
      },
      {
        label: "Wanny my spa",
        href: "#",
        image: {
          src: assetUrl("category/subs/wannymyspa.webp"),
          alt: "Wanny my spa",
          fit: "cover",
        },
      },
    ],
  },
];

export { categorySeoBlocks } from "./categorySeo";
