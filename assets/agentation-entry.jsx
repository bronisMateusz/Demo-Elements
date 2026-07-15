import { createElement } from 'react';
import { createRoot } from 'react-dom/client';
import { Agentation } from 'agentation';

const WEBHOOK_URL = __AGENTATION_WEBHOOK_URL__;
const BUILD_FOR_TEAM = __AGENTATION_ENABLED__;

function isGitHubPagesHost(hostname) {
  return hostname === 'github.io' || hostname.endsWith('.github.io');
}

function shouldEnable() {
  if (!BUILD_FOR_TEAM) return false;

  const params = new URLSearchParams(location.search);
  const hostname = location.hostname;
  const isLocal =
    hostname === 'localhost' || hostname === '127.0.0.1' || hostname === '[::1]';
  const isViteDev = Boolean(window.__vite_plugin_react_preamble_installed__);
  const forcedEnabled =
    params.get('agentation') === '1' || params.has('review') || window.AGENTATION_ENABLED === true;
  const forceDisabled =
    params.get('agentation') === '0' ||
    params.has('noagentation') ||
    window.AGENTATION_DISABLED === true ||
    localStorage.getItem('agentation:disabled') === '1';

  if (forceDisabled) return false;
  if (isViteDev && !forcedEnabled) return false;

  return (
    isLocal ||
    isGitHubPagesHost(hostname) ||
    hostname.endsWith('.vercel.app') ||
    forcedEnabled ||
    BUILD_FOR_TEAM
  );
}

function mountAgentation() {
  if (!shouldEnable()) return;

  globalThis.process = globalThis.process || { env: {} };
  if (!globalThis.process.env) globalThis.process.env = {};
  if (!globalThis.process.env.NODE_ENV) {
    globalThis.process.env.NODE_ENV = 'development';
  }

  const params = new URLSearchParams(location.search);

  const configuredEndpoint =
    typeof window.AGENTATION_ENDPOINT === 'string'
      ? window.AGENTATION_ENDPOINT.trim().replace(/\/$/, '')
      : '';

  const endpoint = configuredEndpoint || '';

  const mountEl = document.createElement('div');
  mountEl.id = 'agentation-root';
  mountEl.setAttribute('data-agentation-root', '');
  document.body.appendChild(mountEl);

  const props = {
    webhookUrl: WEBHOOK_URL,
    onSessionCreated(sessionId) {
      console.info('[Agentation] sesja:', sessionId);
    },
    onSubmit(output) {
      const match = output.match(/^## Page Feedback:\s*(.+)$/m);
      console.info('[Agentation] wysłano review:', match?.[1]?.trim() ?? 'strona');
    },
  };

  if (endpoint) {
    props.endpoint = endpoint;
  }

  const sessionFromQuery = params.get('session');
  const sessionFromWindow =
    typeof window.AGENTATION_SESSION_ID === 'string'
      ? window.AGENTATION_SESSION_ID.trim()
      : '';

  const sessionId = sessionFromWindow || sessionFromQuery;
  if (sessionId) {
    props.sessionId = sessionId;
  }

  createRoot(mountEl).render(createElement(Agentation, props));
}

try {
  mountAgentation();
} catch (err) {
  console.error('[Agentation] nie udało się załadować:', err);
}
