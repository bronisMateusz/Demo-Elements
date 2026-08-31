import type { ReactNode } from "react";
import { salonCardCopy } from "../../data/nav";
import { cn } from "../../lib/cn";
import {
  salonContactEyebrowClassName,
  salonContactLinkClassName,
  salonContactLinkOffsetClassName,
} from "./salonContactLinkClassName";
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
  actions?: ReactNode;
  className?: string;
  "aria-label"?: string;
};

/** Shared salon contact block - light surface, no dividers (hero + listing). */
export function SalonContactPanel({
  address,
  hours,
  phoneGroups,
  email,
  emailHref,
  actions,
  className,
  "aria-label": ariaLabel = "Kontakt z salonem",
}: SalonContactPanelProps) {
  return (
    <aside
      className={cn("relative min-w-0 @container/panel", className)}
      aria-label={ariaLabel}
    >
      <div className="relative flex flex-col gap-6">
        {/*
          Panel split tracks the aside width.
          Phone grid tracks the phones column - only 2-col when that column
          can fit two nowrap numbers (avoids wrapping in a tight half).
        */}
        <div className="grid gap-6 text-sm leading-relaxed text-neutral-600 @min-[36rem]/panel:grid-cols-2 @min-[36rem]/panel:items-start @min-[36rem]/panel:gap-x-10">
          <div className="flex flex-col gap-6">
            <div>
              <p className={cn(salonContactEyebrowClassName, "mb-2")}>
                {salonCardCopy.addressColumnLabel}
              </p>
              <p className="m-0 text-neutral-900">{address}</p>
            </div>
            <div>
              <p className={cn(salonContactEyebrowClassName, "mb-2")}>
                {salonCardCopy.hoursColumnLabel}
              </p>
              <SalonHoursList hours={hours} className="text-neutral-900" />
            </div>
            <div>
              <p className={salonContactEyebrowClassName}>E-mail</p>
              <a href={emailHref} className={salonContactLinkOffsetClassName}>
                <i
                  className="ph ph-envelope-simple text-base leading-none"
                  aria-hidden="true"
                />
                <span>{email}</span>
              </a>
            </div>
          </div>

          <div className="@container/phones flex min-w-0 flex-col gap-6">
            {phoneGroups.map((group) => (
              <div key={group.label}>
                <p className={salonContactEyebrowClassName}>{group.label}</p>
                <ul className="mt-3 m-0 grid list-none grid-cols-1 gap-x-6 gap-y-3 p-0 @min-[20rem]/phones:grid-cols-2">
                  {group.phones.map((phone) => (
                    <li key={phone.href} className="min-w-0">
                      <a
                        href={phone.href}
                        className={salonContactLinkClassName}
                      >
                        <i
                          className="ph ph-phone shrink-0 text-base leading-none"
                          aria-hidden="true"
                        />
                        <span className="whitespace-nowrap">{phone.label}</span>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {actions ? (
          <div
            className={cn(
              "flex flex-col gap-3",
              "@min-[22rem]/panel:flex-row @min-[22rem]/panel:flex-wrap @min-[22rem]/panel:items-center",
              "@min-[22rem]/panel:[&_a]:w-auto @min-[22rem]/panel:[&_button]:w-auto",
            )}
          >
            {actions}
          </div>
        ) : null}
      </div>
    </aside>
  );
}
