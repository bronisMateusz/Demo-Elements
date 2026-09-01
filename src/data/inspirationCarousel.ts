import type { InspirationArrangement } from "../types/product";
import { arrangementsGalleryItems } from "./arrangementsGallery";
import {
  INSPIRATION_CAROUSEL_COUNT,
  inspirationsListingItems,
} from "./inspirationsListing";

/** First N listing cards for InspirationGallery carousels - odd slides from latest producer gallery posts. */
export function inspirationCarouselArrangements(
  idPrefix: string,
  count = INSPIRATION_CAROUSEL_COUNT,
): InspirationArrangement[] {
  const producerSlots = Math.ceil(count / 2);

  return Array.from({ length: count }, (_, index) => {
    const slot = index + 1;

    if (index % 2 === 0) {
      const item = inspirationsListingItems[Math.floor(index / 2)];
      if (!item) {
        throw new Error(
          `inspirationCarouselArrangements: need ${Math.ceil(count / 2)} inspiration listing items, got ${inspirationsListingItems.length}`,
        );
      }

      return {
        id: `${idPrefix}-${slot}`,
        title: item.title,
        image: item.image,
        items: item.items,
        href: item.href,
      };
    }

    const producer = arrangementsGalleryItems[Math.floor(index / 2)];
    if (!producer) {
      throw new Error(
        `inspirationCarouselArrangements: need ${producerSlots} producer gallery items, got ${arrangementsGalleryItems.length}`,
      );
    }

    return {
      id: `${idPrefix}-${slot}`,
      title: producer.title,
      image: producer.image,
      items: producer.items,
      showProducts: true as const,
      products: producer.products ? [...producer.products] : [],
    };
  });
}
