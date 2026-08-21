import { useId, useState } from "react";
import { pdpSectionScrollMarginClassName } from "../../constants/pdpSubnav";
import { architectZonePage } from "../../data/architectZone";
import { salonOptions } from "../../data/nav";
import { cn } from "../../lib/cn";
import { Section } from "../structural/Section";
import { Container } from "../ui/Container";
import { EmptyState } from "../ui/EmptyState";
import { inputClassName } from "../ui/inputClassName";
import { SectionHeader } from "../structural/SectionHeader";

const { guardian } = architectZonePage;

export function ArchitectGuardian() {
  const selectId = useId();
  const [salonId, setSalonId] = useState("");
  const selectedSalon = salonOptions.find((salon) => salon.id === salonId);
  const showContact = Boolean(selectedSalon);

  return (
    <Section
      id={guardian.id}
      ariaLabelledby="architect-guardian-title"
      tone="muted"
      className={pdpSectionScrollMarginClassName}
    >
      <Container size="content">
        <div className="grid gap-8 rounded-xs bg-neutral-0 p-6 shadow-subtle sm:p-8 lg:grid-cols-2 lg:gap-12 lg:p-10">
          <div className="min-w-0">
            <SectionHeader
              title={guardian.title}
              titleId="architect-guardian-title"
              className="mb-3"
            />
            <p className="m-0 max-w-prose font-body text-ui leading-relaxed text-neutral-600">
              {guardian.lead}
            </p>

            <label
              htmlFor={selectId}
              className="mt-8 mb-2 block font-body text-sm font-medium text-neutral-900"
            >
              {guardian.selectLabel}
            </label>
            <div className="relative">
              <i
                className="ph ph-map-pin-line pointer-events-none absolute inset-s-4 top-1/2 z-1 -translate-y-1/2 text-lg text-neutral-500"
                aria-hidden="true"
              />
              <select
                id={selectId}
                value={salonId}
                onChange={(event) => setSalonId(event.target.value)}
                className={cn(
                  inputClassName,
                  "cursor-pointer appearance-none ps-11 pe-10",
                )}
              >
                <option value="">{guardian.selectPlaceholder}</option>
                {salonOptions.map((salon) => (
                  <option key={salon.id} value={salon.id}>
                    {salon.name}
                  </option>
                ))}
              </select>
              <i
                className="ph ph-caret-down pointer-events-none absolute inset-e-4 top-1/2 -translate-y-1/2 text-base text-neutral-500"
                aria-hidden="true"
              />
            </div>
          </div>

          <div className="min-w-0">
            {showContact && selectedSalon ? (
              <div className="flex h-full flex-col justify-center rounded-xs border border-neutral-200 bg-neutral-50 px-6 py-8">
                <p className="m-0 font-body text-xs font-medium uppercase tracking-[0.12em] text-neutral-500">
                  {selectedSalon.name}
                </p>
                <p className="mt-3 mb-0 font-heading text-h3 font-medium tracking-tight text-neutral-900">
                  {guardian.contact.name}
                </p>
                <p className="mt-1 mb-0 font-body text-sm text-neutral-600">
                  {guardian.contact.role}
                </p>
                <ul className="mt-6 mb-0 flex list-none flex-col gap-3 p-0">
                  <li>
                    <a
                      href={guardian.contact.phoneHref}
                      className="inline-flex items-center gap-2 font-body text-ui text-neutral-900 no-underline hover:text-gold-700"
                    >
                      <i className="ph ph-phone" aria-hidden="true" />
                      {guardian.contact.phone}
                    </a>
                  </li>
                  <li>
                    <a
                      href={guardian.contact.emailHref}
                      className="inline-flex items-center gap-2 font-body text-ui text-neutral-900 no-underline hover:text-gold-700"
                    >
                      <i className="ph ph-envelope-simple" aria-hidden="true" />
                      {guardian.contact.email}
                    </a>
                  </li>
                </ul>
                <p className="mt-6 mb-0 max-w-prose font-body text-sm leading-relaxed text-neutral-600">
                  {guardian.contactNote}
                </p>
              </div>
            ) : (
              <EmptyState
                layout="panel"
                iconClass="ph ph-map-pin-line"
                title="Wybierz salon"
                description={guardian.emptyTitle}
                className="h-full min-h-56"
              />
            )}
          </div>
        </div>
      </Container>
    </Section>
  );
}
