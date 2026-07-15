# Pipeline Vercel — dwa środowiska

Hosting: **Vercel** (frontend statyczny + serverless API). **GitHub Pages wyłączone** — deploy po pushu robi Vercel.

## Model branchy

| | **Zespół** | **Klient** |
|---|---|---|
| Branch Git | `main` | `release` |
| Vercel environment | **Preview** | **Production** |
| URL (przykład) | `https://elements-dev.vercel.app` | domena production / alias `release` |
| Agentation | włączone | wyłączone |
| Auto-issue GitHub | tak | nie |

### Uwaga o UI Vercel

**Production Branch** nie jest w Settings → Git, tylko w:

**Settings → Environments → Production → Branch Tracking** → ustaw `release`.

**Preview** nie pozwala wybrać jednego brancha — obejmuje **wszystkie branche oprócz production brancha** („All unassigned branches”). Po ustawieniu `release` jako Production, push na `main` automatycznie trafia do Preview.

---

## Pierwsza konfiguracja (checklist)

### 1. Połącz repo z Vercel

- Import projektu z GitHub `bronisMateusz/Demo-Elements`
- Framework: Vite (wykrywany automatycznie)

### 2. Build and Output Settings

| Pole | Wartość |
|------|---------|
| Build Command | `npm run build:vercel` |
| Output Directory | `dist` |
| Install Command | `npm install` (domyślnie) |

Wartości są też w `vercel.json` — override w panelu **nie jest wymagany**.

### 3. Production Branch

**Settings → Environments → Production → Branch Tracking** → `release` → Save.

### 4. Utwórz branch `release`

```bash
git checkout -b release
git push -u origin release
```

### 5. Environment Variables

Import z folderu `env/` w repo (**Settings → Environment Variables → Import .env**):

| Plik | Scope w Vercel |
|------|----------------|
| `env/vercel.shared.env` | **Production and Preview** |
| `env/vercel.production.env` | **Production** |
| `env/vercel.preview.env` | **Preview** |

Po imporcie:
1. Podmień `GITHUB_TOKEN` na prawdziwy PAT (Issues + Contents write).
2. Ustaw `ALLOWED_ORIGINS` na rzeczywisty URL preview (bez trailing slash), np.:
   ```
   https://elements-dev.vercel.app,http://localhost:5173,http://localhost:8875
   ```

### 6. Wyłącz GitHub Pages

Repo → **Settings → Pages → Source: None**.

---

## Zmienne środowiskowe

### Wspólne (Production and Preview) — server API

| Zmienna | Opis |
|---------|------|
| `GITHUB_TOKEN` | PAT z uprawnieniami **Issues (write)** i opcjonalnie **Contents (write)** |
| `GITHUB_REPO` | `bronisMateusz/Demo-Elements` |
| `ALLOWED_ORIGINS` | Dozwolone originy CORS dla `POST /api/agentation-feedback` |

### Production (klient)

| Zmienna | Wartość |
|---------|---------|
| `VITE_DEPLOY_TARGET` | `client` |
| `VITE_AGENTATION_ENABLED` | `false` |

### Preview (zespół)

| Zmienna | Wartość |
|---------|---------|
| `VITE_DEPLOY_TARGET` | `team` |
| `VITE_AGENTATION_ENABLED` | `true` |
| `VITE_AGENTATION_WEBHOOK_URL` | `/api/agentation-feedback` |

---

## Co robi build

`npm run build:vercel` → `scripts/build-vercel.mjs`:

1. `npm run build` — Vite + TypeScript → `dist/`
2. Jeśli `VITE_AGENTATION_ENABLED=true` → `npm run build:agentation` → `assets/agentation-bundle.js` → kopia do `dist/assets/`
3. `npm run build:runtime-assets` — favicony, zdjęcia produktów

`vercel.json` rewrite: wszystko poza `/api/` → `index.html` (SPA).

---

## GitHub Actions (CI)

Plik: `.github/workflows/ci.yml`

- Uruchamia się na push/PR do dowolnego brancha
- Matrix: build `team` + build `client`
- **Nie deployuje** — deploy tylko przez Vercel

---

## Codzienny workflow

1. Dev pracuje na `main` → auto-deploy **Preview**
2. Reviewer testuje na preview + zostawia feedback (Agentation)
3. Dev implementuje poprawki z GitHub Issues (Cursor + MCP)
4. Po akceptacji: **merge `main` → `release`** → deploy **Production** dla klienta

```bash
git checkout release
git merge main
git push origin release
```

---

## Domeny (opcjonalnie)

**Settings → Domains**

- Production domain → przypisz do brancha `release`
- Preview alias → np. stały URL dla `main` (Vercel → assign to branch)
