/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VERCEL_DEPLOY: boolean;
  readonly VITE_AGENTATION_ENABLED?: string;
  readonly VITE_DEPLOY_TARGET?: "client" | "team";
  readonly VITE_AGENTATION_WEBHOOK_URL?: string;
}

declare global {
  interface Window {
    AGENTATION_ENABLED?: boolean;
    AGENTATION_DISABLED?: boolean;
    AGENTATION_ENDPOINT?: string;
    AGENTATION_SESSION_ID?: string;
    __vite_plugin_react_preamble_installed__?: boolean;
  }
}

export {};
