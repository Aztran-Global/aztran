/**
 * Homepage hero photography — brand building first, then professional workplace slides (`HeroSection`).
 */
export type HeroSlide = {
  src: string;
  alt: string;
};

/** Building / brand hero image (local, `public/images/`). */
export const HERO_PRIMARY_IMAGE: HeroSlide = {
  src: "/images/hero-bg.jpg",
  alt: "",
};

/** Full hero rotation: local brand image first, then diverse professional photography (remote). */
export const HERO_SLIDES: readonly HeroSlide[] = [
  HERO_PRIMARY_IMAGE,
  {
    src: "https://images.unsplash.com/photo-1553877522-43269d4ea984?auto=format&fit=crop&w=1920&q=88",
    alt: "Business professionals collaborating in a modern office",
  },
  {
    src: "https://images.unsplash.com/photo-1556761175-5973da0d4f984?auto=format&fit=crop&w=1920&q=88",
    alt: "Team reviewing strategy together at a conference table",
  },
  {
    src: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=1920&q=88",
    alt: "Professional at work in a corporate setting",
  },
  {
    src: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1920&q=88",
    alt: "Colleagues aligned on goals in a team setting",
  },
];

export const HERO_SLIDE_INTERVAL_MS = 6500;

export function isRemoteHeroImage(src: string): boolean {
  return src.startsWith("https://") || src.startsWith("http://");
}
