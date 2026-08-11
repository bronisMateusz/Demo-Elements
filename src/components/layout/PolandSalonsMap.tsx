import { useMemo, useState } from "react";
import { motion } from "motion/react";
import { cn } from "../../lib/cn";
import { EASE_OUT } from "../../lib/motionEase";
import { useMotionReduced } from "../../hooks/useMotionReduced";
import {
  CITY_TO_VOIV,
  POLAND_VOIV_BBOX,
  POLAND_VOIV_GEO,
  POLAND_VOIV_VIEW,
  polandVoivodeships,
  type VoivodeshipBBox,
} from "../../data/polandVoivodeships";
import { presenceSalonCities, salonOptions } from "../../data/nav";

/** SVG units - pins closer than this collapse into a numbered cluster on the full map. */
const CLUSTER_DISTANCE = 36;
/** Minimum gap between individual pins when a voivodeship is zoomed in. */
const SPREAD_DISTANCE = 24;
/** Keep zoom helpers, but skip animating viewBox for now. */
const MAP_ZOOM_ENABLED = false;

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
  voivId: string;
  x: number;
  y: number;
};

type PinCluster = {
  id: string;
  x: number;
  y: number;
  voivId: string;
  count: number;
};

function buildMarkers(): Marker[] {
  return presenceSalonCities.flatMap((city) => {
    const salon = salonOptions.find((entry) => entry.href === city.href);
    const voivId = CITY_TO_VOIV[city.href];
    if (!salon || !voivId) return [];
    const { x, y } = project(salon.lat, salon.lng);
    return [{ id: salon.id, label: city.label, voivId, x, y }];
  });
}

function clusterMarkers(
  markers: readonly Marker[],
  threshold: number,
): PinCluster[] {
  const remaining = [...markers];
  const clusters: PinCluster[] = [];

  while (remaining.length > 0) {
    const seed = remaining.shift()!;
    const members = [seed];

    for (let index = remaining.length - 1; index >= 0; index -= 1) {
      const candidate = remaining[index];
      const near = members.some(
        (member) =>
          Math.hypot(candidate.x - member.x, candidate.y - member.y) <=
          threshold,
      );
      if (!near) continue;
      members.push(candidate);
      remaining.splice(index, 1);
    }

    const x = members.reduce((sum, item) => sum + item.x, 0) / members.length;
    const y = members.reduce((sum, item) => sum + item.y, 0) / members.length;
    const voivTally = new Map<string, number>();
    for (const member of members) {
      voivTally.set(member.voivId, (voivTally.get(member.voivId) ?? 0) + 1);
    }
    const voivId = [...voivTally.entries()].sort((a, b) => b[1] - a[1])[0][0];

    clusters.push({
      id: members
        .map((member) => member.id)
        .sort()
        .join("-"),
      x,
      y,
      voivId,
      count: members.length,
    });
  }

  return clusters;
}

/** Nudge overlapping pins apart after zooming into a voivodeship. */
function spreadCloseMarkers(
  markers: readonly Marker[],
  minDistance: number,
): Marker[] {
  const next = markers.map((marker) => ({ ...marker }));

  for (let i = 0; i < next.length; i += 1) {
    for (let j = i + 1; j < next.length; j += 1) {
      const dx = next[j].x - next[i].x;
      const dy = next[j].y - next[i].y;
      const distance = Math.hypot(dx, dy) || 0.01;
      if (distance >= minDistance) continue;

      const push = (minDistance - distance) / 2;
      const ux = dx / distance;
      const uy = dy / distance;
      next[i].x -= ux * push;
      next[i].y -= uy * push;
      next[j].x += ux * push;
      next[j].y += uy * push;
    }
  }

  return next;
}

function fitViewBox(
  box: VoivodeshipBBox,
  viewWidth: number,
  viewHeight: number,
  paddingRatio = 0.2,
): string {
  const aspect = viewWidth / viewHeight;
  const pad = Math.max(box.width, box.height) * paddingRatio;
  let fitW = box.width + pad * 2;
  let fitH = box.height + pad * 2;

  // Keep the same aspect ratio as the SVG so the region stays centered without stretch.
  if (fitW / fitH > aspect) {
    fitH = fitW / aspect;
  } else {
    fitW = fitH * aspect;
  }

  const cx = box.x + box.width / 2;
  const cy = box.y + box.height / 2;
  return `${cx - fitW / 2} ${cy - fitH / 2} ${fitW} ${fitH}`;
}

type MapPinProps = {
  x: number;
  y: number;
  count?: number;
  hot?: boolean;
  interactive?: boolean;
  onHoverChange?: (active: boolean) => void;
  onSelect?: () => void;
};

function MapPin({
  x,
  y,
  count = 1,
  hot = false,
  interactive = false,
  onHoverChange,
  onSelect,
}: MapPinProps) {
  const isCluster = count > 1;
  const outerR = hot ? 13.5 : 12.5;
  const innerR = hot ? 7.25 : 6.5;
  const fill = hot ? "fill-gold-300" : "fill-gold-400";

  return (
    <g
      transform={`translate(${x} ${y})`}
      className={interactive ? "cursor-pointer" : undefined}
      onMouseEnter={() => onHoverChange?.(true)}
      onMouseLeave={() => onHoverChange?.(false)}
      onClick={onSelect}
      aria-hidden="true"
    >
      <path d="M-7.5 -5 L0 11 L7.5 -5 Z" className={fill} />
      <circle cx={0} cy={-9.5} r={outerR} className={fill} />
      {isCluster ? (
        <text
          x={0}
          y={-10.25}
          textAnchor="middle"
          dominantBaseline="central"
          className="fill-neutral-900 font-body text-[13px] font-semibold"
          style={{ userSelect: "none" }}
        >
          {count}
        </text>
      ) : (
        <circle
          cx={0}
          cy={-9.5}
          r={innerR}
          fill="none"
          className="stroke-gold-600"
          strokeWidth={2}
        />
      )}
    </g>
  );
}

type PolandSalonsMapTone = "onDark" | "onLight";

type PolandSalonsMapProps = {
  className?: string;
  /** Drop the default max-width so the map can fill a wider column. */
  fluid?: boolean;
  /** Surface behind the map - drives region fill contrast. */
  tone?: PolandSalonsMapTone;
  /** When set, map zooms to this voivodeship and keeps its markers. */
  focusedVoivId?: string | null;
  onVoivSelect?: (voivId: string) => void;
};

function regionFillClassName({
  tone,
  hasSalon,
  isHovered,
  isSelected,
  isDimmed,
  zoomActive,
}: {
  tone: PolandSalonsMapTone;
  hasSalon: boolean;
  isHovered: boolean;
  isSelected: boolean;
  isDimmed: boolean;
  zoomActive: boolean;
}) {
  if (tone === "onLight") {
    if (isDimmed) return "pointer-events-none opacity-25 fill-neutral-100";
    if (isHovered && hasSalon) return "fill-neutral-300";
    if (!zoomActive && isSelected) return "fill-neutral-300";
    if (hasSalon || isSelected) return "fill-neutral-200";
    return "fill-neutral-50";
  }

  if (isDimmed) return "pointer-events-none opacity-15 fill-neutral-0/5";
  if (isHovered && hasSalon) return "fill-neutral-0/28";
  if (!zoomActive && isSelected) return "fill-neutral-0/28";
  if (hasSalon || isSelected) return "fill-neutral-0/16";
  return "fill-neutral-0/5";
}

/**
 * Clickable Poland map by voivodeship with salon markers.
 * Nearby pins collapse into a numbered cluster on the full map.
 * @see https://czarneckimichal.pl/blog/klikalna-mapa-polski-z-podzialem-na-wojewodztwa-w-svg/
 */
export function PolandSalonsMap({
  className,
  fluid = false,
  tone = "onDark",
  focusedVoivId = null,
  onVoivSelect,
}: PolandSalonsMapProps) {
  const markers = useMemo(() => buildMarkers(), []);
  const activeVoivIds = useMemo(
    () => new Set(markers.map((marker) => marker.voivId)),
    [markers],
  );
  const [hoveredVoivId, setHoveredVoivId] = useState<string | null>(null);
  const reduce = useMotionReduced();
  const { width, height } = POLAND_VOIV_VIEW;
  const isFocused = Boolean(focusedVoivId);
  const interactive =
    Boolean(onVoivSelect) && (MAP_ZOOM_ENABLED ? !isFocused : true);
  const zoomActive = MAP_ZOOM_ENABLED && isFocused;

  const overviewClusters = useMemo(
    () => clusterMarkers(markers, CLUSTER_DISTANCE),
    [markers],
  );

  const focusedPins = useMemo(() => {
    if (!focusedVoivId) return [];
    return spreadCloseMarkers(
      markers.filter((marker) => marker.voivId === focusedVoivId),
      SPREAD_DISTANCE,
    );
  }, [focusedVoivId, markers]);

  const fullViewBox = `0 0 ${width} ${height}`;
  const viewBox = useMemo(() => {
    if (!MAP_ZOOM_ENABLED || !focusedVoivId) return fullViewBox;
    const box = POLAND_VOIV_BBOX[focusedVoivId];
    if (!box) return fullViewBox;
    return fitViewBox(box, width, height);
  }, [focusedVoivId, fullViewBox, width, height]);

  return (
    <div
      className={cn(
        "flex w-full justify-center overflow-hidden",
        fluid ? "lg:justify-start" : "lg:justify-end",
        className,
      )}
    >
      <motion.svg
        viewBox={viewBox}
        initial={false}
        animate={{ viewBox }}
        transition={{
          duration: reduce || !MAP_ZOOM_ENABLED ? 0 : 0.55,
          ease: EASE_OUT,
        }}
        className={cn(
          "w-full overflow-hidden",
          !fluid && "max-w-120 xl:max-w-136",
          !interactive && "pointer-events-none",
        )}
        role="img"
        aria-label="Mapa Polski z podziałem na województwa i lokalizacjami salonów Elements"
      >
        <g>
          {polandVoivodeships.map((region) => {
            const hasSalon = activeVoivIds.has(region.id);
            const isHovered = interactive && hoveredVoivId === region.id;
            const isSelected = focusedVoivId === region.id;
            const isDimmed = zoomActive && !isSelected;

            return (
              <path
                key={region.id}
                d={region.d}
                className={cn(
                  "outline-none transition-[fill,opacity] duration-base ease-out",
                  tone === "onLight" ? "stroke-neutral-400" : "stroke-neutral-900",
                  hasSalon && interactive ? "cursor-pointer" : "cursor-default",
                  regionFillClassName({
                    tone,
                    hasSalon,
                    isHovered,
                    isSelected,
                    isDimmed,
                    zoomActive,
                  }),
                )}
                strokeWidth={zoomActive ? 0.6 : 1.1}
                onMouseEnter={() => {
                  if (hasSalon && interactive) setHoveredVoivId(region.id);
                }}
                onMouseLeave={() => setHoveredVoivId(null)}
                onClick={() => {
                  if (hasSalon && onVoivSelect && interactive) {
                    onVoivSelect(region.id);
                  }
                }}
              />
            );
          })}

          {zoomActive
            ? focusedPins.map((marker) => (
                <MapPin
                  key={marker.id}
                  x={marker.x}
                  y={marker.y}
                  hot={focusedVoivId === marker.voivId}
                />
              ))
            : overviewClusters.map((cluster) => (
                <MapPin
                  key={cluster.id}
                  x={cluster.x}
                  y={cluster.y}
                  count={cluster.count}
                  hot={
                    hoveredVoivId === cluster.voivId ||
                    focusedVoivId === cluster.voivId
                  }
                  interactive={interactive}
                  onHoverChange={(active) =>
                    setHoveredVoivId(active ? cluster.voivId : null)
                  }
                  onSelect={() => onVoivSelect?.(cluster.voivId)}
                />
              ))}
        </g>
      </motion.svg>
    </div>
  );
}
