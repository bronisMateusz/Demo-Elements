# Elements — Wiki

Dokumentacja operacyjna projektu **Demo-Elements**: deploy na Vercel (dwa środowiska) oraz feedback wizualny z **Agentation** → automatyczne **GitHub Issues**.

> Źródło w repo: folder [`wiki/`](../wiki/) (synchronizowany z GitHub Wiki).  
> Aktualny preview zespołu: **https://elements-dev.vercel.app**

---

## Spis treści

| Strona | Opis |
|--------|------|
| [Pipeline Vercel](Pipeline-Vercel) | Dwa środowiska: klient (`release`) vs zespół (`main`), env, build, domeny |
| [Agentation i feedback GitHub](Agentation-i-feedback-GitHub) | Review na stronie, auto-issue, toolbar, tokeny |
| [Konfiguracja nowego projektu](Konfiguracja-nowego-projektu) | Checklist do skopiowania setupu na inny projekt |
| [Rozwiązywanie problemów](Rozwiazywanie-problemow) | Typowe błędy deployu i feedbacku |

---

## Szybki przegląd architektury

```
main (push)     → Vercel Preview   → Agentation + auto-issue
release (merge) → Vercel Production → wersja dla klienta (bez Agentation)

Reviewer: pinezka → Send → POST /api/agentation-feedback → GitHub Issue (ui-review)
Dev: Cursor + GitHub MCP → czyta issue → poprawki → merge main → release
```

---

## Kluczowe pliki w repo

| Plik / folder | Rola |
|---------------|------|
| `vercel.json` | Build command, SPA rewrites, odkrycie `api/` |
| `api/agentation-feedback.ts` | Serverless: webhook Agentation → GitHub Issues API |
| `assets/agentation-entry.jsx` | Konfiguracja toolbaru, webhook, UI (lewy dolny róg, tryb minimal) |
| `env/*.env` | Szablony do importu w Vercel |
| `scripts/build-vercel.mjs` | Warunkowy build Agentation (`team` vs `client`) |
| `.github/workflows/ci.yml` | Lint + build matrix (bez deploy — deploy robi Vercel) |
| `.github/ISSUE_TEMPLATE/` | Szablon ręcznego UI Review (fallback) |

---

## Komendy

```bash
npm run dev              # dev lokalny
npm run build:team       # build jak preview (z Agentation)
npm run build:client     # build jak production (bez Agentation)
npm run build:vercel     # używane przez Vercel (wg env)
npx vercel dev           # frontend + API lokalnie
```
