import type { Metadata } from "next";
import type { ReactElement } from "react";
import { PageHero } from "@/components/layout/PageHero";
import { InsightsListing } from "@/components/sections/InsightsListing";
import { createPageMetadata } from "@/lib/seo";
import { INSIGHT_CATEGORIES } from "@/lib/site-nav";

export const metadata: Metadata = createPageMetadata({
  title: "Macro Investment Reports",
  description:
    "Macro research, rates commentary, fixed income views, and cross-asset investment perspectives from Aztran Global Investments.",
  path: "/insights/macro-report",
});

export default function MacroReportInsightsPage(): ReactElement {
  return (
    <>
      <PageHero title="Macro Report" imageSrc="/images/hero-bg.jpg" />
      <section className="py-section">
        <div className="mx-auto max-w-container px-4 md:px-8">
          <InsightsListing forcedCategory={INSIGHT_CATEGORIES.macroReport} />
        </div>
      </section>
    </>
  );
}
