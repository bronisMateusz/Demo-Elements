import { requestSalonDrawer } from "../../hooks/useSelectedSalon";
import { cn } from "../../lib/cn";
import type { ProductImage } from "../../types/product";
import {
  SplitMediaCta,
  type SplitMediaCtaSecondary,
} from "../structural/SplitMediaCta";
import { splitMediaCtaButtonClassName } from "../structural/splitMediaCtaButtonClassName";
import { Button } from "../ui/Button";
import type { ReactNode } from "react";

export type AdvisorCtaSecondaryContent = {
  eyebrow?: string;
  title: string;
  titleId?: string;
  description: string;
  ctaLabel: string;
  /** Link CTA. Ignored when `onCtaClick` is set. */
  href?: string;
  onCtaClick?: () => void;
};

export type AdvisorCtaContent = {
  id?: string;
  eyebrow: string;
  title: string;
  /** Optional second-line lead under the title. */
  lead?: string;
  description: string;
  note?: string;
  /** When omitted, the media column is hidden. */
  image?: ProductImage;
  askLabel: string;
  bookLabel: string;
  /** Used when `onAskOpen` is omitted - primary/secondary ask becomes a link. */
  askHref?: string;
  /** Optional book link. When omitted, book opens the salon drawer. */
  bookHref?: string;
  /** Second column (HomePartners-style duo). Hides media when set. */
  secondary?: AdvisorCtaSecondaryContent;
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
  /** Hide the book CTA (e.g. duo layout with only ask on the left). */
  showBook?: boolean;
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
  showBook = true,
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

  const includeBook = showBook && !content.secondary;

  // When book is primary, ask becomes secondary (button or link styled as secondary).
  let actions: ReactNode;
  if (!includeBook) {
    actions = ask;
  } else if (primaryAction === "book") {
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

  let secondary: SplitMediaCtaSecondary | undefined;
  if (content.secondary) {
    const secondaryCta = content.secondary.onCtaClick ? (
      <Button
        as="button"
        type="button"
        variant="primary"
        size="lg"
        className={splitMediaCtaButtonClassName}
        onClick={content.secondary.onCtaClick}
      >
        {content.secondary.ctaLabel}
      </Button>
    ) : (
      <Button
        href={content.secondary.href ?? "#"}
        variant="primary"
        size="lg"
        className={splitMediaCtaButtonClassName}
      >
        {content.secondary.ctaLabel}
        <i className="ph ph-arrow-right" aria-hidden="true" />
      </Button>
    );

    secondary = {
      eyebrow: content.secondary.eyebrow,
      title: content.secondary.title,
      titleId: content.secondary.titleId ?? `${titleId}-secondary`,
      description: content.secondary.description,
      actions: secondaryCta,
    };
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
      secondary={secondary}
      className={cn("relative z-10 isolate", className)}
      actions={actions}
    />
  );
}
