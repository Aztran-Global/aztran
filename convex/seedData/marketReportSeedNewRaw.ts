/**
 * Raw CMS export (legacy shape). Normalized in `marketReportSeedNewContinuation.ts`.
 * Reports: 6 May 2026, 7 May 2026 (`ntbAuction` on 6 May is not stored in Convex schema).
 */
const DISCLAIMER = `This report is intended solely for informational purposes and should not be interpreted as investment advice or a recommendation to engage in any financial transactions. Aztran Investments accepts no liability for any decisions made or losses incurred based on its use. Always seek independent professional advice before making financial decisions.\n\nThis message and any accompanying documents may contain confidential or privileged information and are intended only for the named recipient. If you are not the intended recipient, please notify the sender immediately, delete this message from your system, and refrain from disclosing, copying, or using any part of it. Electronic communications are not guaranteed to be secure or virus-free; Aztran Investments is not liable for any damage arising from unauthorized access, interception, or the presence of malware.\n\nOpinions expressed that do not relate to the official business of Aztran Investments are those of the author and do not necessarily reflect the views of the firm.`;

export const legacyMarketReportsNew = [

  // ─────────────────────────────────────────────────────────────
  // REPORT 1 — Wednesday, 6th May 2026
  // ─────────────────────────────────────────────────────────────
  {
    // BASICS
    title: "Daily Financial Markets Update",
    reportDate: "2026-05-06",
    displayDate: "Wednesday, 6TH May 2026",
    status: "Publish immediately",
    sources: "NGX, FMDQ, CBN, Investing.com, Aztran Research",
    disclaimer: DISCLAIMER,

    // MONEY MARKET
    moneyMarket: {
      systemLiquiditySummary:
        "System liquidity opened with a surplus of ₦6.62 trillion.",
      ratesTable: [
        { label: "Overnight Policy Rate (%)", today: 22.00, prev: 22.00 },
        { label: "Overnight Rate (%)",        today: 22.17, prev: 22.13 },
      ],
      narrativeBody:
        "System liquidity opened with a surplus of ₦6.62 trillion. The Overnight (O/N) rate rose by 5bps to close at 22.17%, while Open Buy-Back (OBB) rate was unchanged, holding steady at 22.00%.",
      outlook:
        "We expect inter-bank rates to be range-bound in the near term.",
    },

    // TREASURY BILLS
    treasuryBills: {
      averageBenchmarkRate: 16.04,
      ntbAuction: {
        tenor: "364-Day",
        offerNaira: 550000000000,
        subscriptionNaira: 2234901200000,
        allotmentNaira: 660493413000,
        rangeOfBids: "15.5000 – 20.0000",
        stopRatePercent: 16.15,
        bidCoverRatio: 3.38,
        previousAuctionDate: "22-April-2026",
        previousStopRate: 16.199,
        previousBidCoverRatio: 2.81,
      },
      benchmarkRatesTable: [
        // Note: T-Bills table not separately shown on 6 May PDF; rates carried from prior day
        { maturityDate: "11-Jun-26",  dtm: 36,  discRateToday: 16.25, discRatePrev: 16.25 },
        { maturityDate: "5-Nov-26",   dtm: 183, discRateToday: 16.14, discRatePrev: 16.14 },
        { maturityDate: "22-Apr-27",  dtm: 351, discRateToday: 15.93, discRatePrev: 15.93 },
      ],
      narrativeBody:
        "The T-bills market traded on a quiet note today, ahead of the NTB auction. The DMO offered ₦550bn on the 364-day bill, attracting a subscription of ₦2.23trn with a bid-cover ratio of 3.38x, and allotted ₦660.49bn at a stop rate of 16.15%, tighter than the previous auction's 16.199%. The secondary market average benchmark rate closed flat at 16.04%.",
      outlook:
        "Near term sentiment is expected to remain cautious, though the market retains a mild bullish bias. Unmet demand is likely to filter into the secondary market.",
    },

    // FGN BONDS
    fgnBonds: {
      averageBenchmarkYield: 16.09,
      bondsTable: [
        { maturityDate: "20-Mar-27", coupon: 16.29, ttm: 0.87, yieldToday: 17.89, yieldPrev: 17.90 },
        { maturityDate: "17-Apr-29", coupon: 14.55, ttm: 2.95, yieldToday: 16.37, yieldPrev: 16.37 },
        { maturityDate: "27-Aug-30", coupon: 18.50, ttm: 4.31, yieldToday: 16.55, yieldPrev: 16.41 },
        { maturityDate: "25-Jun-32", coupon: 12.50, ttm: 6.14, yieldToday: 16.75, yieldPrev: 16.94 },
        { maturityDate: "15-May-33", coupon: 12.50, ttm: 7.03, yieldToday: 16.85, yieldPrev: 16.86 },
        { maturityDate: "21-Feb-34", coupon: 19.00, ttm: 7.80, yieldToday: 16.73, yieldPrev: 16.73 },
        { maturityDate: "29-Jan-35", coupon: 12.50, ttm: 8.74, yieldToday: 16.70, yieldPrev: 16.81 },
        { maturityDate: "21-Jan-42", coupon: 15.45, ttm: 15.72, yieldToday: 14.07, yieldPrev: 14.07 },
        { maturityDate: "26-Apr-49", coupon: 14.80, ttm: 22.99, yieldToday: 14.49, yieldPrev: 14.49 },
        { maturityDate: "27-Mar-50", coupon: 12.98, ttm: 23.91, yieldToday: 14.54, yieldPrev: 14.54 },
        { maturityDate: "21-Jun-53", coupon: 15.70, ttm: 27.15, yieldToday: 14.73, yieldPrev: 14.73 },
      ],
      narrativeBody:
        "The FGN bond market traded on a quiet note today, with mixed but largely muted price action across the curve. The 25-Jun-2032 and 29-Jan-2035 bonds eased by 19bps and 11bps to 16.75% and 16.70% respectively, while the 27-Aug-2030 bond bucked the trend, rising by 14bps to 16.55%. The average benchmark yield closed flat at 16.09%.",
      outlook:
        "We expect sentiment to remain cautious, as fiscal concerns drive near term market sentiment.",
    },

    // SSA EUROBONDS
    ssaEurobonds: {
      bondsTable: [
        // Republic Of Nigeria
        { sovereign: "Republic Of Nigeria", maturityDate: "28-Nov-27", coupon: 7.63, ttm: 1.56, yieldToday: 5.80, yieldPrev: 5.86 },
        { sovereign: "Republic Of Nigeria", maturityDate: "16-Feb-32", coupon: 6.50, ttm: 5.79, yieldToday: 6.49, yieldPrev: 6.58 },
        { sovereign: "Republic Of Nigeria", maturityDate: "28-Nov-47", coupon: 7.88, ttm: 21.58, yieldToday: 7.69, yieldPrev: 7.76 },
        { sovereign: "Republic Of Nigeria", maturityDate: "21-Jan-49", coupon: 9.25, ttm: 22.73, yieldToday: 7.92, yieldPrev: 8.00 },
        // Republic Of Angola
        { sovereign: "Republic Of Angola",  maturityDate: "09-May-28", coupon: 9.50, ttm: 2.01, yieldToday: 6.53, yieldPrev: 6.56 },
        { sovereign: "Republic Of Angola",  maturityDate: "26-Nov-29", coupon: 8.00, ttm: 3.56, yieldToday: 6.99, yieldPrev: 7.11 },
        { sovereign: "Republic Of Angola",  maturityDate: "14-Apr-32", coupon: 8.75, ttm: 5.95, yieldToday: 7.56, yieldPrev: 7.65 },
        { sovereign: "Republic Of Angola",  maturityDate: "26-Nov-49", coupon: 9.13, ttm: 23.58, yieldToday: 9.31, yieldPrev: 9.40 },
        // Arab Republic Of Egypt
        { sovereign: "Arab Republic Of Egypt", maturityDate: "31-Jan-27", coupon: 3.88, ttm: 0.74, yieldToday: 5.10, yieldPrev: 5.45 },
        { sovereign: "Arab Republic Of Egypt", maturityDate: "15-Jan-32", coupon: 7.05, ttm: 5.70, yieldToday: 6.92, yieldPrev: 7.27 },
        { sovereign: "Arab Republic Of Egypt", maturityDate: "20-Nov-59", coupon: 8.15, ttm: 33.56, yieldToday: 9.11, yieldPrev: 9.38 },
      ],
      narrativeBody:
        "The SSA Eurobond market traded firmly higher today, buoyed by renewed optimism around geopolitical developments. Iran signalled it is reviewing a fresh U.S. proposal, with sources suggesting the two sides are edging closer to a potential agreement. The prospect of easing tensions weighed heavily on energy markets, driving Brent crude down nearly 7% to $102 per barrel. Consequently, Nigeria yields declined by 8bps to 6.98%, Angola tightened by 8bps to 7.59%, while Egypt eased by 33bps to 7.04%.",
      outlook:
        "Sentiment is expected to remain cautious, with sovereign curves sensitive to any escalation surrounding the Strait of Hormuz.",
    },

    // LOCAL EQUITIES
    localEquities: {
      asiLevel: 242729.5,
      asiChangePercent: 0.36,
      ytdReturn: 55.98,
      marketCap: "₦155.780 trillion",
      turnoverValue: "₦59.426 billion",
      volumeTraded: "1,414.972 million units",
      marketBreadthRatio: 2.14,
      gainers: 47,
      losers: 22,
      topGainersTable: [
        { ticker: "AIRTELAFRI", open: 3021.30, close: 3323.40 },
        { ticker: "CAP",        open: 175.65,  close: 193.20  },
        { ticker: "ZICHIS",     open: 25.08,   close: 27.58   },
        { ticker: "RTBRISCOE",  open: 12.87,   close: 14.15   },
        { ticker: "FTNCOCOA",   open: 6.65,    close: 7.31    },
      ],
      topLosersTable: [
        { ticker: "SUNUASSUR",  open: 4.50,   close: 4.05   },
        { ticker: "GUINNESS",   open: 447.30, close: 402.60 },
        { ticker: "CAVERTON",   open: 6.00,   close: 5.50   },
        { ticker: "FTGINSURE",  open: 1.17,   close: 1.08   },
        { ticker: "MAYBAKER",   open: 44.00,  close: 41.00  },
      ],
      narrativeBody:
        "The local bourse closed the day on a positive note, as the NGX All-Share Index (ASI) gained slightly by 0.36% to close at 242,729.5 points for the day, pushing the year-to-date return to 55.98%. Sectoral performance closed the day on a mixed note but largely bullish, reflecting a cautious market tone. Consumer Goods edged lower by 0.52%, dragged down by a 9.99% drop in GUINNESS, while the Oil and Gas sector slipped by 0.01% due to pressure from a 0.93% sell-off in JAPAULGOLD. On the positive side, the Banking sector gained slightly by 0.51%, led by a 5.44% buying interest in WEMA. Industrial Goods posted a modest gain of 0.62%, supported by strong buying interest of 9.99% in CAP for the third consecutive day. The Insurance sector also closed higher, up 0.62%, driven by a robust 9.52% rally in LIVINGTRUST. Market breadth stood at 2.14x with 47 gainers and 22 losers. Market capitalization improved slightly to ₦155.780 trillion from ₦155.152 trillion. Trading activity closed the day mixed, with turnover value decreased to ₦59.426 billion from ₦75.225 billion while volume traded increased to 1,414.972 million units from 1,268.25 million units.",
      outlook:
        "We would continue to see earnings induced upward repricing with some profit-taking along the way.",
    },

    // GLOBAL MARKETS
    globalMarkets: {
      intradayNoteActive: true,
      indicesTable: [
        { region: "U.S",    index: "S&P 500",          open: 7259.22,  closeOrIntraday: 7340.35,  intraday: true  },
        { region: "U.S",    index: "Dow Jones",        open: 49298.25, closeOrIntraday: 49820.78, intraday: true  },
        { region: "U.S",    index: "Nasdaq Composite", open: 25326.12, closeOrIntraday: 25705.32, intraday: true  },
        { region: "U.S",    index: "Russell 2000",     open: 2845.00,  closeOrIntraday: 2873.02,  intraday: true  },
        { region: "EUROPE", index: "STOXX 600",        open: 609.72,   closeOrIntraday: 623.65,   intraday: false },
        { region: "EUROPE", index: "FTSE 100",         open: 10219.11, closeOrIntraday: 10438.66, intraday: false },
        { region: "EUROPE", index: "DAX",              open: 24401.70, closeOrIntraday: 24949.25, intraday: false },
        { region: "EUROPE", index: "CAC 40",           open: 8062.31,  closeOrIntraday: 8299.42,  intraday: false },
        { region: "ASIA",   index: "HangSeng",         open: 25898.61, closeOrIntraday: 26213.78, intraday: false },
        { region: "ASIA",   index: "Shanghai",         open: 4112.16,  closeOrIntraday: 4160.17,  intraday: false },
        { region: "ASIA",   index: "Nikkei 225",       open: 59284.92, closeOrIntraday: 59513.12, intraday: false },
      ],
      narrativeBody:
        "U.S. stocks are rising as the S&P 500 (+1.12%), Dow Jones (+1.06%), Nasdaq (+1.50%), and Russell (+0.98%) on falling oil prices and growing optimism over a potential resolution to Middle East tensions. European markets closed bullish. CAC (+2.24%), STOXX (+2.28%), DAX (+2.24%) and FTSE (+2.15%) as falling oil prices and optimism over a potential Iran peace deal, alongside strong corporate earnings, boosted investor sentiment. Asian markets closed bullish, Shanghai (+1.17%), Hang Seng (+1.22%) gained on easing geopolitical tensions and tech strength, while Nikkei (+0.38%) on tech gains despite a stronger yen.",
      outlook:
        "Investors are likely to remain cautious as they monitor developments on U.S.–Iran ceasefire negotiations.",
    },
  },

  // ─────────────────────────────────────────────────────────────
  // REPORT 2 — Thursday, 7th May 2026
  // ─────────────────────────────────────────────────────────────
  {
    // BASICS
    title: "Daily Financial Markets Update",
    reportDate: "2026-05-07",
    displayDate: "Thursday, 7TH May 2026",
    status: "Publish immediately",
    sources: "NGX, FMDQ, CBN, Investing.com, Aztran Research",
    disclaimer: DISCLAIMER,

    // MONEY MARKET
    moneyMarket: {
      systemLiquiditySummary:
        "System liquidity opened with a surplus of ₦6.96 trillion.",
      ratesTable: [
        { label: "Overnight Policy Rate (%)", today: 22.00, prev: 22.00 },
        { label: "Overnight Rate (%)",        today: 22.25, prev: 22.17 },
      ],
      narrativeBody:
        "System liquidity opened with a surplus of ₦6.96 trillion. The Overnight (O/N) rate rose by 8bps to close at 22.25%, while Open Buy-Back (OBB) rate was unchanged, holding steady at 22.00%.",
      outlook:
        "We expect inter-bank rates to be range-bound in the near term.",
    },

    // TREASURY BILLS
    treasuryBills: {
      averageBenchmarkRate: 16.04,
      benchmarkRatesTable: [
        { maturityDate: "11-Jun-26",  dtm: 35,  discRateToday: 16.25, discRatePrev: 16.25 },
        { maturityDate: "5-Nov-26",   dtm: 182, discRateToday: 16.14, discRatePrev: 16.14 },
        { maturityDate: "22-Apr-27",  dtm: 350, discRateToday: 16.00, discRatePrev: 15.93 },
      ],
      narrativeBody:
        "The T-bills market traded on a quiet note today, as investors focused on the OMO auction. The CBN allotted a total of ₦1.59tn across the 3 maturities from a total subscription of ₦1.64tn. As a result, the average benchmark rate closed flat at 16.04%.",
      outlook:
        "We expect activity to remain light as market participants maintain a cautious stance in the near term.",
    },

    // FGN BONDS
    fgnBonds: {
      averageBenchmarkYield: 16.09,
      bondsTable: [
        { maturityDate: "20-Mar-27", coupon: 16.29, ttm: 0.87, yieldToday: 17.94, yieldPrev: 17.89 },
        { maturityDate: "17-Apr-29", coupon: 14.55, ttm: 2.95, yieldToday: 16.37, yieldPrev: 16.37 },
        { maturityDate: "27-Aug-30", coupon: 18.50, ttm: 4.31, yieldToday: 16.55, yieldPrev: 16.55 },
        { maturityDate: "25-Jun-32", coupon: 12.50, ttm: 6.14, yieldToday: 16.84, yieldPrev: 16.75 },
        { maturityDate: "15-May-33", coupon: 12.50, ttm: 7.03, yieldToday: 16.85, yieldPrev: 16.85 },
        { maturityDate: "21-Feb-34", coupon: 19.00, ttm: 7.80, yieldToday: 16.73, yieldPrev: 16.73 },
        { maturityDate: "29-Jan-35", coupon: 12.50, ttm: 8.74, yieldToday: 16.70, yieldPrev: 16.70 },
        { maturityDate: "21-Jan-42", coupon: 15.45, ttm: 15.72, yieldToday: 14.07, yieldPrev: 14.07 },
        { maturityDate: "26-Apr-49", coupon: 14.80, ttm: 22.99, yieldToday: 14.49, yieldPrev: 14.49 },
        { maturityDate: "27-Mar-50", coupon: 12.98, ttm: 23.90, yieldToday: 14.54, yieldPrev: 14.54 },
        { maturityDate: "21-Jun-53", coupon: 15.70, ttm: 27.14, yieldToday: 14.73, yieldPrev: 14.73 },
      ],
      narrativeBody:
        "The FGN bond market traded on a quiet note today, with minimal activity across the curve. The 25-Jun-2032 bond edged higher by 10bps to 16.84%, while the 20-Mar-2027 bond rose marginally by 5bps to 17.94%. All other bonds remained unchanged. The average benchmark yield closed flat at 16.09%.",
      outlook:
        "We expect sentiment to remain cautious, as fiscal concerns drive near term market sentiment.",
    },

    // SSA EUROBONDS
    ssaEurobonds: {
      bondsTable: [
        // Republic Of Nigeria
        { sovereign: "Republic Of Nigeria", maturityDate: "28-Nov-27", coupon: 7.63, ttm: 1.56, yieldToday: 5.78, yieldPrev: 5.80 },
        { sovereign: "Republic Of Nigeria", maturityDate: "16-Feb-32", coupon: 6.50, ttm: 5.78, yieldToday: 6.49, yieldPrev: 6.49 },
        { sovereign: "Republic Of Nigeria", maturityDate: "28-Nov-47", coupon: 7.88, ttm: 21.58, yieldToday: 7.72, yieldPrev: 7.69 },
        { sovereign: "Republic Of Nigeria", maturityDate: "21-Jan-49", coupon: 9.25, ttm: 22.73, yieldToday: 7.93, yieldPrev: 7.92 },
        // Republic Of Angola
        { sovereign: "Republic Of Angola",  maturityDate: "09-May-28", coupon: 9.50, ttm: 2.01, yieldToday: 6.72, yieldPrev: 6.53 },
        { sovereign: "Republic Of Angola",  maturityDate: "26-Nov-29", coupon: 8.00, ttm: 3.56, yieldToday: 7.19, yieldPrev: 6.99 },
        { sovereign: "Republic Of Angola",  maturityDate: "14-Apr-32", coupon: 8.75, ttm: 5.94, yieldToday: 7.80, yieldPrev: 7.56 },
        { sovereign: "Republic Of Angola",  maturityDate: "26-Nov-49", coupon: 9.13, ttm: 23.57, yieldToday: 9.45, yieldPrev: 9.31 },
        // Arab Republic Of Egypt
        { sovereign: "Arab Republic Of Egypt", maturityDate: "31-Jan-27", coupon: 3.88, ttm: 0.74, yieldToday: 5.07, yieldPrev: 5.10 },
        { sovereign: "Arab Republic Of Egypt", maturityDate: "15-Jan-32", coupon: 7.05, ttm: 5.70, yieldToday: 6.81, yieldPrev: 6.92 },
        { sovereign: "Arab Republic Of Egypt", maturityDate: "20-Nov-59", coupon: 8.15, ttm: 33.56, yieldToday: 9.07, yieldPrev: 9.11 },
      ],
      narrativeBody:
        "The SSA Eurobond market traded mixed today, with profit-taking eroding part of the prior session's gains. Investor sentiment remained cautious, though near-term outlook could improve as reports suggest Iran and the U.S. are exploring a short-term arrangement aimed at de-escalating ongoing hostilities. Any progress on this front would likely provide a supportive backdrop for risk assets in the immediate term. Consequently, Nigeria yields closed flat at 6.98%, while Egypt eased by 6bps to 6.98%. Angola bucked the trend, widening sharply by 20bps to 7.79%.",
      outlook:
        "Sentiment is expected to improve following recent developments on the U.S.-Iran negotiations.",
    },

    // LOCAL EQUITIES
    localEquities: {
      asiLevel: 239734.6,
      asiChangePercent: -1.23,
      ytdReturn: 54.02,
      marketCap: "₦153.858 trillion",
      turnoverValue: "₦72.17 billion",
      volumeTraded: "1,830.09 million units",
      marketBreadthRatio: 1.37,
      gainers: 41,
      losers: 30,
      topGainersTable: [
        { ticker: "CAP",      open: 193.20, close: 212.50 },
        { ticker: "FTNCOCOA", open: 7.31,   close: 8.04   },
        { ticker: "ZICHIS",   open: 30.33,  close: 30.33  },
        { ticker: "MEYER",    open: 15.55,  close: 17.10  },
        { ticker: "BERGER",   open: 89.80,  close: 98.75  },
      ],
      topLosersTable: [
        { ticker: "UPL",        open: 5.00,   close: 4.50   },
        { ticker: "REDSTAREX",  open: 28.15,  close: 25.45  },
        { ticker: "SKYAVN",     open: 143.10, close: 130.75 },
        { ticker: "CILEASING",  open: 7.65,   close: 7.00   },
        { ticker: "CONHALLPLC", open: 6.50,   close: 6.01   },
      ],
      narrativeBody:
        "The local bourse closed the day on a negative note, as the NGX All-Share Index (ASI) declined by 1.23% to close at 239,734.6 points for the day, pulling the year-to-date return to 54.02%. Sectoral performance closed the day mixed but on a broadly bearish note, as losses in select sectors were only partially tempered by gains elsewhere, reflecting a cautious market tone. The Banking sector declined slightly by 1.11%, led by a 6.07% sell-off in ACCESSCORP. Similarly, Industrial Goods edged lower by 5.45%, dragged down by a 6.5% drop in BUACEMENT, while Consumer Goods slipped by 2.91% due to pressure from a 1.55% sell-off in INTBREW. On the positive side, Oil and Gas sector posted a modest gain of 0.39%, supported by buying interest of 0.91% in SEPLAT. The Insurance sector also closed higher, up 1.51%, driven by a robust 9.57% rally in SOVEREINS. Market breadth stood at 1.37x with 41 gainers and 30 losers. Market capitalization declined slightly to ₦153.858 trillion from ₦155.780 trillion. Trading activity closed the day bullish, with turnover value increased to ₦72.17 billion from ₦59.43 billion while volume traded increased to 1,830.09 million units from 1,414.97 million units.",
      outlook:
        "We would continue to see earnings induced upward repricing with some profit-taking along the way.",
    },

    // GLOBAL MARKETS
    globalMarkets: {
      intradayNoteActive: true,
      indicesTable: [
        { region: "U.S",    index: "S&P 500",          open: 7365.12,  closeOrIntraday: 7369.10,  intraday: true  },
        { region: "U.S",    index: "Dow Jones",        open: 49910.59, closeOrIntraday: 49840.54, intraday: true  },
        { region: "U.S",    index: "Nasdaq Composite", open: 25838.94, closeOrIntraday: 25945.04, intraday: true  },
        { region: "U.S",    index: "Russell 2000",     open: 2886.77,  closeOrIntraday: 2867.15,  intraday: true  },
        { region: "EUROPE", index: "STOXX 600",        open: 623.25,   closeOrIntraday: 616.88,   intraday: false },
        { region: "EUROPE", index: "FTSE 100",         open: 10438.66, closeOrIntraday: 10276.95, intraday: false },
        { region: "EUROPE", index: "DAX",              open: 24918.69, closeOrIntraday: 24671.54, intraday: false },
        { region: "EUROPE", index: "CAC 40",           open: 8299.42,  closeOrIntraday: 8202.08,  intraday: false },
        { region: "ASIA",   index: "HangSeng",         open: 26213.78, closeOrIntraday: 26626.28, intraday: false },
        { region: "ASIA",   index: "Shanghai",         open: 4160.17,  closeOrIntraday: 4180.09,  intraday: false },
        { region: "ASIA",   index: "Nikkei 225",       open: 59513.12, closeOrIntraday: 62833.84, intraday: false },
      ],
      narrativeBody:
        "U.S. market is trading mixed, S&P 500 (+0.05%), and Nasdaq (+0.41%) as strong corporate earnings and continued AI-driven optimism boosted technology stocks, while Dow Jones (-0.14%), and Russell (-0.68%) as weakness in energy and broader cyclical stocks weighed on sentiment. European markets closed bearish. CAC (-1.17%), STOXX (-1.02%), DAX (-0.99%) and FTSE (-1.55%) as disappointing corporate earnings and lingering uncertainty over a Middle East peace deal weighed on investor sentiment despite lower energy prices. Asian markets closed bullish, Shanghai (+1.57%), Hang Seng (+0.48%), and Nikkei (+5.58%) supported by growing optimism about de-escalation in the Middle East and strong gains in technology stocks.",
      outlook:
        "Investors are likely to remain cautious as they monitor developments on U.S.–Iran ceasefire negotiations.",
    },
  },
];