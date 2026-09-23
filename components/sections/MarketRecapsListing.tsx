"use client";

import { usePaginatedQuery, useQuery } from "convex/react";
import { AnimatePresence, motion } from "framer-motion";
import type { ReactElement } from "react";
import { api } from "@/convex/_generated/api";
import type { Doc, Id } from "@/convex/_generated/dataModel";
import { MarketRecapCard } from "@/components/ui/MarketRecapCard";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";

function MarketRecapCardWithCover({
  marketRecap,
}: {
  marketRecap: Doc<"marketRecaps">;
}): ReactElement {
  const coverUrl = useQuery(
    api.storage.getFileUrl,
    marketRecap.coverImageId
      ? { storageId: marketRecap.coverImageId as Id<"_storage"> }
      : "skip",
  );
  return <MarketRecapCard marketRecap={marketRecap} coverUrl={coverUrl} />;
}

export function MarketRecapsListing(): ReactElement {
  const { results, status, loadMore } = usePaginatedQuery(
    api.marketRecaps.listPublishedMarketRecapsPaginated,
    {},
    { initialNumItems: 9 },
  );

  const loading = status === "LoadingFirstPage";
  const empty = !loading && (results ?? []).length === 0;

  return (
    <div>
      <p className="mb-8 max-w-2xl font-body text-body leading-relaxed text-[color-mix(in_srgb,var(--color-navy)_72%,transparent)] dark:text-[var(--color-silver)]">
        Short video wraps on what moved markets — rates, FX, equities, and flow —
        from the Aztran desk. Catch up on recent market recaps in a few minutes.
      </p>

      <AnimatePresence mode="popLayout">
        {loading ? (
          <div className="grid gap-6 md:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <Skeleton key={i} className="h-80 rounded-sm" />
            ))}
          </div>
        ) : (
          <motion.div layout className="grid gap-6 md:grid-cols-3">
            {(results ?? []).map((marketRecap: Doc<"marketRecaps">) => (
              <motion.div
                key={marketRecap._id}
                layout
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
              >
                <MarketRecapCardWithCover marketRecap={marketRecap} />
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {status === "CanLoadMore" ? (
        <div className="mt-10 flex justify-center">
          <Button type="button" variant="outline" onClick={() => loadMore(9)}>
            Load more
          </Button>
        </div>
      ) : null}

      {empty ? (
        <div className="rounded-2xl border border-[color-mix(in_srgb,var(--color-silver)_40%,transparent)] bg-[color-mix(in_srgb,var(--color-offwhite)_80%,var(--color-white))] px-8 py-14 text-center dark:border-[color-mix(in_srgb,var(--color-silver)_22%,transparent)] dark:bg-[color-mix(in_srgb,var(--color-navy)_90%,black)]">
          <p className="font-display text-h3 text-[var(--color-navy)] dark:text-[var(--color-offwhite)]">
            Market recaps coming soon
          </p>
          <p className="mx-auto mt-3 max-w-sm font-body text-body text-[color-mix(in_srgb,var(--color-navy)_62%,transparent)] dark:text-[var(--color-silver)]">
            We are preparing video wraps of recent market activity. Check back
            shortly.
          </p>
        </div>
      ) : null}
    </div>
  );
}
