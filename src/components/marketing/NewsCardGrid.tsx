import {
  EditorialCarousel,
  type EditorialCardItem,
} from "./EditorialCarousel";

export type NewsCardItem = EditorialCardItem & { date: string };

type NewsCardGridProps = {
  id?: string;
  title: string;
  titleId?: string;
  items: NewsCardItem[];
};

/** @deprecated Prefer EditorialCarousel - thin alias for salon news. */
export function NewsCardGrid({
  id,
  title,
  titleId = "news-grid-title",
  items,
}: NewsCardGridProps) {
  return (
    <EditorialCarousel
      id={id}
      title={title}
      titleId={titleId}
      items={items}
      a11yPrevLabel="Poprzednie aktualności"
      a11yNextLabel="Następne aktualności"
    />
  );
}
