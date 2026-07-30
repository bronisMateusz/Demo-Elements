import { montebianco80 } from "../../data/products/montebianco-80";
import { ProductArchitectCTA } from "../../components/product/ProductArchitectCTA";
import { ProductBuyBox } from "../../components/product/ProductBuyBox";
import { ProductCard } from "../../components/product/ProductCard";
import { ProductCarousel } from "../../components/product/ProductCarousel";
import { ProductGallery } from "../../components/product/ProductGallery";
import { ProductInspiration } from "../../components/product/ProductInspiration";
import { ProductPairWith } from "../../components/product/ProductPairWith";
import { ProductSpecifications } from "../../components/product/ProductSpecifications";
import { ProductVisualizationCTA } from "../../components/product/ProductVisualizationCTA";
import { Container } from "../../components/ui/Container";
import { AskFabDemo } from "../demos/AskFabDemo";
import {
  ProductSalonCardEmptyDemo,
  ProductSalonCardSelectedDemo,
} from "../demos/ProductSalonCardDemo";
import {
  ProductVariantSelectorDemo,
  VariantChipGroupDemo,
  VariantThumbnailGroupDemo,
} from "../demos/VariantSelectorDemo";
import {
  libPreviewArticleClassName,
  libPreviewFullBleedWrapperClassName,
} from "../libStyles";
import type { LibraryModule } from "../types";

export const productGalleryModule: LibraryModule = {
  id: "3.1",
  slug: "product-gallery",
  title: "ProductGallery",
  description:
    "Pionowa galeria Swiper ze scroll-snap, wskaźnikiem postępu i lightboxem.",
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
    "Panel zakupowy z wariantami, ulubionymi, ceną, ask-row i kartą salonu.",
  variants: [
    {
      id: "default",
      label: "Montebianco z wariantami",
      description:
        "Buy box z selektorem wariantów (chip + miniatura) i kartą salonu.",
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
        <Container className="max-w-106 py-8">
          <ProductCard
            product={montebianco80.seriesProducts[0]}
            layout="carousel"
          />
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
      render: () => (
        <ProductSpecifications specs={montebianco80.specifications} />
      ),
    },
  ],
};

export const productSalonCardModule: LibraryModule = {
  id: "3.5",
  slug: "product-salon-card",
  title: "ProductSalonCard",
  description:
    "Karta salonu w buy boxie - stan pusty (CTA wyboru) oraz wybrany salon (godziny, zmiana, pytanie, telefon).",
  optionalProps: [
    { name: "eyebrow", type: "string", required: true },
    { name: "description", type: "string", required: true },
    { name: "href", type: "string", required: true },
    { name: "label", type: "string", required: true },
    {
      name: "previewSalon",
      type: "SalonOption | null",
      description:
        "Preview w bibliotece - null = pusty, obiekt = wybrany; bez prop = live selection.",
    },
  ],
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
      description:
        "Nazwa salonu, accordion adres/godziny, CTA pytania i telefon.",
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
      description:
        "Segment z animowanym tłem wyboru i hover pill. Nieaktywne opcje mają border.",
      render: () => (
        <Container className="max-w-md py-8">
          <div className={libPreviewArticleClassName}>
            <p className="mb-3 block text-sm text-neutral-900">
              <span className="text-neutral-600">Szerokość:</span> interaktywny
              demo
            </p>
            <VariantChipGroupDemo />
          </div>
        </Container>
      ),
    },
    {
      id: "thumbnail",
      label: "VariantThumbnailGroup",
      description:
        "Miniaturki bez gapu; aktywny = bg-muted + pełne podkreślenie; hover = jaśniejsza linia.",
      render: () => (
        <Container className="max-w-md py-8">
          <div className={libPreviewArticleClassName}>
            <p className="mb-3 block text-sm text-neutral-900">
              <span className="text-neutral-600">Wykończenie:</span>{" "}
              interaktywny demo
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
    "Sekcja PDP „Inne produkty z tej serii” - pełna szerokość, bleed carousel (ProductCarousel), nav w stopce.",
  optionalProps: [
    { name: "title", type: "string", required: true },
    { name: "products", type: "RelatedProduct[]", required: true },
  ],
  variants: [
    {
      id: "pdp-section",
      label: "Sekcja PDP",
      description:
        "Nad opisem produktu - bleed track z kartami karuzeli i strzałkami pod spodem.",
      render: () => (
        <div className={libPreviewFullBleedWrapperClassName}>
          <div className="py-8">
            <ProductPairWith
              title={montebianco80.seriesTitle}
              products={montebianco80.seriesProducts}
            />
          </div>
        </div>
      ),
    },
  ],
};

export const productInspirationModule: LibraryModule = {
  id: "3.8",
  slug: "product-inspiration",
  title: "ProductInspiration",
  description:
    "Thin wrapper InspirationGallery na PDP - hardcoduje endCap + seeMoreHref/seeMoreLabel („Zobacz więcej aranżacji”) przy navPlacement=footer.",
  optionalProps: [
    {
      name: "arrangements",
      type: "InspirationArrangement[]",
      required: true,
      description:
        "href → karta-link; showProducts → drawer produktów; inaczej lightbox.",
    },
    {
      name: "eyebrow",
      type: "string",
      defaultValue: '"Produkt w aranżacji"',
    },
    {
      name: "title",
      type: "string",
      defaultValue: '"Inspiracje producenta"',
    },
    {
      name: "navPlacement",
      type: '"header" | "footer" | "none"',
      defaultValue: '"footer"',
    },
    {
      name: "endCap / seeMore*",
      type: "hardcoded",
      description:
        "Wrapper ustawia endCap („Kliknij poniżej”) i CTA seeMore do #inspiracje.",
    },
  ],
  variants: [
    {
      id: "default",
      label: "Montebianco",
      description:
        "Mix: Pokaż produkty (drawer), link, zaślepka + CTA „Zobacz więcej aranżacji”.",
      render: () => (
        <div className={libPreviewFullBleedWrapperClassName}>
          <div className="py-8">
            <ProductInspiration arrangements={montebianco80.inspirations} />
          </div>
        </div>
      ),
    },
  ],
};

export const askFabModule: LibraryModule = {
  id: "3.9",
  slug: "ask-fab",
  title: "AskFab",
  description:
    "Sticky bar PDP: schowek + Zadaj pytanie (AskDrawer). Mobile: schowek tylko ikoną. Pojawia się po scrollu, znika przed stopką.",
  optionalProps: [
    { name: "sku", type: "string", required: true },
    { name: "title", type: "string", required: true },
    { name: "brand", type: "string", required: true },
    { name: "productSku", type: "string", required: true },
    { name: "price", type: "string", required: true },
    { name: "image", type: "ProductImage", required: true },
    { name: "showAfterScroll", type: "number", defaultValue: "320" },
  ],
  variants: [
    {
      id: "default",
      label: "Montebianco",
      description: "Podgląd paska w miejscu (bez sticky nad chrome biblioteki).",
      render: () => <AskFabDemo />,
    },
  ],
};

export const productArchitectCtaModule: LibraryModule = {
  id: "3.10",
  slug: "product-architect-cta",
  title: "ProductArchitectCTA",
  description:
    "Baner strefy architekta - media + copy + CTA, scroll-expand inset.",
  variants: [
    {
      id: "default",
      label: "Z wideo",
      description: "Dane Montebianco (poster + mp4 gdy motion włączony).",
      render: () => (
        <div className={libPreviewFullBleedWrapperClassName}>
          <ProductArchitectCTA {...montebianco80.architectCta} />
        </div>
      ),
    },
  ],
};

export const productVisualizationCtaModule: LibraryModule = {
  id: "3.11",
  slug: "product-visualization-cta",
  title: "ProductVisualizationCTA",
  description:
    "CTA wizualizacji łazienki - LiquidCtaGlow, primary + secondary, pełna szerokość przycisków na mobile.",
  variants: [
    {
      id: "default",
      label: "Domyślny",
      description: "Tytuł + dwa CTA + note.",
      render: () => (
        <div className={libPreviewFullBleedWrapperClassName}>
          <ProductVisualizationCTA {...montebianco80.visualizationCta} />
        </div>
      ),
    },
  ],
};

export const productCarouselModule: LibraryModule = {
  id: "3.12",
  slug: "product-carousel",
  title: "ProductCarousel",
  description:
    "Karuzela produktów - layout bleed/contained/inline, navPlacement header/footer/overlay/none.",
  optionalProps: [
    { name: "products", type: "RelatedProduct[]", required: true },
    {
      name: "layout",
      type: '"bleed" | "contained" | "inline" | "inline-bleed"',
      defaultValue: '"bleed"',
    },
    {
      name: "navPlacement",
      type: '"overlay" | "header" | "footer" | "none"',
      defaultValue: '"footer"',
    },
  ],
  variants: [
    {
      id: "bleed-footer",
      label: "Bleed · nav w stopce",
      description: "Pełna szerokość toru, strzałki i indeks pod spodem.",
      render: () => (
        <div className={libPreviewFullBleedWrapperClassName}>
          <div className="py-8">
            <ProductCarousel
              products={montebianco80.seriesProducts}
              layout="bleed"
              navPlacement="footer"
              header={{ title: "Produkty z serii" }}
            />
          </div>
        </div>
      ),
    },
    {
      id: "contained-header",
      label: "Contained · nav w nagłówku",
      description: "Tor w kontenerze, strzałki obok tytułu.",
      render: () => (
        <div className={libPreviewFullBleedWrapperClassName}>
          <div className="py-8">
            <ProductCarousel
              products={montebianco80.seriesProducts}
              layout="contained"
              navPlacement="header"
              header={{ title: "Polecane" }}
            />
          </div>
        </div>
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
  productInspirationModule,
  askFabModule,
  productArchitectCtaModule,
  productVisualizationCtaModule,
  productCarouselModule,
];
