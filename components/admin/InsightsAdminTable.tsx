"use client";

import Link from "next/link";
import { useMemo, useState, type ReactElement } from "react";
import { useMutation, useQuery } from "convex/react";
import { toast } from "sonner";
import { api } from "@/convex/_generated/api";
import { useConvexStaffSessionReady } from "@/hooks/useConvexStaffSessionReady";
import { useRecaptchaGate } from "@/hooks/useRecaptchaGate";
import type { Doc } from "@/convex/_generated/dataModel";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { insightCategoryPillClass } from "@/lib/insight-display";
import { STRUCTURED_INSIGHT_CATEGORIES } from "@/lib/site-nav";

type StatusFilter = "all" | Doc<"insights">["status"];

const STATUS_FILTERS: StatusFilter[] = [
  "all",
  "published",
  "draft",
  "archived",
];

function statusBadge(status: Doc<"insights">["status"]): ReactElement {
  const variant = status === "published" ? "default" : "secondary";
  return <Badge variant={variant}>{status}</Badge>;
}

function typePill(category: string): ReactElement {
  return (
    <Badge
      variant="outline"
      className={cn("border", insightCategoryPillClass(category))}
    >
      {category}
    </Badge>
  );
}

function FilterChip({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: string;
}): ReactElement {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "rounded-full border px-3 py-1 font-body text-caption capitalize transition-colors",
        active
          ? "border-transparent bg-primary text-primary-foreground"
          : "border-border text-muted-foreground hover:bg-muted",
      )}
    >
      {children}
    </button>
  );
}

/**
 * Administrative listing of insights with type/status filters, a colour-coded
 * type pill, featured flag, and row actions.
 */
export function InsightsAdminTable(): ReactElement {
  const staffReady = useConvexStaffSessionReady();
  const data = useQuery(api.insights.getAllInsights, staffReady ? {} : "skip");
  const rows = useMemo(() => data ?? [], [data]);
  const verifyHuman = useRecaptchaGate();
  const remove = useMutation(api.insights.deleteInsight);

  const [statusFilter, setStatusFilter] = useState<StatusFilter>("all");
  const [categoryFilter, setCategoryFilter] = useState<string>("all");

  const categoryOptions = useMemo(() => {
    const present = new Set(rows.map((r) => r.category));
    // Always surface the structured types even before any exist yet.
    present.add(STRUCTURED_INSIGHT_CATEGORIES.gdp);
    present.add(STRUCTURED_INSIGHT_CATEGORIES.mpc);
    return ["all", ...Array.from(present).sort((a, b) => a.localeCompare(b))];
  }, [rows]);

  const filtered = rows.filter(
    (r) =>
      (statusFilter === "all" || r.status === statusFilter) &&
      (categoryFilter === "all" || r.category === categoryFilter),
  );

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <div className="flex flex-wrap items-center gap-2">
          <span className="font-body text-caption uppercase tracking-wide text-muted-foreground">
            Status
          </span>
          {STATUS_FILTERS.map((s) => (
            <FilterChip
              key={s}
              active={statusFilter === s}
              onClick={() => setStatusFilter(s)}
            >
              {s}
            </FilterChip>
          ))}
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <span className="font-body text-caption uppercase tracking-wide text-muted-foreground">
            Type
          </span>
          {categoryOptions.map((c) => (
            <FilterChip
              key={c}
              active={categoryFilter === c}
              onClick={() => setCategoryFilter(c)}
            >
              {c}
            </FilterChip>
          ))}
        </div>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Title</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Featured</TableHead>
            <TableHead>Reference date</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filtered.map((row: Doc<"insights">) => (
            <TableRow key={row._id}>
              <TableCell className="font-medium">{row.title}</TableCell>
              <TableCell>{typePill(row.category)}</TableCell>
              <TableCell>{statusBadge(row.status)}</TableCell>
              <TableCell>{row.isFeatured ? "Yes" : "—"}</TableCell>
              <TableCell className="whitespace-nowrap font-body text-caption">
                {row.referenceDate}
              </TableCell>
              <TableCell className="flex flex-wrap items-center justify-end gap-2 max-sm:justify-start">
                <Link
                  href={`/admin/insights/${row._id}/edit`}
                  className="inline-flex h-7 items-center rounded-[min(var(--radius-md),12px)] border border-border bg-background px-2.5 text-[0.8rem] font-medium hover:bg-muted"
                >
                  Edit
                </Link>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-destructive"
                  onClick={() => {
                    if (!confirm("Delete this insight?")) return;
                    void (async () => {
                      try {
                        await verifyHuman("admin_insight_delete");
                      } catch {
                        toast.error("Verification failed. Please try again.");
                        return;
                      }
                      await remove({ id: row._id });
                    })();
                  }}
                >
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
          {filtered.length === 0 ? (
            <TableRow>
              <TableCell
                colSpan={6}
                className="py-8 text-center font-body text-caption text-muted-foreground"
              >
                No insights match the current filters.
              </TableCell>
            </TableRow>
          ) : null}
        </TableBody>
      </Table>
    </div>
  );
}
