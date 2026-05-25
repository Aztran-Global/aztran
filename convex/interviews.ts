import { paginationOptsValidator } from "convex/server";
import { mutation, query, type MutationCtx } from "./_generated/server";
import { v } from "convex/values";
import { requireUser } from "./auth";
import type { Id } from "./_generated/dataModel";
import { publishStatus } from "./contentValidators";
import { parseYoutubeVideoId } from "./youtube";
import { ensureUniqueSlug, slugFromTitle } from "./slugHelpers";

async function deleteInterviewAssets(
  ctx: MutationCtx,
  row: { coverImageId?: Id<"_storage"> },
) {
  if (row.coverImageId) {
    await ctx.storage.delete(row.coverImageId);
  }
}

const interviewCreateArgs = {
  title: v.string(),
  slug: v.string(),
  youtubeUrl: v.string(),
  summary: v.string(),
  referenceDate: v.string(),
  displayDate: v.string(),
  status: publishStatus,
  coverImageId: v.optional(v.id("_storage")),
  seoTitle: v.optional(v.string()),
  seoDescription: v.optional(v.string()),
  publishedAt: v.optional(v.number()),
  createdBy: v.optional(v.string()),
  updatedBy: v.optional(v.string()),
};

const interviewPatchArgs = v.object({
  title: v.optional(v.string()),
  slug: v.optional(v.string()),
  youtubeUrl: v.optional(v.string()),
  summary: v.optional(v.string()),
  referenceDate: v.optional(v.string()),
  displayDate: v.optional(v.string()),
  status: v.optional(publishStatus),
  coverImageId: v.optional(v.id("_storage")),
  seoTitle: v.optional(v.string()),
  seoDescription: v.optional(v.string()),
  publishedAt: v.optional(v.number()),
  createdBy: v.optional(v.string()),
  updatedBy: v.optional(v.string()),
});

function resolveVideoId(url: string): string {
  const id = parseYoutubeVideoId(url);
  if (!id) {
    throw new Error("Invalid YouTube URL or video ID");
  }
  return id;
}

export const listPublishedInterviewsPaginated = query({
  args: { paginationOpts: paginationOptsValidator },
  handler: async (ctx, { paginationOpts }) => {
    return await ctx.db
      .query("interviews")
      .withIndex("by_status_referenceDate", (q) => q.eq("status", "published"))
      .order("desc")
      .paginate(paginationOpts);
  },
});

export const getInterviewBySlug = query({
  args: { slug: v.string() },
  handler: async (ctx, { slug }) => {
    const row = await ctx.db
      .query("interviews")
      .withIndex("by_slug", (q) => q.eq("slug", slug))
      .first();
    if (!row || row.status !== "published") return null;
    return row;
  },
});

export const getRelatedInterviews = query({
  args: { slug: v.string(), limit: v.optional(v.number()) },
  handler: async (ctx, { slug, limit }) => {
    const n = limit ?? 3;
    const rows = await ctx.db
      .query("interviews")
      .withIndex("by_status_referenceDate", (q) => q.eq("status", "published"))
      .order("desc")
      .take(n + 1);
    return rows.filter((r) => r.slug !== slug).slice(0, n);
  },
});

export const getAllInterviewSlugs = query({
  args: {},
  handler: async (ctx) => {
    const rows = await ctx.db
      .query("interviews")
      .withIndex("by_status", (q) => q.eq("status", "published"))
      .collect();
    return rows.map((r) => r.slug);
  },
});

export const getAllInterviews = query({
  args: {},
  handler: async (ctx) => {
    await requireUser(ctx);
    const rows = await ctx.db.query("interviews").collect();
    return rows.sort((a, b) => b.referenceDate.localeCompare(a.referenceDate));
  },
});

export const getInterviewById = query({
  args: { id: v.id("interviews") },
  handler: async (ctx, { id }) => {
    await requireUser(ctx);
    return await ctx.db.get(id);
  },
});

export const createInterview = mutation({
  args: interviewCreateArgs,
  handler: async (ctx, args) => {
    await requireUser(ctx);
    const slug = await ensureUniqueSlug(
      ctx,
      "interviews",
      args.slug || slugFromTitle(args.title),
    );
    const { youtubeUrl, ...rest } = args;
    return await ctx.db.insert("interviews", {
      ...rest,
      slug,
      youtubeVideoId: resolveVideoId(youtubeUrl),
    });
  },
});

export const updateInterview = mutation({
  args: {
    id: v.id("interviews"),
    patch: interviewPatchArgs,
  },
  handler: async (ctx, { id, patch }) => {
    await requireUser(ctx);
    const existing = await ctx.db.get(id);
    if (!existing) throw new Error("Interview not found");
    const nextPatch: Record<string, unknown> = { ...patch };
    if (patch.youtubeUrl !== undefined) {
      nextPatch.youtubeVideoId = resolveVideoId(patch.youtubeUrl);
      delete nextPatch.youtubeUrl;
    }
    if (nextPatch.slug !== undefined || nextPatch.title !== undefined) {
      const title = (nextPatch.title as string | undefined) ?? existing.title;
      const base = slugFromTitle((nextPatch.slug as string | undefined) ?? title);
      nextPatch.slug = await ensureUniqueSlug(ctx, "interviews", base, id);
    }
    await ctx.db.patch(id, nextPatch);
  },
});

export const publishInterview = mutation({
  args: { id: v.id("interviews") },
  handler: async (ctx, { id }) => {
    await requireUser(ctx);
    await ctx.db.patch(id, {
      status: "published",
      publishedAt: Date.now(),
    });
  },
});

export const unpublishInterview = mutation({
  args: { id: v.id("interviews") },
  handler: async (ctx, { id }) => {
    await requireUser(ctx);
    await ctx.db.patch(id, { status: "draft" });
  },
});

export const archiveInterview = mutation({
  args: { id: v.id("interviews") },
  handler: async (ctx, { id }) => {
    await requireUser(ctx);
    await ctx.db.patch(id, { status: "archived" });
  },
});

export const deleteInterview = mutation({
  args: { id: v.id("interviews") },
  handler: async (ctx, { id }) => {
    await requireUser(ctx);
    const row = await ctx.db.get(id);
    if (!row) return;
    await deleteInterviewAssets(ctx, row);
    await ctx.db.delete(id);
  },
});
