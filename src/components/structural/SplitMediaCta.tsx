import type { ReactNode } from "react";
import { motion, useReducedMotion } from "motion/react";
import { assetUrl } from "../../app/assets";
import { useMotionReduced } from "../../hooks/useMotionReduced";
import { useScrollExpandInset } from "../../hooks/useScrollExpandInset";
import { EASE_OUT } from "../../lib/motionEase";
import { productImageObjectPosition } from "../../lib/productImageStyle";
import type { ProductImage } from "../../types/product";
import { BrandMotif } from "../brand/BrandMotif";
import { TextRevealLead } from "../motion/TextRevealLead";
import { Container } from "../ui/Container";
import { Eyebrow } from "../ui/Eyebrow";
import { cn } from "../../lib/cn";
import { sectionBandPaddingClassName } from "../../lib/layoutTokens";

export type SplitMediaCtaSecondary = {
  eyebrow?: string;
  title: string;
  titleId: string;
  description?: string;
  actions?: ReactNode;
};

type SplitMediaCtaProps = {
  id?: string;
  titleId: string;
  eyebrow: string;
  title: string;
  /** Optional second headline under the title. */
  lead?: string;
  description?: string;
  /** Optional bullet list under the description. */
  items?: readonly string[];
  note?: string;
  /** When omitted, the media column is hidden. */
  image?: ProductImage;
  /** Path under `assets/` - looped background video for the media panel. */
  video?: string;
  /** Optional Phosphor icon before the title (e.g. architect cube). */
  titleIconClass?: string;
  actions?: ReactNode;
  /**
   * Second copy panel - renders a HomePartners-style 2-col grid
   * (media is ignored when set).
   */
  secondary?: SplitMediaCtaSecondary;
  className?: string;
  /**
   * `banner` - full-bleed gold SplitMedia (default).
   * `card` - bordered HomePartners-style surface, still horizontal on md+.
   */
  variant?: "banner" | "card";
  /** Media column side on md+. `end` mirrors the default (copy | media). */
  mediaPosition?: "start" | "end";
};

function MediaPanel({
  image,
  video,
  showVideo,
  withOverlay,
  className,
}: {
  image: ProductImage;
  video?: string;
  showVideo: boolean;
  withOverlay: boolean;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "relative overflow-hidden bg-neutral-200",
        withOverlay
          ? "min-h-70 md:min-h-[min(26.25rem,38vw)]"
          : "min-h-56 md:min-h-0 md:h-full",
        className,
      )}
    >
      {showVideo ? (
        <video
          className="absolute inset-0 size-full object-cover"
          autoPlay
          loop
          muted
          playsInline
          poster={image.src}
        >
          <source src={assetUrl(video!)} type="video/mp4" />
        </video>
      ) : (
        <img
          src={image.src}
          alt={image.alt}
          className="absolute inset-0 size-full object-cover"
          style={{ objectPosition: productImageObjectPosition(image) }}
          loading="lazy"
          draggable={false}
        />
      )}
      {withOverlay ? (
        <div
          className="absolute inset-0 flex items-center justify-center bg-neutral-900/15"
          aria-hidden="true"
        >
          <img
            src={assetUrl("sygnet.svg")}
            alt=""
            className="size-24 opacity-95 brightness-0 invert md:size-32 lg:size-40"
            width={160}
            height={160}
            draggable={false}
          />
        </div>
      ) : null}
    </div>
  );
}

function BannerCopyPanel({
  eyebrow,
  titleBlock,
  body,
  actionsBlock,
  note,
  className,
}: {
  eyebrow?: string;
  titleBlock: ReactNode;
  body: ReactNode;
  actionsBlock: ReactNode;
  note?: string;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "relative flex h-full flex-col justify-center overflow-hidden rounded-xs bg-gold-100 px-6 md:px-10 lg:px-12",
        sectionBandPaddingClassName,
        className,
      )}
    >
      <div
        className="pointer-events-none absolute inset-0 overflow-hidden"
        aria-hidden="true"
      >
        <BrandMotif
          name="dots-grid"
          className="absolute top-6 inset-e-4 h-32 w-8 opacity-30 max-md:hidden md:top-8 md:inset-e-6 md:h-40 md:w-9"
        />
        <BrandMotif
          name="arc-dark"
          className="absolute -inset-e-14 -bottom-20 size-52 opacity-25 max-md:hidden"
        />
      </div>

      <div className="relative z-10 flex min-w-0 flex-col gap-4 md:gap-6">
        {eyebrow ? (
          <Eyebrow
            variant="gold"
            className="mb-0 text-sm tracking-widest text-neutral-700"
          >
            {eyebrow}
          </Eyebrow>
        ) : null}

        <div className="flex min-w-0 flex-col gap-3 md:gap-5">
          {titleBlock}
          {body}
        </div>

        {actionsBlock}

        {note ? (
          <p className="m-0 text-center font-body text-sm text-neutral-700 sm:text-start">
            {note}
          </p>
        ) : null}
      </div>
    </div>
  );
}

/** Two-column media + copy CTA used across PDP / home promotional banners. */
export function SplitMediaCta({
  id,
  titleId,
  eyebrow,
  title,
  lead,
  description,
  items,
  note,
  image,
  video,
  titleIconClass,
  actions,
  secondary,
  className,
  variant = "banner",
  mediaPosition = "start",
}: SplitMediaCtaProps) {
  const reducedMotion = useMotionReduced();
  const preferReducedMotion = useReducedMotion();
  const showVideo = Boolean(video) && !reducedMotion;
  const { targetRef, sideInset } = useScrollExpandInset<HTMLElement>();
  const isCard = variant === "card";
  const mediaAtEnd = mediaPosition === "end";
  const hasMedia = Boolean(image);
  const isDuo = Boolean(secondary);

  const makeTitleBlock = (
    panelTitle: string,
    panelTitleId: string,
    iconClass?: string,
  ) => (
    <div
      className={cn(
        iconClass && "flex min-w-0 items-center gap-3 font-heading font-medium",
        iconClass &&
          (isCard
            ? "text-h3 leading-[1.15] tracking-tight"
            : "text-h2 leading-[1.1] tracking-tight"),
      )}
    >
      {iconClass ? (
        <i
          className={cn(
            iconClass,
            "shrink-0 text-[1.15em] leading-none text-neutral-900",
          )}
          aria-hidden="true"
        />
      ) : null}
      <TextRevealLead
        id={panelTitleId}
        revealUnit="word"
        className={cn(
          "min-w-0 text-balance whitespace-pre-line",
          iconClass && "flex-1",
        )}
        typographyClassName={
          isCard || isDuo
            ? "font-heading text-h3 leading-[1.15] tracking-tight font-medium"
            : "font-heading text-h2 leading-[1.1] tracking-tight font-medium"
        }
        mutedClassName="text-neutral-900/20"
        fillClassName="text-neutral-900"
      >
        {panelTitle}
      </TextRevealLead>
    </div>
  );

  const makeBody = (
    panelLead?: string,
    panelDescription?: string,
    panelItems?: readonly string[],
  ) => (
    <>
      {panelLead ? (
        <p className="m-0 max-w-lg font-heading text-h4 leading-snug font-medium text-neutral-900">
          {panelLead}
        </p>
      ) : null}
      {panelDescription ? (
        <p
          className={cn(
            "m-0 max-w-lg",
            isCard || isDuo
              ? "text-sm leading-relaxed text-neutral-600"
              : "t-body text-neutral-700",
          )}
        >
          {panelDescription}
        </p>
      ) : null}
      {panelItems && panelItems.length > 0 ? (
        <ul
          className={cn(
            "m-0 max-w-lg list-disc ps-5 font-body leading-relaxed",
            isCard || isDuo
              ? "mt-5 space-y-2.5 text-sm text-neutral-700 marker:text-neutral-500"
              : "space-y-3 text-ui text-neutral-700 marker:text-neutral-800",
          )}
        >
          {panelItems.map((item) => (
            <li key={item.slice(0, 48)} className={isCard ? undefined : "ps-1"}>
              {item}
            </li>
          ))}
        </ul>
      ) : null}
    </>
  );

  const makeActionsBlock = (panelActions?: ReactNode, pushBottom?: boolean) =>
    panelActions ? (
      <motion.div
        className={cn(
          "flex min-w-0 flex-col items-stretch gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:justify-start",
          pushBottom && "mt-auto pt-6",
        )}
        initial={preferReducedMotion ? false : { opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-10%" }}
        transition={{ duration: 0.7, delay: 0.12, ease: EASE_OUT }}
      >
        {panelActions}
      </motion.div>
    ) : null;

  const primaryTitleBlock = makeTitleBlock(title, titleId, titleIconClass);
  const primaryBody = makeBody(lead, description, items);
  const primaryActions = makeActionsBlock(actions, isCard || isDuo);

  if (isDuo && secondary) {
    const secondaryActions = makeActionsBlock(secondary.actions, true);

    return (
      <section
        id={id}
        aria-labelledby={titleId}
        className={cn("relative z-10 isolate", className)}
      >
        <Container size="content">
          <ul className="m-0 grid list-none gap-8 p-0 md:grid-cols-2 md:gap-8 lg:gap-10">
            <li className="min-w-0">
              <BannerCopyPanel
                titleBlock={primaryTitleBlock}
                body={primaryBody}
                actionsBlock={primaryActions}
                note={note}
              />
            </li>
            <li className="min-w-0">
              <BannerCopyPanel
                titleBlock={makeTitleBlock(secondary.title, secondary.titleId)}
                body={makeBody(undefined, secondary.description)}
                actionsBlock={secondaryActions}
              />
            </li>
          </ul>
        </Container>
      </section>
    );
  }

  if (isCard) {
    return (
      <section id={id} aria-labelledby={titleId} className={className}>
        <Container size="content">
          <article className="overflow-hidden rounded-xs border border-neutral-300 bg-neutral-0">
            <div
              className={cn(
                "grid md:items-stretch",
                hasMedia && "md:grid-cols-2",
              )}
            >
              {hasMedia && image ? (
                <MediaPanel
                  image={image}
                  video={video}
                  showVideo={showVideo}
                  withOverlay={false}
                  className={mediaAtEnd ? "md:order-2" : undefined}
                />
              ) : null}
              <div
                className={cn(
                  "flex flex-col p-6 md:p-8 lg:p-10",
                  hasMedia && mediaAtEnd && "md:order-1",
                )}
              >
                <Eyebrow variant="muted" className="mb-3">
                  {eyebrow}
                </Eyebrow>
                <div className="flex min-w-0 flex-col">
                  {primaryTitleBlock}
                  <div className="mt-3 flex min-w-0 flex-col">
                    {primaryBody}
                  </div>
                </div>
                {primaryActions}
                {note ? (
                  <p className="m-0 mt-4 text-center font-body text-sm text-neutral-700 sm:text-start">
                    {note}
                  </p>
                ) : null}
              </div>
            </div>
          </article>
        </Container>
      </section>
    );
  }

  return (
    <section
      id={id}
      ref={targetRef}
      aria-labelledby={titleId}
      className={className}
    >
      <motion.div
        className="relative overflow-hidden rounded-xs"
        style={{ marginLeft: sideInset, marginRight: sideInset }}
      >
        <div className={cn("grid", hasMedia && "md:grid-cols-2")}>
          {hasMedia && image ? (
            <MediaPanel
              image={image}
              video={video}
              showVideo={showVideo}
              withOverlay
              className={mediaAtEnd ? "md:order-2" : undefined}
            />
          ) : null}

          <div
            className={cn(
              "relative flex flex-col justify-center bg-gold-100 px-6 md:px-10 lg:px-12",
              sectionBandPaddingClassName,
              hasMedia && mediaAtEnd && "md:order-1",
            )}
          >
            <div
              className="pointer-events-none absolute inset-0 overflow-hidden"
              aria-hidden="true"
            >
              <BrandMotif
                name="dots-grid"
                className="absolute top-6 inset-e-4 h-32 w-8 opacity-30 max-md:hidden md:top-8 md:inset-e-6 md:h-40 md:w-9"
              />
              <BrandMotif
                name="arc-dark"
                className="absolute -inset-e-14 -bottom-20 size-52 opacity-25 max-md:hidden"
              />
            </div>

            <div className="relative z-10 flex min-w-0 flex-col gap-4 md:gap-6">
              <Eyebrow
                variant="gold"
                className="mb-0 text-sm tracking-widest text-neutral-700"
              >
                {eyebrow}
              </Eyebrow>

              <div className="flex min-w-0 flex-col gap-3 md:gap-5">
                {primaryTitleBlock}
                {primaryBody}
              </div>

              {makeActionsBlock(actions)}

              {note ? (
                <p className="m-0 text-center font-body text-sm text-neutral-700 sm:text-start">
                  {note}
                </p>
              ) : null}
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
