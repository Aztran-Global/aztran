"use client";

import type { ReactElement } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { INSIGHT_CATEGORY_ADMIN_OPTIONS } from "@/lib/site-nav";

/**
 * Controlled insight category select. Presentational only — the parent decides
 * which structured-data editor to show based on the chosen value.
 */
export function CategorySelector({
  value,
  onChange,
  options = INSIGHT_CATEGORY_ADMIN_OPTIONS,
}: {
  value: string;
  onChange: (next: string) => void;
  options?: readonly string[];
}): ReactElement {
  const opts =
    value && !options.includes(value) ? [value, ...options] : [...options];

  return (
    <Select value={value} onValueChange={(v) => v && onChange(v)}>
      <SelectTrigger className="mt-2">
        <SelectValue />
      </SelectTrigger>
      <SelectContent className="max-h-[min(24rem,70vh)]">
        {opts.map((c) => (
          <SelectItem key={c} value={c}>
            {c}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
