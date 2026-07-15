import { createElement } from 'react';
import { createRoot } from 'react-dom/client';
import { Agentation } from 'agentation';

const WEBHOOK_PATH = __AGENTATION_WEBHOOK_URL__ || '/api/agentation-feedback';
const BUILD_FOR_TEAM = __AGENTATION_ENABLED__;

function resolveWebhookUrl() {
  const configured = WEBHOOK_PATH.trim();
  if (/^https?:\/\//i.test(configured)) return configured;
  const path = configured.startsWith('/') ? configured : `/${configured}`;
  return `${window.location.origin}${path}`;
}

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

async function submitFeedbackToGithub(output) {
  const webhookUrl = resolveWebhookUrl();
  const response = await fetch(webhookUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      event: 'submit',
      timestamp: Date.now(),
      url: window.location.href,
      output,
    }),
  });

  const payload = await response.json().catch(() => ({}));
  if (!response.ok) {
    throw new Error(payload.error || `HTTP ${response.status}`);
  }

  return payload;
}

function notifyIssueCreated(issueUrl, issueNumber) {
  console.info(`[Agentation] Utworzono issue #${issueNumber}: ${issueUrl}`);
}

function notifyIssueFailed(error) {
  console.error('[Agentation] Nie udało się utworzyć issue:', error);
}

function mountAgentation() {
  if (!shouldEnable()) return;

  globalThis.process = globalThis.process || { env: {} };
  if (!globalThis.process.env) globalThis.process.env = {};
  if (!globalThis.process.env.NODE_ENV) {
    globalThis.process.env.NODE_ENV = 'development';
  }

  const params = new URLSearchParams(location.search);
  const webhookUrl = resolveWebhookUrl();

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
    webhookUrl,
    onSessionCreated(sessionId) {
      console.info('[Agentation] sesja:', sessionId);
    },
    onCopy(output) {
      submitFeedbackToGithub(output)
        .then((result) => {
          if (result.issueUrl) {
            notifyIssueCreated(result.issueUrl, result.issueNumber);
          }
        })
        .catch(notifyIssueFailed);
    },
    onSubmit(output) {
      submitFeedbackToGithub(output)
        .then((result) => {
          if (result.issueUrl) {
            notifyIssueCreated(result.issueUrl, result.issueNumber);
          }
        })
        .catch(notifyIssueFailed);
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
