import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "node:path";

const webhookUrl =
  process.env.VITE_AGENTATION_WEBHOOK_URL?.trim() || "/api/agentation-feedback";

export default defineConfig({
  plugins: [react()],
  define: {
    "process.env.NODE_ENV": JSON.stringify("development"),
    __AGENTATION_WEBHOOK_URL__: JSON.stringify(webhookUrl),
    __AGENTATION_ENABLED__: JSON.stringify(process.env.VITE_AGENTATION_ENABLED === "true"),
  },
  build: {
    outDir: "assets",
    emptyOutDir: false,
    lib: {
      entry: resolve(process.cwd(), "assets/agentation-entry.jsx"),
      formats: ["es"],
      fileName: () => "agentation-bundle.js",
    },
    rollupOptions: {
      output: {
        inlineDynamicImports: true,
      },
    },
    minify: false,
    sourcemap: false,
  },
});
