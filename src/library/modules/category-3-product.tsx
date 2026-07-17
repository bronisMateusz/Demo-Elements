import { montebianco80 } from "../../data/products/montebianco-80";
import { ProductBuyBox } from "../../components/product/ProductBuyBox";
import { ProductCard } from "../../components/product/ProductCard";
import { ProductGallery } from "../../components/product/ProductGallery";
import { ProductPairWith } from "../../components/product/ProductPairWith";
import { ProductSpecifications } from "../../components/product/ProductSpecifications";
import { Container } from "../../components/ui/Container";
import {
  ProductSalonCardEmptyDemo,
  ProductSalonCardSelectedDemo,
} from "../demos/ProductSalonCardDemo";
import {
  ProductVariantSelectorDemo,
  VariantChipGroupDemo,
  VariantThumbnailGroupDemo,
} from "../demos/VariantSelectorDemo";
import { libPreviewArticleClassName } from "../libStyles";
import type { LibraryModule } from "../types";

export const productGalleryModule: LibraryModule = {
  id: "3.1",
  slug: "product-gallery",
  title: "ProductGallery",
  description: "Pionowa galeria Swiper ze scroll-snap, wskaźnikiem postępu i lightboxem.",
  variants: [
    {
      id: "multi",
      label: "4 zdjęcia",
      description: "Wiele zdjęć - przewijanie w pionie w stylu Zara Home.",
      render: () => (
        <Container className="max-w-xl py-8">
          <ProductGallery images={montebianco80.images} />
        </Container>
      ),
    },
    {
      id: "single",
      label: "1 zdjęcie",
      description: "Pojedyncze zdjęcie bez paska postępu.",
      render: () => (
        <Container className="max-w-xl py-8">
          <ProductGallery images={[montebianco80.images[0]]} />
        </Container>
      ),
    },
  ],
};

export const productBuyBoxModule: LibraryModule = {
  id: "3.2",
  slug: "product-buy-box",
  title: "ProductBuyBox",
  description:
    "Panel zakupowy z wariantami, ulubionymi, ceną, ask-row, karuzelą serii (Pair it with) i kartą salonu.",
  variants: [
    {
      id: "default",
      label: "Montebianco z wariantami",
      description: "Buy box z selektorem wariantów (chip + miniatura) i kartą salonu.",
      render: () => (
        <Container className="max-w-md py-8">
          <ProductBuyBox product={montebianco80} />
        </Container>
      ),
    },
  ],
};

export const productCardModule: LibraryModule = {
  id: "3.3",
  slug: "product-card",
  title: "ProductCard",
  description: "Karta produktu używana w serii i rekomendacjach.",
  variants: [
    {
      id: "default",
      label: "Pojedyncza karta",
      description: "Karta z obrazem, marką i linkiem Zobacz.",
      render: () => (
        <Container className="max-w-xs py-8">
          <ProductCard product={montebianco80.seriesProducts[0]} />
        </Container>
      ),
    },
    {
      id: "carousel",
      label: "Karta karuzeli",
      description:
        "Faux-link, badge, ulubione, zmiana zdjęcia na hover i meta wariantów.",
      render: () => (
        <Container className="max-w-[424px] py-8">
          <ProductCard product={montebianco80.seriesProducts[0]} layout="carousel" />
        </Container>
      ),
    },
  ],
};

export const productSpecsModule: LibraryModule = {
  id: "3.4",
  slug: "product-specifications",
  title: "ProductSpecifications",
  description: "Tabela specyfikacji z opcją rozwinięcia.",
  variants: [
    {
      id: "default",
      label: "Specyfikacja techniczna",
      description: "Lista parametrów z accordionem.",
      render: () => <ProductSpecifications specs={montebianco80.specifications} />,
    },
  ],
};

export const productSalonCardModule: LibraryModule = {
  id: "3.5",
  slug: "product-salon-card",
  title: "ProductSalonCard",
  description:
    "Karta salonu w buy boxie - stan pusty (CTA wyboru) oraz wybrany salon (godziny, zmiana, pytanie, telefon).",
  variants: [
    {
      id: "empty",
      label: "Bez salonu",
      description: "Redakcyjny blok z CTA „Wybierz swój salon”.",
      render: () => (
        <Container className="max-w-md py-8">
          <ProductSalonCardEmptyDemo />
        </Container>
      ),
    },
    {
      id: "selected",
      label: "Wybrany salon",
      description: "Nazwa salonu, accordion adres/godziny, CTA pytania i telefon.",
      render: () => (
        <Container className="max-w-md py-8">
          <ProductSalonCardSelectedDemo />
        </Container>
      ),
    },
  ],
};

export const productVariantSelectorModule: LibraryModule = {
  id: "3.6",
  slug: "product-variant-selector",
  title: "ProductVariantSelector",
  description:
    "Selektor osi wariantów PDP - chip (szerokość) i miniatura (wykończenie). Chip: SharedLayoutBg + layoutId wyboru. Miniatura: SharedLayoutUnderline na hover.",
  optionalProps: [
    { name: "variants", type: "ProductVariants", required: true },
    { name: "selection", type: "Record<string, string>", required: true },
    { name: "onSelect", type: "(axisId, optionId) => void", required: true },
  ],
  variants: [
    {
      id: "full",
      label: "Pełny selektor",
      description: "Obie osie Montebianco - chip + miniatura.",
      render: () => (
        <Container className="max-w-md py-8">
          <div className={libPreviewArticleClassName}>
            <ProductVariantSelectorDemo />
          </div>
        </Container>
      ),
    },
    {
      id: "chip",
      label: "VariantChipGroup",
      description: "Segment z animowanym tłem wyboru i hover pill. Nieaktywne opcje mają border.",
      render: () => (
        <Container className="max-w-md py-8">
          <div className={libPreviewArticleClassName}>
            <p className="mb-3 block text-sm text-neutral-900">
              <span className="text-neutral-600">Szerokość:</span> interaktywny demo
            </p>
            <VariantChipGroupDemo />
          </div>
        </Container>
      ),
    },
    {
      id: "thumbnail",
      label: "VariantThumbnailGroup",
      description: "Miniaturki bez gapu; aktywny = bg-muted + pełne podkreślenie; hover = jaśniejsza linia.",
      render: () => (
        <Container className="max-w-md py-8">
          <div className={libPreviewArticleClassName}>
            <p className="mb-3 block text-sm text-neutral-900">
              <span className="text-neutral-600">Wykończenie:</span> interaktywny demo
            </p>
            <VariantThumbnailGroupDemo />
          </div>
        </Container>
      ),
    },
  ],
};

export const productPairWithModule: LibraryModule = {
  id: "3.7",
  slug: "product-pair-with",
  title: "ProductPairWith",
  description:
    "Karuzela „Inne produkty z tej serii” w buy boxie - nagłówek ze strzałkami, karta karuzeli (ulubione, hover zdjęcia).",
  optionalProps: [
    { name: "title", type: "string", required: true },
    { name: "products", type: "RelatedProduct[]", required: true },
  ],
  variants: [
    {
      id: "default",
      label: "W buy boxie",
      description: "Pod ceną i ask-row - ta sama karta co w „Produkty podobne”.",
      render: () => (
        <Container className="max-w-md py-8">
          <ProductPairWith title={montebianco80.seriesTitle} products={montebianco80.seriesProducts} />
        </Container>
      ),
    },
  ],
};

export const category3Modules: LibraryModule[] = [
  productGalleryModule,
  productBuyBoxModule,
  productCardModule,
  productSpecsModule,
  productSalonCardModule,
  productVariantSelectorModule,
  productPairWithModule,
];
