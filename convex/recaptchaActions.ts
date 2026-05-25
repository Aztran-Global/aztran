"use node";

import { action } from "./_generated/server";
import { v } from "convex/values";

type RecaptchaVerify = {
  success: boolean;
  score?: number;
  "error-codes"?: string[];
};

/**
 * Server-side reCAPTCHA v3 check for admin and other client-initiated actions.
 * Pair with `executeRecaptcha(action)` on the client before sensitive mutations.
 */
export const assertValidToken = action({
  args: { token: v.string() },
  handler: async (_ctx, args) => {
    const secret = process.env.RECAPTCHA_SECRET_KEY;
    if (!secret) {
      throw new Error("Missing RECAPTCHA_SECRET_KEY");
    }

    const verifyRes = await fetch(
      "https://www.google.com/recaptcha/api/siteverify",
      {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({
          secret,
          response: args.token,
        }),
      },
    );

    const verified = (await verifyRes.json()) as RecaptchaVerify;
    if (!verified.success) {
      const codes = verified["error-codes"]?.join(", ") ?? "unknown";
      throw new Error(`reCAPTCHA verification failed (success=false; error-codes: ${codes})`);
    }
    if ((verified.score ?? 0) < 0.5) {
      throw new Error(
        `reCAPTCHA score too low (${String(verified.score)}; minimum 0.5). Try again or check domain / key pairing.`,
      );
    }

    return { score: verified.score ?? 0 };
  },
});
