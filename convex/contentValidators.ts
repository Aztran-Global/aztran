import { v } from "convex/values";

/** Shared publish lifecycle */
export const publishStatus = v.union(
  v.literal("draft"),
  v.literal("published"),
  v.literal("archived"),
);

export const sectionNarrative = v.object({
  body: v.string(),
  outlook: v.string(),
});

export const moneyMarketRate = v.object({
  label: v.string(),
  today: v.number(),
  prev: v.number(),
  change: v.number(),
});

export const fgnBondRow = v.object({
  maturityDate: v.string(),
  coupon: v.number(),
  ttm: v.number(),
  yieldToday: v.number(),
  yieldPrev: v.number(),
  changeInYield: v.number(),
});

export const tbillRow = v.object({
  maturityDate: v.string(),
  dtm: v.number(),
  discRateToday: v.number(),
  discRatePrev: v.number(),
  changeInDiscRate: v.number(),
});

export const eurobondRow = v.object({
  sovereign: v.string(),
  maturityDate: v.string(),
  coupon: v.number(),
  ttm: v.number(),
  yieldToday: v.number(),
  yieldPrev: v.number(),
  changeInYield: v.number(),
});

export const equityTickerRow = v.object({
  ticker: v.string(),
  open: v.number(),
  close: v.number(),
  changePercent: v.number(),
});

export const globalIndexRow = v.object({
  region: v.string(),
  index: v.string(),
  open: v.number(),
  closeOrIntraday: v.number(),
  changePercent: v.number(),
  isIntraday: v.optional(v.boolean()),
});

export const blogSection = v.object({
  heading: v.optional(v.string()),
  paragraphs: v.array(v.string()),
  imageStorageId: v.optional(v.id("_storage")),
  imageCaption: v.optional(v.string()),
});

export const insightMetric = v.object({
  label: v.string(),
  yoyValue: v.optional(v.string()),
  yoyContext: v.optional(v.string()),
  momValue: v.optional(v.string()),
  momContext: v.optional(v.string()),
});

export const insightSection = v.object({
  heading: v.string(),
  bullets: v.array(v.string()),
});

// ─── GDP report structured data (insights with category === "GDP") ───────────

export const gdpHeadlineMetric = v.object({
  label: v.string(), // "Real Q1 GDP Growth Rate"
  value: v.string(), // "3.89%"
  context: v.string(), // "From 3.13% in Q1 2025"
  unit: v.optional(v.string()), // "%" | "₦TRN" | "mbpd"
});

export const gdpSectorRow = v.object({
  sector: v.string(), // "Arts, Entertainment, & Recreation"
  value: v.number(), // 11.25
  unit: v.optional(v.string()), // "%" growth or "%" contribution
});

export const gdpData = v.object({
  headlineMetrics: v.array(gdpHeadlineMetric),
  fastestGrowingSectors: v.array(gdpSectorRow),
  topContributingActivities: v.array(gdpSectorRow),
  oilSectorSharePercent: v.number(), // 3.92
  nonOilSectorSharePercent: v.number(), // 96.08
  sectorContributions: v.array(
    v.object({
      sector: v.string(), // "Services" | "Agriculture" | "Industries"
      sharePercent: v.number(), // 57.73
    }),
  ),
});

// ─── MPC report structured data (insights with category === "MPC") ───────────

export const mpcPolicyParameter = v.object({
  label: v.string(), // "MPR (Monetary Policy Rate)"
  value: v.string(), // "26.5%"
  status: v.union(
    v.literal("retained"),
    v.literal("increased"),
    v.literal("decreased"),
  ),
  subParameters: v.optional(
    v.array(
      v.object({
        label: v.string(), // "Commercial banks" | "Merchant banks"
        value: v.string(), // "45%" | "16%"
      }),
    ),
  ),
  // For the SFC corridor: stores the asymmetric values
  corridorValues: v.optional(
    v.object({
      upper: v.string(), // "+50"
      lower: v.string(), // "-450"
      standingLendingFacility: v.string(), // "27%"
      standingDepositFacility: v.string(), // "22%"
    }),
  ),
});

export const mpcData = v.object({
  meetingNumber: v.number(), // 305
  meetingDates: v.string(), // "May 19–20, 2026"
  parameters: v.array(mpcPolicyParameter),
  decisions: v.array(v.string()), // bullet-point decisions verbatim
});

export const marketReportMoneyMarket = v.object({
  systemLiquiditySummary: v.optional(v.string()),
  rates: v.array(moneyMarketRate),
  narrative: sectionNarrative,
});

export const marketReportTreasuryBills = v.object({
  averageBenchmarkRate: v.optional(v.number()),
  benchmarkRates: v.array(tbillRow),
  narrative: sectionNarrative,
});

export const marketReportFgnBonds = v.object({
  averageBenchmarkYield: v.optional(v.number()),
  bonds: v.array(fgnBondRow),
  narrative: sectionNarrative,
});

export const marketReportSsaEurobonds = v.object({
  bonds: v.array(eurobondRow),
  narrative: sectionNarrative,
});

export const marketReportLocalEquities = v.object({
  asiLevel: v.optional(v.number()),
  asiChangePercent: v.optional(v.number()),
  ytdReturn: v.optional(v.number()),
  marketCap: v.optional(v.string()),
  turnoverValue: v.optional(v.string()),
  volumeTraded: v.optional(v.string()),
  marketBreadthRatio: v.optional(v.number()),
  gainers: v.optional(v.number()),
  losers: v.optional(v.number()),
  topGainers: v.array(equityTickerRow),
  topLosers: v.array(equityTickerRow),
  narrative: sectionNarrative,
});

export const marketReportGlobalMarkets = v.object({
  isIntradayNote: v.optional(v.boolean()),
  indices: v.array(globalIndexRow),
  narrative: sectionNarrative,
});
