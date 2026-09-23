import type { Metadata } from "next";
import type { ReactElement } from "react";
import { PageHero } from "@/components/layout/PageHero";
import { MarketRecapsListing } from "@/components/sections/MarketRecapsListing";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Market Recaps",
  description:
    "Video wraps on what moved markets — rates, FX, equities, and flow — from the Aztran desk.",
  path: "/insights/market-recaps",
});

export default function MarketRecapsInsightsPage(): ReactElement {
  return (
    <>
      <PageHero
        title="Market Recaps"
        imageSrc="/images/hero-bg.jpg"
      />
      <section className="py-section">
        <div className="mx-auto max-w-container px-4 md:px-8">
          <MarketRecapsListing />
        </div>
      </section>
    </>
  );
}
