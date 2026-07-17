const GITHUB_API = "https://api.github.com";
const DEFAULT_REPO = "bronisMateusz/Demo-Elements";

interface AnnotationPayload {
  id?: string;
  comment?: string;
  element?: string;
  elementPath?: string;
}

interface WebhookBody {
  event?: string;
  timestamp?: number;
  url?: string;
  output?: string;
  annotations?: AnnotationPayload[];
}

function githubHeaders(token: string): Record<string, string> {
  return {
    Authorization: `Bearer ${token}`,
    Accept: "application/vnd.github+json",
    "X-GitHub-Api-Version": "2022-11-28",
    "User-Agent": "elements-demo-agentation-feedback",
  };
}

function parseRepo(slug: string): { owner: string; repo: string } {
  const [owner, repo] = slug.split("/");
  if (!owner || !repo) throw new Error(`Nieprawidłowy GITHUB_REPO: ${slug}`);
  return { owner, repo };
}

function buildTitle(output: string, pageUrl?: string): string {
  const pageMatch = output.match(/^## Page Feedback:\s*(.+)$/m);
  const pathFromOutput = pageMatch?.[1]?.trim();
  let path = pathFromOutput || "/";

  if (!pathFromOutput && pageUrl) {
    try {
      path = new URL(pageUrl).pathname + new URL(pageUrl).search;
    } catch {
      path = pageUrl;
    }
  }

  const feedbackMatch = output.match(/\*\*Feedback:\*\*\s*(.+)/);
  const rawFeedback = feedbackMatch?.[1]?.trim();
  const summary =
    rawFeedback && rawFeedback.length > 0
      ? rawFeedback.length > 72
        ? `${rawFeedback.slice(0, 71).trimEnd()}…`
        : rawFeedback
      : "Review";

  return `[UI Review] ${path} - ${summary}`;
}

function buildBody(output: string, pageUrl?: string, timestamp?: number): string {
  const lines = [
    "### Feedback z Agentation",
    "",
    output.trim() || "_(brak treści)_",
    "",
    "---",
    "<details><summary>Kontekst techniczny (automatycznie)</summary>",
    "",
  ];

  if (pageUrl) lines.push(`- URL: ${pageUrl}`);
  lines.push(`- Data: ${new Date(timestamp ?? Date.now()).toISOString()}`);
  lines.push("", "</details>");

  return lines.join("\n");
}

async function createIssue(
  token: string,
  repoSlug: string,
  title: string,
  body: string,
  labels: string[],
): Promise<{ number: number; html_url: string }> {
  const { owner, repo } = parseRepo(repoSlug);
  const url = `${GITHUB_API}/repos/${owner}/${repo}/issues`;
  const headers = { ...githubHeaders(token), "Content-Type": "application/json" };

  let res = await fetch(url, {
    method: "POST",
    headers,
    body: JSON.stringify({ title, body, labels }),
  });

  if (res.status === 422 && labels.length > 0) {
    res = await fetch(url, {
      method: "POST",
      headers,
      body: JSON.stringify({ title, body }),
    });
  }

  if (!res.ok) {
    const detail = await res.text();
    throw new Error(`GitHub API ${res.status}: ${detail}`);
  }

  return (await res.json()) as { number: number; html_url: string };
}

function readBody(rawBody: unknown): WebhookBody {
  if (rawBody && typeof rawBody === "object" && !Buffer.isBuffer(rawBody)) {
    return rawBody as WebhookBody;
  }
  if (typeof rawBody === "string" && rawBody.trim()) {
    return JSON.parse(rawBody) as WebhookBody;
  }
  if (Buffer.isBuffer(rawBody) && rawBody.length > 0) {
    return JSON.parse(rawBody.toString("utf8")) as WebhookBody;
  }
  return {};
}

export default async function handler(req: any, res: any) {
  const origin = typeof req.headers?.origin === "string" ? req.headers.origin : undefined;

  try {
    const allowed = (process.env.ALLOWED_ORIGINS ?? "")
      .split(",")
      .map((entry) => entry.trim())
      .filter(Boolean);

    if (origin && (allowed.length === 0 || allowed.includes(origin))) {
      res.setHeader("Access-Control-Allow-Origin", origin);
      res.setHeader("Vary", "Origin");
    }

    res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");

    if (req.method === "OPTIONS") {
      res.status(204).end();
      return;
    }

    if (req.method !== "POST") {
      res.status(405).json({ error: "Method not allowed" });
      return;
    }

    const token = process.env.GITHUB_TOKEN;
    if (!token) {
      res.status(500).json({ error: "Brak konfiguracji serwera (GITHUB_TOKEN)." });
      return;
    }

    const body = readBody(req.body);
    const event = String(body.event ?? "");

    if (event !== "submit") {
      res.status(200).json({ ok: true, ignored: true });
      return;
    }

    const output = String(body.output ?? "").trim();
    if (!output) {
      throw new Error("Brak treści feedbacku (output).");
    }

    const repoSlug = process.env.GITHUB_REPO || DEFAULT_REPO;
    const pageUrl = typeof body.url === "string" ? body.url : undefined;
    const title = buildTitle(output, pageUrl);
    const issueBody = buildBody(output, pageUrl, body.timestamp);

    const issue = await createIssue(token, repoSlug, title, issueBody, ["ui-review"]);

    res.status(200).json({
      ok: true,
      issueUrl: issue.html_url,
      issueNumber: issue.number,
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Nieznany błąd.";
    const status = message.startsWith("GitHub API") ? 502 : 400;
    console.error("[agentation-feedback]", error);
    res.status(status).json({ error: message });
  }
}
