import type { Metadata } from "next";
import type { ReactElement } from "react";
import { PageHero } from "@/components/layout/PageHero";
import { BlogListing } from "@/components/sections/BlogListing";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Market Buzz",
  description:
    "Short-form investment commentary, market movers, and trading desk observations from Aztran Global Investments.",
  path: "/insights/market-buzz",
});

export default function MarketBuzzInsightsPage(): ReactElement {
  return (
    <>
      <PageHero title="Market Buzz" imageSrc="/images/hero-bg.jpg" />
      <section className="py-section">
        <div className="mx-auto max-w-container px-4 md:px-8">
          <BlogListing hideCategoryTabs />
        </div>
      </section>
    </>
  );
}
