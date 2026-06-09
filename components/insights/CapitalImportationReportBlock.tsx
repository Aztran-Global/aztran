import type { ReactElement } from "react";
import type {
  CapitalImportationData,
  CapitalImportationSectorRow,
  CapitalImportationBankRow,
} from "@/types";

/** A horizontal bar with label + value, sorted descending by sharePercent. */
function ShareBars({
  title,
  rows,
  color,
  valueFormatter,
}: {
  title: string;
  rows: { label: string; value: number }[];
  color: string;
  valueFormatter?: (v: number) => string;
}): ReactElement | null {
  const cleaned = rows.filter((r) => r.label.trim());
  if (cleaned.length === 0) return null;
  const sorted = [...cleaned].sort((a, b) => b.value - a.value);
  const max = Math.max(1, ...sorted.map((r) => r.value));
  const fmt = valueFormatter ?? ((v) => `${v}%`);

  return (
    <section className="mt-10">
      <h3 className="font-display text-h3 text-[var(--color-navy)] dark:text-[var(--color-offwhite)]">
        {title}
      </h3>
      <div className="mt-5 space-y-3">
        {sorted.map((r, i) => (
          <div key={i} className="flex items-center gap-3">
            <span className="w-48 shrink-0 truncate font-body text-caption text-[color-mix(in_srgb,var(--color-navy)_82%,transparent)] dark:text-[var(--color-silver)]">
              {r.label}
            </span>
            <div className="relative h-6 flex-1 overflow-hidden rounded-md bg-[color-mix(in_srgb,var(--color-silver)_30%,transparent)] dark:bg-white/5">
              <div
                className="h-full rounded-md"
                style={{
                  width: `${Math.min(100, (r.value / max) * 100)}%`,
                  backgroundColor: color,
                }}
              />
            </div>
            <span className="w-16 shrink-0 text-right font-mono text-sm text-[var(--color-navy)] dark:text-[var(--color-offwhite)]">
              {fmt(r.value)}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}

/** CSS conic-gradient donut. */
function Donut({
  title,
  segments,
}: {
  title: string;
  segments: { label: string; value: number; color: string }[];
}): ReactElement {
  const total = segments.reduce((s, x) => s + Math.max(0, x.value), 0) || 1;
  const stops = segments
    .map((seg, i) => {
      const prior = segments
        .slice(0, i)
        .reduce((s, x) => s + Math.max(0, x.value), 0);
      const start = (prior / total) * 360;
      const end = ((prior + Math.max(0, seg.value)) / total) * 360;
      return `${seg.color} ${start}deg ${end}deg`;
    })
    .join(", ");

  return (
    <div className="flex flex-col items-center gap-4">
      <p className="font-body text-label uppercase tracking-wide text-[var(--color-cyan)]">
        {title}
      </p>
      <div
        className="relative size-40 rounded-full"
        style={{ background: `conic-gradient(${stops})` }}
        role="img"
        aria-label={`${title}: ${segments.map((s) => `${s.label} ${s.value}%`).join(", ")}`}
      >
        <div className="absolute inset-[22%] rounded-full bg-[var(--color-white)] dark:bg-[color-mix(in_srgb,var(--color-navy)_94%,black)]" />
      </div>
      <ul className="space-y-1.5">
        {segments.map((s) => (
          <li
            key={s.label}
            className="flex items-center gap-2 font-body text-caption text-[color-mix(in_srgb,var(--color-navy)_78%,transparent)] dark:text-[var(--color-silver)]"
          >
            <span
              className="inline-block size-2.5 rounded-sm"
              style={{ backgroundColor: s.color }}
            />
            {s.label}
            <span className="font-mono text-[var(--color-navy)] dark:text-[var(--color-offwhite)]">
              {s.value}%
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

/** Quarterly bar chart (simple CSS bars). */
function QuarterlyTrendChart({
  rows,
}: {
  rows: CapitalImportationData["quarterlyTrend"];
}): ReactElement | null {
  if (rows.length === 0) return null;
  const max = Math.max(1, ...rows.map((r) => r.value));

  return (
    <section className="mt-10">
      <h3 className="font-display text-h3 text-[var(--color-navy)] dark:text-[var(--color-offwhite)]">
        Quarterly Capital Importation Trend
      </h3>
      <div className="mt-6 flex items-end gap-2">
        {rows.map((r, i) => {
          const isLatest = i === rows.length - 1;
          return (
            <div key={i} className="flex flex-1 flex-col items-center gap-1">
              <span className="font-mono text-[11px] text-[var(--color-navy)] dark:text-[var(--color-offwhite)]">
                {r.value}
              </span>
              <div
                className="w-full rounded-t-md"
                style={{
                  height: `${Math.max(8, (r.value / max) * 120)}px`,
                  backgroundColor: isLatest
                    ? "var(--color-cyan)"
                    : "color-mix(in_srgb,var(--color-navy)_55%,transparent)",
                }}
              />
              <span className="max-w-full truncate text-center font-body text-[10px] text-[color-mix(in_srgb,var(--color-navy)_65%,transparent)] dark:text-[var(--color-silver)]">
                {r.quarter}
              </span>
            </div>
          );
        })}
      </div>
    </section>
  );
}

/**
 * Public Capital Importation infographic: headline cards, quarterly trend,
 * composition donut, sector bars, country table, bank bars, key insights.
 * CSS-only (renders on the server).
 */
export function CapitalImportationReportBlock({
  data,
}: {
  data: CapitalImportationData;
}): ReactElement {
  const headline = data.headlineMetrics.filter((m) => m.value.trim());
  const donutColors = [
    "var(--color-navy)",
    "var(--color-gold)",
    "var(--color-cyan)",
  ];

  return (
    <div className="mx-auto mt-14 max-w-[900px] px-4">
      {/* Period label */}
      {data.period ? (
        <p className="mb-6 font-body text-label uppercase tracking-[0.2em] text-[var(--color-cyan)]">
          {data.period} — Capital Importation
        </p>
      ) : null}

      {/* Headline metric cards */}
      {headline.length > 0 ? (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {headline.map((m, i) => (
            <div
              key={i}
              className="rounded-2xl border border-[color-mix(in_srgb,var(--color-gold)_40%,transparent)] bg-[color-mix(in_srgb,var(--color-gold)_07%,transparent)] p-5"
            >
              <p className="font-body text-label uppercase tracking-wide text-[color-mix(in_srgb,var(--color-navy)_70%,transparent)] dark:text-[var(--color-silver)]">
                {m.label}
              </p>
              <p className="mt-3 font-mono text-h2 font-semibold text-[var(--color-gold)]">
                {m.value}
              </p>
              {m.change ? (
                <p className="mt-1 font-body text-caption text-[color-mix(in_srgb,var(--color-navy)_62%,transparent)] dark:text-[var(--color-silver)]">
                  {m.change}
                </p>
              ) : null}
              {m.subtext ? (
                <p className="mt-0.5 font-body text-caption text-[color-mix(in_srgb,var(--color-navy)_55%,transparent)] dark:text-[var(--color-silver)]">
                  {m.subtext}
                </p>
              ) : null}
            </div>
          ))}
        </div>
      ) : null}

      {/* Quarterly trend */}
      <QuarterlyTrendChart rows={data.quarterlyTrend} />

      {/* Composition donut + Sector bars — side by side on larger screens */}
      {(data.composition.length > 0 || data.topSectors.length > 0) ? (
        <section className="mt-12 grid gap-10 rounded-2xl border border-[color-mix(in_srgb,var(--color-silver)_35%,transparent)] p-8 dark:border-[color-mix(in_srgb,var(--color-silver)_20%,transparent)] lg:grid-cols-2">
          {data.composition.length > 0 ? (
            <Donut
              title="Composition"
              segments={data.composition.map((c, i) => ({
                label: c.label,
                value: c.sharePercent,
                color: donutColors[i % donutColors.length],
              }))}
            />
          ) : null}

          {data.topSectors.length > 0 ? (
            <div>
              <p className="mb-4 font-body text-label uppercase tracking-wide text-[var(--color-cyan)]">
                Top Sectors by Inflow
              </p>
              <div className="space-y-3">
                {[...data.topSectors]
                  .sort((a, b) => b.sharePercent - a.sharePercent)
                  .map((s, i) => {
                    const max = Math.max(
                      1,
                      ...data.topSectors.map((x) => x.sharePercent),
                    );
                    return (
                      <div key={i} className="flex items-center gap-3">
                        <span className="w-36 shrink-0 truncate font-body text-caption text-[color-mix(in_srgb,var(--color-navy)_82%,transparent)] dark:text-[var(--color-silver)]">
                          {s.sector}
                        </span>
                        <div className="relative h-5 flex-1 overflow-hidden rounded-md bg-[color-mix(in_srgb,var(--color-silver)_30%,transparent)] dark:bg-white/5">
                          <div
                            className="h-full rounded-md bg-[var(--color-cyan)]"
                            style={{
                              width: `${Math.min(100, (s.sharePercent / max) * 100)}%`,
                            }}
                          />
                        </div>
                        <span className="w-14 shrink-0 text-right font-mono text-sm text-[var(--color-navy)] dark:text-[var(--color-offwhite)]">
                          {s.sharePercent}%
                        </span>
                      </div>
                    );
                  })}
              </div>
            </div>
          ) : null}
        </section>
      ) : null}

      {/* Country of origin table */}
      {data.countryOrigins.length > 0 ? (
        <section className="mt-12">
          <h3 className="font-display text-h3 text-[var(--color-navy)] dark:text-[var(--color-offwhite)]">
            Country of Origin
          </h3>
          <div className="mt-5 overflow-x-auto">
            <table className="w-full border-collapse font-body text-body">
              <thead>
                <tr className="border-b border-[color-mix(in_srgb,var(--color-silver)_45%,transparent)] dark:border-white/10">
                  <th className="pb-3 text-left font-body text-label uppercase tracking-wide text-[color-mix(in_srgb,var(--color-navy)_65%,transparent)] dark:text-[var(--color-silver)]">
                    Country
                  </th>
                  <th className="pb-3 text-right font-body text-label uppercase tracking-wide text-[color-mix(in_srgb,var(--color-navy)_65%,transparent)] dark:text-[var(--color-silver)]">
                    Inflow ($mn)
                  </th>
                  <th className="pb-3 text-right font-body text-label uppercase tracking-wide text-[color-mix(in_srgb,var(--color-navy)_65%,transparent)] dark:text-[var(--color-silver)]">
                    Share
                  </th>
                </tr>
              </thead>
              <tbody>
                {[...data.countryOrigins]
                  .sort((a, b) => b.inflowMn - a.inflowMn)
                  .map((c, i) => (
                    <tr
                      key={i}
                      className="border-b border-[color-mix(in_srgb,var(--color-silver)_30%,transparent)] dark:border-white/8"
                    >
                      <td className="py-3 text-[color-mix(in_srgb,var(--color-navy)_88%,transparent)] dark:text-[var(--color-silver)]">
                        {c.country}
                      </td>
                      <td className="py-3 text-right font-mono text-[var(--color-navy)] dark:text-[var(--color-offwhite)]">
                        ${c.inflowMn.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                      </td>
                      <td className="py-3 text-right font-mono font-semibold text-[var(--color-navy)] dark:text-[var(--color-offwhite)]">
                        {c.sharePercent}%
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </section>
      ) : null}

      {/* Top banks */}
      {data.topBanks.length > 0 ? (
        <ShareBars
          title="Top Banks by Capital Received"
          rows={data.topBanks.map((b) => ({
            label: b.bank,
            value: b.sharePercent,
          }))}
          color="var(--color-navy)"
        />
      ) : null}

      {/* Key insights */}
      {data.keyInsights.length > 0 ? (
        <section className="mt-12 rounded-2xl border border-[color-mix(in_srgb,var(--color-cyan)_30%,transparent)] bg-[color-mix(in_srgb,var(--color-cyan)_04%,transparent)] p-8">
          <h3 className="font-display text-h3 text-[var(--color-navy)] dark:text-[var(--color-offwhite)]">
            Key Insights
          </h3>
          <ul className="mt-5 space-y-4">
            {data.keyInsights.map((insight, i) => (
              <li
                key={i}
                className="relative pl-7 font-body text-body leading-relaxed text-[color-mix(in_srgb,var(--color-navy)_88%,transparent)] before:absolute before:left-0 before:top-[0.35em] before:text-[var(--color-cyan)] before:content-['▸'] dark:text-[var(--color-silver)]"
              >
                {insight}
              </li>
            ))}
          </ul>
        </section>
      ) : null}
    </div>
  );
}
