import { useState } from "react";
import { SalonDrawer } from "../../components/layout/SalonDrawer";
import { AskDrawer } from "../../components/product/AskDrawer";
import { Button } from "../../components/ui/Button";
import { montebianco80 } from "../../data/products/montebianco-80";

export function SalonDrawerDemo() {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex flex-col items-start gap-4 p-gutter md:p-8">
      <p className="m-0 max-w-xl text-sm text-neutral-600">
        Drawer wyboru salonu - wyszukiwanie, geolokalizacja i zapis wyboru (localStorage).
        Ten sam komponent otwierany z headera, karty salonu na PDP i menu mobilnego.
      </p>
      <Button as="button" type="button" variant="secondary" onClick={() => setOpen(true)}>
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
    <div className="flex flex-col items-start gap-4 p-gutter md:p-8">
      <p className="m-0 max-w-xl text-sm text-neutral-600">
        Formularz pytania o produkt - karta produktu, pola wymagane i wiadomość
        z prefillem. Wspólny DrawerShell z SalonDrawer i MobileDrawer.
      </p>
      <Button as="button" type="button" variant="primary" onClick={() => setOpen(true)}>
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
