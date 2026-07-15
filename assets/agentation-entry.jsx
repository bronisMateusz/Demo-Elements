import { createElement } from 'react';
import { createRoot } from 'react-dom/client';
import { Agentation } from 'agentation';

const WEBHOOK_PATH = __AGENTATION_WEBHOOK_URL__ || '/api/agentation-feedback';
const BUILD_FOR_TEAM = __AGENTATION_ENABLED__;
const SETTINGS_KEY = 'feedback-toolbar-settings';
const POSITION_LAYOUT_KEY = 'elements-agentation-position-v2';
const STYLE_ID = 'elements-agentation-overrides';

function injectAgentationStyles(minimalToolbar) {
  if (document.getElementById(STYLE_ID)) return;

  const style = document.createElement('style');
  style.id = STYLE_ID;
  style.textContent = `
    .elements-agentation-toolbar {
      left: 1rem !important;
      right: auto !important;
      bottom: 1rem !important;
      width: auto !important;
      max-width: calc(100vw - 2rem);
    }

    .elements-agentation-toolbar [class*="sendButtonWrapper"] {
      display: flex !important;
    }

    ${
      minimalToolbar
        ? `
    .elements-agentation-toolbar [class*="controlsContent"] > [class*="buttonWrapper"]:nth-child(1),
    .elements-agentation-toolbar [class*="controlsContent"] > [class*="buttonWrapper"]:nth-child(2),
    .elements-agentation-toolbar [class*="controlsContent"] > [class*="buttonWrapper"]:nth-child(3),
    .elements-agentation-toolbar [class*="controlsContent"] > [class*="buttonWrapper"]:nth-child(4),
    .elements-agentation-toolbar [class*="controlsContent"] > [class*="buttonWrapper"]:nth-child(7) {
      display: none !important;
    }
    `
        : ''
    }
  `;
  document.head.appendChild(style);
}

function seedToolbarPosition() {
  if (localStorage.getItem(POSITION_LAYOUT_KEY)) return;

  const x = 16;
  const y = Math.max(16, Math.round(window.innerHeight - 60));
  localStorage.setItem('feedback-toolbar-position', JSON.stringify({ x, y }));
  localStorage.setItem(POSITION_LAYOUT_KEY, '2');
}

function resolveWebhookUrl() {
  const configured = WEBHOOK_PATH.trim();
  if (/^https?:\/\//i.test(configured)) return configured;
  const path = configured.startsWith('/') ? configured : `/${configured}`;
  return `${window.location.origin}${path}`;
}

function seedAgentationSettings(webhookUrl) {
  try {
    const saved = JSON.parse(localStorage.getItem(SETTINGS_KEY) ?? '{}');
    localStorage.setItem(
      SETTINGS_KEY,
      JSON.stringify({
        ...saved,
        webhookUrl,
        webhooksEnabled: false,
      }),
    );
  } catch {
    localStorage.setItem(
      SETTINGS_KEY,
      JSON.stringify({
        webhookUrl,
        webhooksEnabled: false,
      }),
    );
  }
}

function showToast(message, tone = 'success') {
  const existing = document.getElementById('elements-agentation-toast');
  existing?.remove();

  const toast = document.createElement('div');
  toast.id = 'elements-agentation-toast';
  toast.setAttribute('role', 'status');
  toast.textContent = message;
  toast.style.cssText = [
    'position:fixed',
    'bottom:88px',
    'left:24px',
    'right:auto',
    'z-index:2147483646',
    'max-width:min(360px,calc(100vw - 48px))',
    'padding:12px 16px',
    'border-radius:10px',
    'font:500 14px/1.4 system-ui,sans-serif',
    'color:#fff',
    'background:' + (tone === 'success' ? '#166534' : '#991b1b'),
    'box-shadow:0 8px 24px rgba(0,0,0,.18)',
  ].join(';');
  document.body.appendChild(toast);
  window.setTimeout(() => toast.remove(), 5000);
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
  showToast(`Wysłano do GitHub: issue #${issueNumber}`, 'success');
}

function notifyIssueFailed(error) {
  const message = error instanceof Error ? error.message : 'Nieznany błąd';
  console.error('[Agentation] Nie udało się utworzyć issue:', error);
  showToast(`Błąd wysyłki: ${message}`, 'error');
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
  const minimalToolbar = !params.has('agentation-full');

  seedAgentationSettings(webhookUrl);
  seedToolbarPosition();
  injectAgentationStyles(minimalToolbar);

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
    className: 'elements-agentation-toolbar',
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
