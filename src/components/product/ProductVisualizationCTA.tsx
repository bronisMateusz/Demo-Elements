import { motion, useReducedMotion } from "motion/react";
import { cn } from "../../lib/cn";
import { useScrollExpandInset } from "../../hooks/useScrollExpandInset";
import { Button } from "../ui/Button";
import { LiquidCtaGlow } from "../motion/LiquidCtaGlow";
import { TextRevealLead } from "../motion/TextRevealLead";
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
  const { targetRef, sideInset } = useScrollExpandInset();

  return (
    <section
      ref={targetRef}
      aria-labelledby="viz-cta-title"
      className="py-8 md:py-[var(--spacing-section-sm)] lg:py-[var(--spacing-section)]"
    >
      <motion.div
        className="relative overflow-hidden rounded-xs"
        style={{ marginLeft: sideInset, marginRight: sideInset }}
      >
        <LiquidCtaGlow />

        <div className="relative z-10 mx-auto flex min-h-[380px] max-w-5xl flex-col items-center justify-center px-6 py-10 text-center md:min-h-[560px] md:px-10 md:py-18">
          <TextRevealLead
            id="viz-cta-title"
            revealUnit="word"
            className="mx-auto max-w-none text-balance"
            typographyClassName="font-heading text-[clamp(34px,4.1vw,62px)] leading-[1.12] tracking-tight"
            mutedClassName="text-neutral-0/30"
            fillClassName="text-neutral-0"
          >
            {title}
          </TextRevealLead>

          <motion.div
            className="mt-6 flex flex-wrap items-center justify-center gap-3 md:mt-8"
            initial={reducedMotion ? false : { opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 0.7, delay: 0.12, ease: EASE_OUT }}
          >
            <Button
              href={href}
              variant="primary"
              size="lg"
              className="border-neutral-0 bg-neutral-0 text-neutral-900 hover:border-gold-500 hover:text-neutral-0 focus-visible:border-gold-500 focus-visible:text-neutral-0"
            >
              {label}
              <i className="ph ph-arrow-right" aria-hidden="true" />
            </Button>
            {secondary ? (
              <Button
                href={secondary.href}
                variant="secondary"
                size="lg"
                className={cn(
                  "border-neutral-0/45 bg-neutral-0/10 text-neutral-0 backdrop-blur-sm",
                  "hover:border-gold-500 hover:text-neutral-0",
                  "focus-visible:border-gold-500 focus-visible:text-neutral-0",
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
      </motion.div>
    </section>
  );
}
