import type { ReactNode } from "react";
import { salonCardCopy } from "../../data/nav";
import { cn } from "../../lib/cn";
import { SalonHoursList, type SalonHoursRow } from "./SalonHoursList";

export type SalonContactPhone = {
  label: string;
  href: string;
};

export type SalonContactPhoneGroup = {
  label: string;
  phones: readonly SalonContactPhone[];
};

type SalonContactPanelProps = {
  address: string;
  hours: readonly SalonHoursRow[];
  phoneGroups: readonly SalonContactPhoneGroup[];
  email: string;
  emailHref: string;
  /** Optional link under the address (e.g. directions). */
  addressExtra?: ReactNode;
  actions?: ReactNode;
  className?: string;
  "aria-label"?: string;
};

const phoneLinkClassName = cn(
  "inline-flex items-center gap-2 font-body text-sm font-medium text-neutral-900 no-underline tabular-nums",
  "transition-colors duration-fast ease-out hover:text-gold-600",
  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neutral-800",
);

const emailLinkClassName = cn(
  "mt-3 inline-flex items-center gap-2 font-body text-sm font-medium text-gold-600 no-underline",
  "transition-colors duration-fast ease-out hover:text-gold-500",
  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neutral-800",
);

/** Shared salon contact block - light surface, no dividers (hero + listing). */
export function SalonContactPanel({
  address,
  hours,
  phoneGroups,
  email,
  emailHref,
  addressExtra,
  actions,
  className,
  "aria-label": ariaLabel = "Kontakt z salonem",
}: SalonContactPanelProps) {
  const leadPhoneGroups = phoneGroups.slice(0, -1);
  const sidePhoneGroup = phoneGroups.at(-1);

  return (
    <aside className={cn("relative min-w-0", className)} aria-label={ariaLabel}>
      <div className="relative flex flex-col gap-5">
        <div className="grid grid-cols-1 gap-4 text-sm leading-relaxed text-neutral-600 sm:grid-cols-2">
          <div>
            <p className="m-0 mb-1.5 font-medium text-neutral-900">
              {salonCardCopy.addressColumnLabel}
            </p>
            <p className="m-0">{address}</p>
            {addressExtra}
          </div>
          <div>
            <p className="m-0 mb-1.5 font-medium text-neutral-900">
              {salonCardCopy.hoursColumnLabel}
            </p>
            <SalonHoursList hours={hours} />
          </div>
        </div>

        {leadPhoneGroups.map((group) => (
          <div key={group.label}>
            <p className="m-0 font-body text-xs tracking-[0.08em] text-neutral-500 uppercase">
              {group.label}
            </p>
            <ul className="mt-3 m-0 grid list-none grid-cols-1 gap-x-6 gap-y-2.5 p-0 sm:grid-cols-3">
              {group.phones.map((phone) => (
                <li key={phone.href}>
                  <a href={phone.href} className={phoneLinkClassName}>
                    <i
                      className="ph ph-phone text-base leading-none"
                      aria-hidden="true"
                    />
                    <span>{phone.label}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-4">
          {sidePhoneGroup ? (
            <div>
              <p className="m-0 font-body text-xs tracking-[0.08em] text-neutral-500 uppercase">
                {sidePhoneGroup.label}
              </p>
              <ul className="mt-3 m-0 grid list-none grid-cols-1 gap-x-6 gap-y-2.5 p-0">
                {sidePhoneGroup.phones.map((phone) => (
                  <li key={phone.href}>
                    <a href={phone.href} className={phoneLinkClassName}>
                      <i
                        className="ph ph-phone text-base leading-none"
                        aria-hidden="true"
                      />
                      <span>{phone.label}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ) : null}
          <div className="sm:self-end">
            <p className="m-0 font-body text-xs tracking-[0.08em] text-neutral-500 uppercase">
              E-mail
            </p>
            <a href={emailHref} className={emailLinkClassName}>
              <i
                className="ph ph-envelope-simple text-base leading-none"
                aria-hidden="true"
              />
              <span>{email}</span>
            </a>
          </div>
        </div>

        {actions ? (
          <div className="flex flex-col gap-2 sm:flex-row sm:flex-wrap">
            {actions}
          </div>
        ) : null}
      </div>
    </aside>
  );
}
