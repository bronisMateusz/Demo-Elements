import { useId, useState } from "react";
import { pdpSectionScrollMarginClassName } from "../../constants/pdpSubnav";
import { architectZonePage } from "../../data/architectZone";
import { salonOptions } from "../../data/nav";
import {
  salonContactEyebrowClassName,
  salonContactLinkOffsetClassName,
} from "../salon/salonContactLinkClassName";
import { Section } from "../structural/Section";
import { SectionHeader } from "../structural/SectionHeader";
import { Container } from "../ui/Container";
import { EmptyState } from "../ui/EmptyState";
import { EyebrowSygnet } from "../ui/Eyebrow";
import { ListSelect } from "../ui/ListSelect";

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
            <ListSelect
              id={selectId}
              value={salonId}
              onChange={setSalonId}
              placeholder={guardian.selectPlaceholder}
              leadingIconClass="ph ph-map-pin-line"
              aria-label={guardian.selectLabel}
              options={salonOptions.map((salon) => ({
                value: salon.id,
                label: salon.name,
              }))}
            />
          </div>

          <div className="min-w-0">
            {showContact && selectedSalon ? (
              <div className="flex h-full min-h-65 flex-col justify-center">
                <p className="m-0 inline-flex items-center gap-2 font-body text-xs font-medium tracking-[0.12em] text-neutral-500 uppercase">
                  <EyebrowSygnet />
                  {guardian.contact.role}
                </p>
                <h3 className="mt-3 mb-0 font-heading text-h3 font-medium tracking-tight text-neutral-900">
                  {selectedSalon.name}
                </h3>

                <div
                  className="relative mt-6 flex flex-col gap-5"
                  aria-label={`Opiekun architekta - ${selectedSalon.name}`}
                >
                  <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-4">
                    <div className="sm:self-end">
                      <p className={salonContactEyebrowClassName}>Telefon</p>
                      <a
                        href={guardian.contact.phoneHref}
                        className={salonContactLinkOffsetClassName}
                      >
                        <i
                          className="ph ph-phone text-base leading-none"
                          aria-hidden="true"
                        />
                        <span>{guardian.contact.phone}</span>
                      </a>
                    </div>
                    <div className="sm:self-end">
                      <p className={salonContactEyebrowClassName}>E-mail</p>
                      <a
                        href={guardian.contact.emailHref}
                        className={salonContactLinkOffsetClassName}
                      >
                        <i
                          className="ph ph-envelope-simple text-base leading-none"
                          aria-hidden="true"
                        />
                        <span>{guardian.contact.email}</span>
                      </a>
                    </div>
                  </div>
                </div>

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
                className="h-full min-h-65"
              />
            )}
          </div>
        </div>
      </Container>
    </Section>
  );
}
