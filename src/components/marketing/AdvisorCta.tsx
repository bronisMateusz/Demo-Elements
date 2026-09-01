import { requestSalonDrawer } from "../../hooks/useSelectedSalon";
import { cn } from "../../lib/cn";
import type { ProductImage } from "../../types/product";
import { SplitMediaCta } from "../structural/SplitMediaCta";
import { splitMediaCtaButtonClassName } from "../structural/splitMediaCtaButtonClassName";
import { Button } from "../ui/Button";
import type { ReactNode } from "react";

export type AdvisorCtaContent = {
  id?: string;
  eyebrow: string;
  title: string;
  /** Optional second-line lead under the title. */
  lead?: string;
  description: string;
  note?: string;
  image: ProductImage;
  askLabel: string;
  bookLabel: string;
  /** Used when `onAskOpen` is omitted - primary/secondary ask becomes a link. */
  askHref?: string;
  /** Optional book link. When omitted, book opens the salon drawer. */
  bookHref?: string;
};

type AdvisorCtaProps = {
  titleId?: string;
  content: AdvisorCtaContent;
  /** Opens ask drawer / flow. When set, ask is a button instead of `askHref`. */
  onAskOpen?: () => void;
  /** Opens book flow (e.g. salon drawer). When set, book is a button instead of `bookHref`. */
  onBookOpen?: () => void;
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

function BookButton({
  label,
  variant,
  href,
  onClick,
}: {
  label: string;
  variant: "primary" | "secondary";
  href?: string;
  onClick?: () => void;
}) {
  const openBook = onClick ?? (href ? undefined : requestSalonDrawer);

  if (openBook) {
    return (
      <Button
        as="button"
        type="button"
        variant={variant}
        size="lg"
        className={splitMediaCtaButtonClassName}
        onClick={openBook}
      >
        {label}
      </Button>
    );
  }

  return (
    <Button
      href={href ?? "/salony"}
      variant={variant}
      size="lg"
      className={splitMediaCtaButtonClassName}
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
  content,
  onAskOpen,
  onBookOpen,
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
      href={content.bookHref}
      onClick={onBookOpen}
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
      lead={content.lead}
      description={content.description}
      note={content.note}
      image={content.image}
      className={cn("relative z-10 isolate", className)}
      actions={actions}
    />
  );
}
