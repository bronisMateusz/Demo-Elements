/** Zero-padded slide index for carousel footers, e.g. `01 / 04`. */
export function formatSlideIndex(index: number, total: number) {
  return `${String(index + 1).padStart(2, "0")} / ${String(total).padStart(2, "0")}`;
}
