"use client";

import { useState, type ReactElement } from "react";
import { ChevronDown, Plus, Trash2 } from "lucide-react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { cn } from "@/lib/utils";
import { mpcStatusClass } from "@/lib/insight-display";
import type {
  MpcData,
  MpcParameterStatus,
  MpcPolicyParameter,
} from "@/types";

const STATUS_OPTIONS: MpcParameterStatus[] = [
  "retained",
  "increased",
  "decreased",
];

function num(v: string): number {
  const n = Number.parseFloat(v);
  return Number.isFinite(n) ? n : 0;
}

function SubSection({
  title,
  children,
  defaultOpen = true,
}: {
  title: string;
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
        {children}
      </CollapsibleContent>
    </Collapsible>
  );
}

function ParameterCard({
  param,
  onChange,
  onRemove,
}: {
  param: MpcPolicyParameter;
  onChange: (next: MpcPolicyParameter) => void;
  onRemove: () => void;
}): ReactElement {
  const subs = param.subParameters;
  const corridor = param.corridorValues;

  return (
    <div className="space-y-3 rounded-lg border border-white/10 p-4">
      <div className="flex items-start justify-between gap-2">
        <Input
          placeholder="Label (MPR (Monetary Policy Rate))"
          value={param.label}
          onChange={(e) => onChange({ ...param, label: e.target.value })}
        />
        <Button
          type="button"
          variant="ghost"
          size="sm"
          className="text-destructive"
          onClick={onRemove}
        >
          <Trash2 className="size-4" />
        </Button>
      </div>

      <div className="grid gap-2 sm:grid-cols-2">
        <Input
          placeholder="Value (26.5%)"
          value={param.value}
          onChange={(e) => onChange({ ...param, value: e.target.value })}
          className="font-mono"
        />
        <Select
          value={param.status}
          onValueChange={(v) =>
            v && onChange({ ...param, status: v as MpcParameterStatus })
          }
        >
          <SelectTrigger
            className={cn("border", mpcStatusClass(param.status))}
          >
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {STATUS_OPTIONS.map((s) => (
              <SelectItem key={s} value={s}>
                {s.charAt(0).toUpperCase() + s.slice(1)}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Sub-parameters toggle */}
      <div className="rounded-md border border-white/10 p-3">
        <div className="flex items-center justify-between">
          <Label className="text-sm">Sub-parameters (e.g. CRR by bank type)</Label>
          <Switch
            checked={subs !== undefined}
            onCheckedChange={(c) =>
              onChange({
                ...param,
                subParameters: c ? (subs ?? [{ label: "", value: "" }]) : undefined,
              })
            }
          />
        </div>
        {subs !== undefined ? (
          <div className="mt-3 space-y-2">
            {subs.map((sp, i) => (
              <div key={i} className="flex items-center gap-2">
                <Input
                  placeholder="Label (Commercial banks)"
                  value={sp.label}
                  onChange={(e) =>
                    onChange({
                      ...param,
                      subParameters: subs.map((x, idx) =>
                        idx === i ? { ...x, label: e.target.value } : x,
                      ),
                    })
                  }
                />
                <Input
                  placeholder="Value (45%)"
                  value={sp.value}
                  onChange={(e) =>
                    onChange({
                      ...param,
                      subParameters: subs.map((x, idx) =>
                        idx === i ? { ...x, value: e.target.value } : x,
                      ),
                    })
                  }
                  className="w-28 font-mono"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="text-destructive"
                  onClick={() =>
                    onChange({
                      ...param,
                      subParameters: subs.filter((_, idx) => idx !== i),
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
                onChange({
                  ...param,
                  subParameters: [...subs, { label: "", value: "" }],
                })
              }
            >
              <Plus className="mr-1 size-4" />
              Add sub-parameter
            </Button>
          </div>
        ) : null}
      </div>

      {/* Corridor values toggle */}
      <div className="rounded-md border border-white/10 p-3">
        <div className="flex items-center justify-between">
          <Label className="text-sm">Asymmetric corridor (SFC)</Label>
          <Switch
            checked={corridor !== undefined}
            onCheckedChange={(c) =>
              onChange({
                ...param,
                corridorValues: c
                  ? (corridor ?? {
                      upper: "",
                      lower: "",
                      standingLendingFacility: "",
                      standingDepositFacility: "",
                    })
                  : undefined,
              })
            }
          />
        </div>
        {corridor !== undefined ? (
          <div className="mt-3 grid gap-2 sm:grid-cols-2">
            <div>
              <Label className="text-xs">Upper</Label>
              <Input
                placeholder="+50"
                value={corridor.upper}
                onChange={(e) =>
                  onChange({
                    ...param,
                    corridorValues: { ...corridor, upper: e.target.value },
                  })
                }
                className="mt-1 font-mono"
              />
            </div>
            <div>
              <Label className="text-xs">Lower</Label>
              <Input
                placeholder="-450"
                value={corridor.lower}
                onChange={(e) =>
                  onChange({
                    ...param,
                    corridorValues: { ...corridor, lower: e.target.value },
                  })
                }
                className="mt-1 font-mono"
              />
            </div>
            <div>
              <Label className="text-xs">Standing Lending Facility</Label>
              <Input
                placeholder="27%"
                value={corridor.standingLendingFacility}
                onChange={(e) =>
                  onChange({
                    ...param,
                    corridorValues: {
                      ...corridor,
                      standingLendingFacility: e.target.value,
                    },
                  })
                }
                className="mt-1 font-mono"
              />
            </div>
            <div>
              <Label className="text-xs">Standing Deposit Facility</Label>
              <Input
                placeholder="22%"
                value={corridor.standingDepositFacility}
                onChange={(e) =>
                  onChange({
                    ...param,
                    corridorValues: {
                      ...corridor,
                      standingDepositFacility: e.target.value,
                    },
                  })
                }
                className="mt-1 font-mono"
              />
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}

export function MpcDataEditor({
  value,
  onChange,
}: {
  value: MpcData;
  onChange: (next: MpcData) => void;
}): ReactElement {
  const patch = (p: Partial<MpcData>) => onChange({ ...value, ...p });

  return (
    <div className="space-y-4">
      {/* Sub-section 1 — Meeting Details */}
      <SubSection title="Meeting Details">
        <div className="grid gap-3 sm:grid-cols-2">
          <div>
            <Label htmlFor="mpcNumber" className="text-sm">
              Meeting Number
            </Label>
            <Input
              id="mpcNumber"
              type="number"
              step="1"
              min="0"
              value={Number.isFinite(value.meetingNumber) ? value.meetingNumber : 0}
              onChange={(e) =>
                patch({ meetingNumber: Math.trunc(num(e.target.value)) })
              }
              className="mt-1 w-32 font-mono"
            />
          </div>
          <div>
            <Label htmlFor="mpcDates" className="text-sm">
              Meeting Dates
            </Label>
            <Input
              id="mpcDates"
              placeholder="May 19–20, 2026"
              value={value.meetingDates}
              onChange={(e) => patch({ meetingDates: e.target.value })}
              className="mt-1"
            />
          </div>
        </div>
      </SubSection>

      {/* Sub-section 2 — Policy Parameters */}
      <SubSection title="Policy Parameters">
        <div className="space-y-3">
          {value.parameters.map((p, i) => (
            <ParameterCard
              key={i}
              param={p}
              onChange={(next) =>
                patch({
                  parameters: value.parameters.map((x, idx) =>
                    idx === i ? next : x,
                  ),
                })
              }
              onRemove={() =>
                patch({
                  parameters: value.parameters.filter((_, idx) => idx !== i),
                })
              }
            />
          ))}
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() =>
              patch({
                parameters: [
                  ...value.parameters,
                  { label: "", value: "", status: "retained" },
                ],
              })
            }
          >
            <Plus className="mr-1 size-4" />
            Add parameter
          </Button>
        </div>
      </SubSection>

      {/* Sub-section 3 — Official Decisions */}
      <SubSection title="Official Decisions">
        <div className="space-y-2">
          {value.decisions.map((d, i) => (
            <div key={i} className="flex items-start gap-2">
              <Textarea
                placeholder="Verbatim CBN decision…"
                value={d}
                onChange={(e) =>
                  patch({
                    decisions: value.decisions.map((x, idx) =>
                      idx === i ? e.target.value : x,
                    ),
                  })
                }
                className="min-h-[64px] flex-1"
              />
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="text-destructive"
                onClick={() =>
                  patch({
                    decisions: value.decisions.filter((_, idx) => idx !== i),
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
            onClick={() => patch({ decisions: [...value.decisions, ""] })}
          >
            <Plus className="mr-1 size-4" />
            Add decision
          </Button>
        </div>
      </SubSection>
    </div>
  );
}
