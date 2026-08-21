import { cn } from "../../lib/cn";

export type SalonHoursRow = {
  days: string;
  time: string;
};

type SalonHoursListProps = {
  hours: readonly SalonHoursRow[];
  className?: string;
};

/** Days | time columns - shared across salon cards, drawers, and hero. */
export function SalonHoursList({ hours, className }: SalonHoursListProps) {
  return (
    <ul
      className={cn(
        "m-0 grid list-none grid-cols-[auto_1fr] gap-x-4 gap-y-0.5 p-0",
        className,
      )}
    >
      {hours.map((row) => (
        <li key={row.days} className="contents">
          <span className="tabular-nums">{row.days}</span>
          <span className="tabular-nums">{row.time}</span>
        </li>
      ))}
    </ul>
  );
}
