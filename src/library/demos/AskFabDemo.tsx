import { AskFab } from "../../components/product/AskFab";
import { montebianco80 } from "../../data/products/montebianco-80";

/** Live AskFab forced into the preview flow (not sticky over the library chrome). */
export function AskFabDemo() {
  const image = montebianco80.images[0];

  return (
    <div className="relative flex flex-col gap-4 p-[clamp(0.75rem,2.222vw,2.5rem)] md:p-8">
      <p className="m-0 max-w-xl text-sm text-neutral-600">
        Sticky bar PDP - schowek (na mobile sama ikona) + „Zadaj pytanie”. Na
        stronie produktu pojawia się po scrollu i znika przed stopką; tu podgląd
        w miejscu.
      </p>
      <div className="relative overflow-hidden rounded-xs border border-neutral-300 bg-neutral-50">
        <AskFab
          sku={montebianco80.id}
          title={montebianco80.title}
          brand={montebianco80.brand}
          productSku={montebianco80.sku}
          price={montebianco80.price.current}
          image={image}
          showAfterScroll={-1}
          className="static inset-auto translate-y-0 pointer-events-auto lg:inset-auto lg:bottom-auto lg:w-full lg:translate-x-0"
        />
      </div>
      {/* AskFab only arms visibility when a contentinfo footer exists. */}
      <footer role="contentinfo" className="sr-only" aria-hidden="true" />
    </div>
  );
}
