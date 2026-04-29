import type { Metadata } from "next";
import type { ReactElement } from "react";
import { PageHero } from "@/components/layout/PageHero";
import { MarketReportsListing } from "@/components/sections/MarketReportsListing";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Investment Market Reports",
  description:
    "Daily and monthly investment market reports covering rates, bonds, equities, flows, and desk commentary from Aztran Global Investments.",
  path: "/insights/market-report",
});

export default function MarketReportInsightsPage(): ReactElement {
  return (
    <>
      <PageHero title="Market Report" imageSrc="/images/hero-bg.jpg" />
      <section className="py-section">
        <div className="mx-auto max-w-container px-4 md:px-8">
          <MarketReportsListing />
        </div>
      </section>
    </>
  );
}
