# Pliki env do importu w Vercel

Szablony **bez prawdziwych sekretów** - commitowane w repo. Import w panelu:

**Vercel → Project → Settings → Environment Variables → Import .env**

| Plik | Scope przy imporcie |
|------|---------------------|
| `vercel.shared.env` | **Production and Preview** |
| `vercel.production.env` | **Production** |
| `vercel.preview.env` | **Preview** |
| `vercel.development.env` | **Development** (opcjonalnie) |

## Kolejność importu

1. `vercel.shared.env` → Production and Preview → po imporcie **podmień** `GITHUB_TOKEN`
2. `vercel.production.env` → Production
3. `vercel.preview.env` → Preview
4. (opcjonalnie) `vercel.development.env` → Development

Po pierwszym deployu brancha `main` zaktualizuj `ALLOWED_ORIGINS` w `vercel.shared.env` (lub w panelu) na rzeczywisty URL preview.

## Lokalnie

```bash
cp env/local.example.env .env.local
```

Pełna instrukcja deployu: [`docs/DEPLOY.md`](../docs/DEPLOY.md)
