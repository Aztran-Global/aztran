import type { Metadata } from "next";
import { HeroSection } from "@/components/sections/HeroSection";
import { AboutSnippetSection } from "@/components/sections/AboutSnippetSection";
import { ServicesSection } from "@/components/sections/ServicesSection";
import { WhyChooseUsSection } from "@/components/sections/WhyChooseUsSection";
import { ResearchShowcaseSection } from "@/components/sections/ResearchShowcaseSection";
import { ContactCTABand } from "@/components/sections/ContactCTABand";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata();

export default function HomePage(): React.ReactElement {
  return (
    <>
      <HeroSection />
      <AboutSnippetSection homepage />
      <ServicesSection homepage />
      <WhyChooseUsSection homepage />
      <ResearchShowcaseSection homepage />
      <ContactCTABand tone="airy" />
    </>
  );
}
