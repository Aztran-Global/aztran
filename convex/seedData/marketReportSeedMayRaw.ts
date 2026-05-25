/**
 * Raw CMS export (legacy shape). Normalized in `marketReportSeedMayContinuation.ts`.
 * Reports: 4 May 2026, 5 May 2026
 */
const DISCLAIMER = `This report is intended solely for informational purposes and should not be interpreted as investment advice or a recommendation to engage in any financial transactions. Aztran Investments accepts no liability for any decisions made or losses incurred based on its use. Always seek independent professional advice before making financial decisions.\n\nThis message and any accompanying documents may contain confidential or privileged information and are intended only for the named recipient. If you are not the intended recipient, please notify the sender immediately, delete this message from your system, and refrain from disclosing, copying, or using any part of it. Electronic communications are not guaranteed to be secure or virus-free; Aztran Investments is not liable for any damage arising from unauthorized access, interception, or the presence of malware.\n\nOpinions expressed that do not relate to the official business of Aztran Investments are those of the author and do not necessarily reflect the views of the firm.`;

export const legacyMarketReportsMay = [

  // ─────────────────────────────────────────────────────────────
  // REPORT 1 — Monday, 4th May 2026
  // ─────────────────────────────────────────────────────────────
  {
    // BASICS
    title: "Daily Financial Markets Update",
    reportDate: "2026-05-04",
    displayDate: "Monday, 4TH May 2026",
    status: "Publish immediately",
    sources: "NGX, FMDQ, CBN, Investing.com, Aztran Research",
    disclaimer: DISCLAIMER,

    // MONEY MARKET
    moneyMarket: {
      systemLiquiditySummary:
        "System liquidity opened the week with a surplus of ₦5.56 trillion.",
      ratesTable: [
        { label: "Overnight Policy Rate (%)", today: 22.00, prev: 22.00 },
        { label: "Overnight Rate (%)",        today: 22.24, prev: 22.30 },
      ],
      narrativeBody:
        "System liquidity opened the week with a surplus of ₦5.56 trillion. The Overnight (O/N) rate declined by 6bps to close at 22.24%, while Open Buy-Back (OBB) rate was unchanged, holding steady at 22.00%.",
      outlook:
        "We expect inter-bank rates to be range-bound in the near term.",
    },

    // TREASURY BILLS
    treasuryBills: {
      averageBenchmarkRate: 16.04,
      benchmarkRatesTable: [
        { maturityDate: "11-Jun-26",  dtm: 38,  discRateToday: 16.25, discRatePrev: 15.55 },
        { maturityDate: "5-Nov-26",   dtm: 185, discRateToday: 16.14, discRatePrev: 16.14 },
        { maturityDate: "18-Mar-27",  dtm: 318, discRateToday: 16.30, discRatePrev: 16.30 },
      ],
      narrativeBody:
        "The Nigerian Treasury bills market commenced the week on a subdued footing, reflecting a bearish bias as investors repositioned ahead of the CBN's OMO auction. The CBN offered ₦600bn across two maturities, selling ₦1.6tn against total subscriptions of ₦1.7tn. Benchmark rate edged higher, with the average rate climbing 2bps to close at 16.04%, signalling cautious sentiment amid liquidity adjustments.",
      outlook:
        "We expect activity to remain cautious ahead of Wednesday's NTB auction.",
    },

    // FGN BONDS
    fgnBonds: {
      averageBenchmarkYield: 16.08,
      bondsTable: [
        { maturityDate: "20-Mar-27", coupon: 16.29, ttm: 0.88, yieldToday: 17.92, yieldPrev: 17.91 },
        { maturityDate: "17-Apr-29", coupon: 14.55, ttm: 2.96, yieldToday: 16.37, yieldPrev: 16.50 },
        { maturityDate: "21-Feb-31", coupon: 18.50, ttm: 4.81, yieldToday: 16.71, yieldPrev: 16.80 },
        { maturityDate: "25-Jun-32", coupon: 12.50, ttm: 6.15, yieldToday: 16.69, yieldPrev: 16.85 },
        { maturityDate: "15-May-33", coupon: 12.50, ttm: 7.04, yieldToday: 16.86, yieldPrev: 16.81 },
        { maturityDate: "21-Feb-34", coupon: 19.00, ttm: 7.81, yieldToday: 16.74, yieldPrev: 16.74 },
        { maturityDate: "29-Jan-35", coupon: 12.50, ttm: 8.75, yieldToday: 16.59, yieldPrev: 16.79 },
        { maturityDate: "21-Jan-42", coupon: 15.45, ttm: 15.73, yieldToday: 14.07, yieldPrev: 14.07 },
        { maturityDate: "26-Apr-49", coupon: 14.80, ttm: 22.99, yieldToday: 14.49, yieldPrev: 14.49 },
        { maturityDate: "27-Mar-50", coupon: 12.98, ttm: 23.91, yieldToday: 14.54, yieldPrev: 14.54 },
        { maturityDate: "21-Jun-53", coupon: 15.70, ttm: 27.15, yieldToday: 14.73, yieldPrev: 14.73 },
      ],
      narrativeBody:
        "The FGN bond market opened the week on a slightly bullish note, with demand filtering into the mid-curve. The 29-Jan-2035 and 25-Jun-2032 bonds led gains, declining by 20bps and 16bps to 16.59% and 16.69% respectively, while the 17-Apr-2029 and 21-Feb-2031 bonds also eased by 12bps and 9bps. The average benchmark yield declined by 1bp, closing at 16.08%.",
      outlook:
        "We expect sentiment to remain cautious, as fiscal concerns drive near term market sentiment.",
    },

    // SSA EUROBONDS
    ssaEurobonds: {
      bondsTable: [
        // Republic Of Nigeria
        { sovereign: "Republic Of Nigeria", maturityDate: "28-Nov-27", coupon: 7.63, ttm: 1.57, yieldToday: 5.65, yieldPrev: 5.85 },
        { sovereign: "Republic Of Nigeria", maturityDate: "16-Feb-32", coupon: 6.50, ttm: 5.79, yieldToday: 6.62, yieldPrev: 6.72 },
        { sovereign: "Republic Of Nigeria", maturityDate: "28-Nov-47", coupon: 7.88, ttm: 21.58, yieldToday: 7.80, yieldPrev: 7.85 },
        { sovereign: "Republic Of Nigeria", maturityDate: "21-Jan-49", coupon: 9.25, ttm: 22.73, yieldToday: 8.01, yieldPrev: 8.08 },
        // Republic Of Angola
        { sovereign: "Republic Of Angola",  maturityDate: "09-May-28", coupon: 9.50, ttm: 2.02, yieldToday: 6.67, yieldPrev: 6.80 },
        { sovereign: "Republic Of Angola",  maturityDate: "26-Nov-29", coupon: 8.00, ttm: 3.57, yieldToday: 7.17, yieldPrev: 7.35 },
        { sovereign: "Republic Of Angola",  maturityDate: "14-Apr-32", coupon: 8.75, ttm: 5.95, yieldToday: 7.73, yieldPrev: 7.89 },
        { sovereign: "Republic Of Angola",  maturityDate: "26-Nov-49", coupon: 9.13, ttm: 23.58, yieldToday: 9.51, yieldPrev: 9.62 },
        // Arab Republic Of Egypt
        { sovereign: "Arab Republic Of Egypt", maturityDate: "31-Jan-27", coupon: 3.88, ttm: 0.75, yieldToday: 5.64, yieldPrev: 5.82 },
        { sovereign: "Arab Republic Of Egypt", maturityDate: "15-Jan-32", coupon: 7.05, ttm: 5.70, yieldToday: 7.32, yieldPrev: 7.43 },
        { sovereign: "Arab Republic Of Egypt", maturityDate: "20-Nov-59", coupon: 8.15, ttm: 33.57, yieldToday: 9.41, yieldPrev: 9.50 },
      ],
      narrativeBody:
        "The SSA Eurobond market opened the week on a bullish note, amid conflicting reports from Iran and the U.S about American warship in the strait of Hormuz. Nigeria led gains, with yields declining by 11bps to 7.02%, while Angola tightened by 8bps to 7.79% and Egypt eased by 5bps to 7.50%.",
      outlook:
        "Sentiment is expected to be driven by U.S.-Iran developments and broader global risk appetite.",
    },

    // LOCAL EQUITIES
    localEquities: {
      asiLevel: 243159.0,
      asiChangePercent: 0.36,
      ytdReturn: 56.26,
      marketCap: "₦156.058 trillion",
      turnoverValue: "₦43.84 billion",
      volumeTraded: "967.47 million units",
      marketBreadthRatio: 1.26,
      gainers: 43,
      losers: 34,
      topGainersTable: [
        { ticker: "CONHALLPLC", open: 5.20,   close: 5.72   },
        { ticker: "FTNCOCOA",   open: 5.50,   close: 6.05   },
        { ticker: "CAP",        open: 145.20, close: 159.70 },
        { ticker: "AIICO",      open: 4.31,   close: 4.74   },
        { ticker: "DANGSUGAR",  open: 69.70,  close: 76.65  },
      ],
      topLosersTable: [
        { ticker: "ABBEYBDS",   open: 220.30, close: 198.65 },
        { ticker: "WEMABANK",   open: 2.75,   close: 2.48   },
        { ticker: "NPFMCRFBK",  open: 4.90,   close: 4.45   },
        { ticker: "MERVALUE",   open: 9.30,   close: 8.45   },
        { ticker: "WAPIC",      open: 30.55,  close: 28.10  },
      ],
      narrativeBody:
        "The local bourse opened the week on a positive note, as the NGX All-Share Index (ASI) gained 0.36% to close at 243,159.0 points for the day, pushing the year-to-date return to 56.26%. Sectoral performance opened the week on a mixed but broadly stable note, as gains in select sectors were tempered by notable pullbacks in others, reflecting a more cautious market tone. The Consumer Goods edged lower by 0.08%, dragged down by weakness of 6.78% in share price of CARDBURY. The Oil and Gas sector slipped marginally by 0.89%, pressured by a decline of 5.11% in OANDO. On the positive side, the Banking sector recorded a slight gain of 0.41%, led by buying interest of 9.7% in STANBIC. The Industrial Goods posted a modest gain of 1.08%, supported by a strong buying interest of 9.99% in CAP. The Insurance sector also closed higher, up by 1.25%, driven by a strong rally of 10% in CONHALL. Market breadth stood at 1.26x with 43 gainers and 34 losers. Market capitalization improved slightly to ₦156.058 trillion from ₦155.994 trillion. Trading activity opened the week bearish, with turnover value decreased to ₦43.84 billion from ₦104.29 billion while volume traded decreased to 967.47 million units from 1,871.37 million units.",
      outlook:
        "We would continue to see earnings induced upward repricing with some profit-taking along the way.",
    },

    // GLOBAL MARKETS
    globalMarkets: {
      intradayNoteActive: true,
      indicesTable: [
        { region: "U.S",    index: "S&P 500",          open: 7230.12,  closeOrIntraday: 7203.69,  intraday: true  },
        { region: "U.S",    index: "Dow Jones",        open: 49499.27, closeOrIntraday: 49088.68, intraday: true  },
        { region: "U.S",    index: "Nasdaq Composite", open: 25114.44, closeOrIntraday: 25032.14, intraday: true  },
        { region: "U.S",    index: "Russell 2000",     open: 2812.82,  closeOrIntraday: 2798.52,  intraday: true  },
        { region: "EUROPE", index: "STOXX 600",        open: 611.55,   closeOrIntraday: 605.41,   intraday: false },
        { region: "EUROPE", index: "FTSE 100",         open: 10378.82, closeOrIntraday: 10363.93, intraday: false },
        { region: "EUROPE", index: "DAX",              open: 24292.38, closeOrIntraday: 24035.56, intraday: false },
        { region: "EUROPE", index: "CAC 40",           open: 8114.84,  closeOrIntraday: 7976.12,  intraday: false },
        { region: "ASIA",   index: "HangSeng",         open: 25776.53, closeOrIntraday: 26095.88, intraday: false },
        { region: "ASIA",   index: "Shanghai",         open: 4107.51,  closeOrIntraday: 4112.16,  intraday: false },
        { region: "ASIA",   index: "Nikkei 225",       open: 59284.92, closeOrIntraday: 59513.12, intraday: false },
      ],
      narrativeBody:
        "The U.S. market is trading bearish. The S&P (-0.37%), Russell (-0.51%), Nasdaq (-0.33%), and Dow Jones (-0.83%) amid heightened U.S.–Iran tensions and rising oil prices, which dampened investor sentiment. European markets opened the week bearish, with CAC (-1.71%), STOXX (-1.0%), DAX (-1.06%), and FTSE (-0.14%) pressured by U.S. tariff threats on EU autos, Middle East tensions, and weakness in energy and banking stocks. Asian markets opened the week bullish, HangSeng (+1.24%) on easing geopolitical tensions, Nikkei (+0.38%) on tech strength, and Shanghai (+0.11%) on strong PMI data and tech-led optimism.",
      outlook:
        "Participants are likely to remain cautious as they monitor developments on U.S.–Iran ceasefire negotiations.",
    },
  },

  // ─────────────────────────────────────────────────────────────
  // REPORT 2 — Tuesday, 5th May 2026
  // ─────────────────────────────────────────────────────────────
  {
    // BASICS
    title: "Daily Financial Markets Update",
    reportDate: "2026-05-05",
    displayDate: "Tuesday, 5TH May 2026",
    status: "Publish immediately",
    sources: "NGX, FMDQ, CBN, Investing.com, Aztran Research",
    disclaimer: DISCLAIMER,

    // MONEY MARKET
    moneyMarket: {
      systemLiquiditySummary:
        "System liquidity opened with a surplus of ₦6.61 trillion.",
      ratesTable: [
        { label: "Overnight Policy Rate (%)", today: 22.00, prev: 22.00 },
        { label: "Overnight Rate (%)",        today: 22.13, prev: 22.24 },
      ],
      narrativeBody:
        "System liquidity opened with a surplus of ₦6.61 trillion. The Overnight (O/N) rate declined by 11bps to close at 22.13%, while Open Buy-Back (OBB) rate was unchanged, holding steady at 22.00%.",
      outlook:
        "We expect inter-bank rates to be range-bound in the near term.",
    },

    // TREASURY BILLS
    treasuryBills: {
      averageBenchmarkRate: 16.04,
      benchmarkRatesTable: [
        { maturityDate: "11-Jun-26",  dtm: 37,  discRateToday: 16.25, discRatePrev: 16.25 },
        { maturityDate: "5-Nov-26",   dtm: 184, discRateToday: 16.14, discRatePrev: 16.14 },
        { maturityDate: "22-Apr-27",  dtm: 352, discRateToday: 15.93, discRatePrev: 15.95 },
      ],
      narrativeBody:
        "The T-bills market traded on a quiet note today, with activity largely subdued across the curve. The 22-Apr-2027 bill was the sole mover, easing marginally by 2bps to 15.93%, while the remaining bills held steady. The average benchmark rate closed flat at 16.04%.",
      outlook:
        "We expect activity to remain muted in the near term, with participants awaiting Wednesday's NTB auction for fresh direction.",
    },

    // FGN BONDS
    fgnBonds: {
      averageBenchmarkYield: 16.09,
      bondsTable: [
        { maturityDate: "20-Mar-27", coupon: 16.29, ttm: 0.87, yieldToday: 17.90, yieldPrev: 17.92 },
        { maturityDate: "17-Apr-29", coupon: 14.55, ttm: 2.95, yieldToday: 16.37, yieldPrev: 16.37 },
        { maturityDate: "21-Feb-31", coupon: 18.50, ttm: 4.80, yieldToday: 16.71, yieldPrev: 16.71 },
        { maturityDate: "25-Jun-32", coupon: 12.50, ttm: 6.15, yieldToday: 16.94, yieldPrev: 16.69 },
        { maturityDate: "15-May-33", coupon: 12.50, ttm: 7.03, yieldToday: 16.86, yieldPrev: 16.86 },
        { maturityDate: "21-Feb-34", coupon: 19.00, ttm: 7.81, yieldToday: 16.73, yieldPrev: 16.74 },
        { maturityDate: "29-Jan-35", coupon: 12.50, ttm: 8.74, yieldToday: 16.81, yieldPrev: 16.59 },
        { maturityDate: "21-Jan-42", coupon: 15.45, ttm: 15.73, yieldToday: 14.07, yieldPrev: 14.07 },
        { maturityDate: "26-Apr-49", coupon: 14.80, ttm: 22.99, yieldToday: 14.49, yieldPrev: 14.49 },
        { maturityDate: "27-Mar-50", coupon: 12.98, ttm: 23.91, yieldToday: 14.54, yieldPrev: 14.54 },
        { maturityDate: "21-Jun-53", coupon: 15.70, ttm: 27.15, yieldToday: 14.73, yieldPrev: 14.73 },
      ],
      narrativeBody:
        "The FGN bond market traded on a slightly bearish note today, with selling pressure emerging at the mid-curve. The 25-Jun-2032 and 29-Jan-2035 bonds led the move, rising by 25bps and 22bps to 16.94% and 16.81% respectively, while the rest of the curve remained largely unchanged. The average benchmark yield rose by 1bp, closing at 16.09%.",
      outlook:
        "We expect sentiment to remain cautious, as fiscal concerns drive near term market sentiment.",
    },

    // SSA EUROBONDS
    ssaEurobonds: {
      bondsTable: [
        // Republic Of Nigeria
        { sovereign: "Republic Of Nigeria", maturityDate: "28-Nov-27", coupon: 7.63, ttm: 1.57, yieldToday: 5.86, yieldPrev: 5.84 },
        { sovereign: "Republic Of Nigeria", maturityDate: "16-Feb-32", coupon: 6.50, ttm: 5.79, yieldToday: 6.58, yieldPrev: 6.64 },
        { sovereign: "Republic Of Nigeria", maturityDate: "28-Nov-47", coupon: 7.88, ttm: 21.58, yieldToday: 7.76, yieldPrev: 7.80 },
        { sovereign: "Republic Of Nigeria", maturityDate: "21-Jan-49", coupon: 9.25, ttm: 22.73, yieldToday: 8.00, yieldPrev: 8.02 },
        // Republic Of Angola
        { sovereign: "Republic Of Angola",  maturityDate: "09-May-28", coupon: 9.50, ttm: 2.01, yieldToday: 6.56, yieldPrev: 6.67 },
        { sovereign: "Republic Of Angola",  maturityDate: "26-Nov-29", coupon: 8.00, ttm: 3.56, yieldToday: 7.11, yieldPrev: 7.17 },
        { sovereign: "Republic Of Angola",  maturityDate: "14-Apr-32", coupon: 8.75, ttm: 5.95, yieldToday: 7.65, yieldPrev: 7.73 },
        { sovereign: "Republic Of Angola",  maturityDate: "26-Nov-49", coupon: 9.13, ttm: 23.58, yieldToday: 9.40, yieldPrev: 9.51 },
        // Arab Republic Of Egypt
        { sovereign: "Arab Republic Of Egypt", maturityDate: "31-Jan-27", coupon: 3.88, ttm: 0.74, yieldToday: 5.45, yieldPrev: 5.64 },
        { sovereign: "Arab Republic Of Egypt", maturityDate: "15-Jan-32", coupon: 7.05, ttm: 5.70, yieldToday: 7.27, yieldPrev: 7.32 },
        { sovereign: "Arab Republic Of Egypt", maturityDate: "20-Nov-59", coupon: 8.15, ttm: 33.57, yieldToday: 9.38, yieldPrev: 9.41 },
      ],
      narrativeBody:
        "The SSA Eurobond market traded on a bullish note today, as investors responded positively to signs of a potential Iran truce, even as the U.S. moved to force open the Strait of Hormuz and the UAE came under attack, testing the fragility of the ceasefire. Despite the lingering tension, risk sentiment remained broadly supportive. Nigeria yields declined by 2bps to 7.05%, Angola tightened by 9bps to 7.68%, while Egypt eased by 9bps to 7.37%.",
      outlook:
        "Sentiment is expected to remain cautious, with sovereign curves sensitive to any escalation surrounding the Strait of Hormuz.",
    },

    // LOCAL EQUITIES
    localEquities: {
      asiLevel: 241849.2,
      asiChangePercent: -0.54,
      ytdReturn: 55.42,
      marketCap: "₦155.152 trillion",
      turnoverValue: "₦75.225 billion",
      volumeTraded: "1,268.25 million units",
      marketBreadthRatio: 1.73,
      gainers: 45,
      losers: 26,
      topGainersTable: [
        { ticker: "RTBRISCOE",  open: 11.70,  close: 12.87  },
        { ticker: "VITAFOAM",   open: 155.00, close: 170.50 },
        { ticker: "MCNICHOLS",  open: 7.20,   close: 7.92   },
        { ticker: "ZICHIS",     open: 22.80,  close: 25.08  },
        { ticker: "CAP",        open: 159.70, close: 175.65 },
      ],
      topLosersTable: [
        { ticker: "ABBEYBDS",   open: 497.00, close: 447.30 },
        { ticker: "WEMABANK",   open: 21.90,  close: 19.75  },
        { ticker: "NPFMCRFBK",  open: 4.74,   close: 4.30   },
        { ticker: "MERVALUE",   open: 33.25,  close: 30.35  },
        { ticker: "WAPIC",      open: 915.00, close: 836.00 },
      ],
      narrativeBody:
        "The local bourse closed the day on a negative note, as the NGX All-Share Index (ASI) declined slightly by 0.54% to close at 241,849.2 points for the day, pulling the year-to-date return to 55.42%. Sectoral performance closed the day mixed but on a broadly bearish note, as losses in select sectors were only partially tempered by gains elsewhere, reflecting a cautious market tone. The Banking sector declined slightly by 1.22%, led by an 8.72% sell-off in WEMA. Similarly, Consumer Goods edged lower by 1.05%, dragged down by a 10.00% drop in GUINNESS, while the Oil and Gas sector slipped by 2.91% due to pressure from a 5.81% sell-off in ARADEL. On the positive side, Industrial Goods posted a modest gain of 2.49%, supported by strong buying interest of 9.99% in CAP for the second consecutive day. The Insurance sector also closed higher, up 0.94%, driven by a robust 9.96% rally in CONHALL. Market breadth stood at 1.73x with 45 gainers and 26 losers. Market capitalization declined slightly to ₦155.152 trillion from ₦156.058 trillion. Trading activity closed the day bullish, with turnover value increased to ₦75.225 billion from ₦43.84 billion while volume traded increased to 1,268.25 million units from 967.47 million units.",
      outlook:
        "We would continue to see earnings induced upward repricing with some profit-taking along the way.",
    },

    // GLOBAL MARKETS
    globalMarkets: {
      intradayNoteActive: true,
      indicesTable: [
        { region: "U.S",    index: "S&P 500",          open: 7200.75,  closeOrIntraday: 7255.89,  intraday: true  },
        { region: "U.S",    index: "Dow Jones",        open: 48941.90, closeOrIntraday: 49196.46, intraday: true  },
        { region: "U.S",    index: "Nasdaq Composite", open: 25067.80, closeOrIntraday: 25309.35, intraday: true  },
        { region: "U.S",    index: "Russell 2000",     open: 2796.00,  closeOrIntraday: 2838.49,  intraday: true  },
        { region: "EUROPE", index: "STOXX 600",        open: 605.51,   closeOrIntraday: 609.62,   intraday: false },
        { region: "EUROPE", index: "FTSE 100",         open: 10363.93, closeOrIntraday: 10219.11, intraday: false },
        { region: "EUROPE", index: "DAX",              open: 23991.27, closeOrIntraday: 24392.27, intraday: false },
        { region: "EUROPE", index: "CAC 40",           open: 7976.12,  closeOrIntraday: 8062.31,  intraday: false },
        { region: "ASIA",   index: "HangSeng",         open: 26095.88, closeOrIntraday: 25898.61, intraday: false },
        { region: "ASIA",   index: "Shanghai",         open: 4107.51,  closeOrIntraday: 4112.16,  intraday: false },
        { region: "ASIA",   index: "Nikkei 225",       open: 59284.92, closeOrIntraday: 59513.12, intraday: false },
      ],
      narrativeBody:
        "U.S. stocks are rising as the S&P 500 (+0.77%), Dow Jones (+0.52%), Nasdaq (+0.96%), and Russell (+1.52%) on falling oil prices and resilient corporate earnings despite ongoing Middle East tensions. European markets close mixed. CAC (+1.08%), STOXX (+0.68%), and DAX (+1.67%) on strong earnings and easing energy prices, while the FTSE (-1.40%) declined on weakness in HSBC Holdings. Asian markets closed mixed, Nikkei (+0.38%) on tech strength, Hang Seng (-0.76%) on geopolitical tensions, and Shanghai (+0.11%) on strong PMI data and tech gains.",
      outlook:
        "Participants are likely to remain cautious as they monitor developments on U.S.–Iran ceasefire negotiations.",
    },
  },
];