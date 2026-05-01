import type { MetadataRoute } from "next";
import { api } from "@/convex/_generated/api";
import { absoluteUrl } from "@/lib/seo";
import { getAllServiceSlugs } from "@/lib/services";
import { serverFetchQuery } from "@/lib/server-convex-query";

export const runtime = "nodejs";

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

  /**
   * Omit `images` on the homepage entry: Next.js emits Google image extensions
   * in an element order that breaks strict sitemap XSD validation for some crawlers.
   */
  const staticRoutes: MetadataRoute.Sitemap = [
    "",
    "/about",
    "/services",
    "/portfolio",
    "/insights",
    "/insights/macro-report",
    "/insights/market-report",
    "/insights/market-buzz",
    "/contact",
  ].map((path) => ({
    url: absoluteUrl(path),
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: path === "" ? 1 : 0.7,
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

  return [
    ...staticRoutes,
    ...serviceRoutes,
    ...insightRoutes,
    ...blogRoutes,
    ...reportRoutes,
  ];
}
