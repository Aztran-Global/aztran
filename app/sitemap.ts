import type { MetadataRoute } from "next";
import { api } from "@/convex/_generated/api";
import { absoluteUrl } from "@/lib/seo";
import { getAllServiceSlugs } from "@/lib/services";
import { serverFetchQuery } from "@/lib/server-convex-query";

export const runtime = "nodejs";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  let insightSlugs: string[] = [];
  let blogSlugs: string[] = [];
  let reportSlugs: string[] = [];
  try {
    insightSlugs = await serverFetchQuery(api.insights.getAllInsightSlugs);
  } catch {
    insightSlugs = [];
  }
  try {
    blogSlugs = await serverFetchQuery(api.blogPosts.getAllBlogSlugs);
  } catch {
    blogSlugs = [];
  }
  try {
    reportSlugs = await serverFetchQuery(api.marketReports.getAllMarketReportSlugs);
  } catch {
    reportSlugs = [];
  }

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
    changeFrequency: "weekly",
    priority: path === "" ? 1 : 0.7,
    images: path === "" ? [absoluteUrl("/images/hero-bg.jpg")] : undefined,
  }));

  const insightRoutes: MetadataRoute.Sitemap = insightSlugs.map((slug) => ({
    url: absoluteUrl(`/insights/${slug}`),
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  const blogRoutes: MetadataRoute.Sitemap = blogSlugs.map((slug) => ({
    url: absoluteUrl(`/blog/${slug}`),
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  const reportRoutes: MetadataRoute.Sitemap = reportSlugs.map((slug) => ({
    url: absoluteUrl(`/market-reports/${slug}`),
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 0.65,
  }));

  const serviceRoutes: MetadataRoute.Sitemap = getAllServiceSlugs().map(
    (slug) => ({
      url: absoluteUrl(`/services/${slug}`),
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.65,
    }),
  );

  return [
    ...staticRoutes,
    ...serviceRoutes,
    ...insightRoutes,
    ...blogRoutes,
    ...reportRoutes,
  ];
}
