import { useId, useMemo, useState } from "react";
import { pdpSectionScrollMarginClassName } from "../../constants/pdpSubnav";
import { architectZonePage } from "../../data/architectZone";
import { salonOptions } from "../../data/nav";
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
import { inputClassName } from "../ui/inputClassName";

const { guardian } = architectZonePage;

type SalonOption = {
  id: string;
  name: string;
  cityLabel: string;
};

const salonList: SalonOption[] = salonOptions.map((salon) => ({
  id: salon.id,
  name: salon.name,
  cityLabel: salon.name.replace(/^ELEMENTS\s+/i, ""),
}));

/**
 * Architect guardian module - searchable salon combobox + contact card.
 * Empty until a salon is chosen (brief: one selection → call / email).
 */
export function ArchitectGuardian() {
  const listId = useId();
  const inputId = useId();
  const [query, setQuery] = useState("");
  const [salonId, setSalonId] = useState<string>("");
  const [listOpen, setListOpen] = useState(false);

  const selectedSalon = salonList.find((salon) => salon.id === salonId);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return salonList;
    return salonList.filter(
      (salon) =>
        salon.name.toLowerCase().includes(q) ||
        salon.cityLabel.toLowerCase().includes(q),
    );
  }, [query]);

  const selectSalon = (salon: SalonOption) => {
    setSalonId(salon.id);
    setQuery(salon.cityLabel);
    setListOpen(false);
  };

  const clearSelection = () => {
    setSalonId("");
    setQuery("");
    setListOpen(true);
  };

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

            <div className="relative mt-8">
              <label
                htmlFor={inputId}
                className="mb-2 block font-body text-sm font-medium text-neutral-800"
              >
                {guardian.selectLabel}
              </label>
              <div className="relative">
                <input
                  id={inputId}
                  type="text"
                  role="combobox"
                  aria-expanded={listOpen}
                  aria-controls={listId}
                  aria-autocomplete="list"
                  autoComplete="off"
                  placeholder={guardian.selectPlaceholder}
                  value={query}
                  className={cn(inputClassName, "pe-11")}
                  onChange={(event) => {
                    setQuery(event.target.value);
                    setSalonId("");
                    setListOpen(true);
                  }}
                  onFocus={() => setListOpen(true)}
                  onBlur={() => {
                    // Defer so option click can register.
                    window.setTimeout(() => setListOpen(false), 120);
                  }}
                />
                {salonId ? (
                  <button
                    type="button"
                    className="absolute inset-e-2 top-1/2 inline-flex size-8 -translate-y-1/2 items-center justify-center rounded-xs text-neutral-500 hover:bg-neutral-100 hover:text-neutral-900"
                    aria-label="Wyczyść wybór salonu"
                    onMouseDown={(event) => event.preventDefault()}
                    onClick={clearSelection}
                  >
                    <i className="ph ph-x" aria-hidden="true" />
                  </button>
                ) : (
                  <i
                    className="ph ph-caret-down pointer-events-none absolute inset-e-3 top-1/2 -translate-y-1/2 text-neutral-500"
                    aria-hidden="true"
                  />
                )}
              </div>

              {listOpen ? (
                <ul
                  id={listId}
                  role="listbox"
                  aria-label={guardian.selectLabel}
                  className="absolute inset-x-0 z-20 mt-1 max-h-64 overflow-auto rounded-xs border border-neutral-300 bg-neutral-0 py-1 shadow-2"
                >
                  {filtered.length === 0 ? (
                    <li className="px-4 py-3 font-body text-sm text-neutral-500">
                      Brak salonu dla tej frazy.
                    </li>
                  ) : (
                    filtered.map((salon) => {
                      const active = salon.id === salonId;
                      return (
                        <li key={salon.id} role="option" aria-selected={active}>
                          <button
                            type="button"
                            className={cn(
                              "flex w-full cursor-pointer items-center px-4 py-2.5 text-start font-body text-ui text-neutral-900",
                              "hover:bg-neutral-100",
                              active && "bg-gold-50 font-medium",
                            )}
                            onMouseDown={(event) => event.preventDefault()}
                            onClick={() => selectSalon(salon)}
                          >
                            {salon.name}
                          </button>
                        </li>
                      );
                    })
                  )}
                </ul>
              ) : null}
            </div>
          </div>

          <div
            className={cn(
              "min-w-0",
              contentDividerTopClassName,
              "pt-8 lg:border-t-0 lg:pt-0",
            )}
          >
            {selectedSalon ? (
              <div className="flex flex-col rounded-xs border border-neutral-300 bg-neutral-0 p-6 lg:h-full lg:min-h-65 lg:justify-center lg:p-8">
                <p className="m-0 font-body text-xs font-medium tracking-[0.12em] text-neutral-500 uppercase">
                  {guardian.contact.role} | {selectedSalon.name}
                </p>
                <h3 className="mt-3 mb-0 font-heading text-h3 font-medium tracking-tight text-neutral-900">
                  {guardian.contact.name}
                </h3>

                <div
                  className="relative mt-6 flex flex-col gap-5"
                  aria-label={`Opiekun architekta - ${selectedSalon.name}`}
                >
                  <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-4">
                    <div className="sm:self-end">
                      <p className={salonContactEyebrowClassName}>
                        {guardian.callLabel}
                      </p>
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
                      <p className={salonContactEyebrowClassName}>
                        {guardian.emailLabel}
                      </p>
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
                title={guardian.emptyTitle}
                description={guardian.emptyDescription}
              />
            )}
          </div>
        </div>
      </Container>
    </Section>
  );
}
