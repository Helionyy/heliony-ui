# Heliony UI — référence pour les assistants de développement

Tu travailles sur une interface web d'Heliony : dashboard client, site public ou Mission Control, en SvelteKit (Svelte 5, TypeScript strict, Tailwind v4). Elle **doit** être construite avec le design system officiel `@heliony/ui`. Ce fichier est livré avec le package installé : il correspond exactement à la version que l'application utilise.

Fichiers associés (même dossier) :
- `components.md` — chaque composant : rôle, props typées, règles, exemple, origine (repris de shadcn-svelte, recodé, maison).
- `tokens.md` — chaque token : valeur Dark, valeur Light, intention.
- Doc interactive : dépôt `heliony-ui`, `bun run docs:dev`.

## 1. Règles non négociables

1. **Réutiliser avant de créer.** Cherche d'abord dans `components.md`. Si un composant couvre le besoin, importe-le : `import { Button, DataTable, Dialog } from '@heliony/ui'`. Ne recrée jamais `Button.svelte`, `Dialog.svelte`, `Table.svelte`… dans l'application (`heliony check` le bloque). Un composant générique qui manque s'ajoute dans le dépôt `heliony-ui`, pas dans l'application. Seuls les composants métier (un sélecteur de serveur relié au Core, une console branchée sur l'agent) vivent dans l'application, composés à partir des composants Heliony.
2. **Tokens uniquement.** Couleurs, rayons, ombres, durées, typographie : classes Tailwind du thème Heliony (`bg-surface-raised`, `text-fg-secondary`, `border-line-subtle`, `bg-action-primary`, `text-success-fg`, `rounded-md`, `shadow-overlay`, `duration-fast`, `text-body`, `text-label`) ou `var(--token)` en CSS. Jamais de `#hex`, `rgb()`, `oklch()`, `font-family` ou `font-size` en px dans l'application. Jamais une classe shadcn (`bg-background`, `text-muted-foreground`, `bg-primary`, `border-border`) : elles n'existent pas dans le thème.
3. **Deux thèmes égaux.** Tout ce que tu écris se lit en Dark et en Light : utilise les tokens sémantiques, jamais une primitive (`n-900`, `glacier-300`). Teste les deux.
4. **Clavier, lecteur d'écran, états.** Tout interactif est focusable et montre l'anneau de focus (`focus-visible:ring-focus`). Un `iconOnly` porte un `label`. Tout bloc de données passe par `DataState` ou gère ses états loading, empty, error, forbidden. Rien n'est transmis par la seule couleur.
5. **Mouvement sobre.** `duration-fast` (120 ms) pour un survol, `duration-base` (180 ms) pour un menu, `duration-slow` (260 ms) pour un dialogue. Transitions d'opacité et de translation courte. Aucun flou (`backdrop-filter`, `blur`), aucun dégradé décoratif, aucune animation en boucle hors Spinner et Skeleton.
6. **Vérifier.** Après chaque modification : `bun run lint` (inclut `heliony check src`), `bun run check` et `bun run test` doivent passer.

## 2. Mettre en place une application

```css
/* src/app.css */
@import 'tailwindcss';
@import '@heliony/ui/styles.css';
@import '@heliony/ui/theme.css';
@source '../node_modules/@heliony/ui/dist';
```

```svelte
<!-- src/routes/+layout.svelte -->
<script lang="ts">
  import '../app.css';
  import { HelionyProvider, Toaster } from '@heliony/ui';
  let { children } = $props();
</script>
<HelionyProvider locale="fr" defaultMode="dark">
  {@render children()}
  <Toaster />
</HelionyProvider>
```

Le `<html>` porte la classe `dark` par défaut (`<html lang="fr" class="dark">` dans `app.html`) ; `HelionyProvider` la fait suivre le choix de l'utilisateur et `ThemeToggle` la change.

## 3. Choisir la structure

| Besoin | Briques |
|---|---|
| Page d'application | `AppShell` + `Sidebar` (sections = modules) + en-tête avec `SidebarTrigger` et `Breadcrumb` |
| Vue d'ensemble | `StatTile` en rangée, `TimeChart`, `Surface` par bloc, `DataState` autour de chaque bloc |
| Liste d'objets | `DataTable` (densité, filtres, colonnes), `Pagination`, `FilterChip` et `FacetList` pour filtrer, `Sheet` pour le détail |
| Formulaire | `Field` autour de chaque `Input`, `Select`, `Combobox`, `DateField`, `Switch` ; `ButtonGroup` en pied |
| Décision | `Dialog` pour saisir, `AlertDialog` pour confirmer, `Menu` pour choisir une action |
| Information | `toast.*` pour l'éphémère, `Notice` dans la page, `Badge` pour un statut |
| Logs et traces | `LogView`, `SeverityDot`, `CodeBlock`, `JsonTree`, `TraceWaterfall`, `Console` |

## 4. Identité visuelle

- Neutres anthracite légèrement bleutés (`surface-*`), **blanc glace** comme lumière en Dark et **encre** en Light : texte `fg-primary`, action principale `action-primary`, focus `focus-ring`. Glacier (`accent`) rare : ce qui est vivant ou en cours, un lien, la série 1 d'un graphique. Jamais une surface.
- Profondeur par niveaux de surface (`surface-sunken` → `surface-base` → `surface-raised` → `surface-overlay`), filets `line-subtle`, une ombre par niveau (`shadow-raised`, `shadow-overlay`, `shadow-modal`). Pas de carte dans une carte : un `Divider` ou de l'espace.
- Typographie : Instrument Sans, styles `text-display`, `text-title`, `text-heading`, `text-subheading`, `text-body`, `text-body-strong`, `text-label`, `text-caption` ; Geist Mono (`text-code`, `font-mono`) pour les identifiants, le code, les valeurs tabulaires. Trois niveaux de texte toujours distincts par taille ou graisse : titre, information, métadonnée.
- Statuts : `success`, `warning`, `danger`, `info` avec leurs `-subtle` et `-fg` ; sévérités de logs `severity-*` ; `intelligence` pour Connected Intelligence. Chaque couleur d'état est accompagnée d'un mot ou d'une icône.
- Texte : phrases courtes, verbes d'action, le bouton dit ce qui se passe (« Redémarrer le serveur », « Envoyer l'invitation »), les erreurs disent comment débloquer. Chaînes internes des composants : anglais par défaut, français via `locale="fr"`.

## 5. Responsive

Mobile first. Points de rupture Tailwind (`sm` 640, `md` 768, `lg` 1024, `xl` 1280). Sous `lg`, la `Sidebar` devient une feuille ; sous `md`, `DataTable` passe en cartes et les dialogues en feuilles basses. Les formulaires passent en une colonne sous `md`. `new Below('md').current` donne la condition en JavaScript.

## 6. Faire évoluer le système

- **Variante manquante** : ne pas surcharger les classes d'un composant depuis l'application. Ajouter la variante dans `heliony-ui` (branche, catalogue, `bun run verify`, PR, release), puis mettre à jour la dépendance. En attendant, une exception locale est permise avec un commentaire `heliony-allow : <raison>` sur la ligne.
- **Nouveau composant** : générique, il va dans `heliony-ui` ; métier, il reste dans l'application sous un nom qui ne duplique pas un composant Heliony.
- **Token** : jamais créé dans une application.
- Mise à jour : `bun add git+https://github.com/Helionyy/heliony-ui.git#vX.Y.Z`, lire `CHANGELOG.md` du package, puis `bunx heliony ai sync .` pour actualiser ces instructions.
