import { legacyMarketReportsContinuation } from "./marketReportSeedContinuationRaw";
import {
  normalizeLegacyMarketReports,
  type LegacyMarketReportRaw,
} from "./normalizeLegacyMarketReports";
import type { MarketReportSeedData } from "./marketReportSeedTypes";

export const marketReportsSeedDataContinuation: MarketReportSeedData[] =
  normalizeLegacyMarketReports(
    legacyMarketReportsContinuation as LegacyMarketReportRaw[],
  );
