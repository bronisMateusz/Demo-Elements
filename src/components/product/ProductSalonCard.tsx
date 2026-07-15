import { cn } from "../../lib/cn";
import { Eyebrow } from "../ui/Eyebrow";

type ProductSalonCardProps = {
  eyebrow: string;
  description: string;
  href: string;
  label: string;
  id?: string;
  className?: string;
};

export function ProductSalonCard({
  eyebrow,
  description,
  href,
  label,
  id = "salonCard",
  className,
}: ProductSalonCardProps) {
  return (
    <aside
      id={id}
      className={cn(
        "group/salon relative overflow-hidden rounded-xs border border-neutral-800/10 bg-neutral-900 px-6 py-7 sm:px-8 sm:py-8",
        className,
      )}
      aria-labelledby={`${id}-title`}
    >
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_0%_0%,rgba(184,151,90,0.22),transparent_58%)]"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute inset-y-0 right-0 w-1/3 bg-[radial-gradient(circle_at_100%_50%,rgba(240,232,214,0.07),transparent_70%)]"
        aria-hidden="true"
      />

      <div className="relative flex flex-col">
        <Eyebrow variant="gold" className="mb-3 text-gold-400">
          {eyebrow}
        </Eyebrow>
        <p
          id={`${id}-title`}
          className="mb-0 font-heading text-[clamp(18px,1.75vw,22px)] leading-heading text-neutral-0"
        >
          {description}
        </p>

        <a
          href={href}
          className={cn(
            "mt-6 flex items-center justify-between gap-4 border-t border-neutral-0/10 pt-5",
            "font-body text-sm font-medium text-gold-400 no-underline",
            "transition-[color,border-color] duration-base ease-luxury",
            "hover:border-neutral-0/20 hover:text-neutral-0 focus-visible:text-neutral-0",
            "focus-visible:outline-2 focus-visible:outline-offset-[var(--spacing-focus-ring-offset)] focus-visible:outline-neutral-0",
            "group-hover/salon:text-gold-100",
          )}
        >
          <span>{label}</span>
          <i
            className="ph ph-arrow-right text-base leading-none transition-transform duration-base ease-luxury group-hover/salon:translate-x-1"
            aria-hidden="true"
          />
        </a>
      </div>
    </aside>
  );
}
