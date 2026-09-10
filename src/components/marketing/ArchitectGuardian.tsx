import { useState } from "react";
import { pdpSectionScrollMarginClassName } from "../../constants/pdpSubnav";
import { architectZonePage } from "../../data/architectZone";
import { salonOptions } from "../../data/nav";
import { SalonLocationChips } from "./SalonLocationChips";
import {
  salonContactEyebrowClassName,
  salonContactLinkOffsetClassName,
} from "../salon/salonContactLinkClassName";
import { contentDividerTopClassName } from "../../lib/layoutTokens";
import { cn } from "../../lib/cn";
import { Section } from "../structural/Section";
import { SectionHeader } from "../structural/SectionHeader";
import { Container } from "../ui/Container";
import { EmptyState } from "../ui/EmptyState";
import { EyebrowSygnet } from "../ui/Eyebrow";

const { guardian } = architectZonePage;

const salonChips = salonOptions.map((salon) => ({
  id: salon.id,
  label: salon.name.replace(/^ELEMENTS\s+/i, ""),
}));

export function ArchitectGuardian() {
  const [salonId, setSalonId] = useState<string>(salonChips[0]?.id ?? "");
  const selectedSalon = salonOptions.find((salon) => salon.id === salonId);
  const showContact = Boolean(selectedSalon);

  return (
    <Section
      id={guardian.id}
      ariaLabelledby="architect-guardian-title"
      className={pdpSectionScrollMarginClassName}
    >
      <Container size="content">
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-12">
          <div className="min-w-0">
            <SectionHeader
              title={guardian.title}
              titleId="architect-guardian-title"
              className="mb-0"
            />
            <p className="mt-4 mb-0 max-w-prose font-body text-ui leading-relaxed text-neutral-600">
              {guardian.lead}
            </p>

            <div className="mt-8">
              <SalonLocationChips
                chips={salonChips}
                activeId={salonId}
                onSelect={setSalonId}
                ariaLabel={guardian.selectLabel}
                role="tablist"
                mobileAs="chips"
                chipGapClassName="gap-2"
              />
            </div>
          </div>

          <div
            className={cn(
              "min-w-0",
              contentDividerTopClassName,
              "pt-8 lg:border-t-0 lg:pt-0",
            )}
          >
            {showContact && selectedSalon ? (
              <div className="flex flex-col lg:h-full lg:min-h-65 lg:justify-center">
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
