import { homeAbout } from "../../data/home";
import { productImageObjectPosition } from "../../lib/productImageStyle";
import { BrandMotif } from "../brand/BrandMotif";
import { Container } from "../ui/Container";
import { Section } from "../structural/Section";
import { TextRevealLead } from "../motion/TextRevealLead";

export function HomeAbout() {
  const { title, lead, subtitle, body, image } = homeAbout;

  return (
    <Section
      ariaLabelledby="home-about-title"
      className="relative z-0 overflow-visible bg-neutral-0"
    >
      <BrandMotif
        name="circle-beige"
        className="absolute top-8 -inset-e-24 size-[min(55vw,22rem)] opacity-40 max-md:hidden"
      />
      <BrandMotif
        name="arc-light"
        className="absolute -bottom-24 -inset-s-36 size-[min(60vw,24rem)] opacity-40 max-md:hidden"
      />

      <Container size="content" className="relative z-10">
        <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:gap-14">
          <div className="relative min-w-0">
            <TextRevealLead
              id="home-about-title"
              revealUnit="word"
              className="mb-10 max-w-xl md:mb-12"
              typographyClassName="font-heading text-h2 leading-[1.1] tracking-tight font-medium"
              mutedClassName="text-neutral-900/20"
              fillClassName="text-neutral-900"
            >
              {title}
            </TextRevealLead>
            <div>
              <p className="m-0 mb-8 max-w-prose font-body text-base leading-relaxed text-neutral-700">
                {lead}
              </p>
              <div>
                <h3 className="t-h3 mb-5 max-w-prose text-balance">
                  {subtitle}
                </h3>
                <p className="m-0 max-w-prose font-body text-base leading-relaxed text-neutral-700">
                  {body.map((part, index) =>
                    typeof part === "string" ? (
                      <span key={index}>{part}</span>
                    ) : (
                      <strong
                        key={index}
                        className="font-semibold text-neutral-800"
                      >
                        {part.bold}
                      </strong>
                    ),
                  )}
                </p>
              </div>
            </div>
          </div>

          <div className="relative overflow-hidden rounded-xs bg-neutral-200">
            <img
              src={image.src}
              alt={image.alt}
              className="aspect-4/5 w-full object-cover"
              style={{ objectPosition: productImageObjectPosition(image) }}
              loading="lazy"
              draggable={false}
            />
          </div>
        </div>
      </Container>
    </Section>
  );
}
