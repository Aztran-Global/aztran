/**
 * Formats a number for display with at most two fractional digits (rounded).
 */
export function formatMaxTwoDecimals(n: number): string {
  if (!Number.isFinite(n)) return String(n);
  const rounded = Math.round(n * 100) / 100;
  return new Intl.NumberFormat("en-US", {
    maximumFractionDigits: 2,
    minimumFractionDigits: 0,
  }).format(rounded);
}
