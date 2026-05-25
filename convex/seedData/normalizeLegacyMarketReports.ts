import type { MarketReportSeedData } from "./marketReportSeedTypes";

function round2(n: number): number {
  return Math.round(n * 100) / 100;
}

function ordinalUpperDay(n: number): string {
  const j = n % 10;
  const k = n % 100;
  let suf = "TH";
  if (j === 1 && k !== 11) suf = "ST";
  else if (j === 2 && k !== 12) suf = "ND";
  else if (j === 3 && k !== 13) suf = "RD";
  return `${n}${suf}`;
}

const MONTH_UPPER: Record<number, string> = {
  1: "JANUARY",
  2: "FEBRUARY",
  3: "MARCH",
  4: "APRIL",
  5: "MAY",
  6: "JUNE",
  7: "JULY",
  8: "AUGUST",
  9: "SEPTEMBER",
  10: "OCTOBER",
  11: "NOVEMBER",
  12: "DECEMBER",
};

function pdfFileNameFromIso(reportDate: string): string {
  const [ys, ms, ds] = reportDate.split("-");
  const y = Number(ys);
  const mo = Number(ms);
  const d = Number(ds);
  const month = MONTH_UPPER[mo] ?? "MONTH";
  return `DAILY_MARKET_REPORT_${ordinalUpperDay(d)}_${month}_${y}.pdf`;
}

function pctFromOpenClose(open: number, close: number): number {
  if (!Number.isFinite(open) || open === 0) return 0;
  return round2(((close - open) / open) * 100);
}

function normalizeStatus(s: string): "draft" | "published" | "archived" {
  const low = s.toLowerCase();
  if (low.includes("publish")) return "published";
  return "draft";
}

type LegacyBond = {
  sovereign?: string;
  maturityDate: string;
  coupon: number;
  ttm: number;
  yieldToday: number;
  yieldPrev: number;
};

type LegacyIndex = {
  region: string;
  index: string;
  open: number;
  closeOrIntraday: number;
  intraday?: boolean;
};

type LegacyEquityRow = { ticker: string; open: number; close: number };

export type LegacyMarketReportRaw = {
  title: string;
  reportDate: string;
  displayDate: string;
  status: string;
  sources: string;
  disclaimer: string;
  moneyMarket: {
    systemLiquiditySummary?: string;
    ratesTable: Array<{ label: string; today: number; prev: number }>;
    narrativeBody: string;
    outlook: string;
  };
  treasuryBills: {
    averageBenchmarkRate?: number;
    benchmarkRatesTable: Array<{
      maturityDate: string;
      dtm: number;
      discRateToday: number;
      discRatePrev: number;
    }>;
    narrativeBody: string;
    outlook: string;
  };
  fgnBonds: {
    averageBenchmarkYield?: number;
    bondsTable: LegacyBond[];
    narrativeBody: string;
    outlook: string;
  };
  ssaEurobonds: {
    bondsTable: LegacyBond[];
    narrativeBody: string;
    outlook: string;
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
    topGainersTable: LegacyEquityRow[];
    topLosersTable: LegacyEquityRow[];
    narrativeBody: string;
    outlook: string;
  };
  globalMarkets: {
    intradayNoteActive?: boolean;
    indicesTable: LegacyIndex[];
    narrativeBody: string;
    outlook: string;
  };
};

function normalizeLegacyRow(raw: LegacyMarketReportRaw): MarketReportSeedData {
  const rates = raw.moneyMarket.ratesTable.map((r) => ({
    label: r.label,
    today: r.today,
    prev: r.prev,
    change: round2(r.today - r.prev),
  }));

  const benchmarkRates = raw.treasuryBills.benchmarkRatesTable.map((r) => ({
    maturityDate: r.maturityDate,
    dtm: r.dtm,
    discRateToday: r.discRateToday,
    discRatePrev: r.discRatePrev,
    changeInDiscRate: round2(r.discRateToday - r.discRatePrev),
  }));

  const fgnBondsRows = raw.fgnBonds.bondsTable.map((b) => ({
    maturityDate: b.maturityDate,
    coupon: b.coupon,
    ttm: b.ttm,
    yieldToday: b.yieldToday,
    yieldPrev: b.yieldPrev,
    changeInYield: round2(b.yieldToday - b.yieldPrev),
  }));

  const ssaBonds = raw.ssaEurobonds.bondsTable.map((b) => {
    const sovereign = b.sovereign ?? "";
    return {
      sovereign,
      maturityDate: b.maturityDate,
      coupon: b.coupon,
      ttm: b.ttm,
      yieldToday: b.yieldToday,
      yieldPrev: b.yieldPrev,
      changeInYield: round2(b.yieldToday - b.yieldPrev),
    };
  });

  const topGainers = raw.localEquities.topGainersTable.map((r) => ({
    ticker: r.ticker,
    open: r.open,
    close: r.close,
    changePercent: pctFromOpenClose(r.open, r.close),
  }));

  const topLosers = raw.localEquities.topLosersTable.map((r) => ({
    ticker: r.ticker,
    open: r.open,
    close: r.close,
    changePercent: pctFromOpenClose(r.open, r.close),
  }));

  const indices = raw.globalMarkets.indicesTable.map((row) => ({
    region: row.region,
    index: row.index,
    open: row.open,
    closeOrIntraday: row.closeOrIntraday,
    changePercent: pctFromOpenClose(row.open, row.closeOrIntraday),
    isIntraday: row.intraday === true,
  }));

  return {
    title: raw.title,
    reportDate: raw.reportDate,
    displayDate: raw.displayDate,
    status: normalizeStatus(raw.status),
    pdfFileName: pdfFileNameFromIso(raw.reportDate),
    sources: raw.sources,
    disclaimer: raw.disclaimer,
    moneyMarket: {
      systemLiquiditySummary: raw.moneyMarket.systemLiquiditySummary,
      rates,
      narrative: {
        body: raw.moneyMarket.narrativeBody,
        outlook: raw.moneyMarket.outlook,
      },
    },
    treasuryBills: {
      averageBenchmarkRate: raw.treasuryBills.averageBenchmarkRate,
      benchmarkRates,
      narrative: {
        body: raw.treasuryBills.narrativeBody,
        outlook: raw.treasuryBills.outlook,
      },
    },
    fgnBonds: {
      averageBenchmarkYield: raw.fgnBonds.averageBenchmarkYield,
      bonds: fgnBondsRows,
      narrative: {
        body: raw.fgnBonds.narrativeBody,
        outlook: raw.fgnBonds.outlook,
      },
    },
    ssaEurobonds: {
      bonds: ssaBonds,
      narrative: {
        body: raw.ssaEurobonds.narrativeBody,
        outlook: raw.ssaEurobonds.outlook,
      },
    },
    localEquities: {
      asiLevel: raw.localEquities.asiLevel,
      asiChangePercent: raw.localEquities.asiChangePercent,
      ytdReturn: raw.localEquities.ytdReturn,
      marketCap: raw.localEquities.marketCap,
      turnoverValue: raw.localEquities.turnoverValue,
      volumeTraded: raw.localEquities.volumeTraded,
      marketBreadthRatio: raw.localEquities.marketBreadthRatio,
      gainers: raw.localEquities.gainers,
      losers: raw.localEquities.losers,
      topGainers,
      topLosers,
      narrative: {
        body: raw.localEquities.narrativeBody,
        outlook: raw.localEquities.outlook,
      },
    },
    globalMarkets: {
      isIntradayNote: raw.globalMarkets.intradayNoteActive === true,
      indices,
      narrative: {
        body: raw.globalMarkets.narrativeBody,
        outlook: raw.globalMarkets.outlook,
      },
    },
  };
}

export function normalizeLegacyMarketReports(
  rows: LegacyMarketReportRaw[],
): MarketReportSeedData[] {
  return rows.map(normalizeLegacyRow);
}
