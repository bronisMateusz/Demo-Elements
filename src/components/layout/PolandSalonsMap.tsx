import { useMemo } from "react";
import { cn } from "../../lib/cn";
import {
  CITY_TO_VOIV,
  POLAND_VOIV_GEO,
  POLAND_VOIV_VIEW,
  polandVoivodeships,
} from "../../data/polandVoivodeships";
import { presenceSalonCities, salonOptions } from "../../data/nav";

function project(lat: number, lng: number) {
  const { top, bottom, left, right } = POLAND_VOIV_GEO;
  const { width, height } = POLAND_VOIV_VIEW;
  return {
    x: ((lng - left) / (right - left)) * width,
    y: ((top - lat) / (top - bottom)) * height,
  };
}

type Marker = {
  id: string;
  voivId: string;
  x: number;
  y: number;
};

function buildMarkers(): Marker[] {
  return presenceSalonCities.flatMap((city) => {
    const salon = salonOptions.find((entry) => entry.href === city.href);
    const voivId = CITY_TO_VOIV[city.href];
    if (!salon || !voivId) return [];
    const { x, y } = project(salon.lat, salon.lng);
    return [{ id: salon.id, voivId, x, y }];
  });
}

type PolandSalonsMapProps = {
  className?: string;
};

/**
 * Static Poland map by voivodeship with salon markers (decorative, non-interactive).
 * @see https://czarneckimichal.pl/blog/klikalna-mapa-polski-z-podzialem-na-wojewodztwa-w-svg/
 */
export function PolandSalonsMap({ className }: PolandSalonsMapProps) {
  const markers = useMemo(() => buildMarkers(), []);
  const activeVoivIds = useMemo(
    () => new Set(markers.map((marker) => marker.voivId)),
    [markers],
  );
  const { width, height } = POLAND_VOIV_VIEW;

  return (
    <div className={cn("flex w-full justify-center overflow-visible lg:justify-end", className)}>
      <svg
        viewBox={`0 0 ${width} ${height}`}
        className="pointer-events-none w-full max-w-[30rem] overflow-visible xl:max-w-[34rem]"
        role="img"
        aria-label="Mapa Polski z podziałem na województwa i lokalizacjami salonów Elements"
      >
        {polandVoivodeships.map((region) => {
          const hasSalon = activeVoivIds.has(region.id);

          return (
            <path
              key={region.id}
              d={region.d}
              className={cn(
                "stroke-neutral-900",
                hasSalon ? "fill-neutral-0/12" : "fill-neutral-0/5",
              )}
              strokeWidth={1.1}
            />
          );
        })}

        {markers.map((marker) => (
          <g
            key={marker.id}
            transform={`translate(${marker.x} ${marker.y})`}
            aria-hidden="true"
          >
            {/* Tip sits on the lat/lng; circle sits above */}
            <path d="M-5.5 -3.5 L0 8 L5.5 -3.5 Z" className="fill-gold-400" />
            <circle cx={0} cy={-7} r={8.5} className="fill-gold-400" />
            <circle
              cx={0}
              cy={-7}
              r={4.75}
              fill="none"
              className="stroke-gold-600"
              strokeWidth={1.75}
            />
          </g>
        ))}
      </svg>
    </div>
  );
}
