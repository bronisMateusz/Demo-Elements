import { BrandMotif } from "../brand/BrandMotif";
import { Container } from "../ui/Container";
import { cn } from "../../lib/cn";

type BrandAboutProps = {
  paragraphs: readonly string[];
  /** Accessible name when there is no visible heading. */
  ariaLabel?: string;
  className?: string;
};

/** Brand story copy with ProductEditorial-style motif backdrop. */
export function BrandAbout({
  paragraphs,
  ariaLabel = "O marce",
  className,
}: BrandAboutProps) {
  if (paragraphs.length === 0) return null;

  return (
    <section
      aria-label={ariaLabel}
      className={cn(
        "relative overflow-visible py-[clamp(2.5rem,6vw,4rem)]",
        className,
      )}
    >
      <BrandMotif
        name="circle-beige"
        className="absolute -top-24 -inset-e-20 size-[min(70vw,28rem)] opacity-40 max-md:hidden"
      />
      <BrandMotif
        name="arc-light"
        className="absolute -bottom-8 -inset-s-16 size-[min(50vw,18rem)] opacity-50 max-md:hidden"
      />

      <Container size="content" className="relative z-10">
        <div className="max-w-190 space-y-4 md:space-y-6">
          {paragraphs.map((paragraph) => (
            <p
              key={paragraph.slice(0, 32)}
              className="m-0 font-body text-ui leading-relaxed text-neutral-600 md:text-lg"
            >
              {paragraph}
            </p>
          ))}
        </div>
      </Container>
    </section>
  );
}
