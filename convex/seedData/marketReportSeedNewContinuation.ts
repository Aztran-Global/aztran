import {
  normalizeLegacyMarketReports,
  type LegacyMarketReportRaw,
} from "./normalizeLegacyMarketReports";
import { legacyMarketReportsNew } from "./marketReportSeedNewRaw";
import type { MarketReportSeedData } from "./marketReportSeedTypes";

export const marketReportsSeedDataNewContinuation: MarketReportSeedData[] =
  normalizeLegacyMarketReports(legacyMarketReportsNew as LegacyMarketReportRaw[]);
