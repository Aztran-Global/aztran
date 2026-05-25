import type { MetadataRoute } from "next";
import { api } from "@/convex/_generated/api";
import { absoluteUrl } from "@/lib/seo";
import { getAllServiceSlugs } from "@/lib/services";
import { serverFetchQuery } from "@/lib/server-convex-query";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const revalidate = 0;

/** Slugs safe for `/segment/...` URLs and XML `<loc>` (no entity-escape hazards). */
function filterIndexableSlugs(slugs: readonly string[]): string[] {
  const bad = /[<>&"'\s#?%[\]\\]|\/\/|^\./;
  return slugs.filter(
    (s) =>
      s.length > 0 &&
      s.length < 512 &&
      !bad.test(s) &&
      !s.includes("/") &&
      !s.includes(".."),
  );
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  let insightSlugs: string[] = [];
  let blogSlugs: string[] = [];
  let reportSlugs: string[] = [];
  let interviewSlugs: string[] = [];

  try {
    insightSlugs = filterIndexableSlugs(
      await serverFetchQuery(api.insights.getAllInsightSlugs),
    );
  } catch {
    insightSlugs = [];
  }

  try {
    blogSlugs = filterIndexableSlugs(
      await serverFetchQuery(api.blogPosts.getAllBlogSlugs),
    );
  } catch {
    blogSlugs = [];
  }

  try {
    reportSlugs = filterIndexableSlugs(
      await serverFetchQuery(api.marketReports.getAllMarketReportSlugs),
    );
  } catch {
    reportSlugs = [];
  }

  try {
    interviewSlugs = filterIndexableSlugs(
      await serverFetchQuery(api.interviews.getAllInterviewSlugs),
    );
  } catch {
    interviewSlugs = [];
  }

  const staticRoutes: MetadataRoute.Sitemap = [
    "/",
    "/about",
    "/services",
    "/portfolio",
    "/insights",
    "/insights/macro-report",
    "/insights/market-report",
    "/insights/market-buzz",
    "/insights/interviews",
    "/contact",
  ].map((path) => ({
    url: absoluteUrl(path),
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: path === "/" ? 1 : 0.7,
  }));

  const serviceRoutes: MetadataRoute.Sitemap = getAllServiceSlugs().map(
    (slug) => ({
      url: absoluteUrl(`/services/${slug}`),
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.65,
    }),
  );

  const insightRoutes: MetadataRoute.Sitemap = insightSlugs.map((slug) => ({
    url: absoluteUrl(`/insights/${slug}`),
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  const blogRoutes: MetadataRoute.Sitemap = blogSlugs.map((slug) => ({
    url: absoluteUrl(`/blog/${slug}`),
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  const reportRoutes: MetadataRoute.Sitemap = reportSlugs.map((slug) => ({
    url: absoluteUrl(`/market-reports/${slug}`),
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.65,
  }));

  const interviewRoutes: MetadataRoute.Sitemap = interviewSlugs.map((slug) => ({
    url: absoluteUrl(`/insights/interviews/${slug}`),
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  return [
    ...staticRoutes,
    ...serviceRoutes,
    ...insightRoutes,
    ...blogRoutes,
    ...reportRoutes,
    ...interviewRoutes,
  ];
}