# Faire évoluer @heliony/ui

Le design system est la source de vérité des interfaces web d'Heliony. Il évolue par propositions, jamais par copies locales dans une application.

## Où va un besoin ?

| Besoin | Où | Version |
|---|---|---|
| Corriger un rendu, un bug, un contraste | ici | correctif |
| Ajouter une variante ou une prop optionnelle | ici | mineure |
| Ajouter un token | ici, dans `tokens/tokens.json`, avec ses deux valeurs | mineure |
| Ajouter un composant générique | ici | mineure |
| Composant métier propre à une application | dans l'application, composé de composants Heliony, sans dupliquer un nom Heliony | — |
| Renommer ou retirer une prop ou un token, changer un comportement | ici, avec migration | majeure |
| Exception visuelle ponctuelle | dans l'application, ligne marquée `heliony-allow : <raison>` | — |

## Flux Git

`main` est protégé : aucun push direct, historique linéaire, fusion par squash uniquement, tag `v*` immuable. Tout changement suit le même chemin :

1. `git switch -c <type>/<sujet>` depuis `main` à jour (`feat/data-table-density`, `fix/select-focus`, `chore/deps`).
2. Travailler, `bun run verify` en local, commiter, pousser la branche.
3. Ouvrir une PR vers `main` (le gabarit liste les vérifications). La CI tourne au push et sur la PR : types et règles (`check`), tests (`test`), build du package, de la doc et de l'application de test (`build`), lint des workflows et épinglage des actions (`workflows`), secrets (`secrets`), vulnérabilités des dépendances (`vulnerabilities`), revue des dépendances ajoutées (`dependency-review`), CodeQL (`CodeQL`).
4. Fusion possible seulement quand tout est vert, la branche à jour avec `main` et les conversations résolues. La branche est supprimée automatiquement.

Publier une version : bumper `package.json` et le `CHANGELOG.md` par une PR, puis lancer le workflow **release** avec cette version. Il revérifie tout, crée le tag `vX.Y.Z` contenant `dist/` et publie la release GitHub. Il ne pousse rien sur `main`.

## Ajouter un composant

1. Chercher l'équivalent chez shadcn-svelte (`https://shadcn-svelte.com/registry/<nom>.json`). S'il existe et tient, le reprendre et l'habiller ; s'il existe mais plafonne, le recoder ; sinon le faire maison. Dans tous les cas : nommage Heliony, tokens Heliony, états, mouvement.
2. Écrire `src/lib/components/<Nom>/<Nom>.svelte` : Svelte 5 runes, props typées, Bits UI pour la mécanique, classes Tailwind du thème (`bg-surface-raised`, `text-fg-secondary`…), jamais une primitive ni une classe shadcn. Chaînes via `useStrings()`.
3. L'exporter dans `src/lib/index.ts`.
4. Le décrire dans `catalog/catalog.ts` (groupe, résumé, origine, reprise, utiliser / éviter, props, contrôles, exemple) et ajouter sa démo dans `docs/src/Demos.svelte`. Le test `catalog.test.ts` échoue tant que catalogue et composant ne correspondent pas.
5. `bun run verify` (types, règles, tests, build, doc, application de test).
6. Entrée dans `CHANGELOG.md`, PR, revue, fusion, puis workflow **release**.

## Faire évoluer un token

- Une intention par token, deux valeurs (Dark, Light) en OKLCH ou en alias d'une primitive. Les tests de contraste tournent sur les deux thèmes.
- Les primitives ne sont jamais utilisées directement par une interface ; `heliony check` le bloque.
- Renommer un token = majeure : garder l'ancien nom en alias pendant une mineure, l'annoncer, le retirer à la majeure suivante.

## Changement incompatible

1. Section « Migration » dans le CHANGELOG (avant / après, commandes).
2. Majeure ; chaque application migre quand elle est prête.
3. `bunx heliony ai sync .` dans chaque application migrée pour mettre à jour les instructions des assistants.

## Documentation

Générée depuis le code : `ai/components.md` et la doc interactive viennent de `catalog/catalog.ts`, `ai/tokens.md` et le thème Tailwind de `tokens/tokens.json`. Mettre à jour le catalogue suffit ; la CI vérifie la cohérence.
