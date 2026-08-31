import { cn } from "../../lib/cn";

export type SalonHoursRow = {
  days: string;
  time: string;
};

type SalonHoursListProps = {
  hours: readonly SalonHoursRow[];
  className?: string;
};

/** Day | time pairs in a shared grid so times align in one column. */
export function SalonHoursList({ hours, className }: SalonHoursListProps) {
  return (
    <ul
      className={cn(
        "m-0 grid w-fit list-none grid-cols-[auto_auto] gap-x-4 gap-y-0.5 p-0",
        className,
      )}
    >
      {hours.map((row) => (
        <li key={row.days} className="contents">
          <span className="whitespace-nowrap">{row.days}</span>
          <span className="whitespace-nowrap tabular-nums">{row.time}</span>
        </li>
      ))}
    </ul>
  );
}
