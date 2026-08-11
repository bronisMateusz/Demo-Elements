/** Page numbers and ellipsis markers for listing pager UI. */
export type ListingPageItem = number | "ellipsis";

/**
 * Builds a compact page list: first / window around current / last.
 * Example (page 4 of 52): `1 2 3 4 5 6 … 52`.
 */
export function buildListingPageItems(
  page: number,
  pageCount: number,
): ListingPageItem[] {
  if (pageCount <= 1) return [1];
  if (pageCount <= 7) {
    return Array.from({ length: pageCount }, (_, index) => index + 1);
  }

  let start = Math.max(2, page - 2);
  let end = Math.min(pageCount - 1, page + 2);

  if (end - start < 4) {
    if (start === 2) end = Math.min(pageCount - 1, start + 4);
    else if (end === pageCount - 1) start = Math.max(2, end - 4);
  }

  const items: ListingPageItem[] = [1];
  if (start > 2) items.push("ellipsis");
  for (let value = start; value <= end; value += 1) items.push(value);
  if (end < pageCount - 1) items.push("ellipsis");
  items.push(pageCount);
  return items;
}
