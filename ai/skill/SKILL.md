---
name: heliony-ui
description: Construire ou modifier une interface d'une application web Heliony (SvelteKit, Svelte 5, Tailwind v4) avec le design system officiel @heliony/ui. À utiliser pour toute page, tableau de bord, formulaire, tableau, navigation, dialogue, notification ou composant d'interface Heliony.
---

# Interfaces Heliony avec @heliony/ui

1. Lis `node_modules/@heliony/ui/ai/HELIONY.md` (règles, identité, interdits), puis cherche le besoin dans `node_modules/@heliony/ui/ai/components.md`. Les tokens sont dans `node_modules/@heliony/ui/ai/tokens.md`.
2. Compose avec les composants existants (`import { … } from '@heliony/ui'`). Un composant générique ou une variante manque : ajoute-le dans le dépôt `heliony-ui` (branche, catalogue, `bun run verify`, PR, release), puis mets à jour la dépendance. Ne recrée jamais un composant Heliony dans l'application ; seuls les composants métier y vivent.
3. Styles : tokens seulement (classes Tailwind du thème Heliony, `var(--…)`, styles `text-*`). Pas de couleur, police ni taille en dur. Pas de classe shadcn. Pas de flou. Deux thèmes : tout se lit en Dark et en Light.
4. États : tout bloc de données passe par `DataState` (loading, empty, error, forbidden). Tout interactif est focusable, tout `iconOnly` porte un `label`.
5. Structure : `HelionyProvider` à la racine, `AppShell` + `Sidebar` pour une page d'application, `Field` autour de chaque champ, `Dialog` pour saisir, `AlertDialog` pour confirmer, `toast.*` pour l'éphémère.
6. Lance `bun run lint` (inclut `heliony check src`), `bun run check` et `bun run test`, et corrige jusqu'à 0 erreur. Le rendu visuel est vérifié par l'utilisateur dans les deux thèmes.
