/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VERCEL_DEPLOY: boolean;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
