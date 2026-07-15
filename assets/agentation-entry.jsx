import { createElement } from 'react';
import { createRoot } from 'react-dom/client';
import { Agentation } from 'agentation';

function isGitHubPagesHost(hostname) {
  return hostname === 'github.io' || hostname.endsWith('.github.io');
}

function shouldEnable() {
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
    forcedEnabled
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
  const hostname = location.hostname;
  const isLocal =
    hostname === 'localhost' || hostname === '127.0.0.1' || hostname === '[::1]';

  const configuredEndpoint =
    typeof window.AGENTATION_ENDPOINT === 'string'
      ? window.AGENTATION_ENDPOINT.trim().replace(/\/$/, '')
      : '';

  // Sync tylko gdy jawnie ustawiony AGENTATION_ENDPOINT (np. hostowany serwer).
  // Domyślnie: localStorage + GitHub Issues, bez agentation-mcp.
  const endpoint = configuredEndpoint || '';

  const mountEl = document.createElement('div');
  mountEl.id = 'agentation-root';
  mountEl.setAttribute('data-agentation-root', '');
  document.body.appendChild(mountEl);

  const props = {
    onSessionCreated(sessionId) {
      console.info('[Agentation] sesja:', sessionId);
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
