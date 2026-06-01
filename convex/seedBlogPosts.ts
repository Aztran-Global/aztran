import { internalMutation } from "./_generated/server";
import { blogPostsSeedData } from "./seedData/blogPostsSeedData";
import { ensureUniqueSlug } from "./slugHelpers";

/**
 * Inserts seed blog posts (Market Buzz) for any `slug` not already present.
 * Does not delete or overwrite existing rows. Cover/inline images are added
 * later via the admin.
 *
 * Run: `npx convex run seedBlogPosts:seedBlogPosts`
 */
export const seedBlogPosts = internalMutation({
  args: {},
  handler: async (ctx) => {
    let inserted = 0;
    let skipped = 0;
    for (const row of blogPostsSeedData) {
      const existing = await ctx.db
        .query("blogPosts")
        .withIndex("by_slug", (q) => q.eq("slug", row.slug))
        .first();
      if (existing) {
        skipped += 1;
        continue;
      }

      const slug = await ensureUniqueSlug(ctx, "blogPosts", row.slug);
      const publishedAt =
        row.status === "published"
          ? new Date(`${row.referenceDate}T12:00:00.000Z`).getTime()
          : undefined;

      await ctx.db.insert("blogPosts", {
        title: row.title,
        slug,
        seriesName: row.seriesName,
        referenceDate: row.referenceDate,
        displayDate: row.displayDate,
        author: row.author,
        category: row.category,
        tags: row.tags,
        status: row.status,
        isFeatured: row.isFeatured,
        intro: row.intro,
        sections: row.sections,
        readTimeMinutes: row.readTimeMinutes,
        summary: row.summary,
        seoTitle: row.seoTitle,
        seoDescription: row.seoDescription,
        publishedAt,
      });
      inserted += 1;
    }

    return {
      inserted,
      skipped,
      totalSeedRows: blogPostsSeedData.length,
    };
  },
});
