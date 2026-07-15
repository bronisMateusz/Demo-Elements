import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "node:path";

export default defineConfig({
  plugins: [react()],
  define: {
    "process.env.NODE_ENV": JSON.stringify("development"),
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
