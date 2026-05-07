import { v } from "convex/values";
import { internalMutation } from "./_generated/server";
import { marketReportsSeedData } from "./seedData/marketReportSeedData";
import { ensureUniqueSlug } from "./slugHelpers";

/**
 * Inserts seed market reports for any `reportDate` not already present.
 * Does not delete or overwrite existing rows.
 */
export const seedMarketReports = internalMutation({
  args: {},
  handler: async (ctx) => {
    let inserted = 0;
    let skipped = 0;
    for (const row of marketReportsSeedData) {
      const existing = await ctx.db
        .query("marketReports")
        .withIndex("by_reportDate", (q) => q.eq("reportDate", row.reportDate))
        .first();
      if (existing) {
        skipped += 1;
        continue;
      }

      const baseSlug = `daily-financial-markets-update-${row.reportDate}`;
      const slug = await ensureUniqueSlug(ctx, "marketReports", baseSlug);
      const publishedAt =
        row.status === "published"
          ? new Date(`${row.reportDate}T12:00:00.000Z`).getTime()
          : undefined;

      await ctx.db.insert("marketReports", {
        slug,
        title: row.title,
        reportDate: row.reportDate,
        displayDate: row.displayDate,
        status: row.status,
        publishedAt,
        pdfFileName: row.pdfFileName,
        moneyMarket: row.moneyMarket,
        treasuryBills: row.treasuryBills,
        fgnBonds: row.fgnBonds,
        ssaEurobonds: row.ssaEurobonds,
        localEquities: row.localEquities,
        globalMarkets: row.globalMarkets,
        sources: row.sources,
        disclaimer: row.disclaimer,
      });
      inserted += 1;
    }

    return {
      inserted,
      skipped,
      totalSeedRows: marketReportsSeedData.length,
    };
  },
});

/**
 * After uploading a PDF to Convex file storage, link it to the report for this date.
 * Run: `npx convex run seedMarketReports:attachMarketReportPdfByReportDate`
 */
export const attachMarketReportPdfByReportDate = internalMutation({
  args: {
    reportDate: v.string(),
    pdfStorageId: v.id("_storage"),
    pdfFileName: v.optional(v.string()),
  },
  handler: async (ctx, { reportDate, pdfStorageId, pdfFileName }) => {
    const row = await ctx.db
      .query("marketReports")
      .withIndex("by_reportDate", (q) => q.eq("reportDate", reportDate))
      .first();
    if (!row) {
      throw new Error(`No market report found for reportDate=${reportDate}`);
    }
    await ctx.db.patch(row._id, {
      pdfStorageId,
      ...(pdfFileName !== undefined ? { pdfFileName } : {}),
    });
    return { id: row._id };
  },
});
