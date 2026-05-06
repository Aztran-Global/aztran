declare global {
  interface Window {
    grecaptcha?: {
      ready: (cb: () => void) => void;
      execute: (siteKey: string, opts: { action: string }) => Promise<string>;
    };
  }
}

/**
 * Waits for Google's script to define `window.grecaptcha` (loads `afterInteractive`).
 */
function waitForGrecaptcha(timeoutMs = 12_000, intervalMs = 50): Promise<void> {
  if (typeof window === "undefined") {
    return Promise.reject(new Error("reCAPTCHA not loaded"));
  }
  if (window.grecaptcha) {
    return Promise.resolve();
  }
  return new Promise((resolve, reject) => {
    const start = Date.now();
    const id = window.setInterval(() => {
      if (window.grecaptcha) {
        window.clearInterval(id);
        resolve();
        return;
      }
      if (Date.now() - start > timeoutMs) {
        window.clearInterval(id);
        reject(new Error("reCAPTCHA not loaded"));
      }
    }, intervalMs);
  });
}

/**
 * Executes Google reCAPTCHA v3 and returns a token for server-side verification.
 */
export async function executeRecaptcha(action: string): Promise<string> {
  const siteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;
  if (!siteKey) {
    throw new Error("Missing NEXT_PUBLIC_RECAPTCHA_SITE_KEY");
  }
  await waitForGrecaptcha();
  const client = window.grecaptcha;
  if (!client) {
    throw new Error("reCAPTCHA not loaded");
  }
  return await new Promise<string>((resolve, reject) => {
    client.ready(async () => {
      try {
        const token = await client.execute(siteKey, { action });
        resolve(token);
      } catch (err) {
        reject(err);
      }
    });
  });
}
