import Script from "next/script";
import type { ReactElement } from "react";

/**
 * Loads Google reCAPTCHA v3 when `NEXT_PUBLIC_RECAPTCHA_SITE_KEY` is set.
 * Required on any route that calls {@link executeRecaptcha} (admin uploads, contact form, etc.).
 */
export function RecaptchaScript(): ReactElement | null {
  const key = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;
  if (!key) {
    return null;
  }
  return (
    <Script
      src={`https://www.google.com/recaptcha/api.js?render=${key}`}
      strategy="afterInteractive"
    />
  );
}
