import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const lines = fs.readFileSync(path.join(root, "seeddata3.ts"), "utf8").split(/\r?\n/);
const slice = lines.slice(1494, 1984).join("\n");

const header = `import type { MarketReportSeedData } from "./marketReportSeedTypes";

/**
 * Extra reports from repo \`seeddata3.ts\` (May 8 weekly, 11, 12, 13).
 * Canonical MarketReportSeedData shape; first 11 dates in that file are duplicates of the main seed bundle.
 */
const DISCLAIMER = \`This report is intended solely for informational purposes and should not be interpreted as investment advice or a recommendation to engage in any financial transactions. Aztran Investments accepts no liability for any decisions made or losses incurred based on its use. Always seek independent professional advice before making financial decisions.

This message and any accompanying documents may contain confidential or privileged information and are intended only for the named recipient. If you are not the intended recipient, please notify the sender immediately, delete this message from your system, and refrain from disclosing, copying, or using any part of it. Electronic communications are not guaranteed to be secure or virus-free; Aztran Investments is not liable for any damage arising from unauthorized access, interception, or the presence of malware.

Opinions expressed that do not relate to the official business of Aztran Investments are those of the author and do not necessarily reflect the views of the firm.\`;

const SOURCES = "NGX, FMDQ, CBN, Investing.com, Aztran Research";
const TITLE = "Daily Financial Markets Update";
const NGA = "Republic Of Nigeria";
const ANG = "Republic Of Angola";
const EGY = "Arab Republic Of Egypt";

export const marketReportsSeedDataPack3Extra: MarketReportSeedData[] = [
${slice}
  ];
`;

const out = path.join(root, "convex/seedData/marketReportSeedPack3Extra.ts");
fs.writeFileSync(out, header);
console.log("Wrote", out, "lines:", header.split("\n").length);
