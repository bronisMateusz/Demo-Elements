import { Link } from "react-router-dom";
import { salonCardCopy, type SalonOption } from "../../data/nav";
import {
  salonDirectoryImageFor,
  salonTabPhoneGroups,
  salonTelHref,
  salonsPageB,
} from "../../data/salons";
import { cn } from "../../lib/cn";
import { Button } from "../ui/Button";
import { SalonContactPanel } from "../salon/SalonContactPanel";

type SalonTabCardProps = {
  salon: SalonOption;
  onBook: () => void;
  className?: string;
};

export function SalonTabCard({ salon, onBook, className }: SalonTabCardProps) {
  const { card } = salonsPageB;
  const imageSrc = salonDirectoryImageFor(salon.id);
  const phoneGroups = salonTabPhoneGroups(salon, {
    offer: card.offerLabel,
    architects: card.architectsLabel,
  })
    .filter((group) => group.phones.length > 0)
    .map((group) => ({
      label: group.label,
      phones: group.phones.map((phone) => ({
        label: phone,
        href: salonTelHref(phone),
      })),
    }));
  const hours = salonCardCopy.defaultHours;

  return (
    <article
      className={cn(
        "grid gap-8 border-b border-neutral-200 py-8 first:pt-0 last:border-b-0 last:pb-0 lg:grid-cols-2 lg:items-stretch lg:gap-12",
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

        <SalonContactPanel
          className="mt-8"
          aria-label={`Kontakt - ${salon.name}`}
          address={salon.address}
          hours={hours}
          phoneGroups={phoneGroups}
          email={salon.email}
          emailHref={`mailto:${salon.email}`}
          actions={
            <>
              <Button
                as="button"
                type="button"
                variant="primary"
                size="md"
                className="w-full sm:w-auto"
                onClick={onBook}
              >
                {card.bookLabel}
              </Button>
              <Button
                as="link"
                href={salon.href}
                variant="secondary"
                size="md"
                className="w-full sm:w-auto"
              >
                {card.salonPageLabel}
                <i className="ph ph-arrow-right" aria-hidden="true" />
              </Button>
            </>
          }
        />
      </div>

      <Link
        to={salon.href}
        className="relative block aspect-4/3 w-full overflow-hidden rounded-xs bg-neutral-100 lg:aspect-auto lg:min-h-full"
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
