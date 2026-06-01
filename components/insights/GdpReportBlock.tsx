import type { ReactElement } from "react";
import type { GdpData, GdpSectorRow } from "@/types";

function RankedBars({
  title,
  rows,
  color,
}: {
  title: string;
  rows: GdpSectorRow[];
  color: string;
}): ReactElement | null {
  const cleaned = rows.filter((r) => r.sector.trim());
  if (cleaned.length === 0) return null;
  const sorted = [...cleaned].sort((a, b) => b.value - a.value);
  const max = Math.max(1, ...sorted.map((r) => Math.abs(r.value)));

  return (
    <section className="mt-10">
      <h3 className="font-display text-h3 text-[var(--color-navy)] dark:text-[var(--color-offwhite)]">
        {title}
      </h3>
      <div className="mt-5 space-y-3">
        {sorted.map((r, i) => (
          <div key={i} className="flex items-center gap-3">
            <span className="w-44 shrink-0 truncate font-body text-caption text-[color-mix(in_srgb,var(--color-navy)_82%,transparent)] dark:text-[var(--color-silver)]">
              {r.sector}
            </span>
            <div className="relative h-6 flex-1 overflow-hidden rounded-md bg-[color-mix(in_srgb,var(--color-silver)_30%,transparent)] dark:bg-white/5">
              <div
                className="h-full rounded-md"
                style={{
                  width: `${Math.min(100, (Math.abs(r.value) / max) * 100)}%`,
                  backgroundColor: color,
                }}
              />
            </div>
            <span className="w-16 shrink-0 text-right font-mono text-sm text-[var(--color-navy)] dark:text-[var(--color-offwhite)]">
              {r.value}
              {r.unit ?? "%"}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}

/** A CSS conic-gradient donut with an accompanying legend. */
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
        aria-label={`${title}: ${segments
          .map((s) => `${s.label} ${s.value}%`)
          .join(", ")}`}
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

/**
 * Public GDP infographic: headline metric cards, two ranked bar charts, and
 * the oil/non-oil + broad-sector splits. CSS-only (renders on the server).
 */
export function GdpReportBlock({ gdp }: { gdp: GdpData }): ReactElement {
  const headline = gdp.headlineMetrics.filter((m) => m.value.trim());

  return (
    <div className="mx-auto mt-14 max-w-[900px] px-4">
      {headline.length > 0 ? (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {headline.map((m, i) => (
            <div
              key={i}
              className="rounded-2xl border border-[color-mix(in_srgb,var(--color-gold)_40%,transparent)] bg-[color-mix(in_srgb,var(--color-gold)_07%,transparent)] p-6"
            >
              <p className="font-body text-label uppercase tracking-wide text-[color-mix(in_srgb,var(--color-navy)_70%,transparent)] dark:text-[var(--color-silver)]">
                {m.label}
              </p>
              <p className="mt-3 font-mono text-h2 font-semibold text-[var(--color-gold)]">
                {m.value}
              </p>
              {m.context ? (
                <p className="mt-1 font-body text-caption text-[color-mix(in_srgb,var(--color-navy)_62%,transparent)] dark:text-[var(--color-silver)]">
                  {m.context}
                </p>
              ) : null}
            </div>
          ))}
        </div>
      ) : null}

      <RankedBars
        title="Fastest Growing Sectors"
        rows={gdp.fastestGrowingSectors}
        color="var(--color-cyan)"
      />

      <RankedBars
        title="Top Contributing Activities"
        rows={gdp.topContributingActivities}
        color="var(--color-navy)"
      />

      <section className="mt-12 grid gap-10 rounded-2xl border border-[color-mix(in_srgb,var(--color-silver)_35%,transparent)] p-8 sm:grid-cols-2 dark:border-[color-mix(in_srgb,var(--color-silver)_20%,transparent)]">
        <Donut
          title="Oil vs Non-Oil"
          segments={[
            {
              label: "Non-Oil",
              value: gdp.nonOilSectorSharePercent,
              color: "var(--color-cyan)",
            },
            {
              label: "Oil",
              value: gdp.oilSectorSharePercent,
              color: "var(--color-gold)",
            },
          ]}
        />
        <Donut
          title="Broad Sectors"
          segments={gdp.sectorContributions.map((s, i) => ({
            label: s.sector,
            value: s.sharePercent,
            color: [
              "var(--color-navy)",
              "var(--color-cyan)",
              "var(--color-gold)",
            ][i % 3],
          }))}
        />
      </section>
    </div>
  );
}
