import { useId, useState } from "react";
import { cn } from "../../lib/cn";
import { salonCardCopy } from "../../data/nav";
import { requestSalonDrawer, useSelectedSalon } from "../../hooks/useSelectedSalon";
import { Eyebrow } from "../ui/Eyebrow";

type ProductSalonCardProps = {
  eyebrow: string;
  description: string;
  href: string;
  label: string;
  id?: string;
  className?: string;
  onAskOpen?: () => void;
};

const cardShellClassName = cn(
  "group/salon relative overflow-hidden rounded-xs border border-neutral-800/10 bg-neutral-900",
  "px-6 py-7 sm:px-8 sm:py-8",
);

function SalonCardBackdrop() {
  return (
    <>
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_0%_0%,rgba(184,151,90,0.22),transparent_58%)]"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute inset-y-0 right-0 w-1/3 bg-[radial-gradient(circle_at_100%_50%,rgba(240,232,214,0.07),transparent_70%)]"
        aria-hidden="true"
      />
    </>
  );
}

export function ProductSalonCard({
  eyebrow,
  description,
  href,
  label,
  id = "salonCard",
  className,
  onAskOpen,
}: ProductSalonCardProps) {
  const { salon } = useSelectedSalon();
  const hoursId = useId();
  const [hoursOpen, setHoursOpen] = useState(false);

  if (salon) {
    const phone = salonCardCopy.defaultPhone;
    const hours = salonCardCopy.defaultHours;
    const telHref = `tel:${phone.replace(/\s+/g, "")}`;

    return (
      <aside
        id={id}
        className={cn(cardShellClassName, className)}
        aria-labelledby={`${id}-title`}
        aria-live="polite"
      >
        <SalonCardBackdrop />

        <div className="relative flex flex-col">
          <div className="mb-3 flex items-start justify-between gap-4">
            <Eyebrow variant="muted" showRule={false} className="mb-0 text-neutral-400">
              {salonCardCopy.selectedEyebrow}
            </Eyebrow>
            <button
              type="button"
              onClick={requestSalonDrawer}
              className={cn(
                "shrink-0 font-body text-sm text-neutral-300 underline underline-offset-2",
                "transition-colors duration-fast ease-out hover:text-gold-400",
                "focus-visible:outline-2 focus-visible:outline-offset-[var(--spacing-focus-ring-offset)] focus-visible:outline-neutral-0",
              )}
            >
              {salonCardCopy.changeLabel}
            </button>
          </div>

          <p
            id={`${id}-title`}
            className="mb-0 font-heading text-[clamp(18px,1.75vw,22px)] leading-heading text-neutral-0"
          >
            {salon.name}
          </p>

          <p className="mt-3 mb-0 text-sm leading-relaxed text-neutral-400">
            {salonCardCopy.selectedDescription}
          </p>

          <div className="mt-5 border-y border-neutral-0/10">
            <button
              type="button"
              className={cn(
                "flex w-full items-center justify-between gap-3 py-3.5 text-left",
                "font-body text-sm font-medium text-neutral-0",
                "focus-visible:outline-2 focus-visible:outline-offset-[var(--spacing-focus-ring-offset)] focus-visible:outline-neutral-0",
              )}
              aria-expanded={hoursOpen}
              aria-controls={hoursId}
              onClick={() => setHoursOpen((open) => !open)}
            >
              <span>{salonCardCopy.hoursToggle}</span>
              <i
                className={cn(
                  "ph ph-caret-down text-base leading-none text-neutral-400 transition-transform duration-fast ease-out",
                  hoursOpen && "rotate-180",
                )}
                aria-hidden="true"
              />
            </button>
            {hoursOpen ? (
              <div
                id={hoursId}
                className="grid grid-cols-1 gap-4 pb-3.5 text-sm leading-relaxed text-neutral-400 sm:grid-cols-2"
              >
                <div>
                  <p className="m-0 mb-1.5 font-medium text-neutral-0">
                    {salonCardCopy.addressColumnLabel}
                  </p>
                  <p className="m-0">{salon.address}</p>
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
            ) : null}
          </div>

          <div className="mt-5 flex flex-wrap items-center justify-between gap-x-6 gap-y-3">
            {onAskOpen ? (
              <button
                type="button"
                onClick={onAskOpen}
                className={cn(
                  "inline-flex items-center gap-2 font-body text-sm font-medium text-gold-400",
                  "transition-colors duration-fast ease-out hover:text-gold-100",
                  "focus-visible:outline-2 focus-visible:outline-offset-[var(--spacing-focus-ring-offset)] focus-visible:outline-neutral-0",
                )}
              >
                <i className="ph ph-chat-circle text-base leading-none" aria-hidden="true" />
                <span>
                  {salonCardCopy.askLabel}
                  <span aria-hidden="true"> →</span>
                </span>
              </button>
            ) : (
              <a
                href={href}
                className={cn(
                  "inline-flex items-center gap-2 font-body text-sm font-medium text-gold-400 no-underline",
                  "transition-colors duration-fast ease-out hover:text-gold-100",
                )}
              >
                <i className="ph ph-chat-circle text-base leading-none" aria-hidden="true" />
                <span>
                  {salonCardCopy.askLabel}
                  <span aria-hidden="true"> →</span>
                </span>
              </a>
            )}

            <a
              href={telHref}
              className={cn(
                "inline-flex items-center gap-2 font-body text-sm font-medium text-neutral-0 no-underline",
                "transition-colors duration-fast ease-out hover:text-gold-400",
              )}
            >
              <i className="ph ph-phone text-base leading-none" aria-hidden="true" />
              <span>{phone}</span>
            </a>
          </div>
        </div>
      </aside>
    );
  }

  return (
    <aside
      id={id}
      className={cn(cardShellClassName, className)}
      aria-labelledby={`${id}-title`}
      aria-live="polite"
    >
      <SalonCardBackdrop />

      <div className="relative flex flex-col">
        <Eyebrow variant="gold" className="mb-3 text-gold-400">
          {eyebrow}
        </Eyebrow>
        <p
          id={`${id}-title`}
          className="mb-0 font-heading text-[clamp(18px,1.75vw,22px)] leading-heading text-neutral-0"
        >
          {description}
        </p>

        <button
          type="button"
          onClick={requestSalonDrawer}
          className={cn(
            "mt-6 flex w-full items-center justify-between gap-4 border-t border-neutral-0/10 pt-5 text-left",
            "font-body text-sm font-medium text-gold-400",
            "transition-[color,border-color] duration-base ease-luxury",
            "hover:border-neutral-0/20 hover:text-neutral-0 focus-visible:text-neutral-0",
            "focus-visible:outline-2 focus-visible:outline-offset-[var(--spacing-focus-ring-offset)] focus-visible:outline-neutral-0",
            "group-hover/salon:text-gold-100",
          )}
        >
          <span>{label}</span>
          <i
            className="ph ph-arrow-right text-base leading-none transition-transform duration-base ease-luxury group-hover/salon:translate-x-1"
            aria-hidden="true"
          />
        </button>
      </div>
    </aside>
  );
}
