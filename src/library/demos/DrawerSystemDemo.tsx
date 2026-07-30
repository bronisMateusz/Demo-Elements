import { useState } from "react";
import { InspirationProductsDrawer } from "../../components/inspiration/InspirationProductsDrawer";
import { MobileDrawer } from "../../components/layout/MobileDrawer";
import { SalonDrawer } from "../../components/layout/SalonDrawer";
import { AskDrawer } from "../../components/product/AskDrawer";
import { Button } from "../../components/ui/Button";
import { homeInspiration } from "../../data/home";
import { montebianco80 } from "../../data/products/montebianco-80";

export function SalonDrawerDemo() {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex flex-col items-start gap-4 p-[clamp(1.25rem,2.222vw,2.5rem)] md:p-8">
      <p className="m-0 max-w-xl text-sm text-neutral-600">
        Drawer wyboru salonu - wyszukiwanie, geolokalizacja i zapis wyboru
        (localStorage). Na mobile search siedzi w sticky footerze. Otwierany z
        headera, HeaderSalonStrip i karty salonu na PDP.
      </p>
      <Button
        as="button"
        type="button"
        variant="secondary"
        onClick={() => setOpen(true)}
      >
        Otwórz wybór salonu
      </Button>
      <SalonDrawer open={open} onClose={() => setOpen(false)} />
    </div>
  );
}

export function AskDrawerDemo() {
  const [open, setOpen] = useState(false);
  const image = montebianco80.images[0];

  return (
    <div className="flex flex-col items-start gap-4 p-[clamp(1.25rem,2.222vw,2.5rem)] md:p-8">
      <p className="m-0 max-w-xl text-sm text-neutral-600">
        Formularz pytania o produkt - karta produktu, pola wymagane i wiadomość
        z prefillem. Wspólny DrawerShell.
      </p>
      <Button
        as="button"
        type="button"
        variant="primary"
        onClick={() => setOpen(true)}
      >
        Zadaj pytanie
      </Button>
      <AskDrawer
        open={open}
        onClose={() => setOpen(false)}
        productTitle={montebianco80.title}
        productBrand={montebianco80.brand}
        productSku={montebianco80.sku}
        productImage={image}
      />
    </div>
  );
}

export function InspirationProductsDrawerDemo() {
  const [open, setOpen] = useState(false);
  const arrangement =
    homeInspiration.arrangements.find((item) => item.showProducts) ??
    homeInspiration.arrangements[0];

  return (
    <div className="flex flex-col items-start gap-4 p-[clamp(1.25rem,2.222vw,2.5rem)] md:p-8">
      <p className="m-0 max-w-xl text-sm text-neutral-600">
        Drawer produktów z aranżacji (chip „Pokaż produkty” w InspirationGallery).
        Montowany w Header - otwierany przez{" "}
        <code className="text-xs">requestInspirationProductsDrawer</code>.
      </p>
      <Button
        as="button"
        type="button"
        variant="secondary"
        onClick={() => setOpen(true)}
      >
        Pokaż produkty aranżacji
      </Button>
      <InspirationProductsDrawer
        open={open}
        arrangement={arrangement}
        onClose={() => setOpen(false)}
      />
    </div>
  );
}

export function MobileDrawerDemo() {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex flex-col items-start gap-4 p-[clamp(1.25rem,2.222vw,2.5rem)] md:p-8">
      <p className="m-0 max-w-xl text-sm text-neutral-600">
        Menu mobilne (lg:hidden) - główna nawigacja z drill-down Produktów oraz
        linki z utility bar (strefy, blog, salony).
      </p>
      <Button
        as="button"
        type="button"
        variant="secondary"
        onClick={() => setOpen(true)}
      >
        Otwórz menu
      </Button>
      <MobileDrawer open={open} onClose={() => setOpen(false)} />
    </div>
  );
}
