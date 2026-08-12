import type {
  ListingFacetKey,
  ListingFilterState,
  ListingProduct,
  ListingQuickFilter,
  ListingSortId,
} from "../types/listing";

/** Parse Polish price strings like "1 990,00 zł" / "254,00 zł" to a number. */
export function parseListingPrice(price: string | undefined): number {
  if (!price) return Number.POSITIVE_INFINITY;
  const normalized = price
    .replace(/\s/g, "")
    .replace("zł", "")
    .replace(",", ".")
    .replace(/[^\d.]/g, "");
  const value = Number.parseFloat(normalized);
  return Number.isFinite(value) ? value : Number.POSITIVE_INFINITY;
}

export function listingFilterHasActive(state: ListingFilterState): boolean {
  return listingFilterActiveCount(state) > 0;
}

/** Selected quick filters + facet values (each checkbox counts as 1). */
export function listingFilterActiveCount(state: ListingFilterState): number {
  const facetCount = (Object.keys(state.facets) as ListingFacetKey[]).reduce(
    (sum, key) => sum + state.facets[key].length,
    0,
  );
  return state.quick.length + facetCount;
}

function matchesFacet(
  product: ListingProduct,
  key: ListingFacetKey,
  selected: string[],
): boolean {
  if (selected.length === 0) return true;
  return selected.includes(product[key]);
}

function matchesQuick(
  product: ListingProduct,
  quick: ListingQuickFilter[],
): boolean {
  if (quick.length === 0) return true;
  // “Pokaż tylko” is a union - any selected badge matches.
  return quick.some((flag) => Boolean(product.flags[flag]));
}

function sortProducts(
  products: ListingProduct[],
  sort: ListingSortId,
): ListingProduct[] {
  const next = [...products];
  switch (sort) {
    case "price-asc":
      return next.sort(
        (a, b) => parseListingPrice(a.price) - parseListingPrice(b.price),
      );
    case "price-desc":
      return next.sort(
        (a, b) => parseListingPrice(b.price) - parseListingPrice(a.price),
      );
    case "name":
      return next.sort((a, b) => a.title.localeCompare(b.title, "pl"));
    case "popular":
    default:
      return next.sort((a, b) => b.popularity - a.popularity);
  }
}

export function filterAndSortListingProducts(
  products: readonly ListingProduct[],
  state: ListingFilterState,
): ListingProduct[] {
  const filtered = products.filter((product) => {
    const facetsOk = (Object.keys(state.facets) as ListingFacetKey[]).every(
      (key) => matchesFacet(product, key, state.facets[key]),
    );
    return facetsOk && matchesQuick(product, state.quick);
  });
  return sortProducts(filtered, state.sort);
}

export function toggleFacetValue(
  state: ListingFilterState,
  key: ListingFacetKey,
  value: string,
): ListingFilterState {
  const current = state.facets[key];
  const nextValues = current.includes(value)
    ? current.filter((item) => item !== value)
    : [...current, value];
  return {
    ...state,
    facets: {
      ...state.facets,
      [key]: nextValues,
    },
  };
}

export function toggleQuickFilter(
  state: ListingFilterState,
  id: ListingQuickFilter,
): ListingFilterState {
  const nextQuick = state.quick.includes(id)
    ? state.quick.filter((item) => item !== id)
    : [...state.quick, id];
  return { ...state, quick: nextQuick };
}
