import type { MarketReportSeedData } from "./marketReportSeedTypes";

/**
 * Extra reports from repo `seeddata3.ts` (May 8 weekly, 11, 12, 13).
 * Canonical MarketReportSeedData shape; first 11 dates in that file are duplicates of the main seed bundle.
 */
const DISCLAIMER = `This report is intended solely for informational purposes and should not be interpreted as investment advice or a recommendation to engage in any financial transactions. Aztran Investments accepts no liability for any decisions made or losses incurred based on its use. Always seek independent professional advice before making financial decisions.

This message and any accompanying documents may contain confidential or privileged information and are intended only for the named recipient. If you are not the intended recipient, please notify the sender immediately, delete this message from your system, and refrain from disclosing, copying, or using any part of it. Electronic communications are not guaranteed to be secure or virus-free; Aztran Investments is not liable for any damage arising from unauthorized access, interception, or the presence of malware.

Opinions expressed that do not relate to the official business of Aztran Investments are those of the author and do not necessarily reflect the views of the firm.`;

const SOURCES = "NGX, FMDQ, CBN, Investing.com, Aztran Research";
const TITLE = "Daily Financial Markets Update";
const NGA = "Republic Of Nigeria";
const ANG = "Republic Of Angola";
const EGY = "Arab Republic Of Egypt";

export const marketReportsSeedDataPack3Extra: MarketReportSeedData[] = [
    // ── 8 May 2026 (Weekly) ────────────────────────────────────────────────────
    // NOTE: New FGN bond benchmark curve from this report onward:
    //   27-Aug-30 replaces 21-Feb-31 | 21-Jan-42 replaces 21-Jun-38
    // T-bill benchmarks also revised.
    {
      title: TITLE,
      reportDate: "2026-05-08",
      displayDate: "Friday, 8th May 2026",
      status: "published",
      pdfFileName: "DAILY_MARKET_REPORT_8th_May_2026.pdf",
      sources: SOURCES,
      disclaimer: DISCLAIMER,
      moneyMarket: {
        systemLiquiditySummary: "System liquidity rose by 14% to close the week with a surplus of ₦5.67 trillion.",
        rates: [
          { label: "Overnight Policy Rate (%)", today: 22.00, prev: 22.00, change: 0.00 },
          { label: "Overnight Rate (%)", today: 22.19, prev: 22.30, change: -0.11 },
        ],
        narrative: {
          body: "System liquidity rose by 14% to close the week with a surplus of ₦5.67 trillion. The Overnight (O/N) rate declined by 11bps to close the week at 22.19%, while Open Buy-Back (OBB) rate was unchanged, holding steady at 22.00%.",
          outlook: "We expect inter-bank rates to be range-bound in the near term.",
        },
      },
      treasuryBills: {
        averageBenchmarkRate: 16.04,
        benchmarkRates: [
          { maturityDate: "11-Jun-26", dtm: 34, discRateToday: 16.25, discRatePrev: 15.55, changeInDiscRate: 0.70 },
          { maturityDate: "11-Mar-27", dtm: 307, discRateToday: 16.10, discRatePrev: 16.23, changeInDiscRate: -0.13 },
          { maturityDate: "22-Apr-27", dtm: 349, discRateToday: 16.00, discRatePrev: 15.95, changeInDiscRate: 0.05 },
        ],
        narrative: {
          body: "The T-bills market ended the week on a bearish note, with mixed price action across the curve. The 11-Jun-2026 bill led the move, rising sharply by 70bps to 16.25%, while the 22-Apr-2027 bill edged higher by 5bps to 16.00%. The 11-Mar-2027 bill bucked the trend, easing by 13bps to 16.10%. The average benchmark rate rose by 2bps, closing at 16.04%.",
          outlook: "We expect activity to remain light as market participants maintain a cautious stance in the near term.",
        },
      },
      fgnBonds: {
        averageBenchmarkYield: 16.10,
        bonds: [
          { maturityDate: "20-Mar-27", coupon: 16.29, ttm: 0.87, yieldToday: 18.02, yieldPrev: 17.91, changeInYield: 0.11 },
          { maturityDate: "17-Apr-29", coupon: 14.55, ttm: 2.95, yieldToday: 16.36, yieldPrev: 16.50, changeInYield: -0.14 },
          { maturityDate: "27-Aug-30", coupon: 18.50, ttm: 4.31, yieldToday: 16.55, yieldPrev: 16.41, changeInYield: 0.14 },
          { maturityDate: "25-Jun-32", coupon: 12.50, ttm: 6.14, yieldToday: 16.82, yieldPrev: 16.85, changeInYield: -0.03 },
          { maturityDate: "15-May-33", coupon: 12.50, ttm: 7.02, yieldToday: 16.85, yieldPrev: 16.81, changeInYield: 0.04 },
          { maturityDate: "21-Feb-34", coupon: 19.00, ttm: 7.80, yieldToday: 16.73, yieldPrev: 16.74, changeInYield: 0.00 },
          { maturityDate: "29-Jan-35", coupon: 12.50, ttm: 8.73, yieldToday: 16.70, yieldPrev: 16.79, changeInYield: -0.09 },
          { maturityDate: "21-Jan-42", coupon: 15.45, ttm: 15.72, yieldToday: 14.07, yieldPrev: 14.07, changeInYield: 0.00 },
          { maturityDate: "26-Apr-49", coupon: 14.80, ttm: 22.98, yieldToday: 14.49, yieldPrev: 14.49, changeInYield: 0.00 },
          { maturityDate: "27-Mar-50", coupon: 12.98, ttm: 23.90, yieldToday: 14.54, yieldPrev: 14.54, changeInYield: 0.00 },
          { maturityDate: "21-Jun-53", coupon: 15.70, ttm: 27.14, yieldToday: 14.73, yieldPrev: 14.73, changeInYield: 0.00 },
        ],
        narrative: {
          body: "The FGN bond market ended the week on a mixed note, with a bearish undertone. The 27-Aug-2030 and 20-Mar-2027 bonds led the selloff, rising by 14bps and 11bps to 16.55% and 16.02% respectively, while the 17-Apr-2029 and 29-Jan-2035 bonds eased by 14bps and 9bps. The average benchmark yield rose by 1bp, closing at 16.10%.",
          outlook: "We expect sentiment to remain cautious, as fiscal concerns drive near term market sentiment.",
        },
      },
      ssaEurobonds: {
        bonds: [
          { sovereign: NGA, maturityDate: "28-Nov-27", coupon: 7.63, ttm: 1.56, yieldToday: 5.69, yieldPrev: 5.60, changeInYield: 0.09 },
          { sovereign: NGA, maturityDate: "16-Feb-32", coupon: 6.50, ttm: 5.78, yieldToday: 6.54, yieldPrev: 6.46, changeInYield: 0.09 },
          { sovereign: NGA, maturityDate: "28-Nov-47", coupon: 7.88, ttm: 21.57, yieldToday: 7.72, yieldPrev: 7.69, changeInYield: 0.03 },
          { sovereign: NGA, maturityDate: "21-Jan-49", coupon: 9.25, ttm: 22.72, yieldToday: 7.97, yieldPrev: 7.91, changeInYield: 0.06 },
          { sovereign: ANG, maturityDate: "09-May-28", coupon: 9.50, ttm: 2.01, yieldToday: 6.85, yieldPrev: 6.67, changeInYield: 0.19 },
          { sovereign: ANG, maturityDate: "26-Nov-29", coupon: 8.00, ttm: 3.56, yieldToday: 7.27, yieldPrev: 7.17, changeInYield: 0.10 },
          { sovereign: ANG, maturityDate: "14-Apr-32", coupon: 8.75, ttm: 5.94, yieldToday: 7.94, yieldPrev: 7.73, changeInYield: 0.22 },
          { sovereign: ANG, maturityDate: "26-Nov-49", coupon: 9.13, ttm: 23.57, yieldToday: 9.53, yieldPrev: 9.51, changeInYield: 0.02 },
          { sovereign: EGY, maturityDate: "31-Jan-27", coupon: 3.88, ttm: 0.73, yieldToday: 5.24, yieldPrev: 5.64, changeInYield: -0.40 },
          { sovereign: EGY, maturityDate: "15-Jan-32", coupon: 7.05, ttm: 5.69, yieldToday: 6.83, yieldPrev: 7.32, changeInYield: -0.49 },
          { sovereign: EGY, maturityDate: "20-Nov-59", coupon: 8.15, ttm: 33.56, yieldToday: 9.11, yieldPrev: 9.41, changeInYield: -0.31 },
        ],
        narrative: {
          body: "The SSA Eurobond market traded on a bearish note, as fighting flared in the Gulf and the UAE countered an Iranian air attack, dampening risk sentiment. Markets await Iran's response to the U.S. peace proposal, with any progress likely to support risk assets. Nigeria and Angola yields widened by 7bps and 13bps to 6.98% and 7.90% respectively, while Egypt eased sharply by 40bps to 7.06%.",
          outlook: "Sentiment is expected to remain cautious, with sovereign curves staying sensitive to the outcome of U.S.-Iran negotiations and any further escalation in the Gulf.",
        },
      },
      localEquities: {
        asiLevel: 242163.9,
        asiChangePercent: 1.08,
        ytdReturn: 57.30,
        marketCap: "₦155.994 trillion",
        turnoverValue: "₦104.29 billion",
        volumeTraded: "1,871.37 million units",
        marketBreadthRatio: 1.15,
        gainers: 46,
        losers: 40,
        topGainers: [
          { ticker: "CAP", open: 145.20, close: 233.70, changePercent: 60.95 },
          { ticker: "ZICHIS", open: 21.78, close: 33.36, changePercent: 53.17 },
          { ticker: "FTNCOCOA", open: 5.50, close: 8.30, changePercent: 50.91 },
          { ticker: "RTBRISCOE", open: 10.64, close: 15.00, changePercent: 40.98 },
          { ticker: "DANGSUGAR", open: 69.70, close: 93.00, changePercent: 33.43 },
        ],
        topLosers: [
          { ticker: "TRANSEXPR", open: 7.90, close: 5.76, changePercent: -27.09 },
          { ticker: "UBA", open: 55.00, close: 42.75, changePercent: -22.27 },
          { ticker: "ROYALEX", open: 1.70, close: 1.36, changePercent: -20.00 },
          { ticker: "MORISON", open: 11.79, close: 9.56, changePercent: -18.91 },
          { ticker: "HMCALL", open: 3.97, close: 3.24, changePercent: -18.39 },
        ],
        narrative: {
          body: "The local bourse closed the week on a positive note, as the NGX All-Share Index (ASI) advanced by 1.08% week-on-week to close at 242,163.9 points, pushing the year-to-date return to 57.30%. Sectoral performance closed the week on a mixed note but largely bullish, reflecting cautious yet sustained buying interest across the market. The Banking sector recorded a modest gain of 1.89%, driven primarily by a 9.32% appreciation in ETI over the week. Followed by the Insurance sector, which advanced by 4.00%, supported by a 20.67% increase in SOVRENINS. Similarly, the Consumer Goods sector also posted a positive performance, gaining 1.81%, largely buoyed by a 33.43% surge in DANGSUGAR. And the Industrial Goods sector emerged as one of the strongest performers, climbing 5.11%, underpinned by a remarkable 60.95% rally in CAP. On the downside, the Oil and Gas sector was the only laggard, declining by 3.27% as investors reacted to profit-taking activities, with ARADEL shedding 7.38% during the period. Market breadth stood at 1.15x with 46 gainers and 40 losers. Market capitalization improved slightly to ₦155.994 trillion from ₦145.334 trillion. Trading activity closed the week bullish, with turnover value increased to ₦104.29 billion from ₦44.51 billion while volume traded increased to 1,871.37 million units from 627.62 million units.",
          outlook: "We would continue to see earnings induced upward repricing with some profit-taking along the way.",
        },
      },
      globalMarkets: {
        isIntradayNote: true,
        indices: [
          { region: "U.S", index: "S&P 500", open: 7209.01, closeOrIntraday: 7388.85, changePercent: 2.49, isIntraday: true },
          { region: "U.S", index: "Dow Jones", open: 49652.14, closeOrIntraday: 49666.60, changePercent: 0.03, isIntraday: true },
          { region: "U.S", index: "Nasdaq Composite", open: 24892.31, closeOrIntraday: 26153.12, changePercent: 5.07, isIntraday: true },
          { region: "U.S", index: "Russell 2000", open: 2799.90, closeOrIntraday: 2853.46, changePercent: 1.91, isIntraday: true },
          { region: "EUROPE", index: "STOXX 600", open: 611.28, closeOrIntraday: 611.54, changePercent: 0.04 },
          { region: "EUROPE", index: "FTSE 100", open: 10378.82, closeOrIntraday: 10235.97, changePercent: -1.38 },
          { region: "EUROPE", index: "DAX", open: 24292.38, closeOrIntraday: 24362.96, changePercent: 0.29 },
          { region: "EUROPE", index: "CAC 40", open: 8114.84, closeOrIntraday: 8100.70, changePercent: -0.17 },
          { region: "ASIA", index: "Shanghai", open: 4112.16, closeOrIntraday: 4179.95, changePercent: 1.65 },
          { region: "ASIA", index: "Nikkei", open: 59284.92, closeOrIntraday: 62713.65, changePercent: 5.78 },
          { region: "ASIA", index: "Hang Seng", open: 25776.53, closeOrIntraday: 26393.71, changePercent: 2.39 },
        ],
        narrative: {
          body: "U.S. market is trading bullish, S&P 500 (+2.49%), and Nasdaq (+5.07%), Dow Jones (+0.03%), and Russell (+1.91%) as tech gains and cooling rate fears outweighed weak consumer data. European markets closed mixed. CAC (-0.17%), STOXX (+0.04%), DAX (+0.29%) and FTSE (-1.38%) driven by cautious investor sentiment, geopolitical risks, and diverging corporate earnings results. Asian markets closed bullish, Shanghai (+1.65%), Hang Seng (+2.39%), and Nikkei (+5.78%) supported by growing optimism about de-escalation in the Middle East and strong gains in technology stocks.",
          outlook: "Investors are likely to remain cautious as they monitor developments on U.S.–Iran ceasefire negotiations.",
        },
      },
    },
  
    // ── 11 May 2026 ────────────────────────────────────────────────────────────
    {
      title: TITLE,
      reportDate: "2026-05-11",
      displayDate: "Monday, 11th May 2026",
      status: "published",
      pdfFileName: "DAILY_MARKET_REPORT_11th_May_2026.pdf",
      sources: SOURCES,
      disclaimer: DISCLAIMER,
      moneyMarket: {
        systemLiquiditySummary: "System liquidity opened the week with a surplus of ₦4.92 trillion.",
        rates: [
          { label: "Overnight Policy Rate (%)", today: 22.00, prev: 22.00, change: 0.00 },
          { label: "Overnight Rate (%)", today: 22.21, prev: 22.19, change: 0.02 },
        ],
        narrative: {
          body: "System liquidity opened the week with a surplus of ₦4.92 trillion. The Overnight (O/N) rate rose by 2bps to open the week at 22.21%, while Open Buy-Back (OBB) rate was unchanged, holding steady at 22.00%.",
          outlook: "We expect inter-bank rates to be range-bound in the near term.",
        },
      },
      treasuryBills: {
        averageBenchmarkRate: 16.04,
        benchmarkRates: [
          { maturityDate: "6-Aug-26", dtm: 87, discRateToday: 15.74, discRatePrev: 15.87, changeInDiscRate: -0.13 },
          { maturityDate: "10-Sep-26", dtm: 122, discRateToday: 16.00, discRatePrev: 15.89, changeInDiscRate: 0.11 },
          { maturityDate: "6-May-27", dtm: 360, discRateToday: 15.96, discRatePrev: 15.99, changeInDiscRate: -0.03 },
        ],
        narrative: {
          body: "The T-bills market opened the week on a quiet note with mixed sentiment. The 10-Sep-2026 bill edged higher by 11bps to 16.00%, while the 6-Aug-2026 bill eased by 13bps to 15.74%. The 6-May-2027 bill declined marginally by 3bps to 15.96%. The average benchmark rate closed flat at 16.04%.",
          outlook: "We expect activity to remain light as market participants maintain a cautious stance in the near term.",
        },
      },
      fgnBonds: {
        averageBenchmarkYield: 16.09,
        bonds: [
          { maturityDate: "20-Mar-27", coupon: 16.29, ttm: 0.86, yieldToday: 17.96, yieldPrev: 18.02, changeInYield: -0.06 },
          { maturityDate: "17-Apr-29", coupon: 14.55, ttm: 2.94, yieldToday: 16.36, yieldPrev: 16.36, changeInYield: -0.01 },
          { maturityDate: "27-Aug-30", coupon: 18.50, ttm: 4.30, yieldToday: 16.45, yieldPrev: 16.55, changeInYield: -0.10 },
          { maturityDate: "25-Jun-32", coupon: 12.50, ttm: 6.13, yieldToday: 16.82, yieldPrev: 16.82, changeInYield: 0.00 },
          { maturityDate: "15-May-33", coupon: 12.50, ttm: 7.02, yieldToday: 16.85, yieldPrev: 16.85, changeInYield: 0.00 },
          { maturityDate: "21-Feb-34", coupon: 19.00, ttm: 7.79, yieldToday: 16.73, yieldPrev: 16.73, changeInYield: 0.00 },
          { maturityDate: "29-Jan-35", coupon: 12.50, ttm: 8.73, yieldToday: 16.75, yieldPrev: 16.70, changeInYield: 0.06 },
          { maturityDate: "21-Jan-42", coupon: 15.45, ttm: 15.71, yieldToday: 14.07, yieldPrev: 14.07, changeInYield: 0.00 },
          { maturityDate: "26-Apr-49", coupon: 14.80, ttm: 22.98, yieldToday: 14.49, yieldPrev: 14.49, changeInYield: 0.00 },
          { maturityDate: "27-Mar-50", coupon: 12.98, ttm: 23.89, yieldToday: 14.54, yieldPrev: 14.54, changeInYield: 0.00 },
          { maturityDate: "21-Jun-53", coupon: 15.70, ttm: 27.13, yieldToday: 14.73, yieldPrev: 14.73, changeInYield: 0.00 },
        ],
        narrative: {
          body: "The FGN bond market opened the week on a bullish note. The 27-Aug-2030 bond led gains, declining by 10bps to 16.45%, while the 20-Mar-2027 bond also eased by 6bps to 17.96%. The 29-Jan-2035 bond edged marginally higher by 6bps, while the rest of the curve remained unchanged. The average benchmark yield declined by 1bp, closing at 16.09%.",
          outlook: "We expect sentiment to remain cautiously supported, with participants likely to tread carefully ahead of Friday's Nigeria inflation report.",
        },
      },
      ssaEurobonds: {
        bonds: [
          { sovereign: NGA, maturityDate: "28-Nov-27", coupon: 7.63, ttm: 1.55, yieldToday: 5.75, yieldPrev: 5.69, changeInYield: 0.06 },
          { sovereign: NGA, maturityDate: "16-Feb-32", coupon: 6.50, ttm: 5.77, yieldToday: 6.56, yieldPrev: 6.54, changeInYield: 0.02 },
          { sovereign: NGA, maturityDate: "28-Nov-47", coupon: 7.88, ttm: 21.56, yieldToday: 7.73, yieldPrev: 7.72, changeInYield: 0.01 },
          { sovereign: NGA, maturityDate: "21-Jan-49", coupon: 9.25, ttm: 22.72, yieldToday: 7.95, yieldPrev: 7.97, changeInYield: -0.02 },
          { sovereign: ANG, maturityDate: "09-May-28", coupon: 9.50, ttm: 2.00, yieldToday: 6.79, yieldPrev: 6.85, changeInYield: -0.06 },
          { sovereign: ANG, maturityDate: "26-Nov-29", coupon: 8.00, ttm: 3.55, yieldToday: 7.27, yieldPrev: 7.27, changeInYield: 0.00 },
          { sovereign: ANG, maturityDate: "14-Apr-32", coupon: 8.75, ttm: 5.93, yieldToday: 7.93, yieldPrev: 7.94, changeInYield: -0.01 },
          { sovereign: ANG, maturityDate: "26-Nov-49", coupon: 9.13, ttm: 23.56, yieldToday: 9.53, yieldPrev: 9.53, changeInYield: 0.01 },
          { sovereign: EGY, maturityDate: "31-Jan-27", coupon: 3.88, ttm: 0.73, yieldToday: 5.23, yieldPrev: 5.24, changeInYield: -0.01 },
          { sovereign: EGY, maturityDate: "15-Jan-32", coupon: 7.05, ttm: 5.68, yieldToday: 6.89, yieldPrev: 6.83, changeInYield: 0.06 },
          { sovereign: EGY, maturityDate: "20-Nov-59", coupon: 8.15, ttm: 33.55, yieldToday: 9.12, yieldPrev: 9.11, changeInYield: 0.01 },
        ],
        narrative: {
          body: "The SSA Eurobond market opened the week on a mixed note, as risk sentiment was dampened by Trump's rejection of Iran's response to the U.S. peace proposal, describing it as unacceptable and raising fears of further escalation in the Gulf. Nigeria and Egypt yields edged higher by 2bps each to 7.00% and 7.08% respectively, while Angola bucked the trend, tightening marginally by 2bps to 7.88%.",
          outlook: "Sentiment is expected to remain cautious, with sovereign curves tracking U.S.-Iran negotiation developments closely.",
        },
      },
      localEquities: {
        asiLevel: 250485.6,
        asiChangePercent: 2.33,
        ytdReturn: 60.97,
        marketCap: "₦160.253 trillion",
        turnoverValue: "₦68.45 billion",
        volumeTraded: "1,485.88 million units",
        marketBreadthRatio: 2.71,
        gainers: 57,
        losers: 21,
        topGainers: [
          { ticker: "CHAMS", open: 3.10, close: 3.41, changePercent: 10.00 },
          { ticker: "FTNCOCOA", open: 8.30, close: 9.13, changePercent: 10.00 },
          { ticker: "LIVESTOCK", open: 8.00, close: 8.80, changePercent: 10.00 },
          { ticker: "RTBRISCOE", open: 15.00, close: 16.50, changePercent: 10.00 },
          { ticker: "INTENEGINS", open: 2.60, close: 2.86, changePercent: 10.00 },
        ],
        topLosers: [
          { ticker: "PRESTIGE", open: 1.60, close: 1.44, changePercent: -10.00 },
          { ticker: "SOVRENINS", open: 2.51, close: 2.26, changePercent: -9.96 },
          { ticker: "UPL", open: 4.40, close: 4.00, changePercent: -9.09 },
          { ticker: "ELLAHLAKES", open: 11.05, close: 10.05, changePercent: -9.05 },
          { ticker: "TANTALIZER", open: 4.55, close: 4.20, changePercent: -7.69 },
        ],
        narrative: {
          body: "The local bourse opened the week on a positive note, as the NGX All-Share Index (ASI) gained 2.33% to close at 250,485.6 points for the day, pushing the year-to-date return to 60.97%. Sectoral performance opened the week on a bullish note, as gains were recorded across all key indices reflecting improved business sentiment. The Consumer Goods sector gained 3.85%, led by a solid 9.81% gain in CHAMPION. The Oil and Gas sector increased marginally by 0.03%, supported by an 8.79% uptick in the share price of ETERNA. Similarly, the Banking sector recorded a gain of 4.67%, driven by buying interest of 6.25% in GTCO. The Industrial Goods sector posted a modest gain of 4.32%, bolstered by strong buying interest of 9.99% in BERGER. The Insurance sector also closed higher, up by 0.59%, following a strong rally of 10% in INTENEGINS. Market breadth stood at 2.71x with 57 gainers and 21 losers. Market capitalization improved to ₦160.253 trillion from ₦157.094 trillion. Trading activity opened the week bullish, with turnover value increased to ₦68.45 billion from ₦55.036 billion while volume traded increased to 1,485.88 million units from 1,066.49 million units.",
          outlook: "We would continue to see earnings induced upward repricing with some profit-taking along the way.",
        },
      },
      globalMarkets: {
        isIntradayNote: true,
        indices: [
          { region: "U.S", index: "S&P 500", open: 7398.93, closeOrIntraday: 7422.61, changePercent: 0.32, isIntraday: true },
          { region: "U.S", index: "Dow Jones", open: 49609.16, closeOrIntraday: 49658.77, changePercent: 0.10, isIntraday: true },
          { region: "U.S", index: "Nasdaq Composite", open: 26247.08, closeOrIntraday: 26330.94, changePercent: 0.32, isIntraday: true },
          { region: "U.S", index: "Russell 2000", open: 2861.21, closeOrIntraday: 2881.91, changePercent: 0.72, isIntraday: true },
          { region: "EUROPE", index: "STOXX 600", open: 612.14, closeOrIntraday: 612.83, changePercent: 0.11 },
          { region: "EUROPE", index: "FTSE 100", open: 10233.07, closeOrIntraday: 10269.43, changePercent: 0.36 },
          { region: "EUROPE", index: "DAX", open: 24338.63, closeOrIntraday: 24355.41, changePercent: 0.07 },
          { region: "EUROPE", index: "CAC 40", open: 8112.57, closeOrIntraday: 8050.71, changePercent: -0.76 },
          { region: "ASIA", index: "Hang Seng", open: 26393.71, closeOrIntraday: 26406.84, changePercent: 0.05 },
          { region: "ASIA", index: "Shanghai", open: 4179.95, closeOrIntraday: 4225.02, changePercent: 1.08 },
          { region: "ASIA", index: "Nikkei", open: 62713.65, closeOrIntraday: 62417.88, changePercent: -0.47 },
        ],
        narrative: {
          body: "U.S. market is trading bullish, S&P 500 (+0.32%), Nasdaq (+0.32%), Dow Jones (+0.10%), and Russell (+0.72%) as strong earnings optimism offset concerns over Iran tensions and higher oil prices. European markets closed mixed. STOXX (+0.11%), DAX (+0.07%) and FTSE (+0.36%) on gains in oil and corporate stocks, while CAC (-0.76%) pressured by Middle East tensions and rising oil prices. Asian markets closed the day mixed. Shanghai (+1.08%) on strong trade data, Hang Seng (+0.05%) on technology and AI stocks and Nikkei (-0.47%) on a surge in oil prices following President Trump rejecting Iran's response to his peace proposal, leaving the strait of Hormuz shut.",
          outlook: "Investors are likely to remain cautious as they monitor developments on U.S.–Iran ceasefire negotiations.",
        },
      },
    },
  
    // ── 12 May 2026 ────────────────────────────────────────────────────────────
    {
      title: TITLE,
      reportDate: "2026-05-12",
      displayDate: "Tuesday, 12th May 2026",
      status: "published",
      pdfFileName: "DAILY_MARKET_REPORT_12th_May_2026.pdf",
      sources: SOURCES,
      disclaimer: DISCLAIMER,
      moneyMarket: {
        systemLiquiditySummary: "System liquidity opened with a surplus of ₦6.89 trillion.",
        rates: [
          { label: "Overnight Policy Rate (%)", today: 22.00, prev: 22.00, change: 0.00 },
          { label: "Overnight Rate (%)", today: 22.21, prev: 22.21, change: 0.00 },
        ],
        narrative: {
          body: "System liquidity opened with a surplus of ₦6.89 trillion. The Overnight (O/N) rate closed flat at 22.21%, while Open Buy-Back (OBB) rate was unchanged, holding steady at 22.00%.",
          outlook: "We expect inter-bank rates to be range-bound in the near term.",
        },
      },
      treasuryBills: {
        averageBenchmarkRate: 16.02,
        benchmarkRates: [
          { maturityDate: "23-Jul-26", dtm: 72, discRateToday: 15.63, discRatePrev: 15.75, changeInDiscRate: -0.12 },
          { maturityDate: "22-Apr-27", dtm: 345, discRateToday: 15.99, discRatePrev: 15.89, changeInDiscRate: 0.10 },
          { maturityDate: "6-May-27", dtm: 359, discRateToday: 15.80, discRatePrev: 15.96, changeInDiscRate: -0.16 },
        ],
        narrative: {
          body: "The T-bills market traded on a bullish note today. The CBN also conducted an OMO auction across three tenors, attracting a total subscription of ₦2.71trn against a total offer of ₦600bn, with total sales of ₦1.57trn. The 126-day bill was the most sought after, allotted at a stop rate of 20.10%. The average benchmark rate declined by 3bps, closing at 16.02%.",
          outlook: "We expect market sentiment to remain soft, with market participants trading cautiously in line with prevailing liquidity.",
        },
      },
      fgnBonds: {
        averageBenchmarkYield: 16.08,
        bonds: [
          { maturityDate: "20-Mar-27", coupon: 16.29, ttm: 0.85, yieldToday: 17.80, yieldPrev: 17.96, changeInYield: -0.15 },
          { maturityDate: "17-Apr-29", coupon: 14.55, ttm: 2.93, yieldToday: 16.35, yieldPrev: 16.36, changeInYield: 0.00 },
          { maturityDate: "27-Aug-30", coupon: 18.50, ttm: 4.30, yieldToday: 16.45, yieldPrev: 16.45, changeInYield: 0.00 },
          { maturityDate: "25-Jun-32", coupon: 12.50, ttm: 6.13, yieldToday: 16.93, yieldPrev: 16.82, changeInYield: 0.11 },
          { maturityDate: "15-May-33", coupon: 12.50, ttm: 7.01, yieldToday: 16.83, yieldPrev: 16.85, changeInYield: -0.02 },
          { maturityDate: "21-Feb-34", coupon: 19.00, ttm: 7.79, yieldToday: 16.75, yieldPrev: 16.73, changeInYield: 0.02 },
          { maturityDate: "29-Jan-35", coupon: 12.50, ttm: 8.72, yieldToday: 16.75, yieldPrev: 16.75, changeInYield: 0.00 },
          { maturityDate: "21-Jan-42", coupon: 15.45, ttm: 15.71, yieldToday: 14.07, yieldPrev: 14.07, changeInYield: 0.00 },
          { maturityDate: "26-Apr-49", coupon: 14.80, ttm: 22.97, yieldToday: 14.49, yieldPrev: 14.49, changeInYield: 0.00 },
          { maturityDate: "27-Mar-50", coupon: 12.98, ttm: 23.89, yieldToday: 14.54, yieldPrev: 14.54, changeInYield: 0.00 },
          { maturityDate: "21-Jun-53", coupon: 15.70, ttm: 27.13, yieldToday: 14.73, yieldPrev: 14.73, changeInYield: 0.00 },
        ],
        narrative: {
          body: "The FGN bond market traded on a slightly bullish note today, with the 20-Mar-2027 bond leading gains, declining by 15bps to 17.80%. The 25-Jun-2032 bond rose by 11bps to 16.93%, while the rest of the curve remained largely unchanged. The average benchmark yield declined by 1bp, closing at 16.08%.",
          outlook: "We expect sentiment to remain cautiously supported, with participants likely to tread carefully ahead of Friday's Nigeria inflation report.",
        },
      },
      ssaEurobonds: {
        bonds: [
          { sovereign: NGA, maturityDate: "28-Nov-27", coupon: 7.63, ttm: 1.55, yieldToday: 5.81, yieldPrev: 5.75, changeInYield: 0.06 },
          { sovereign: NGA, maturityDate: "16-Feb-32", coupon: 6.50, ttm: 5.77, yieldToday: 6.65, yieldPrev: 6.56, changeInYield: 0.09 },
          { sovereign: NGA, maturityDate: "28-Nov-47", coupon: 7.88, ttm: 21.56, yieldToday: 7.78, yieldPrev: 7.73, changeInYield: 0.05 },
          { sovereign: NGA, maturityDate: "21-Jan-49", coupon: 9.25, ttm: 22.71, yieldToday: 8.01, yieldPrev: 7.95, changeInYield: 0.06 },
          { sovereign: ANG, maturityDate: "09-May-28", coupon: 9.50, ttm: 1.99, yieldToday: 6.92, yieldPrev: 6.79, changeInYield: 0.13 },
          { sovereign: ANG, maturityDate: "26-Nov-29", coupon: 8.00, ttm: 3.55, yieldToday: 7.43, yieldPrev: 7.27, changeInYield: 0.16 },
          { sovereign: ANG, maturityDate: "14-Apr-32", coupon: 8.75, ttm: 5.93, yieldToday: 8.09, yieldPrev: 7.93, changeInYield: 0.16 },
          { sovereign: ANG, maturityDate: "26-Nov-49", coupon: 9.13, ttm: 23.56, yieldToday: 9.63, yieldPrev: 9.53, changeInYield: 0.10 },
          { sovereign: EGY, maturityDate: "31-Jan-27", coupon: 3.88, ttm: 0.72, yieldToday: 5.22, yieldPrev: 5.23, changeInYield: -0.01 },
          { sovereign: EGY, maturityDate: "15-Jan-32", coupon: 7.05, ttm: 5.68, yieldToday: 7.02, yieldPrev: 6.89, changeInYield: 0.13 },
          { sovereign: EGY, maturityDate: "20-Nov-59", coupon: 8.15, ttm: 33.55, yieldToday: 9.21, yieldPrev: 9.12, changeInYield: 0.10 },
        ],
        narrative: {
          body: "The SSA Eurobond market traded on a bearish note today, as a higher-than-expected U.S. CPI print of 3.8% against market consensus of 3.7% dampened risk sentiment, reinforcing fears of a prolonged high-rate environment. Sovereign yields widened broadly across the region, with Angola leading the move, rising by 14bps to 8.02%, while Nigeria and Egypt each rose by 7bps to 7.06% and 7.15% respectively.",
          outlook: "Sentiment is expected to remain under pressure, with the stronger than expected U.S. inflation print likely to weigh on risk appetite in the near term.",
        },
      },
      localEquities: {
        asiLevel: 252411.7,
        asiChangePercent: 0.77,
        ytdReturn: 62.20,
        marketCap: "₦161.61 trillion",
        turnoverValue: "₦87.71 billion",
        volumeTraded: "2,027.90 million units",
        marketBreadthRatio: 1.30,
        gainers: 43,
        losers: 33,
        topGainers: [
          { ticker: "IKEJAHOTEL", open: 36.00, close: 39.60, changePercent: 10.00 },
          { ticker: "UPL", open: 4.00, close: 4.40, changePercent: 10.00 },
          { ticker: "ZICHIS", open: 36.69, close: 40.35, changePercent: 9.98 },
          { ticker: "CHAMS", open: 3.41, close: 3.75, changePercent: 9.97 },
          { ticker: "FTNCOCOA", open: 9.13, close: 10.04, changePercent: 9.97 },
        ],
        topLosers: [
          { ticker: "FTGINSURE", open: 1.14, close: 1.03, changePercent: -9.65 },
          { ticker: "CUSTODIAN", open: 89.80, close: 81.25, changePercent: -9.52 },
          { ticker: "NPFMCRFBK", open: 6.00, close: 5.50, changePercent: -8.33 },
          { ticker: "AIICO", open: 4.78, close: 4.41, changePercent: -7.74 },
          { ticker: "HONYFLOUR", open: 18.50, close: 17.50, changePercent: -5.41 },
        ],
        narrative: {
          body: "The local bourse closed the day on a positive note, as the NGX All-Share Index (ASI) gained 0.77% to close at 252,411.7 points for the day, pushing the year-to-date return to 62.20%. Sectoral performance closed the day on a mixed note, as gains in some sectors were offset by losses in others. The Consumer Goods sector gained 1.55%, led by a solid 9.94% gain in NB. The Oil and Gas sector increased marginally by 3.40%, supported by an 6.89% uptick in the share price of ARADEL. Similarly, the Banking sector recorded a slight gain of 1.87%, driven by buying interest of 6.22% in ACCESSORP. While on the other hand, the Industrial Goods sector posted a modest decline of 0.49%, led by sell-off of 1.56% in CUTIX. The Insurance sector closed lower, down by 1.40%, following a decline of 7.74% in AIICO. Market breadth stood at 1.30x with 43 gainers and 33 losers. Market capitalization improved to ₦161.61 trillion from ₦160.253 trillion. Trading activity closed the day bullish, with turnover value increased to ₦87.71 billion from ₦68.45 billion while volume traded increased to 2,027.90 million units from 1,485.88 million units.",
          outlook: "We would continue to see earnings induced upward repricing with some profit-taking along the way.",
        },
      },
      globalMarkets: {
        isIntradayNote: true,
        indices: [
          { region: "U.S", index: "S&P 500", open: 7412.84, closeOrIntraday: 7350.65, changePercent: -0.84, isIntraday: true },
          { region: "U.S", index: "Dow Jones", open: 49704.47, closeOrIntraday: 49537.25, changePercent: -0.34, isIntraday: true },
          { region: "U.S", index: "Nasdaq Composite", open: 26274.12, closeOrIntraday: 25825.01, changePercent: -1.71, isIntraday: true },
          { region: "U.S", index: "Russell 2000", open: 2870.64, closeOrIntraday: 2808.18, changePercent: -2.18, isIntraday: true },
          { region: "EUROPE", index: "STOXX 600", open: 612.79, closeOrIntraday: 606.34, changePercent: -1.05 },
          { region: "EUROPE", index: "FTSE 100", open: 10269.43, closeOrIntraday: 10265.32, changePercent: -0.04 },
          { region: "EUROPE", index: "DAX", open: 24350.28, closeOrIntraday: 23974.67, changePercent: -1.54 },
          { region: "EUROPE", index: "CAC 40", open: 8056.38, closeOrIntraday: 7979.92, changePercent: -0.95 },
          { region: "ASIA", index: "Hang Seng", open: 26406.84, closeOrIntraday: 26347.91, changePercent: -0.22 },
          { region: "ASIA", index: "Shanghai", open: 4225.02, closeOrIntraday: 4214.49, changePercent: -0.25 },
          { region: "ASIA", index: "Nikkei", open: 62417.88, closeOrIntraday: 62742.57, changePercent: 0.52 },
        ],
        narrative: {
          body: "U.S. market is trading bearish, S&P 500 (-0.84%), Nasdaq (-1.71%), Dow Jones (-0.34%), and Russell (-2.18%) as a rally in tech names halted and investors assessed the latest consumer inflation reading for insight into the impact of the Iran war on the economy. European markets closed bearish. STOXX (-1.05%), DAX (-1.54%), CAC (-0.95%) and FTSE (-0.04%) driven by fading hopes for a swift resolution to the US-Iran conflict, which has pushed oil prices higher and increased investor risk aversion. Asian markets closed the day mixed. Nikkei (+0.52%) on sustained AI-driven optimism, Shanghai (-0.25%) on profit-taking ahead of the Trump-Xi summit and Hang Seng (-0.22%) on fading tech momentum and escalating Middle East tensions.",
          outlook: "Investors are likely to remain cautious as they monitor developments on U.S.–Iran ceasefire negotiations.",
        },
      },
    },
  
    // ── 13 May 2026 ────────────────────────────────────────────────────────────
    {
      title: TITLE,
      reportDate: "2026-05-13",
      displayDate: "Wednesday, 13th May 2026",
      status: "published",
      pdfFileName: "DAILY_MARKET_REPORT_13th_May_2026.pdf",
      sources: SOURCES,
      disclaimer: DISCLAIMER,
      moneyMarket: {
        systemLiquiditySummary: "System liquidity opened with a surplus of ₦5.32 trillion.",
        rates: [
          { label: "Overnight Policy Rate (%)", today: 22.00, prev: 22.00, change: 0.00 },
          { label: "Overnight Rate (%)", today: 22.16, prev: 22.21, change: -0.05 },
        ],
        narrative: {
          body: "System liquidity opened with a surplus of ₦5.32 trillion. The Overnight (O/N) rate declined by 5bps to close at 22.16%, while Open Buy-Back (OBB) rate was unchanged, holding steady at 22.00%.",
          outlook: "We expect inter-bank rates to be range-bound in the near term.",
        },
      },
      treasuryBills: {
        averageBenchmarkRate: 16.04,
        benchmarkRates: [
          { maturityDate: "3-Dec-26", dtm: 204, discRateToday: 16.35, discRatePrev: 16.17, changeInDiscRate: 0.18 },
          { maturityDate: "22-Apr-27", dtm: 344, discRateToday: 15.92, discRatePrev: 15.99, changeInDiscRate: -0.07 },
          { maturityDate: "6-May-27", dtm: 358, discRateToday: 15.85, discRatePrev: 15.80, changeInDiscRate: 0.05 },
        ],
        narrative: {
          body: "The T-bills market traded on a bearish note today, with selling pressure emerging across the curve. The 3-Dec-2026 bill led the move, rising sharply by 18bps to 16.35%, while the 6-May-2027 bill edged higher by 5bps to 15.85%. The 22-Apr-2027 bill bucked the trend, easing by 7bps to 15.92%. The average benchmark rate rose by 3bps, closing at 16.04%.",
          outlook: "We expect market sentiment to remain soft, with market participants trading cautiously in line with prevailing liquidity.",
        },
      },
      fgnBonds: {
        averageBenchmarkYield: 16.08,
        bonds: [
          { maturityDate: "20-Mar-27", coupon: 16.29, ttm: 0.85, yieldToday: 17.85, yieldPrev: 17.80, changeInYield: 0.04 },
          { maturityDate: "17-Apr-29", coupon: 14.55, ttm: 2.93, yieldToday: 16.35, yieldPrev: 16.35, changeInYield: 0.00 },
          { maturityDate: "27-Aug-30", coupon: 18.50, ttm: 4.29, yieldToday: 16.45, yieldPrev: 16.45, changeInYield: 0.00 },
          { maturityDate: "25-Jun-32", coupon: 12.50, ttm: 6.12, yieldToday: 16.82, yieldPrev: 16.93, changeInYield: -0.11 },
          { maturityDate: "15-May-33", coupon: 12.50, ttm: 7.01, yieldToday: 16.83, yieldPrev: 16.83, changeInYield: 0.00 },
          { maturityDate: "21-Feb-34", coupon: 19.00, ttm: 7.78, yieldToday: 16.75, yieldPrev: 16.75, changeInYield: 0.00 },
          { maturityDate: "29-Jan-35", coupon: 12.50, ttm: 8.72, yieldToday: 16.75, yieldPrev: 16.75, changeInYield: 0.00 },
          { maturityDate: "21-Jan-42", coupon: 15.45, ttm: 15.70, yieldToday: 14.07, yieldPrev: 14.07, changeInYield: 0.00 },
          { maturityDate: "26-Apr-49", coupon: 14.80, ttm: 22.97, yieldToday: 14.49, yieldPrev: 14.49, changeInYield: 0.00 },
          { maturityDate: "27-Mar-50", coupon: 12.98, ttm: 23.89, yieldToday: 14.54, yieldPrev: 14.54, changeInYield: 0.00 },
          { maturityDate: "21-Jun-53", coupon: 15.70, ttm: 27.13, yieldToday: 14.73, yieldPrev: 14.73, changeInYield: 0.00 },
        ],
        narrative: {
          body: "The FGN bond market traded on a quiet note today, with minimal activity across the curve. The 25-Jun-2032 bond was the key mover, easing by 11bps to 16.82%, while the 20-Mar-2027 bond edged marginally higher by 4bps to 17.85%. All other bonds remained unchanged. The average benchmark yield closed flat at 16.08%.",
          outlook: "We expect sentiment to remain cautiously supported, with participants likely to tread carefully ahead of Friday's Nigeria inflation report.",
        },
      },
      ssaEurobonds: {
        bonds: [
          { sovereign: NGA, maturityDate: "28-Nov-27", coupon: 7.63, ttm: 1.55, yieldToday: 5.81, yieldPrev: 5.81, changeInYield: 0.00 },
          { sovereign: NGA, maturityDate: "16-Feb-32", coupon: 6.50, ttm: 5.77, yieldToday: 6.64, yieldPrev: 6.65, changeInYield: -0.01 },
          { sovereign: NGA, maturityDate: "28-Nov-47", coupon: 7.88, ttm: 21.56, yieldToday: 7.77, yieldPrev: 7.78, changeInYield: -0.01 },
          { sovereign: NGA, maturityDate: "21-Jan-49", coupon: 9.25, ttm: 22.71, yieldToday: 8.00, yieldPrev: 8.01, changeInYield: -0.01 },
          { sovereign: ANG, maturityDate: "09-May-28", coupon: 9.50, ttm: 1.99, yieldToday: 6.92, yieldPrev: 6.92, changeInYield: 0.00 },
          { sovereign: ANG, maturityDate: "26-Nov-29", coupon: 8.00, ttm: 3.54, yieldToday: 7.37, yieldPrev: 7.43, changeInYield: -0.06 },
          { sovereign: ANG, maturityDate: "14-Apr-32", coupon: 8.75, ttm: 5.93, yieldToday: 8.06, yieldPrev: 8.09, changeInYield: -0.03 },
          { sovereign: ANG, maturityDate: "26-Nov-49", coupon: 9.13, ttm: 23.56, yieldToday: 9.60, yieldPrev: 9.63, changeInYield: -0.03 },
          { sovereign: EGY, maturityDate: "31-Jan-27", coupon: 3.88, ttm: 0.72, yieldToday: 5.21, yieldPrev: 5.22, changeInYield: 0.00 },
          { sovereign: EGY, maturityDate: "15-Jan-32", coupon: 7.05, ttm: 5.68, yieldToday: 7.05, yieldPrev: 7.02, changeInYield: 0.03 },
          { sovereign: EGY, maturityDate: "20-Nov-59", coupon: 8.15, ttm: 33.55, yieldToday: 9.25, yieldPrev: 9.21, changeInYield: 0.04 },
        ],
        narrative: {
          body: "The SSA Eurobond market traded on a mild bullish sentiment despite U.S. Producer Price Index printing at 1.0% in April against market expectations of 0.3% and a prior reading of 0.2%, stoking broader inflation concerns and weighing on risk sentiment. Nigeria and Angola yields eased marginally by 1bp and 3bps to 7.05% and 7.98% respectively, while Egypt bucked rose by 2bps to 7.17%.",
          outlook: "Sentiment is expected to remain cautious, with the stronger than expected U.S. producer price data likely to keep pressure on risk assets in the near term.",
        },
      },
      localEquities: {
        asiLevel: 252508.2,
        asiChangePercent: 0.4,
        ytdReturn: 62.27,
        marketCap: "₦162.05 trillion",
        turnoverValue: "₦109.44 billion",
        volumeTraded: "1,683.09 million units",
        marketBreadthRatio: 1.23,
        gainers: 37,
        losers: 30,
        topGainers: [
          { ticker: "CWG", open: 21.00, close: 23.10, changePercent: 10.00 },
          { ticker: "DAARCOMM", open: 1.70, close: 1.87, changePercent: 10.00 },
          { ticker: "FIDSON", open: 103.00, close: 113.30, changePercent: 10.00 },
          { ticker: "LIVESTOCK", open: 9.50, close: 10.45, changePercent: 10.00 },
          { ticker: "BERGER", open: 127.40, close: 140.10, changePercent: 9.97 },
        ],
        topLosers: [
          { ticker: "NCR", open: 199.00, close: 179.10, changePercent: -10.00 },
          { ticker: "ZICHIS", open: 40.35, close: 36.32, changePercent: -9.99 },
          { ticker: "FIRSTHOLDCO", open: 79.00, close: 71.20, changePercent: -9.87 },
          { ticker: "NEIMETH", open: 11.90, close: 10.75, changePercent: -9.66 },
          { ticker: "ETERNA", open: 36.50, close: 33.00, changePercent: -9.59 },
        ],
        narrative: {
          body: "The local bourse closed the day on a positive note, as the NGX All-Share Index (ASI) gained 0.4% to close at 252,508.2 points for the day, pushing the year-to-date return to 62.27%. Sectoral performance closed the day on a mixed note, as the 0.4% gain in the All-Share Index signalled overall market resilience despite a bearish tilt in several sectors. The Banking sector recorded a decrease of 2.53%, driven by a sell-off in JaizBank (-3.33%), the Consumer Goods sector declined by 1.53%, led by a fall in CHAMPION (-8.75%), the Oil and Gas sector slipped marginally by 0.03%, pressured by a decline in ETERNA (-9.59%). On the positive side, the Industrial Goods sector posted a modest gain of 0.93%, supported by buying interest in BERGER (+9.97%). The Insurance sector saw slight improvement, up 0.68%, following an increase in INTENEGINS (9.96%). Market breadth stood at 1.23x with 37 gainers and 30 losers. Market capitalization improved to ₦162.05 trillion from ₦161.61 trillion. Trading activity closed the day mixed, with turnover value increased to ₦109.44 billion from ₦87.71 billion while volume traded decreased to 1,683.09 million units from 2,027.90 million units.",
          outlook: "We would continue to see earnings induced upward repricing with some profit-taking along the way.",
        },
      },
      globalMarkets: {
        isIntradayNote: true,
        indices: [
          { region: "U.S", index: "S&P 500", open: 7400.96, closeOrIntraday: 7417.74, changePercent: 0.23, isIntraday: true },
          { region: "U.S", index: "Dow Jones", open: 49760.56, closeOrIntraday: 49530.17, changePercent: -0.46, isIntraday: true },
          { region: "U.S", index: "Nasdaq Composite", open: 26088.20, closeOrIntraday: 26289.80, changePercent: 0.77, isIntraday: true },
          { region: "U.S", index: "Russell 2000", open: 2842.83, closeOrIntraday: 2838.28, changePercent: -0.16, isIntraday: true },
          { region: "EUROPE", index: "STOXX 600", open: 606.63, closeOrIntraday: 610.63, changePercent: 0.66 },
          { region: "EUROPE", index: "FTSE 100", open: 10265.32, closeOrIntraday: 10325.35, changePercent: 0.58 },
          { region: "EUROPE", index: "DAX", open: 23954.93, closeOrIntraday: 24101.73, changePercent: 0.61 },
          { region: "EUROPE", index: "CAC 40", open: 7979.92, closeOrIntraday: 8007.97, changePercent: 0.35 },
          { region: "ASIA", index: "Hang Seng", open: 26347.91, closeOrIntraday: 26388.44, changePercent: 0.15 },
          { region: "ASIA", index: "Shanghai", open: 4214.49, closeOrIntraday: 4242.57, changePercent: 0.67 },
          { region: "ASIA", index: "Nikkei", open: 62742.57, closeOrIntraday: 63272.11, changePercent: 0.84 },
        ],
        narrative: {
          body: "U.S. market is trading mixed, S&P 500 (+0.23%), Nasdaq (+0.77%), Dow Jones (-0.46%), and Russell (-0.16%) largely due to a combination of investor anxiety surrounding AI-related tech stocks, weak earnings reports from major companies and a general cautiousness regarding US-Iran tensions. European markets closed bullish. STOXX (+0.66%), DAX (+0.61%), CAC (+0.35%) and FTSE (+0.58%) driven by a focus on corporate earnings despite ongoing Middle East tensions and inflation. Asian markets closed the day bullish, the Shanghai (+0.67%), Hang Seng (+0.15%), Nikkei (+0.84%) on investor optimism surrounding the Trump-Xi summit and sustained demand for technology service shares.",
          outlook: "Investors are likely to remain cautious as they monitor developments on U.S.–Iran ceasefire negotiations.",
        },
      },
    },
  ];
