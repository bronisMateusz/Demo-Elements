import { useState } from "react";
import {
  AdvisorCta,
  type AdvisorCtaContent,
} from "../../components/marketing/AdvisorCta";
import { AdvisorAskDrawer } from "../../components/marketing/AdvisorAskDrawer";
import { RealizationSubmitDrawer } from "../../components/marketing/RealizationSubmitDrawer";
import { inspirationArticlePage } from "../../data/inspirationArticle";

type AdvisorCtaDuoDemoProps = {
  titleId?: string;
  showBook?: boolean;
};

/** Inspiration article final CTA - duo panels without media. */
export function AdvisorCtaDuoDemo({
  titleId = "lib-advisor-duo-title",
  showBook = false,
}: AdvisorCtaDuoDemoProps) {
  const [askOpen, setAskOpen] = useState(false);
  const [realizationOpen, setRealizationOpen] = useState(false);
  const secondary = inspirationArticlePage.finalCta.secondary;

  const content: AdvisorCtaContent = {
    eyebrow: inspirationArticlePage.finalCta.eyebrow,
    title: inspirationArticlePage.finalCta.title,
    description: inspirationArticlePage.finalCta.description,
    askLabel: inspirationArticlePage.finalCta.askLabel,
    bookLabel: inspirationArticlePage.finalCta.bookLabel,
    secondary: secondary
      ? {
          eyebrow: secondary.eyebrow,
          title: secondary.title,
          description: secondary.description,
          ctaLabel: secondary.ctaLabel,
          onCtaClick: () => setRealizationOpen(true),
        }
      : undefined,
  };

  return (
    <>
      <AdvisorCta
        titleId={titleId}
        content={content}
        onAskOpen={() => setAskOpen(true)}
        showBook={showBook}
      />
      <AdvisorAskDrawer
        open={askOpen}
        onClose={() => setAskOpen(false)}
        topicTitle={inspirationArticlePage.title}
      />
      <RealizationSubmitDrawer
        open={realizationOpen}
        onClose={() => setRealizationOpen(false)}
      />
    </>
  );
}
