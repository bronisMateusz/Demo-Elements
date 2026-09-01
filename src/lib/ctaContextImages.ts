import { assetUrl } from "../app/assets";
import type { ProductImage } from "../types/product";

function ctaImage(
  path: string,
  alt: string,
  focalPoint?: ProductImage["focalPoint"],
): ProductImage {
  return {
    src: assetUrl(path),
    alt,
    fit: "cover",
    ...(focalPoint ? { focalPoint } : {}),
  };
}

/** Lifestyle / salon photos for SplitMedia and advisor CTA bands - pick by page context. */
export const ctaContextImages = {
  homeAdvisor: ctaImage(
    "home/about-salon.png",
    "Salon Elements - rozmowa z doradcą",
    {
      x: 50,
      y: 40,
    },
  ),
  /** Dark split LocateCta - „Umów spotkanie w salonie” bands. */
  locateCta: ctaImage(
    "home/locate-cta.webp",
    "Doradca Elements omawia wybór płytek z klientem w salonie",
    { x: 50, y: 50 },
  ),
  advisorConsultation: ctaImage(
    "home/advisor-consultation.jpg",
    "Doradca Elements omawia projekt łazienki z klientem",
    { x: 50, y: 45 },
  ),
  washbasin: ctaImage(
    "home/inspiration-oristo-pillow.jpg",
    "Łazienka z umywalką na ekspozycji",
    { x: 50, y: 55 },
  ),
  bathroomWarm: ctaImage(
    "home/inspiration-warm-minimal.jpg",
    "Ciepła łazienka z drewnianymi akcentami",
    { x: 50, y: 55 },
  ),
  bathroomGreen: ctaImage(
    "home/inspiration-deep-green.png",
    "Łazienka w głębokiej zieleni",
    { x: 50, y: 55 },
  ),
  architectWorkspace: ctaImage(
    "home/architect-loyalty.jpg",
    "Architekt przy pracy nad projektem w biurze",
    { x: 50, y: 45 },
  ),
  salonExpo: ctaImage(
    "salon/expo/bydgoszcz-4.png",
    "Ekspozycja łazienki w salonie Elements",
    { x: 50, y: 45 },
  ),
  salonBydgoszcz: ctaImage(
    "salon/bydgoszcz-hero_upscayl_2x_upscayl-standard-4x.png",
    "Salon Elements Bydgoszcz",
    { x: 50, y: 40 },
  ),
  producerShowroom: ctaImage(
    "home/hero-vanity-minimal.png",
    "Ekspozycja producenta w salonie",
    { x: 55, y: 45 },
  ),
  articleArrangement: ctaImage(
    "home/lazienka-na-pietrze-wariant-a-wiz-5.png",
    "Aranżacja łazienki na poddaszu",
    { x: 0, y: 100 },
  ),
  inspirationListing: ctaImage(
    "inspirations/listing/06-zielony-kamien.png",
    "Zielona łazienka z kamieniem",
    { x: 50, y: 55 },
  ),
} as const satisfies Record<string, ProductImage>;
