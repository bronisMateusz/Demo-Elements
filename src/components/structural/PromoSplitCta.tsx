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
  note?: string;
  image: ProductImage;
  video?: string;
  titleIconClass?: string;
  className?: string;
  primary: PromoSplitCtaLink;
  secondary?: PromoSplitCtaLink;
};

/** SplitMediaCta with primary (+ optional secondary) link actions. */
export function PromoSplitCta({
  id,
  titleId,
  eyebrow,
  title,
  description,
  note,
  image,
  video,
  titleIconClass,
  className,
  primary,
  secondary,
}: PromoSplitCtaProps) {
  return (
    <SplitMediaCta
      id={id}
      titleId={titleId}
      eyebrow={eyebrow}
      title={title}
      description={description}
      note={note}
      image={image}
      video={video}
      titleIconClass={titleIconClass}
      className={className}
      actions={
        <>
          <Button
            href={primary.href}
            variant="primary"
            size="lg"
            className={splitMediaCtaButtonClassName}
          >
            {primary.label}
            <i className="ph ph-arrow-right" aria-hidden="true" />
          </Button>
          {secondary ? (
            <Button
              href={secondary.href}
              variant="secondary"
              size="lg"
              className={splitMediaCtaButtonClassName}
            >
              {secondary.label}
            </Button>
          ) : null}
        </>
      }
    />
  );
}
