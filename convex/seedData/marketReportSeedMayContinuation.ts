import {
  normalizeLegacyMarketReports,
  type LegacyMarketReportRaw,
} from "./normalizeLegacyMarketReports";
import { legacyMarketReportsMay } from "./marketReportSeedMayRaw";
import type { MarketReportSeedData } from "./marketReportSeedTypes";

export const marketReportsSeedDataMayContinuation: MarketReportSeedData[] =
  normalizeLegacyMarketReports(legacyMarketReportsMay as LegacyMarketReportRaw[]);
