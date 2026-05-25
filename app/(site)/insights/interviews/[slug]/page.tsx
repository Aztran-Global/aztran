import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { ReactElement } from "react";
import { api } from "@/convex/_generated/api";
import type { Doc } from "@/convex/_generated/dataModel";
import { InterviewCard } from "@/components/ui/InterviewCard";
import { YoutubeEmbed } from "@/components/ui/YoutubeEmbed";
import { createPageMetadata } from "@/lib/seo";
import { serverFetchQuery } from "@/lib/server-convex-query";
import { youtubePosterUrl, youtubeWatchUrl } from "@/lib/youtube";

type PageProps = { params: Promise<{ slug: string }> };

export const runtime = "nodejs";

export async function generateStaticParams(): Promise<{ slug: string }[]> {
  try {
    const slugs = await serverFetchQuery(api.interviews.getAllInterviewSlugs);
    return slugs.map((slug: string) => ({ slug }));
  } catch {
    return [];
  }
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const doc = await serverFetchQuery(api.interviews.getInterviewBySlug, {
    slug,
  });
  if (!doc) {
    return { title: "Interview" };
  }
  return createPageMetadata({
    title: doc.seoTitle ?? doc.title,
    description: doc.seoDescription ?? doc.summary,
    path: `/insights/interviews/${slug}`,
    type: "article",
  });
}

export default async function InterviewDetailPage({
  params,
}: PageProps): Promise<ReactElement> {
  const { slug } = await params;
  const doc = await serverFetchQuery(api.interviews.getInterviewBySlug, {
    slug,
  });
  if (!doc) {
    notFound();
  }

  let coverUrl: string | null = null;
  if (doc.coverImageId) {
    try {
      coverUrl = await serverFetchQuery(api.storage.getFileUrl, {
        storageId: doc.coverImageId,
      });
    } catch {
      coverUrl = null;
    }
  }

  const posterFallback = youtubePosterUrl(doc.youtubeVideoId, "hq");

  let related: Doc<"interviews">[] = [];
  try {
    related = await serverFetchQuery(api.interviews.getRelatedInterviews, {
      slug,
      limit: 3,
    });
  } catch {
    related = [];
  }

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "VideoObject",
    name: doc.title,
    description: doc.summary,
    uploadDate: doc.referenceDate,
    thumbnailUrl: coverUrl ?? posterFallback,
    embedUrl: `https://www.youtube-nocookie.com/embed/${doc.youtubeVideoId}`,
    contentUrl: youtubeWatchUrl(doc.youtubeVideoId),
  };

  return (
    <article className="pb-section pt-28">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="mx-auto max-w-[900px] px-4 md:px-6">
        <p className="font-body text-caption uppercase tracking-[0.2em] text-[var(--color-cyan)]">
          Interview
          <span className="text-[color-mix(in_srgb,var(--color-navy)_58%,transparent)] dark:text-[var(--color-silver)]">
            {" "}
            · {doc.displayDate}
          </span>
        </p>
        <h1 className="mt-4 font-display text-h1 leading-snug text-[var(--color-navy)] dark:text-[var(--color-offwhite)]">
          {doc.title}
        </h1>
      </div>

      <div className="mx-auto mt-10 max-w-[900px] px-4">
        <YoutubeEmbed videoId={doc.youtubeVideoId} title={doc.title} />
        <p className="mt-4 text-center font-body text-caption">
          <a
            href={youtubeWatchUrl(doc.youtubeVideoId)}
            target="_blank"
            rel="noreferrer noopener"
            className="text-[var(--color-cyan)] hover:underline"
          >
            Watch on YouTube
          </a>
        </p>
      </div>

      <div className="mx-auto mt-14 max-w-[720px] px-4 md:px-6">
        <p className="font-body text-body leading-relaxed text-[color-mix(in_srgb,var(--color-navy)_88%,transparent)] dark:text-[var(--color-silver)]">
          {doc.summary}
        </p>
      </div>

      {!doc.coverImageId ? null : (
        <div className="mx-auto mt-14 max-w-[480px] px-4">
          <div className="relative aspect-video overflow-hidden rounded-xl border border-[color-mix(in_srgb,var(--color-silver)_35%,transparent)]">
            <Image
              src={coverUrl ?? posterFallback}
              alt=""
              fill
              className="object-cover"
              unoptimized
            />
          </div>
        </div>
      )}

      {related.length > 0 ? (
        <div className="mx-auto mt-20 max-w-container border-t border-[color-mix(in_srgb,var(--color-silver)_45%,transparent)] px-4 pt-16 dark:border-[color-mix(in_srgb,var(--color-silver)_22%,transparent)] md:px-8">
          <h2 className="font-display text-h2 text-[var(--color-navy)] dark:text-[var(--color-offwhite)]">
            More interviews
          </h2>
          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {related.map((r: Doc<"interviews">) => (
              <InterviewCard key={r._id} interview={r} />
            ))}
          </div>
          <div className="mt-10 text-center">
            <Link
              href="/insights/interviews"
              className="font-body text-label uppercase tracking-wide text-[var(--color-cyan)]"
            >
              All interviews
            </Link>
          </div>
        </div>
      ) : null}
    </article>
  );
}
