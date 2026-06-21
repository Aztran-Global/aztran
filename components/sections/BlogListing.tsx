"use client";

import { usePaginatedQuery, useQuery } from "convex/react";
import { useCallback, useMemo, type ReactElement } from "react";
import { api } from "@/convex/_generated/api";
import type { Doc } from "@/convex/_generated/dataModel";
import { BlogCard } from "@/components/ui/BlogCard";
import { ReportMonthFilter } from "@/components/sections/ReportMonthFilter";
import { useUiStore } from "@/store/uiStore";
import { AnimatePresence, motion } from "framer-motion";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { formatMonthLabel } from "@/lib/report-month";

export function BlogListing({
  hideCategoryTabs = false,
}: {
  /** When true, lists all published posts with no category filter row (e.g. `/insights/market-buzz`). */
  hideCategoryTabs?: boolean;
} = {}): ReactElement {
  const category = useUiStore((s) => s.blogCategory);
  const setCategory = useUiStore((s) => s.setBlogCategory);
  const month = useUiStore((s) => s.marketBuzzMonth);
  const setMonth = useUiStore((s) => s.setMarketBuzzMonth);

  const onMonthChange = useCallback(
    (value: string) => {
      setMonth(value);
    },
    [setMonth],
  );

  const categoryList = useQuery(
    api.blogPosts.getPublishedBlogCategories,
    hideCategoryTabs ? "skip" : {},
  );
  const { results, status, loadMore } = usePaginatedQuery(
    api.blogPosts.listPublishedBlogPostsPaginated,
    hideCategoryTabs
      ? { month }
      : { category: category === "All" ? undefined : category },
    { initialNumItems: 9 },
  );

  const categories = useMemo(
    () => (hideCategoryTabs ? [] : ["All", ...(categoryList ?? [])]),
    [hideCategoryTabs, categoryList],
  );
  const loading = status === "LoadingFirstPage";

  const emptyMonthLabel = formatMonthLabel(month);

  return (
    <div>
      {hideCategoryTabs ? (
        <ReportMonthFilter lane="buzz" value={month} onChange={onMonthChange} />
      ) : null}

      {!hideCategoryTabs ? (
        <div
          className="mb-10 flex flex-wrap gap-3 border-b border-[color-mix(in_srgb,var(--color-silver)_45%,transparent)] pb-6 dark:border-[color-mix(in_srgb,var(--color-silver)_22%,transparent)]"
          role="tablist"
        >
          {categories.map((c) => {
            const active = category === c;
            return (
              <button
                key={c}
                type="button"
                role="tab"
                aria-selected={active}
                onClick={() => setCategory(c)}
                className={`rounded-sm px-4 py-2 font-body text-label uppercase tracking-wide transition-colors ${
                  active
                    ? "bg-[var(--color-navy)] text-[var(--color-white)] dark:bg-[var(--color-cyan)] dark:text-[var(--color-navy)]"
                    : "text-[var(--color-navy)] hover:text-[var(--color-cyan)] dark:text-[var(--color-silver)]"
                }`}
              >
                {c}
              </button>
            );
          })}
        </div>
      ) : null}

      <AnimatePresence mode="popLayout">
        {loading ? (
          <div className="grid gap-6 md:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <Skeleton key={i} className="h-72 rounded-sm" />
            ))}
          </div>
        ) : (
          <motion.div layout className="grid gap-6 md:grid-cols-3">
            {results.map((post: Doc<"blogPosts">) => (
              <motion.div
                key={post._id}
                layout
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
              >
                <BlogCard post={post} />
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {!loading && hideCategoryTabs && results.length === 0 ? (
        <div className="rounded-2xl border border-[color-mix(in_srgb,var(--color-silver)_40%,transparent)] bg-[color-mix(in_srgb,var(--color-offwhite)_80%,var(--color-white))] px-8 py-14 text-center dark:border-[color-mix(in_srgb,var(--color-silver)_22%,transparent)] dark:bg-[color-mix(in_srgb,var(--color-navy)_90%,black)]">
          <p className="font-display text-h3 text-[var(--color-navy)] dark:text-[var(--color-offwhite)]">
            No market buzz for {emptyMonthLabel}
          </p>
          <p className="mx-auto mt-3 max-w-sm font-body text-body text-[color-mix(in_srgb,var(--color-navy)_62%,transparent)] dark:text-[var(--color-silver)]">
            Try another month from the filter above.
          </p>
        </div>
      ) : null}

      {status === "CanLoadMore" ? (
        <div className="mt-10 flex justify-center">
          <Button type="button" variant="outline" onClick={() => loadMore(9)}>
            Load more
          </Button>
        </div>
      ) : null}
    </div>
  );
}
