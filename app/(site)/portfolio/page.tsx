import type { Metadata } from "next";
import type { ReactElement } from "react";
import { PageHero } from "@/components/layout/PageHero";
// import { PortfolioStatsSection } from "@/components/sections/PortfolioStatsSection";
// import { PortfolioFeaturedSection } from "@/components/sections/PortfolioFeaturedSection";
// import { PortfolioDealsGrid } from "@/components/sections/PortfolioDealsGrid";
import { ContactCTABand } from "@/components/sections/ContactCTABand";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Investment Portfolio",
  description:
    "Explore Aztran Global Investments portfolio focus, active mandates, realised investments, and sector opportunities.",
  path: "/portfolio",
});

export default function PortfolioPage(): ReactElement {
  return (
    <>
      <PageHero title="Investment Portfolio" imageSrc="/images/hero-bg.jpg" />
      {/* Portfolio body temporarily hidden
      <PortfolioStatsSection />
      <PortfolioFeaturedSection />
      <PortfolioDealsGrid />
      */}
      <ContactCTABand />
    </>
  );
}
