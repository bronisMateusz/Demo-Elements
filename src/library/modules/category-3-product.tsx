import { montebianco80 } from "../../data/products/montebianco-80";
import { ProductBuyBox } from "../../components/product/ProductBuyBox";
import { ProductCard } from "../../components/product/ProductCard";
import { ProductGallery } from "../../components/product/ProductGallery";
import { ProductSpecifications } from "../../components/product/ProductSpecifications";
import { Container } from "../../components/ui/Container";
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
      description: "Wiele zdjęć — przewijanie w pionie w stylu Zara Home.",
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
    "Panel zakupowy z wariantami, ulubionymi, ceną i CTA.",
  variants: [
    {
      id: "default",
      label: "Montebianco z wariantami",
      description: "Buy box z selektorem chipów (szerokość) i miniatur produktu (wykończenie).",
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
      label: "Karta karuzeli (OKA)",
      description:
        "Faux-link, badge, ulubione, zmiana zdjęcia na hover, szybkie dodanie do koszyka i meta wariantów.",
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

export const category3Modules: LibraryModule[] = [
  productGalleryModule,
  productBuyBoxModule,
  productCardModule,
  productSpecsModule,
];
