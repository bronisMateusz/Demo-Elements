import { cn } from "../../lib/cn";
import {
  presenceSalonCities,
  presenceVoivodeshipDrawerCopy,
  salonCardCopy,
  salonOptions,
  type SalonOption,
} from "../../data/nav";
import {
  CITY_TO_VOIV,
  polandVoivodeships,
} from "../../data/polandVoivodeships";
import { useSelectedSalon } from "../../hooks/useSelectedSalon";
import { Button } from "../ui/Button";
import { SalonHoursList } from "../salon/SalonHoursList";
import { DrawerHeader, DrawerShell } from "./DrawerShell";

type VoivodeshipSalonsDrawerProps = {
  open: boolean;
  voivId: string | null;
  onClose: () => void;
};

function salonsForVoiv(voivId: string): SalonOption[] {
  const hrefs = new Set(
    presenceSalonCities
      .filter((city) => CITY_TO_VOIV[city.href] === voivId)
      .map((city) => city.href),
  );
  const collator = new Intl.Collator("pl", { sensitivity: "base" });

  return salonOptions
    .filter((salon) => hrefs.has(salon.href))
    .slice()
    .sort((a, b) => collator.compare(a.name, b.name));
}

function listLabelFor(salon: SalonOption): string {
  return (
    presenceSalonCities.find((city) => city.href === salon.href)?.label ??
    salon.name
  );
}

export function VoivodeshipSalonsDrawer({
  open,
  voivId,
  onClose,
}: VoivodeshipSalonsDrawerProps) {
  const { salon: selectedSalon, select } = useSelectedSalon();
  const voivName =
    polandVoivodeships.find((region) => region.id === voivId)?.name ?? "Salony";
  const salons = voivId ? salonsForVoiv(voivId) : [];
  const hours = salonCardCopy.defaultHours;

  return (
    <DrawerShell
      open={open}
      onClose={onClose}
      label={voivName}
      closeLabel={presenceVoivodeshipDrawerCopy.closeLabel}
    >
      <DrawerHeader
        title={voivName}
        description={presenceVoivodeshipDrawerCopy.description}
        closeLabel={presenceVoivodeshipDrawerCopy.closeLabel}
        onClose={onClose}
      />

      <div className="flex min-h-0 flex-1 flex-col overflow-y-auto px-[clamp(0.75rem,2.222vw,2.5rem)] py-5 md:py-6">
        {salons.length === 0 ? (
          <p className="m-0 text-sm text-neutral-500">
            Brak salonów w tym województwie.
          </p>
        ) : (
          <ul className="m-0 flex list-none flex-col gap-4 p-0">
            {salons.map((salon) => {
              const isSelected = selectedSalon?.id === salon.id;
              const phone = salon.phone;
              const telHref = `tel:${phone.replace(/\s+/g, "")}`;

              return (
                <li
                  key={salon.id}
                  className="rounded-xs border border-neutral-200 bg-neutral-0 p-4"
                >
                  <p className="m-0 font-heading text-lg leading-snug font-medium text-neutral-900">
                    {listLabelFor(salon)}
                  </p>
                  <p className="mt-1.5 mb-0 text-sm leading-relaxed text-neutral-600">
                    {salon.address}
                  </p>

                  <dl className="mt-3 mb-0 grid gap-2 text-sm">
                    <div className="grid grid-cols-[auto_1fr] gap-x-3 gap-y-0.5">
                      <dt className="font-medium text-neutral-800">
                        {presenceVoivodeshipDrawerCopy.phoneLabel}
                      </dt>
                      <dd className="m-0">
                        <a
                          href={telHref}
                          className="text-neutral-800 underline decoration-neutral-400 underline-offset-2 transition-colors hover:text-gold-600 hover:decoration-gold-500"
                        >
                          {phone}
                        </a>
                      </dd>
                    </div>
                    <div className="grid grid-cols-[auto_1fr] gap-x-3 gap-y-0.5">
                      <dt className="font-medium text-neutral-800">
                        {presenceVoivodeshipDrawerCopy.hoursLabel}
                      </dt>
                      <dd className="m-0 text-neutral-700">
                        <SalonHoursList hours={hours} />
                      </dd>
                    </div>
                  </dl>

                  <div className="mt-4 flex flex-col gap-2 sm:flex-row sm:flex-wrap">
                    <Button
                      href={salon.href}
                      variant="primary"
                      size="md"
                      className="w-full sm:w-auto"
                    >
                      {presenceVoivodeshipDrawerCopy.contactLabel}
                      <i className="ph ph-arrow-right" aria-hidden="true" />
                    </Button>
                    <Button
                      as="button"
                      type="button"
                      variant="secondary"
                      size="md"
                      className={cn(
                        "w-full sm:w-auto",
                        isSelected && "pointer-events-none opacity-70",
                      )}
                      onClick={() => select(salon.id)}
                      disabled={isSelected}
                    >
                      {isSelected
                        ? presenceVoivodeshipDrawerCopy.selectedLabel
                        : presenceVoivodeshipDrawerCopy.selectLabel}
                    </Button>
                  </div>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </DrawerShell>
  );
}
