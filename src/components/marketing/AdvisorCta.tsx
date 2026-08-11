import type { ReactNode } from "react";
import { homeAdvisorCta } from "../../data/home";
import { requestSalonDrawer } from "../../hooks/useSelectedSalon";
import { cn } from "../../lib/cn";
import type { ProductImage } from "../../types/product";
import { SplitMediaCta } from "../structural/SplitMediaCta";
import { splitMediaCtaButtonClassName } from "../structural/splitMediaCtaButtonClassName";
import { Button } from "../ui/Button";

export type AdvisorCtaContent = {
  id?: string;
  eyebrow: string;
  title: string;
  description: string;
  note?: string;
  image: ProductImage;
  askLabel: string;
  bookLabel: string;
  /** Used when `onAskOpen` is omitted - primary/secondary ask becomes a link. */
  askHref?: string;
};

const homeAdvisorContent: AdvisorCtaContent = {
  eyebrow: homeAdvisorCta.eyebrow,
  title: homeAdvisorCta.title,
  description: homeAdvisorCta.description,
  image: homeAdvisorCta.image,
  askLabel: homeAdvisorCta.primaryCta.label,
  bookLabel: homeAdvisorCta.secondaryCta.label,
  askHref: homeAdvisorCta.primaryCta.href,
};

type AdvisorCtaProps = {
  titleId?: string;
  content?: AdvisorCtaContent;
  /** Opens ask drawer / flow. When set, ask is a button instead of `askHref`. */
  onAskOpen?: () => void;
  /** Which CTA is the primary (filled) button. Home uses ask; salon visit uses book. */
  primaryAction?: "ask" | "book";
  className?: string;
};

function AskButton({
  label,
  onAskOpen,
  askHref,
}: {
  label: string;
  onAskOpen?: () => void;
  askHref?: string;
}) {
  if (onAskOpen) {
    return (
      <Button
        as="button"
        type="button"
        variant="primary"
        size="lg"
        className={splitMediaCtaButtonClassName}
        onClick={onAskOpen}
      >
        {label}
        <i className="ph ph-arrow-right" aria-hidden="true" />
      </Button>
    );
  }

  return (
    <Button
      href={askHref ?? "#"}
      variant="primary"
      size="lg"
      className={splitMediaCtaButtonClassName}
    >
      {label}
      <i className="ph ph-arrow-right" aria-hidden="true" />
    </Button>
  );
}

function BookButton({ label, variant }: { label: string; variant: "primary" | "secondary" }) {
  return (
    <Button
      as="button"
      type="button"
      variant={variant}
      size="lg"
      className={splitMediaCtaButtonClassName}
      onClick={requestSalonDrawer}
    >
      {label}
      {variant === "primary" ? (
        <i className="ph ph-arrow-right" aria-hidden="true" />
      ) : null}
    </Button>
  );
}

/**
 * Shared advisor / visit band (SplitMediaCta) - home, category, subcategory, salon.
 * Prefer this over page-specific duplicates.
 */
export function AdvisorCta({
  titleId = "advisor-cta-title",
  content = homeAdvisorContent,
  onAskOpen,
  primaryAction = "ask",
  className,
}: AdvisorCtaProps) {
  const ask = (
    <AskButton
      label={content.askLabel}
      onAskOpen={onAskOpen}
      askHref={content.askHref}
    />
  );
  const book = (
    <BookButton
      label={content.bookLabel}
      variant={primaryAction === "book" ? "primary" : "secondary"}
    />
  );

  // When book is primary, ask becomes secondary (button or link styled as secondary).
  let actions: ReactNode;
  if (primaryAction === "book") {
    const askSecondary = onAskOpen ? (
      <Button
        as="button"
        type="button"
        variant="secondary"
        size="lg"
        className={splitMediaCtaButtonClassName}
        onClick={onAskOpen}
      >
        {content.askLabel}
      </Button>
    ) : (
      <Button
        href={content.askHref ?? "#"}
        variant="secondary"
        size="lg"
        className={splitMediaCtaButtonClassName}
      >
        {content.askLabel}
      </Button>
    );
    actions = (
      <>
        {book}
        {askSecondary}
      </>
    );
  } else {
    actions = (
      <>
        {ask}
        {book}
      </>
    );
  }

  return (
    <SplitMediaCta
      id={content.id}
      titleId={titleId}
      eyebrow={content.eyebrow}
      title={content.title}
      description={content.description}
      note={content.note}
      image={content.image}
      className={cn(
        "relative z-10 isolate py-[clamp(2rem,5vw,3rem)] md:py-[clamp(2.5rem,6vw,4rem)]",
        className,
      )}
      actions={actions}
    />
  );
}
