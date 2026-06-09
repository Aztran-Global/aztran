import { internalMutation } from "./_generated/server";
import { insightsSeedData } from "./seedData/insightsSeedData";
import { ensureUniqueSlug } from "./slugHelpers";

/**
 * Inserts seed insights (GDP / MPC / Inflation / general) for any `slug` not
 * already present. Does not delete or overwrite existing rows, so it is safe to
 * re-run. Cover images / PDFs are attached later via the admin.
 *
 * Run: `npx convex run seedInsights:seedInsights`
 */
export const seedInsights = internalMutation({
  args: {},
  handler: async (ctx) => {
    let inserted = 0;
    let skipped = 0;
    for (const row of insightsSeedData) {
      const existing = await ctx.db
        .query("insights")
        .withIndex("by_slug", (q) => q.eq("slug", row.slug))
        .first();
      if (existing) {
        console.log(`Skipping (already exists): ${row.slug}`);
        skipped += 1;
        continue;
      }

      const slug = await ensureUniqueSlug(ctx, "insights", row.slug);
      const publishedAt =
        row.status === "published"
          ? new Date(`${row.referenceDate}T12:00:00.000Z`).getTime()
          : undefined;

      await ctx.db.insert("insights", {
        title: row.title,
        slug,
        referenceDate: row.referenceDate,
        displayDate: row.displayDate,
        category: row.category,
        tags: row.tags,
        sources: row.sources,
        status: row.status,
        isFeatured: row.isFeatured,
        summary: row.summary,
        sections: row.sections,
        readTimeMinutes: row.readTimeMinutes,
        pdfFileName: row.pdfFileName,
        seoTitle: row.seoTitle,
        seoDescription: row.seoDescription,
        metrics: row.metrics,
        gdpData: row.gdpData,
        mpcData: row.mpcData,
        capitalImportationData: row.capitalImportationData,
        publishedAt,
      });
      console.log(`Seeded: ${slug}`);
      inserted += 1;
    }

    return { inserted, skipped, totalSeedRows: insightsSeedData.length };
  },
});
