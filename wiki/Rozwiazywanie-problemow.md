# Rozwiązywanie problemów

## Deploy / Vercel

### W Deployments widać tylko Production z `main`

**Przyczyna:** Production Branch nadal wskazuje na `main`.

**Fix:** Settings → **Environments** → Production → Branch Tracking → `release` → Save. Potem push na `main` (Preview) i `release` (Production).

### Preview nie ma osobnego brancha w UI

To normalne — Preview = wszystkie branche oprócz production brancha. Filtruj Deployments: **All Environments → Preview**, branch `main`.

### Build fail na Vercel

```bash
npm ci && VITE_DEPLOY_TARGET=team VITE_AGENTATION_ENABLED=true npm run build:vercel
```

lokalnie — powtórz env z panelu Vercel.

---

## Agentation

### Toolbar się nie pokazuje

- Sprawdź env Preview: `VITE_AGENTATION_ENABLED=true`, `VITE_DEPLOY_TARGET=team`
- Na localhost: `?review=1` lub `npm run dev` + `.env.local` jak w `env/local.example.env`
- Hard refresh po deployu

### Brak przycisku Send

- Webhook musi być pełnym URL (`https://origin/api/...`) — bundel robi to automatycznie
- W Settings Agentation wyłącz **Auto-Send** — wtedy Send jest obok Copy
- W trybie minimal Send powinien być widoczny po poprawnym webhooku

### Toolbar zasłania UI / za szeroki

- Domyślnie: lewy dolny róg, tryb minimal (Send + Clear + Exit)
- Pełny toolbar: `?agentation-full`
- Po zmianie layoutu: wyczyść `localStorage` klucze `feedback-toolbar-position`, `elements-agentation-position-v2`

### Zamknięty toolbar „rozjechany” (nie okrągły)

Naprawione w bundlu — `collapsed` wymusza 44×44. Redeploy + hard refresh.

---

## Feedback / GitHub Issues

### Send / Copy — brak issue

1. **Network** → `POST /api/agentation-feedback`
   - **404** — stary deploy bez folderu `api/` → redeploy
   - **500** — brak `GITHUB_TOKEN` na Vercel
   - **502** — token bez uprawnień Issues lub wygasły PAT
   - **CORS** — sprawdź `ALLOWED_ORIGINS` (bez trailing slash, dokładny origin preview)

2. Vercel → **Logs** → Functions → `[agentation-feedback]`

3. Po zmianie `GITHUB_TOKEN` → **Redeploy**

### Dwa identyczne issue naraz

**Przyczyna:** podwójna wysyłka (`onSubmit` + webhook Agentation).

**Fix:** w `agentation-entry.jsx` tylko webhook (bez `onSubmit` wołającego API). Send = jeden request.

### Issue bez etykiety `ui-review`

Etykieta musi istnieć w repo GitHub. API retry bez labeli przy 422 — sprawdź logi.

---

## Env

### Import .env w Vercel

Scope musi się zgadzać:

| Plik | Scope |
|------|-------|
| `vercel.shared.env` | Production **and** Preview |
| `vercel.production.env` | Production |
| `vercel.preview.env` | Preview |

### `ALLOWED_ORIGINS`

Źle: `https://elements-dev.vercel.app/` (slash na końcu)  
Dobrze: `https://elements-dev.vercel.app,http://localhost:5173`

---

## Lokalny dev z API

`npm run dev` **nie** serwuje `api/` — tylko Vite.

Do testu auto-issue lokalnie:

```bash
cp env/local.example.env .env.local
# uzupełnij GITHUB_TOKEN w Vercel dev env lub .env.local dla vercel dev
npx vercel dev
```
