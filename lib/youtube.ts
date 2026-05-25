/** Extract YouTube video ID from common URL formats. */

const PATTERNS: readonly RegExp[] = [
  /(?:youtube\.com\/watch\?v=|youtube\.com\/watch\?.+&v=)([a-zA-Z0-9_-]{11})/,
  /youtu\.be\/([a-zA-Z0-9_-]{11})/,
  /youtube\.com\/embed\/([a-zA-Z0-9_-]{11})/,
  /youtube\.com\/shorts\/([a-zA-Z0-9_-]{11})/,
  /^([a-zA-Z0-9_-]{11})$/,
];

export function parseYoutubeVideoId(input: string): string | null {
  const trimmed = input.trim();
  if (!trimmed) return null;
  for (const re of PATTERNS) {
    const m = trimmed.match(re);
    if (m?.[1]) return m[1];
  }
  return null;
}

export function youtubeEmbedUrl(videoId: string): string {
  return `https://www.youtube-nocookie.com/embed/${videoId}`;
}

export function youtubePosterUrl(videoId: string, quality: "hq" | "max" = "hq"): string {
  const file = quality === "max" ? "maxresdefault" : "hqdefault";
  return `https://i.ytimg.com/vi/${videoId}/${file}.jpg`;
}

export function youtubeWatchUrl(videoId: string): string {
  return `https://www.youtube.com/watch?v=${videoId}`;
}
