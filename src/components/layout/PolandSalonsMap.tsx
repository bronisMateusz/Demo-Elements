import { useMemo } from "react";
import { AnimatePresence, motion, type Variants } from "motion/react";
import { cn } from "../../lib/cn";
import { EASE_OUT } from "../../lib/motionEase";
import { useMotionReduced } from "../../hooks/useMotionReduced";
import {
  CITY_TO_VOIV,
  POLAND_VOIV_GEO,
  POLAND_VOIV_VIEW,
  polandVoivodeships,
} from "../../data/polandVoivodeships";
import { presenceSalonCities, salonOptions } from "../../data/nav";
import { requestSalonDrawer } from "../../hooks/useSelectedSalon";

/** beUI tooltip spawn — side "top" (https://beui.dev/components/motion/tooltip). */
const TOOLTIP_VARIANTS: Variants = {
  initial: {
    opacity: 0,
    scale: 0.9,
    filter: "blur(5px)",
    y: 8,
  },
  animate: {
    opacity: 1,
    scale: 1,
    filter: "blur(0px)",
    y: 0,
    transition: {
      type: "spring",
      stiffness: 380,
      damping: 30,
      mass: 0.7,
      opacity: { duration: 0.14, ease: EASE_OUT },
      filter: { duration: 0.18, ease: EASE_OUT },
    },
  },
  exit: {
    opacity: 0,
    scale: 0.94,
    filter: "blur(3px)",
    y: 8 * 0.6,
    transition: { duration: 0.12, ease: EASE_OUT },
  },
};

const TOOLTIP_REDUCED: Variants = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { duration: 0.14, ease: EASE_OUT } },
  exit: { opacity: 0, transition: { duration: 0.1, ease: EASE_OUT } },
};

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
  label: string;
  href: string;
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
    return [{ id: salon.id, label: city.label, href: city.href, voivId, x, y }];
  });
}

type PolandSalonsMapProps = {
  className?: string;
  hoveredVoivId: string | null;
  onHoveredVoivIdChange: (id: string | null) => void;
};

/**
 * Clickable Poland map by voivodeship (MapSVG paths, Elements palette).
 * Marker tooltips use beUI blur + spring spawn.
 * @see https://czarneckimichal.pl/blog/klikalna-mapa-polski-z-podzialem-na-wojewodztwa-w-svg/
 * @see https://beui.dev/components/motion/tooltip
 */
export function PolandSalonsMap({
  className,
  hoveredVoivId,
  onHoveredVoivIdChange,
}: PolandSalonsMapProps) {
  const markers = useMemo(() => buildMarkers(), []);
  const activeVoivIds = useMemo(
    () => new Set(markers.map((marker) => marker.voivId)),
    [markers],
  );
  const reduce = useMotionReduced();
  const { width, height } = POLAND_VOIV_VIEW;
  const hoveredMarkers = hoveredVoivId
    ? markers.filter((marker) => marker.voivId === hoveredVoivId)
    : [];
  const tipVariants = reduce ? TOOLTIP_REDUCED : TOOLTIP_VARIANTS;

  return (
    <div className={cn("flex w-full justify-center overflow-visible lg:justify-end", className)}>
      <svg
        viewBox={`0 0 ${width} ${height}`}
        className="w-full max-w-[30rem] overflow-visible xl:max-w-[34rem]"
        role="img"
        aria-label="Mapa Polski z podziałem na województwa i lokalizacjami salonów Elements"
      >
        {polandVoivodeships.map((region) => {
          const hasSalon = activeVoivIds.has(region.id);
          const isHovered = hoveredVoivId === region.id;

          return (
            <path
              key={region.id}
              d={region.d}
              className={cn(
                "stroke-neutral-900 transition-[fill] duration-base ease-out",
                hasSalon ? "cursor-pointer" : "cursor-default",
                isHovered && hasSalon
                  ? "fill-neutral-0/22"
                  : hasSalon
                    ? "fill-neutral-0/12"
                    : "fill-neutral-0/5",
              )}
              strokeWidth={1.1}
              onMouseEnter={() => {
                if (hasSalon) onHoveredVoivIdChange(region.id);
              }}
              onMouseLeave={() => onHoveredVoivIdChange(null)}
              onClick={() => {
                if (hasSalon) requestSalonDrawer();
              }}
            />
          );
        })}

        {markers.map((marker) => {
          const isActive = hoveredVoivId === marker.voivId;

          return (
            <a
              key={marker.id}
              href={marker.href}
              className="cursor-pointer outline-none"
              onMouseEnter={() => onHoveredVoivIdChange(marker.voivId)}
              onMouseLeave={() => onHoveredVoivIdChange(null)}
              onClick={(event) => {
                event.preventDefault();
                requestSalonDrawer();
              }}
            >
              <circle
                cx={marker.x}
                cy={marker.y}
                r={isActive ? 7 : 5.5}
                fill="rgb(212 196 160 / 0.18)"
                aria-hidden="true"
              />
              <circle
                cx={marker.x}
                cy={marker.y}
                r={isActive ? 3.25 : 2.75}
                className="fill-gold-400"
              />
            </a>
          );
        })}

        <AnimatePresence>
          {hoveredMarkers.map((marker) => {
            const tooltipWidth = Math.max(96, marker.label.length * 8.5 + 28);
            const tooltipHeight = 40;
            const x = marker.x - tooltipWidth / 2;
            const y = marker.y - 34 - tooltipHeight;

            return (
              <foreignObject
                key={`tip-${marker.id}`}
                x={x}
                y={y}
                width={tooltipWidth}
                height={tooltipHeight + 10}
                className="overflow-visible"
                pointerEvents="none"
              >
                <motion.div
                  role="tooltip"
                  variants={tipVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  style={{ transformOrigin: "center bottom" }}
                  className="flex flex-col items-center"
                >
                  <span
                    className={cn(
                      "inline-flex max-w-full items-center justify-center truncate rounded-xs",
                      "border border-neutral-600 bg-neutral-800 px-3 py-2",
                      "font-body text-xs leading-none font-medium text-neutral-100",
                    )}
                  >
                    {marker.label}
                  </span>
                  <span
                    aria-hidden="true"
                    className="mt-px size-0 border-x-[6px] border-t-[6px] border-x-transparent border-t-neutral-800"
                  />
                </motion.div>
              </foreignObject>
            );
          })}
        </AnimatePresence>
      </svg>
    </div>
  );
}
