import type { ReactNode } from "react";
import { HomeAdvisorCta } from "../components/home/HomeAdvisorCta";
import { HomeAppointment } from "../components/home/HomeAppointment";
import { HomeMagazine } from "../components/home/HomeMagazine";
import { CategoryPromoBanner } from "../components/marketing/CategoryPromoBanner";
import { CatalogDatabaseCta } from "../components/marketing/CatalogDatabaseCta";
import {
  AdvisorCta,
  type AdvisorCtaContent,
} from "../components/marketing/AdvisorCta";
import { LocateCta } from "../components/marketing/LocateCta";
import { ListingPromoTile } from "../components/listing/ListingPromoTile";
import { ProductArchitectCTA } from "../components/product/ProductArchitectCTA";
import { ProductVisualizationCTA } from "../components/product/ProductVisualizationCTA";
import {
  SalonDesignStrip,
  SalonVisitCta,
} from "../components/salon/SalonSections";
import { PromoSplitCta } from "../components/structural/PromoSplitCta";
import { arrangementsGalleryPage } from "./arrangementsGallery";
import { architectZonePage } from "./architectZone";
import { categoryPage, categoryRows } from "./category";
import { homeAdvisorCta, homeAppointment, homeMagazine } from "./home";
import { salonPage } from "./salon";
import { inspirationArticlePage } from "./inspirationArticle";
import { inspirationsListingPage } from "./inspirationsListing";
import { listingPage } from "./listing";
import { montebianco80 } from "./products/montebianco-80";
import { producerPage, producersPage } from "./producers";
import { subcategoryAdvisorCta, subcategoryPage } from "./subcategory";
import { ctaContextImages } from "../lib/ctaContextImages";

export type CtaShowcaseFamily =
  | "LocateCta"
  | "AdvisorCta"
  | "PromoSplitCta"
  | "HomeMagazine"
  | "ListingPromoTile"
  | "CategoryPromoBanner";

export type CtaShowcasePageRef = {
  label: string;
  href: string;
};

export type CtaShowcaseEntry = {
  id: string;
  family: CtaShowcaseFamily;
  title: string;
  dataSource: string;
  imagePath: string;
  pages: CtaShowcasePageRef[];
  notes?: string;
  contextImageKey?: keyof typeof ctaContextImages;
  render: () => ReactNode;
};

const noop = () => {};

function assetPathFromSrc(src: string): string {
  const match = src.match(/assets\/(.+)$/);
  return match?.[1] ?? src;
}

function imageLabel(
  image: { src: string },
  contextKey?: keyof typeof ctaContextImages,
): string {
  if (contextKey) {
    return `ctaContextImages.${contextKey} → assets/${assetPathFromSrc(image.src)}`;
  }
  for (const [key, value] of Object.entries(ctaContextImages)) {
    if (value.src === image.src) {
      return `ctaContextImages.${key} → assets/${assetPathFromSrc(image.src)}`;
    }
  }
  return `assets/${assetPathFromSrc(image.src)}`;
}

const categoryAdvisorContent: AdvisorCtaContent = {
  eyebrow: categoryPage.advisorCta.eyebrow,
  title: categoryPage.advisorCta.title,
  description: categoryPage.advisorCta.description,
  image: categoryPage.advisorCta.image,
  askLabel: categoryPage.advisorCta.primaryCta.label,
  bookLabel: categoryPage.advisorCta.secondaryCta.label,
  askHref: categoryPage.advisorCta.primaryCta.href,
};

const subcategoryAdvisorContent: AdvisorCtaContent = {
  eyebrow: subcategoryAdvisorCta.eyebrow,
  title: subcategoryAdvisorCta.title,
  description: subcategoryAdvisorCta.description,
  image: subcategoryAdvisorCta.image,
  bookLabel: subcategoryAdvisorCta.bookLabel,
  askLabel: subcategoryAdvisorCta.findSalonLabel,
  askHref: subcategoryAdvisorCta.findSalonHref,
};

const listingAdvisorContent: AdvisorCtaContent = {
  eyebrow: listingPage.advisorCta.eyebrow,
  title: listingPage.advisorCta.title,
  description: listingPage.advisorCta.description,
  image: listingPage.advisorCta.image,
  askLabel: listingPage.advisorCta.primaryCta.label,
  bookLabel: listingPage.advisorCta.secondaryCta.label,
  askHref: listingPage.advisorCta.primaryCta.href,
};

const producerAdvisorContent: AdvisorCtaContent = {
  eyebrow: producerPage.cta.eyebrow,
  title: producerPage.cta.title,
  description: producerPage.cta.description,
  image: producerPage.cta.image,
  askLabel: producerPage.cta.askLabel,
  askHref: producerPage.cta.askHref,
  bookLabel: producerPage.cta.bookLabel,
};

const producersAdvisorContent: AdvisorCtaContent = {
  eyebrow: producersPage.cta.eyebrow,
  title: producersPage.cta.title,
  description: producersPage.cta.description,
  image: producersPage.cta.image,
  askLabel: producersPage.cta.askLabel,
  bookLabel: producersPage.cta.bookLabel,
  askHref: "/salony",
};

const architectAdvisorContent: AdvisorCtaContent = {
  id: architectZonePage.advisor.id,
  eyebrow: architectZonePage.advisor.eyebrow,
  title: architectZonePage.advisor.title,
  description: architectZonePage.advisor.description,
  image: architectZonePage.advisor.image,
  askLabel: architectZonePage.advisor.askLabel,
  bookLabel: architectZonePage.advisor.bookLabel,
};

const articleFinalAdvisorContent: AdvisorCtaContent = {
  eyebrow: inspirationArticlePage.finalCta.eyebrow,
  title: inspirationArticlePage.finalCta.title,
  description: inspirationArticlePage.finalCta.description,
  image: inspirationArticlePage.finalCta.image,
  askLabel: inspirationArticlePage.finalCta.askLabel,
  bookLabel: inspirationArticlePage.finalCta.bookLabel,
};

const umywalkiPromo = categoryRows[0]?.banner;
if (!umywalkiPromo) {
  throw new Error(
    "ctaShowcase: expected Umywalki row promo banner in categoryRows",
  );
}

const pdpGalleryBanner = montebianco80.galleryBanner;
if (!pdpGalleryBanner?.image) {
  throw new Error("ctaShowcase: expected montebianco80.galleryBanner.image");
}

export const ctaShowcaseEntries: CtaShowcaseEntry[] = [
  {
    id: "locate-home-appointment",
    family: "LocateCta",
    title: "Umów spotkanie w salonie (strona główna)",
    dataSource: "home.ts → homeAppointment",
    imagePath: imageLabel(homeAppointment.image, "locateCta"),
    contextImageKey: "locateCta",
    pages: [{ label: "Strona główna", href: "/" }],
    render: () => <HomeAppointment />,
  },
  {
    id: "locate-category",
    family: "LocateCta",
    title: "Umów spotkanie w salonie (kategoria)",
    dataSource: "category.ts → categoryPage.locate",
    imagePath: imageLabel(categoryPage.locate.image, "locateCta"),
    contextImageKey: "locateCta",
    pages: [{ label: "Kategoria", href: "/kategoria" }],
    render: () => (
      <LocateCta
        title={categoryPage.locate.title}
        description={categoryPage.locate.description}
        ctaLabel={categoryPage.locate.ctaLabel}
        image={categoryPage.locate.image}
      />
    ),
  },
  {
    id: "locate-subcategory",
    family: "LocateCta",
    title: "Umów spotkanie w salonie (podkategoria)",
    dataSource: "subcategory.ts → subcategoryPage.locate",
    imagePath: imageLabel(subcategoryPage.locate.image, "locateCta"),
    contextImageKey: "locateCta",
    pages: [{ label: "Podkategoria", href: "/podkategoria" }],
    render: () => (
      <LocateCta
        title={subcategoryPage.locate.title}
        description={subcategoryPage.locate.description}
        ctaLabel={subcategoryPage.locate.ctaLabel}
        image={subcategoryPage.locate.image}
      />
    ),
  },
  {
    id: "locate-listing",
    family: "LocateCta",
    title: "Umów spotkanie w salonie (listing)",
    dataSource: "listing.ts → listingPage.locate",
    imagePath: imageLabel(listingPage.locate.image, "locateCta"),
    contextImageKey: "locateCta",
    pages: [{ label: "Listing", href: "/listing" }],
    render: () => (
      <LocateCta
        title={listingPage.locate.title}
        description={listingPage.locate.description}
        ctaLabel={listingPage.locate.ctaLabel}
        image={listingPage.locate.image}
      />
    ),
  },
  {
    id: "advisor-arrangements-gallery-footer",
    family: "AdvisorCta",
    title: "Któraś aranżacja pasuje do Twojej łazienki? (galeria aranżacji)",
    dataSource: "arrangementsGallery.ts → footerAdvisorCta",
    imagePath: imageLabel(
      arrangementsGalleryPage.footerAdvisorCta.image,
      "advisorConsultation",
    ),
    contextImageKey: "advisorConsultation",
    pages: [{ label: "Galeria aranżacji", href: "/galeria-aranzacji" }],
    notes: "primaryAction: book, askHref → /salony",
    render: () => (
      <AdvisorCta
        titleId="showcase-arrangements-footer-advisor-title"
        content={arrangementsGalleryPage.footerAdvisorCta}
        onBookOpen={noop}
        primaryAction="book"
      />
    ),
  },
  {
    id: "locate-inspirations-grid",
    family: "LocateCta",
    title: "Skonsultuj swoją wymarzoną łazienkę (siatka inspiracji)",
    dataSource: "inspirationsListing.ts → gridLocateCta",
    imagePath: imageLabel(
      inspirationsListingPage.gridLocateCta.image,
      "locateCta",
    ),
    contextImageKey: "locateCta",
    pages: [{ label: "Inspiracje - listing", href: "/inspiracje-listing" }],
    notes: "embedded w siatce (col-span-full)",
    render: () => (
      <LocateCta
        embedded
        title={inspirationsListingPage.gridLocateCta.title}
        description={inspirationsListingPage.gridLocateCta.description}
        ctaLabel={inspirationsListingPage.gridLocateCta.ctaLabel}
        image={inspirationsListingPage.gridLocateCta.image}
        onCtaClick={noop}
      />
    ),
  },
  {
    id: "locate-article-appointment",
    family: "LocateCta",
    title: "Umów spotkanie w salonie (artykuł inspiracji)",
    dataSource: "inspirationArticle.ts → appointmentCta",
    imagePath: imageLabel(
      inspirationArticlePage.appointmentCta.image,
      "locateCta",
    ),
    contextImageKey: "locateCta",
    pages: [{ label: "Artykuł inspiracji", href: "/inspiracja-artykul" }],
    notes: "osadzone w treści artykułu (sectionMargin)",
    render: () => (
      <LocateCta
        sectionMargin
        title={inspirationArticlePage.appointmentCta.title}
        description={inspirationArticlePage.appointmentCta.description}
        ctaLabel={inspirationArticlePage.appointmentCta.ctaLabel}
        image={inspirationArticlePage.appointmentCta.image}
        onCtaClick={noop}
      />
    ),
  },
  {
    id: "locate-pdp-gallery-banner",
    family: "LocateCta",
    title: "Dobierz umywalkę ORiSTO do szafki (PDP)",
    dataSource: "montebianco-80.ts → galleryBanner",
    imagePath: imageLabel(pdpGalleryBanner.image),
    pages: [{ label: "Produkt (PDP)", href: "/produkt" }],
    notes: "sectionMargin, eyebrow, link CTA",
    render: () => (
      <LocateCta
        sectionMargin
        eyebrow={pdpGalleryBanner.eyebrow}
        title={pdpGalleryBanner.title}
        titleId="showcase-gallery-banner-title"
        description={pdpGalleryBanner.description}
        ctaHref={pdpGalleryBanner.href}
        ctaLabel={pdpGalleryBanner.label}
        image={pdpGalleryBanner.image}
      />
    ),
  },
  {
    id: "locate-architect-catalog",
    family: "LocateCta",
    title: "Zobacz pełną bazę katalogów (strefa architekta)",
    dataSource: "architectZone.ts → downloads.catalogCta",
    imagePath: imageLabel(architectZonePage.downloads.catalogCta.image),
    pages: [{ label: "Strefa architekta", href: "/strefa-architekta" }],
    notes: "CatalogDatabaseCta → LocateCta embedded pod listą plików",
    render: () => (
      <CatalogDatabaseCta {...architectZonePage.downloads.catalogCta} />
    ),
  },
  {
    id: "advisor-home",
    family: "AdvisorCta",
    title: "Nie wiesz, od czego zacząć? (strona główna)",
    dataSource: "home.ts → homeAdvisorCta",
    imagePath: imageLabel(homeAdvisorCta.image, "advisorConsultation"),
    contextImageKey: "advisorConsultation",
    pages: [{ label: "Strona główna", href: "/" }],
    notes: "HomeAdvisorCta wrapper, primaryAction: ask",
    render: () => <HomeAdvisorCta onPrimaryClick={noop} />,
  },
  {
    id: "advisor-category",
    family: "AdvisorCta",
    title: "Nie wiesz, od czego zacząć? (kategoria)",
    dataSource: "category.ts → categoryPage.advisorCta",
    imagePath: imageLabel(categoryPage.advisorCta.image, "advisorConsultation"),
    contextImageKey: "advisorConsultation",
    pages: [{ label: "Kategoria", href: "/kategoria" }],
    notes: "HomeAdvisorCta z copy kategorii",
    render: () => (
      <HomeAdvisorCta
        titleId="showcase-category-advisor-title"
        content={categoryAdvisorContent}
        onPrimaryClick={noop}
      />
    ),
  },
  {
    id: "advisor-subcategory",
    family: "AdvisorCta",
    title: "Nie wiesz, która umywalka pasuje? (podkategoria)",
    dataSource: "subcategory.ts → subcategoryAdvisorCta",
    imagePath: imageLabel(subcategoryAdvisorCta.image, "bathroomGreen"),
    contextImageKey: "bathroomGreen",
    pages: [{ label: "Podkategoria", href: "/podkategoria" }],
    notes: "primaryAction: book",
    render: () => (
      <AdvisorCta
        titleId="showcase-subcategory-advisor-title"
        content={subcategoryAdvisorContent}
        primaryAction="book"
        onBookOpen={noop}
      />
    ),
  },
  {
    id: "advisor-listing",
    family: "AdvisorCta",
    title: "Nie wiesz, która umywalka pasuje? (listing)",
    dataSource: "listing.ts → listingPage.advisorCta",
    imagePath: imageLabel(listingPage.advisorCta.image, "bathroomGreen"),
    contextImageKey: "bathroomGreen",
    pages: [{ label: "Listing", href: "/listing" }],
    render: () => (
      <HomeAdvisorCta
        titleId="showcase-listing-advisor-title"
        content={listingAdvisorContent}
        onPrimaryClick={noop}
      />
    ),
  },
  {
    id: "advisor-inspirations-footer",
    family: "AdvisorCta",
    title: "Chcesz podobną łazienkę u siebie? (stopka listingu inspiracji)",
    dataSource: "inspirationsListing.ts → footerAdvisorCta",
    imagePath: imageLabel(
      inspirationsListingPage.footerAdvisorCta.image,
      "bathroomGreen",
    ),
    contextImageKey: "bathroomGreen",
    pages: [{ label: "Inspiracje - listing", href: "/inspiracje-listing" }],
    notes: "primaryAction: book, askHref → /salony",
    render: () => (
      <AdvisorCta
        titleId="showcase-inspirations-footer-advisor-title"
        content={inspirationsListingPage.footerAdvisorCta}
        onBookOpen={noop}
        primaryAction="book"
      />
    ),
  },
  {
    id: "advisor-article-final",
    family: "AdvisorCta",
    title: "Skonsultuj podobną łazienkę w salonie (artykuł)",
    dataSource: "inspirationArticle.ts → finalCta",
    imagePath: imageLabel(
      inspirationArticlePage.finalCta.image,
      "bathroomGreen",
    ),
    contextImageKey: "bathroomGreen",
    pages: [{ label: "Artykuł inspiracji", href: "/inspiracja-artykul" }],
    render: () => (
      <AdvisorCta
        titleId="showcase-article-final-advisor-title"
        content={articleFinalAdvisorContent}
        onAskOpen={noop}
        onBookOpen={noop}
      />
    ),
  },
  {
    id: "advisor-producer",
    family: "AdvisorCta",
    title: "Zobacz Vigour na żywo w salonie",
    dataSource: "producers.ts → producerPage.cta",
    imagePath: imageLabel(producerPage.cta.image, "salonBydgoszcz"),
    contextImageKey: "salonBydgoszcz",
    pages: [{ label: "Producent", href: "/producent" }],
    render: () => (
      <AdvisorCta
        titleId="showcase-producer-advisor-title"
        content={producerAdvisorContent}
        onAskOpen={noop}
        onBookOpen={noop}
      />
    ),
  },
  {
    id: "advisor-producers",
    family: "AdvisorCta",
    title: "Nie wiesz, którą markę wybrać? (producenci)",
    dataSource: "producers.ts → producersPage.cta",
    imagePath: imageLabel(producersPage.cta.image, "salonBydgoszcz"),
    contextImageKey: "salonBydgoszcz",
    pages: [{ label: "Producenci", href: "/producenci" }],
    notes: "primaryAction: book",
    render: () => (
      <AdvisorCta
        titleId="showcase-producers-advisor-title"
        content={producersAdvisorContent}
        onBookOpen={noop}
        primaryAction="book"
      />
    ),
  },
  {
    id: "advisor-architect-zone",
    family: "AdvisorCta",
    title: "Rozpocznij współpracę z Elements",
    dataSource: "architectZone.ts → advisor",
    imagePath: imageLabel(
      architectZonePage.advisor.image,
      "advisorConsultation",
    ),
    contextImageKey: "advisorConsultation",
    pages: [{ label: "Strefa architekta", href: "/strefa-architekta" }],
    render: () => (
      <AdvisorCta
        titleId="showcase-architect-advisor-title"
        content={architectAdvisorContent}
        onAskOpen={noop}
        onBookOpen={noop}
      />
    ),
  },
  {
    id: "advisor-salon-visit",
    family: "AdvisorCta",
    title: "Zaplanuj wizytę w salonie Bydgoszcz",
    dataSource: "salon.ts → visit",
    imagePath: imageLabel(salonPage.visit.image, "salonBydgoszcz"),
    contextImageKey: "salonBydgoszcz",
    pages: [{ label: "Salon", href: "/salon" }],
    notes: "SalonVisitCta, primaryAction: book",
    render: () => <SalonVisitCta onAskOpen={noop} />,
  },
  {
    id: "promo-pdp-architect",
    family: "PromoSplitCta",
    title: "Projektujesz zawodowo? (PDP)",
    dataSource: "montebianco-80.ts → architectCta",
    imagePath: imageLabel(montebianco80.architectCta.image, "washbasin"),
    contextImageKey: "washbasin",
    pages: [{ label: "Produkt (PDP)", href: "/produkt" }],
    notes: "ProductArchitectCTA wrapper",
    render: () => <ProductArchitectCTA {...montebianco80.architectCta} />,
  },
  {
    id: "promo-pdp-visualization",
    family: "PromoSplitCta",
    title: "Chcesz zobaczyć możliwości Twojej nowej łazienki? (PDP)",
    dataSource: "montebianco-80.ts → visualizationCta",
    imagePath: imageLabel(
      montebianco80.visualizationCta.image,
      "bathroomGreen",
    ),
    contextImageKey: "bathroomGreen",
    pages: [{ label: "Produkt (PDP)", href: "/produkt" }],
    notes: "ProductVisualizationCTA, primary + secondary link",
    render: () => (
      <ProductVisualizationCTA {...montebianco80.visualizationCta} />
    ),
  },
  {
    id: "promo-architect-invite",
    family: "PromoSplitCta",
    title: "Zaproś klienta do salonu",
    dataSource: "architectZone.ts → inviteSalon",
    imagePath: imageLabel(
      architectZonePage.inviteSalon.image,
      "salonBydgoszcz",
    ),
    contextImageKey: "salonBydgoszcz",
    pages: [{ label: "Strefa architekta", href: "/strefa-architekta" }],
    notes: "variant: card, lista bulletów, zdjęcie salonu (bez video)",
    render: () => (
      <PromoSplitCta
        titleId="showcase-architect-invite-title"
        variant="card"
        eyebrow={architectZonePage.inviteSalon.eyebrow}
        title={architectZonePage.inviteSalon.title}
        description={architectZonePage.inviteSalon.description}
        items={[...architectZonePage.inviteSalon.items]}
        image={architectZonePage.inviteSalon.image}
      />
    ),
  },
  {
    id: "promo-architect-loyalty",
    family: "PromoSplitCta",
    title: "Program lojalnościowy architekta",
    dataSource: "architectZone.ts → loyalty",
    imagePath: imageLabel(
      architectZonePage.loyalty.image,
      "architectWorkspace",
    ),
    contextImageKey: "architectWorkspace",
    pages: [{ label: "Strefa architekta", href: "/strefa-architekta" }],
    notes: "variant: card, mediaPosition: end",
    render: () => (
      <PromoSplitCta
        titleId="showcase-architect-loyalty-title"
        variant="card"
        mediaPosition="end"
        eyebrow={architectZonePage.loyalty.eyebrow}
        title={architectZonePage.loyalty.title}
        description={architectZonePage.loyalty.description}
        image={architectZonePage.loyalty.image}
        primary={{
          href: architectZonePage.loyalty.ctaHref,
          label: architectZonePage.loyalty.ctaLabel,
        }}
      />
    ),
  },
  {
    id: "promo-salon-design",
    family: "PromoSplitCta",
    title: "Zaprojektuj łazienkę z doradcą Elements",
    dataSource: "salon.ts → design",
    imagePath: imageLabel(salonPage.design.image, "salonExpo"),
    contextImageKey: "salonExpo",
    pages: [{ label: "Salon", href: "/salon" }],
    notes: "SalonDesignStrip",
    render: () => <SalonDesignStrip />,
  },
  {
    id: "magazine-home",
    family: "HomeMagazine",
    title: "Magazyn TOP TRENDY 2026 (strona główna)",
    dataSource: "home.ts → homeMagazine",
    imagePath: imageLabel(homeMagazine.image),
    pages: [
      { label: "Strona główna", href: "/" },
      { label: "Salon", href: "/salon" },
    ],
    render: () => <HomeMagazine />,
  },
  {
    id: "magazine-producer",
    family: "HomeMagazine",
    title: "Magazyn TOP TRENDY - Vigour",
    dataSource: "producers.ts → producerPage.magazine",
    imagePath: imageLabel(producerPage.magazine.image),
    pages: [{ label: "Producent", href: "/producent" }],
    render: () => <HomeMagazine content={producerPage.magazine} />,
  },
  {
    id: "magazine-article",
    family: "HomeMagazine",
    title: "Produkty z tej aranżacji w magazynie",
    dataSource: "inspirationArticle.ts → magazine",
    imagePath: imageLabel(inspirationArticlePage.magazine.image),
    pages: [{ label: "Artykuł inspiracji", href: "/inspiracja-artykul" }],
    notes: "osadzone w treści artykułu",
    render: () => <HomeMagazine content={inspirationArticlePage.magazine} />,
  },
  {
    id: "promo-tile-listing",
    family: "ListingPromoTile",
    title: "Magazyn Elements 2026 (siatka listingu)",
    dataSource: "listing.ts → listingPage.gridPromo",
    imagePath: imageLabel(listingPage.gridPromo.image),
    pages: [{ label: "Listing", href: "/listing" }],
    notes: "afterIndex: 6 w siatce produktów",
    render: () => <ListingPromoTile promo={listingPage.gridPromo} />,
  },
  {
    id: "promo-tile-arrangements",
    family: "ListingPromoTile",
    title: "Magazyn TOP TRENDY 2026 (siatka galerii aranżacji)",
    dataSource: "arrangementsGallery.ts → gridPromo",
    imagePath: imageLabel(arrangementsGalleryPage.gridPromo.image),
    pages: [{ label: "Galeria aranżacji", href: "/galeria-aranzacji" }],
    notes: "afterIndex: 6 w siatce aranżacji",
    render: () => (
      <ListingPromoTile promo={arrangementsGalleryPage.gridPromo} />
    ),
  },
  {
    id: "category-promo-umywalki",
    family: "CategoryPromoBanner",
    title: "Umywalki Duravit - do -25%",
    dataSource: "category.ts → categoryRows[0].banner",
    imagePath: imageLabel(umywalkiPromo.image),
    pages: [{ label: "Kategoria", href: "/kategoria" }],
    notes: "w wierszu Umywalki na /kategoria",
    render: () => <CategoryPromoBanner {...umywalkiPromo} />,
  },
];

export const ctaShowcaseFamilies: {
  family: CtaShowcaseFamily;
  label: string;
}[] = [
  { family: "LocateCta", label: "LocateCta (ciemny split)" },
  { family: "AdvisorCta", label: "AdvisorCta (złoty split)" },
  { family: "PromoSplitCta", label: "PromoSplitCta (złoty split + linki)" },
  { family: "HomeMagazine", label: "HomeMagazine (promo / magazyn)" },
  { family: "ListingPromoTile", label: "ListingPromoTile (promo w siatce)" },
  {
    family: "CategoryPromoBanner",
    label: "CategoryPromoBanner (promo kategorii)",
  },
];

function buildContextImageUsage(): Record<string, string[]> {
  const usage = Object.fromEntries(
    Object.keys(ctaContextImages).map((key) => [key, [] as string[]]),
  ) as Record<keyof typeof ctaContextImages, string[]>;

  for (const entry of ctaShowcaseEntries) {
    if (entry.contextImageKey) {
      usage[entry.contextImageKey].push(entry.title);
    }
  }

  return usage;
}

export const ctaContextImageUsage = buildContextImageUsage();
