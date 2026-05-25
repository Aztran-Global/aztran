import type { ReactElement } from "react";
import { youtubeEmbedUrl } from "@/lib/youtube";
import { cn } from "@/lib/utils";

type YoutubeEmbedProps = {
  videoId: string;
  title: string;
  className?: string;
};

/**
 * Responsive privacy-enhanced YouTube embed for interview detail pages.
 */
export function YoutubeEmbed({
  videoId,
  title,
  className,
}: YoutubeEmbedProps): ReactElement {
  return (
    <div
      className={cn(
        "relative aspect-video w-full overflow-hidden rounded-2xl border border-[color-mix(in_srgb,var(--color-silver)_35%,transparent)] bg-black shadow-[0_12px_40px_-16px_color-mix(in_srgb,var(--color-navy)_25%,transparent)] dark:border-[color-mix(in_srgb,var(--color-silver)_22%,transparent)]",
        className,
      )}
    >
      <iframe
        src={youtubeEmbedUrl(videoId)}
        title={title}
        loading="lazy"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
        referrerPolicy="strict-origin-when-cross-origin"
        className="absolute inset-0 h-full w-full border-0"
      />
    </div>
  );
}
