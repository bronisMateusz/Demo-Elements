import { assetUrl } from "../app/assets";
import { ctaContextImages } from "../lib/ctaContextImages";
import type { InspirationArticlePageData } from "../types/inspiration";
import type { ProductImage } from "../types/product";
import { arrangementProducts } from "./arrangementProducts";
import { HOME_MAGAZINE_FLIPBOOK_HREF, homeMagazine } from "./home";
import { inspirationsListingItems } from "./inspirationsListing";

/** Official Strzelecka Design hero for this upstairs bathroom article. */
const projectHeroImage = {
  src: assetUrl("home/lazienka-na-pietrze-wariant-a-wiz-5.png"),
  alt: "Projekt nowoczesnej łazienki Strzelecka Design",
  fit: "cover" as const,
  focalPoint: { x: 0, y: 100 },
} satisfies ProductImage;

const projectGalleryImage = (path: string, alt: string): ProductImage => ({
  src: assetUrl(path),
  alt,
  fit: "cover",
});

export const inspirationArticlePage: InspirationArticlePageData = {
  title: "Nowoczesna łazienka na piętrze ze skosem - projekt pełen światła",
  metaDescription:
    "Aranżacja łazienki na poddaszu - skosy, naturalne światło, kamień, drewno i ceramika. Projekt Strzelecka Design.",
  lead: "Urządzanie łazienki na piętrze domu jednorodzinnego często wiąże się z wyzwaniem, jakim jest spadzisty dach. Ten projekt udowadnia, że skosy w łazience nie muszą być ograniczeniem. Wręcz przeciwnie - mogą stać się fundamentem unikalnego designu. Prezentujemy aranżację, która łączy funkcjonalność, naturalne materiały i przemyślaną architekturę wnętrza.",
  projectCredit: "Projekt: Strzelecka Design",
  styleTags: [
    { label: "Nowoczesna", href: "/inspiracje-listing" },
    { label: "Domowe SPA", href: "/inspiracje-listing" },
  ],
  breadcrumbs: [
    { label: "Strona główna", to: "/" },
    { label: "Galeria inspiracji", to: "/inspiracje-listing" },
    {
      label: "Nowoczesna łazienka na piętrze ze skosem",
      current: true,
    },
  ],
  heroImage: projectHeroImage,
  products: [...arrangementProducts.article],
  sections: [
    {
      id: "materials",
      heading: "Dialog materiałów: kamień, drewno i ceramika",
      paragraphs: [
        "Wnętrze zbudowane jest na harmonijnym zestawieniu trzech głównych materiałów:",
      ],
      bullets: [
        "drewno wykorzystane w zabudowie meblowej oraz wysokiej szafie wprowadza do projektu przytulność,",
        "chłodne, grafitowo-zielone płytki o kamiennej strukturze, które nadają wnętrzu głębi i elegancji,",
        "jasna, subtelnie ryflowana ceramika na ścianach przy umywalkach, która rozjaśnia przestrzeń i dodaje jej delikatnego rytmu.",
      ],
      paragraphsAfter: [
        "To zestawienie tworzy spokojne, ponadczasowe tło, idealne dla codziennego użytkowania.",
      ],
    },
    {
      id: "cabinetry",
      heading: "Funkcjonalna zabudowa meblowa",
      paragraphs: [
        "W łazienkach na piętrze liczy się każdy centymetr. Tutaj wysoka zabudowa pod skosem została zaprojektowana na wymiar, dzięki czemu trudna geometria dachu zmieniła się w pojemną strefę przechowywania. To rozwiązanie porządkuje bryłę wnętrza i nadaje jej wyrazisty, architektoniczny rytm.",
        "Strefa umywalek to szeroki, komfortowy blat z dwiema misami nablatowymi (co pozwala na korzystanie z porannej toalety przez więcej niż jedną osobę - idealne w przypadku rodzinnych łazienek). Podwieszone szafki dodają konstrukcji lekkości i ułatwiają utrzymanie czystości.",
      ],
      images: [
        projectGalleryImage(
          "home/lazienka-na-pietrze-wariant-a-wiz-4.png",
          "Zabudowa meblowa i wanna w świetle okna dachowego",
        ),
        projectGalleryImage(
          "home/lazienka-na-pietrze-wariant-a-wiz-2.png",
          "Detal zabudowy wysokiej i strefy umywalkowej",
        ),
      ],
    },
    {
      id: "bath",
      heading: "Wanna pod oknem dachowym: domowe SPA",
      paragraphs: [
        "Lokalizacja strefy kąpielowej nie jest przypadkowa. Asymetryczna wanna stanęła bezpośrednio pod oknem połaciowym. To rozwiązanie domyka układ funkcjonalny i wzmacnia wrażenie przestronności. Dzięki temu kąpiel odbywa się w promieniach słońca lub pod gwiazdami, co potęguje wrażenie przestronności i relaksu.",
      ],
      images: [
        projectGalleryImage(
          "home/lazienka-na-pietrze-wariant-a-wiz-2.png",
          "Wanna asymetryczna pod oknem dachowym",
        ),
      ],
    },
    {
      id: "light",
      heading: "Światło - naturalne i projektowe",
      paragraphs: [
        "Dużą rolę w aranżacji odgrywa naturalne doświetlenie przez okno dachowe. Światło dzienne podkreśla fakturę kamiennych płytek, wydobywa rysunek drewna oraz zmienia odbiór kolorystyki wnętrza w zależności od pory dnia.",
        "Uzupełnieniem są:",
      ],
      bullets: [
        "minimalistyczne, czarne oprawy szynowe,",
        "punktowe kinkiety przy lustrach,",
        "precyzyjnie zaprojektowane oświetlenie strefowe.",
      ],
      paragraphsAfter: [
        "Tak zaplanowane oświetlenie w łazience na poddaszu pozwala połączyć funkcjonalność z nastrojowością, bez dominowania wizualnego nad architekturą wnętrza.",
      ],
    },
    {
      id: "detail",
      heading: "Detal i minimalizm",
      paragraphs: [
        "Ciemne, wyraziste akcenty - oświetlenie, profile, detale i ramy luster - nadają aranżacji nowoczesny charakter i porządkują przestrzeń, tworząc wyraźny kontrast z ciepłem drewna oraz spokojną tonacją jasnych okładzin. Lustra z zaokrąglonymi narożnikami przełamują geometryczną konsekwencję form, a subtelne akcenty zieleni wprowadzają naturalną świeżość. To minimalistyczne wnętrze oparte na jakości materiałów, świetle i proporcjach - wyrafinowane, ale pełne równowagi.",
      ],
      images: [
        projectGalleryImage(
          "home/lazienka-na-pietrze-wariant-a-wiz-2.png",
          "Detale: lustro, zieleń i kontrast ciemnych akcentów",
        ),
        projectGalleryImage(
          "home/lazienka-na-pietrze-wariant-a-wiz-5.png",
          "Kompozycja materiałów i światła w całej łazience",
        ),
      ],
    },
    {
      id: "summary",
      heading: "Podsumowanie",
      paragraphs: [
        "Ta łazienka to przykład przemyślanego, dojrzałego projektu, w którym:",
      ],
      bullets: [
        "architektura poddasza została w pełni wykorzystana,",
        "mimo ograniczonego metrażu mamy wrażenie przestronności,",
        "funkcjonalność idzie w parze z estetyką,",
        "światło i detal subtelnie podkreślają charakter wnętrza.",
      ],
      paragraphsAfter: [
        "Inspiracja ta pokazuje, jak stworzyć przestrzeń codzienną, a jednocześnie wyjątkową - ponadczasową, komfortową i dopracowaną w każdym detalu.",
      ],
      credit: "Autor projektu: Strzelecka Design",
    },
  ],
  embeds: [
    { type: "appointment", afterSectionId: "cabinetry" },
    { type: "magazine", afterSectionId: "light" },
  ],
  appointmentCta: {
    title: "Umów spotkanie w salonie",
    description:
      "Nasz doradca będzie czekał na Ciebie w salonie - pozna Twój projekt, pokaże produkty na żywo i pomoże dobrać całe wyposażenie. Bez pośpiechu, w dogodnym terminie.",
    ctaLabel: "Umów spotkanie",
    image: ctaContextImages.locateCta,
  },
  magazine: {
    id: "magazyn-artykul",
    eyebrow: "Magazyn · jubileuszowe wydanie",
    title: "Produkty z tej aranżacji w magazynie TOP TRENDY 2026",
    description:
      "Ceramika, armatura i meble użyte w tym wnętrzu - razem z bestsellerami i nowościami sezonu. Wszystko z cenami Elements, w jednym katalogu.",
    image: homeMagazine.image,
    primaryCta: {
      label: "Zobacz magazyn online",
      href: HOME_MAGAZINE_FLIPBOOK_HREF,
    },
    secondaryCta: homeMagazine.secondaryCta,
  },
  finalCta: {
    eyebrow: "Doradztwo",
    title: "Skonsultuj podobną łazienkę w salonie",
    description:
      "Spodobała Ci się ta aranżacja? Napisz do doradcy online albo umów spotkanie w salonie - pokażemy produkty na żywo i pomożemy dobrać wyposażenie do Twojego wnętrza, również pod skosy.",
    askLabel: "Napisz do doradcy",
    bookLabel: "Umów spotkanie",
    image: ctaContextImages.bathroomGreen,
  },
  relatedTitle: "Zobacz podobne aranżacje",
  relatedArrangements: inspirationsListingItems.slice(0, 6).map((item) => ({
    ...item,
    id: `related-${item.id}`,
    href: "/inspiracja-artykul",
  })),
};
