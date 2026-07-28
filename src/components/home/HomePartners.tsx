import { assetUrl } from "../../app/assets";
import { homePartners } from "../../data/home";
import { productImageObjectPosition } from "../../lib/productImageStyle";
import { cn } from "../../lib/cn";
import { Button } from "../ui/Button";
import { Container } from "../ui/Container";
import { Section } from "../structural/Section";
import { TextRevealLead } from "../motion/TextRevealLead";

export function HomePartners() {
  return (
    <Section ariaLabelledby="home-partners-title">
      <Container size="content">
        <div className="mx-auto mb-10 max-w-2xl text-center md:mb-12">
          <TextRevealLead
            id="home-partners-title"
            revealUnit="word"
            className="mx-auto max-w-none"
            typographyClassName="font-heading text-h2 leading-[1.1] tracking-tight font-medium"
            mutedClassName="text-neutral-900/20"
            fillClassName="text-neutral-900"
          >
            {homePartners.title}
          </TextRevealLead>
          <p className="mt-4 mb-0 text-sm leading-relaxed text-neutral-600 md:text-ui">
            {homePartners.lead}
          </p>
        </div>

        <ul className="m-0 grid list-none gap-8 p-0 lg:grid-cols-2 lg:gap-10">
          {homePartners.cards.map((card) => (
            <li key={card.id} className="min-w-0">
              <article className="flex h-full flex-col overflow-hidden rounded-xs border border-neutral-200 bg-neutral-0">
                <div className="relative aspect-16/10 overflow-hidden bg-neutral-200">
                  <img
                    src={card.image.src}
                    alt={card.image.alt}
                    className="absolute inset-0 size-full object-cover"
                    style={{ objectPosition: productImageObjectPosition(card.image) }}
                    loading="lazy"
                    draggable={false}
                  />
                </div>
                <div className="flex flex-1 flex-col p-6 md:p-8">
                  <h3 className="m-0 font-heading text-h3 leading-heading font-medium text-neutral-900">
                    {card.title}
                  </h3>
                  <p className="mt-3 mb-0 text-sm leading-relaxed text-neutral-600">
                    {card.description}
                  </p>
                  <ul className="mt-5 mb-0 flex list-none flex-col gap-2.5 p-0">
                    {card.benefits.map((benefit) => (
                      <li
                        key={benefit}
                        className="flex items-start gap-3 text-sm leading-relaxed text-neutral-700"
                      >
                        <img
                          src={assetUrl("sygnet.svg")}
                          alt=""
                          aria-hidden="true"
                          className="mt-1 size-3.5 shrink-0 opacity-70"
                          width={14}
                          height={14}
                        />
                        <span>{benefit}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-auto pt-6">
                    <Button
                      href={card.href}
                      variant="secondary"
                      className={cn("w-fit")}
                    >
                      {card.ctaLabel}
                      <i className="ph ph-arrow-right" aria-hidden="true" />
                    </Button>
                  </div>
                </div>
              </article>
            </li>
          ))}
        </ul>
      </Container>
    </Section>
  );
}
