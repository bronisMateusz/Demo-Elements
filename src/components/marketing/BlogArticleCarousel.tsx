import { EditorialCarousel, type EditorialCardItem } from "./EditorialCarousel";

export type BlogArticle = Omit<EditorialCardItem, "date">;

type BlogArticleCarouselProps = {
  id?: string;
  title: string;
  titleId?: string;
  articles: BlogArticle[];
  seeAllLabel: string;
  seeAllHref: string;
};

/** @deprecated Prefer EditorialCarousel - thin alias with see-all CTA. */
export function BlogArticleCarousel({
  id = "blog",
  title,
  titleId = "blog-title",
  articles,
  seeAllLabel,
  seeAllHref,
}: BlogArticleCarouselProps) {
  return (
    <EditorialCarousel
      id={id}
      title={title}
      titleId={titleId}
      items={articles}
      seeAll={{ label: seeAllLabel, href: seeAllHref }}
      a11yPrevLabel="Poprzednie artykuły"
      a11yNextLabel="Następne artykuły"
    />
  );
}
