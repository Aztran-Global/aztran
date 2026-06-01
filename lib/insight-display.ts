import {
  INSIGHT_CATEGORIES,
  STRUCTURED_INSIGHT_CATEGORIES,
} from "@/lib/site-nav";
import type { GdpData, InsightDoc, MpcData } from "@/types";

/**
 * Which structured-data editor/renderer a category drives.
 *  - "metrics": YoY/MoM inflation cards (Macro Report + legacy Inflation)
 *  - "gdp":     headline metrics + ranked bar charts (`gdpData`)
 *  - "mpc":     policy parameter cards (`mpcData`)
 *  - "none":    body sections only
 */
export type StructuredKind = "metrics" | "gdp" | "mpc" | "none";

const METRIC_CATEGORIES: ReadonlySet<string> = new Set([
  INSIGHT_CATEGORIES.macroReport,
  "Inflation",
]);

export function structuredKind(category: string): StructuredKind {
  if (category === STRUCTURED_INSIGHT_CATEGORIES.gdp) return "gdp";
  if (category === STRUCTURED_INSIGHT_CATEGORIES.mpc) return "mpc";
  if (METRIC_CATEGORIES.has(category)) return "metrics";
  return "none";
}

/** Tailwind classes for the colour-coded category pill (admin list + cards). */
export function insightCategoryPillClass(category: string): string {
  switch (category) {
    case "GDP":
      return "bg-[color-mix(in_srgb,var(--color-cyan)_18%,transparent)] text-[var(--color-cyan)] border-[color-mix(in_srgb,var(--color-cyan)_45%,transparent)]";
    case "MPC":
      return "bg-purple-500/15 text-purple-500 border-purple-500/40 dark:text-purple-300";
    case "Inflation":
      return "bg-orange-500/15 text-orange-600 border-orange-500/40 dark:text-orange-300";
    case "Fixed Income":
      return "bg-blue-500/15 text-blue-600 border-blue-500/40 dark:text-blue-300";
    default:
      return "bg-zinc-500/12 text-zinc-500 border-zinc-500/30 dark:text-zinc-300";
  }
}

/** Status → colour for MPC parameter badges (Retained gray / Increased red / Decreased green). */
export function mpcStatusClass(status: MpcData["parameters"][number]["status"]): string {
  switch (status) {
    case "increased":
      return "bg-red-500/15 text-red-600 border-red-500/40 dark:text-red-300";
    case "decreased":
      return "bg-emerald-500/15 text-emerald-600 border-emerald-500/40 dark:text-emerald-300";
    default:
      return "bg-zinc-500/15 text-zinc-500 border-zinc-500/35 dark:text-zinc-300";
  }
}

export function mpcStatusLabel(
  status: MpcData["parameters"][number]["status"],
): string {
  return status.charAt(0).toUpperCase() + status.slice(1);
}

/** Headline number to surface on a GDP card (the Real GDP Growth Rate). */
export function gdpHeadlineValue(gdp: GdpData | undefined): string | null {
  if (!gdp) return null;
  const growth =
    gdp.headlineMetrics.find((m) => /growth/i.test(m.label)) ??
    gdp.headlineMetrics[0];
  return growth?.value ?? null;
}

/** The MPR parameter on an MPC insight (value + status), for cards/headers. */
export function mpcMprParameter(mpc: MpcData | undefined) {
  if (!mpc) return null;
  return (
    mpc.parameters.find((p) => /\bMPR\b/i.test(p.label)) ??
    mpc.parameters.find((p) => /monetary policy rate/i.test(p.label)) ??
    null
  );
}

/** Convenience: the structured kind for a full insight document. */
export function insightStructuredKind(insight: InsightDoc): StructuredKind {
  return structuredKind(insight.category);
}
