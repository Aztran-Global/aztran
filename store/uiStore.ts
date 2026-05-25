import { create } from "zustand";
import { currentMonthKey } from "@/lib/report-month";

/** Main `/insights` hub tabs (sub-routes use `forcedCategory` instead). */
export type InsightHubTab =
  | "macro_report"
  | "market_report"
  | "market_buzz"
  | "interviews";

interface UiState {
  isScrolled: boolean;
  setScrolled: (value: boolean) => void;
  portfolioFilter: string;
  setPortfolioFilter: (value: string) => void;
  /** @deprecated Legacy filter chips; hub uses `insightHubTab`. */
  insightCategory: string;
  setInsightCategory: (value: string) => void;
  insightHubTab: InsightHubTab;
  setInsightHubTab: (value: InsightHubTab) => void;
  researchFeedLimit: number;
  setResearchFeedLimit: (value: number) => void;
  macroReportMonth: string;
  setMacroReportMonth: (value: string) => void;
  marketReportMonth: string;
  setMarketReportMonth: (value: string) => void;
  blogCategory: string;
  setBlogCategory: (value: string) => void;
}

/**
 * Client UI state for scroll-linked navigation, portfolio filters, and content listing category tabs.
 */
export const useUiStore = create<UiState>((set) => ({
  isScrolled: false,
  setScrolled: (isScrolled) => set({ isScrolled }),
  portfolioFilter: "All",
  setPortfolioFilter: (portfolioFilter) => set({ portfolioFilter }),
  insightCategory: "All",
  setInsightCategory: (insightCategory) => set({ insightCategory }),
  insightHubTab: "macro_report",
  setInsightHubTab: (insightHubTab) => set({ insightHubTab }),
  researchFeedLimit: 18,
  setResearchFeedLimit: (researchFeedLimit) => set({ researchFeedLimit }),
  macroReportMonth: currentMonthKey(),
  setMacroReportMonth: (macroReportMonth) => set({ macroReportMonth }),
  marketReportMonth: currentMonthKey(),
  setMarketReportMonth: (marketReportMonth) => set({ marketReportMonth }),
  blogCategory: "All",
  setBlogCategory: (blogCategory) => set({ blogCategory }),
}));
