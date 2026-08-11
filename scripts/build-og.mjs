/**
 * Rasterize the Elements Open Graph card (1200×630).
 * Embeds the lifestyle photo as a data URI (resvg-js does not load local JPEG reliably).
 *
 * Usage: node scripts/build-og.mjs
 */
import { spawnSync } from "node:child_process";
import { readFileSync, writeFileSync, mkdtempSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(__dirname, "..");
const ogDir = path.resolve(projectRoot, "public/assets/og");
const svgPath = path.resolve(projectRoot, "assets/og/og-default.svg");
const jpgPath = path.resolve(
  projectRoot,
  "assets/home/inspiration-warm-minimal.jpg",
);
const pngPath = path.resolve(ogDir, "og-default.png");

const jpgBase64 = readFileSync(jpgPath).toString("base64");
const dataUri = `data:image/jpeg;base64,${jpgBase64}`;

let svg = readFileSync(svgPath, "utf8");
svg = svg.replace(
  /<image[\s\S]*?\/>/,
  `<image href="${dataUri}" x="520" y="-40" width="780" height="710" preserveAspectRatio="xMidYMid slice" />`,
);

const tempDir = mkdtempSync(path.join(tmpdir(), "elements-og-"));
const tempSvg = path.join(tempDir, "og-default.svg");
writeFileSync(tempSvg, svg, "utf8");

const result = spawnSync(
  "npx",
  [
    "--yes",
    "@resvg/resvg-js-cli",
    "--fit-width",
    "1200",
    "--font-default-family",
    "Helvetica Neue",
    "--font-sans-serif-family",
    "Helvetica Neue",
    tempSvg,
    pngPath,
  ],
  { cwd: projectRoot, stdio: "inherit", shell: process.platform === "win32" },
);

rmSync(tempDir, { recursive: true, force: true });

if (result.status !== 0) {
  process.exit(result.status ?? 1);
}

console.log(`Wrote ${path.relative(projectRoot, pngPath)}`);
