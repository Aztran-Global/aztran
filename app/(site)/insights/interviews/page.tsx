import type { Metadata } from "next";
import type { ReactElement } from "react";
import { PageHero } from "@/components/layout/PageHero";
import { InterviewsListing } from "@/components/sections/InterviewsListing";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Leadership Interviews",
  description:
    "Watch Aztran managing directors in conversation at conferences, panels, and industry forums — expert perspectives on markets and policy.",
  path: "/insights/interviews",
});

export default function InterviewsInsightsPage(): ReactElement {
  return (
    <>
      <PageHero
        title="Interviews"
        imageSrc="/images/hero-bg.jpg"
      />
      <section className="py-section">
        <div className="mx-auto max-w-container px-4 md:px-8">
          <InterviewsListing />
        </div>
      </section>
    </>
  );
}
