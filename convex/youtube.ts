/** Server-side YouTube ID parsing (mirror of lib/youtube.ts). */

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
