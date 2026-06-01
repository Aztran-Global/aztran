"use client";

import { useState, type ReactElement } from "react";
import {
  ArrowDown,
  ArrowUp,
  ChevronDown,
  Plus,
  Trash2,
} from "lucide-react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import type { GdpData, GdpSectorRow } from "@/types";

const MAX_HEADLINE = 6;
const MIN_HEADLINE = 1;

function num(v: string): number {
  const n = Number.parseFloat(v);
  return Number.isFinite(n) ? n : 0;
}

function move<T>(arr: readonly T[], from: number, to: number): T[] {
  if (to < 0 || to >= arr.length) return [...arr];
  const next = [...arr];
  const [item] = next.splice(from, 1);
  next.splice(to, 0, item);
  return next;
}

function SubSection({
  title,
  hint,
  children,
  defaultOpen = true,
}: {
  title: string;
  hint?: string;
  children: ReactElement | ReactElement[];
  defaultOpen?: boolean;
}): ReactElement {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <Collapsible
      open={open}
      onOpenChange={setOpen}
      className="rounded-lg border border-white/10 bg-white/[0.02] p-4"
    >
      <CollapsibleTrigger className="flex w-full items-center justify-between gap-2 font-body text-label uppercase tracking-wide text-[var(--color-cyan)]">
        <span>{title}</span>
        <ChevronDown
          className={cn("size-4 transition-transform", open && "rotate-180")}
        />
      </CollapsibleTrigger>
      <CollapsibleContent className="mt-4 space-y-3">
        {hint ? <p className="text-xs text-zinc-500">{hint}</p> : null}
        {children}
      </CollapsibleContent>
    </Collapsible>
  );
}

/** A ranked sector/activity table with bar preview + add/remove/reorder. */
function RankedRows({
  label,
  sectorPlaceholder,
  valueLabel,
  rows,
  barColor,
  onChange,
}: {
  label: string;
  sectorPlaceholder: string;
  valueLabel: string;
  rows: GdpSectorRow[];
  barColor: string;
  onChange: (rows: GdpSectorRow[]) => void;
}): ReactElement {
  const max = Math.max(1, ...rows.map((r) => Math.abs(r.value)));
  const update = (i: number, patch: Partial<GdpSectorRow>) =>
    onChange(rows.map((r, idx) => (idx === i ? { ...r, ...patch } : r)));

  return (
    <div className="space-y-2">
      {rows.map((r, i) => (
        <div key={i} className="flex items-center gap-2">
          <div className="flex flex-col">
            <button
              type="button"
              aria-label="Move up"
              className="text-zinc-500 hover:text-white disabled:opacity-30"
              disabled={i === 0}
              onClick={() => onChange(move(rows, i, i - 1))}
            >
              <ArrowUp className="size-3.5" />
            </button>
            <button
              type="button"
              aria-label="Move down"
              className="text-zinc-500 hover:text-white disabled:opacity-30"
              disabled={i === rows.length - 1}
              onClick={() => onChange(move(rows, i, i + 1))}
            >
              <ArrowDown className="size-3.5" />
            </button>
          </div>
          <Input
            placeholder={sectorPlaceholder}
            value={r.sector}
            onChange={(e) => update(i, { sector: e.target.value })}
            className="flex-1"
          />
          <Input
            type="number"
            step="0.01"
            aria-label={valueLabel}
            value={Number.isFinite(r.value) ? r.value : 0}
            onChange={(e) => update(i, { value: num(e.target.value) })}
            className="w-24 font-mono"
          />
          <div className="hidden h-2 w-28 overflow-hidden rounded-full bg-white/10 sm:block">
            <div
              className="h-full rounded-full"
              style={{
                width: `${Math.min(100, (Math.abs(r.value) / max) * 100)}%`,
                backgroundColor: barColor,
              }}
            />
          </div>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="text-destructive"
            onClick={() => onChange(rows.filter((_, idx) => idx !== i))}
          >
            <Trash2 className="size-4" />
          </Button>
        </div>
      ))}
      <Button
        type="button"
        variant="outline"
        size="sm"
        onClick={() => onChange([...rows, { sector: "", value: 0, unit: "%" }])}
      >
        <Plus className="mr-1 size-4" />
        Add {label}
      </Button>
    </div>
  );
}

export function GdpDataEditor({
  value,
  onChange,
}: {
  value: GdpData;
  onChange: (next: GdpData) => void;
}): ReactElement {
  const patch = (p: Partial<GdpData>) => onChange({ ...value, ...p });

  return (
    <div className="space-y-4">
      {/* Sub-section 1 — Headline Metrics */}
      <SubSection
        title="Headline Metrics"
        hint="e.g. Real GDP Growth Rate, Nominal GDP, Real GDP. 1–6 rows."
      >
        <div className="space-y-3">
          {value.headlineMetrics.map((m, i) => (
            <div
              key={i}
              className="grid gap-2 rounded-md border border-white/10 p-3 md:grid-cols-[1.2fr_0.8fr_1.4fr_0.6fr_auto]"
            >
              <Input
                placeholder="Label (Real GDP Growth Rate)"
                value={m.label}
                onChange={(e) =>
                  patch({
                    headlineMetrics: value.headlineMetrics.map((x, idx) =>
                      idx === i ? { ...x, label: e.target.value } : x,
                    ),
                  })
                }
              />
              <Input
                placeholder="Value (3.89%)"
                value={m.value}
                onChange={(e) =>
                  patch({
                    headlineMetrics: value.headlineMetrics.map((x, idx) =>
                      idx === i ? { ...x, value: e.target.value } : x,
                    ),
                  })
                }
                className="font-mono"
              />
              <Input
                placeholder="Context (From 3.13% in Q1 2025)"
                value={m.context}
                onChange={(e) =>
                  patch({
                    headlineMetrics: value.headlineMetrics.map((x, idx) =>
                      idx === i ? { ...x, context: e.target.value } : x,
                    ),
                  })
                }
              />
              <Input
                placeholder="Unit"
                value={m.unit ?? ""}
                onChange={(e) =>
                  patch({
                    headlineMetrics: value.headlineMetrics.map((x, idx) =>
                      idx === i
                        ? { ...x, unit: e.target.value || undefined }
                        : x,
                    ),
                  })
                }
              />
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="text-destructive"
                disabled={value.headlineMetrics.length <= MIN_HEADLINE}
                onClick={() =>
                  patch({
                    headlineMetrics: value.headlineMetrics.filter(
                      (_, idx) => idx !== i,
                    ),
                  })
                }
              >
                <Trash2 className="size-4" />
              </Button>
            </div>
          ))}
          <Button
            type="button"
            variant="outline"
            size="sm"
            disabled={value.headlineMetrics.length >= MAX_HEADLINE}
            onClick={() =>
              patch({
                headlineMetrics: [
                  ...value.headlineMetrics,
                  { label: "", value: "", context: "" },
                ],
              })
            }
          >
            <Plus className="mr-1 size-4" />
            Add metric
          </Button>
        </div>
      </SubSection>

      {/* Sub-section 2 — Fastest Growing Sectors */}
      <SubSection
        title="Fastest Growing Sectors"
        hint="Top growers (≈10). Growth %. Reorder with the arrows; the public chart sorts descending."
      >
        <RankedRows
          label="sector"
          sectorPlaceholder="Sector (Arts, Entertainment & Recreation)"
          valueLabel="Growth %"
          rows={value.fastestGrowingSectors}
          barColor="var(--color-cyan)"
          onChange={(rows) => patch({ fastestGrowingSectors: rows })}
        />
      </SubSection>

      {/* Sub-section 3 — Top Contributing Activities */}
      <SubSection
        title="Top Contributing Activities"
        hint="Top contributors to Real GDP (≈10). Contribution %."
      >
        <RankedRows
          label="activity"
          sectorPlaceholder="Activity (Crop Production)"
          valueLabel="Contribution %"
          rows={value.topContributingActivities}
          barColor="var(--color-navy)"
          onChange={(rows) => patch({ topContributingActivities: rows })}
        />
      </SubSection>

      {/* Sub-section 4 — Sector Split */}
      <SubSection
        title="Sector Split"
        hint="Three broad sectors plus the oil / non-oil split."
      >
        <div className="space-y-2">
          {value.sectorContributions.map((s, i) => (
            <div key={s.sector} className="flex items-center gap-3">
              <Label className="w-28 text-sm">{s.sector}</Label>
              <Input
                type="number"
                step="0.01"
                min="0"
                aria-label={`${s.sector} share %`}
                value={Number.isFinite(s.sharePercent) ? s.sharePercent : 0}
                onChange={(e) =>
                  patch({
                    sectorContributions: value.sectorContributions.map(
                      (x, idx) =>
                        idx === i
                          ? { ...x, sharePercent: num(e.target.value) }
                          : x,
                    ),
                  })
                }
                className="w-28 font-mono"
              />
              <span className="text-xs text-zinc-500">% share of Real GDP</span>
            </div>
          ))}
        </div>
        <div className="mt-4 flex flex-wrap items-end gap-4 border-t border-white/10 pt-4">
          <div>
            <Label htmlFor="oilShare" className="text-sm">
              Oil sector %
            </Label>
            <Input
              id="oilShare"
              type="number"
              step="0.01"
              min="0"
              value={
                Number.isFinite(value.oilSectorSharePercent)
                  ? value.oilSectorSharePercent
                  : 0
              }
              onChange={(e) =>
                patch({ oilSectorSharePercent: num(e.target.value) })
              }
              onBlur={() =>
                patch({
                  nonOilSectorSharePercent:
                    Math.round((100 - value.oilSectorSharePercent) * 100) / 100,
                })
              }
              className="mt-1 w-28 font-mono"
            />
          </div>
          <div>
            <Label htmlFor="nonOilShare" className="text-sm">
              Non-oil sector %
            </Label>
            <Input
              id="nonOilShare"
              type="number"
              step="0.01"
              min="0"
              value={
                Number.isFinite(value.nonOilSectorSharePercent)
                  ? value.nonOilSectorSharePercent
                  : 0
              }
              onChange={(e) =>
                patch({ nonOilSectorSharePercent: num(e.target.value) })
              }
              className="mt-1 w-28 font-mono"
            />
          </div>
          <p className="text-xs text-zinc-500">
            Non-oil auto-fills to 100 − oil on blur; adjust if needed.
          </p>
        </div>
      </SubSection>
    </div>
  );
}
