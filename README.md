# @heliony/ui — design system Heliony

Fondations, tokens, composants Svelte 5 et outils pour les interfaces web d'Heliony : dashboard, site public, Mission Control. Construit sur Bits UI, avec shadcn-svelte comme point de départ de code ; chaque composant est repris, nommé et habillé pour Heliony.

- **Identité** : anthracite légèrement bleuté, blanc glace comme lumière en Sombre et encre en Clair, glacier rare pour ce qui est vivant. Instrument Sans + Geist Mono.
- **Deux thèmes égaux** : chaque token sémantique porte une valeur Dark et une valeur Light, en OKLCH, contrastes AA vérifiés par les tests.
- **Composants** typés et accessibles (clavier, lecteur d'écran, états loading / empty / error / forbidden), responsive, mouvement sobre.
- **Outils** : `heliony check` (tokens, classes shadcn résiduelles, flou, doublons), `heliony ai sync` (instructions pour Claude Code et Codex), `heliony init`.

```bash
bun add "git+https://github.com/Helionyy/heliony-ui.git#v0.1.0"
bunx heliony init .          # app.css, layout, navigation de départ
bunx heliony ai sync .       # CLAUDE.md, AGENTS.md, skill, hook (ignorés par Git)
```

```css
/* src/app.css */
@import 'tailwindcss';
@import '@heliony/ui/styles.css';
@import '@heliony/ui/theme.css';
@source '../node_modules/@heliony/ui/dist';
```

```svelte
<HelionyProvider locale="fr" defaultMode="dark">
  <AppShell>
    {#snippet sidebar()}<Sidebar sections={nav} current={page.url.pathname} />{/snippet}
    {@render children()}
  </AppShell>
  <Toaster />
</HelionyProvider>
```

- [Faire évoluer](CONTRIBUTING.md) — composants, variantes, tokens, versions.
- Référence des assistants : [`ai/HELIONY.md`](ai/HELIONY.md), [`ai/components.md`](ai/components.md), [`ai/tokens.md`](ai/tokens.md).
- Doc interactive : `bun run docs:dev`.

## Développer

```bash
bun install
bun run docs:dev     # doc interactive, Dark et Light côte à côte, trois largeurs
bun run verify       # types, règles, tests, build, doc, application de test
```
