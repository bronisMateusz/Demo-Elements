import { motion, useReducedMotion } from "motion/react";
import { cn } from "../../lib/cn";
import { Container } from "../ui/Container";
import { Button } from "../ui/Button";
import { LiquidCtaGlow } from "../motion/LiquidCtaGlow";
import { textRevealLeadTypographyClassName } from "../motion/TextRevealLead";
import { EASE_OUT } from "../../lib/motionEase";

type ProductVisualizationCTAProps = {
  title: string;
  href: string;
  label: string;
  note?: string;
  secondary?: {
    href: string;
    label: string;
  };
};

export function ProductVisualizationCTA({
  title,
  href,
  label,
  note = "Bezpłatna wizualizacja · Bez zobowiązań",
  secondary,
}: ProductVisualizationCTAProps) {
  const reducedMotion = useReducedMotion();

  return (
    <section
      aria-labelledby="viz-cta-title"
      className="py-[var(--spacing-section-sm)] md:py-[var(--spacing-section)]"
    >
      <Container>
        <div className="relative overflow-hidden rounded-xs">
          <LiquidCtaGlow />

          <div className="relative z-10 mx-auto flex min-h-[min(360px,52vh)] max-w-3xl flex-col items-center justify-center px-6 py-10 text-center md:min-h-[min(420px,48vh)] md:px-10 md:py-14">
            <motion.h2
              id="viz-cta-title"
              className={cn(
                textRevealLeadTypographyClassName,
                "mx-auto text-balance text-neutral-0",
              )}
              initial={reducedMotion ? false : { opacity: 0, filter: "blur(10px)", y: 12 }}
              whileInView={{ opacity: 1, filter: "blur(0px)", y: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ duration: 0.85, ease: EASE_OUT }}
            >
              {title}
            </motion.h2>

            <motion.div
              className="mt-8 flex flex-wrap items-center justify-center gap-3"
              initial={reducedMotion ? false : { opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ duration: 0.7, delay: 0.12, ease: EASE_OUT }}
            >
              <Button
                href={href}
                variant="primary"
                size="sm"
                className="border-neutral-0 bg-neutral-0 text-neutral-900 hover:border-neutral-100 hover:bg-neutral-100 hover:text-neutral-900 focus-visible:border-neutral-0 focus-visible:text-neutral-900"
              >
                {label}
                <i className="ph ph-arrow-right" aria-hidden="true" />
              </Button>
              {secondary ? (
                <Button
                  href={secondary.href}
                  variant="secondary"
                  size="sm"
                  className={cn(
                    "border-neutral-0/45 bg-neutral-0/10 text-neutral-0 backdrop-blur-sm",
                    "hover:border-neutral-0/70 hover:bg-neutral-0/18 hover:text-neutral-0",
                    "focus-visible:border-neutral-0 focus-visible:text-neutral-0",
                  )}
                >
                  {secondary.label}
                </Button>
              ) : null}
            </motion.div>

            {note ? (
              <motion.p
                className="mt-5 font-body text-sm text-neutral-0/75"
                initial={reducedMotion ? false : { opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true, margin: "-10%" }}
                transition={{ duration: 0.6, delay: 0.2, ease: EASE_OUT }}
              >
                {note}
              </motion.p>
            ) : null}
          </div>
        </div>
      </Container>
    </section>
  );
}
