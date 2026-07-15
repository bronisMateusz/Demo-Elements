import { cn } from "../../lib/cn";

export type ProductCarouselTab = "similar" | "recent";

type ProductCarouselTabsHeaderProps = {
  activeTab: ProductCarouselTab;
  onTabChange: (tab: ProductCarouselTab) => void;
  similarLabel?: string;
  recentLabel?: string;
  showRecentTab?: boolean;
};

export function ProductCarouselTabsHeader({
  activeTab,
  onTabChange,
  similarLabel = "Produkty podobne",
  recentLabel = "Ostatnio oglądane",
  showRecentTab = true,
}: ProductCarouselTabsHeaderProps) {
  const tabClassName = (isActive: boolean) =>
    cn(
      "t-h2 cursor-pointer border-0 bg-transparent p-0 font-heading transition-colors duration-fast ease-out",
      isActive ? "text-neutral-900" : "text-neutral-300 hover:text-neutral-500",
    );

  return (
    <div
      className="mb-10 flex flex-wrap items-baseline gap-x-8 gap-y-3 md:mb-12"
      role="tablist"
      aria-label="Karuzela produktów"
    >
      <button
        type="button"
        role="tab"
        id="similar-title"
        className={tabClassName(activeTab === "similar")}
        aria-selected={activeTab === "similar"}
        onClick={() => onTabChange("similar")}
      >
        {similarLabel}
      </button>
      {showRecentTab ? (
        <button
          type="button"
          role="tab"
          id="recent-title"
          className={tabClassName(activeTab === "recent")}
          aria-selected={activeTab === "recent"}
          onClick={() => onTabChange("recent")}
        >
          {recentLabel}
        </button>
      ) : null}
    </div>
  );
}
