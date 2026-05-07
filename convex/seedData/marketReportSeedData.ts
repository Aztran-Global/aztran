/**
 * Aztran Market Reports — Seed Data
 *
 * Usage:
 *   1. Insert rows (skips dates that already exist):  
 *      `npx convex run seedMarketReports:seedMarketReports`
 *   2. Link PDFs after upload — see PDF_UPLOAD_GUIDE below.
 *
 * PDF_UPLOAD_GUIDE:
 *   Each report has a `pdfFileName` field. After seeding, upload PDFs in the
 *   Convex dashboard (Storage) or via Admin → Market Reports → edit report
 *   → PdfUploader. To attach by script after uploading and copying the storage
 *   id: `npx convex run seedMarketReports:attachMarketReportPdfByReportDate`
 *   with `{ "reportDate": "YYYY-MM-DD", "pdfStorageId": "..." }`.
 *   Or patch in the dashboard Data tab on the `marketReports` table.
 *
 *   File name → Report Date mapping:
 *     DAILY_MARKET_REPORT_2nd_APRIL_2026.pdf       → 2026-04-02
 *     DAILY_MARKET_REPORT_7TH_APRIL_2026.pdf       → 2026-04-07
 *     DAILY_MARKET_REPORT_8TH_APRIL_2026.pdf       → 2026-04-08
 *     DAILY_MARKET_REPORT_9TH_APRIL_2026.pdf       → 2026-04-09
 *     DAILY_MARKET_REPORT_10TH_APRIL_2026.pdf      → 2026-04-10
 *     DAILY_MARKET_REPORT_13TH_APRIL_2026_.pdf     → 2026-04-13
 *     DAILY_MARKET_REPORT_14TH_APRIL_2026.pdf      → 2026-04-14
 *     DAILY_MARKET_REPORT_15TH_APRIL_2026.pdf      → 2026-04-15
 *     DAILY_MARKET_REPORT_16TH_APRIL_2026.pdf      → 2026-04-16
 *     DAILY_MARKET_REPORT_17TH_APRIL_2026.pdf      → 2026-04-17
 *     DAILY_MARKET_REPORT_31ST_MARCH_2026.pdf      → 2026-03-31
 */

// ─── Types (mirror your Convex schema) ────────────────────────────────────────

interface MoneyMarketRate {
    label: string;
    today: number;
    prev: number;
    change: number;
  }
  
  interface SectionNarrative {
    body: string;
    outlook: string;
  }
  
  interface FgnBondRow {
    maturityDate: string;
    coupon: number;
    ttm: number;
    yieldToday: number;
    yieldPrev: number;
    changeInYield: number;
  }
  
  interface TbillRow {
    maturityDate: string;
    dtm: number;
    discRateToday: number;
    discRatePrev: number;
    changeInDiscRate: number;
  }
  
  interface EurobondRow {
    sovereign: string;
    maturityDate: string;
    coupon: number;
    ttm: number;
    yieldToday: number;
    yieldPrev: number;
    changeInYield: number;
  }
  
  interface EquityTickerRow {
    ticker: string;
    open: number;
    close: number;
    changePercent: number;
  }
  
  interface GlobalIndexRow {
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
  
  // ─── Shared disclaimer ────────────────────────────────────────────────────────
  
  const DISCLAIMER = `This report is intended solely for informational purposes and should not be interpreted as investment advice or a recommendation to engage in any financial transactions. Aztran Investments accepts no liability for any decisions made or losses incurred based on its use. Always seek independent professional advice before making financial decisions.\n\nThis message and any accompanying documents may contain confidential or privileged information and are intended only for the named recipient. If you are not the intended recipient, please notify the sender immediately, delete this message from your system, and refrain from disclosing, copying, or using any part of it. Electronic communications are not guaranteed to be secure or virus-free; Aztran Investments is not liable for any damage arising from unauthorized access, interception, or the presence of malware.\n\nOpinions expressed that do not relate to the official business of Aztran Investments are those of the author and do not necessarily reflect the views of the firm.`;
  
  const SOURCES = "NGX, FMDQ, CBN, Investing.com, Aztran Research";
  const TITLE = "Daily Financial Markets Update";
  
  // ─── SSA Eurobond sovereign names ─────────────────────────────────────────────
  
  const NGA = "Republic Of Nigeria";
  const ANG = "Republic Of Angola";
  const EGY = "Arab Republic Of Egypt";
  
  // ─────────────────────────────────────────────────────────────────────────────
  // REPORT DATA
  // ─────────────────────────────────────────────────────────────────────────────
  
  export const marketReportsSeedData: MarketReportSeedData[] = [
  
    // ── 31 March 2026 ──────────────────────────────────────────────────────────
    {
      title: TITLE,
      reportDate: "2026-03-31",
      displayDate: "Tuesday, 31ST March 2026",
      status: "published",
      pdfFileName: "DAILY_MARKET_REPORT_31ST_MARCH_2026.pdf",
      sources: SOURCES,
      disclaimer: DISCLAIMER,
      moneyMarket: {
        systemLiquiditySummary: "System liquidity opened the day with a surplus of ₦5.7 trillion supported by net OMO issuance.",
        rates: [
          { label: "Overnight Policy Rate (%)", today: 22.00, prev: 22.00, change: 0.00 },
          { label: "Overnight Rate (%)", today: 22.06, prev: 22.25, change: -0.19 },
        ],
        narrative: {
          body: "System liquidity opened the day with a surplus of ₦5.7 trillion supported by net OMO issuance. The Overnight (O/N) rate declined by 19bps to close at 22.06%, while Open Buy-Back (OBB) rate was unchanged, holding steady at 22.00%.",
          outlook: "We expect inter-bank rates to be range-bound in the near term.",
        },
      },
      treasuryBills: {
        averageBenchmarkRate: 16.15,
        benchmarkRates: [
          { maturityDate: "25-Jun-26", dtm: 86, discRateToday: 15.58, discRatePrev: 15.65, changeInDiscRate: -0.08 },
          { maturityDate: "4-Feb-27", dtm: 310, discRateToday: 16.23, discRatePrev: 16.36, changeInDiscRate: -0.12 },
          { maturityDate: "25-Mar-27", dtm: 359, discRateToday: 16.20, discRatePrev: 16.08, changeInDiscRate: 0.12 },
        ],
        narrative: {
          body: "The T-bills market traded on a slightly bearish note today, with sentiment weakened by the outcome of the OMO auction. The CBN offered ₦600bn across the 70 and 140-day tenors, with subscription concentrated at the long end. Stop rates cleared at 19.00% for the 70-day and 19.92% for the 140-day papers, while total allotment exceeded ₦850bn. The 4-Feb-27 bill declined by 12bps, while the 25-Mar-27 rose by 12bps. The average benchmark rate rose by 1bp, closing at 16.15%.",
          outlook: "We expect activity to remain cautious as participants digest today's auction results and monitor system liquidity.",
        },
      },
      fgnBonds: {
        averageBenchmarkYield: 15.68,
        bonds: [
          { maturityDate: "20-Mar-27", coupon: 16.29, ttm: 0.97, yieldToday: 16.36, yieldPrev: 16.37, changeInYield: -0.01 },
          { maturityDate: "17-Apr-29", coupon: 14.55, ttm: 3.05, yieldToday: 16.08, yieldPrev: 16.08, changeInYield: 0.00 },
          { maturityDate: "21-Feb-31", coupon: 18.50, ttm: 4.90, yieldToday: 16.25, yieldPrev: 16.25, changeInYield: 0.00 },
          { maturityDate: "25-Jun-32", coupon: 12.50, ttm: 6.24, yieldToday: 16.33, yieldPrev: 16.27, changeInYield: 0.06 },
          { maturityDate: "15-May-33", coupon: 12.50, ttm: 7.13, yieldToday: 16.54, yieldPrev: 16.26, changeInYield: 0.27 },
          { maturityDate: "21-Feb-34", coupon: 19.00, ttm: 7.90, yieldToday: 16.24, yieldPrev: 16.24, changeInYield: 0.00 },
          { maturityDate: "29-Jan-35", coupon: 12.50, ttm: 8.84, yieldToday: 16.14, yieldPrev: 16.14, changeInYield: 0.00 },
          { maturityDate: "21-Jun-38", coupon: 15.45, ttm: 12.23, yieldToday: 15.24, yieldPrev: 15.24, changeInYield: 0.00 },
          { maturityDate: "26-Apr-49", coupon: 14.80, ttm: 23.09, yieldToday: 14.46, yieldPrev: 14.45, changeInYield: 0.00 },
          { maturityDate: "27-Mar-50", coupon: 12.98, ttm: 24.01, yieldToday: 14.39, yieldPrev: 14.39, changeInYield: 0.00 },
          { maturityDate: "21-Jun-53", coupon: 15.70, ttm: 27.24, yieldToday: 14.48, yieldPrev: 14.48, changeInYield: 0.00 },
        ],
        narrative: {
          body: "The FGN bond market traded on a quiet note with mild bearish sentiment today, as investors continued to adjust positions following yesterday's bond auction. The DMO allotted ₦485.5bn across the 3 offered maturities (2030, 2032 and 2033) with the yield closing at 16%, 16.15% and 16.64% respectively. Thus, the average benchmark yield rose by 3bps, closing at 15.68%.",
          outlook: "Market activity is expected to stay subdued as participants closely monitor ongoing geopolitical tensions for direction.",
        },
      },
      ssaEurobonds: {
        bonds: [
          { sovereign: NGA, maturityDate: "28-Nov-27", coupon: 7.63, ttm: 1.66, yieldToday: 6.29, yieldPrev: 6.27, changeInYield: 0.02 },
          { sovereign: NGA, maturityDate: "16-Feb-32", coupon: 6.50, ttm: 5.88, yieldToday: 7.57, yieldPrev: 7.57, changeInYield: 0.00 },
          { sovereign: NGA, maturityDate: "28-Nov-47", coupon: 7.88, ttm: 21.68, yieldToday: 8.49, yieldPrev: 8.54, changeInYield: -0.05 },
          { sovereign: NGA, maturityDate: "21-Jan-49", coupon: 9.25, ttm: 22.83, yieldToday: 8.58, yieldPrev: 8.64, changeInYield: -0.06 },
          { sovereign: ANG, maturityDate: "09-May-28", coupon: 9.50, ttm: 2.11, yieldToday: 7.76, yieldPrev: 7.79, changeInYield: -0.03 },
          { sovereign: ANG, maturityDate: "26-Nov-29", coupon: 8.00, ttm: 3.66, yieldToday: 8.32, yieldPrev: 8.36, changeInYield: -0.04 },
          { sovereign: ANG, maturityDate: "14-Apr-32", coupon: 8.75, ttm: 6.04, yieldToday: 9.33, yieldPrev: 9.43, changeInYield: -0.10 },
          { sovereign: ANG, maturityDate: "26-Nov-49", coupon: 9.13, ttm: 23.67, yieldToday: 10.65, yieldPrev: 10.73, changeInYield: -0.08 },
          { sovereign: EGY, maturityDate: "31-Jan-27", coupon: 3.88, ttm: 0.84, yieldToday: 6.62, yieldPrev: 6.62, changeInYield: 0.00 },
          { sovereign: EGY, maturityDate: "15-Jan-32", coupon: 7.05, ttm: 5.80, yieldToday: 8.18, yieldPrev: 8.18, changeInYield: 0.00 },
          { sovereign: EGY, maturityDate: "20-Nov-59", coupon: 8.15, ttm: 33.66, yieldToday: 10.07, yieldPrev: 10.08, changeInYield: -0.01 },
        ],
        narrative: {
          body: "The SSA Eurobond market staged a rebound in today's session, supported by softer U.S. Labor market data. Job openings came in at 6.88 million, down from the prior 7.24 million, broadly in line with consensus expectations of 6.89 million. Against this backdrop, sovereign curves across the region tightened: Nigeria's curve compressed by 6bps to 7.62%, Angola's yields fell 7bps to 9.50%, while Egypt registered a modest 1bp decline to 8.52%.",
          outlook: "We expect sentiment to remain cautious in the near term as persistent market uncertainty and upcoming US data continue to influence market sentiment.",
        },
      },
      localEquities: {
        asiLevel: 201287.8,
        asiChangePercent: 0.4,
        ytdReturn: 29.35,
        marketCap: "₦129.21 trillion",
        turnoverValue: "₦35.56 billion",
        volumeTraded: "887.683 million units",
        marketBreadthRatio: 0.41,
        gainers: 20,
        losers: 49,
        topGainers: [
          { ticker: "MULTIVERSE", open: 16.70, close: 18.35, changePercent: 9.88 },
          { ticker: "INTENEGINS", open: 2.95, close: 3.23, changePercent: 9.49 },
          { ticker: "CHAMS", open: 4.05, close: 4.39, changePercent: 8.40 },
          { ticker: "MTNN", open: 718.00, close: 760.00, changePercent: 5.85 },
          { ticker: "PZ", open: 78.40, close: 82.00, changePercent: 4.59 },
        ],
        topLosers: [
          { ticker: "NPFMCRFBK", open: 7.00, close: 6.30, changePercent: -10.00 },
          { ticker: "SKYAVN", open: 158.95, close: 143.10, changePercent: -9.97 },
          { ticker: "ZICHIS", open: 15.16, close: 13.65, changePercent: -9.96 },
          { ticker: "MBENEFIT", open: 4.54, close: 4.09, changePercent: -9.91 },
          { ticker: "RTBRISCOE", open: 10.71, close: 9.65, changePercent: -9.90 },
        ],
        narrative: {
          body: "The local bourse closed the day on a positive note, as the NGX All-Share Index (ASI) gained 0.4% to settle at 201,287.8 points. Consequently, the year-to-date (YTD) return moderated to 29.35%. Sectoral performance closed broadly positive, with gains recorded in most indices, while a few sectors ended in the red. The Banking sector led the decliners, shedding 1.76%, weighed down by significant sell-offs in NPFMCRFBK (-10.00%). The Insurance sector also recorded a steep decline of 3.64%, pressured by losses in MBENEFIT (-9.91%). Similarly, the Consumer Goods sector dipped by 0.16%, dragged by a sharp drop in MCNICHOLS (-9.53%). On the upside, the Industrial Goods sector advanced by 0.20%, supported by buying interest in WAPCO (+1.43%). The Oil & Gas sector also posted a modest gain of 0.08%, driven by renewed investor interest in ETERNA (+3.41%), reflecting mild strength in the segment. Market breadth stood at 0.41x with 20 gainers and 49 losers. Market capitalization improved to ₦129.21 trillion from ₦128.496 trillion in the previous session. Trading activity closed bullish, with turnover value increasing to ₦35.56 billion from ₦25.57 billion and volume traded surged to 887.683 million units from 589.554 million units.",
          outlook: "The market looks positively poised in the near term as earnings releases provide some tailwind to market momentum.",
        },
      },
      globalMarkets: {
        isIntradayNote: true,
        indices: [
          { region: "U.S", index: "S&P 500", open: 6343.72, closeOrIntraday: 6432.91, changePercent: 1.41, isIntraday: true },
          { region: "U.S", index: "Dow Jones", open: 45216.14, closeOrIntraday: 45675.21, changePercent: 1.02, isIntraday: true },
          { region: "U.S", index: "Nasdaq Composite", open: 20794.64, closeOrIntraday: 21180.03, changePercent: 1.85, isIntraday: true },
          { region: "U.S", index: "Russell 2000", open: 2414.01, closeOrIntraday: 2459.37, changePercent: 1.88, isIntraday: true },
          { region: "EUROPE", index: "STOXX 600", open: 580.73, closeOrIntraday: 583.21, changePercent: 0.43 },
          { region: "EUROPE", index: "FTSE 100", open: 10127.96, closeOrIntraday: 10176.45, changePercent: 0.48 },
          { region: "EUROPE", index: "DAX", open: 22562.88, closeOrIntraday: 22633.18, changePercent: 0.31 },
          { region: "EUROPE", index: "CAC 40", open: 7772.45, closeOrIntraday: 7816.94, changePercent: 0.57 },
          { region: "ASIA", index: "Hang Seng", open: 24750.79, closeOrIntraday: 24788.14, changePercent: 0.15 },
          { region: "ASIA", index: "Shanghai", open: 3923.29, closeOrIntraday: 3891.86, changePercent: -0.80 },
          { region: "ASIA", index: "Nikkei", open: 51885.85, closeOrIntraday: 51063.72, changePercent: -1.58 },
        ],
        narrative: {
          body: "The U.S. is trading bullish. The S&P 500 (+1.41%), Nasdaq Composite (+1.02%), Dow Jones (+1.85%), and Russell (+1.88%) as easing Middle East tensions and a rebound in tech stocks fuelled a relief rally despite ongoing macro concerns. European markets closed the day bullish. The STOXX (+0.43%), FTSE (+0.48%), CAC (+0.57%), and DAX (+0.31%), as easing Iran tensions and de-escalation hopes, alongside supportive inflation data and gains in mining, banking, and tech stocks, boosted investor sentiment despite ongoing geopolitical risks. Asian markets closed the day mixed, as the Nikkei (-1.58%) and Shanghai (-0.80%) declined on Middle East tensions and energy concerns, while the Hang Seng (+0.15%) edged higher on bargain hunting despite fragile sentiment.",
          outlook: "Global equities are likely to trade cautiously as investors monitor geopolitical tensions in the Middle-East.",
        },
      },
    },
  
    // ── 2 April 2026 ───────────────────────────────────────────────────────────
    {
      title: TITLE,
      reportDate: "2026-04-02",
      displayDate: "Thursday, 2nd April 2026",
      status: "published",
      pdfFileName: "DAILY_MARKET_REPORT_2nd_APRIL_2026.pdf",
      sources: SOURCES,
      disclaimer: DISCLAIMER,
      moneyMarket: {
        systemLiquiditySummary: "System liquidity declined by 26% to close the week with a surplus of ₦5.41 trillion following the net OMO issuance within the week.",
        rates: [
          { label: "Overnight Policy Rate (%)", today: 22.00, prev: 22.00, change: 0.00 },
          { label: "Overnight Rate (%)", today: 22.31, prev: 22.26, change: 0.05 },
        ],
        narrative: {
          body: "System liquidity declined by 26% to close the week with a surplus of ₦5.41 trillion following the net OMO issuance within the week. The Overnight (O/N) rate declined by 5bps to close the week at 22.31%, while Open Buy-Back (OBB) rate was unchanged, holding steady at 22.00%.",
          outlook: "We expect inter-bank rates to be range-bound in the near term.",
        },
      },
      treasuryBills: {
        averageBenchmarkRate: 16.12,
        benchmarkRates: [
          { maturityDate: "25-Jun-26", dtm: 84, discRateToday: 15.55, discRatePrev: 15.65, changeInDiscRate: -0.10 },
          { maturityDate: "4-Feb-27", dtm: 308, discRateToday: 16.29, discRatePrev: 16.28, changeInDiscRate: 0.01 },
          { maturityDate: "18-Mar-27", dtm: 350, discRateToday: 16.10, discRatePrev: 16.29, changeInDiscRate: -0.19 },
        ],
        narrative: {
          body: "The T-bills market ended the week on a bullish note, with the average benchmark rate declining by 7bps W-o-W to 16.12%. Sentiment was supported by the outcome of today's OMO auction, where the CBN allotted ₦1.37trn on the 138-day bill at a stop rate of 19.91%, leaving the 75-day tenor with no sale.",
          outlook: "Near-term market activity is expected to remain resilient, supported by the contraction in T-bill supply from the auction calendar and sustained elevated system liquidity.",
        },
      },
      fgnBonds: {
        averageBenchmarkYield: 15.79,
        bonds: [
          { maturityDate: "20-Mar-27", coupon: 16.29, ttm: 0.96, yieldToday: 16.36, yieldPrev: 16.37, changeInYield: -0.01 },
          { maturityDate: "17-Apr-29", coupon: 14.55, ttm: 3.04, yieldToday: 16.08, yieldPrev: 16.09, changeInYield: -0.01 },
          { maturityDate: "21-Feb-31", coupon: 18.50, ttm: 4.89, yieldToday: 16.24, yieldPrev: 16.25, changeInYield: -0.01 },
          { maturityDate: "25-Jun-32", coupon: 12.50, ttm: 6.24, yieldToday: 16.35, yieldPrev: 16.27, changeInYield: 0.08 },
          { maturityDate: "15-May-33", coupon: 12.50, ttm: 7.12, yieldToday: 16.60, yieldPrev: 16.27, changeInYield: 0.34 },
          { maturityDate: "21-Feb-34", coupon: 19.00, ttm: 7.90, yieldToday: 16.44, yieldPrev: 16.23, changeInYield: 0.21 },
          { maturityDate: "29-Jan-35", coupon: 12.50, ttm: 8.83, yieldToday: 16.35, yieldPrev: 16.22, changeInYield: 0.12 },
          { maturityDate: "21-Jun-38", coupon: 15.45, ttm: 12.23, yieldToday: 15.24, yieldPrev: 15.24, changeInYield: 0.00 },
          { maturityDate: "26-Apr-49", coupon: 14.80, ttm: 23.08, yieldToday: 14.46, yieldPrev: 14.45, changeInYield: 0.00 },
          { maturityDate: "27-Mar-50", coupon: 12.98, ttm: 24.00, yieldToday: 14.39, yieldPrev: 14.39, changeInYield: 0.00 },
          { maturityDate: "21-Jun-53", coupon: 15.70, ttm: 27.24, yieldToday: 14.48, yieldPrev: 14.46, changeInYield: 0.02 },
        ],
        narrative: {
          body: "The FGN bond market closed the week on a mildly bearish note, with selling pressure concentrated at the mid-curve. The 15-May-2033 bond led the selloff, rising by 34bps to 16.60%, followed by the 21-Feb-2034 and 29-Jan-2035 bonds, which rose by 21bps and 12bps respectively. The short end saw marginal gains, while the long end was largely unchanged. The average benchmark yield rose by 1bp, closing at 15.79%.",
          outlook: "Mild pressure is expected to persist at the mid-curve in the near term, with sentiment remaining cautious as participants await fresh catalysts.",
        },
      },
      ssaEurobonds: {
        bonds: [
          { sovereign: NGA, maturityDate: "28-Nov-27", coupon: 7.63, ttm: 1.66, yieldToday: 6.17, yieldPrev: 6.19, changeInYield: -0.02 },
          { sovereign: NGA, maturityDate: "16-Feb-32", coupon: 6.50, ttm: 5.88, yieldToday: 7.51, yieldPrev: 7.42, changeInYield: 0.09 },
          { sovereign: NGA, maturityDate: "28-Nov-47", coupon: 7.88, ttm: 21.67, yieldToday: 8.42, yieldPrev: 8.33, changeInYield: 0.09 },
          { sovereign: NGA, maturityDate: "21-Jan-49", coupon: 9.25, ttm: 22.82, yieldToday: 8.49, yieldPrev: 8.43, changeInYield: 0.06 },
          { sovereign: ANG, maturityDate: "09-May-28", coupon: 9.50, ttm: 2.10, yieldToday: 7.66, yieldPrev: 7.56, changeInYield: 0.09 },
          { sovereign: ANG, maturityDate: "26-Nov-29", coupon: 8.00, ttm: 3.65, yieldToday: 8.22, yieldPrev: 8.10, changeInYield: 0.12 },
          { sovereign: ANG, maturityDate: "14-Apr-32", coupon: 8.75, ttm: 6.04, yieldToday: 9.19, yieldPrev: 9.08, changeInYield: 0.11 },
          { sovereign: ANG, maturityDate: "26-Nov-49", coupon: 9.13, ttm: 23.67, yieldToday: 10.49, yieldPrev: 10.39, changeInYield: 0.09 },
          { sovereign: EGY, maturityDate: "31-Jan-27", coupon: 3.88, ttm: 0.83, yieldToday: 6.60, yieldPrev: 6.37, changeInYield: 0.23 },
          { sovereign: EGY, maturityDate: "15-Jan-32", coupon: 7.05, ttm: 5.79, yieldToday: 8.22, yieldPrev: 7.99, changeInYield: 0.23 },
          { sovereign: EGY, maturityDate: "20-Nov-59", coupon: 8.15, ttm: 33.66, yieldToday: 10.04, yieldPrev: 9.84, changeInYield: 0.20 },
        ],
        narrative: {
          body: "The SSA Eurobond market ended the latest session on a softer footing, as investors remained cautious amid heightened geopolitical risk. This came despite stronger-than-expected U.S. jobless claims, which printed at 202k versus the prior 211k and consensus of 212k. Yields across key sovereigns reflected the risk-off sentiment: Nigeria widened by 7bps to 7.49%. Angola followed with a 10bps increase to 9.34%. Egypt saw the sharpest repricing, climbing 22bps to 8.53%.",
          outlook: "We expect trading to be light following the Easter celebration while investors continue to weigh in on geopolitical risk.",
        },
      },
      localEquities: {
        asiLevel: 200913.1,
        asiChangePercent: 0.39,
        ytdReturn: 29.62,
        marketCap: "₦129.806 trillion",
        turnoverValue: "₦19.262 billion",
        volumeTraded: "559.976 million units",
        marketBreadthRatio: 1.38,
        gainers: 33,
        losers: 24,
        topGainers: [
          { ticker: "MULTIVERSE", open: 16.70, close: 20.15, changePercent: 20.66 },
          { ticker: "UPDCREIT", open: 7.10, close: 8.20, changePercent: 15.49 },
          { ticker: "INTENEGINS", open: 2.95, close: 3.32, changePercent: 12.54 },
          { ticker: "AUSTINLAZ", open: 4.01, close: 4.43, changePercent: 10.47 },
          { ticker: "UNILEVER", open: 94.00, close: 103.40, changePercent: 10.00 },
        ],
        topLosers: [
          { ticker: "NSLTECH", open: 1.30, close: 1.02, changePercent: -21.54 },
          { ticker: "JOHNHOLT", open: 18.95, close: 15.45, changePercent: -18.47 },
          { ticker: "MAYBAKER", open: 41.95, close: 35.00, changePercent: -16.57 },
          { ticker: "LEGENDINT", open: 7.50, close: 6.30, changePercent: -16.00 },
          { ticker: "CONHALLPLC", open: 5.06, close: 4.40, changePercent: -13.04 },
        ],
        narrative: {
          body: "The local bourse closed the week positive, with the NGX ASI up 0.39% to 200,913.1 points, while YTD return moderated to 29.62%, on a week-on-week basis due to the public holiday. Sectoral performance closed on a negative note week-on-week, reflecting mixed but largely bearish sentiment across key indices. The Banking sector recorded a modest gain of 0.47%, supported by buying interest in GTCO, which advanced by 5.08%. On the downside, the Insurance sector declined sharply by 3.95%, pressured by sell-offs in Conhall Plc, which fell by 13.04%. The Industrial Goods sector edged lower by 0.24%, weighed down by losses in Cutix, which declined by 4.86%. Similarly, the Consumer Goods sector dropped by 2.61%, dragged by a notable 10.00% loss in one of its major constituents, Nestlé. Conversely, the Oil and Gas sector posted a positive performance, rising by 1.80%, supported by gains in Eterna, which appreciated by 3.41%. Market breadth stood at 1.38x with 33 gainers and 24 losers. Market capitalization improved to ₦129.806 trillion from ₦128.969 trillion. Trading activity closed bearish, with turnover value decreasing to ₦19.262 billion from ₦24.47 billion and volume traded declined to 559.976 million units from 595.15 million units.",
          outlook: "We are likely to see some earnings induced upward repricing with some profit-taking along the way.",
        },
      },
      globalMarkets: {
        isIntradayNote: true,
        indices: [
          { region: "U.S", index: "S&P 500", open: 6575.32, closeOrIntraday: 6572.42, changePercent: -0.04, isIntraday: true },
          { region: "U.S", index: "Dow Jones", open: 46565.74, closeOrIntraday: 46460.89, changePercent: -0.23, isIntraday: true },
          { region: "U.S", index: "Nasdaq Composite", open: 21840.95, closeOrIntraday: 21816.20, changePercent: -0.11, isIntraday: true },
          { region: "U.S", index: "Russell 2000", open: 2512.37, closeOrIntraday: 2524.70, changePercent: 0.49, isIntraday: true },
          { region: "EUROPE", index: "STOXX 600", open: 597.69, closeOrIntraday: 595.99, changePercent: -0.28 },
          { region: "EUROPE", index: "FTSE 100", open: 10364.79, closeOrIntraday: 10436.29, changePercent: 0.69 },
          { region: "EUROPE", index: "DAX", open: 23298.89, closeOrIntraday: 23114.07, changePercent: -0.79 },
          { region: "EUROPE", index: "CAC 40", open: 7981.27, closeOrIntraday: 7949.00, changePercent: -0.40 },
          { region: "ASIA", index: "Hang Seng", open: 25294.03, closeOrIntraday: 25116.53, changePercent: -0.70 },
          { region: "ASIA", index: "Shanghai", open: 3948.55, closeOrIntraday: 3919.29, changePercent: -0.74 },
          { region: "ASIA", index: "Nikkei", open: 53739.68, closeOrIntraday: 52463.27, changePercent: -2.38 },
        ],
        narrative: {
          body: "The U.S. is trading mixed. The S&P 500 (-0.04%), Nasdaq (-0.11%), and Dow Jones (-0.23%) on geopolitical tensions and rising oil prices, while the Russell gained by 0.49% as investors rotated into domestic-focused stocks. European markets closed broadly negative. The STOXX (-0.28%), FTSE (+0.69%), and CAC (-0.4%), and DAX (-0.79%), due to rising geopolitical tensions in the Middle East and expectations of further interest rate hikes hurting investor sentiment. Asian markets declined broadly, as the Shanghai Composite (-0.74%), Hang Seng Index (-0.7%), and Nikkei 225 Index (-2.38%) amid weak sentiment from Donald Trump's mixed Middle East signals and tighter liquidity by the People's Bank of China.",
          outlook: "Global equities are likely to trade cautiously as investors monitor geopolitical tensions in the Middle-East.",
        },
      },
    },
  
    // ── 7 April 2026 ───────────────────────────────────────────────────────────
    {
      title: TITLE,
      reportDate: "2026-04-07",
      displayDate: "Tuesday, 7th April 2026",
      status: "published",
      pdfFileName: "DAILY_MARKET_REPORT_7TH_APRIL_2026.pdf",
      sources: SOURCES,
      disclaimer: DISCLAIMER,
      moneyMarket: {
        systemLiquiditySummary: "System liquidity opened the week with a surplus of ₦6.17 trillion, supported by OMO repayment of ₦2.12trn.",
        rates: [
          { label: "Overnight Policy Rate (%)", today: 22.00, prev: 22.00, change: 0.00 },
          { label: "Overnight Rate (%)", today: 22.25, prev: 22.31, change: -0.06 },
        ],
        narrative: {
          body: "System liquidity opened the week with a surplus of ₦6.17 trillion, supported by OMO repayment of ₦2.12trn. The Overnight (O/N) rate declined by 6bps to close at 22.25%, while Open Buy-Back (OBB) rate was unchanged, holding steady at 22.00%.",
          outlook: "We expect inter-bank rates to be range-bound in the near term.",
        },
      },
      treasuryBills: {
        averageBenchmarkRate: 16.11,
        benchmarkRates: [
          { maturityDate: "25-Jun-26", dtm: 79, discRateToday: 15.55, discRatePrev: 15.55, changeInDiscRate: 0.00 },
          { maturityDate: "4-Feb-27", dtm: 303, discRateToday: 16.29, discRatePrev: 16.29, changeInDiscRate: 0.00 },
          { maturityDate: "18-Mar-27", dtm: 345, discRateToday: 16.20, discRatePrev: 16.10, changeInDiscRate: 0.10 },
        ],
        narrative: {
          body: "The T-bills market traded on a quiet note today, with activity largely muted across the curve. Benchmark rates were unchanged, except for the 18-Mar-2027 bill, which edged up 10bps to 16.20%. As a result, the average benchmark rate remained flat at 16.11%.",
          outlook: "We expect sentiment to improve in the near term as liquidity from today's OMO maturity supports secondary-market demand.",
        },
      },
      fgnBonds: {
        averageBenchmarkYield: 15.80,
        bonds: [
          { maturityDate: "20-Mar-27", coupon: 16.29, ttm: 0.95, yieldToday: 16.36, yieldPrev: 16.36, changeInYield: 0.00 },
          { maturityDate: "17-Apr-29", coupon: 14.55, ttm: 3.03, yieldToday: 16.07, yieldPrev: 16.08, changeInYield: -0.01 },
          { maturityDate: "21-Feb-31", coupon: 18.50, ttm: 4.88, yieldToday: 16.24, yieldPrev: 16.24, changeInYield: 0.00 },
          { maturityDate: "25-Jun-32", coupon: 12.50, ttm: 6.22, yieldToday: 16.45, yieldPrev: 16.35, changeInYield: 0.10 },
          { maturityDate: "15-May-33", coupon: 12.50, ttm: 7.11, yieldToday: 16.69, yieldPrev: 16.60, changeInYield: 0.08 },
          { maturityDate: "21-Feb-34", coupon: 19.00, ttm: 7.88, yieldToday: 16.52, yieldPrev: 16.44, changeInYield: 0.08 },
          { maturityDate: "29-Jan-35", coupon: 12.50, ttm: 8.82, yieldToday: 16.35, yieldPrev: 16.35, changeInYield: 0.00 },
          { maturityDate: "21-Jun-38", coupon: 15.45, ttm: 12.21, yieldToday: 15.24, yieldPrev: 15.24, changeInYield: 0.00 },
          { maturityDate: "26-Apr-49", coupon: 14.80, ttm: 23.07, yieldToday: 14.46, yieldPrev: 14.46, changeInYield: 0.00 },
          { maturityDate: "27-Mar-50", coupon: 12.98, ttm: 23.99, yieldToday: 14.39, yieldPrev: 14.39, changeInYield: 0.00 },
          { maturityDate: "21-Jun-53", coupon: 15.70, ttm: 27.22, yieldToday: 14.48, yieldPrev: 14.48, changeInYield: 0.00 },
        ],
        narrative: {
          body: "The FGN bond market traded on a mildly bearish note today, with selling pressure concentrated at the mid-curve. The 25-Jun-2032 bond led the move, rising by 10bps to 16.45%, while the 15-May-2033 and 21-Feb-2034 bonds each rose by 8bps to 16.69% and 16.52% respectively. The short and long ends remained largely unchanged. The average benchmark yield rose by 1bp, closing at 15.80%.",
          outlook: "Mild pressure is expected to persist at the mid-curve, with sentiment remaining cautious as participants seek fresh catalysts.",
        },
      },
      ssaEurobonds: {
        bonds: [
          { sovereign: NGA, maturityDate: "28-Nov-27", coupon: 7.63, ttm: 1.64, yieldToday: 6.13, yieldPrev: 6.17, changeInYield: -0.04 },
          { sovereign: NGA, maturityDate: "16-Feb-32", coupon: 6.50, ttm: 5.87, yieldToday: 7.44, yieldPrev: 7.51, changeInYield: -0.07 },
          { sovereign: NGA, maturityDate: "28-Nov-47", coupon: 7.88, ttm: 21.66, yieldToday: 8.36, yieldPrev: 8.42, changeInYield: -0.06 },
          { sovereign: NGA, maturityDate: "21-Jan-49", coupon: 9.25, ttm: 22.81, yieldToday: 8.46, yieldPrev: 8.49, changeInYield: -0.03 },
          { sovereign: ANG, maturityDate: "09-May-28", coupon: 9.50, ttm: 2.09, yieldToday: 7.62, yieldPrev: 7.66, changeInYield: -0.03 },
          { sovereign: ANG, maturityDate: "26-Nov-29", coupon: 8.00, ttm: 3.64, yieldToday: 8.16, yieldPrev: 8.22, changeInYield: -0.06 },
          { sovereign: ANG, maturityDate: "14-Apr-32", coupon: 8.75, ttm: 6.02, yieldToday: 9.15, yieldPrev: 9.19, changeInYield: -0.04 },
          { sovereign: ANG, maturityDate: "26-Nov-49", coupon: 9.13, ttm: 23.65, yieldToday: 10.44, yieldPrev: 10.49, changeInYield: -0.05 },
          { sovereign: EGY, maturityDate: "31-Jan-27", coupon: 3.88, ttm: 0.82, yieldToday: 6.52, yieldPrev: 6.60, changeInYield: -0.08 },
          { sovereign: EGY, maturityDate: "15-Jan-32", coupon: 7.05, ttm: 5.78, yieldToday: 8.05, yieldPrev: 8.22, changeInYield: -0.17 },
          { sovereign: EGY, maturityDate: "20-Nov-59", coupon: 8.15, ttm: 33.64, yieldToday: 9.92, yieldPrev: 10.04, changeInYield: -0.13 },
        ],
        narrative: {
          body: "The SSA Eurobond market opened the week on a bullish note despite heightened geopolitical tension, as President Trump's deadline on Iran approached. Sovereign curves tightened broadly across the region as investors looked past near-term risks. Nigeria's yields compressed by 5bps to 7.60%, Angola followed, declining 5bps to 8.84%, while Egypt saw the sharpest adjustment, tightening by 13bps to close at 8.16%.",
          outlook: "We expect sentiment to remain cautious, with geopolitical developments around the U.S.–Iran standoff continuing to drive market direction.",
        },
      },
      localEquities: {
        asiLevel: 202023.1,
        asiChangePercent: 0.16,
        ytdReturn: 29.82,
        marketCap: "₦129.997 trillion",
        turnoverValue: "₦37.325 billion",
        volumeTraded: "1,152 million units",
        marketBreadthRatio: 0.67,
        gainers: 24,
        losers: 36,
        topGainers: [
          { ticker: "TRANSEXPR", open: 2.84, close: 3.12, changePercent: 9.86 },
          { ticker: "OMATEK", open: 2.05, close: 2.25, changePercent: 9.76 },
          { ticker: "CADBURY", open: 68.70, close: 75.25, changePercent: 9.53 },
          { ticker: "FIRSTHOLDCO", open: 50.00, close: 54.55, changePercent: 9.10 },
          { ticker: "FTGINSURE", open: 1.23, close: 1.31, changePercent: 6.50 },
        ],
        topLosers: [
          { ticker: "ELLAHLAKES", open: 12.00, close: 10.80, changePercent: -10.00 },
          { ticker: "DAARCOMM", open: 1.91, close: 1.72, changePercent: -9.95 },
          { ticker: "CHAMS", open: 3.75, close: 3.38, changePercent: -9.87 },
          { ticker: "JOHNHOLT", open: 15.45, close: 13.95, changePercent: -9.71 },
          { ticker: "SUNUASSUR", open: 4.65, close: 4.20, changePercent: -9.68 },
        ],
        narrative: {
          body: "The local bourse opened the week on a positive note, as the NGX All-Share Index (ASI) gained 0.16% to settle at 202,023.1 points, while YTD return moderated to 29.82%. Sectoral performance opened the week on a mixed note, reflecting mixed but largely bullish sentiment across key indices. The Banking sector recorded a modest gain of 1.46%, supported by buying interest in GTCO, which advanced by 2.46%. The Consumer Goods sector gained 0.9%, led by a notable 9.53% gain in CADBURY. Similarly, the Oil and Gas sector posted a positive performance, rising by 0.12%, supported by gains in ARADEL, which appreciated by 0.4%. On the downside, the Insurance sector declined sharply by 1.37%, pressured by sell-offs in SUNUASSUR, which fell by 9.68%. The Industrial Goods sector edged lower by 0.31%, weighed down by losses in Cutix, which declined by 2.4%. Market breadth stood at 0.67x with 24 gainers and 36 losers. Market capitalization improved slightly to ₦129.997 trillion from ₦129.806 trillion. Trading activity opened bullish for the week, with turnover value increasing to ₦37.325 billion from ₦19.262 billion and volume traded improved to 1,152 billion units from 559.976 million units.",
          outlook: "We are likely to see some earnings induced upward repricing with some profit-taking along the way.",
        },
      },
      globalMarkets: {
        isIntradayNote: true,
        indices: [
          { region: "U.S", index: "S&P 500", open: 6611.83, closeOrIntraday: 6562.54, changePercent: -0.75, isIntraday: true },
          { region: "U.S", index: "Dow Jones", open: 46669.88, closeOrIntraday: 46329.05, changePercent: -0.73, isIntraday: true },
          { region: "U.S", index: "Nasdaq Composite", open: 21996.34, closeOrIntraday: 21774.96, changePercent: -1.01, isIntraday: true },
          { region: "U.S", index: "Russell 2000", open: 2540.64, closeOrIntraday: 2524.16, changePercent: -0.65, isIntraday: true },
          { region: "EUROPE", index: "STOXX 600", open: 596.63, closeOrIntraday: 590.92, changePercent: -0.96 },
          { region: "EUROPE", index: "FTSE 100", open: 10436.29, closeOrIntraday: 10348.79, changePercent: -0.84 },
          { region: "EUROPE", index: "DAX", open: 23168.08, closeOrIntraday: 22937.65, changePercent: -0.99 },
          { region: "EUROPE", index: "CAC 40", open: 7962.39, closeOrIntraday: 7908.74, changePercent: -0.67 },
          { region: "ASIA", index: "Hang Seng", open: 25294.03, closeOrIntraday: 25116.53, changePercent: -0.70 },
          { region: "ASIA", index: "Shanghai", open: 3880.10, closeOrIntraday: 3890.16, changePercent: 0.26 },
          { region: "ASIA", index: "Nikkei", open: 53413.68, closeOrIntraday: 53429.56, changePercent: 0.03 },
        ],
        narrative: {
          body: "The U.S. market is trading bearish with S&P 500 (-0.75%), Nasdaq (-1.01%), Dow Jones (-0.73%) and Russell (-0.65%) on geopolitical tensions and rising oil prices. European markets traded broadly negative. The STOXX (-0.96%), FTSE (+0.84%), CAC (-0.67%), and DAX (-0.99%), due to rising geopolitical tensions in the Middle East and expectations of further interest rate hikes hurting investor sentiment. Asian markets opened the week mixed, as the Shanghai Composite Index (+0.26%) and Nikkei 225 (+0.03%) posted modest gains on sectoral strength, while the Hang Seng Index (-0.70%) amid cautious sentiment driven by persistent geopolitical tensions and profit-taking.",
          outlook: "Global equities are likely to trade cautiously as investors monitor geopolitical tensions in the Middle-East.",
        },
      },
    },
  
    // ── 8 April 2026 ───────────────────────────────────────────────────────────
    {
      title: TITLE,
      reportDate: "2026-04-08",
      displayDate: "Wednesday, 8th April 2026",
      status: "published",
      pdfFileName: "DAILY_MARKET_REPORT_8TH_APRIL_2026.pdf",
      sources: SOURCES,
      disclaimer: DISCLAIMER,
      moneyMarket: {
        systemLiquiditySummary: "System liquidity opened in surplus at ₦6.17trn as at the last released data (April 7th).",
        rates: [
          { label: "Overnight Policy Rate (%)", today: 22.00, prev: 22.00, change: 0.00 },
          { label: "Overnight Rate (%)", today: 22.31, prev: 22.25, change: 0.06 },
        ],
        narrative: {
          body: "System liquidity opened in surplus at ₦6.17trn as at the last released data (April 7th). The Overnight (O/N) rate declined by 6bps to close at 22.31%, while Open Buy-Back (OBB) rate was unchanged, holding steady at 22.00%.",
          outlook: "We expect inter-bank rates to be range-bound in the near term.",
        },
      },
      treasuryBills: {
        averageBenchmarkRate: 16.09,
        benchmarkRates: [
          { maturityDate: "25-Jun-26", dtm: 78, discRateToday: 15.55, discRatePrev: 15.55, changeInDiscRate: 0.00 },
          { maturityDate: "4-Feb-27", dtm: 302, discRateToday: 16.11, discRatePrev: 16.29, changeInDiscRate: -0.18 },
          { maturityDate: "25-Mar-27", dtm: 351, discRateToday: 15.93, discRatePrev: 16.25, changeInDiscRate: -0.32 },
        ],
        narrative: {
          body: "The T-bills market traded on a bullish note today, as participants positioned ahead of the NTB auction where the DMO is offering ₦700bn. Demand filtered into the mid-to-long end of the curve, with the 25-Mar-2027 bill leading gains, declining by 32bps to 15.93%, while the 4-Feb-2027 bill also tightened by 18bps to 16.11%. The 25-Jun-2026 bill remained unchanged. The average benchmark rate declined by 2bps, closing at 16.09%.",
          outlook: "We expect activity to remain supported by system liquidity surfeit, with the outcome of today's auction likely to shape near-term sentiment.",
        },
      },
      fgnBonds: {
        averageBenchmarkYield: 15.92,
        bonds: [
          { maturityDate: "20-Mar-27", coupon: 16.29, ttm: 0.95, yieldToday: 17.97, yieldPrev: 16.36, changeInYield: 1.61 },
          { maturityDate: "17-Apr-29", coupon: 14.55, ttm: 3.03, yieldToday: 16.07, yieldPrev: 16.07, changeInYield: 0.00 },
          { maturityDate: "21-Feb-31", coupon: 18.50, ttm: 4.88, yieldToday: 16.24, yieldPrev: 16.24, changeInYield: 0.00 },
          { maturityDate: "25-Jun-32", coupon: 12.50, ttm: 6.22, yieldToday: 16.45, yieldPrev: 16.45, changeInYield: 0.00 },
          { maturityDate: "15-May-33", coupon: 12.50, ttm: 7.11, yieldToday: 16.69, yieldPrev: 16.69, changeInYield: 0.00 },
          { maturityDate: "21-Feb-34", coupon: 19.00, ttm: 7.88, yieldToday: 16.52, yieldPrev: 16.52, changeInYield: 0.00 },
          { maturityDate: "29-Jan-35", coupon: 12.50, ttm: 8.82, yieldToday: 16.20, yieldPrev: 16.35, changeInYield: -0.15 },
          { maturityDate: "21-Jun-38", coupon: 15.45, ttm: 12.21, yieldToday: 15.24, yieldPrev: 15.24, changeInYield: 0.00 },
          { maturityDate: "26-Apr-49", coupon: 14.80, ttm: 23.07, yieldToday: 14.46, yieldPrev: 14.46, changeInYield: 0.00 },
          { maturityDate: "27-Mar-50", coupon: 12.98, ttm: 23.98, yieldToday: 14.39, yieldPrev: 14.39, changeInYield: 0.00 },
          { maturityDate: "21-Jun-53", coupon: 15.70, ttm: 27.22, yieldToday: 14.48, yieldPrev: 14.48, changeInYield: 0.00 },
        ],
        narrative: {
          body: "The FGN bond market traded on a mildly bearish note, with selling pressure concentrated at the short end of the curve. The 20-Mar-2027 bond recorded a notable move, rising by 161bps to 17.97%, while yields across most other benchmark maturities closed unchanged. The average benchmark yield rose by 11bp, closing at 15.92%.",
          outlook: "Mild pressure is expected to persist at the mid-curve, with sentiment remaining cautious as participants seek fresh catalysts.",
        },
      },
      ssaEurobonds: {
        bonds: [
          { sovereign: NGA, maturityDate: "28-Nov-27", coupon: 7.63, ttm: 1.64, yieldToday: 5.98, yieldPrev: 6.13, changeInYield: -0.15 },
          { sovereign: NGA, maturityDate: "16-Feb-32", coupon: 6.50, ttm: 5.86, yieldToday: 7.13, yieldPrev: 7.44, changeInYield: -0.31 },
          { sovereign: NGA, maturityDate: "28-Nov-47", coupon: 7.88, ttm: 21.65, yieldToday: 8.13, yieldPrev: 8.36, changeInYield: -0.23 },
          { sovereign: NGA, maturityDate: "21-Jan-49", coupon: 9.25, ttm: 22.81, yieldToday: 8.27, yieldPrev: 8.46, changeInYield: -0.19 },
          { sovereign: ANG, maturityDate: "09-May-28", coupon: 9.50, ttm: 2.09, yieldToday: 7.50, yieldPrev: 7.62, changeInYield: -0.12 },
          { sovereign: ANG, maturityDate: "26-Nov-29", coupon: 8.00, ttm: 3.64, yieldToday: 8.07, yieldPrev: 8.16, changeInYield: -0.09 },
          { sovereign: ANG, maturityDate: "14-Apr-32", coupon: 8.75, ttm: 6.02, yieldToday: 8.94, yieldPrev: 9.15, changeInYield: -0.21 },
          { sovereign: ANG, maturityDate: "26-Nov-49", coupon: 9.13, ttm: 23.65, yieldToday: 10.24, yieldPrev: 10.44, changeInYield: -0.20 },
          { sovereign: EGY, maturityDate: "31-Jan-27", coupon: 3.88, ttm: 0.82, yieldToday: 5.80, yieldPrev: 6.52, changeInYield: -0.73 },
          { sovereign: EGY, maturityDate: "15-Jan-32", coupon: 7.05, ttm: 5.78, yieldToday: 7.53, yieldPrev: 8.05, changeInYield: -0.52 },
          { sovereign: EGY, maturityDate: "20-Nov-59", coupon: 8.15, ttm: 33.64, yieldToday: 9.45, yieldPrev: 9.92, changeInYield: -0.47 },
        ],
        narrative: {
          body: "The Sub-Saharan Africa (SSA) Eurobond market traded firmer during the session, buoyed by the recently announced two-week ceasefire between the U.S. and Iran. The pause helped ease geopolitical risk sentiment, reinforcing investor confidence and providing a supportive backdrop for SSA sovereign debt. Consequently, Nigeria's yields compressed by 22bps to 7.32%, Angola followed, declining 16bps to 8.69%, while Egypt saw the sharpest adjustment, tightening by 57bps to close at 7.59%.",
          outlook: "We anticipate today's FOMC Meeting Minutes will provide clearer guidance on the Fed's rate trajectory as developments on the geopolitical front continue to influence market sentiment.",
        },
      },
      localEquities: {
        asiLevel: 202585.5,
        asiChangePercent: 0.28,
        ytdReturn: 30.19,
        marketCap: "₦130.404 trillion",
        turnoverValue: "₦40.57 billion",
        volumeTraded: "1,007 million units",
        marketBreadthRatio: 0.71,
        gainers: 22,
        losers: 31,
        topGainers: [
          { ticker: "UNIVINSURE", open: 1.10, close: 1.21, changePercent: 10.00 },
          { ticker: "OMATEK", open: 2.25, close: 2.47, changePercent: 9.78 },
          { ticker: "VFDGROUP", open: 10.30, close: 11.30, changePercent: 9.71 },
          { ticker: "CWG", open: 19.20, close: 21.05, changePercent: 9.64 },
          { ticker: "LIVESTOCK", open: 6.80, close: 7.45, changePercent: 9.56 },
        ],
        topLosers: [
          { ticker: "FTGINSURE", open: 1.31, close: 1.18, changePercent: -9.92 },
          { ticker: "DEAPCAP", open: 5.99, close: 5.40, changePercent: -9.85 },
          { ticker: "CHAMS", open: 3.38, close: 3.06, changePercent: -9.47 },
          { ticker: "JAPAULGOLD", open: 3.40, close: 3.10, changePercent: -8.82 },
          { ticker: "INTBREW", open: 13.60, close: 12.50, changePercent: -8.09 },
        ],
        narrative: {
          body: "The local bourse closed the day on a positive note, as the NGX All-Share Index (ASI) gained 0.28% to settle at 202,585.5 points, while YTD return moderated to 30.19%. Sectoral performance closed on a broadly positive note, reflecting selective buying interest across key indices. The Banking sector led the gainers, advancing by 1.79%, driven by strong buying interest in Zenith Bank, which appreciated by 5.83%. Similarly, the Oil and Gas sector posted a solid gain of 2.11%, supported by upward momentum in Seplat, which rose by 4.95%. On the downside, the Consumer Goods sector declined by 1.07%, pressured by sell-offs in International Breweries, which fell by 8.09%. The Industrial Goods sector also edged lower by 0.19%, weighed down by losses in Cutix, which declined by 4.62%. Likewise, the Insurance sector recorded a mild decline of 0.36%, following profit-taking in Regal Insurance, which dropped by 5.77%. Market breadth stood at 0.71x with 22 gainers and 31 losers. Market capitalization improved slightly to ₦130.404 trillion from ₦129.997 trillion. Trading activity closed the day mixed, with turnover value increasing to ₦40.57 billion from ₦37.325 billion while volume traded declined to 1,007 million units from 1,152 million units.",
          outlook: "We are likely to see some earnings induced upward repricing with some profit-taking along the way.",
        },
      },
      globalMarkets: {
        isIntradayNote: true,
        indices: [
          { region: "U.S", index: "S&P 500", open: 6616.85, closeOrIntraday: 6765.89, changePercent: 2.25, isIntraday: true },
          { region: "U.S", index: "Dow Jones", open: 46584.46, closeOrIntraday: 47746.06, changePercent: 2.49, isIntraday: true },
          { region: "U.S", index: "Nasdaq Composite", open: 22017.85, closeOrIntraday: 22614.34, changePercent: 2.71, isIntraday: true },
          { region: "U.S", index: "Russell 2000", open: 2544.94, closeOrIntraday: 2617.18, changePercent: 2.84, isIntraday: true },
          { region: "EUROPE", index: "STOXX 600", open: 590.59, closeOrIntraday: 612.10, changePercent: 3.64 },
          { region: "EUROPE", index: "FTSE 100", open: 10348.79, closeOrIntraday: 10608.88, changePercent: 2.51 },
          { region: "EUROPE", index: "DAX", open: 22921.59, closeOrIntraday: 24022.76, changePercent: 4.80 },
          { region: "EUROPE", index: "CAC 40", open: 7908.74, closeOrIntraday: 8253.06, changePercent: 4.35 },
          { region: "ASIA", index: "Hang Seng", open: 25116.53, closeOrIntraday: 25893.02, changePercent: 3.09 },
          { region: "ASIA", index: "Shanghai", open: 3890.16, closeOrIntraday: 3995.00, changePercent: 2.70 },
          { region: "ASIA", index: "Nikkei", open: 53429.56, closeOrIntraday: 56308.42, changePercent: 5.39 },
        ],
        narrative: {
          body: "The U.S. market is trading on a bullish momentum. The S&P 500 (+2.25%), Nasdaq (+2.71%), Dow Jones (+2.49%) and Russell (+2.84%) due to a U.S.–Iran ceasefire that eased oil supply fears, pushed crude prices lower, and boosted investor risk appetite. European markets rallied strongly, as the STOXX 600 (+3.64), FTSE 100 (+2.5%), DAX (+5.0%), and CAC 40 (+4.3%) on improved investor sentiment following the US–Iran ceasefire, further supported by declining oil prices, easing energy cost pressures, and strong gains across financial, industrial, and luxury sectors. Asian markets advanced broadly, as the Shanghai Composite Index (+2.69%), Hang Seng Index (+3.10%), and Nikkei 225 (+5.39%) on improved sentiment following the Middle East ceasefire and renewed risk appetite across global markets.",
          outlook: "Global equities are likely to trade cautiously as investors monitor geopolitical tensions in the Middle-East.",
        },
      },
    },
  
    // ── 9 April 2026 ───────────────────────────────────────────────────────────
    {
      title: TITLE,
      reportDate: "2026-04-09",
      displayDate: "Thursday, 9th April 2026",
      status: "published",
      pdfFileName: "DAILY_MARKET_REPORT_9TH_APRIL_2026.pdf",
      sources: SOURCES,
      disclaimer: DISCLAIMER,
      moneyMarket: {
        systemLiquiditySummary: "System liquidity opened with a surplus of ₦6.62trn.",
        rates: [
          { label: "Overnight Policy Rate (%)", today: 22.00, prev: 22.00, change: 0.00 },
          { label: "Overnight Rate (%)", today: 22.31, prev: 22.31, change: 0.00 },
        ],
        narrative: {
          body: "System liquidity opened with a surplus of ₦6.62trn. The Overnight (O/N) rate and Open Buy-Back (OBB) remained unchanged closing at 22.00% and 22.31% respectively.",
          outlook: "We expect inter-bank rates to be range-bound in the near term.",
        },
      },
      treasuryBills: {
        averageBenchmarkRate: 15.97,
        benchmarkRates: [
          { maturityDate: "25-Jun-26", dtm: 77, discRateToday: 15.55, discRatePrev: 15.55, changeInDiscRate: 0.00 },
          { maturityDate: "4-Feb-27", dtm: 301, discRateToday: 16.11, discRatePrev: 16.11, changeInDiscRate: 0.00 },
          { maturityDate: "25-Mar-27", dtm: 350, discRateToday: 15.93, discRatePrev: 15.93, changeInDiscRate: 0.00 },
        ],
        narrative: {
          body: "The T-bills market maintained a bullish tone as investors sought to cover unmet demand from the recent auction. Total subscription reached ₦2.95 trillion across the three standard maturities, while the DMO allotted ₦731.37 billion, representing a bid-to-cover ratio of 4.03x. Notably, the 364-day tenor cleared at 16.199%, marking a 23bps decline from the previous stop rate. The curve remained broadly stable across maturities, with the average benchmark rate easing by 11bps to close at 15.97%.",
          outlook: "We expect the bullish momentum to persist, underpinned by elevated system liquidity.",
        },
      },
      fgnBonds: {
        averageBenchmarkYield: 15.90,
        bonds: [
          { maturityDate: "20-Mar-27", coupon: 16.29, ttm: 0.95, yieldToday: 17.90, yieldPrev: 17.97, changeInYield: -0.07 },
          { maturityDate: "17-Apr-29", coupon: 14.55, ttm: 3.02, yieldToday: 16.07, yieldPrev: 16.07, changeInYield: 0.00 },
          { maturityDate: "21-Feb-31", coupon: 18.50, ttm: 4.87, yieldToday: 16.37, yieldPrev: 16.24, changeInYield: 0.13 },
          { maturityDate: "25-Jun-32", coupon: 12.50, ttm: 6.22, yieldToday: 16.45, yieldPrev: 16.45, changeInYield: 0.00 },
          { maturityDate: "15-May-33", coupon: 12.50, ttm: 7.10, yieldToday: 16.39, yieldPrev: 16.69, changeInYield: -0.29 },
          { maturityDate: "21-Feb-34", coupon: 19.00, ttm: 7.88, yieldToday: 16.21, yieldPrev: 16.52, changeInYield: -0.31 },
          { maturityDate: "29-Jan-35", coupon: 12.50, ttm: 8.81, yieldToday: 16.20, yieldPrev: 16.20, changeInYield: 0.00 },
          { maturityDate: "21-Jun-38", coupon: 15.45, ttm: 12.21, yieldToday: 15.24, yieldPrev: 15.24, changeInYield: 0.00 },
          { maturityDate: "26-Apr-49", coupon: 14.80, ttm: 23.06, yieldToday: 14.46, yieldPrev: 14.46, changeInYield: 0.00 },
          { maturityDate: "27-Mar-50", coupon: 12.98, ttm: 23.98, yieldToday: 14.39, yieldPrev: 14.39, changeInYield: 0.00 },
          { maturityDate: "21-Jun-53", coupon: 15.70, ttm: 27.22, yieldToday: 14.48, yieldPrev: 14.48, changeInYield: 0.00 },
        ],
        narrative: {
          body: "The FGN bond market traded on a bullish note today, with demand concentrated at the mid-curve. The 21-Feb-2034 and 15-May-2033 bonds led gains, declining by 31bps and 29bps to 16.21% and 16.39% respectively, while the 20-Mar-2027 bill tightened by 7bps to 17.90%. The average benchmark yield declined by 2bps, closing at 15.90%.",
          outlook: "We expect the bullish momentum to persist in the near term, with demand likely to remain supported at the mid-curve.",
        },
      },
      ssaEurobonds: {
        bonds: [
          { sovereign: NGA, maturityDate: "28-Nov-27", coupon: 7.63, ttm: 1.64, yieldToday: 6.08, yieldPrev: 5.98, changeInYield: 0.10 },
          { sovereign: NGA, maturityDate: "16-Feb-32", coupon: 6.50, ttm: 5.86, yieldToday: 7.22, yieldPrev: 7.13, changeInYield: 0.09 },
          { sovereign: NGA, maturityDate: "28-Nov-47", coupon: 7.88, ttm: 21.65, yieldToday: 8.19, yieldPrev: 8.13, changeInYield: 0.06 },
          { sovereign: NGA, maturityDate: "21-Jan-49", coupon: 9.25, ttm: 22.80, yieldToday: 8.30, yieldPrev: 8.27, changeInYield: 0.03 },
          { sovereign: ANG, maturityDate: "09-May-28", coupon: 9.50, ttm: 2.08, yieldToday: 7.55, yieldPrev: 7.50, changeInYield: 0.05 },
          { sovereign: ANG, maturityDate: "26-Nov-29", coupon: 8.00, ttm: 3.64, yieldToday: 8.13, yieldPrev: 8.07, changeInYield: 0.06 },
          { sovereign: ANG, maturityDate: "14-Apr-32", coupon: 8.75, ttm: 6.02, yieldToday: 8.99, yieldPrev: 8.94, changeInYield: 0.05 },
          { sovereign: ANG, maturityDate: "26-Nov-49", coupon: 9.13, ttm: 23.65, yieldToday: 10.28, yieldPrev: 10.24, changeInYield: 0.05 },
          { sovereign: EGY, maturityDate: "31-Jan-27", coupon: 3.88, ttm: 0.81, yieldToday: 5.94, yieldPrev: 5.80, changeInYield: 0.14 },
          { sovereign: EGY, maturityDate: "15-Jan-32", coupon: 7.05, ttm: 5.77, yieldToday: 7.57, yieldPrev: 7.53, changeInYield: 0.04 },
          { sovereign: EGY, maturityDate: "20-Nov-59", coupon: 8.15, ttm: 33.64, yieldToday: 9.50, yieldPrev: 9.45, changeInYield: 0.05 },
        ],
        narrative: {
          body: "The Sub-Saharan Africa (SSA) Eurobond market softened, driven largely by profit-taking following the prior session's gains. Sentiment weakened further after the U.S. Q4 2025 GDP was revised downward to 0.5% from 0.75%, alongside a 0.4% uptick in PCE inflation, adding to investor caution. Consequently, sovereign yields across the region widened: Nigeria's average yield increased by 7bps to 7.45%, Angola's rose by 5bps to 8.74%, and Egypt's expanded by 8bps to 7.67%.",
          outlook: "We anticipate U.S CPI print alongside developments on the geopolitical front would continue to influence market sentiment.",
        },
      },
      localEquities: {
        asiLevel: 203161.8,
        asiChangePercent: 0.28,
        ytdReturn: 30.56,
        marketCap: "₦130.773 trillion",
        turnoverValue: "₦39.82 billion",
        volumeTraded: "652.86 million units",
        marketBreadthRatio: 0.68,
        gainers: 29,
        losers: 31,
        topGainers: [
          { ticker: "TRANSEXPR", open: 3.12, close: 3.43, changePercent: 9.94 },
          { ticker: "INTENEGINS", open: 3.15, close: 3.46, changePercent: 9.84 },
          { ticker: "GUINEAINS", open: 1.05, close: 1.15, changePercent: 9.52 },
          { ticker: "REGALINS", open: 0.98, close: 1.07, changePercent: 9.18 },
          { ticker: "WAPIC", open: 2.97, close: 3.24, changePercent: 9.09 },
        ],
        topLosers: [
          { ticker: "LIVINGTRUST", open: 4.80, close: 4.32, changePercent: -10.00 },
          { ticker: "RTBRISCOE", open: 9.86, close: 8.88, changePercent: -9.94 },
          { ticker: "TANTALIZER", open: 4.40, close: 3.98, changePercent: -9.55 },
          { ticker: "LIVESTOCK", open: 7.45, close: 6.75, changePercent: -9.40 },
          { ticker: "VFDGROUP", open: 11.30, close: 10.30, changePercent: -8.85 },
        ],
        narrative: {
          body: "The local bourse closed the day on a positive note, as the NGX All-Share Index (ASI) gained 0.28% to settle at 203,161.8 points, while YTD return moderated to 30.56%. Sectoral performance closed on a bullish note, reflecting widespread buying interest across key indices. The Banking sector led the gainers, advancing by 1.12%, driven by sustained buying interest in UBA and Zenith Bank, which appreciated by 2.86% and 2.75% respectively. The Consumer Goods sector also advanced by 0.88%, led by a solid gain in NESTLE, which improved by 6.36%. Similarly, the Insurance sector posted a gain of 0.67%, supported by upward momentum in INTENEGINS, which rose by 9.84%. The Industrial Goods sector recorded a marginal gain of 0.18%, driven by buying interest in Cutix, which rose by 1.94%. Likewise, the Oil and Gas sector gained 0.43%, supported by price appreciation in Aradel, which increased by 1.11%. Market breadth stood at 0.68x with 29 gainers and 31 losers. Market capitalization improved slightly to ₦130.773 trillion from ₦130.404 trillion. Trading activity closed the day bearish, with turnover value decreasing to ₦39.82 billion from ₦40.57 billion while volume traded declined to 652.86 million units from 1,007 million units.",
          outlook: "We are likely to see some earnings induced upward repricing with some profit-taking along the way.",
        },
      },
      globalMarkets: {
        isIntradayNote: true,
        indices: [
          { region: "U.S", index: "S&P 500", open: 6782.81, closeOrIntraday: 6810.29, changePercent: 0.41, isIntraday: true },
          { region: "U.S", index: "Dow Jones", open: 47909.92, closeOrIntraday: 48061.01, changePercent: 0.32, isIntraday: true },
          { region: "U.S", index: "Nasdaq Composite", open: 22634.99, closeOrIntraday: 22762.78, changePercent: 0.56, isIntraday: true },
          { region: "U.S", index: "Russell 2000", open: 2620.46, closeOrIntraday: 2627.18, changePercent: 0.26, isIntraday: true },
          { region: "EUROPE", index: "STOXX 600", open: 613.50, closeOrIntraday: 611.12, changePercent: -0.39 },
          { region: "EUROPE", index: "FTSE 100", open: 10608.88, closeOrIntraday: 10603.48, changePercent: -0.05 },
          { region: "EUROPE", index: "DAX", open: 24080.63, closeOrIntraday: 23754.58, changePercent: -1.35 },
          { region: "EUROPE", index: "CAC 40", open: 8263.87, closeOrIntraday: 8245.80, changePercent: -0.22 },
          { region: "ASIA", index: "Hang Seng", open: 25893.02, closeOrIntraday: 25752.40, changePercent: -0.54 },
          { region: "ASIA", index: "Shanghai", open: 3995.00, closeOrIntraday: 3966.17, changePercent: -0.72 },
          { region: "ASIA", index: "Nikkei", open: 56308.42, closeOrIntraday: 55895.32, changePercent: -0.73 },
        ],
        narrative: {
          body: "The U.S. market is trading on a bullish momentum. The S&P 500 (+0.41%), Nasdaq (+0.56%), Dow Jones (+0.32%) and Russell (+0.26%) as gains in energy, utilities, and consumer stocks offset tech-sector losses amid Middle East uncertainty. European markets traded on a bearish note, the CAC 40 (-0.22%), FTSE 100 (-0.05%), STOXX (-0.39%), and DAX (-1.35%) fell as escalating tensions between the United States and Iran threatened the ceasefire, drove up oil prices, and pressured inflation-sensitive, industrial, and rate-sensitive sectors. Asian markets declined broadly, as the Shanghai Composite (-0.72%), Hang Seng Index (-0.54%), and Nikkei 225 Index (-0.73%) due to rising oil prices and geopolitical tensions tied to uncertainty over the Iran–US/Israel ceasefire and disruptions around the Strait of Hormuz.",
          outlook: "Global equities are likely to trade cautiously as investors monitor geopolitical tensions in the Middle-East.",
        },
      },
    },
  
    // ── 10 April 2026 (Weekly) ─────────────────────────────────────────────────
    {
      title: TITLE,
      reportDate: "2026-04-10",
      displayDate: "Friday, 10th April 2026",
      status: "published",
      pdfFileName: "DAILY_MARKET_REPORT_10TH_APRIL_2026_-_Copy.pdf",
      sources: SOURCES,
      disclaimer: DISCLAIMER,
      moneyMarket: {
        systemLiquiditySummary: "System liquidity declined by 22% to close the week with a surplus of ₦6.62 trillion as at the last released data (April 9th).",
        rates: [
          { label: "Overnight Policy Rate (%)", today: 22.00, prev: 22.00, change: 0.00 },
          { label: "Overnight Rate (%)", today: 22.35, prev: 22.31, change: 0.04 },
        ],
        narrative: {
          body: "System liquidity declined by 22% to close the week with a surplus of ₦6.62 trillion as at the last released data (April 9th). The Overnight (O/N) rate rose by 4bps to close the week at 22.35%, while Open Buy-Back (OBB) rate was unchanged, holding steady at 22.00%.",
          outlook: "We expect inter-bank rates to be range-bound in the near term.",
        },
      },
      treasuryBills: {
        averageBenchmarkRate: 15.98,
        benchmarkRates: [
          { maturityDate: "25-Jun-26", dtm: 76, discRateToday: 15.55, discRatePrev: 15.55, changeInDiscRate: 0.00 },
          { maturityDate: "4-Feb-27", dtm: 300, discRateToday: 16.11, discRatePrev: 16.29, changeInDiscRate: -0.18 },
          { maturityDate: "25-Mar-27", dtm: 349, discRateToday: 16.05, discRatePrev: 16.20, changeInDiscRate: -0.15 },
        ],
        narrative: {
          body: "The T-bills market ended the week on a bullish note, with demand activities boosted by the week's auction. The 4-Feb-2027 and 25-Mar-2027 bills led gains, declining by 18bps and 15bps to 16.11% and 16.05% respectively, while the 25-Jun-2026 bill remained unchanged. The average benchmark rate declined by 13bps W-o-W, closing at 15.98%.",
          outlook: "We expect the bullish momentum to be sustained in the near term, underpinned by improved liquidity conditions and positive auction sentiment.",
        },
      },
      fgnBonds: {
        averageBenchmarkYield: 15.89,
        bonds: [
          { maturityDate: "20-Mar-27", coupon: 16.29, ttm: 0.94, yieldToday: 17.91, yieldPrev: 16.36, changeInYield: 1.55 },
          { maturityDate: "17-Apr-29", coupon: 14.55, ttm: 3.02, yieldToday: 16.07, yieldPrev: 16.08, changeInYield: -0.01 },
          { maturityDate: "21-Feb-31", coupon: 18.50, ttm: 4.87, yieldToday: 16.37, yieldPrev: 16.24, changeInYield: 0.13 },
          { maturityDate: "25-Jun-32", coupon: 12.50, ttm: 6.21, yieldToday: 16.45, yieldPrev: 16.35, changeInYield: 0.10 },
          { maturityDate: "15-May-33", coupon: 12.50, ttm: 7.10, yieldToday: 16.38, yieldPrev: 16.60, changeInYield: -0.22 },
          { maturityDate: "21-Feb-34", coupon: 19.00, ttm: 7.87, yieldToday: 16.21, yieldPrev: 16.44, changeInYield: -0.22 },
          { maturityDate: "29-Jan-35", coupon: 12.50, ttm: 8.81, yieldToday: 16.20, yieldPrev: 16.35, changeInYield: -0.15 },
          { maturityDate: "21-Jun-38", coupon: 15.45, ttm: 12.21, yieldToday: 15.24, yieldPrev: 15.24, changeInYield: 0.00 },
          { maturityDate: "26-Apr-49", coupon: 14.80, ttm: 23.06, yieldToday: 14.46, yieldPrev: 14.46, changeInYield: 0.00 },
          { maturityDate: "27-Mar-50", coupon: 12.98, ttm: 23.98, yieldToday: 14.39, yieldPrev: 14.39, changeInYield: 0.00 },
          { maturityDate: "21-Jun-53", coupon: 15.70, ttm: 27.22, yieldToday: 14.48, yieldPrev: 14.48, changeInYield: 0.00 },
        ],
        narrative: {
          body: "The FGN bond market closed the week on a bearish note. The 20-Mar-2027 bond was the standout mover, surging by 155bps to 17.91%, while the 21-Feb-2031 and 25-Jun-2032 bonds rose by 13bps and 10bps respectively. On the other hand, the 15-May-2033 and 21-Feb-2034 bonds bucked the trend, declining by 22bps each. The average benchmark yield rose by 10bps, closing at 15.89%.",
          outlook: "We expect sentiment to remain mixed in the near term, with participants likely to reprice selectively across the curve.",
        },
      },
      ssaEurobonds: {
        bonds: [
          { sovereign: NGA, maturityDate: "28-Nov-27", coupon: 7.63, ttm: 1.64, yieldToday: 6.02, yieldPrev: 6.17, changeInYield: -0.15 },
          { sovereign: NGA, maturityDate: "16-Feb-32", coupon: 6.50, ttm: 5.86, yieldToday: 7.10, yieldPrev: 7.51, changeInYield: -0.41 },
          { sovereign: NGA, maturityDate: "28-Nov-47", coupon: 7.88, ttm: 21.65, yieldToday: 8.10, yieldPrev: 8.42, changeInYield: -0.32 },
          { sovereign: NGA, maturityDate: "21-Jan-49", coupon: 9.25, ttm: 22.80, yieldToday: 8.21, yieldPrev: 8.49, changeInYield: -0.28 },
          { sovereign: ANG, maturityDate: "09-May-28", coupon: 9.50, ttm: 2.08, yieldToday: 7.39, yieldPrev: 7.66, changeInYield: -0.28 },
          { sovereign: ANG, maturityDate: "26-Nov-29", coupon: 8.00, ttm: 3.63, yieldToday: 7.94, yieldPrev: 8.22, changeInYield: -0.29 },
          { sovereign: ANG, maturityDate: "14-Apr-32", coupon: 8.75, ttm: 6.02, yieldToday: 8.82, yieldPrev: 9.19, changeInYield: -0.37 },
          { sovereign: ANG, maturityDate: "26-Nov-49", coupon: 9.13, ttm: 23.65, yieldToday: 10.16, yieldPrev: 10.49, changeInYield: -0.33 },
          { sovereign: EGY, maturityDate: "31-Jan-27", coupon: 3.88, ttm: 0.81, yieldToday: 5.61, yieldPrev: 6.60, changeInYield: -0.99 },
          { sovereign: EGY, maturityDate: "15-Jan-32", coupon: 7.05, ttm: 5.77, yieldToday: 7.37, yieldPrev: 8.22, changeInYield: -0.86 },
          { sovereign: EGY, maturityDate: "20-Nov-59", coupon: 8.15, ttm: 33.64, yieldToday: 9.32, yieldPrev: 10.04, changeInYield: -0.73 },
        ],
        narrative: {
          body: "The Sub-Saharan Africa (SSA) Eurobond market traded the week on a bullish note, buoyed by improved investor sentiment following President Trump's announcement of a two-week ceasefire, which raised hopes for a potential resolution to the Iran conflict. However, momentum eased toward the end of the week as profit-taking set in, triggered by a weaker-than-expected U.S. PCE print. On the macro front, U.S. CPI accelerated to 3.3% y/y in March, up from 2.4% in February, underscoring the inflationary impact of elevated energy prices. Against this backdrop, SSA sovereign yields tightened across the curve: Nigeria's Eurobond yields compressed by 29bps to 7.36%, Angola followed with a 32bps decline to 8.57%, while Egypt recorded the sharpest adjustment, tightening by 86bps week on week to 7.43%.",
          outlook: "We expect the U.S CPI print to influence market sentiment near term alongside developments on Iran conflict.",
        },
      },
      localEquities: {
        asiLevel: 203770.4,
        asiChangePercent: 1.02,
        ytdReturn: 30.95,
        marketCap: "₦131.166 trillion",
        turnoverValue: "₦31.46 billion",
        volumeTraded: "548.601 million units",
        marketBreadthRatio: 0.69,
        gainers: 22,
        losers: 32,
        topGainers: [
          { ticker: "TRANSEXPR", open: 2.84, close: 3.77, changePercent: 32.75 },
          { ticker: "NGXGROUP", open: 165.00, close: 188.00, changePercent: 13.94 },
          { ticker: "GTCO", open: 122.00, close: 135.00, changePercent: 10.66 },
          { ticker: "NASCON", open: 147.00, close: 161.00, changePercent: 9.52 },
          { ticker: "GUINNESS", open: 423.20, close: 462.90, changePercent: 9.38 },
        ],
        topLosers: [
          { ticker: "DARRCOMM", open: 1.91, close: 1.50, changePercent: -21.47 },
          { ticker: "RTBRISCOE", open: 10.50, close: 8.40, changePercent: -20.00 },
          { ticker: "DEAPCAP", open: 6.01, close: 5.00, changePercent: -16.81 },
          { ticker: "ELLAHLAKES", open: 12.00, close: 10.00, changePercent: -16.67 },
          { ticker: "JAPAULGOLD", open: 3.50, close: 2.93, changePercent: -16.29 },
        ],
        narrative: {
          body: "The local bourse closed the week on a positive note, as the NGX All-Share Index (ASI) gained 1.02% to settle at 203,770.4 points, while YTD return came in at 30.95%. Sectoral performance closed the week on a largely bullish note, reflecting broad-based buying interest across most key indices. The Banking sector led the gainers, advancing by 5.24%, driven by strong buying momentum in GTCO, which appreciated by 10.66%. The Consumer Goods sector also recorded a positive performance, gaining 1.10%, supported by price appreciation in NASCON, which rose by 1.52%. Similarly, the Industrial Goods sector advanced by 0.80%, buoyed by gains in WAPCO, which climbed by 6.00%. The Oil and Gas sector posted a solid gain of 2.56%, driven by buying interest in Seplat Energy, which increased by 4.95%. Conversely, the Insurance sector closed in negative territory, declining by 3.12%, weighed down by losses in Sovereign Trust Insurance, which fell by 13.55%. Market breadth stood at 0.69x with 22 gainers and 32 losers. Market capitalization improved to ₦131.166 trillion from ₦129.806 trillion in the previous week. Trading activity closed the week mixed, with turnover value increasing to ₦31.46 billion from ₦19.262 billion while volume traded declined to 548.601 million units from 559.976 million units.",
          outlook: "We are likely to see some earnings induced upward repricing with some profit-taking along the way.",
        },
      },
      globalMarkets: {
        isIntradayNote: true,
        indices: [
          { region: "U.S", index: "S&P 500", open: 6582.69, closeOrIntraday: 6824.58, changePercent: 3.67, isIntraday: true },
          { region: "U.S", index: "Dow Jones", open: 46504.67, closeOrIntraday: 47978.72, changePercent: 3.17, isIntraday: true },
          { region: "U.S", index: "Nasdaq Composite", open: 21879.18, closeOrIntraday: 22912.92, changePercent: 4.72, isIntraday: true },
          { region: "U.S", index: "Russell 2000", open: 3801.20, closeOrIntraday: 3961.10, changePercent: 4.21, isIntraday: true },
          { region: "EUROPE", index: "STOXX 600", open: 596.64, closeOrIntraday: 615.22, changePercent: 3.11 },
          { region: "EUROPE", index: "FTSE 100", open: 10436.29, closeOrIntraday: 10592.43, changePercent: 1.50 },
          { region: "EUROPE", index: "DAX", open: 23168.08, closeOrIntraday: 23786.05, changePercent: 2.67 },
          { region: "EUROPE", index: "CAC 40", open: 7962.39, closeOrIntraday: 8259.60, changePercent: 3.73 },
          { region: "ASIA", index: "Shanghai", open: 3880.10, closeOrIntraday: 3986.22, changePercent: 2.73 },
          { region: "ASIA", index: "Nikkei", open: 53123.49, closeOrIntraday: 56924.11, changePercent: 7.15 },
          { region: "ASIA", index: "Hang Seng", open: 25116.53, closeOrIntraday: 25893.54, changePercent: 3.09 },
        ],
        narrative: {
          body: "The U.S. market is trading on a bullish momentum week on week. The S&P 500 (+3.67%), Nasdaq (+4.72%), Dow Jones (+3.17%), and Russell (+4.21%), rose as resilient tech gains and steady inflation expectations outweighed concerns over tensions between the United States and Iran. European markets closed the week in the green, as the STOXX 600 (+3.11%), FTSE 100 (+1.50%), DAX (+2.67%), and CAC 40 (+3.73%) rose mainly due to easing market fears, strong tech earnings (led by TSMC), and optimism around upcoming US-Iran talks. Asian markets closed the week bullish, with the Shanghai (+2.73%), Hang Seng (+3.09%), and Nikkei (+7.15%) on improved sentiment following the Middle East ceasefire and renewed risk appetite across global markets.",
          outlook: "Global equities are likely to trade cautiously as investors monitor geopolitical tensions in the Middle-East.",
        },
      },
    },
  
    // ── 13 April 2026 ──────────────────────────────────────────────────────────
    {
      title: TITLE,
      reportDate: "2026-04-13",
      displayDate: "Monday, 13th April 2026",
      status: "published",
      pdfFileName: "DAILY_MARKET_REPORT_13TH_APRIL_2026_.pdf",
      sources: SOURCES,
      disclaimer: DISCLAIMER,
      moneyMarket: {
        systemLiquiditySummary: "System liquidity opened the week with a surplus of ₦4.97 trillion.",
        rates: [
          { label: "Overnight Policy Rate (%)", today: 22.00, prev: 22.00, change: 0.00 },
          { label: "Overnight Rate (%)", today: 22.19, prev: 22.35, change: -0.16 },
        ],
        narrative: {
          body: "System liquidity opened the week with a surplus of ₦4.97 trillion. The Overnight (O/N) rate declined by 16bps to close at 22.19%, while Open Buy-Back (OBB) rate was unchanged, holding steady at 22.00%.",
          outlook: "We expect inter-bank rates to be range-bound in the near term.",
        },
      },
      treasuryBills: {
        averageBenchmarkRate: 15.97,
        benchmarkRates: [
          { maturityDate: "25-Jun-26", dtm: 73, discRateToday: 15.55, discRatePrev: 15.55, changeInDiscRate: 0.00 },
          { maturityDate: "4-Feb-27", dtm: 297, discRateToday: 16.11, discRatePrev: 16.11, changeInDiscRate: 0.00 },
          { maturityDate: "8-Apr-27", dtm: 360, discRateToday: 15.80, discRatePrev: 15.84, changeInDiscRate: -0.04 },
        ],
        narrative: {
          body: "The T-bills market traded on a quiet note today, with minimal price movement observed on the 8-Apr-2027 bill which edged lower by 4bps to 15.80%. Consequently, average benchmark rate closed flat at 15.97%.",
          outlook: "We expect activity to remain muted in the near term, with participants awaiting fresh catalysts to drive direction.",
        },
      },
      fgnBonds: {
        averageBenchmarkYield: 15.89,
        bonds: [
          { maturityDate: "20-Mar-27", coupon: 16.29, ttm: 0.93, yieldToday: 17.83, yieldPrev: 17.91, changeInYield: -0.09 },
          { maturityDate: "17-Apr-29", coupon: 14.55, ttm: 3.01, yieldToday: 16.06, yieldPrev: 16.07, changeInYield: 0.00 },
          { maturityDate: "21-Feb-31", coupon: 18.50, ttm: 4.86, yieldToday: 16.37, yieldPrev: 16.37, changeInYield: 0.00 },
          { maturityDate: "25-Jun-32", coupon: 12.50, ttm: 6.21, yieldToday: 16.45, yieldPrev: 16.45, changeInYield: 0.00 },
          { maturityDate: "15-May-33", coupon: 12.50, ttm: 7.09, yieldToday: 16.38, yieldPrev: 16.38, changeInYield: 0.00 },
          { maturityDate: "21-Feb-34", coupon: 19.00, ttm: 7.87, yieldToday: 16.21, yieldPrev: 16.21, changeInYield: 0.00 },
          { maturityDate: "29-Jan-35", coupon: 12.50, ttm: 8.80, yieldToday: 16.20, yieldPrev: 16.20, changeInYield: 0.00 },
          { maturityDate: "21-Jun-38", coupon: 15.45, ttm: 12.20, yieldToday: 15.24, yieldPrev: 15.24, changeInYield: 0.00 },
          { maturityDate: "26-Apr-49", coupon: 14.80, ttm: 23.05, yieldToday: 14.46, yieldPrev: 14.46, changeInYield: 0.00 },
          { maturityDate: "27-Mar-50", coupon: 12.98, ttm: 23.97, yieldToday: 14.39, yieldPrev: 14.39, changeInYield: 0.00 },
          { maturityDate: "21-Jun-53", coupon: 15.70, ttm: 27.21, yieldToday: 14.48, yieldPrev: 14.48, changeInYield: 0.00 },
        ],
        narrative: {
          body: "The FGN bond market traded on a quiet note today, with activity largely subdued across the curve. The 20-Mar-2027 bond was the sole mover, easing by 9bps to 17.83%, while all other bonds remained unchanged. The average benchmark yield closed flat at 15.89%.",
          outlook: "We expect the upcoming CPI print to influence near term market sentiment.",
        },
      },
      ssaEurobonds: {
        bonds: [
          { sovereign: NGA, maturityDate: "28-Nov-27", coupon: 7.63, ttm: 1.63, yieldToday: 6.09, yieldPrev: 6.02, changeInYield: 0.07 },
          { sovereign: NGA, maturityDate: "16-Feb-32", coupon: 6.50, ttm: 5.85, yieldToday: 7.09, yieldPrev: 7.10, changeInYield: -0.01 },
          { sovereign: NGA, maturityDate: "28-Nov-47", coupon: 7.88, ttm: 21.64, yieldToday: 8.11, yieldPrev: 8.10, changeInYield: 0.01 },
          { sovereign: NGA, maturityDate: "21-Jan-49", coupon: 9.25, ttm: 22.79, yieldToday: 8.21, yieldPrev: 8.21, changeInYield: 0.00 },
          { sovereign: ANG, maturityDate: "09-May-28", coupon: 9.50, ttm: 2.07, yieldToday: 7.42, yieldPrev: 7.39, changeInYield: 0.03 },
          { sovereign: ANG, maturityDate: "26-Nov-29", coupon: 8.00, ttm: 3.62, yieldToday: 8.00, yieldPrev: 7.94, changeInYield: 0.06 },
          { sovereign: ANG, maturityDate: "14-Apr-32", coupon: 8.75, ttm: 6.01, yieldToday: 8.86, yieldPrev: 8.82, changeInYield: 0.04 },
          { sovereign: ANG, maturityDate: "26-Nov-49", coupon: 9.13, ttm: 23.64, yieldToday: 10.19, yieldPrev: 10.16, changeInYield: 0.03 },
          { sovereign: EGY, maturityDate: "31-Jan-27", coupon: 3.88, ttm: 0.80, yieldToday: 5.77, yieldPrev: 5.61, changeInYield: 0.16 },
          { sovereign: EGY, maturityDate: "15-Jan-32", coupon: 7.05, ttm: 5.76, yieldToday: 7.42, yieldPrev: 7.37, changeInYield: 0.05 },
          { sovereign: EGY, maturityDate: "20-Nov-59", coupon: 8.15, ttm: 33.63, yieldToday: 9.38, yieldPrev: 9.32, changeInYield: 0.06 },
        ],
        narrative: {
          body: "The Sub-Saharan Africa (SSA) Eurobond market commenced the week on a bearish footing, pressured by intensifying geopolitical risks in the Middle East. Heightened Iran-related conflict concerns weighed on investor sentiment, amplifying risk-off positioning. This cautious tone was further compounded by the weaker U.S. CPI print, which added to the negative momentum across the curve. On this backdrop, SSA sovereign yields moved higher across the curve: Nigeria's Eurobond yields rose by 2bps to 7.38%, Angola increased by 4bps to 8.61%, while Egypt recorded the sharpest adjustment, rising by 9bps to 7.52%.",
          outlook: "SSA Eurobonds are expected to remain volatile and risk-sensitive, with sentiment driven by Middle East tensions and shifting global inflation and monetary policy expectations.",
        },
      },
      localEquities: {
        asiLevel: 204479.14,
        asiChangePercent: 0.35,
        ytdReturn: 31.41,
        marketCap: "₦131.621 trillion",
        turnoverValue: "₦32.02 billion",
        volumeTraded: "464.113 million units",
        marketBreadthRatio: 1.39,
        gainers: 32,
        losers: 23,
        topGainers: [
          { ticker: "NGXGROUP", open: 139.50, close: 153.45, changePercent: 10.00 },
          { ticker: "TRANSEXPR", open: 3.77, close: 4.14, changePercent: 9.81 },
          { ticker: "MCNICHOLS", open: 6.47, close: 7.10, changePercent: 9.74 },
          { ticker: "VFDGROUP", open: 10.30, close: 11.30, changePercent: 9.71 },
          { ticker: "CHAMS", open: 3.36, close: 3.65, changePercent: 8.63 },
        ],
        topLosers: [
          { ticker: "BERGER", open: 75.90, close: 68.35, changePercent: -9.95 },
          { ticker: "ACADEMY", open: 8.75, close: 7.90, changePercent: -9.71 },
          { ticker: "CAVERTON", open: 5.85, close: 5.50, changePercent: -5.98 },
          { ticker: "HONYFLOUR", open: 21.35, close: 20.30, changePercent: -4.92 },
          { ticker: "CAP", open: 99.80, close: 96.00, changePercent: -3.81 },
        ],
        narrative: {
          body: "The local bourse opened the week on a positive note, as the NGX All-Share Index (ASI) gained 0.35% to settle at 204,479.14 points, while YTD return came in at 31.41%. Sectoral performance opened the week on a mildly bullish note. The Consumer Goods sector led the gain with an increase of 1.96%, led by Mcnichols which rose 9.74%. Insurance sector also recorded a positive performance, gaining 1.04%, supported by appreciation in MBENEFIT which rose by 7.25%. Similarly, the Banking sector advanced by 0.11%, buoyed by gains in Stanbic which climbed 6.52%. Conversely, the Oil and Gas sector closed in negative territory, declining by 0.1%, weighed down by losses in OANDO which fell by 2.15%. Also, the Industrial sector also declined by 0.02%, led by BERGER which fell by 9.95%. Market breadth stood at 1.39x with 32 gainers and 23 losers. Market capitalization improved to ₦131.621 trillion from ₦131.166 trillion. Trading activity closed the day mixed, with turnover value increasing to ₦32.02 billion from ₦31.46 billion while volume traded declined to 464.113 million units from 548.601 million units.",
          outlook: "We are likely to see some earnings induced upward repricing with some profit-taking along the way.",
        },
      },
      globalMarkets: {
        isIntradayNote: true,
        indices: [
          { region: "U.S", index: "S&P 500", open: 6816.89, closeOrIntraday: 6822.77, changePercent: 0.09, isIntraday: true },
          { region: "U.S", index: "Dow Jones", open: 47916.57, closeOrIntraday: 47677.39, changePercent: -0.50, isIntraday: true },
          { region: "U.S", index: "Nasdaq Composite", open: 22902.90, closeOrIntraday: 22985.35, changePercent: 0.36, isIntraday: true },
          { region: "U.S", index: "Russell 2000", open: 2630.59, closeOrIntraday: 2637.00, changePercent: 0.24, isIntraday: true },
          { region: "EUROPE", index: "STOXX 600", open: 614.84, closeOrIntraday: 613.90, changePercent: -0.15 },
          { region: "EUROPE", index: "FTSE 100", open: 10600.53, closeOrIntraday: 10582.96, changePercent: -0.17 },
          { region: "EUROPE", index: "DAX", open: 23803.95, closeOrIntraday: 23737.42, changePercent: -0.28 },
          { region: "EUROPE", index: "CAC 40", open: 8259.60, closeOrIntraday: 8232.73, changePercent: -0.33 },
          { region: "ASIA", index: "Hang Seng", open: 25893.54, closeOrIntraday: 25660.85, changePercent: -0.90 },
          { region: "ASIA", index: "Shanghai", open: 3986.22, closeOrIntraday: 3988.56, changePercent: 0.06 },
          { region: "ASIA", index: "Nikkei", open: 56924.11, closeOrIntraday: 56502.77, changePercent: -0.74 },
        ],
        narrative: {
          body: "The U.S. market is trading mixed. The S&P 500 (+0.09%), Nasdaq (+0.36%), Russell (+0.24%) all rise, and Dow Jones declined (-0.50%) due to resilience in tech stocks even as rising oil prices and U.S.–Iran tensions pressured broader market sentiment. European markets opened the week in the red, as the STOXX 600 (-0.15%), FTSE 100 (-0.17%), DAX (-0.28%), and CAC 40 (-0.33%) fell due to rising geopolitical tensions (U.S.–Iran conflict fears) and expectations of tighter monetary policy from the European Central Bank. Asian markets opened the week mixed, with the Hang Seng (-0.9%), Shanghai (+0.06%), and Nikkei (-0.74%) on escalating Middle East tensions and the U.S. blockade of the Strait of Hormuz, which triggered a sharp rise in oil prices and global risk aversion.",
          outlook: "Global equities are likely to trade cautiously as investors monitor geopolitical tensions in the Middle-East.",
        },
      },
    },
  
    // ── 14 April 2026 ──────────────────────────────────────────────────────────
    {
      title: TITLE,
      reportDate: "2026-04-14",
      displayDate: "Tuesday, 14th April 2026",
      status: "published",
      pdfFileName: "DAILY_MARKET_REPORT_14TH_APRIL_2026.pdf",
      sources: SOURCES,
      disclaimer: DISCLAIMER,
      moneyMarket: {
        systemLiquiditySummary: "System liquidity opened with a surplus of ₦5.91 trillion.",
        rates: [
          { label: "Overnight Policy Rate (%)", today: 22.00, prev: 22.00, change: 0.00 },
          { label: "Overnight Rate (%)", today: 22.29, prev: 22.19, change: 0.10 },
        ],
        narrative: {
          body: "System liquidity opened with a surplus of ₦5.91 trillion. The Overnight (O/N) rate rose by 10bps to close at 22.29%, while Open Buy-Back (OBB) rate was unchanged, holding steady at 22.00%.",
          outlook: "We expect inter-bank rates to be range-bound in the near term.",
        },
      },
      treasuryBills: {
        averageBenchmarkRate: 15.98,
        benchmarkRates: [
          { maturityDate: "25-Jun-26", dtm: 72, discRateToday: 15.55, discRatePrev: 15.55, changeInDiscRate: 0.00 },
          { maturityDate: "4-Feb-27", dtm: 296, discRateToday: 16.11, discRatePrev: 16.11, changeInDiscRate: 0.00 },
          { maturityDate: "8-Apr-27", dtm: 359, discRateToday: 15.75, discRatePrev: 15.80, changeInDiscRate: -0.05 },
        ],
        narrative: {
          body: "The T-bills market traded with a mildly bearish bias as market participants repriced following the OMO auction today, though the 8-Apr-2027 bill eased by 5bps to 15.75%. The CBN also conducted an OMO auction, with the 140-day bill heavily oversubscribed at ₦1.71trn, allotted in full at 19.91%. The average benchmark rate rose by 1bp, closing at 15.98%.",
          outlook: "We expect sentiments to be shaped by the upcoming CPI print and elevated system liquidity.",
        },
      },
      fgnBonds: {
        averageBenchmarkYield: 15.89,
        bonds: [
          { maturityDate: "20-Mar-27", coupon: 16.29, ttm: 0.93, yieldToday: 17.76, yieldPrev: 17.83, changeInYield: -0.06 },
          { maturityDate: "17-Apr-29", coupon: 14.55, ttm: 3.01, yieldToday: 16.06, yieldPrev: 16.06, changeInYield: 0.00 },
          { maturityDate: "21-Feb-31", coupon: 18.50, ttm: 4.86, yieldToday: 16.37, yieldPrev: 16.37, changeInYield: 0.00 },
          { maturityDate: "25-Jun-32", coupon: 12.50, ttm: 6.20, yieldToday: 16.45, yieldPrev: 16.45, changeInYield: 0.00 },
          { maturityDate: "15-May-33", coupon: 12.50, ttm: 7.09, yieldToday: 16.31, yieldPrev: 16.38, changeInYield: -0.07 },
          { maturityDate: "21-Feb-34", coupon: 19.00, ttm: 7.86, yieldToday: 16.40, yieldPrev: 16.21, changeInYield: 0.19 },
          { maturityDate: "29-Jan-35", coupon: 12.50, ttm: 8.80, yieldToday: 16.20, yieldPrev: 16.20, changeInYield: 0.00 },
          { maturityDate: "21-Jun-38", coupon: 15.45, ttm: 12.19, yieldToday: 15.24, yieldPrev: 15.24, changeInYield: 0.00 },
          { maturityDate: "26-Apr-49", coupon: 14.80, ttm: 23.05, yieldToday: 14.46, yieldPrev: 14.46, changeInYield: 0.00 },
          { maturityDate: "27-Mar-50", coupon: 12.98, ttm: 23.97, yieldToday: 14.39, yieldPrev: 14.39, changeInYield: 0.00 },
          { maturityDate: "21-Jun-53", coupon: 15.70, ttm: 27.21, yieldToday: 14.48, yieldPrev: 14.48, changeInYield: 0.00 },
        ],
        narrative: {
          body: "The FGN bond market traded on a quiet note today, with limited activity across the curve. The 21-Feb-2034 bond was the key mover, rising by 19bps to 16.40%, while the 20-Mar-2027 and 15-May-2033 bonds eased marginally by 6bps and 7bps respectively. The average benchmark yield closed flat at 15.89%.",
          outlook: "We expect activity to remain quiet, with participants awaiting fresh catalysts and upcoming CPI print to drive direction.",
        },
      },
      ssaEurobonds: {
        bonds: [
          { sovereign: NGA, maturityDate: "28-Nov-27", coupon: 7.63, ttm: 1.62, yieldToday: 5.99, yieldPrev: 6.09, changeInYield: -0.10 },
          { sovereign: NGA, maturityDate: "16-Feb-32", coupon: 6.50, ttm: 5.85, yieldToday: 6.89, yieldPrev: 7.09, changeInYield: -0.20 },
          { sovereign: NGA, maturityDate: "28-Nov-47", coupon: 7.88, ttm: 21.64, yieldToday: 7.99, yieldPrev: 8.11, changeInYield: -0.12 },
          { sovereign: NGA, maturityDate: "21-Jan-49", coupon: 9.25, ttm: 22.79, yieldToday: 8.13, yieldPrev: 8.21, changeInYield: -0.08 },
          { sovereign: ANG, maturityDate: "09-May-28", coupon: 9.50, ttm: 2.07, yieldToday: 7.16, yieldPrev: 7.42, changeInYield: -0.26 },
          { sovereign: ANG, maturityDate: "26-Nov-29", coupon: 8.00, ttm: 3.62, yieldToday: 7.71, yieldPrev: 8.00, changeInYield: -0.28 },
          { sovereign: ANG, maturityDate: "14-Apr-32", coupon: 8.75, ttm: 6.01, yieldToday: 8.59, yieldPrev: 8.86, changeInYield: -0.27 },
          { sovereign: ANG, maturityDate: "26-Nov-49", coupon: 9.13, ttm: 23.64, yieldToday: 10.02, yieldPrev: 10.19, changeInYield: -0.17 },
          { sovereign: EGY, maturityDate: "31-Jan-27", coupon: 3.88, ttm: 0.80, yieldToday: 5.68, yieldPrev: 5.77, changeInYield: -0.09 },
          { sovereign: EGY, maturityDate: "15-Jan-32", coupon: 7.05, ttm: 5.76, yieldToday: 7.18, yieldPrev: 7.42, changeInYield: -0.24 },
          { sovereign: EGY, maturityDate: "20-Nov-59", coupon: 8.15, ttm: 33.62, yieldToday: 9.18, yieldPrev: 9.38, changeInYield: -0.20 },
        ],
        narrative: {
          body: "The SSA Eurobond market traded on a bullish footing today, as easing tensions surrounding the U.S.-Iran standoff buoyed risk sentiment globally. With the possibility of peace talks resuming this week, sovereign yields lowered across the region. Nigeria's yields declined by 13bps to 7.25%, Angola tightened by 25bps to 8.37%, while Egypt declined by 18bps to 7.34%.",
          outlook: "As geopolitical tensions gradually subside, we expect investors to maintain active positioning across the sub-Saharan curve.",
        },
      },
      localEquities: {
        asiLevel: 205913.9,
        asiChangePercent: 0.70,
        ytdReturn: 32.32,
        marketCap: "₦132.492 trillion",
        turnoverValue: "₦32.25 billion",
        volumeTraded: "569.309 million units",
        marketBreadthRatio: 1.90,
        gainers: 40,
        losers: 21,
        topGainers: [
          { ticker: "ETI", open: 46.00, close: 50.60, changePercent: 10.00 },
          { ticker: "STANBIC", open: 147.00, close: 161.70, changePercent: 10.00 },
          { ticker: "NGXGROUP", open: 153.45, close: 168.75, changePercent: 9.97 },
          { ticker: "CORNERST", open: 5.13, close: 5.64, changePercent: 9.94 },
          { ticker: "MECURE", open: 61.50, close: 67.60, changePercent: 9.92 },
        ],
        topLosers: [
          { ticker: "FTGINSURE", open: 1.22, close: 1.12, changePercent: -8.20 },
          { ticker: "MCNICHOLS", open: 7.10, close: 6.52, changePercent: -8.17 },
          { ticker: "ACADEMY", open: 7.90, close: 7.35, changePercent: -6.96 },
          { ticker: "INTENEGINS", open: 3.49, close: 3.25, changePercent: -6.88 },
          { ticker: "GUINEAINS", open: 1.20, close: 1.13, changePercent: -5.83 },
        ],
        narrative: {
          body: "The local bourse closed the day on a positive note, as the NGX All-Share Index (ASI) gained 0.7% to settle at 205,913.9 points, while YTD return came in at 32.32%. Sectoral performance closed the day on a positive note, with all key indices recording gains, reflecting sustained buying interest across the market. The Oil and Gas sector led the advancers, rising by 4.36%, supported by buying interest in SEPLAT, which gained 9.42%. Then followed by Banking sector with a notable increase of 1.79%, driven by strong gains in Stanbic and ETI, both of which appreciated by 10.00%. The Consumer Goods sector also posted a solid gain of 1.24%, buoyed by a sharp 9.86% rise in UNIONDICON. Similarly, the Insurance sector advanced by 0.65%, underpinned by a 9.94% uptick in CORNERST. The Industrial Goods sector recorded a moderate increase of 0.71%, supported by gains in WAPCO, which rose by 5.06%. Market breadth stood at 1.90x with 40 gainers and 21 losers. Market capitalization improved to ₦132.492 trillion from ₦131.621 trillion. Trading activity closed the day bullish, with turnover value increasing to ₦32.25 billion from ₦32.02 billion while volume traded increased to 569.309 million units from 464.113 million units.",
          outlook: "We are likely to see some earnings induced upward repricing with some profit-taking along the way.",
        },
      },
      globalMarkets: {
        isIntradayNote: true,
        indices: [
          { region: "U.S", index: "S&P 500", open: 6886.24, closeOrIntraday: 6950.84, changePercent: 0.94, isIntraday: true },
          { region: "U.S", index: "Dow Jones", open: 48218.25, closeOrIntraday: 48528.86, changePercent: 0.64, isIntraday: true },
          { region: "U.S", index: "Nasdaq Composite", open: 23183.74, closeOrIntraday: 23529.52, changePercent: 1.49, isIntraday: true },
          { region: "U.S", index: "Russell 2000", open: 2670.49, closeOrIntraday: 2705.41, changePercent: 1.31, isIntraday: true },
          { region: "EUROPE", index: "STOXX 600", open: 613.88, closeOrIntraday: 619.42, changePercent: 0.90 },
          { region: "EUROPE", index: "FTSE 100", open: 10582.96, closeOrIntraday: 10609.06, changePercent: 0.25 },
          { region: "EUROPE", index: "DAX", open: 23742.44, closeOrIntraday: 24030.84, changePercent: 1.21 },
          { region: "EUROPE", index: "CAC 40", open: 8235.98, closeOrIntraday: 8321.86, changePercent: 1.04 },
          // Note: Asia values in source PDF appear swapped — entered as-is from PDF
          { region: "ASIA", index: "Hang Seng", open: 3988.56, closeOrIntraday: 4026.63, changePercent: 0.95 },
          { region: "ASIA", index: "Shanghai", open: 56502.77, closeOrIntraday: 57877.39, changePercent: 2.43 },
          { region: "ASIA", index: "Nikkei", open: 25660.85, closeOrIntraday: 25872.32, changePercent: 0.82 },
        ],
        narrative: {
          body: "The U.S. market is trading bullish. The S&P 500 (+0.94%), Nasdaq (+1.49%), Russell (+1.31%), and Dow Jones (+0.64%) all rising on improved investor sentiment driven by optimism over easing Middle East tensions and renewed U.S.–Iran talks. European markets closed the day bullish, as the STOXX 600 (+0.90%), FTSE 100 (+0.25%), DAX (+1.21%), and CAC 40 (+1.04%) all rose, driven by improved investor sentiment on renewed US–Iran diplomatic optimism, easing energy concerns, and sector-specific earnings performance across Europe. Asian markets closed the day bullish, with the Hang Seng (+0.95%), Shanghai (+2.43%), and Nikkei (+0.82%) edging higher on improved risk sentiment driven by renewed US–Iran diplomatic optimism, easing oil prices, and broad-based gains across financial, consumer, and technology stocks.",
          outlook: "Despite the improved sentiment around the US-Israel, Iran conflict, participants are likely to stay cautious as they monitor developments.",
        },
      },
    },
  
    // ── 15 April 2026 ──────────────────────────────────────────────────────────
    {
      title: TITLE,
      reportDate: "2026-04-15",
      displayDate: "Wednesday, 15th April 2026",
      status: "published",
      pdfFileName: "DAILY_MARKET_REPORT_15TH_APRIL_2026.pdf",
      sources: SOURCES,
      disclaimer: DISCLAIMER,
      moneyMarket: {
        systemLiquiditySummary: "System liquidity opened with a surplus of ₦3.79 trillion.",
        rates: [
          { label: "Overnight Policy Rate (%)", today: 22.00, prev: 22.00, change: 0.00 },
          { label: "Overnight Rate (%)", today: 22.20, prev: 22.29, change: -0.09 },
        ],
        narrative: {
          body: "System liquidity opened with a surplus of ₦3.79 trillion. The Overnight (O/N) rate rose by 10bps to close at 22.29%, while Open Buy-Back (OBB) rate was unchanged, holding steady at 22.00%.",
          outlook: "We expect inter-bank rates to be range-bound in the near term.",
        },
      },
      treasuryBills: {
        averageBenchmarkRate: 15.99,
        benchmarkRates: [
          { maturityDate: "25-Jun-26", dtm: 71, discRateToday: 15.55, discRatePrev: 15.55, changeInDiscRate: 0.00 },
          { maturityDate: "4-Feb-27", dtm: 295, discRateToday: 16.11, discRatePrev: 16.11, changeInDiscRate: 0.00 },
          { maturityDate: "8-Apr-27", dtm: 358, discRateToday: 15.86, discRatePrev: 15.75, changeInDiscRate: 0.11 },
        ],
        narrative: {
          body: "The T-bills market traded on a quiet note with a mildly bearish sentiment as yields ticked higher across the curve, with the 8-Apr-2027 bill rising by 11bps to 15.86%. The average benchmark rate increased by 1bp to close at 15.99%.",
          outlook: "We expect the market to remain cautious near term following the CPI print.",
        },
      },
      fgnBonds: {
        averageBenchmarkYield: 15.85,
        bonds: [
          { maturityDate: "20-Mar-27", coupon: 16.29, ttm: 0.93, yieldToday: 17.87, yieldPrev: 17.76, changeInYield: 0.10 },
          { maturityDate: "17-Apr-29", coupon: 14.55, ttm: 3.01, yieldToday: 16.06, yieldPrev: 16.06, changeInYield: 0.00 },
          { maturityDate: "21-Feb-31", coupon: 18.50, ttm: 4.86, yieldToday: 16.37, yieldPrev: 16.37, changeInYield: 0.00 },
          { maturityDate: "25-Jun-32", coupon: 12.50, ttm: 6.20, yieldToday: 16.37, yieldPrev: 16.45, changeInYield: -0.08 },
          { maturityDate: "15-May-33", coupon: 12.50, ttm: 7.09, yieldToday: 16.31, yieldPrev: 16.31, changeInYield: 0.00 },
          { maturityDate: "21-Feb-34", coupon: 19.00, ttm: 7.86, yieldToday: 16.40, yieldPrev: 16.40, changeInYield: 0.00 },
          { maturityDate: "29-Jan-35", coupon: 12.50, ttm: 8.80, yieldToday: 16.20, yieldPrev: 16.20, changeInYield: 0.00 },
          { maturityDate: "21-Jun-38", coupon: 15.45, ttm: 12.19, yieldToday: 15.24, yieldPrev: 15.24, changeInYield: 0.00 },
          { maturityDate: "26-Apr-49", coupon: 14.80, ttm: 23.05, yieldToday: 14.46, yieldPrev: 14.46, changeInYield: 0.00 },
          { maturityDate: "27-Mar-50", coupon: 12.98, ttm: 23.96, yieldToday: 14.39, yieldPrev: 14.39, changeInYield: 0.00 },
          { maturityDate: "21-Jun-53", coupon: 15.70, ttm: 27.20, yieldToday: 14.48, yieldPrev: 14.48, changeInYield: 0.00 },
        ],
        narrative: {
          body: "The FGN bond market closed on a bullish note, driven by modest buying interest in the mid-tenor segment. March 2026 inflation rose to 15.38%, reflecting pass-through effects from elevated energy prices. Overall benchmark yields declined by 4bps to settle at 15.85%.",
          outlook: "We expect the inflation print to influence market sentiment near term.",
        },
      },
      ssaEurobonds: {
        bonds: [
          { sovereign: NGA, maturityDate: "28-Nov-27", coupon: 7.63, ttm: 1.62, yieldToday: 5.86, yieldPrev: 5.99, changeInYield: -0.13 },
          { sovereign: NGA, maturityDate: "16-Feb-32", coupon: 6.50, ttm: 5.84, yieldToday: 6.90, yieldPrev: 6.89, changeInYield: 0.01 },
          { sovereign: NGA, maturityDate: "28-Nov-47", coupon: 7.88, ttm: 21.64, yieldToday: 8.02, yieldPrev: 7.99, changeInYield: 0.03 },
          { sovereign: NGA, maturityDate: "21-Jan-49", coupon: 9.25, ttm: 22.79, yieldToday: 8.15, yieldPrev: 8.13, changeInYield: 0.02 },
          { sovereign: ANG, maturityDate: "09-May-28", coupon: 9.50, ttm: 2.07, yieldToday: 7.16, yieldPrev: 7.16, changeInYield: 0.00 },
          { sovereign: ANG, maturityDate: "26-Nov-29", coupon: 8.00, ttm: 3.62, yieldToday: 7.71, yieldPrev: 7.71, changeInYield: 0.00 },
          { sovereign: ANG, maturityDate: "14-Apr-32", coupon: 8.75, ttm: 6.00, yieldToday: 8.59, yieldPrev: 8.59, changeInYield: 0.00 },
          { sovereign: ANG, maturityDate: "26-Nov-49", coupon: 9.13, ttm: 23.63, yieldToday: 10.05, yieldPrev: 10.02, changeInYield: 0.03 },
          { sovereign: EGY, maturityDate: "31-Jan-27", coupon: 3.88, ttm: 0.80, yieldToday: 5.67, yieldPrev: 5.68, changeInYield: -0.01 },
          { sovereign: EGY, maturityDate: "15-Jan-32", coupon: 7.05, ttm: 5.76, yieldToday: 7.20, yieldPrev: 7.18, changeInYield: 0.02 },
          { sovereign: EGY, maturityDate: "20-Nov-59", coupon: 8.15, ttm: 33.62, yieldToday: 9.18, yieldPrev: 9.18, changeInYield: 0.00 },
        ],
        narrative: {
          body: "The SSA Eurobond market traded on a mixed note marked with profit taking, as easing tensions surrounding the U.S.-Iran standoff buoyed risk sentiment globally. Nigeria's yields declined by 2bps to 7.23%, Angola rose by 1bps to 8.38%, while Egypt rose by 1bps to 7.35%.",
          outlook: "As geopolitical tensions gradually subside, we expect investors to maintain active positioning across the sub-Saharan curve.",
        },
      },
      localEquities: {
        asiLevel: 209323.0,
        asiChangePercent: 1.66,
        ytdReturn: 34.52,
        marketCap: "₦134.772 trillion",
        turnoverValue: "₦41.876 billion",
        volumeTraded: "706.392 million units",
        marketBreadthRatio: 1.00,
        gainers: 37,
        losers: 37,
        topGainers: [
          { ticker: "ARADEL", open: 1279.00, close: 1406.90, changePercent: 10.00 },
          { ticker: "AIRTELAFRI", open: 2497.00, close: 2746.70, changePercent: 10.00 },
          { ticker: "ETI", open: 50.60, close: 55.65, changePercent: 9.98 },
          { ticker: "TRANSEXPR", open: 4.55, close: 5.00, changePercent: 9.89 },
          { ticker: "FTGINSURE", open: 1.12, close: 1.23, changePercent: 9.82 },
        ],
        topLosers: [
          { ticker: "AUSTINLAZ", open: 3.99, close: 3.60, changePercent: -9.77 },
          { ticker: "JOHNHOLT", open: 14.40, close: 13.00, changePercent: -9.72 },
          { ticker: "CWG", open: 22.85, close: 21.20, changePercent: -7.22 },
          { ticker: "CONOIL", open: 204.40, close: 190.50, changePercent: -6.80 },
          { ticker: "OMATEK", open: 2.19, close: 2.07, changePercent: -5.48 },
        ],
        narrative: {
          body: "The local bourse closed the day on a positive note, as the NGX All-Share Index (ASI) gained 1.66% to settle at 209,323.0 points, while YTD return came in at 34.52%. Sectoral performance closed largely positive, as most key indices recorded gains, reflecting sustained buying interest. The Oil and Gas sector led with a 4.23% gain, driven by a 10.00% rise in ARADEL. Then, followed by the Banking sector, which advanced strongly by 3.15% on the back of a 9.98% increase in ETI. The Consumer Goods sector also posted a 1.26% gain, supported by a 2.76% uptick in MCNICHOLS. Conversely, the Insurance sector declined by 1.33% due to 4.26% loss in CORNERST, while the Industrial Goods sector edged lower by 0.09%, weighed down by a 9.77% drop in AUSTINLAZ. Market breadth stood at 1.00x with 37 gainers and 37 losers. Market capitalization improved to ₦134.772 trillion from ₦132.492 trillion. Trading activity closed the day bullish, with turnover value increasing to ₦41.876 billion from ₦32.25 billion while volume traded increased to 706.392 million units from 569.309 million units.",
          outlook: "We are likely to see some earnings induced upward repricing with some profit-taking along the way.",
        },
      },
      globalMarkets: {
        isIntradayNote: true,
        indices: [
          { region: "U.S", index: "S&P 500", open: 6967.38, closeOrIntraday: 6999.35, changePercent: 0.46, isIntraday: true },
          { region: "U.S", index: "Dow Jones", open: 48535.99, closeOrIntraday: 48334.31, changePercent: -0.42, isIntraday: true },
          { region: "U.S", index: "Nasdaq Composite", open: 23639.08, closeOrIntraday: 23887.79, changePercent: 1.05, isIntraday: true },
          { region: "U.S", index: "Russell 2000", open: 2705.67, closeOrIntraday: 2706.95, changePercent: 0.05, isIntraday: true },
          { region: "EUROPE", index: "STOXX 600", open: 619.95, closeOrIntraday: 617.41, changePercent: -0.41 },
          { region: "EUROPE", index: "FTSE 100", open: 10609.06, closeOrIntraday: 10559.58, changePercent: -0.47 },
          { region: "EUROPE", index: "DAX", open: 24044.22, closeOrIntraday: 24075.16, changePercent: 0.13 },
          { region: "EUROPE", index: "CAC 40", open: 8327.86, closeOrIntraday: 8273.30, changePercent: -0.66 },
          { region: "ASIA", index: "Hang Seng", open: 25872.32, closeOrIntraday: 25947.32, changePercent: 0.29 },
          { region: "ASIA", index: "Shanghai", open: 4026.63, closeOrIntraday: 4027.21, changePercent: 0.01 },
          { region: "ASIA", index: "Nikkei", open: 57877.39, closeOrIntraday: 58134.24, changePercent: 0.44 },
        ],
        narrative: {
          body: "The U.S. market is trading largely bullish. The S&P 500 (+0.46%), Nasdaq (+1.05%), Russell (+0.05%), and Dow Jones (-0.42%) are up due to strong corporate earnings (especially banks and tech), optimism over potential easing geopolitical tensions, and continued momentum in growth stocks despite mixed macro signals. European markets closed the day largely bearish, as the STOXX 600 (-0.41%), FTSE 100 (-0.47%), DAX (+0.13%), and CAC 40 (-0.66%) closed lower due to weaker luxury earnings, falling tourism demand, and renewed inflationary pressure from energy prices amid Iran-related geopolitical tensions. Asian markets closed the day bullish, with the Hang Seng (+0.29%), Shanghai (+0.01%), and Nikkei (+0.44%) edged higher on improved risk sentiment driven by renewed US–Iran diplomatic optimism, easing oil prices, and broad-based gains across consumer, and technology stocks.",
          outlook: "Despite the improved sentiment around the US-Israel, Iran conflict, participants are likely to stay cautious as they monitor developments.",
        },
      },
    },
  
    // ── 16 April 2026 ──────────────────────────────────────────────────────────
    {
      title: TITLE,
      reportDate: "2026-04-16",
      displayDate: "Thursday, 16th April 2026",
      status: "published",
      pdfFileName: "DAILY_MARKET_REPORT_16TH_APRIL_2026.pdf",
      sources: SOURCES,
      disclaimer: DISCLAIMER,
      moneyMarket: {
        systemLiquiditySummary: "System liquidity opened with a surplus of ₦3.82 trillion.",
        rates: [
          { label: "Overnight Policy Rate (%)", today: 22.00, prev: 22.00, change: 0.00 },
          { label: "Overnight Rate (%)", today: 22.31, prev: 22.20, change: 0.11 },
        ],
        narrative: {
          body: "System liquidity opened with a surplus of ₦3.82 trillion. The Overnight (O/N) rate rose by 11bps to close at 22.31%, while Open Buy-Back (OBB) rate was unchanged, holding steady at 22.00%.",
          outlook: "We expect inter-bank rates to be range-bound in the near term.",
        },
      },
      treasuryBills: {
        averageBenchmarkRate: 15.98,
        benchmarkRates: [
          { maturityDate: "4-Jun-26", dtm: 49, discRateToday: 15.72, discRatePrev: 16.01, changeInDiscRate: -0.29 },
          { maturityDate: "4-Feb-27", dtm: 294, discRateToday: 16.11, discRatePrev: 16.11, changeInDiscRate: 0.00 },
          { maturityDate: "8-Apr-27", dtm: 357, discRateToday: 15.90, discRatePrev: 15.86, changeInDiscRate: 0.04 },
        ],
        narrative: {
          body: "The T-bills market traded on a quiet note with a mildly bullish undertone. The 4-Jun-2026 bill led gains, declining sharply by 29bps to 15.72%. The average benchmark rate declined by 1bp, closing at 15.98%.",
          outlook: "We expect the market to remain cautious near term following the CPI print.",
        },
      },
      fgnBonds: {
        averageBenchmarkYield: 15.85,
        bonds: [
          { maturityDate: "20-Mar-27", coupon: 16.29, ttm: 0.93, yieldToday: 17.90, yieldPrev: 17.87, changeInYield: 0.03 },
          { maturityDate: "17-Apr-29", coupon: 14.55, ttm: 3.01, yieldToday: 16.06, yieldPrev: 16.06, changeInYield: 0.00 },
          { maturityDate: "21-Feb-31", coupon: 18.50, ttm: 4.85, yieldToday: 16.36, yieldPrev: 16.37, changeInYield: 0.00 },
          { maturityDate: "25-Jun-32", coupon: 12.50, ttm: 6.20, yieldToday: 16.49, yieldPrev: 16.37, changeInYield: 0.13 },
          { maturityDate: "15-May-33", coupon: 12.50, ttm: 7.08, yieldToday: 16.37, yieldPrev: 16.31, changeInYield: 0.06 },
          { maturityDate: "21-Feb-34", coupon: 19.00, ttm: 7.86, yieldToday: 16.28, yieldPrev: 16.40, changeInYield: -0.12 },
          { maturityDate: "29-Jan-35", coupon: 12.50, ttm: 8.79, yieldToday: 16.28, yieldPrev: 16.20, changeInYield: 0.08 },
          { maturityDate: "21-Jun-38", coupon: 15.45, ttm: 12.19, yieldToday: 15.24, yieldPrev: 15.24, changeInYield: 0.00 },
          { maturityDate: "26-Apr-49", coupon: 14.80, ttm: 23.04, yieldToday: 14.46, yieldPrev: 14.46, changeInYield: 0.00 },
          { maturityDate: "27-Mar-50", coupon: 12.98, ttm: 23.96, yieldToday: 14.39, yieldPrev: 14.39, changeInYield: 0.00 },
          { maturityDate: "21-Jun-53", coupon: 15.70, ttm: 27.20, yieldToday: 14.48, yieldPrev: 14.48, changeInYield: 0.00 },
        ],
        narrative: {
          body: "The FGN bond market traded on a quiet note today, with mixed but largely muted price action across the curve. The 25-Jun-2032 and 29-Jan-2035 bonds edged higher by 13bps and 8bps respectively, while the 21-Feb-2034 bond bucked the trend, easing by 12bps to 16.28%. The average benchmark yield closed flat at 15.85%.",
          outlook: "We expect the inflation print to influence market sentiment near term.",
        },
      },
      ssaEurobonds: {
        bonds: [
          { sovereign: NGA, maturityDate: "28-Nov-27", coupon: 7.63, ttm: 1.62, yieldToday: 5.93, yieldPrev: 5.86, changeInYield: 0.07 },
          { sovereign: NGA, maturityDate: "16-Feb-32", coupon: 6.50, ttm: 5.84, yieldToday: 6.93, yieldPrev: 6.90, changeInYield: 0.03 },
          { sovereign: NGA, maturityDate: "28-Nov-47", coupon: 7.88, ttm: 21.63, yieldToday: 8.05, yieldPrev: 8.02, changeInYield: 0.03 },
          { sovereign: NGA, maturityDate: "21-Jan-49", coupon: 9.25, ttm: 22.78, yieldToday: 8.12, yieldPrev: 8.15, changeInYield: -0.03 },
          { sovereign: ANG, maturityDate: "09-May-28", coupon: 9.50, ttm: 2.07, yieldToday: 7.25, yieldPrev: 7.16, changeInYield: 0.09 },
          { sovereign: ANG, maturityDate: "26-Nov-29", coupon: 8.00, ttm: 3.62, yieldToday: 7.79, yieldPrev: 7.71, changeInYield: 0.08 },
          { sovereign: ANG, maturityDate: "14-Apr-32", coupon: 8.75, ttm: 6.00, yieldToday: 8.64, yieldPrev: 8.59, changeInYield: 0.05 },
          { sovereign: ANG, maturityDate: "26-Nov-49", coupon: 9.13, ttm: 23.63, yieldToday: 10.11, yieldPrev: 10.05, changeInYield: 0.06 },
          { sovereign: EGY, maturityDate: "31-Jan-27", coupon: 3.88, ttm: 0.79, yieldToday: 5.82, yieldPrev: 5.67, changeInYield: 0.15 },
          { sovereign: EGY, maturityDate: "15-Jan-32", coupon: 7.05, ttm: 5.75, yieldToday: 7.26, yieldPrev: 7.20, changeInYield: 0.06 },
          { sovereign: EGY, maturityDate: "20-Nov-59", coupon: 8.15, ttm: 33.62, yieldToday: 9.23, yieldPrev: 9.18, changeInYield: 0.05 },
        ],
        narrative: {
          body: "The SSA Eurobond space recorded a bearish session, as profit-taking drove a broad-based rise in sovereign yields, despite a softening in global risk. Nigeria's yields rose by 3bps to 7.26%, Angola rose by 7bps to 8.45%, while Egypt rose by 9bps to 7.43%.",
          outlook: "As geopolitical tensions gradually subside, we expect investors to maintain active positioning across the sub-Saharan curve.",
        },
      },
      localEquities: {
        asiLevel: 211900.6,
        asiChangePercent: 1.23,
        ytdReturn: 36.17,
        marketCap: "₦136.435 trillion",
        turnoverValue: "₦34.758 billion",
        volumeTraded: "584.961 million units",
        marketBreadthRatio: 2.20,
        gainers: 44,
        losers: 20,
        topGainers: [
          { ticker: "TRANSEXPR", open: 5.00, close: 5.50, changePercent: 10.00 },
          { ticker: "GUINEAINS", open: 1.10, close: 1.21, changePercent: 10.00 },
          { ticker: "ARADEL", open: 1406.90, close: 1547.50, changePercent: 9.99 },
          { ticker: "ETI", open: 55.65, close: 61.20, changePercent: 9.97 },
          { ticker: "DAARCOMM", open: 1.51, close: 1.66, changePercent: 9.93 },
        ],
        topLosers: [
          { ticker: "IKEJAHOTEL", open: 37.00, close: 33.40, changePercent: -9.73 },
          { ticker: "WAPIC", open: 2.85, close: 2.60, changePercent: -8.77 },
          { ticker: "CAP", open: 103.95, close: 95.00, changePercent: -8.61 },
          { ticker: "INTENEGINS", open: 3.30, close: 3.03, changePercent: -8.18 },
          { ticker: "MCNICHOLS", open: 6.70, close: 6.31, changePercent: -5.82 },
        ],
        narrative: {
          body: "The local bourse closed the day on a positive note, as the NGX All-Share Index (ASI) gained 1.23% to settle at 211,900.6 points, while YTD return came in at 36.17%. Sectoral performance closed largely positive, as most key indices recorded gains, reflecting sustained buying interest. The Oil and Gas sector led with a 4.67% gain, driven by a 9.99% rise in ARADEL. Then, followed by the Banking sector, which advanced strongly by 2.49% on the back of a 9.97% increase in ETI. The Consumer Goods sector also posted a 1.65% gain, supported by a 9.38% uptick in DANGSUGAR. Conversely, the Insurance sector declined by 0.74% due to 8.18% loss in INTENEGINS, while the Industrial Goods sector edged lower by 0.03%, weighed down by a 8.61% drop in CAP. Market breadth stood at 2.20x with 44 gainers and 20 losers. Market capitalization improved to ₦136.435 trillion from ₦134.772 trillion. Trading activity closed the day bearish, with turnover value declining to ₦34.758 billion from ₦41.876 billion while volume traded decreased to 584.961 million units from 706.392 million units.",
          outlook: "We are likely to see some earnings induced upward repricing with some profit-taking along the way.",
        },
      },
      globalMarkets: {
        isIntradayNote: true,
        indices: [
          { region: "U.S", index: "S&P 500", open: 7022.95, closeOrIntraday: 7042.56, changePercent: 0.28, isIntraday: true },
          { region: "U.S", index: "Dow Jones", open: 48463.72, closeOrIntraday: 48502.37, changePercent: 0.08, isIntraday: true },
          { region: "U.S", index: "Nasdaq Composite", open: 24016.02, closeOrIntraday: 24102.97, changePercent: 0.36, isIntraday: true },
          { region: "U.S", index: "Russell 2000", open: 2713.66, closeOrIntraday: 2718.95, changePercent: 0.19, isIntraday: true },
          { region: "EUROPE", index: "STOXX 600", open: 617.27, closeOrIntraday: 616.95, changePercent: -0.05 },
          { region: "EUROPE", index: "FTSE 100", open: 10559.58, closeOrIntraday: 10589.99, changePercent: 0.29 },
          { region: "EUROPE", index: "DAX", open: 24066.70, closeOrIntraday: 24165.75, changePercent: 0.41 },
          { region: "EUROPE", index: "CAC 40", open: 8274.57, closeOrIntraday: 8282.79, changePercent: 0.10 },
          { region: "ASIA", index: "Hang Seng", open: 25947.32, closeOrIntraday: 26394.26, changePercent: 1.72 },
          { region: "ASIA", index: "Shanghai", open: 4027.21, closeOrIntraday: 4055.55, changePercent: 0.70 },
          { region: "ASIA", index: "Nikkei", open: 58134.24, closeOrIntraday: 59518.34, changePercent: 2.38 },
        ],
        narrative: {
          body: "The U.S. market is trading bullish. The S&P 500 (+0.28%), Nasdaq (+0.08%), Russell (+0.36%), and Dow Jones (+0.19%) are up on optimism over easing Middle East tensions and strong corporate earnings supporting investor confidence. European markets closed mixed, as the STOXX (-0.05%) dipped as cautious sentiment persisted, while the FTSE (+0.29%), DAX (+0.41%), and CAC (+0.10%) edged higher on cautious optimism over a potential U.S.–Iran ceasefire extension and progress toward a broader Middle East peace deal, supported by corporate earnings. Asian markets closed the day bullish, with the Hang Seng (+1.72%), Shanghai (+0.07%), and Nikkei (+2.38%) on improved risk sentiment driven by renewed US–Iran diplomatic optimism, easing oil prices, and broad-based gains across consumer, and technology stocks.",
          outlook: "Despite the improved sentiment around the US-Israel, Iran conflict, participants are likely to stay cautious as they monitor developments.",
        },
      },
    },
  
    // ── 17 April 2026 (Weekly) ─────────────────────────────────────────────────
    {
      title: TITLE,
      reportDate: "2026-04-17",
      displayDate: "Friday, 17th April 2026",
      status: "published",
      pdfFileName: "DAILY_MARKET_REPORT_17TH_APRIL_2026.pdf",
      sources: SOURCES,
      disclaimer: DISCLAIMER,
      moneyMarket: {
        systemLiquiditySummary: "System liquidity declined by 42% to close the week with a surplus of ₦3.84 trillion following the net OMO issuance within the week.",
        rates: [
          { label: "Overnight Policy Rate (%)", today: 22.00, prev: 22.00, change: 0.00 },
          { label: "Overnight Rate (%)", today: 22.16, prev: 22.35, change: -0.19 },
        ],
        narrative: {
          body: "System liquidity declined by 42% to close the week with a surplus of ₦3.84 trillion following the net OMO issuance within the week. The Overnight (O/N) rate declined by 19bps to close the week at 22.16%, while Open Buy-Back (OBB) rate was unchanged, holding steady at 22.00%.",
          outlook: "We expect inter-bank rates to be range-bound in the near term.",
        },
      },
      treasuryBills: {
        averageBenchmarkRate: 15.97,
        benchmarkRates: [
          { maturityDate: "7-May-26", dtm: 20, discRateToday: 16.33, discRatePrev: 15.75, changeInDiscRate: 0.58 },
          { maturityDate: "3-Sep-26", dtm: 139, discRateToday: 15.95, discRatePrev: 16.13, changeInDiscRate: -0.18 },
          { maturityDate: "8-Apr-27", dtm: 356, discRateToday: 15.70, discRatePrev: 15.84, changeInDiscRate: -0.14 },
        ],
        narrative: {
          body: "The T-bills market ended the week on a quiet note with a mildly bullish undertone. The 4-Jun-2026 bill led gains, declining sharply by 18bps to 16.11%. The average benchmark rate closed flat at 15.97%.",
          outlook: "We expect elevated system liquidity to influence the market near term.",
        },
      },
      fgnBonds: {
        averageBenchmarkYield: 15.85,
        bonds: [
          { maturityDate: "20-Mar-27", coupon: 16.29, ttm: 0.92, yieldToday: 17.67, yieldPrev: 17.91, changeInYield: -0.24 },
          { maturityDate: "17-Apr-29", coupon: 14.55, ttm: 3.00, yieldToday: 16.06, yieldPrev: 16.07, changeInYield: -0.01 },
          { maturityDate: "21-Feb-31", coupon: 18.50, ttm: 4.85, yieldToday: 16.36, yieldPrev: 16.37, changeInYield: -0.01 },
          { maturityDate: "25-Jun-32", coupon: 12.50, ttm: 6.19, yieldToday: 16.49, yieldPrev: 16.45, changeInYield: 0.05 },
          { maturityDate: "15-May-33", coupon: 12.50, ttm: 7.08, yieldToday: 16.37, yieldPrev: 16.38, changeInYield: -0.01 },
          { maturityDate: "21-Feb-34", coupon: 19.00, ttm: 7.85, yieldToday: 16.28, yieldPrev: 16.21, changeInYield: 0.07 },
          { maturityDate: "29-Jan-35", coupon: 12.50, ttm: 8.79, yieldToday: 16.28, yieldPrev: 16.20, changeInYield: 0.08 },
          { maturityDate: "21-Jun-38", coupon: 15.45, ttm: 12.19, yieldToday: 15.24, yieldPrev: 15.24, changeInYield: 0.00 },
          { maturityDate: "26-Apr-49", coupon: 14.80, ttm: 23.04, yieldToday: 14.46, yieldPrev: 14.46, changeInYield: 0.00 },
          { maturityDate: "27-Mar-50", coupon: 12.98, ttm: 23.96, yieldToday: 14.39, yieldPrev: 14.39, changeInYield: 0.00 },
          { maturityDate: "21-Jun-53", coupon: 15.70, ttm: 27.20, yieldToday: 14.48, yieldPrev: 14.48, changeInYield: 0.00 },
        ],
        narrative: {
          body: "The FGN bond market ended the week on a mixed tone influenced by the CPI print. The short end saw demand, with the 20-Mar-2027 bond declining by 24bps to 17.67%, while slight upticks were recorded on some mid-tenors. Overall, the average benchmark yield fell by 5bps to 15.85%.",
          outlook: "We expect the inflation print to influence market sentiment near term.",
        },
      },
      ssaEurobonds: {
        bonds: [
          { sovereign: NGA, maturityDate: "28-Nov-27", coupon: 7.63, ttm: 1.62, yieldToday: 5.87, yieldPrev: 6.02, changeInYield: -0.15 },
          { sovereign: NGA, maturityDate: "16-Feb-32", coupon: 6.50, ttm: 5.84, yieldToday: 6.93, yieldPrev: 7.10, changeInYield: -0.17 },
          { sovereign: NGA, maturityDate: "28-Nov-47", coupon: 7.88, ttm: 21.63, yieldToday: 7.93, yieldPrev: 8.10, changeInYield: -0.17 },
          { sovereign: NGA, maturityDate: "21-Jan-49", coupon: 9.25, ttm: 22.78, yieldToday: 8.14, yieldPrev: 8.21, changeInYield: -0.07 },
          { sovereign: ANG, maturityDate: "09-May-28", coupon: 9.50, ttm: 2.06, yieldToday: 7.05, yieldPrev: 7.39, changeInYield: -0.34 },
          { sovereign: ANG, maturityDate: "26-Nov-29", coupon: 8.00, ttm: 3.61, yieldToday: 7.67, yieldPrev: 7.94, changeInYield: -0.27 },
          { sovereign: ANG, maturityDate: "14-Apr-32", coupon: 8.75, ttm: 6.00, yieldToday: 8.47, yieldPrev: 8.82, changeInYield: -0.36 },
          { sovereign: ANG, maturityDate: "26-Nov-49", coupon: 9.13, ttm: 23.63, yieldToday: 9.96, yieldPrev: 10.16, changeInYield: -0.20 },
          { sovereign: EGY, maturityDate: "31-Jan-27", coupon: 3.88, ttm: 0.79, yieldToday: 5.73, yieldPrev: 5.61, changeInYield: 0.11 },
          { sovereign: EGY, maturityDate: "15-Jan-32", coupon: 7.05, ttm: 5.75, yieldToday: 7.18, yieldPrev: 7.37, changeInYield: -0.19 },
          { sovereign: EGY, maturityDate: "20-Nov-59", coupon: 8.15, ttm: 33.62, yieldToday: 9.13, yieldPrev: 9.32, changeInYield: -0.19 },
        ],
        narrative: {
          body: "The SSA Eurobond market traded the week on a bullish note, with yields declining across key sovereigns. The rally was supported by improved risk sentiment following developments in the US–Iran conflict, as Iran confirmed the Strait of Hormuz remains open during the ongoing ceasefire, easing concerns around global oil supply disruptions. Nigeria's yields declined by 14bps to 7.22%, Angola declined by 29bps to 8.29%, while Egypt declined by 9bps to 7.35%.",
          outlook: "As geopolitical tensions gradually subside, we expect investors to maintain active positioning across the sub-Saharan curve.",
        },
      },
      localEquities: {
        asiLevel: 217167.57,
        asiChangePercent: 7.15,
        ytdReturn: 39.56,
        marketCap: "₦139.826 trillion",
        turnoverValue: "₦54.353 billion",
        volumeTraded: "1,258 million units",
        marketBreadthRatio: 1.59,
        gainers: 43,
        losers: 27,
        topGainers: [
          { ticker: "TRANSEXPR", open: 3.77, close: 6.05, changePercent: 60.48 },
          { ticker: "ETI", open: 46.00, close: 67.30, changePercent: 46.30 },
          { ticker: "STANBIC", open: 138.00, close: 188.55, changePercent: 36.63 },
          { ticker: "ROYALEX", open: 1.43, close: 1.85, changePercent: 29.37 },
          { ticker: "ARADEL", open: 1279.00, close: 1649.00, changePercent: 28.93 },
        ],
        topLosers: [
          { ticker: "IKEJAHOTEL", open: 39.00, close: 33.40, changePercent: -14.36 },
          { ticker: "INTENEGINS", open: 3.55, close: 3.06, changePercent: -13.80 },
          { ticker: "ACADEMY", open: 8.75, close: 7.65, changePercent: -12.57 },
          { ticker: "BERGER", open: 75.90, close: 68.35, changePercent: -9.95 },
          { ticker: "NGXGROUP", open: 188.00, close: 170.00, changePercent: -9.57 },
        ],
        narrative: {
          body: "The local bourse closed the week on a positive note, as the NGX All-Share Index (ASI) gained 7.15% to settle at 217,167.57 points, while YTD return came in at 39.56%. Sectoral performance closed the week largely positive, as most key indices recorded gains, reflecting sustained buying interest. The Oil and Gas sector led with a 17.58% gain, driven by a 26.97% rise in ARADEL over the week. Then, followed by the Banking sector, which advanced strongly by 12.55% on the back of a 46.3% increase in ETI. The Consumer Goods sector also posted a 1.65% gain, supported by a 20.14% uptick in UNIONDICONS. Conversely, the Insurance sector declined by 2.64% due to 13.8% loss in INTENEGINS, while the Industrial Goods sector edged lower by 0.03%, weighed down by a 10.00% drop in BERGER. Market breadth stood at 1.59x with 43 gainers and 27 losers. Market capitalization improved to ₦139.826 trillion from ₦131.166 trillion. Trading activity closed the week bullish, with turnover value increased to ₦54.353 billion from ₦31.46 billion while volume traded surged to 1,258 million units from 548.601 million units.",
          outlook: "We are likely to see some earnings induced upward repricing with some profit-taking along the way.",
        },
      },
      globalMarkets: {
        isIntradayNote: true,
        indices: [
          { region: "U.S", index: "S&P 500", open: 6816.89, closeOrIntraday: 7129.61, changePercent: 4.59, isIntraday: true },
          { region: "U.S", index: "Dow Jones", open: 47916.57, closeOrIntraday: 49548.39, changePercent: 3.41, isIntraday: true },
          { region: "U.S", index: "Nasdaq Composite", open: 25116.34, closeOrIntraday: 26661.94, changePercent: 6.15, isIntraday: true },
          { region: "U.S", index: "Russell 2000", open: 2630.59, closeOrIntraday: 2780.59, changePercent: 5.70, isIntraday: true },
          { region: "EUROPE", index: "STOXX 600", open: 614.84, closeOrIntraday: 626.00, changePercent: 1.82 },
          { region: "EUROPE", index: "FTSE 100", open: 10600.53, closeOrIntraday: 10666.97, changePercent: 0.63 },
          { region: "EUROPE", index: "DAX", open: 23803.95, closeOrIntraday: 24726.75, changePercent: 3.88 },
          { region: "EUROPE", index: "CAC 40", open: 8259.60, closeOrIntraday: 8425.13, changePercent: 2.00 },
          { region: "ASIA", index: "Shanghai", open: 3986.22, closeOrIntraday: 4051.43, changePercent: 1.64 },
          { region: "ASIA", index: "Nikkei", open: 56924.11, closeOrIntraday: 58475.90, changePercent: 2.73 },
          { region: "ASIA", index: "Hang Seng", open: 25893.54, closeOrIntraday: 26160.33, changePercent: 1.03 },
        ],
        narrative: {
          body: "The U.S. market is trading on a bullish momentum week on week. The S&P 500 (+4.59%), Nasdaq (+6.15%), Dow Jones (+3.41%), and Russell (+5.70) on optimism over easing Middle East tensions after Iran reopened the Strait of Hormuz, which drove oil prices lower and boosted investor confidence. European markets closed the week in the green, as the STOXX 600 (+1.82%), FTSE 100 (+0.63%), DAX (+3.88%), and CAC 40 (+2.00%) mainly due to falling oil prices after easing Middle East tensions, which improved inflation outlook and boosted travel, banking, and consumer stocks. Asian markets closed the week bullish, with the Shanghai (+1.64%), Hang Seng (+1.03%), and Nikkei (+2.73%) supported by cautious optimism over easing Middle East tensions and expectations of stable monetary policy in China.",
          outlook: "We are likely to see positive repricing in the wake of the reopening of the strait of Hormuz.",
        },
      },
    },
  ];