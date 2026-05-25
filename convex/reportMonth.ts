/** Server-side month helpers (mirror of lib/report-month.ts for Convex). */

const MONTH_KEY_RE = /^\d{4}-(0[1-9]|1[0-2])$/;

export function monthKeyFromIsoDate(isoDate: string): string {
  return isoDate.slice(0, 7);
}

export function monthRange(monthKey: string): { start: string; end: string } {
  if (!MONTH_KEY_RE.test(monthKey)) {
    throw new Error(`Invalid month key: ${monthKey}`);
  }
  return { start: `${monthKey}-01`, end: `${monthKey}-31` };
}

export function distinctMonthKeysFromIsoDates(dates: readonly string[]): string[] {
  const set = new Set<string>();
  for (const d of dates) {
    if (d.length >= 7) set.add(d.slice(0, 7));
  }
  return Array.from(set).sort((a, b) => b.localeCompare(a));
}
