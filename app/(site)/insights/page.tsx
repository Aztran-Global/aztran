import type { Metadata } from "next";
import type { ReactElement } from "react";
import { PageHero } from "@/components/layout/PageHero";
import { InsightsListing } from "@/components/sections/InsightsListing";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Investment Insights",
  description:
    "Read market reports, macro research, investment commentary, and cross-asset views from Aztran Global Investments.",
  path: "/insights",
});

export default function InsightsPage(): ReactElement {
  return (
    <>
      <PageHero title="Insights" imageSrc="/images/hero-bg.jpg" />
      <section className="py-section">
        <div className="mx-auto max-w-container px-4 md:px-8">
          <InsightsListing />
        </div>
      </section>
    </>
  );
}
