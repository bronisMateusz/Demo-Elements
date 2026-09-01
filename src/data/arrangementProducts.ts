import { assetUrl } from "../app/assets";
import type { RelatedProduct } from "../types/product";

const montebiancoPackshot = {
  src: assetUrl("products/montebianco/01-front.png"),
  alt: "Szafka podumywalkowa Montebianco",
} as const;

function arrangementProduct(
  id: string,
  brand: string,
  title: string,
  options: {
    price: string;
    pricePrevious?: string;
    image: RelatedProduct["image"];
  },
): RelatedProduct {
  return {
    id,
    brand,
    title,
    href: "/produkt",
    price: options.price,
    pricePrevious: options.pricePrevious,
    image: options.image,
  };
}

/** Shared demo products for arrangement drawers and article rails. */
export const arrangementProducts = {
  oristoPillow: [
    arrangementProduct(
      "arr-pillow-vanity",
      "ORiSTO",
      "Szafka podumywalkowa Pillow 60 cm, biały połysk",
      {
        price: "1 890 zł",
        image: {
          ...montebiancoPackshot,
          alt: "Szafka podumywalkowa Pillow 60 cm, biały połysk",
        },
      },
    ),
    arrangementProduct(
      "arr-pillow-basin",
      "ORiSTO",
      "Umywalka meblowa Pillow 60 cm",
      {
        price: "690 zł",
        image: {
          ...montebiancoPackshot,
          alt: "Umywalka meblowa Pillow 60 cm",
        },
      },
    ),
    arrangementProduct(
      "arr-pillow-tall",
      "ORiSTO",
      "Szafka wysoka Pillow 40 cm",
      {
        price: "1 290 zł",
        image: {
          ...montebiancoPackshot,
          alt: "Szafka wysoka Pillow 40 cm",
        },
      },
    ),
  ],
  compact: [
    arrangementProduct(
      "arr-compact-vanity",
      "ORiSTO",
      "Szafka wisząca Montebianco 80 cm biały mat",
      {
        price: "1 990 zł",
        image: {
          ...montebiancoPackshot,
          alt: "Szafka wisząca Montebianco 80 cm biały mat",
        },
      },
    ),
    arrangementProduct(
      "arr-compact-mirror",
      "ORiSTO",
      "Lustro z podświetleniem LED 80 cm",
      {
        price: "890 zł",
        image: {
          ...montebiancoPackshot,
          alt: "Lustro z podświetleniem LED 80 cm",
        },
      },
    ),
    arrangementProduct(
      "arr-compact-wc",
      "Omnires",
      "Ottawa Comfort miska WC wisząca z deską wolnopadającą",
      {
        price: "1 280 zł",
        image: {
          src: assetUrl("home/ottawa.png"),
          alt: "Omnires Ottawa Comfort",
          fit: "cover",
        },
      },
    ),
  ],
  deepGreen: [
    arrangementProduct(
      "arr-green-vanity",
      "ORiSTO",
      "Szafka podumywalkowa, zielony mat, 80 cm",
      {
        price: "2 190 zł",
        image: {
          ...montebiancoPackshot,
          alt: "Szafka podumywalkowa, zielony mat, 80 cm",
        },
      },
    ),
    arrangementProduct(
      "arr-green-basin",
      "ORiSTO",
      "Umywalka nablatowa, zieleń / biały",
      {
        price: "780 zł",
        pricePrevious: "980 zł",
        image: {
          ...montebiancoPackshot,
          alt: "Umywalka nablatowa, zieleń / biały",
        },
      },
    ),
    arrangementProduct(
      "arr-green-tap",
      "Omnires",
      "Bateria umywalkowa, czarny mat",
      {
        price: "1 120 zł",
        image: {
          src: assetUrl("home/ottawa.png"),
          alt: "Bateria umywalkowa, czarny mat",
          fit: "cover",
        },
      },
    ),
  ],
  article: [
    arrangementProduct(
      "art-silia-bidet",
      "Silia",
      "Bateria bidetowa Silia podtynkowa z rączką Bidetta, stal szczotkowana",
      {
        price: "1 490 zł",
        image: {
          src: assetUrl("home/ottawa.png"),
          alt: "Bateria bidetowa Silia",
          fit: "contain",
        },
      },
    ),
    arrangementProduct(
      "art-silia-basin",
      "Silia",
      "Bateria umywalkowa Silia podtynkowa, stal szczotkowana",
      {
        price: "890 zł",
        image: {
          src: assetUrl("home/ottawa.png"),
          alt: "Bateria umywalkowa Silia",
          fit: "contain",
        },
      },
    ),
    arrangementProduct(
      "art-jasper-tile",
      "Florim",
      "Płytka Jasper Perla Mega, gres 60×60 cm",
      {
        price: "254 zł",
        image: {
          src: assetUrl("home/product-florim-tundra.png"),
          alt: "Płytka Jasper Perla Mega",
          fit: "contain",
        },
      },
    ),
    arrangementProduct(
      "art-ona-basin",
      "Laufen",
      "Umywalka stawiana Ona 50×37 cm, biała",
      {
        price: "690 zł",
        image: {
          ...montebiancoPackshot,
          alt: "Umywalka stawiana Ona 50×37 cm",
        },
      },
    ),
    arrangementProduct(
      "art-ona-wc",
      "Laufen",
      "Set WC Ona 53 cm Rimless z deską wolnoopadającą, biały",
      {
        price: "1 280 zł",
        image: {
          src: assetUrl("home/ottawa.png"),
          alt: "Set WC Ona 53 cm Rimless",
          fit: "contain",
        },
      },
    ),
    arrangementProduct(
      "art-luxo-bath",
      "Acquabella",
      "Wanna asymetryczna Luxo 180×80 cm",
      {
        price: "4 990 zł",
        image: {
          src: assetUrl("products/acquabella/luxo-front.png"),
          alt: "Wanna asymetryczna Luxo 180×80 cm",
          fit: "contain",
        },
      },
    ),
  ],
} satisfies Record<string, RelatedProduct[]>;
