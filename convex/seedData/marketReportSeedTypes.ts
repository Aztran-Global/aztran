// Types mirroring Convex `marketReports` table shape used for seed payloads.

export interface MoneyMarketRate {
  label: string;
  today: number;
  prev: number;
  change: number;
}

export interface SectionNarrative {
  body: string;
  outlook: string;
}

export interface FgnBondRow {
  maturityDate: string;
  coupon: number;
  ttm: number;
  yieldToday: number;
  yieldPrev: number;
  changeInYield: number;
}

export interface TbillRow {
  maturityDate: string;
  dtm: number;
  discRateToday: number;
  discRatePrev: number;
  changeInDiscRate: number;
}

export interface EurobondRow {
  sovereign: string;
  maturityDate: string;
  coupon: number;
  ttm: number;
  yieldToday: number;
  yieldPrev: number;
  changeInYield: number;
}

export interface EquityTickerRow {
  ticker: string;
  open: number;
  close: number;
  changePercent: number;
}

export interface GlobalIndexRow {
  region: string;
  index: string;
  open: number;
  closeOrIntraday: number;
  changePercent: number;
  isIntraday?: boolean;
}

export interface MarketReportSeedData {
  title: string;
  reportDate: string;
  displayDate: string;
  status: "draft" | "published" | "archived";
  pdfFileName: string;
  sources: string;
  disclaimer: string;
  moneyMarket: {
    systemLiquiditySummary?: string;
    rates: MoneyMarketRate[];
    narrative: SectionNarrative;
  };
  treasuryBills: {
    averageBenchmarkRate?: number;
    benchmarkRates: TbillRow[];
    narrative: SectionNarrative;
  };
  fgnBonds: {
    averageBenchmarkYield?: number;
    bonds: FgnBondRow[];
    narrative: SectionNarrative;
  };
  ssaEurobonds: {
    bonds: EurobondRow[];
    narrative: SectionNarrative;
  };
  localEquities: {
    asiLevel?: number;
    asiChangePercent?: number;
    ytdReturn?: number;
    marketCap?: string;
    turnoverValue?: string;
    volumeTraded?: string;
    marketBreadthRatio?: number;
    gainers?: number;
    losers?: number;
    topGainers: EquityTickerRow[];
    topLosers: EquityTickerRow[];
    narrative: SectionNarrative;
  };
  globalMarkets: {
    isIntradayNote?: boolean;
    indices: GlobalIndexRow[];
    narrative: SectionNarrative;
  };
}
