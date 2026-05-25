/**
 * Raw CMS export shape (alternate field names vs `MarketReportSeedData`).
 * Normalized via `marketReportSeedContinuation.ts`.
 */
const DISCLAIMER = `This report is intended solely for informational purposes and should not be interpreted as investment advice or a recommendation to engage in any financial transactions. Aztran Investments accepts no liability for any decisions made or losses incurred based on its use. Always seek independent professional advice before making financial decisions.\n\nThis message and any accompanying documents may contain confidential or privileged information and are intended only for the named recipient. If you are not the intended recipient, please notify the sender immediately, delete this message from your system, and refrain from disclosing, copying, or using any part of it. Electronic communications are not guaranteed to be secure or virus-free; Aztran Investments is not liable for any damage arising from unauthorized access, interception, or the presence of malware.\n\nOpinions expressed that do not relate to the official business of Aztran Investments are those of the author and do not necessarily reflect the views of the firm.`;

export const legacyMarketReportsContinuation = [

  // ─────────────────────────────────────────────────────────────
  // REPORT 1 — Monday, 20th April 2026
  // ─────────────────────────────────────────────────────────────
  {
    // BASICS
    title: "Daily Financial Markets Update",
    reportDate: "2026-04-20",
    displayDate: "Monday, 20TH April 2026",
    status: "Publish immediately",
    sources: "NGX, FMDQ, CBN, Investing.com, Aztran Research",
    disclaimer: DISCLAIMER,

    // MONEY MARKET
    moneyMarket: {
      systemLiquiditySummary:
        "System liquidity opened the week with a surplus of ₦3.56 trillion.",
      ratesTable: [
        { label: "Overnight Policy Rate (%)", today: 22.00, prev: 22.00 },
        { label: "Overnight Rate (%)",        today: 22.23, prev: 22.16 },
      ],
      narrativeBody:
        "System liquidity opened the week with a surplus of ₦3.56 trillion. The Overnight (O/N) rate rose by 7bps to close at 22.23%, while Open Buy-Back (OBB) rate was unchanged, holding steady at 22.00%.",
      outlook:
        "We expect inter-bank rates to be range-bound in the near term.",
    },

    // TREASURY BILLS
    treasuryBills: {
      averageBenchmarkRate: 15.97,
      benchmarkRatesTable: [
        { maturityDate: "7-May-26",  dtm: 17,  discRateToday: 16.33, discRatePrev: 16.33 },
        { maturityDate: "3-Sep-26",  dtm: 136, discRateToday: 15.95, discRatePrev: 15.95 },
        { maturityDate: "8-Apr-27",  dtm: 353, discRateToday: 15.82, discRatePrev: 15.70 },
      ],
      narrativeBody:
        "The T-bills market opened the week on a quiet note with a mildly bearish undertone. The 8-Apr-2027 bill was the sole mover, edging higher by 12bps to 15.82. The average benchmark rate closed flat at 15.97%.",
      outlook:
        "We expect activity to remain muted in the near term, with participants focus on this week NTB's auction.",
    },

    // FGN BONDS
    fgnBonds: {
      averageBenchmarkYield: 15.92,
      bondsTable: [
        { maturityDate: "20-Mar-27", coupon: 16.29, ttm: 0.92, yieldToday: 17.80, yieldPrev: 17.67 },
        { maturityDate: "17-Apr-29", coupon: 14.55, ttm: 2.99, yieldToday: 16.05, yieldPrev: 16.06 },
        { maturityDate: "21-Feb-31", coupon: 18.50, ttm: 4.84, yieldToday: 16.60, yieldPrev: 16.36 },
        { maturityDate: "25-Jun-32", coupon: 12.50, ttm: 6.19, yieldToday: 16.63, yieldPrev: 16.49 },
        { maturityDate: "15-May-33", coupon: 12.50, ttm: 7.07, yieldToday: 16.61, yieldPrev: 16.37 },
        { maturityDate: "21-Feb-34", coupon: 19.00, ttm: 7.85, yieldToday: 16.28, yieldPrev: 16.28 },
        { maturityDate: "29-Jan-35", coupon: 12.50, ttm: 8.78, yieldToday: 16.28, yieldPrev: 16.28 },
        { maturityDate: "21-Jun-38", coupon: 15.45, ttm: 12.18, yieldToday: 15.24, yieldPrev: 15.24 },
        { maturityDate: "26-Apr-49", coupon: 14.80, ttm: 23.03, yieldToday: 14.46, yieldPrev: 14.46 },
        { maturityDate: "27-Mar-50", coupon: 12.98, ttm: 23.95, yieldToday: 14.39, yieldPrev: 14.39 },
        { maturityDate: "21-Jun-53", coupon: 15.70, ttm: 27.19, yieldToday: 14.48, yieldPrev: 14.48 },
      ],
      narrativeBody:
        "The FGN bond market opened the week on a softer tone, as investors remain cautious over the current geopolitical development. The 21-Feb-2031 and 15-May-2033 bonds led the selloff, rising by 24bps each to 16.60% and 16.61% respectively. The average benchmark yield rose by 8bps, closing at 15.92%.",
      outlook:
        "We expect mild pressure to persist in the near term, with sentiment remaining cautious as participants reprice risk across the curve.",
    },

    // SSA EUROBONDS
    ssaEurobonds: {
      bondsTable: [
        // Republic Of Nigeria
        { sovereign: "Republic Of Nigeria", maturityDate: "28-Nov-27", coupon: 7.63, ttm: 1.61, yieldToday: 5.91, yieldPrev: 5.87 },
        { sovereign: "Republic Of Nigeria", maturityDate: "16-Feb-32", coupon: 6.50, ttm: 5.83, yieldToday: 6.92, yieldPrev: 6.93 },
        { sovereign: "Republic Of Nigeria", maturityDate: "28-Nov-47", coupon: 7.88, ttm: 21.62, yieldToday: 7.95, yieldPrev: 7.93 },
        { sovereign: "Republic Of Nigeria", maturityDate: "21-Jan-49", coupon: 9.25, ttm: 22.77, yieldToday: 8.13, yieldPrev: 8.14 },
        // Republic Of Angola
        { sovereign: "Republic Of Angola",  maturityDate: "09-May-28", coupon: 9.50, ttm: 2.05, yieldToday: 7.09, yieldPrev: 7.05 },
        { sovereign: "Republic Of Angola",  maturityDate: "26-Nov-29", coupon: 8.00, ttm: 3.61, yieldToday: 7.65, yieldPrev: 7.67 },
        { sovereign: "Republic Of Angola",  maturityDate: "14-Apr-32", coupon: 8.75, ttm: 5.99, yieldToday: 8.43, yieldPrev: 8.47 },
        { sovereign: "Republic Of Angola",  maturityDate: "26-Nov-49", coupon: 9.13, ttm: 23.62, yieldToday: 9.96, yieldPrev: 9.96 },
        // Arab Republic Of Egypt
        { sovereign: "Arab Republic Of Egypt", maturityDate: "31-Jan-27", coupon: 3.88, ttm: 0.78, yieldToday: 5.64, yieldPrev: 5.73 },
        { sovereign: "Arab Republic Of Egypt", maturityDate: "15-Jan-32", coupon: 7.05, ttm: 5.74, yieldToday: 7.02, yieldPrev: 7.18 },
        { sovereign: "Arab Republic Of Egypt", maturityDate: "20-Nov-59", coupon: 8.15, ttm: 33.61, yieldToday: 9.08, yieldPrev: 9.13 },
      ],
      narrativeBody:
        "The SSA Eurobond market traded on a broadly bullish note today, despite the partial resurgence in global tensions following the setback in peace talks. Sentiment was largely positive across the region, though Nigeria bucked the trend marginally, with yields edging higher by 1bp to 7.23%. Angola tightened by 1bp to 8.28%, while Egypt led gains, declining by 10bps to 7.25%.",
      outlook:
        "We expect sentiment to remain cautiously optimistic, with sovereign curves continuing to track U.S.-Iran developments and broader global risk appetite.",
    },

    // LOCAL EQUITIES
    localEquities: {
      asiLevel: 218115.8,
      asiChangePercent: 0.44,
      ytdReturn: 40.17,
      marketCap: "₦140.202 trillion",
      turnoverValue: "₦36.70 billion",
      volumeTraded: "677.133 million units",
      marketBreadthRatio: 1.05,
      gainers: 36,
      losers: 34,
      topGainersTable: [
        { ticker: "NAHCO",      open: 220.00, close: 242.00 },
        { ticker: "UNIONDICON", open: 16.50,  close: 18.15  },
        { ticker: "FIDELITYBK", open: 20.05,  close: 22.05  },
        { ticker: "TRANSEXPR",  open: 6.05,   close: 6.65   },
        { ticker: "ACCESSCORP", open: 29.90,  close: 32.85  },
      ],
      topLosersTable: [
        { ticker: "LIVINGTRUST", open: 4.10,   close: 3.69   },
        { ticker: "STANBIC",     open: 188.55, close: 169.70 },
        { ticker: "TRANSPOWER",  open: 302.90, close: 272.70 },
        { ticker: "ABBEYBDS",    open: 8.10,   close: 7.30   },
        { ticker: "GUINEAINS",   open: 1.25,   close: 1.14   },
      ],
      narrativeBody:
        "The local bourse opened the week on a positive note, as the NGX All-Share Index (ASI) gained 0.44% to settle at 218,115.8 points, while YTD return came in at 40.17%. Sectoral performance for the opened the week mixed but largely positive, with most key indices recording gains, reflecting sustained buying interest across the market. The Banking sector led the advancers, rising by 2.56%, supported by strong buying in Fidelity, which gained 9.98%. The Oil and Gas sector followed with a 0.75% increase, driven by gains in JAYPAULGOLD, which advanced by 2.77%. The Industrial Goods sector also posted modest gains, edging up by 0.35%, with WAPCO leading the sector after appreciating by 2.47%. Similarly, the Consumer Goods sector closed higher by 0.38%, buoyed by a 10.00% rise in UNIONDICON. On the downside, the Insurance sector closed the day flat, remaining unchanged as gains and losses across constituent stocks balanced out. Market breadth stood at 1.05x with 36 gainers and 34 losers. Market capitalization improved to ₦140.202 trillion from ₦139.826 trillion. Trading activity opened the week bearish, with turnover value decreased to ₦36.70 billion from ₦54.35 billion while volume traded declined to 677.133 million units from 1,258 million units.",
      outlook:
        "We are likely to see earnings induced upward repricing with some profit-taking along the way.",
    },

    // GLOBAL MARKETS
    globalMarkets: {
      intradayNoteActive: true,
      indicesTable: [
        { region: "U.S",    index: "S&P 500",            open: 7126.06,  closeOrIntraday: 7101.25,  intraday: true  },
        { region: "U.S",    index: "Dow Jones",          open: 49447.43, closeOrIntraday: 49389.52, intraday: true  },
        { region: "U.S",    index: "Nasdaq Composite",   open: 24468.48, closeOrIntraday: 24337.88, intraday: true  },
        { region: "U.S",    index: "Russell 2000",       open: 2776.90,  closeOrIntraday: 2787.88,  intraday: true  },
        { region: "EUROPE", index: "STOXX 600",          open: 626.58,   closeOrIntraday: 620.74,   intraday: false },
        { region: "EUROPE", index: "FTSE 100",           open: 10667.63, closeOrIntraday: 10609.08, intraday: false },
        { region: "EUROPE", index: "DAX",                open: 24702.24, closeOrIntraday: 24423.94, intraday: false },
        { region: "EUROPE", index: "CAC 40",             open: 8425.13,  closeOrIntraday: 8321.96,  intraday: false },
        { region: "ASIA",   index: "HangSeng",           open: 26160.33, closeOrIntraday: 26361.07, intraday: false },
        { region: "ASIA",   index: "Shanghai",           open: 4051.43,  closeOrIntraday: 4082.13,  intraday: false },
        { region: "ASIA",   index: "Nikkei 225",         open: 58475.90, closeOrIntraday: 58824.89, intraday: false },
      ],
      narrativeBody:
        "The U.S. market is trading mixed, with the Russell (+0.40%) supported by ongoing demand for small-cap stocks, while the S&P (-0.35%), Nasdaq (-0.53%), and Dow Jones (-0.12%) amid renewed U.S.–Iran geopolitical tensions, which dampened overall risk sentiment despite higher oil prices boosting energy stocks. European markets opened the week bearish, with the STOXX(-0.93%), CAC (-1.22%), DAX(-1.13%), and FTSE(-0.55%) under pressure amid renewed US-Iran tensions and rising oil prices, which fuelled inflation and growth concerns despite strength in energy stocks. Asian markets opened the week bullish, with the Nikkei up 0.6% on AI and earnings optimism, the Hang Seng rose by 0.8% on supportive China policy signals, and the Shanghai gained by 0.76% after the PBOC reaffirmed its accommodative stance.",
      outlook:
        "Participants are likely to stay cautious as they await developments on the US-Iran ceasefire negotiations.",
    },
  },

  // ─────────────────────────────────────────────────────────────
  // REPORT 2 — Tuesday, 21st April 2026
  // ─────────────────────────────────────────────────────────────
  {
    // BASICS
    title: "Daily Financial Markets Update",
    reportDate: "2026-04-21",
    displayDate: "Tuesday, 21ST April 2026",
    status: "Publish immediately",
    sources: "NGX, FMDQ, CBN, Investing.com, Aztran Research",
    disclaimer: DISCLAIMER,

    // MONEY MARKET
    moneyMarket: {
      systemLiquiditySummary:
        "System liquidity opened with a surplus of ₦5.87 trillion.",
      ratesTable: [
        { label: "Overnight Policy Rate (%)", today: 22.00, prev: 22.00 },
        { label: "Overnight Rate (%)",        today: 22.29, prev: 22.23 },
      ],
      narrativeBody:
        "System liquidity opened with a surplus of ₦5.87 trillion. The Overnight (O/N) rate rose by 6bps to close at 22.29%, while Open Buy-Back (OBB) rate was unchanged, holding steady at 22.00%.",
      outlook:
        "We expect inter-bank rates to be range-bound in the near term.",
    },

    // TREASURY BILLS
    treasuryBills: {
      averageBenchmarkRate: 15.99,
      benchmarkRatesTable: [
        { maturityDate: "7-May-26",  dtm: 16,  discRateToday: 16.33, discRatePrev: 16.33 },
        { maturityDate: "7-Jan-27",  dtm: 261, discRateToday: 16.37, discRatePrev: 16.25 },
        { maturityDate: "8-Apr-27",  dtm: 352, discRateToday: 15.90, discRatePrev: 15.82 },
      ],
      narrativeBody:
        "The T-bills market traded on a bearish note today as market participants repriced ahead to today's OMO auction. The CBN conducted an OMO auction, with the 140-day bill heavily oversubscribed at ₦1.25trn, allotted at a stop rate of 19.91%. The average benchmark rate rose by 2bps, closing at 15.99%.",
      outlook:
        "We expect a calm session following the NTB auction scheduled for tomorrow.",
    },

    // FGN BONDS
    fgnBonds: {
      averageBenchmarkYield: 15.92,
      bondsTable: [
        { maturityDate: "20-Mar-27", coupon: 16.29, ttm: 0.91, yieldToday: 17.88, yieldPrev: 17.80 },
        { maturityDate: "17-Apr-29", coupon: 14.55, ttm: 2.99, yieldToday: 16.04, yieldPrev: 16.05 },
        { maturityDate: "21-Feb-31", coupon: 18.50, ttm: 4.84, yieldToday: 16.60, yieldPrev: 16.60 },
        { maturityDate: "25-Jun-32", coupon: 12.50, ttm: 6.18, yieldToday: 16.56, yieldPrev: 16.63 },
        { maturityDate: "15-May-33", coupon: 12.50, ttm: 7.07, yieldToday: 16.61, yieldPrev: 16.61 },
        { maturityDate: "21-Feb-34", coupon: 19.00, ttm: 7.84, yieldToday: 16.28, yieldPrev: 16.28 },
        { maturityDate: "29-Jan-35", coupon: 12.50, ttm: 8.78, yieldToday: 16.28, yieldPrev: 16.28 },
        { maturityDate: "21-Jun-38", coupon: 15.45, ttm: 12.18, yieldToday: 15.24, yieldPrev: 15.24 },
        { maturityDate: "26-Apr-49", coupon: 14.80, ttm: 23.03, yieldToday: 14.46, yieldPrev: 14.46 },
        { maturityDate: "27-Mar-50", coupon: 12.98, ttm: 23.95, yieldToday: 14.39, yieldPrev: 14.39 },
        { maturityDate: "21-Jun-53", coupon: 15.70, ttm: 27.19, yieldToday: 14.48, yieldPrev: 14.48 },
      ],
      narrativeBody:
        "The FGN bond market traded on a quiet note today, with minimal activity across the curve. The 20-Mar-2027 bond edged higher by 7bps to 17.88%, while the 25-Jun-2032 bond eased by 7bps to 16.56%. The average benchmark yield closed flat at 15.92%.",
      outlook:
        "We expect activity to remain cautious, with participants awaiting fresh catalysts to drive direction.",
    },

    // SSA EUROBONDS
    ssaEurobonds: {
      bondsTable: [
        // Republic Of Nigeria
        { sovereign: "Republic Of Nigeria", maturityDate: "28-Nov-27", coupon: 7.63, ttm: 1.61, yieldToday: 5.92, yieldPrev: 5.91 },
        { sovereign: "Republic Of Nigeria", maturityDate: "16-Feb-32", coupon: 6.50, ttm: 5.83, yieldToday: 6.93, yieldPrev: 6.92 },
        { sovereign: "Republic Of Nigeria", maturityDate: "28-Nov-47", coupon: 7.88, ttm: 21.62, yieldToday: 7.99, yieldPrev: 7.95 },
        { sovereign: "Republic Of Nigeria", maturityDate: "21-Jan-49", coupon: 9.25, ttm: 22.77, yieldToday: 8.15, yieldPrev: 8.13 },
        // Republic Of Angola
        { sovereign: "Republic Of Angola",  maturityDate: "09-May-28", coupon: 9.50, ttm: 2.05, yieldToday: 7.15, yieldPrev: 7.09 },
        { sovereign: "Republic Of Angola",  maturityDate: "26-Nov-29", coupon: 8.00, ttm: 3.60, yieldToday: 7.67, yieldPrev: 7.65 },
        { sovereign: "Republic Of Angola",  maturityDate: "14-Apr-32", coupon: 8.75, ttm: 5.99, yieldToday: 8.48, yieldPrev: 8.43 },
        { sovereign: "Republic Of Angola",  maturityDate: "26-Nov-49", coupon: 9.13, ttm: 23.62, yieldToday: 10.01, yieldPrev: 9.96 },
        // Arab Republic Of Egypt
        { sovereign: "Arab Republic Of Egypt", maturityDate: "31-Jan-27", coupon: 3.88, ttm: 0.78, yieldToday: 5.64, yieldPrev: 5.64 },
        { sovereign: "Arab Republic Of Egypt", maturityDate: "15-Jan-32", coupon: 7.05, ttm: 5.74, yieldToday: 7.04, yieldPrev: 7.02 },
        { sovereign: "Arab Republic Of Egypt", maturityDate: "20-Nov-59", coupon: 8.15, ttm: 33.61, yieldToday: 9.09, yieldPrev: 9.08 },
      ],
      narrativeBody:
        "The SSA Eurobond market traded on a bearish note today, as persistent geopolitical tensions surrounding the U.S.-Iran standoff and broader global trade uncertainty weighed on risk sentiment. Sovereign yields widened across the region, with Nigeria edging higher by 2bps to 7.25%. Angola rising by 5bps to 8.33%, while Egypt edged up marginally by 1bp to 7.25%.",
      outlook:
        "Sentiment is expected to remain cautious, with sovereign curves staying sensitive to geopolitical developments and global risk appetite.",
    },

    // LOCAL EQUITIES
    localEquities: {
      asiLevel: 218256.6,
      asiChangePercent: 0.06,
      ytdReturn: 40.26,
      marketCap: "₦140.523 trillion",
      turnoverValue: "₦44.862 billion",
      volumeTraded: "842.476 million units",
      marketBreadthRatio: 0.58,
      gainers: 25,
      losers: 43,
      topGainersTable: [
        { ticker: "NASCON",     open: 156.00, close: 171.60 },
        { ticker: "UNIONDICON", open: 18.15,  close: 19.95  },
        { ticker: "WAPCO",      open: 249.00, close: 273.00 },
        { ticker: "TRANSEXPR",  open: 6.65,   close: 7.20   },
        { ticker: "UACN",       open: 102.00, close: 110.00 },
      ],
      topLosersTable: [
        { ticker: "LEGENDINT",  open: 6.25,   close: 5.63   },
        { ticker: "ABBEYBDS",   open: 7.30,   close: 6.60   },
        { ticker: "STANBIC",    open: 169.70, close: 154.50 },
        { ticker: "ACCESSCORP", open: 32.85,  close: 29.95  },
        { ticker: "VERITASKAP", open: 2.00,   close: 1.85   },
      ],
      narrativeBody:
        "The local bourse closed the day on a positive note, as the NGX All-Share Index (ASI) gained 0.06% to settle at 218,256.6 points, while YTD return came in at 40.26%. Sectoral performance closed the day on a mixed note, with a slight positive bias as gains in some key indices were offset by losses in others, reflecting cautious buying interest across the market. The Banking sector emerged as the laggard, declining by 1.3%, pressured by significant sell-offs in STANBIC, which dropped by 8.96%. The Oil and Gas sector also recorded a marginal loss of 0.09%, driven by a decline in JAYPAULGOLD, which fell by 6.29%. On the positive side, the Industrial Goods sector posted gains of 1.64%, supported by WAPCO, which appreciated by 9.64% marking its second gain for the week. Meanwhile, the Consumer Goods sector closed lower by 0.44% following a 3.1% decline in INTBREW, while the Insurance sector recorded a slight gain of 0.19%, buoyed by a 4.68% increase in NEM. Market breadth stood at 0.58x with 25 gainers and 43 losers. Market capitalization improved slightly to ₦140.523 trillion from ₦140.202 trillion. Trading activity closed the day bullish, with turnover value increased to ₦44.862 billion from ₦36.70 billion while volume traded increased to 842.476 million units from 677.133 million units.",
      outlook:
        "We are likely to see earnings induced upward repricing with some profit-taking along the way.",
    },

    // GLOBAL MARKETS
    globalMarkets: {
      intradayNoteActive: true,
      indicesTable: [
        { region: "U.S",    index: "S&P 500",          open: 7109.14,  closeOrIntraday: 7092.40,  intraday: true  },
        { region: "U.S",    index: "Dow Jones",        open: 49442.56, closeOrIntraday: 49394.93, intraday: true  },
        { region: "U.S",    index: "Nasdaq Composite", open: 24404.39, closeOrIntraday: 24369.85, intraday: true  },
        { region: "U.S",    index: "Russell 2000",     open: 2792.96,  closeOrIntraday: 2781.35,  intraday: true  },
        { region: "EUROPE", index: "STOXX 600",        open: 621.46,   closeOrIntraday: 616.56,   intraday: false },
        { region: "EUROPE", index: "FTSE 100",         open: 10609.08, closeOrIntraday: 10498.09, intraday: false },
        { region: "EUROPE", index: "DAX",              open: 24417.08, closeOrIntraday: 24295.01, intraday: false },
        { region: "EUROPE", index: "CAC 40",           open: 8331.04,  closeOrIntraday: 8235.72,  intraday: false },
        { region: "ASIA",   index: "HangSeng",         open: 26361.07, closeOrIntraday: 26487.48, intraday: false },
        { region: "ASIA",   index: "Shanghai",         open: 4082.13,  closeOrIntraday: 4085.08,  intraday: false },
        { region: "ASIA",   index: "Nikkei 225",       open: 58824.89, closeOrIntraday: 59349.17, intraday: false },
      ],
      narrativeBody:
        "The U.S. market is trading bearish, with the Russell (-0.42%), S&P (-0.24%), Nasdaq (-0.14%), and Dow Jones (-0.10%) pressured by a sharp rise in oil prices amid renewed U.S.–Iran ceasefire uncertainty, which weighed on investor sentiment despite earlier support from strong earnings and retail sales data. European markets closed broadly lower, with the STOXX(-0.79%), CAC (-1.14%), DAX(-0.50%), and FTSE(-1.05%) as uncertainty over U.S.–Iran talks, Strait of Hormuz disruptions, and rising oil prices weighed on investor sentiment across the region. Asian markets closed the day bullish, with the Nikkei (+0.89%), Hang Seng (+0.48%) and Shanghai (+0.07%) as optimism over AI-driven growth, supportive corporate earnings, and accommodative Chinese monetary policy collectively boosted investor confidence across the region.",
      outlook:
        "Participants are likely to stay cautious as they await developments on the US-Iran ceasefire negotiations.",
    },
  },

  // ─────────────────────────────────────────────────────────────
  // REPORT 3 — Wednesday, 22nd April 2026
  // ─────────────────────────────────────────────────────────────
  {
    // BASICS
    title: "Daily Financial Markets Update",
    reportDate: "2026-04-22",
    displayDate: "Wednesday, 22ND April 2026",
    status: "Publish immediately",
    sources: "NGX, FMDQ, CBN, Investing.com, Aztran Research",
    disclaimer: DISCLAIMER,

    // MONEY MARKET
    moneyMarket: {
      systemLiquiditySummary:
        "System liquidity opened with a surplus of ₦3.95 trillion.",
      ratesTable: [
        { label: "Overnight Policy Rate (%)", today: 22.00, prev: 22.00 },
        { label: "Overnight Rate (%)",        today: 22.25, prev: 22.29 },
      ],
      narrativeBody:
        "System liquidity opened with a surplus of ₦3.95 trillion. The Overnight (O/N) rate declined by 4bps to close at 22.25%, while Open Buy-Back (OBB) rate was unchanged, holding steady at 22.00%.",
      outlook:
        "We expect inter-bank rates to be range-bound in the near term.",
    },

    // TREASURY BILLS
    treasuryBills: {
      averageBenchmarkRate: 15.98,
      benchmarkRatesTable: [
        { maturityDate: "7-May-26",  dtm: 15,  discRateToday: 16.33, discRatePrev: 16.33 },
        { maturityDate: "18-Feb-27", dtm: 302, discRateToday: 16.00, discRatePrev: 16.18 },
        { maturityDate: "8-Apr-27",  dtm: 351, discRateToday: 15.90, discRatePrev: 15.90 },
      ],
      narrativeBody:
        "The T-bills market traded on a quiet note today, with the 18-Feb-2027 bill declining by 18bps to 16.00% as the sole mover. The DMO conducted an NTB auction with a total offer of ₦750bn, allotting ₦894.16bn across all tenors. The 364-day bill was the most sought after, with a stop rate of 16.199%. The average benchmark rate declined by 1bp, closing at 15.98%.",
      outlook:
        "We expect sentiment to remain supported, with unmet auction demand likely to filter into the secondary market.",
    },

    // FGN BONDS
    fgnBonds: {
      averageBenchmarkYield: 15.93,
      bondsTable: [
        { maturityDate: "20-Mar-27", coupon: 16.29, ttm: 0.91, yieldToday: 17.87, yieldPrev: 17.88 },
        { maturityDate: "17-Apr-29", coupon: 14.55, ttm: 2.99, yieldToday: 16.04, yieldPrev: 16.04 },
        { maturityDate: "21-Feb-31", coupon: 18.50, ttm: 4.84, yieldToday: 16.60, yieldPrev: 16.60 },
        { maturityDate: "25-Jun-32", coupon: 12.50, ttm: 6.18, yieldToday: 16.70, yieldPrev: 16.56 },
        { maturityDate: "15-May-33", coupon: 12.50, ttm: 7.07, yieldToday: 16.72, yieldPrev: 16.61 },
        { maturityDate: "21-Feb-34", coupon: 19.00, ttm: 7.84, yieldToday: 16.28, yieldPrev: 16.28 },
        { maturityDate: "29-Jan-35", coupon: 12.50, ttm: 8.78, yieldToday: 16.28, yieldPrev: 16.28 },
        { maturityDate: "21-Jun-38", coupon: 15.45, ttm: 12.17, yieldToday: 15.24, yieldPrev: 15.24 },
        { maturityDate: "26-Apr-49", coupon: 14.80, ttm: 23.03, yieldToday: 14.46, yieldPrev: 14.46 },
        { maturityDate: "27-Mar-50", coupon: 12.98, ttm: 23.95, yieldToday: 14.39, yieldPrev: 14.39 },
        { maturityDate: "21-Jun-53", coupon: 15.70, ttm: 27.18, yieldToday: 14.48, yieldPrev: 14.48 },
      ],
      narrativeBody:
        "The FGN bond market traded on a slightly bearish note today, with selling pressure concentrated at the mid-curve. The 25-Jun-2032 and 15-May-2033 bonds led the move, rising by 14bps and 10bps to 16.70% and 16.72% respectively. The average benchmark yield rose by 1bp, closing at 15.93%.",
      outlook:
        "We expect activity to remain cautious, with participants awaiting fresh catalysts to drive direction.",
    },

    // SSA EUROBONDS
    ssaEurobonds: {
      bondsTable: [
        // Republic Of Nigeria
        { sovereign: "Republic Of Nigeria", maturityDate: "28-Nov-27", coupon: 7.63, ttm: 1.60, yieldToday: 5.88, yieldPrev: 5.92 },
        { sovereign: "Republic Of Nigeria", maturityDate: "16-Feb-32", coupon: 6.50, ttm: 5.82, yieldToday: 6.89, yieldPrev: 6.93 },
        { sovereign: "Republic Of Nigeria", maturityDate: "28-Nov-47", coupon: 7.88, ttm: 21.62, yieldToday: 8.00, yieldPrev: 7.99 },
        { sovereign: "Republic Of Nigeria", maturityDate: "21-Jan-49", coupon: 9.25, ttm: 22.77, yieldToday: 8.15, yieldPrev: 8.15 },
        // Republic Of Angola
        { sovereign: "Republic Of Angola",  maturityDate: "09-May-28", coupon: 9.50, ttm: 2.05, yieldToday: 7.22, yieldPrev: 7.15 },
        { sovereign: "Republic Of Angola",  maturityDate: "26-Nov-29", coupon: 8.00, ttm: 3.60, yieldToday: 7.69, yieldPrev: 7.67 },
        { sovereign: "Republic Of Angola",  maturityDate: "14-Apr-32", coupon: 8.75, ttm: 5.98, yieldToday: 8.40, yieldPrev: 8.48 },
        { sovereign: "Republic Of Angola",  maturityDate: "26-Nov-49", coupon: 9.13, ttm: 23.61, yieldToday: 10.05, yieldPrev: 10.01 },
        // Arab Republic Of Egypt
        { sovereign: "Arab Republic Of Egypt", maturityDate: "31-Jan-27", coupon: 3.88, ttm: 0.78, yieldToday: 5.71, yieldPrev: 5.64 },
        { sovereign: "Arab Republic Of Egypt", maturityDate: "15-Jan-32", coupon: 7.05, ttm: 5.74, yieldToday: 7.16, yieldPrev: 7.04 },
        { sovereign: "Arab Republic Of Egypt", maturityDate: "20-Nov-59", coupon: 8.15, ttm: 33.60, yieldToday: 9.18, yieldPrev: 9.09 },
      ],
      narrativeBody:
        "The SSA Eurobond market traded on a mixed note today, as investors navigated lingering geopolitical uncertainty surrounding the U.S.-Iran standoff. Angola edged higher by 1bp to 8.34% and Egypt saw the sharpest move, rising by 10bps to 7.35%. Nigeria bucked the trend, with yields declining by 2bps to 7.23%.",
      outlook:
        "Sentiment is expected to remain cautious, with sovereign curves staying sensitive to geopolitical developments and global risk appetite.",
    },

    // LOCAL EQUITIES
    localEquities: {
      asiLevel: 219586.9,
      asiChangePercent: 0.61,
      ytdReturn: 41.11,
      marketCap: "₦141.384 trillion",
      turnoverValue: "₦36.167 billion",
      volumeTraded: "683.684 million units",
      marketBreadthRatio: 1.1,
      gainers: 31,
      losers: 28,
      topGainersTable: [
        { ticker: "CAP",       open: 100.00, close: 110.00 },
        { ticker: "TRANSCOHOT",open: 203.00, close: 223.30 },
        { ticker: "UACN",      open: 110.00, close: 121.00 },
        { ticker: "VITAFOAM",  open: 130.00, close: 143.00 },
        { ticker: "TRANSEXPR", open: 7.20,   close: 7.92   },
      ],
      topLosersTable: [
        { ticker: "NEIMETH",     open: 10.00, close: 9.00  },
        { ticker: "ABBEYBDS",    open: 6.60,  close: 5.95  },
        { ticker: "LIVINGTRUST", open: 3.69,  close: 3.36  },
        { ticker: "ABCTRANS",    open: 6.24,  close: 5.70  },
        { ticker: "HMCALL",      open: 3.85,  close: 3.61  },
      ],
      narrativeBody:
        "The local bourse closed the day on a positive note, as the NGX All-Share Index (ASI) gained 0.61% to settle at 219,586.9 points, while YTD return came in at 41.11%. Sectoral performance closed the day on a bullish note, reflecting cautious but sustained buying interest across the broader market. The Banking sector led the advance, improving by 2.03% on the back of strong accumulation of 5.98% in UBA. The Consumer Goods followed suit, rising by 1.78% bolstered by a 10.00% surge in VITAFOAM. While the Insurance sector gained 1.07%, after a 9.52% rally in SOVRENINS. Elsewhere, the Industrial Goods space appreciated by 0.15% following a maximum daily gain of 10.00% in CAP. While the Oil and Gas sector edged marginally higher by 0.02%, buoyed by a slight uptick in JAPAULGOLD with an increase of 2.24%. Market breadth stood at 1.1x with 31 gainers and 28 losers. Market capitalization improved slightly to ₦141.384 trillion from ₦140.523 trillion. Trading activity closed the day bearish, with turnover value decreased to ₦36.167 billion from ₦44.862 billion while volume traded decreased to 683.684 million units from 842.476 million units.",
      outlook:
        "We are likely to see earnings induced upward repricing with some profit-taking along the way.",
    },

    // GLOBAL MARKETS
    globalMarkets: {
      intradayNoteActive: true,
      indicesTable: [
        { region: "U.S",    index: "S&P 500",          open: 7064.01,  closeOrIntraday: 7121.25,  intraday: true  },
        { region: "U.S",    index: "Dow Jones",        open: 49149.38, closeOrIntraday: 49459.26, intraday: true  },
        { region: "U.S",    index: "Nasdaq Composite", open: 24259.96, closeOrIntraday: 24573.11, intraday: true  },
        { region: "U.S",    index: "Russell 2000",     open: 2764.97,  closeOrIntraday: 2778.43,  intraday: true  },
        { region: "EUROPE", index: "STOXX 600",        open: 616.03,   closeOrIntraday: 613.88,   intraday: false },
        { region: "EUROPE", index: "FTSE 100",         open: 10498.09, closeOrIntraday: 10476.46, intraday: false },
        { region: "EUROPE", index: "DAX",              open: 24270.87, closeOrIntraday: 24194.90, intraday: false },
        { region: "EUROPE", index: "CAC 40",           open: 8235.71,  closeOrIntraday: 8156.43,  intraday: false },
        { region: "ASIA",   index: "HangSeng",         open: 26487.48, closeOrIntraday: 26163.24, intraday: false },
        { region: "ASIA",   index: "Shanghai",         open: 4085.08,  closeOrIntraday: 4106.26,  intraday: false },
        { region: "ASIA",   index: "Nikkei 225",       open: 59349.17, closeOrIntraday: 59585.86, intraday: false },
      ],
      narrativeBody:
        "The U.S. is trading higher, with the Dow Jones (+0.63%), S&P 500 (+0.81%), Nasdaq (+1.29%) and Russell (+0.49%) on relief from the extension of the U.S.–Iran ceasefire and strong corporate earnings, which improved risk sentiment despite lingering geopolitical and inflation concerns. European markets closed bearish, with the STOXX (-0.35%), CAC (-0.96%), DAX (-0.31%), and FTSE (-0.21%) as persistent geopolitical uncertainty, inflation concerns, and weak corporate results weighed on overall investor sentiment. Asian markets closed mixed, with the Nikkei (+0.4%) and Shanghai (+0.52%) on tech-led buying and China's resilience to Middle East risks, while the Hang Seng (-1.22%) as U.S.–Iran uncertainty, rising oil prices, and selling pressure in major tech and EV stocks weighed on sentiment.",
      outlook:
        "Participants are likely to stay cautious as they await developments on the US-Iran ceasefire negotiations.",
    },
  },

  // ─────────────────────────────────────────────────────────────
  // REPORT 4 — Thursday, 23rd April 2026
  // ─────────────────────────────────────────────────────────────
  {
    // BASICS
    title: "Daily Financial Markets Update",
    reportDate: "2026-04-23",
    displayDate: "Thursday, 23RD April 2026",
    status: "Publish immediately",
    sources: "NGX, FMDQ, CBN, Investing.com, Aztran Research",
    disclaimer: DISCLAIMER,

    // MONEY MARKET
    moneyMarket: {
      systemLiquiditySummary:
        "System liquidity opened with a surplus of ₦3.83 trillion.",
      ratesTable: [
        { label: "Overnight Policy Rate (%)", today: 22.00, prev: 22.00 },
        { label: "Overnight Rate (%)",        today: 22.21, prev: 22.25 },
      ],
      narrativeBody:
        "System liquidity opened with a surplus of ₦3.83 trillion. The Overnight (O/N) rate declined by 4bps to close at 22.21%, while Open Buy-Back (OBB) rate was unchanged, holding steady at 22.00%.",
      outlook:
        "We expect inter-bank rates to be range-bound in the near term.",
    },

    // TREASURY BILLS
    treasuryBills: {
      averageBenchmarkRate: 15.98,
      benchmarkRatesTable: [
        { maturityDate: "7-May-26",  dtm: 14,  discRateToday: 16.33, discRatePrev: 16.33 },
        { maturityDate: "7-Jan-27",  dtm: 259, discRateToday: 16.27, discRatePrev: 16.37 },
        { maturityDate: "8-Apr-27",  dtm: 350, discRateToday: 16.00, discRatePrev: 15.90 },
      ],
      narrativeBody:
        "The T-bills market traded on a quiet note today, with mixed pricing action across the curve. The 7-Jan-2027 bill eased by 9bps to 16.27%, while the 8-Apr-2027 bill edged higher by 10bps to 16.00%. The average benchmark rate declined by 1bp, closing at 15.98%.",
      outlook:
        "We expect a relatively active session tomorrow supported by elevated system liquidity.",
    },

    // FGN BONDS
    fgnBonds: {
      averageBenchmarkYield: 15.94,
      bondsTable: [
        { maturityDate: "20-Mar-27", coupon: 16.29, ttm: 0.91, yieldToday: 17.94, yieldPrev: 17.87 },
        { maturityDate: "17-Apr-29", coupon: 14.55, ttm: 2.99, yieldToday: 16.52, yieldPrev: 16.04 },
        { maturityDate: "21-Feb-31", coupon: 18.50, ttm: 4.84, yieldToday: 16.60, yieldPrev: 16.60 },
        { maturityDate: "25-Jun-32", coupon: 12.50, ttm: 6.18, yieldToday: 16.70, yieldPrev: 16.70 },
        { maturityDate: "15-May-33", coupon: 12.50, ttm: 7.07, yieldToday: 16.71, yieldPrev: 16.72 },
        { maturityDate: "21-Feb-34", coupon: 19.00, ttm: 7.84, yieldToday: 16.28, yieldPrev: 16.28 },
        { maturityDate: "29-Jan-35", coupon: 12.50, ttm: 8.78, yieldToday: 16.28, yieldPrev: 16.28 },
        { maturityDate: "21-Jan-42", coupon: 15.45, ttm: 15.76, yieldToday: 14.08, yieldPrev: 14.60 },
        { maturityDate: "26-Apr-49", coupon: 14.80, ttm: 23.02, yieldToday: 14.46, yieldPrev: 14.46 },
        { maturityDate: "27-Mar-50", coupon: 12.98, ttm: 23.94, yieldToday: 14.39, yieldPrev: 14.39 },
        { maturityDate: "21-Jun-53", coupon: 15.70, ttm: 27.18, yieldToday: 14.48, yieldPrev: 14.48 },
      ],
      narrativeBody:
        "The FGN bond market traded on a mixed note today. The 17-Apr-2029 bond was the standout mover, rising sharply by 47bps to 16.52%, while the 20-Mar-2027 bond edged higher by 7bps to 17.94%. On the other hand, the 21-Jan-2042 bond bucked the trend, easing by 52bps to 14.08%. The average benchmark yield rose by 1bp, closing at 15.94%.",
      outlook:
        "We expect activity to remain cautious with participants look ahead to the upcoming bond auction.",
    },

    // SSA EUROBONDS
    ssaEurobonds: {
      bondsTable: [
        // Republic Of Nigeria
        { sovereign: "Republic Of Nigeria", maturityDate: "28-Nov-27", coupon: 7.63, ttm: 1.60, yieldToday: 5.95, yieldPrev: 5.88 },
        { sovereign: "Republic Of Nigeria", maturityDate: "16-Feb-32", coupon: 6.50, ttm: 5.82, yieldToday: 6.83, yieldPrev: 6.89 },
        { sovereign: "Republic Of Nigeria", maturityDate: "28-Nov-47", coupon: 7.88, ttm: 21.61, yieldToday: 7.91, yieldPrev: 8.00 },
        { sovereign: "Republic Of Nigeria", maturityDate: "21-Jan-49", coupon: 9.25, ttm: 22.76, yieldToday: 8.11, yieldPrev: 8.15 },
        // Republic Of Angola
        { sovereign: "Republic Of Angola",  maturityDate: "09-May-28", coupon: 9.50, ttm: 2.05, yieldToday: 7.08, yieldPrev: 7.22 },
        { sovereign: "Republic Of Angola",  maturityDate: "26-Nov-29", coupon: 8.00, ttm: 3.60, yieldToday: 7.59, yieldPrev: 7.69 },
        { sovereign: "Republic Of Angola",  maturityDate: "14-Apr-32", coupon: 8.75, ttm: 5.98, yieldToday: 8.26, yieldPrev: 8.40 },
        { sovereign: "Republic Of Angola",  maturityDate: "26-Nov-49", coupon: 9.13, ttm: 23.61, yieldToday: 9.98, yieldPrev: 10.05 },
        // Arab Republic Of Egypt
        { sovereign: "Arab Republic Of Egypt", maturityDate: "31-Jan-27", coupon: 3.88, ttm: 0.78, yieldToday: 5.86, yieldPrev: 5.71 },
        { sovereign: "Arab Republic Of Egypt", maturityDate: "15-Jan-32", coupon: 7.05, ttm: 5.73, yieldToday: 7.28, yieldPrev: 7.16 },
        { sovereign: "Arab Republic Of Egypt", maturityDate: "20-Nov-59", coupon: 8.15, ttm: 33.60, yieldToday: 9.29, yieldPrev: 9.18 },
      ],
      narrativeBody:
        "The SSA Eurobond market traded on a positive note today, as shifting geopolitical dynamics surrounding the U.S.-Iran standoff drove contrasting price action across the region. Nigeria declined by 3bps to 7.20%, Angola tightened sharply by 11bps to 8.24%. Egypt bucked the trend, seeing the sharpest move in the opposite direction, rising by 13bps to 7.48%.",
      outlook:
        "Sentiment is expected to remain cautious, with sovereign curves staying sensitive to geopolitical developments and global risk appetite.",
    },

    // LOCAL EQUITIES
    localEquities: {
      asiLevel: 222837.7,
      asiChangePercent: 1.48,
      ytdReturn: 43.20,
      marketCap: "₦143.477 trillion",
      turnoverValue: "₦38.123 billion",
      volumeTraded: "667.937 million units",
      marketBreadthRatio: 0.94,
      gainers: 31,
      losers: 33,
      topGainersTable: [
        { ticker: "UNILEVER",   open: 110.00, close: 121.00 },
        { ticker: "UACN",       open: 121.00, close: 133.10 },
        { ticker: "TRANSEXPR",  open: 7.92,   close: 8.71   },
        { ticker: "TANTALIZER", open: 3.47,   close: 3.81   },
        { ticker: "DANGSUGAR",  open: 66.95,  close: 73.50  },
      ],
      topLosersTable: [
        { ticker: "MCNICHOLS",  open: 7.15,  close: 6.44  },
        { ticker: "MULTIVERSE", open: 25.90, close: 23.35 },
        { ticker: "WAPIC",      open: 2.70,  close: 2.45  },
        { ticker: "ABBEYBDS",   open: 5.95,  close: 5.40  },
        { ticker: "JAPAULGOLD", open: 3.20,  close: 3.01  },
      ],
      narrativeBody:
        "The local bourse closed the day on a positive note, as the NGX All-Share Index (ASI) gained 1.48% to settle at 222,837.7 points, while YTD return came in at 43.20%. Sectoral performance close the day predominantly on a bullish note, highlighting cautious yet consistent buying interest across the broader market. The Banking sector spearheaded the gains, climbing by 1.53% driven by a 3.47% buying interest in ZENITH. The Consumer Goods index followed closely, advancing by 1.19% after a strong of 10.00% gain in UNILEVER. Elsewhere, the Industrial Goods space appreciated by 1.03%, propelled by a 4.55% gain in CAP. Conversely, the Oil and Gas sector edged marginally lower by 0.06%, pressured by a 5.94% decline in JAPAULGOLD. while, the Insurance sector retreated by 0.91%, weighed down by a sharp 9.26% sell-off in WAPIC. Market breadth stood at 0.94x with 31 gainers and 33 losers. Market capitalization improved slightly to ₦143.477 trillion from ₦141.384 trillion. Trading activity closed the day mixed, with turnover value increased to ₦38.123 billion from ₦36.167 billion while volume traded decreased to 667.937 million units from 683.684 million units.",
      outlook:
        "We are likely to see earnings induced upward repricing with some profit-taking along the way.",
    },

    // GLOBAL MARKETS
    globalMarkets: {
      intradayNoteActive: true,
      indicesTable: [
        { region: "U.S",    index: "S&P 500",          open: 7137.90,  closeOrIntraday: 7135.41,  intraday: true  },
        { region: "U.S",    index: "Dow Jones",        open: 49490.03, closeOrIntraday: 49395.56, intraday: true  },
        { region: "U.S",    index: "Nasdaq Composite", open: 24657.57, closeOrIntraday: 24578.06, intraday: true  },
        { region: "U.S",    index: "Russell 2000",     open: 2785.38,  closeOrIntraday: 2786.15,  intraday: true  },
        { region: "EUROPE", index: "STOXX 600",        open: 613.88,   closeOrIntraday: 614.63,   intraday: false },
        { region: "EUROPE", index: "FTSE 100",         open: 10476.46, closeOrIntraday: 10457.01, intraday: false },
        { region: "EUROPE", index: "DAX",              open: 24194.90, closeOrIntraday: 24180.68, intraday: false },
        { region: "EUROPE", index: "CAC 40",           open: 8156.43,  closeOrIntraday: 8227.32,  intraday: false },
        { region: "ASIA",   index: "HangSeng",         open: 26163.24, closeOrIntraday: 25915.20, intraday: false },
        { region: "ASIA",   index: "Shanghai",         open: 4106.26,  closeOrIntraday: 4093.25,  intraday: false },
        { region: "ASIA",   index: "Nikkei 225",       open: 59585.86, closeOrIntraday: 59140.23, intraday: false },
      ],
      narrativeBody:
        "The U.S. is trading mixed, with the Russell (+0.03%) on continued appetite for small-cap stocks and selective bargain hunting, while the S&P (-0.03%), Dow Jones (-0.19%), and Nasdaq (-0.32%) are lower amid Middle East geopolitical uncertainty, rising oil prices, and mixed corporate earnings. European markets closed mixed, with CAC (+0.87%) and STOXX (+0.12%), on strong earnings, while DAX (-0.06%), and FTSE (-0.19%) as escalating Middle East tensions, rising energy prices, weak PMI data, and cautious corporate updates weighed on broader investor sentiment. Asian markets closed lower, with the Shanghai (-0.32%), Hang Seng (-0.95%), and Nikkei (-0.75%) as profit-taking after recent highs, a lack of fresh catalysts, cautious positioning ahead of key data, and lingering U.S.–Iran geopolitical uncertainty weighed on overall risk sentiment.",
      outlook:
        "Participants are likely to stay cautious as they monitor developments on the US-Iran ceasefire negotiations.",
    },
  },

  // ─────────────────────────────────────────────────────────────
  // REPORT 5 — Friday, 24th April 2026
  // ─────────────────────────────────────────────────────────────
  {
    // BASICS
    title: "Daily Financial Markets Update",
    reportDate: "2026-04-24",
    displayDate: "Friday, 24TH April 2026",
    status: "Publish immediately",
    sources: "NGX, FMDQ, CBN, Investing.com, Aztran Research",
    disclaimer: DISCLAIMER,

    // MONEY MARKET
    moneyMarket: {
      systemLiquiditySummary:
        "System liquidity rose by 3.45 to close the week with a surplus of ₦3.97 trillion.",
      ratesTable: [
        { label: "Overnight Policy Rate (%)", today: 22.00, prev: 22.00 },
        { label: "Overnight Rate (%)",        today: 22.20, prev: 22.16 },
      ],
      narrativeBody:
        "System liquidity rose by 3.45 to close the week with a surplus of ₦3.97 trillion. The Overnight (O/N) rate rose by 4bps to close the week at 22.20%, while Open Buy-Back (OBB) rate was unchanged, holding steady at 22.00%.",
      outlook:
        "We expect inter-bank rates to be range-bound in the near term.",
    },

    // TREASURY BILLS
    treasuryBills: {
      averageBenchmarkRate: 15.99,
      benchmarkRatesTable: [
        { maturityDate: "7-May-26",  dtm: 13,  discRateToday: 16.33, discRatePrev: 16.33 },
        { maturityDate: "7-Jan-27",  dtm: 258, discRateToday: 16.27, discRatePrev: 16.25 },
        { maturityDate: "8-Apr-27",  dtm: 349, discRateToday: 16.00, discRatePrev: 15.70 },
      ],
      narrativeBody:
        "The T-bills market ended the week on a bearish note, with selling pressure emerging at the long end of the curve. The 8-Apr-2027 bill led the move, rising by 30bps to 16.00%, while the 7-Jan-2027 bill edged marginally higher by 3bps to 16.27%. The 7-May-2026 bill remained unchanged. The average benchmark rate rose by 2bps, closing at 15.99%.",
      outlook:
        "We expect activity to remain cautious in the near term, with participants seeking fresh catalysts to drive direction into the new week.",
    },

    // FGN BONDS
    fgnBonds: {
      averageBenchmarkYield: 16.04,
      bondsTable: [
        { maturityDate: "20-Mar-27", coupon: 16.29, ttm: 0.90, yieldToday: 18.09, yieldPrev: 17.67 },
        { maturityDate: "17-Apr-29", coupon: 14.55, ttm: 2.98, yieldToday: 16.51, yieldPrev: 16.06 },
        { maturityDate: "21-Feb-31", coupon: 18.50, ttm: 4.83, yieldToday: 16.65, yieldPrev: 16.36 },
        { maturityDate: "25-Jun-32", coupon: 12.50, ttm: 6.18, yieldToday: 16.73, yieldPrev: 16.49 },
        { maturityDate: "15-May-33", coupon: 12.50, ttm: 7.06, yieldToday: 16.61, yieldPrev: 16.37 },
        { maturityDate: "21-Feb-34", coupon: 19.00, ttm: 7.84, yieldToday: 16.45, yieldPrev: 16.28 },
        { maturityDate: "29-Jan-35", coupon: 12.50, ttm: 8.77, yieldToday: 16.10, yieldPrev: 16.28 },
        { maturityDate: "21-Jan-42", coupon: 15.45, ttm: 15.76, yieldToday: 14.07, yieldPrev: 14.60 },
        { maturityDate: "26-Apr-49", coupon: 14.80, ttm: 23.02, yieldToday: 14.49, yieldPrev: 14.46 },
        { maturityDate: "27-Mar-50", coupon: 12.98, ttm: 23.94, yieldToday: 14.54, yieldPrev: 14.39 },
        { maturityDate: "21-Jun-53", coupon: 15.70, ttm: 27.18, yieldToday: 14.73, yieldPrev: 14.48 },
      ],
      narrativeBody:
        "The FGN bond market ended the week on a strong bearish note, as investors grew cautious over the government's borrowing plan ahead of Monday's DMO auction. Despite a reduction in the offer size to ₦700bn across the 2030, 2032, and 2035 maturities, selling pressure remained broad-based. The average benchmark yield rose by 20bps, closing at 16.04%.",
      outlook:
        "We expect the bearish tone to persist into the new week, with sentiment likely to remain under pressure ahead of Monday's bond auction.",
    },

    // SSA EUROBONDS
    ssaEurobonds: {
      bondsTable: [
        // Republic Of Nigeria
        { sovereign: "Republic Of Nigeria", maturityDate: "28-Nov-27", coupon: 7.63, ttm: 1.60, yieldToday: 5.86, yieldPrev: 5.87 },
        { sovereign: "Republic Of Nigeria", maturityDate: "16-Feb-32", coupon: 6.50, ttm: 5.82, yieldToday: 6.81, yieldPrev: 6.93 },
        { sovereign: "Republic Of Nigeria", maturityDate: "28-Nov-47", coupon: 7.88, ttm: 21.61, yieldToday: 7.88, yieldPrev: 7.93 },
        { sovereign: "Republic Of Nigeria", maturityDate: "21-Jan-49", coupon: 9.25, ttm: 22.76, yieldToday: 8.09, yieldPrev: 8.14 },
        // Republic Of Angola
        { sovereign: "Republic Of Angola",  maturityDate: "09-May-28", coupon: 9.50, ttm: 2.04, yieldToday: 7.08, yieldPrev: 7.05 },
        { sovereign: "Republic Of Angola",  maturityDate: "26-Nov-29", coupon: 8.00, ttm: 3.59, yieldToday: 7.59, yieldPrev: 7.67 },
        { sovereign: "Republic Of Angola",  maturityDate: "14-Apr-32", coupon: 8.75, ttm: 5.98, yieldToday: 8.24, yieldPrev: 8.47 },
        { sovereign: "Republic Of Angola",  maturityDate: "26-Nov-49", coupon: 9.13, ttm: 23.61, yieldToday: 9.96, yieldPrev: 9.96 },
        // Arab Republic Of Egypt
        { sovereign: "Arab Republic Of Egypt", maturityDate: "31-Jan-27", coupon: 3.88, ttm: 0.77, yieldToday: 5.77, yieldPrev: 5.73 },
        { sovereign: "Arab Republic Of Egypt", maturityDate: "15-Jan-32", coupon: 7.05, ttm: 5.73, yieldToday: 7.27, yieldPrev: 7.18 },
        { sovereign: "Arab Republic Of Egypt", maturityDate: "20-Nov-59", coupon: 8.15, ttm: 33.60, yieldToday: 9.32, yieldPrev: 9.13 },
      ],
      narrativeBody:
        "The SSA Eurobond market ended the week on a mixed note, as ongoing U.S.-Iran geopolitical tensions continued to drive contrasting price action across the region. Nigeria led gains, with yields declining by 6bps to 7.16%, while Angola tightened sharply by 7bps to 8.22%. Egypt bucked the trend, rising by 10bps to 7.45%.",
      outlook:
        "Sentiment is expected to remain mixed, with sovereign curves staying sensitive to U.S.-Iran developments and shifts in global risk appetite.",
    },

    // LOCAL EQUITIES
    localEquities: {
      asiLevel: 225724.3,
      asiChangePercent: 3.9,
      ytdReturn: 45.06,
      marketCap: "₦145.334 trillion",
      turnoverValue: "₦44.51 billion",
      volumeTraded: "627.616 million units",
      marketBreadthRatio: 1.72,
      gainers: 43,
      losers: 25,
      topGainersTable: [
        { ticker: "UACN",      open: 100.00, close: 134.10 },
        { ticker: "TRANSEXPR", open: 6.05,   close: 7.84   },
        { ticker: "UNILEVER",  open: 103.30, close: 133.10 },
        { ticker: "NASCON",    open: 156.00, close: 199.90 },
        { ticker: "ZICHIS",    open: 12.41,  close: 15.60  },
      ],
      topLosersTable: [
        { ticker: "INFINITY",   open: 19.00,  close: 10.25  },
        { ticker: "ABBEYBDS",   open: 8.10,   close: 5.90   },
        { ticker: "TRANSPOWER", open: 302.90, close: 245.50 },
        { ticker: "GUINEAINS",  open: 1.25,   close: 1.07   },
        { ticker: "STANBIC",    open: 188.55, close: 166.00 },
      ],
      narrativeBody:
        "The local bourse closed the week on a positive note, as the NGX All-Share Index (ASI) gained 3.9% to settle at 225,724.3 points, while YTD return came in at 45.06%. Sectoral performance closed the week bullish, as most key indices recorded gains, reflecting cautious yet consistent buying interest. The Banking sector led the charge with a 10.70% gain, driven by a 16.42% rise in ETI over the week. This was followed by the Industrial Goods sector, which advanced strongly by 7.70% on the back of a 21.48% increase in WAPCO. The Consumer Goods sector also posted a 5.56% gain, supported by a 10.00% uptick in UNILEVER. Also, the Oil and Gas sector saw a more modest growth, edging higher by 4.18% led by a 4.74% gain in CONOIL, while the Insurance sector closed positive by a 0.77%, because of a 5.97% gain in NEM. Market breadth stood at 1.72x with 43 gainers and 25 losers. Market capitalization improved slightly to ₦145.334 trillion from ₦139.826 trillion. Trading activity closed the week bearish, with turnover value decreased to ₦44.51 billion from ₦54.353 billion while volume traded decreased to 627.616 million units from 1,258 million units.",
      outlook:
        "We are likely to see earnings induced upward repricing with some profit-taking along the way.",
    },

    // GLOBAL MARKETS
    globalMarkets: {
      intradayNoteActive: true,
      indicesTable: [
        { region: "U.S",    index: "S&P 500",          open: 7126.06,  closeOrIntraday: 7158.72,  intraday: true  },
        { region: "U.S",    index: "Dow Jones",        open: 49447.43, closeOrIntraday: 49252.21, intraday: true  },
        { region: "U.S",    index: "Nasdaq Composite", open: 24468.48, closeOrIntraday: 24794.63, intraday: true  },
        { region: "U.S",    index: "Russell 2000",     open: 2776.90,  closeOrIntraday: 2792.99,  intraday: true  },
        { region: "EUROPE", index: "STOXX 600",        open: 626.58,   closeOrIntraday: 610.66,   intraday: false },
        { region: "EUROPE", index: "FTSE 100",         open: 10667.63, closeOrIntraday: 10378.52, intraday: false },
        { region: "EUROPE", index: "DAX",              open: 24702.24, closeOrIntraday: 24132.14, intraday: false },
        { region: "EUROPE", index: "CAC 40",           open: 8425.13,  closeOrIntraday: 8157.82,  intraday: false },
        { region: "ASIA",   index: "Shanghai Composite", open: 4051.43, closeOrIntraday: 4079.90, intraday: false },
        { region: "ASIA",   index: "Nikkei 225",       open: 58475.90, closeOrIntraday: 59716.18, intraday: false },
        { region: "ASIA",   index: "HangSeng",         open: 26160.33, closeOrIntraday: 25978.07, intraday: false },
      ],
      narrativeBody:
        "The U.S. traded mixed week on week. S&P (+0.46%), Russell (+0.58%), NASDAQ (+1.33%) due to optimism over possible U.S.–Iran talks and strong earnings while the Dow Jones slipped slightly by 0.39%. European markets closed the week bearish, with CAC (-3.17%) and STOXX (-2.54%), on strong earnings, while DAX (-2.31%), and FTSE (-2.71%) due to Middle East cost pressures, pharma weakness, and declines in bank and defence stocks. Asian markets closed the week mixed, with the Shanghai (+0.70%), Hang Seng (-0.70%), and Nikkei (+2.12%) due to strong tech rallies (e.g., SoftBank Group) and investor positioning ahead of the Bank of Japan policy decision amid rising inflation.",
      outlook:
        "Participants are likely to stay cautious as they monitor developments on the US-Iran ceasefire negotiations.",
    },
  },
];