# Konfiguracja nowego projektu (szablon)

Checklist do skopiowania setupu **Vercel (klient + zespół) + Agentation + auto-issue** na inny projekt React/Vite.

Wzorowane na: **Demo-Elements**, API ze **Smartbees-Exporter**.

---

## 1. Pliki do skopiowania / zaadaptowania

| Z źródła (Demo-Elements) | Co zmienić |
|--------------------------|------------|
| `vercel.json` | ewentualnie `buildCommand` |
| `api/agentation-feedback.ts` | `DEFAULT_REPO`, `User-Agent` |
| `assets/agentation-entry.jsx` | webhook path, branding toastów |
| `vite.agentation.config.mjs` | `__AGENTATION_WEBHOOK_URL__` |
| `scripts/build-vercel.mjs` | bez zmian |
| `scripts/copy-runtime-assets.mjs` | lista assetów do kopiowania |
| `src/components/layout/PageShell.tsx` | logika `shouldLoadAgentation()` |
| `src/env.d.ts` | typy `VITE_*` |
| `env/*.env` | URL-e, nazwa repo |
| `.github/workflows/ci.yml` | matrix env |
| `.github/ISSUE_TEMPLATE/ui-review-feedback.yml` | URL preview |

---

## 2. Vercel — nowy projekt

1. Import repo z GitHub
2. **Environments → Production → Branch Tracking** → `release`
3. Import env z `env/` (shared / production / preview)
4. Ustaw `GITHUB_TOKEN`, `GITHUB_REPO`, `ALLOWED_ORIGINS`
5. Wyłącz GitHub Pages w repo (jeśli było)

---

## 3. Zmienne — szablon

### `env/vercel.shared.env` (Production and Preview)

```env
GITHUB_TOKEN=ghp_...
GITHUB_REPO=owner/Nowy-Projekt
ALLOWED_ORIGINS=https://nowy-projekt-dev.vercel.app,http://localhost:5173
```

### `env/vercel.production.env` (Production)

```env
VITE_DEPLOY_TARGET=client
VITE_AGENTATION_ENABLED=false
```

### `env/vercel.preview.env` (Preview)

```env
VITE_DEPLOY_TARGET=team
VITE_AGENTATION_ENABLED=true
VITE_AGENTATION_WEBHOOK_URL=/api/agentation-feedback
```

---

## 4. package.json — skrypty

```json
{
  "build:agentation": "vite build --config vite.agentation.config.mjs",
  "build:vercel": "node scripts/build-vercel.mjs",
  "build:team": "VITE_DEPLOY_TARGET=team VITE_AGENTATION_ENABLED=true node scripts/build-vercel.mjs",
  "build:client": "VITE_DEPLOY_TARGET=client VITE_AGENTATION_ENABLED=false node scripts/build-vercel.mjs"
}
```

Zależności dev: `agentation` (sprawdź licencję PolyForm-Shield).

---

## 5. vite.config.ts

```ts
base: command === "serve" ? "/" : (configuredBase ?? "/"),
```

Na Vercel base = `/` (nie subpath GitHub Pages).

---

## 6. Branch workflow

```bash
# jednorazowo
git checkout -b release
git push -u origin release

# cykl
# dev → main (preview)
# akceptacja → merge main → release (production)
```

---

## 7. Etykieta i issue template

W repo GitHub utwórz etykietę **`ui-review`** (kolor dowolny).

Skopiuj `.github/ISSUE_TEMPLATE/ui-review-feedback.yml` z URL preview nowego projektu.

---

## 8. Weryfikacja po setupie

- [ ] Push `main` → deploy **Preview** (nie Production)
- [ ] Push `release` → deploy **Production**
- [ ] Preview: toolbar Agentation widoczny
- [ ] Production: brak Agentation
- [ ] Send → jedno issue (nie dwa)
- [ ] `GITHUB_TOKEN` tylko w Vercel, nie w repo
- [ ] CI zielone dla obu targetów matrix

---

## 9. Różnice vs stary model (GitHub Pages + ręczne issue)

| Stary (AKF) | Nowy (Elements) |
|-------------|-----------------|
| GitHub Pages | Vercel |
| Copy → ręczne issue | Send → auto-issue |
| `?review=1` na Pages | Preview branch zawsze z Agentation |
| Brak API | `api/agentation-feedback.ts` |
| Subpath `/Demo-AKF/` | Base `/` na Vercel |
