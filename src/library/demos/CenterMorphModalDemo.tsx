import { useState } from "react";
import { ShareLinkModal } from "../../components/marketing/ShareLinkModal";
import { Button } from "../../components/ui/Button";

export function CenterMorphModalDemo() {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <Button
        as="button"
        type="button"
        variant="secondary"
        onClick={() => setOpen(true)}
      >
        <i className="ph ph-share-network" aria-hidden="true" />
        Udostępnij link
      </Button>
      <ShareLinkModal open={open} onClose={() => setOpen(false)} />
    </div>
  );
}
