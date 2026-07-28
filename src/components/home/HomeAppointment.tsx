import { motion, useReducedMotion } from "motion/react";
import { homeAppointment } from "../../data/home";
import { requestSalonDrawer } from "../../hooks/useSelectedSalon";
import { useScrollExpandInset } from "../../hooks/useScrollExpandInset";
import { EASE_OUT } from "../../lib/motionEase";
import { LiquidCtaGlow } from "../motion/LiquidCtaGlow";
import { TextRevealLead } from "../motion/TextRevealLead";
import { Button } from "../ui/Button";
import { Eyebrow } from "../ui/Eyebrow";

export function HomeAppointment() {
  const reducedMotion = useReducedMotion();
  const { targetRef, sideInset } = useScrollExpandInset<HTMLElement>();
  const { eyebrow, title, description, ctaLabel } = homeAppointment;

  return (
    <section
      ref={targetRef}
      aria-labelledby="home-appointment-title"
      className="py-[clamp(2rem,5vw,3rem)] md:py-[clamp(2.5rem,6vw,4rem)]"
    >
      <motion.div
        className="relative overflow-hidden rounded-xs"
        style={{ marginLeft: sideInset, marginRight: sideInset }}
      >
        <LiquidCtaGlow />

        <div className="relative z-10 mx-auto flex min-h-80 max-w-3xl flex-col items-center justify-center px-6 py-12 text-center md:min-h-100 md:px-10 md:py-16">
          <Eyebrow variant="gold" className="mb-4 justify-center text-gold-400">
            {eyebrow}
          </Eyebrow>
          <TextRevealLead
            id="home-appointment-title"
            revealUnit="word"
            className="mx-auto max-w-none text-balance"
            typographyClassName="font-heading text-[clamp(1.875rem,3.5vw,3rem)] leading-[1.12] tracking-tight font-medium"
            mutedClassName="text-neutral-0/30"
            fillClassName="text-neutral-0"
          >
            {title}
          </TextRevealLead>
          <p className="mt-4 mb-0 max-w-xl text-sm leading-relaxed text-neutral-200 md:text-ui">
            {description}
          </p>
          <motion.div
            className="mt-8"
            initial={reducedMotion ? false : { opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 0.7, delay: 0.12, ease: EASE_OUT }}
          >
            <Button
              as="button"
              type="button"
              variant="primary"
              size="lg"
              className="border-neutral-0 bg-neutral-0 text-neutral-900 hover:border-gold-500 hover:text-neutral-0"
              onClick={requestSalonDrawer}
            >
              {ctaLabel}
              <i className="ph ph-arrow-right" aria-hidden="true" />
            </Button>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
