import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig(({ command }) => {
  const configuredBase = process.env.VITE_BASE_PATH;
  const defaultBase = process.env.VERCEL ? "/" : "/Demo-Elements/";
  const base = command === "serve" ? "/" : (configuredBase ?? defaultBase);

  return {
    plugins: [react(), tailwindcss()],
    base,
    define: {
      "import.meta.env.VERCEL_DEPLOY": JSON.stringify(process.env.VERCEL === "1"),
    },
    server: {
      port: 5173,
      strictPort: false,
    },
  };
});
