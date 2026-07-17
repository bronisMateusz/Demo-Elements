# Agentation i feedback → GitHub Issues

## Cel

Reviewer **nie musi** mieć konta GitHub ani ręcznie wklejać markdownu do issue. Wystarczy:

1. Otworzyć preview zespołu (`main` na Vercel)
2. Zostawić pinezki w Agentation
3. Kliknąć **Send** (strzałka)

Issue z etykietą `ui-review` pojawia się w repo automatycznie.

---

## Architektura

```
Przeglądarka (Agentation Send)
    → POST /api/agentation-feedback  (Vercel serverless)
        → GitHub REST API: POST /repos/{owner}/{repo}/issues
            → Issue z etykietą ui-review
```

Token `GITHUB_TOKEN` **nigdy nie trafia do przeglądarki**.

Endpoint: [`api/agentation-feedback.ts`](../api/agentation-feedback.ts)

Obsługuje webhook Agentation z `event: "submit"` i payloadem `{ output, annotations, url }`.

---

## Włączanie Agentation

| Warunek | Efekt |
|---------|--------|
| `VITE_AGENTATION_ENABLED=true` (Preview) | bundel Agentation w buildzie |
| `VITE_DEPLOY_TARGET=team` | `PageShell` ładuje skrypt zawsze |
| Host `*.vercel.app` | toolbar aktywny na preview |
| `?review=1` lub `?agentation=1` | wymuszenie na localhost |

Na **Production** (`client`) Agentation jest wyłączone.

---

## Toolbar - UX dla reviewera

Domyślny tryb **minimal** (skonfigurowany w `assets/agentation-entry.jsx`):

| Widoczne | Ukryte |
|----------|--------|
| **Send** - wysyłka do GitHub | Pause animacji |
| **Clear** - wyczyść pinezki | Layout mode |
| **Exit** - zamknij toolbar | Show/hide markers, Copy, Settings |

- Pozycja: **lewy dolny róg** (nie zasłania Zasobników po prawej)
- Po sukcesie: zielony toast „Wysłano do GitHub: issue #N”
- Pełny toolbar: dodaj `?agentation-full` do URL

### Dlaczego nie widać przycisku Send czasem?

Agentation v3:

- **Send** pojawia się gdy webhook URL jest poprawny (`https://...`) i **Auto-Send = OFF**
- Bundel ustawia webhook i `webhooksEnabled: false` w localStorage przy starcie
- W polu Settings → Webhook URL może być puste wizualnie (Agentation trzyma URL w localStorage) - to nie blokuje wysyłki

---

## Konfiguracja webhooka (w kodzie)

Plik: `assets/agentation-entry.jsx`

- `VITE_AGENTATION_WEBHOOK_URL` (build time) → domyślnie `/api/agentation-feedback`
- Runtime: rozwijane do `https://{origin}/api/agentation-feedback`
- **Nie używaj** `onSubmit` + webhook jednocześnie - powoduje **duplikaty issue** (Send woła oba). Obecnie tylko webhook Agentation.

Po zmianie w entry:

```bash
npm run build:agentation
git add assets/agentation-bundle.js assets/agentation-entry.jsx
```

---

## GitHub - token i uprawnienia

### Fine-grained PAT (zalecane)

1. GitHub → Settings → Developer settings → Personal access tokens → Fine-grained
2. Repository access: tylko docelowe repo
3. Permissions:
   - **Issues: Read and write**
   - (opcjonalnie) **Contents: Read and write** - jeśli kiedyś dołączacie zrzuty do repo

### Zmienne Vercel

| Zmienna | Scope |
|---------|-------|
| `GITHUB_TOKEN` | Production and Preview |
| `GITHUB_REPO` | `owner/repo` |
| `ALLOWED_ORIGINS` | URL preview + localhost (**bez** trailing slash) |

Po dodaniu/zmianie tokena: **Redeploy** preview.

---

## Issue w GitHub

- Etykieta: **`ui-review`**
- Tytuł: `[UI Review] /ścieżka - pierwsza uwaga`
- Treść: pełny markdown z Agentation + kontekst techniczny (URL, data)

Filtr: <https://github.com/bronisMateusz/Demo-Elements/issues?q=label%3Aui-review>

### Szablon ręczny (fallback)

Jeśli auto-issue nie działa:  
`.github/ISSUE_TEMPLATE/ui-review-feedback.yml`

---

## Dev - odczyt issue w Cursorze

1. Skonfiguruj GitHub MCP w Cursorze (jak w projekcie AKF)
2. Prompt przykładowy:

   ```
   Pokaż otwarte issue z etykietą ui-review w bronisMateusz/Demo-Elements
   i zaimplementuj pierwszą uwagę.
   ```

---

## Test end-to-end

1. Otwórz `https://elements-dev.vercel.app` (lub aktualny preview URL)
2. Hard refresh: **Cmd+Shift+R**
3. Włącz toolbar (okrągły przycisk lewy dolny róg)
4. Kliknij element → wpisz komentarz
5. Kliknij **Send**
6. Sprawdź toast + **Network** → `POST .../api/agentation-feedback` → status **200**
7. Sprawdź Issues na GitHubie
