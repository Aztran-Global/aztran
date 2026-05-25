/** Calendar month key `YYYY-MM` for report / insight date filtering. */

const MONTH_KEY_RE = /^\d{4}-(0[1-9]|1[0-2])$/;

export function currentMonthKey(date = new Date()): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  return `${y}-${m}`;
}

export function isValidMonthKey(month: string): boolean {
  return MONTH_KEY_RE.test(month);
}

export function monthKeyFromIsoDate(isoDate: string): string {
  return isoDate.slice(0, 7);
}

export function monthRange(monthKey: string): { start: string; end: string } {
  if (!isValidMonthKey(monthKey)) {
    throw new Error(`Invalid month key: ${monthKey}`);
  }
  return { start: `${monthKey}-01`, end: `${monthKey}-31` };
}

export function formatMonthLabel(monthKey: string): string {
  const [y, m] = monthKey.split("-").map(Number);
  const d = new Date(y, m - 1, 1);
  return d.toLocaleDateString("en-GB", { month: "long", year: "numeric" });
}

/** Newest first; always includes `currentMonth` even if absent from `available`. */
export function mergeMonthOptions(
  available: readonly string[],
  currentMonth: string,
): string[] {
  const set = new Set<string>([currentMonth, ...available]);
  return Array.from(set).sort((a, b) => b.localeCompare(a));
}

export function distinctMonthKeysFromIsoDates(dates: readonly string[]): string[] {
  const set = new Set<string>();
  for (const d of dates) {
    if (d.length >= 7) set.add(d.slice(0, 7));
  }
  return Array.from(set).sort((a, b) => b.localeCompare(a));
}
