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
  capitalImportationData,
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
  capitalImportationData?: Infer<typeof capitalImportationData>;
}

export const insightsSeedData: InsightSeedData[] = [
  {
    title: "Nigeria Capital Importation Report — Q1 2026",
    slug: "nigeria-capital-importation-q1-2026",
    referenceDate: "2026-03-31",
    displayDate: "Q1 2026 | January – March 2026",
    category: "Capital Importation",
    tags: ["Capital Importation", "FPI", "FDI", "NBS", "Nigeria", "Q1 2026"],
    sources: ["NBS Capital Importation Report Q1 2026", "CBN commercial bank submissions"],
    status: "published",
    isFeatured: true,
    summary:
      "Nigeria recorded a record Q1 capital inflow of $10.37bn — the highest single quarter on record — driven overwhelmingly by portfolio investment (FPI) at 95.09% of total. The UK and US together accounted for 79.7% of all inflows, channelled primarily through Standard Chartered Bank.",
    readTimeMinutes: 4,
    pdfFileName: "Nigeria Capital Importation Q1-2026.pdf",
    seoTitle: "Nigeria Capital Importation Q1 2026 — Record $10.37bn Inflow | Aztran",
    seoDescription:
      "Nigeria's Q1 2026 capital importation hit a record $10.37bn, up 83.83% YoY, with FPI at 95.09% of total inflows. Aztran analysis of NBS data.",
    sections: [
      {
        heading: "Overview",
        bullets: [
          "Total capital importation reached $10.37bn in Q1 2026, the highest single quarter on record.",
          "YoY growth of 83.83% and QoQ growth of 60.97% signal accelerating foreign investor appetite for Nigerian assets.",
          "FPI dominated at $9.86bn (95.09% of total), reflecting strong carry-trade demand at OMO rates of 20.02–21.5% against inflation of 15.69%.",
        ],
      },
      {
        heading: "FDI Weakness",
        bullets: [
          "Foreign Direct Investment fell sharply to $135.08mn — a 62.25% QoQ decline — representing only 1.30% of total inflows.",
          "Structural barriers including regulatory complexity, infrastructure deficits, and security concerns continue to suppress productive capital.",
          "The divergence between hot-money portfolio flows and productive FDI remains a key structural vulnerability.",
        ],
      },
      {
        heading: "Sectoral & Geographic Concentration",
        bullets: [
          "Banking (72.79%) and Financing (23.42%) together absorbed 96.2% of all capital, reflecting the dominance of financial-sector carry plays.",
          "The United Kingdom ($5.08bn, 49.01%) and United States ($3.18bn, 30.69%) jointly account for 79.7% of total inflows.",
          "Standard Chartered Bank intermediated 42.56% of all capital received, followed by Stanbic IBTC (26.79%) and Rand Merchant Bank (8.97%).",
        ],
      },
    ],
    capitalImportationData: {
      period: "Q1 2026",
      headlineMetrics: [
        {
          label: "Total Capital Importation",
          value: "$10.37bn",
          change: "+83.83% YoY | +60.97% QoQ",
        },
        {
          label: "Portfolio Investment (FPI)",
          value: "$9.86bn",
          subtext: "95.09% of total inflows",
        },
        {
          label: "Foreign Direct Investment",
          value: "$135.08mn",
          change: "−62.25% QoQ",
          subtext: "1.30% of total",
        },
        {
          label: "Other Investments",
          value: "$374.48mn",
          change: "+20.35% YoY",
          subtext: "3.61% of total",
        },
      ],
      quarterlyTrend: [
        { quarter: "Q1 2024", value: 3 },
        { quarter: "Q2 2024", value: 3 },
        { quarter: "Q3 2024", value: 1 },
        { quarter: "Q4 2024", value: 5 },
        { quarter: "Q1 2025", value: 6 },
        { quarter: "Q2 2025", value: 5 },
        { quarter: "Q3 2025", value: 6 },
        { quarter: "Q4 2025", value: 6 },
        { quarter: "Q1 2026", value: 10 },
      ],
      composition: [
        { label: "FPI", sharePercent: 95.09 },
        { label: "FDI", sharePercent: 1.3 },
        { label: "Other", sharePercent: 3.61 },
      ],
      topSectors: [
        { sector: "Banking", sharePercent: 72.79 },
        { sector: "Financing", sharePercent: 23.42 },
        { sector: "Production/Mfg", sharePercent: 1.47 },
        { sector: "Others", sharePercent: 2.32 },
      ],
      countryOrigins: [
        { country: "United Kingdom", inflowMn: 5082.09, sharePercent: 49.01 },
        { country: "United States", inflowMn: 3183.49, sharePercent: 30.69 },
        { country: "South Africa", inflowMn: 983.83, sharePercent: 9.49 },
        { country: "Others", inflowMn: 1122.49, sharePercent: 10.81 },
      ],
      topBanks: [
        { bank: "Standard Chartered", sharePercent: 42.56 },
        { bank: "Stanbic IBTC Bank", sharePercent: 26.79 },
        { bank: "Rand Merchant Bank", sharePercent: 8.97 },
      ],
      keyInsights: [
        "Record Q1 inflow of $10.37bn — highest single quarter on record.",
        "FPI dominance at 95.09% signals strong carry-trade appetite at 20.02–21.5% OMO; implies a real positive return with inflation at 15.69%.",
        "FDI fell 62.25% QoQ to $135mn — structural barriers persist.",
        "UK & US together account for 79.7% of all inflows.",
      ],
    },
  },
];
