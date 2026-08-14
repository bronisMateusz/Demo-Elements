import { Link } from "react-router-dom";
import { salonCardCopy, type SalonOption } from "../../data/nav";
import {
  salonDirectionsHref,
  salonDirectoryImageFor,
  salonTabPhoneGroups,
  salonTelHref,
  salonsPageB,
} from "../../data/salons";
import { cn } from "../../lib/cn";
import { Button } from "../ui/Button";

type SalonTabCardProps = {
  salon: SalonOption;
  selected?: boolean;
  onBook: () => void;
  className?: string;
};

/** Mirrors SalonHero contact panel structure on the listing card. */
const contactCardClassName = cn(
  "relative overflow-hidden rounded-xs border border-neutral-800/10 bg-neutral-900",
  "px-6 py-7 sm:px-8 sm:py-8",
);

const phoneLinkClassName = cn(
  "inline-flex items-center gap-2 font-body text-sm font-medium text-neutral-0 no-underline tabular-nums",
  "transition-colors duration-fast ease-out hover:text-gold-400",
  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neutral-0",
);

const emailLinkClassName = cn(
  "mt-3 inline-flex items-center gap-2 font-body text-sm font-medium text-gold-400 no-underline",
  "transition-colors duration-fast ease-out hover:text-gold-100",
  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neutral-0",
);

function ContactCardBackdrop() {
  return (
    <>
      <div
        className="pointer-events-none absolute inset-0 bg-radial-[at_0%_0%] from-gold-500/22 to-transparent to-58%"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute inset-y-0 inset-e-0 w-1/3 bg-radial-[at_100%_50%] from-gold-50/7 to-transparent to-70%"
        aria-hidden="true"
      />
    </>
  );
}

export function SalonTabCard({
  salon,
  selected = false,
  onBook,
  className,
}: SalonTabCardProps) {
  const { card } = salonsPageB;
  const imageSrc = salonDirectoryImageFor(salon.id);
  const phoneGroups = salonTabPhoneGroups(salon, {
    offer: card.offerLabel,
    architects: card.architectsLabel,
  });
  const hours = salonCardCopy.defaultHours;
  const directionsHref = salonDirectionsHref(salon);

  return (
    <article
      className={cn(
        "grid gap-6 border-b border-neutral-200 py-8 last:border-b-0 md:grid-cols-2 md:items-stretch md:gap-8 lg:gap-12",
        className,
      )}
    >
      <div className="min-w-0">
        <h3 className="m-0 font-heading text-h3 leading-[1.15] font-medium tracking-tight text-neutral-900">
          <Link
            to={salon.href}
            className="text-inherit no-underline transition-colors hover:text-gold-700"
          >
            {salon.name}
          </Link>
        </h3>

        <aside
          className={cn(contactCardClassName, "mt-6")}
          aria-label={`Kontakt - ${salon.name}`}
        >
          <ContactCardBackdrop />
          <div className="relative flex flex-col">
            <div className="border-b border-neutral-0/10 pb-4">
              <div className="grid grid-cols-1 gap-4 text-sm leading-relaxed text-neutral-400 sm:grid-cols-2">
                <div>
                  <p className="m-0 mb-1.5 font-medium text-neutral-0">
                    {salonCardCopy.addressColumnLabel}
                  </p>
                  <p className="m-0">{salon.address}</p>
                  <a
                    href={directionsHref}
                    target="_blank"
                    rel="noreferrer"
                    className={cn(
                      "mt-2 inline-flex items-center gap-1.5 font-body text-sm font-medium text-gold-400 no-underline",
                      "transition-colors duration-fast ease-out hover:text-gold-100",
                      "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neutral-0",
                    )}
                  >
                    {card.directionsLabel}
                    <i
                      className="ph ph-arrow-up-right text-sm leading-none"
                      aria-hidden="true"
                    />
                  </a>
                </div>
                <div>
                  <p className="m-0 mb-1.5 font-medium text-neutral-0">
                    {salonCardCopy.hoursColumnLabel}
                  </p>
                  {hours.map((line) => (
                    <p key={line} className="m-0">
                      {line}
                    </p>
                  ))}
                </div>
              </div>
            </div>

            {phoneGroups.map((group) => (
              <div
                key={group.label}
                className="border-b border-neutral-0/10 py-4"
              >
                <p className="m-0 font-body text-xs tracking-[0.08em] text-neutral-400 uppercase">
                  {group.label}
                </p>
                <ul className="mt-3 m-0 grid list-none grid-cols-1 gap-x-6 gap-y-2.5 p-0 sm:grid-cols-2">
                  {group.phones.map((phone) => (
                    <li key={phone}>
                      <a href={salonTelHref(phone)} className={phoneLinkClassName}>
                        <i
                          className="ph ph-phone text-base leading-none"
                          aria-hidden="true"
                        />
                        <span>{phone}</span>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}

            <div className="pt-4">
              <p className="m-0 font-body text-xs tracking-[0.08em] text-neutral-400 uppercase">
                {card.emailLabel}
              </p>
              <a href={`mailto:${salon.email}`} className={emailLinkClassName}>
                <i
                  className="ph ph-envelope-simple text-base leading-none"
                  aria-hidden="true"
                />
                <span>{salon.email}</span>
              </a>
            </div>

            <div className="mt-5 flex flex-wrap gap-3 border-t border-neutral-0/10 pt-5">
              <Button
                as="button"
                type="button"
                variant="primary"
                tone="onDark"
                size="md"
                onClick={onBook}
              >
                {selected ? card.bookSelectedLabel : card.bookLabel}
              </Button>
              <Button
                as="link"
                href={salon.href}
                variant="secondary"
                tone="onDark"
                size="md"
              >
                {card.salonPageLabel}
                <i className="ph ph-arrow-right" aria-hidden="true" />
              </Button>
            </div>
          </div>
        </aside>
      </div>

      <Link
        to={salon.href}
        className="relative block aspect-4/3 w-full overflow-hidden rounded-xs bg-neutral-100 md:aspect-auto md:min-h-full"
        aria-label={`${card.imageAltPrefix} ${salon.name}`}
      >
        <img
          src={imageSrc}
          alt=""
          className="absolute inset-0 size-full max-w-none object-cover transition-transform duration-slow ease-luxury hover:scale-105"
          loading="lazy"
          decoding="async"
        />
      </Link>
    </article>
  );
}
