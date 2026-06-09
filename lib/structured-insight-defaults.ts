import type { CapitalImportationData, GdpData, MpcData } from "@/types";

/** Sensible empty GDP payload used when switching a draft into the GDP category. */
export function emptyGdpData(): GdpData {
  return {
    headlineMetrics: [
      { label: "Real GDP Growth Rate", value: "", context: "" },
      { label: "Nominal GDP", value: "", context: "" },
      { label: "Real GDP", value: "", context: "" },
    ],
    fastestGrowingSectors: Array.from({ length: 10 }, () => ({
      sector: "",
      value: 0,
      unit: "%",
    })),
    topContributingActivities: Array.from({ length: 10 }, () => ({
      sector: "",
      value: 0,
      unit: "%",
    })),
    oilSectorSharePercent: 0,
    nonOilSectorSharePercent: 100,
    sectorContributions: [
      { sector: "Services", sharePercent: 0 },
      { sector: "Agriculture", sharePercent: 0 },
      { sector: "Industries", sharePercent: 0 },
    ],
  };
}

/** Sensible empty Capital Importation payload used when switching a draft into that category. */
export function emptyCapitalImportationData(): CapitalImportationData {
  return {
    period: "",
    headlineMetrics: [
      { label: "Total Capital Importation", value: "", change: "", subtext: "" },
      { label: "Portfolio Investment (FPI)", value: "", change: "", subtext: "" },
      { label: "Foreign Direct Investment", value: "", change: "", subtext: "" },
      { label: "Other Investments", value: "", change: "", subtext: "" },
    ],
    quarterlyTrend: [],
    composition: [
      { label: "FPI", sharePercent: 0 },
      { label: "FDI", sharePercent: 0 },
      { label: "Other", sharePercent: 0 },
    ],
    topSectors: [],
    countryOrigins: [],
    topBanks: [],
    keyInsights: [],
  };
}

/** Sensible empty MPC payload used when switching a draft into the MPC category. */
export function emptyMpcData(): MpcData {
  const defaultLabels = [
    "MPR (Monetary Policy Rate)",
    "CRR (Cash Reserve Ratio)",
    "Liquidity Ratio",
    "Standing Facility Corridor",
  ];
  return {
    meetingNumber: 0,
    meetingDates: "",
    parameters: defaultLabels.map((label) => ({
      label,
      value: "",
      status: "retained" as const,
    })),
    decisions: [],
  };
}
