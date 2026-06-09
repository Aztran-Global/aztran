"use client";

import { useState, type ReactElement } from "react";
import { ChevronDown, Plus, Trash2 } from "lucide-react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import type {
  CapitalImportationData,
  CapitalImportationBankRow,
  CapitalImportationCountryRow,
  CapitalImportationSectorRow,
} from "@/types";

function num(v: string): number {
  const n = Number.parseFloat(v);
  return Number.isFinite(n) ? n : 0;
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

export function CapitalImportationDataEditor({
  value,
  onChange,
}: {
  value: CapitalImportationData;
  onChange: (next: CapitalImportationData) => void;
}): ReactElement {
  const patch = (p: Partial<CapitalImportationData>) => onChange({ ...value, ...p });

  return (
    <div className="space-y-4">
      {/* Period */}
      <div className="flex items-center gap-3 rounded-lg border border-white/10 bg-white/[0.02] p-4">
        <Label htmlFor="ci-period" className="shrink-0 text-sm">
          Period
        </Label>
        <Input
          id="ci-period"
          placeholder="Q1 2026"
          value={value.period}
          onChange={(e) => patch({ period: e.target.value })}
          className="max-w-[180px] font-mono"
        />
      </div>

      {/* Headline Metrics */}
      <SubSection
        title="Headline Metric Cards"
        hint="Up to 4 cards (Total, FPI, FDI, Other). Value is the big number, Change is the YoY/QoQ context, Subtext is the share-of-total line."
      >
        <div className="space-y-3">
          {value.headlineMetrics.map((m, i) => (
            <div
              key={i}
              className="grid gap-2 rounded-md border border-white/10 p-3 md:grid-cols-[1.2fr_0.8fr_1.2fr_1.2fr_auto]"
            >
              <Input
                placeholder="Label"
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
                placeholder="Value ($10.37bn)"
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
                placeholder="Change (+83.83% YoY)"
                value={m.change ?? ""}
                onChange={(e) =>
                  patch({
                    headlineMetrics: value.headlineMetrics.map((x, idx) =>
                      idx === i
                        ? { ...x, change: e.target.value || undefined }
                        : x,
                    ),
                  })
                }
              />
              <Input
                placeholder="Subtext (95.09% of total)"
                value={m.subtext ?? ""}
                onChange={(e) =>
                  patch({
                    headlineMetrics: value.headlineMetrics.map((x, idx) =>
                      idx === i
                        ? { ...x, subtext: e.target.value || undefined }
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
                disabled={value.headlineMetrics.length <= 1}
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
            disabled={value.headlineMetrics.length >= 6}
            onClick={() =>
              patch({
                headlineMetrics: [
                  ...value.headlineMetrics,
                  { label: "", value: "", change: "", subtext: "" },
                ],
              })
            }
          >
            <Plus className="mr-1 size-4" />
            Add card
          </Button>
        </div>
      </SubSection>

      {/* Quarterly Trend */}
      <SubSection
        title="Quarterly Trend"
        hint="One row per quarter (Q1 2024 → Q1 2026). Value in $bn."
        defaultOpen={false}
      >
        <div className="space-y-2">
          {value.quarterlyTrend.map((q, i) => (
            <div key={i} className="flex items-center gap-2">
              <Input
                placeholder="Q1 2024"
                value={q.quarter}
                onChange={(e) =>
                  patch({
                    quarterlyTrend: value.quarterlyTrend.map((x, idx) =>
                      idx === i ? { ...x, quarter: e.target.value } : x,
                    ),
                  })
                }
                className="w-28"
              />
              <Input
                type="number"
                step="0.01"
                placeholder="$bn"
                value={Number.isFinite(q.value) ? q.value : 0}
                onChange={(e) =>
                  patch({
                    quarterlyTrend: value.quarterlyTrend.map((x, idx) =>
                      idx === i ? { ...x, value: num(e.target.value) } : x,
                    ),
                  })
                }
                className="w-24 font-mono"
              />
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="text-destructive"
                onClick={() =>
                  patch({
                    quarterlyTrend: value.quarterlyTrend.filter(
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
            onClick={() =>
              patch({
                quarterlyTrend: [
                  ...value.quarterlyTrend,
                  { quarter: "", value: 0 },
                ],
              })
            }
          >
            <Plus className="mr-1 size-4" />
            Add quarter
          </Button>
        </div>
      </SubSection>

      {/* Composition */}
      <SubSection
        title="Q1 Composition (FPI / FDI / Other)"
        hint="Share percentages must sum to 100."
      >
        <div className="space-y-2">
          {value.composition.map((c, i) => (
            <div key={i} className="flex items-center gap-3">
              <Input
                placeholder="Label (FPI)"
                value={c.label}
                onChange={(e) =>
                  patch({
                    composition: value.composition.map((x, idx) =>
                      idx === i ? { ...x, label: e.target.value } : x,
                    ),
                  })
                }
                className="w-36"
              />
              <Input
                type="number"
                step="0.01"
                min="0"
                max="100"
                value={Number.isFinite(c.sharePercent) ? c.sharePercent : 0}
                onChange={(e) =>
                  patch({
                    composition: value.composition.map((x, idx) =>
                      idx === i
                        ? { ...x, sharePercent: num(e.target.value) }
                        : x,
                    ),
                  })
                }
                className="w-24 font-mono"
              />
              <span className="text-xs text-zinc-500">%</span>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="text-destructive"
                disabled={value.composition.length <= 1}
                onClick={() =>
                  patch({
                    composition: value.composition.filter(
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
            onClick={() =>
              patch({
                composition: [
                  ...value.composition,
                  { label: "", sharePercent: 0 },
                ],
              })
            }
          >
            <Plus className="mr-1 size-4" />
            Add row
          </Button>
        </div>
      </SubSection>

      {/* Top Sectors */}
      <SubSection
        title="Top Sectors by Inflow"
        hint="Sectors ranked by share of total capital received (e.g. Banking 72.79%)."
      >
        <TopSectorsEditor
          rows={value.topSectors}
          onChange={(rows) => patch({ topSectors: rows })}
        />
      </SubSection>

      {/* Country Origins */}
      <SubSection
        title="Country of Origin"
        hint="Country, inflow in $mn, and share %."
        defaultOpen={false}
      >
        <CountryOriginsEditor
          rows={value.countryOrigins}
          onChange={(rows) => patch({ countryOrigins: rows })}
        />
      </SubSection>

      {/* Top Banks */}
      <SubSection
        title="Top Banks by Capital Received"
        hint="Bank name and share % of total capital received."
        defaultOpen={false}
      >
        <TopBanksEditor
          rows={value.topBanks}
          onChange={(rows) => patch({ topBanks: rows })}
        />
      </SubSection>

      {/* Key Insights */}
      <SubSection
        title="Key Insights"
        hint="One bullet per line."
        defaultOpen={false}
      >
        <Textarea
          placeholder={"Record Q1 inflow of $10.37bn — highest single quarter on record\nFPI dominance at 95.09% signals strong carry-trade appetite"}
          value={value.keyInsights.join("\n")}
          onChange={(e) =>
            patch({
              keyInsights: e.target.value
                .split("\n")
                .map((l) => l.trim())
                .filter(Boolean),
            })
          }
          className="min-h-[120px] font-body text-sm"
        />
      </SubSection>
    </div>
  );
}

function TopSectorsEditor({
  rows,
  onChange,
}: {
  rows: CapitalImportationSectorRow[];
  onChange: (rows: CapitalImportationSectorRow[]) => void;
}): ReactElement {
  const max = Math.max(1, ...rows.map((r) => r.sharePercent));
  return (
    <div className="space-y-2">
      {rows.map((r, i) => (
        <div key={i} className="flex items-center gap-2">
          <Input
            placeholder="Sector"
            value={r.sector}
            onChange={(e) =>
              onChange(
                rows.map((x, idx) =>
                  idx === i ? { ...x, sector: e.target.value } : x,
                ),
              )
            }
            className="flex-1"
          />
          <Input
            type="number"
            step="0.01"
            min="0"
            max="100"
            placeholder="%"
            value={Number.isFinite(r.sharePercent) ? r.sharePercent : 0}
            onChange={(e) =>
              onChange(
                rows.map((x, idx) =>
                  idx === i ? { ...x, sharePercent: num(e.target.value) } : x,
                ),
              )
            }
            className="w-24 font-mono"
          />
          <div className="hidden h-2 w-24 overflow-hidden rounded-full bg-white/10 sm:block">
            <div
              className="h-full rounded-full bg-[var(--color-cyan)]"
              style={{
                width: `${Math.min(100, (r.sharePercent / max) * 100)}%`,
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
        onClick={() => onChange([...rows, { sector: "", sharePercent: 0 }])}
      >
        <Plus className="mr-1 size-4" />
        Add sector
      </Button>
    </div>
  );
}

function CountryOriginsEditor({
  rows,
  onChange,
}: {
  rows: CapitalImportationCountryRow[];
  onChange: (rows: CapitalImportationCountryRow[]) => void;
}): ReactElement {
  return (
    <div className="space-y-2">
      {rows.map((r, i) => (
        <div key={i} className="grid grid-cols-[1fr_auto_auto_auto] items-center gap-2">
          <Input
            placeholder="Country"
            value={r.country}
            onChange={(e) =>
              onChange(
                rows.map((x, idx) =>
                  idx === i ? { ...x, country: e.target.value } : x,
                ),
              )
            }
          />
          <Input
            type="number"
            step="0.01"
            placeholder="Inflow $mn"
            value={Number.isFinite(r.inflowMn) ? r.inflowMn : 0}
            onChange={(e) =>
              onChange(
                rows.map((x, idx) =>
                  idx === i ? { ...x, inflowMn: num(e.target.value) } : x,
                ),
              )
            }
            className="w-28 font-mono"
          />
          <Input
            type="number"
            step="0.01"
            min="0"
            max="100"
            placeholder="Share %"
            value={Number.isFinite(r.sharePercent) ? r.sharePercent : 0}
            onChange={(e) =>
              onChange(
                rows.map((x, idx) =>
                  idx === i
                    ? { ...x, sharePercent: num(e.target.value) }
                    : x,
                ),
              )
            }
            className="w-24 font-mono"
          />
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
        onClick={() =>
          onChange([...rows, { country: "", inflowMn: 0, sharePercent: 0 }])
        }
      >
        <Plus className="mr-1 size-4" />
        Add country
      </Button>
    </div>
  );
}

function TopBanksEditor({
  rows,
  onChange,
}: {
  rows: CapitalImportationBankRow[];
  onChange: (rows: CapitalImportationBankRow[]) => void;
}): ReactElement {
  const max = Math.max(1, ...rows.map((r) => r.sharePercent));
  return (
    <div className="space-y-2">
      {rows.map((r, i) => (
        <div key={i} className="flex items-center gap-2">
          <Input
            placeholder="Bank name"
            value={r.bank}
            onChange={(e) =>
              onChange(
                rows.map((x, idx) =>
                  idx === i ? { ...x, bank: e.target.value } : x,
                ),
              )
            }
            className="flex-1"
          />
          <Input
            type="number"
            step="0.01"
            min="0"
            max="100"
            placeholder="%"
            value={Number.isFinite(r.sharePercent) ? r.sharePercent : 0}
            onChange={(e) =>
              onChange(
                rows.map((x, idx) =>
                  idx === i ? { ...x, sharePercent: num(e.target.value) } : x,
                ),
              )
            }
            className="w-24 font-mono"
          />
          <div className="hidden h-2 w-24 overflow-hidden rounded-full bg-white/10 sm:block">
            <div
              className="h-full rounded-full bg-[var(--color-navy)]"
              style={{
                width: `${Math.min(100, (r.sharePercent / max) * 100)}%`,
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
        onClick={() => onChange([...rows, { bank: "", sharePercent: 0 }])}
      >
        <Plus className="mr-1 size-4" />
        Add bank
      </Button>
    </div>
  );
}
