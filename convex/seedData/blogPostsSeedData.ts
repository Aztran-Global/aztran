/**
 * Aztran Blog Posts (Market Buzz) — Seed Data
 *
 * Run: `npx convex run seedBlogPosts:seedBlogPosts`
 *
 * This array is intentionally empty — seeded posts now live in the database.
 * Add new posts here to seed more (the mutation skips any `slug` that already
 * exists). Cover/inline images are uploaded later via Admin → Blog → edit.
 */

export interface BlogSectionSeed {
  heading?: string;
  paragraphs: string[];
  /** Inline image is added later in the admin; caption set alongside it. */
  imageCaption?: string;
}

export interface BlogPostSeedData {
  title: string;
  slug: string;
  seriesName: string;
  referenceDate: string;
  displayDate: string;
  author: string;
  category: string;
  tags: string[];
  status: "draft" | "published" | "archived";
  isFeatured: boolean;
  summary: string;
  intro: string;
  sections: BlogSectionSeed[];
  readTimeMinutes: number;
  seoTitle: string;
  seoDescription: string;
}

export const blogPostsSeedData: BlogPostSeedData[] = [];
