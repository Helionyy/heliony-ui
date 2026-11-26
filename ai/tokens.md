# Tokens Heliony UI (v5)

> Généré depuis tokens/tokens.json. Source de vérité unique d'Heliony UI. Trois niveaux : primitives (n-*, glacier-*, teintes d'état et de graphiques), sémantique (surface-*, fg-*, line-*, action-*, accent, focus-ring, selection, success…, severity-*, intelligence, chart-*, syntax-*) et composants. Les interfaces consomment la sémantique. Chaque token sémantique porte une valeur Dark et une valeur Light ; le Dark est le thème par défaut. Couleurs en OKLCH. Longueurs en rem (1 rem = 16 px).

Utiliser en CSS : `var(--nom)`. En Tailwind : `bg-surface-raised`, `text-fg-secondary`, `border-line-subtle`, `bg-action-primary`, `text-success-fg`, `rounded-md`, `shadow-overlay`, `text-body`, `text-label`. Espacements : échelle Tailwind par défaut (`p-4` = 1 rem). Thèmes : `dark (:root, .dark, [data-theme="dark"]), light (.light, [data-theme="light"])`.

## Couleurs sémantiques

| Token | Dark | Light | Usage |
|---|---|---|---|
| `surface-sunken` | `{n-925}` | `{n-50}` | Creux : champs de saisie au repos, pistes, zones de code, fond d'un tableau dense. |
| `surface-base` | `{n-900}` | `{n-25}` | Surface de la page et des panneaux principaux. |
| `surface-raised` | `{n-850}` | `{n-0}` | Surface posée sur la base : carte, inspecteur, formulaire. Un seul niveau au-dessus de la base par zone. |
| `surface-overlay` | `{n-800}` | `{n-0}` | Ce qui flotte au-dessus de tout : menus, popovers, dialogues, toasts. |
| `surface-control` | `{n-800}` | `{n-50}` | Contrôle secondaire au repos : bouton, segment, ligne activable. |
| `surface-control-hover` | `{n-750}` | `{n-100}` | Survol d'un contrôle ou d'une ligne. |
| `surface-control-active` | `{n-700}` | `{n-150}` | Pression d'un contrôle, ligne sélectionnée. |
| `surface-nav` | `{n-925}` | `{n-50}` | Fond de la navigation latérale, distinct de la page pour séparer les modules. |
| `fg-primary` | `{n-25}` | `{n-950}` | Texte principal, titres, valeurs. |
| `fg-secondary` | `{n-200}` | `{n-600}` | Texte secondaire, libellés, descriptions. Lisible AA sur toutes les surfaces. |
| `fg-tertiary` | `{n-300}` | `{n-500}` | Métadonnées, indications, en-têtes de colonne. Lisible AA sur toutes les surfaces. |
| `fg-disabled` | `{n-500}` | `{n-400}` | Texte et icônes désactivés, exempts du seuil de contraste, toujours accompagnés d'un état visible. |
| `fg-inverse` | `{n-950}` | `{n-25}` | Texte sur un aplat d'action principale. |
| `line-subtle` | `oklch(0.955 0.008 248 / 0.08)` | `{n-100}` | Filet de structure : séparation de lignes, de colonnes, de sections. |
| `line-default` | `oklch(0.955 0.008 248 / 0.14)` | `{n-150}` | Contour d'un contrôle ou d'un champ au repos. |
| `line-strong` | `oklch(0.955 0.008 248 / 0.26)` | `{n-400}` | Contour au survol, poignée de barre de défilement, piste visible. |
| `line-control` | `oklch(0.955 0.008 248 / 0.18)` | `{n-300}` | Contour d'un champ de saisie au repos, plus visible qu'un filet de structure. |
| `action-primary` | `{n-25}` | `{n-950}` | Aplat de l'action principale : blanc glace en sombre, encre en clair. Une par zone de décision. |
| `action-primary-hover` | `{n-50}` | `{n-700}` | Survol de l'action principale. |
| `action-primary-active` | `{n-100}` | `{n-600}` | Pression de l'action principale. |
| `action-primary-fg` | `{n-950}` | `{n-25}` | Texte et icône sur l'action principale. |
| `accent` | `{glacier-300}` | `{glacier-700}` | Glacier, rare : ce qui est vivant ou en cours, lien, série 1. Jamais une surface. |
| `accent-subtle` | `oklch(0.817 0.087 237 / 0.14)` | `{glacier-100}` | Fond d'une pastille ou d'une zone glacier. |
| `accent-fg` | `{glacier-300}` | `{glacier-700}` | Texte posé sur accent-subtle. |
| `focus-ring` | `{n-25}` | `{n-950}` | Anneau de focus clavier : 2 px, séparé de l'élément par 2 px de fond. |
| `selection` | `{glacier-300}` | `{glacier-700}` | Ce qui est choisi : case cochée, segment actif, ligne sélectionnée. Distinct du focus. |
| `scrim` | `oklch(0.134 0.005 262 / 0.64)` | `oklch(0.22 0.022 255 / 0.4)` | Voile derrière un dialogue ou un panneau latéral. |
| `success` | `{green-300}` | `{green-700}` | Succès, disponible, en ligne. Toujours accompagné d'un mot ou d'une icône. |
| `success-subtle` | `oklch(0.781 0.123 156 / 0.14)` | `oklch(0.95 0.04 156)` | Fond d'un badge ou d'une notice de succès. |
| `success-fg` | `{green-300}` | `{green-700}` | Texte posé sur success-subtle. |
| `warning` | `{amber-300}` | `{amber-700}` | Avertissement non bloquant, dégradé. |
| `warning-subtle` | `oklch(0.816 0.128 76 / 0.14)` | `oklch(0.96 0.05 80)` | Fond d'un badge ou d'une notice d'avertissement. |
| `warning-fg` | `{amber-300}` | `{amber-700}` | Texte posé sur warning-subtle. |
| `danger` | `{red-300}` | `{red-700}` | Destructif, erreur, hors ligne, critique. |
| `danger-subtle` | `oklch(0.72 0.16 25 / 0.14)` | `oklch(0.95 0.035 25)` | Fond d'un badge, d'une notice ou d'un champ en erreur. |
| `danger-fg` | `{red-300}` | `{red-700}` | Texte posé sur danger-subtle. |
| `info` | `{glacier-300}` | `{glacier-700}` | Information neutre, en cours. |
| `info-subtle` | `oklch(0.817 0.087 237 / 0.14)` | `{glacier-100}` | Fond d'un badge ou d'une notice d'information. |
| `info-fg` | `{glacier-300}` | `{glacier-700}` | Texte posé sur info-subtle. |
| `severity-debug` | `{n-300}` | `{n-500}` | Logs : trace et debug. |
| `severity-info` | `{glacier-300}` | `{glacier-700}` | Logs : info. |
| `severity-warn` | `{amber-300}` | `{amber-700}` | Logs : avertissement. |
| `severity-error` | `{red-300}` | `{red-700}` | Logs : erreur. |
| `severity-fatal` | `oklch(0.69 0.2 25)` | `{red-900}` | Logs : fatal, plus saturé que l'erreur. |
| `intelligence` | `{violet-300}` | `{violet-700}` | Connected Intelligence : analyses croisées, pistes d'investigation. Teinte exploratoire, non validée. |
| `intelligence-subtle` | `oklch(0.763 0.111 297 / 0.14)` | `oklch(0.95 0.035 297)` | Fond d'une zone Connected Intelligence. |
| `intelligence-fg` | `{violet-300}` | `{violet-700}` | Texte posé sur intelligence-subtle. |
| `chart-1` | `{glacier-300}` | `{glacier-500}` | Graphiques, série 1 (glacier). Palette catégorielle, jamais porteuse de sens. |
| `chart-2` | `{violet-300}` | `{violet-700}` | Graphiques, série 2 (violet). |
| `chart-3` | `{gold-300}` | `{gold-700}` | Graphiques, série 3 (or). |
| `chart-4` | `{teal-300}` | `{teal-700}` | Graphiques, série 4 (turquoise). |
| `chart-5` | `{rose-300}` | `{rose-700}` | Graphiques, série 5 (rose). |
| `chart-6` | `{sand-300}` | `{sand-700}` | Graphiques, série 6 (sable). |
| `chart-grid` | `oklch(0.955 0.008 248 / 0.07)` | `{n-100}` | Grille des graphiques. |
| `chart-axis` | `{n-400}` | `{n-500}` | Axes et graduations des graphiques. |
| `syntax-comment` | `{fg-tertiary}` | `{fg-tertiary}` | Code : commentaires. |
| `syntax-string` | `{teal-300}` | `{teal-700}` | Code : chaînes. |
| `syntax-number` | `{gold-300}` | `{gold-700}` | Code : nombres, unités. |
| `syntax-keyword` | `{violet-300}` | `{violet-700}` | Code : mots-clés. |
| `syntax-name` | `{glacier-300}` | `{glacier-700}` | Code : clés, balises, variables. |
| `syntax-attr` | `{rose-300}` | `{rose-700}` | Code : attributs, sélecteurs. |
| `syntax-punct` | `{fg-secondary}` | `{fg-secondary}` | Code : ponctuation. |

## Primitives

Jamais utilisées directement par une interface.

| Token | Valeur | Usage |
|---|---|---|
| `n-0` | `oklch(1 0 0)` | Blanc pur : surface surélevée du thème clair, reflets. |
| `n-25` | `oklch(0.978 0.005 248)` | Blanc glace, la couleur de marque : texte principal et action principale en sombre, surface de base en clair. |
| `n-50` | `oklch(0.955 0.008 248)` | Blanc d'état : survol d'un aplat blanc, creux du thème clair. |
| `n-100` | `oklch(0.92 0.011 250)` | Gris très clair : contrôle survolé en clair, filets subtils en clair. |
| `n-150` | `oklch(0.885 0.013 252)` | Gris clair : contrôle pressé en clair, filets par défaut en clair. |
| `n-200` | `oklch(0.83 0.018 253)` | Gris clair lumineux : texte secondaire en sombre. |
| `n-300` | `oklch(0.72 0.022 255)` | Gris moyen clair : texte tertiaire en sombre, filets forts en clair. |
| `n-400` | `oklch(0.62 0.024 255)` | Gris moyen : icônes au repos en sombre, texte désactivé en clair. |
| `n-500` | `oklch(0.5 0.024 254)` | Gris éteint : texte tertiaire en clair, texte désactivé en sombre. |
| `n-600` | `oklch(0.41 0.022 256)` | Graphite clair : texte secondaire en clair, filets forts en sombre. |
| `n-700` | `oklch(0.33 0.019 255)` | Graphite : contrôle pressé en sombre. |
| `n-750` | `oklch(0.29 0.017 256)` | Graphite : contrôle survolé en sombre. |
| `n-800` | `oklch(0.25 0.015 257)` | Graphite profond : contrôle au repos en sombre. |
| `n-850` | `oklch(0.222 0.013 258)` | Surface surélevée en sombre. |
| `n-900` | `oklch(0.196 0.011 262)` | Surface de base en sombre : l'anthracite légèrement bleuté d'Heliony. |
| `n-925` | `oklch(0.18 0.01 256)` | Creux en sombre : champs, pistes, zones enfoncées. |
| `n-950` | `oklch(0.22 0.022 255)` | Encre : texte principal et action principale en clair, texte sur blanc en sombre. |
| `n-1000` | `oklch(0.134 0.005 262)` | Nuit : base des voiles. |
| `glacier-100` | `oklch(0.948 0.028 238)` | Glacier très pâle : fond d'accent en clair. |
| `glacier-300` | `oklch(0.817 0.087 237)` | Glacier : la teinte de marque, rare, pour ce qui est vivant ou en cours (sombre). |
| `glacier-500` | `oklch(0.637 0.134 245)` | Glacier profond : remplissage de données sur fond clair. |
| `glacier-700` | `oklch(0.49 0.11 240)` | Glacier encre : accent lisible comme texte en clair. |
| `glacier-900` | `oklch(0.259 0.045 244)` | Glacier nuit : fond d'accent en sombre. |
| `green-300` | `oklch(0.781 0.123 156)` | Vert clair : succès en sombre. |
| `green-700` | `oklch(0.48 0.12 156)` | Vert profond : succès en clair. |
| `amber-300` | `oklch(0.816 0.128 76)` | Ambre clair : avertissement en sombre. |
| `amber-700` | `oklch(0.5 0.12 68)` | Ambre profond : avertissement en clair. |
| `red-300` | `oklch(0.72 0.16 25)` | Rouge clair : danger en sombre. |
| `red-700` | `oklch(0.5 0.17 26)` | Rouge profond : danger en clair. |
| `red-900` | `oklch(0.36 0.14 26)` | Rouge nuit : fatal en clair. |
| `violet-300` | `oklch(0.763 0.111 297)` | Violet clair : Connected Intelligence en sombre, série 2 des graphiques. |
| `violet-700` | `oklch(0.48 0.14 295)` | Violet profond : Connected Intelligence en clair. |
| `teal-300` | `oklch(0.816 0.094 179)` | Turquoise clair : série 4 des graphiques en sombre. |
| `teal-700` | `oklch(0.52 0.1 180)` | Turquoise profond : série 4 en clair. |
| `rose-300` | `oklch(0.791 0.099 0)` | Rose clair : série 5 en sombre. |
| `rose-700` | `oklch(0.55 0.15 5)` | Rose profond : série 5 en clair. |
| `sand-300` | `oklch(0.812 0.046 86)` | Sable clair : série 6 en sombre. |
| `sand-700` | `oklch(0.52 0.06 80)` | Sable profond : série 6 en clair. |
| `gold-300` | `oklch(0.839 0.104 78)` | Or clair : série 3 en sombre. |
| `gold-700` | `oklch(0.56 0.12 72)` | Or profond : série 3 en clair. |

## Typographie

Classes `.t-*` ou utilitaires Tailwind `text-*` (taille, interligne, graisse et interlettrage ensemble). Familles : `sans` = "Instrument Sans", system-ui, sans-serif ; `mono` = "Geist Mono", ui-monospace, monospace.

| Style | Taille | Interligne | Graisse | Interlettrage | Usage |
|---|---|---|---|---|---|
| `t-display` | 2.5rem | 3rem | 600 | -0.02em | Chiffre clé ou titre d'accueil. Jamais dans une carte. |
| `t-title` | 1.75rem | 2.25rem | 600 | -0.015em | Titre de page. |
| `t-heading` | 1.25rem | 1.75rem | 600 | -0.01em | Titre de section, de carte, de dialogue. |
| `t-subheading` | 1rem | 1.5rem | 500 | — | Sous-titre, titre de toast, ligne forte. |
| `t-lead` | 1rem | 1.625rem | 400 | — | Paragraphe d'introduction, prose publique. |
| `t-body` | 0.875rem | 1.375rem | 400 | — | Texte courant, boutons, cellules. La taille de référence. |
| `t-body-strong` | 0.875rem | 1.375rem | 500 | — | Texte courant appuyé : nom dans une ligne, valeur dans une description. |
| `t-label` | 0.8125rem | 1.125rem | 500 | 0.01em | Libellé de champ, en-tête de colonne, titre de groupe. |
| `t-caption` | 0.75rem | 1rem | 400 | — | Métadonnée, horodatage, aide. Couleur fg-tertiary par défaut. |
| `t-code` | 0.8125rem | 1.25rem | 450 | — | Identifiants, code, valeurs à recopier. |
| `t-figure` | 1.5rem | 1.75rem | 600 | -0.01em | Valeur numérique d'une tuile de statistique. Chiffres tabulaires. |
| `t-figure-lg` | 2rem | 2.25rem | 600 | -0.02em | Valeur numérique mise en avant. Chiffres tabulaires. |

## radius

| Token | Valeur | Usage |
|---|---|---|
| `radius-xs` | `0.25rem` | Badges, touches, puces de sévérité. |
| `radius-sm` | `0.375rem` | Segments, chips, cases à cocher. |
| `radius-md` | `0.5rem` | Boutons, champs, lignes interactives, éléments de menu. |
| `radius-lg` | `0.75rem` | Cartes, menus, popovers, toasts. |
| `radius-xl` | `1rem` | Dialogues, panneaux latéraux, grandes surfaces. |
| `radius-full` | `9999px` | Interrupteurs, avatars, pastilles rondes. |

## shadow

| Token | Valeur | Usage |
|---|---|---|
| `shadow-raised` | dark : `0 1px 2px oklch(0 0 0 / 0.35)` ; light : `0 1px 2px oklch(0.22 0.022 255 / 0.06)` | Carte posée sur la base quand le contraste de surface ne suffit pas. |
| `shadow-overlay` | dark : `0 1px 2px oklch(0 0 0 / 0.4), 0 12px 32px -12px oklch(0 0 0 / 0.6)` ; light : `0 1px 2px oklch(0.22 0.022 255 / 0.06), 0 12px 32px -12px oklch(0.22 0.022 255 / 0.18)` | Menu, popover, tooltip, toast. |
| `shadow-modal` | dark : `0 2px 4px oklch(0 0 0 / 0.4), 0 24px 64px -16px oklch(0 0 0 / 0.7)` ; light : `0 2px 4px oklch(0.22 0.022 255 / 0.08), 0 24px 64px -16px oklch(0.22 0.022 255 / 0.24)` | Dialogue et panneau latéral. |

## size

| Token | Valeur | Usage |
|---|---|---|
| `control-sm` | `2rem` | Contrôle compact : filtre, segment, bouton de barre, ligne de tableau compact. |
| `control-md` | `2.25rem` | Contrôle standard : bouton, champ, élément de menu. |
| `control-lg` | `2.5rem` | Contrôle principal : action principale, champ mis en avant. |
| `control-xl` | `3rem` | Contrôle de site public ou tactile. |
| `icon-sm` | `1rem` | Icône dans un texte, un badge, un libellé. |
| `icon-md` | `1.25rem` | Icône de contrôle. |
| `icon-lg` | `1.5rem` | Icône d'état vide ou de navigation principale. |
| `border-hairline` | `1px` | Filets et contours. |
| `border-focus` | `2px` | Anneau de focus. |
| `row-compact` | `2rem` | Hauteur de ligne en densité compacte. |
| `row-default` | `2.5rem` | Hauteur de ligne en densité par défaut. |
| `row-comfortable` | `3rem` | Hauteur de ligne en densité confortable. |
| `sidebar-width` | `16rem` | Largeur de la navigation latérale déployée. |
| `sidebar-width-collapsed` | `3.5rem` | Largeur de la navigation latérale réduite aux icônes. |

## duration

Toute animation respecte prefers-reduced-motion.

| Token | Valeur | Usage |
|---|---|---|
| `duration-fast` | `120ms` | Survol, pression, apparition d'un tooltip. |
| `duration-base` | `180ms` | Ouverture d'un menu, d'un popover, entrée d'un toast. |
| `duration-slow` | `260ms` | Ouverture d'un dialogue ou d'un panneau latéral. |

## easing

| Token | Valeur | Usage |
|---|---|---|
| `ease-standard` | `cubic-bezier(0.2, 0, 0, 1)` | Changements d'état. |
| `ease-enter` | `cubic-bezier(0, 0, 0.2, 1)` | Entrées. |
| `ease-exit` | `cubic-bezier(0.4, 0, 1, 1)` | Sorties. |

## opacity

| Token | Valeur | Usage |
|---|---|---|
| `opacity-disabled` | `0.5` | Contrôle désactivé. |

## zIndex

| Token | Valeur | Usage |
|---|---|---|
| `z-sticky` | `20` | En-têtes collants, barres d'outils. |
| `z-nav` | `30` | Navigation latérale et en-tête d'application. |
| `z-overlay` | `40` | Menus, popovers, panneaux latéraux. |
| `z-modal` | `50` | Dialogues et leur voile. |
| `z-toast` | `60` | Notifications. |
| `z-tooltip` | `70` | Tooltips. |
