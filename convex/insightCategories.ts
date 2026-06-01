/**
 * Insight category constants shared across Convex queries.
 *
 * The Macro Report lane (`/insights/macro-report` and the home hub "Macro
 * Report" tab) surfaces several insight categories together. GDP and MPC
 * insights always appear here alongside Macro Report + legacy Inflation posts.
 */

export const MACRO_REPORT_CATEGORY = "Macro Report";
export const LEGACY_MACRO_INFLATION_CATEGORY = "Inflation";

/** Every category that rolls up into the Macro Report lane. */
export const MACRO_LANE_CATEGORIES: readonly string[] = [
  MACRO_REPORT_CATEGORY,
  LEGACY_MACRO_INFLATION_CATEGORY,
  "GDP",
  "MPC",
];

export function isMacroLaneCategory(category: string): boolean {
  return MACRO_LANE_CATEGORIES.includes(category);
}
