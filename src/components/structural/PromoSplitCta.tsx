import type { ProductImage } from "../../types/product";
import { Button } from "../ui/Button";
import { SplitMediaCta } from "./SplitMediaCta";
import { splitMediaCtaButtonClassName } from "./splitMediaCtaButtonClassName";

type PromoSplitCtaLink = {
  href: string;
  label: string;
};

type PromoSplitCtaProps = {
  id?: string;
  titleId: string;
  eyebrow: string;
  title: string;
  description?: string;
  items?: readonly string[];
  note?: string;
  image: ProductImage;
  video?: string;
  titleIconClass?: string;
  className?: string;
  /** When omitted, the banner renders without CTA buttons. */
  primary?: PromoSplitCtaLink;
  secondary?: PromoSplitCtaLink;
  variant?: "banner" | "card";
  mediaPosition?: "start" | "end";
};

/** SplitMediaCta with optional primary (+ secondary) link actions. */
export function PromoSplitCta({
  id,
  titleId,
  eyebrow,
  title,
  description,
  items,
  note,
  image,
  video,
  titleIconClass,
  className,
  primary,
  secondary,
  variant = "banner",
  mediaPosition = "start",
}: PromoSplitCtaProps) {
  const isCard = variant === "card";
  const actions = primary ? (
    <>
      <Button
        href={primary.href}
        variant={isCard ? "secondary" : "primary"}
        size={isCard ? "md" : "lg"}
        className={isCard ? "w-fit" : splitMediaCtaButtonClassName}
      >
        {primary.label}
        <i className="ph ph-arrow-right" aria-hidden="true" />
      </Button>
      {secondary ? (
        <Button
          href={secondary.href}
          variant="secondary"
          size={isCard ? "md" : "lg"}
          className={isCard ? "w-fit" : splitMediaCtaButtonClassName}
        >
          {secondary.label}
        </Button>
      ) : null}
    </>
  ) : undefined;

  return (
    <SplitMediaCta
      id={id}
      titleId={titleId}
      eyebrow={eyebrow}
      title={title}
      description={description}
      items={items}
      note={note}
      image={image}
      video={video}
      titleIconClass={titleIconClass}
      className={className}
      variant={variant}
      mediaPosition={mediaPosition}
      actions={actions}
    />
  );
}
