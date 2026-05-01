import type { Metadata } from "next";
import { COMPANY_LEGAL_NAME } from "@/lib/brand";
import {
  SITE_DESCRIPTION,
  SITE_KEYWORDS,
  SITE_NAME,
  SITE_TITLE,
} from "@/lib/site-metadata";

const FALLBACK_SITE_URL = "https://www.aztranlimited.com"; // ← added www
const DEFAULT_SOCIAL_IMAGE = "/images/hero-bg.jpg";

function trimTrailingSlash(value: string): string {
  return value.replace(/\/+$/, "");
}

function withProtocol(value: string): string {
  return /^https?:\/\//i.test(value) ? value : `https://${value}`;
}

function isLocalhostSiteUrl(value: string): boolean {
  try {
    const { hostname } = new URL(withProtocol(value));
    return (
      hostname === "localhost" ||
      hostname === "127.0.0.1" ||
      hostname === "[::1]" ||
      hostname.endsWith(".localhost")
    );
  } catch {
    return false;
  }
}

function getSiteUrl(): string {
  const rawAppUrl = process.env.NEXT_PUBLIC_APP_URL?.trim();
  const hasAppUrl = Boolean(rawAppUrl);
  /** On Vercel, a leftover `NEXT_PUBLIC_APP_URL=http://localhost:3000` breaks sitemaps and robots.txt for Google. */
  const useAppUrl =
    hasAppUrl &&
    !(
      process.env.VERCEL === "1" &&
      rawAppUrl !== undefined &&
      isLocalhostSiteUrl(rawAppUrl)
    );

  const configured =
    (useAppUrl ? rawAppUrl : undefined) ??
    process.env.VERCEL_PROJECT_PRODUCTION_URL ??
    process.env.VERCEL_URL ??
    FALLBACK_SITE_URL;

  return trimTrailingSlash(withProtocol(configured));
}

export const SITE_URL = getSiteUrl();

export function absoluteUrl(path = "/"): string {
  if (/^https?:\/\//i.test(path)) {
    return path;
  }

  return `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
}

export function canonicalPath(path = "/"): string {
  return path.startsWith("/") ? path : `/${path}`;
}

export function createPageMetadata({
  title,
  description,
  path = "/",
  type = "website",
  image = DEFAULT_SOCIAL_IMAGE,
  keywords = [],
}: {
  title?: string;
  description?: string;
  path?: string;
  type?: "website" | "article";
  image?: string;
  keywords?: readonly string[];
} = {}): Metadata {
  const metadataTitle = title ?? SITE_TITLE;
  const metadataDescription = description ?? SITE_DESCRIPTION;
  const canonical = canonicalPath(path);
  const imageUrl = absoluteUrl(image);
  const metadataKeywords = Array.from(new Set([...SITE_KEYWORDS, ...keywords]));

  return {
    title: title ? metadataTitle : { absolute: SITE_TITLE },
    description: metadataDescription,
    keywords: metadataKeywords,
    alternates: {
      canonical,
    },
    openGraph: {
      title: metadataTitle,
      description: metadataDescription,
      url: canonical,
      siteName: SITE_NAME,
      locale: "en_NG",
      type,
      images: [
        {
          url: imageUrl,
          alt: COMPANY_LEGAL_NAME,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: metadataTitle,
      description: metadataDescription,
      images: [imageUrl],
    },
  };
}