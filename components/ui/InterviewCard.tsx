import Image from "next/image";
import Link from "next/link";
import type { ReactElement } from "react";
import type { Doc } from "@/convex/_generated/dataModel";
import { youtubePosterUrl } from "@/lib/youtube";
import { cn } from "@/lib/utils";

type InterviewCardProps = {
  interview: Doc<"interviews">;
  coverUrl?: string | null;
  className?: string;
};

export function InterviewCard({
  interview,
  coverUrl,
  className,
}: InterviewCardProps): ReactElement {
  const thumb =
    coverUrl ?? youtubePosterUrl(interview.youtubeVideoId, "hq");

  return (
    <Link
      href={`/insights/interviews/${interview.slug}`}
      className={cn(
        "group flex h-full flex-col overflow-hidden rounded-2xl border border-[color-mix(in_srgb,var(--color-silver)_35%,transparent)] bg-[var(--color-white)] shadow-[0_6px_28px_-12px_color-mix(in_srgb,var(--color-navy)_12%,transparent)] transition-[transform,box-shadow,border-color] duration-500 hover:-translate-y-2 hover:border-[color-mix(in_srgb,var(--color-cyan)_45%,transparent)] hover:shadow-[0_24px_48px_-16px_color-mix(in_srgb,var(--color-navy)_18%,transparent)] dark:border-[color-mix(in_srgb,var(--color-silver)_22%,transparent)] dark:bg-[color-mix(in_srgb,var(--color-navy)_88%,black)] dark:hover:shadow-[0_24px_48px_-16px_rgba(0,0,0,0.4)]",
        className,
      )}
    >
      <div className="relative aspect-video w-full overflow-hidden bg-[var(--color-navy)]">
        <Image
          src={thumb}
          alt=""
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
          sizes="(max-width: 768px) 100vw, 33vw"
          unoptimized
        />
        <span
          className="absolute inset-0 flex items-center justify-center bg-[color-mix(in_srgb,var(--color-navy)_35%,transparent)] transition-colors group-hover:bg-[color-mix(in_srgb,var(--color-navy)_20%,transparent)]"
          aria-hidden
        >
          <span className="flex h-14 w-14 items-center justify-center rounded-full bg-[var(--color-cyan)] text-[var(--color-navy)] shadow-lg">
            <svg viewBox="0 0 24 24" className="ml-1 h-6 w-6 fill-current" aria-hidden>
              <path d="M8 5v14l11-7z" />
            </svg>
          </span>
        </span>
      </div>
      <div className="flex flex-1 flex-col p-7">
        <p className="font-body text-caption uppercase tracking-[0.2em] text-[var(--color-cyan)]">
          Interview
        </p>
        <h3 className="mt-3 font-display text-h3 leading-snug text-[var(--color-navy)] group-hover:text-[var(--color-cyan)] dark:text-[var(--color-offwhite)]">
          {interview.title}
        </h3>
        <p className="mt-2 font-body text-caption text-[color-mix(in_srgb,var(--color-navy)_58%,transparent)] dark:text-[var(--color-silver)]">
          {interview.displayDate}
        </p>
        <p className="mt-3 line-clamp-3 flex-1 font-body text-body text-[color-mix(in_srgb,var(--color-navy)_88%,transparent)] dark:text-[var(--color-silver)]">
          {interview.summary}
        </p>
        <span className="mt-4 inline-flex font-body text-label uppercase tracking-wide text-[var(--color-cyan)]">
          Watch interview →
        </span>
      </div>
    </Link>
  );
}
