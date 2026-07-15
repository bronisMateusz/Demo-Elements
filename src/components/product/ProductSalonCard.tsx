import { Button } from "../ui/Button";
import { cn } from "../../lib/cn";

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
    <div
      id={id}
      className={cn("grid gap-3 rounded-xs bg-neutral-800 p-6 text-neutral-0 shadow-subtle", className)}
      aria-live="polite"
    >
      <p className="m-0 font-body text-xs font-medium uppercase tracking-wide text-gold-500">
        {eyebrow}
      </p>
      <p className="m-0 font-body text-ui leading-compact text-white/88">{description}</p>
      <Button
        href={href}
        variant="gold"
        full
        className="mt-1 border-transparent bg-gold-500 text-neutral-0 before:bg-gold-600 hover:border-transparent hover:text-neutral-0 focus-visible:border-transparent focus-visible:text-neutral-0"
      >
        {label}
      </Button>
    </div>
  );
}
