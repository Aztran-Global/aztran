"use client";

import { useQuery } from "convex/react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Suspense, useCallback, useEffect, useMemo, type ReactElement } from "react";
import { api } from "@/convex/_generated/api";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  currentMonthKey,
  formatMonthLabel,
  isValidMonthKey,
  mergeMonthOptions,
} from "@/lib/report-month";

type ReportMonthFilterProps = {
  lane: "macro" | "market" | "buzz";
  value: string;
  onChange: (month: string) => void;
  /** Sync selection to `?month=YYYY-MM` in the URL. */
  syncUrl?: boolean;
};

function ReportMonthFilterInner({
  lane,
  value,
  onChange,
  syncUrl = false,
}: ReportMonthFilterProps): ReactElement {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const availableMonths = useQuery(
    lane === "macro"
      ? api.insights.listPublishedMacroMonths
      : lane === "market"
        ? api.marketReports.listPublishedMarketReportMonths
        : api.blogPosts.listPublishedBlogPostMonths,
    {},
  );

  const current = useMemo(() => currentMonthKey(), []);

  const options = useMemo(
    () => mergeMonthOptions(availableMonths ?? [], current),
    [availableMonths, current],
  );

  useEffect(() => {
    if (!syncUrl) return;
    const fromUrl = searchParams.get("month");
    if (fromUrl && isValidMonthKey(fromUrl) && fromUrl !== value) {
      onChange(fromUrl);
    }
  }, [syncUrl, searchParams, value, onChange]);

  const handleChange = useCallback(
    (month: string) => {
      onChange(month);
      if (!syncUrl) return;
      const params = new URLSearchParams(searchParams.toString());
      params.set("month", month);
      router.replace(`${pathname}?${params.toString()}`, { scroll: false });
    },
    [onChange, syncUrl, searchParams, router, pathname],
  );

  return (
    <div className="mb-8 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
      <p className="font-body text-caption uppercase tracking-wide text-[color-mix(in_srgb,var(--color-navy)_55%,transparent)] dark:text-[var(--color-silver)]">
        Showing reports for
      </p>
      <Select
        value={value}
        onValueChange={(month) => {
          if (month) handleChange(month);
        }}
      >
        <SelectTrigger
          className="w-full sm:w-[220px]"
          aria-label="Filter by month"
        >
          <SelectValue placeholder="Select month" />
        </SelectTrigger>
        <SelectContent>
          {options.map((month) => (
            <SelectItem key={month} value={month}>
              {formatMonthLabel(month)}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}

export function ReportMonthFilter(props: ReportMonthFilterProps): ReactElement {
  if (!props.syncUrl) {
    return <ReportMonthFilterInner {...props} />;
  }
  return (
    <Suspense
      fallback={
        <div className="mb-8 h-10 w-full max-w-[220px] animate-pulse rounded-sm bg-[color-mix(in_srgb,var(--color-silver)_30%,transparent)]" />
      }
    >
      <ReportMonthFilterInner {...props} />
    </Suspense>
  );
}
