import { access, cp, mkdir } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, "..");

const agentationEnabled = process.env.VITE_AGENTATION_ENABLED === "true";

const filesToCopy = agentationEnabled
  ? [["assets/agentation-bundle.js", "dist/assets/agentation-bundle.js"]]
  : [];

async function copyRuntimeAssets() {
  for (const [from, to] of filesToCopy) {
    const src = path.resolve(projectRoot, from);
    const dest = path.resolve(projectRoot, to);
    await mkdir(path.dirname(dest), { recursive: true });
    await cp(src, dest);
  }

  const faviconSourceDir = path.resolve(projectRoot, "public/assets/favicon");
  const faviconDestDir = path.resolve(projectRoot, "dist/assets/favicon");
  await mkdir(path.dirname(faviconDestDir), { recursive: true });
  await cp(faviconSourceDir, faviconDestDir, { recursive: true });

  const productsSourceDir = path.resolve(projectRoot, "assets/products");
  const productsDestDir = path.resolve(projectRoot, "dist/assets/products");
  await mkdir(path.dirname(productsDestDir), { recursive: true });
  await cp(productsSourceDir, productsDestDir, { recursive: true });

  const requiredFaviconFiles = [
    "favicon.svg",
    "favicon-96x96.png",
    "favicon.ico",
    "apple-touch-icon.png",
    "site.webmanifest",
    "web-app-manifest-192x192.png",
    "web-app-manifest-512x512.png",
  ];

  for (const fileName of requiredFaviconFiles) {
    const expectedPath = path.resolve(faviconDestDir, fileName);
    await access(expectedPath);
  }

  const requiredProductFiles = [
    "montebianco/01-front.jpg",
    "montebianco/placeholder.jpg",
  ];

  for (const fileName of requiredProductFiles) {
    const expectedPath = path.resolve(productsDestDir, fileName);
    await access(expectedPath);
  }
}

copyRuntimeAssets().catch((error) => {
  console.error("Failed to copy runtime assets:", error);
  process.exit(1);
});
