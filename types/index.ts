import type { Doc } from "../convex/_generated/dataModel";

export type InsightDoc = Doc<"insights">;
export type BlogPostDoc = Doc<"blogPosts">;
export type MarketReportDoc = Doc<"marketReports">;
export type PortfolioDoc = Doc<"portfolio">;
export type StatDoc = Doc<"stats">;
export type ContactSubmissionDoc = Doc<"contactSubmissions">;

export type PortfolioStatus = PortfolioDoc["status"];
export type PortfolioSector = PortfolioDoc["sector"];

/** Structured insight infographic data (synced with the Convex schema). */
export type GdpData = NonNullable<InsightDoc["gdpData"]>;
export type GdpHeadlineMetric = GdpData["headlineMetrics"][number];
export type GdpSectorRow = GdpData["fastestGrowingSectors"][number];
export type GdpSectorContribution = GdpData["sectorContributions"][number];

export type MpcData = NonNullable<InsightDoc["mpcData"]>;
export type MpcPolicyParameter = MpcData["parameters"][number];
export type MpcParameterStatus = MpcPolicyParameter["status"];
export type MpcSubParameter = NonNullable<
  MpcPolicyParameter["subParameters"]
>[number];

export type CapitalImportationData = NonNullable<InsightDoc["capitalImportationData"]>;
export type CapitalImportationHeadlineMetric = CapitalImportationData["headlineMetrics"][number];
export type CapitalImportationQuarterRow = CapitalImportationData["quarterlyTrend"][number];
export type CapitalImportationCompositionRow = CapitalImportationData["composition"][number];
export type CapitalImportationSectorRow = CapitalImportationData["topSectors"][number];
export type CapitalImportationCountryRow = CapitalImportationData["countryOrigins"][number];
export type CapitalImportationBankRow = CapitalImportationData["topBanks"][number];
