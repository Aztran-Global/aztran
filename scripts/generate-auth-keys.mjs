#!/usr/bin/env node
/**
 * Prints AUTH_JWT_* values for Convex custom JWT + Next.js staff cookies.
 * All secrets are emitted as **single lines** (PEMs use `\n` escapes for Vercel/Convex).
 *
 * Usage: AUTH_JWT_ISSUER="https://example.com" node scripts/generate-auth-keys.mjs
 */
import {
  exportJWK,
  exportPKCS8,
  exportSPKI,
  generateKeyPair,
} from "jose";

/** Must match {@link STAFF_JWT_KID} in lib/staff-jwt.ts (JWT header + JWKS). */
const STAFF_JWT_KID = process.env.AUTH_JWT_KID ?? "aztran-staff-1";

const issuer =
  process.env.AUTH_JWT_ISSUER ?? "https://localhost:3000";

const { privateKey, publicKey } = await generateKeyPair("RS256", {
  modulusLength: 2048,
  /** Required so exportPKCS8 / exportSPKI work (Node Web Crypto defaults vary by version). */
  extractable: true,
});

const privPemStr = await exportPKCS8(privateKey);
const pubPemStr = await exportSPKI(publicKey);

const jwk = await exportJWK(publicKey);
jwk.use = "sig";
jwk.alg = "RS256";
jwk.kid = STAFF_JWT_KID;

const jwks = JSON.stringify({ keys: [jwk] });

/** One line for env UIs; matches `lib/*.ts` `.replace(/\\n/g, "\n")`. */
function pemToSingleLine(pem) {
  return pem.trim().replace(/\r\n/g, "\n").split("\n").join("\\n");
}

console.log("Vercel + Convex (same value):");
console.log(`AUTH_JWT_ISSUER=${issuer}`);
console.log("");
console.log("Vercel only (paste each value as one line; PEMs contain literal \\n sequences):");
console.log(`AUTH_JWT_PRIVATE_KEY=${pemToSingleLine(privPemStr)}`);
console.log(`AUTH_JWT_PUBLIC_KEY=${pemToSingleLine(pubPemStr)}`);
console.log("");
console.log("Convex only (paste entire line after = as one env value):");
console.log(`AUTH_JWT_JWKS=${jwks}`);
console.log("");
console.log("Reference (must match lib/staff-jwt.ts; usually do not set as env):");
console.log(`STAFF_JWT_KID=${STAFF_JWT_KID}`);
