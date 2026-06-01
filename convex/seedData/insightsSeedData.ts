/**
 * Aztran Insights — Seed Data (GDP / MPC / Inflation / general)
 *
 * Run: `npx convex run seedInsights:seedInsights`
 *
 * The mutation skips any `slug` that already exists, so it is safe to re-run.
 * Cover images / PDFs are attached later via Admin → Insights → edit. After
 * seeding, this array is emptied again to keep the repo lean.
 *
 * PDF File → Insight mapping:
 *   Insight_example.pdf       → 2026-02-28  (Feb inflation)
 *   Inflation_for_March_.pdf  → 2026-03-31  (Mar inflation)
 *   GDP_Q1_2026-1.pdf         → 2026-03-31  (Q1 GDP)
 *   The_305th_MPC__2_.pdf     → 2026-05-20  (305th MPC)
 */

import { type Infer } from "convex/values";
import {
  gdpData,
  insightMetric,
  insightSection,
  mpcData,
} from "../contentValidators";

export interface InsightSeedData {
  title: string;
  slug: string;
  referenceDate: string;
  displayDate: string;
  category: string;
  tags: string[];
  sources: string[];
  status: "draft" | "published" | "archived";
  isFeatured: boolean;
  summary: string;
  sections: Infer<typeof insightSection>[];
  readTimeMinutes?: number;
  pdfFileName?: string;
  seoTitle?: string;
  seoDescription?: string;
  metrics?: Infer<typeof insightMetric>[];
  gdpData?: Infer<typeof gdpData>;
  mpcData?: Infer<typeof mpcData>;
}

export const insightsSeedData: InsightSeedData[] = [];
