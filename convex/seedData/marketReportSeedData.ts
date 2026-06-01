/**
 * Aztran Market Reports — Seed Data
 *
 * Usage:
 *   `npx convex run seedMarketReports:seedMarketReports`
 *
 * The historical seed payloads were removed to keep the repo lean. This array
 * is intentionally empty for now — add new report rows here (or re-introduce
 * continuation files importing from `./marketReportSeedTypes`) when seeding
 * data again. The seed mutation skips any `reportDate` that already exists.
 */

import type { MarketReportSeedData } from "./marketReportSeedTypes";
export type { MarketReportSeedData } from "./marketReportSeedTypes";

export const marketReportsSeedData: MarketReportSeedData[] = [];
