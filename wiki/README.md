# Wiki - synchronizacja z GitHub

Pliki w tym folderze są **źródłem prawdy** dla [GitHub Wiki](https://github.com/bronisMateusz/Demo-Elements/wiki) projektu Demo-Elements.

## Publikacja na GitHub Wiki

```bash
# jednorazowo
git clone https://github.com/bronisMateusz/Demo-Elements.wiki.git /tmp/Demo-Elements.wiki

# po edycji plików w wiki/
cp wiki/*.md /tmp/Demo-Elements.wiki/
cd /tmp/Demo-Elements.wiki
git add .
git commit -m "docs: aktualizacja wiki pipeline i feedback"
git push origin master   # lub main - zależnie od domyślnej gałęzi wiki
```

Alternatywnie: edycja bezpośrednio w przeglądarce na GitHub → Wiki.

## Strony

| Plik | Tytuł wiki |
|------|------------|
| `Home.md` | Home |
| `Pipeline-Vercel.md` | Pipeline Vercel |
| `Agentation-i-feedback-GitHub.md` | Agentation i feedback GitHub |
| `Konfiguracja-nowego-projektu.md` | Konfiguracja nowego projektu |
| `Rozwiazywanie-problemow.md` | Rozwiązywanie problemów |
