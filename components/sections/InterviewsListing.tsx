"use client";

import { usePaginatedQuery, useQuery } from "convex/react";
import { AnimatePresence, motion } from "framer-motion";
import type { ReactElement } from "react";
import { api } from "@/convex/_generated/api";
import type { Doc, Id } from "@/convex/_generated/dataModel";
import { InterviewCard } from "@/components/ui/InterviewCard";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";

function InterviewCardWithCover({
  interview,
}: {
  interview: Doc<"interviews">;
}): ReactElement {
  const coverUrl = useQuery(
    api.storage.getFileUrl,
    interview.coverImageId
      ? { storageId: interview.coverImageId as Id<"_storage"> }
      : "skip",
  );
  return <InterviewCard interview={interview} coverUrl={coverUrl} />;
}

export function InterviewsListing(): ReactElement {
  const { results, status, loadMore } = usePaginatedQuery(
    api.interviews.listPublishedInterviewsPaginated,
    {},
    { initialNumItems: 9 },
  );

  const loading = status === "LoadingFirstPage";
  const empty = !loading && (results ?? []).length === 0;

  return (
    <div>
      <p className="mb-8 max-w-2xl font-body text-body leading-relaxed text-[color-mix(in_srgb,var(--color-navy)_72%,transparent)] dark:text-[var(--color-silver)]">
        Conversations on the ground — Aztran managing directors in dialogue with
        markets, policymakers, and industry leaders. Watch full interviews from
        conferences, panels, and media appearances.
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
            {(results ?? []).map((interview: Doc<"interviews">) => (
              <motion.div
                key={interview._id}
                layout
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
              >
                <InterviewCardWithCover interview={interview} />
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
            Interviews coming soon
          </p>
          <p className="mx-auto mt-3 max-w-sm font-body text-body text-[color-mix(in_srgb,var(--color-navy)_62%,transparent)] dark:text-[var(--color-silver)]">
            We are preparing video conversations with our leadership team. Check
            back shortly.
          </p>
        </div>
      ) : null}
    </div>
  );
}
