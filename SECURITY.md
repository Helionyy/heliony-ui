# Sécurité

Ce dépôt contient le design system web d'Heliony : du code d'interface, sans serveur ni secret.

## Signaler une vulnérabilité

Utiliser le signalement privé de GitHub (onglet Security → Report a vulnerability) plutôt qu'une issue publique. Décrire le composant concerné, la version du package et un cas de reproduction. Une réponse est donnée sous sept jours.

## Ce qui est vérifié à chaque changement

- Analyse statique CodeQL (JavaScript et TypeScript), avec seuil bloquant sur les alertes de gravité haute.
- Recherche de secrets (gitleaks) sur tout l'historique de la branche, et protection contre les pushs de secrets côté GitHub.
- Vulnérabilités connues des dépendances (OSV-Scanner sur `bun.lock`) et revue des dépendances ajoutées par chaque PR, avec blocage au-delà de la gravité modérée et contrôle des licences.
- Actions épinglées par empreinte, permissions du jeton réduites à la lecture, Dependabot pour les mises à jour.

## Versions prises en charge

Seule la dernière version mineure publiée reçoit des correctifs.
