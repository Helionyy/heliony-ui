# Composants @heliony/ui 0.1.0

> Généré depuis catalog/catalog.ts. Import : `import { Nom } from '@heliony/ui'`. Styles : `@import '@heliony/ui/styles.css'` et `@import '@heliony/ui/theme.css'` une fois dans le CSS racine, après `@import 'tailwindcss'`. Racine : `<HelionyProvider>`.

| Composant | Groupe | Rôle | Origine |
|---|---|---|---|
| [`HelionyProvider`](#helionyprovider) | Fondations | Racine d’une application : thème, langue, chaînes et délai des tooltips. | maison |
| [`Surface`](#surface) | Structure | Un niveau de surface : page, carte, panneau, zone enfoncée. | recodé pour Heliony |
| [`Button`](#button) | Actions | Déclenche une action ; le libellé dit exactement ce qui se passe. | recodé pour Heliony |
| [`ButtonGroup`](#buttongroup) | Actions | Aligne des actions liées avec l’écart standard, ou les soude. | recodé pour Heliony |
| [`Badge`](#badge) | Retours | Étiquette courte : statut, catégorie, compteur. | recodé pour Heliony |
| [`Icon`](#icon) | Fondations | Pictogramme Lucide à taille et trait normalisés. | maison |
| [`Kbd`](#kbd) | Actions | Une touche ou un raccourci clavier. | repris de shadcn-svelte et habillé |
| [`Spinner`](#spinner) | Retours | Chargement court en cours, dans un bouton ou un coin de carte. | repris de shadcn-svelte et habillé |
| [`Skeleton`](#skeleton) | Retours | Silhouette d’un contenu en chargement. | recodé pour Heliony |
| [`Divider`](#divider) | Structure | Filet de séparation, avec libellé en option. | repris de shadcn-svelte et habillé |
| [`Avatar`](#avatar) | Données | Image ou initiales d’une personne, d’une organisation ou d’un serveur. | recodé pour Heliony |
| [`EmptyState`](#emptystate) | Retours | Rien à montrer, une erreur, ou un accès refusé : icône, titre, texte, action. | recodé pour Heliony |
| [`DataState`](#datastate) | Retours | Rend un bloc de données selon son statut : prêt, chargement, vide, erreur, interdit. | maison |
| [`Field`](#field) | Saisie | Libellé, aide et erreur d’un champ ; relie l’accessibilité au contrôle enfant. | recodé pour Heliony |
| [`Input`](#input) | Saisie | Champ de saisie d’une ligne avec icône, préfixe, suffixe et contenu de fin. | recodé pour Heliony |
| [`Textarea`](#textarea) | Saisie | Saisie multiligne, redimensionnable ou auto-ajustée. | repris de shadcn-svelte et habillé |
| [`Checkbox`](#checkbox) | Saisie | Choix multiple ou acceptation, avec libellé et description. | repris de shadcn-svelte et habillé |
| [`Switch`](#switch) | Saisie | Réglage à effet immédiat, sans validation. | repris de shadcn-svelte et habillé |
| [`RadioGroup`](#radiogroup) | Saisie | Un choix parmi peu, tous visibles ; en liste ou en cartes. | recodé pour Heliony |
| [`Tabs`](#tabs) | Navigation | Onglets soulignés, en pastilles ou segmentés, avec compteur et point de ton. | recodé pour Heliony |
| [`Tooltip`](#tooltip) | Flottants | Précision courte au survol ou au focus, avec raccourci en option. | recodé pour Heliony |
| [`Popover`](#popover) | Flottants | Panneau flottant ancré à un déclencheur : filtres, détails, petit formulaire. | repris de shadcn-svelte et habillé |
| [`Dialog`](#dialog) | Flottants | Fenêtre modale : titre, description, contenu, pied d’actions. | recodé pour Heliony |
| [`AlertDialog`](#alertdialog) | Flottants | Confirmation bloquante avec Annuler et Confirmer ; gère l’attente de onconfirm. | recodé pour Heliony |
| [`Sheet`](#sheet) | Flottants | Panneau latéral ou feuille : inspecteur, détail d’une ligne, navigation mobile. | recodé pour Heliony |
| [`Menu`](#menu) | Flottants | Menu déroulant d’actions, groupées, avec icône, raccourci et détail. | recodé pour Heliony |
| [`Select`](#select) | Saisie | Liste déroulante : options avec icône, détail et groupes, clavier complet. | recodé pour Heliony |
| [`Toast`](#toast) | Retours | Une notification : ton, icône ou image, compteur de répétitions, minuteur. | recodé pour Heliony |
| [`Toaster`](#toaster) | Retours | Zone qui affiche la file de toast, une fois dans l’application. | recodé pour Heliony |
| [`Breadcrumb`](#breadcrumb) | Navigation | Fil d’Ariane, replié au milieu quand il est long. | recodé pour Heliony |
| [`ThemeToggle`](#themetoggle) | Actions | Bascule Sombre / Clair, ou menu Sombre / Clair / Système. | maison |
| [`Progress`](#progress) | Retours | Progression bornée ou indéterminée, avec libellé et valeur. | recodé pour Heliony |
| [`Collapsible`](#collapsible) | Structure | Section repliable avec chevron, titre et description. | recodé pour Heliony |
| [`Accordion`](#accordion) | Structure | Liste de sections repliables, une ou plusieurs ouvertes. | recodé pour Heliony |
| [`Segmented`](#segmented) | Saisie | Une valeur parmi deux à quatre, visible d’un coup d’œil. | recodé pour Heliony |
| [`Slider`](#slider) | Saisie | Valeur continue avec libellé, valeur et bornes. | recodé pour Heliony |
| [`ScrollArea`](#scrollarea) | Structure | Zone défilante à barres fines et discrètes. | repris de shadcn-svelte et habillé |
| [`AppShell`](#appshell) | Structure | Gabarit d’application : navigation latérale, en-tête, contenu ; raccourci ⌘B. | recodé pour Heliony |
| [`Sidebar`](#sidebar) | Navigation | Navigation latérale par modules : sections titrées, sous-entrées, badges, réduite en icônes, feuille sur mobile. | recodé pour Heliony |
| [`SidebarTrigger`](#sidebartrigger) | Navigation | Bouton qui replie ou ouvre la navigation latérale. | repris de shadcn-svelte et habillé |
| [`Pagination`](#pagination) | Données | Pages d’une liste, avec résumé et mode compact. | recodé pour Heliony |
| [`Combobox`](#combobox) | Saisie | Saisie avec liste filtrée : recherche locale ou distante. | recodé pour Heliony |
| [`Calendar`](#calendar) | Saisie | Grille d’un mois, navigation et clavier complets, locale du provider. | recodé pour Heliony |
| [`DateField`](#datefield) | Saisie | Champ de date à segments avec calendrier ancré. | recodé pour Heliony |
| [`Table`](#table) | Données | Tableau simple en données : colonnes, lignes, densité, sélection. | recodé pour Heliony |
| [`DataTable`](#datatable) | Données | Tableau complet sur TanStack Table : tri, recherche, colonnes, densité, sélection, pagination, cartes sur mobile, états. | recodé pour Heliony |
| [`Stat`](#stat) | Données | La valeur clé d’un écran avec sa partie secondaire en retrait. | recodé pour Heliony |
| [`StatTile`](#stattile) | Données | Indicateur clé en tuile : valeur, variation, tendance, aide, état, sélectionnable. | recodé pour Heliony |
| [`DataRow`](#datarow) | Données | Ligne de liste : icône, titre, détail, valeur, métadonnée, chevron. | recodé pour Heliony |
| [`DescriptionList`](#descriptionlist) | Données | Paires clé / valeur d’un détail, en colonnes, avec copie. | recodé pour Heliony |
| [`FilterChip`](#filterchip) | Données | Un filtre actif : clé = valeur, inclus ou exclu, retirable. | recodé pour Heliony |
| [`FacetList`](#facetlist) | Données | Valeurs d’une dimension avec leur compte : cliquer ajoute ou retire le filtre. | recodé pour Heliony |
| [`PeriodPicker`](#periodpicker) | Données | Période d’un graphique, rafraîchissement et fraîcheur des données. | recodé pour Heliony |
| [`Sparkline`](#sparkline) | Données | Mini-courbe sans axes pour une tuile ou une cellule. | recodé pour Heliony |
| [`TimeChart`](#timechart) | Données | Courbe ou aire dans le temps : séries, seuils, bandes, survol, clavier, légende cliquable. | recodé pour Heliony |
| [`BarChart`](#barchart) | Données | Barres par intervalle, groupées ou empilées, avec survol et états. | recodé pour Heliony |
| [`DonutChart`](#donutchart) | Données | Répartition en parts sur un anneau, valeur au centre, légende. | recodé pour Heliony |
| [`SeverityDot`](#severitydot) | Retours | Pastille de sévérité d’un log : trace, debug, info, warn, error, fatal. | recodé pour Heliony |
| [`Notice`](#notice) | Retours | Message en ligne qui reste dans la page : information, succès, avertissement, erreur. | recodé pour Heliony |
| [`CodeBlock`](#codeblock) | Données | Bloc de code coloré sans dépendance : 13 langages, copie, numéros, retour à la ligne, lignes surlignées. | recodé pour Heliony |
| [`LogView`](#logview) | Données | Flux de logs : sévérités, horodatage, source, surlignage, suivi automatique, sélection. | recodé pour Heliony |
| [`Console`](#console) | Données | Console d’un serveur : flux de lignes, saisie de commande avec historique, lecture seule ou écriture. | maison |
| [`JsonTree`](#jsontree) | Données | Arborescence d’une valeur JSON : dépliage, clavier, copie et filtre par chemin. | recodé pour Heliony |
| [`TraceWaterfall`](#tracewaterfall) | Données | Cascade des spans d’une trace : hiérarchie, durées, services colorés, erreurs, clavier. | recodé pour Heliony |
| [`StatusTimeline`](#statustimeline) | Données | Disponibilité par tranche : segments ok, dégradé, arrêt, inconnu, taux et légende. | recodé pour Heliony |
| [`Timeline`](#timeline) | Données | Événements datés sur un rail vertical, groupés par jour, avec icône, acteur et détail. | maison |
| [`Chip`](#chip) | Saisie | Jeton de choix ou d’étiquette : sélectionnable, compté, retirable. | recodé pour Heliony |
| [`Code`](#code) | Données | Identifiant en ligne, en Geist Mono, avec copie et troncature. | recodé pour Heliony |
| [`Steps`](#steps) | Navigation | Parcours en étapes : faites, courante, à venir, en ligne ou en colonne. | recodé pour Heliony |
| [`Stepper`](#stepper) | Saisie | Quantité entière avec boutons − / + et saisie directe. | recodé pour Heliony |
| [`Tree`](#tree) | Navigation | Arborescence : dossiers et fichiers, ressources et dépendances, clavier complet. | recodé pour Heliony |
| [`Lightbox`](#lightbox) | Flottants | Image ou média en très grand au-dessus de la page, sans la quitter. | recodé pour Heliony |
| [`EntitySwitcher`](#entityswitcher) | Navigation | Sélecteur d’organisation ou de serveur en tête de navigation, avec groupes et création. | maison |
| [`TimeHistogram`](#timehistogram) | Données | Histogramme temporel empilé avec sélection de plage à la souris et au clavier. | recodé pour Heliony |

## Fondations

### HelionyProvider

Racine d’une application : thème, langue, chaînes et délai des tooltips.

**Utiliser** : Une fois, dans le layout racine. Tout composant Heliony en dessous lit sa configuration. locale pilote les chaînes internes et les formats de date et de nombre.

**Éviter** : Plusieurs providers imbriqués : la langue se change par remontage.

| Prop | Type | Défaut | Description |
|---|---|---|---|
| `locale` | `string` | 'en' | Langue des chaînes internes et des formats. |
| `strings` | `DeepPartial<Strings>` | — | Surcharges de chaînes. |
| `timeZone` | `string` | — | Fuseau des dates affichées. |
| `defaultMode` | `'dark' \| 'light' \| 'system'` | 'dark' | Thème initial avant choix de l’utilisateur. |
| `modeStorageKey` | `string` | 'heliony-mode' | Clé localStorage du thème. |
| `tooltipDelay` | `number` | 300 | Délai d’apparition des tooltips en ms. |

```svelte
<HelionyProvider locale="fr" defaultMode="dark">
  <App />
  <Toaster />
</HelionyProvider>
```

### Icon

Pictogramme Lucide à taille et trait normalisés.

**Utiliser** : Passer le composant Lucide : icon={Server}. Seules les icônes utilisées sont embarquées. label rend l’icône porteuse de sens ; sans label elle est décorative.

**Éviter** : Importer tout Lucide par nom de chaîne.

| Prop | Type | Défaut | Description |
|---|---|---|---|
| `icon` | `IconComponent` | — | Composant Lucide ou icône maison. |
| `size` | `'sm' \| 'md' \| 'lg' \| number` | 'md' | 16 / 20 / 24 px. |
| `strokeWidth` | `number` | 1.75 |  |
| `label` | `string` | — | Nom accessible. |

```svelte
<Icon icon={Server} size="sm" />
<Icon icon={TriangleAlert} label="Avertissement" />
```

## Actions

### Button

Déclenche une action ; le libellé dit exactement ce qui se passe.

**Utiliser** : primary pour l’action qui fait avancer la tâche, en général une par zone de décision. secondary ou ghost pour les actions de même importance côte à côte. danger pour détruire, quiet pour Annuler, link pour naviguer dans le texte. iconOnly exige label : il devient le nom accessible.

**Éviter** : « OK » ou « Valider » quand l’action a un nom. Un bouton désactivé sans explication à côté.

| Prop | Type | Défaut | Description |
|---|---|---|---|
| `variant` | `'primary' \| 'secondary' \| 'ghost' \| 'quiet' \| 'danger' \| 'link'` | 'secondary' | Emphase. |
| `size` | `'sm' \| 'md' \| 'lg'` | 'md' | 32 / 36 / 40 px. |
| `href` | `string` | — | Rend un lien avec le même rendu. |
| `icon` | `IconComponent` | — | Icône Lucide à gauche. |
| `iconEnd` | `IconComponent` | — | Icône à droite. |
| `iconOnly` | `boolean` | false | Bouton carré sans texte. |
| `label` | `string` | — | Texte, ou nom accessible si iconOnly. |
| `shortcut` | `string` | — | Raccourci affiché en Kbd. |
| `loading` | `boolean` | false | Garde la taille, bloque le clic. |
| `block` | `boolean` | false | Pleine largeur. |
| `round` | `boolean` | false |  |
| `disabled` | `boolean` | false |  |

```svelte
<Button variant="primary" icon={Play} onclick={start}>Démarrer le serveur</Button>
<Button variant="danger" icon={Trash2}>Supprimer</Button>
<Button variant="quiet" iconOnly icon={X} label="Fermer" />
```

### ButtonGroup

Aligne des actions liées avec l’écart standard, ou les soude.

**Utiliser** : Pied de dialogue ou de formulaire. attached pour un groupe soudé de boutons secondaires.

**Éviter** : Plus de trois actions : passer par un Menu.

| Prop | Type | Défaut | Description |
|---|---|---|---|
| `align` | `'start' \| 'end' \| 'center' \| 'between' \| 'stretch'` | 'end' |  |
| `attached` | `boolean` | false | Boutons soudés. |
| `label` | `string` | — | Nom accessible du groupe. |

```svelte
<ButtonGroup>
  <Button variant="quiet">Annuler</Button>
  <Button variant="primary">Enregistrer</Button>
</ButtonGroup>
```

### Kbd

Une touche ou un raccourci clavier.

**Utiliser** : Dans un bouton via shortcut, dans un tooltip, dans un menu.

**Éviter** : Une touche sans action associée.

| Prop | Type | Défaut | Description |
|---|---|---|---|
| `size` | `'sm' \| 'md'` | 'sm' |  |

```svelte
<Kbd>⌘K</Kbd>
```

### ThemeToggle

Bascule Sombre / Clair, ou menu Sombre / Clair / Système.

**Utiliser** : Dans l’en-tête ou le pied de la navigation.

| Prop | Type | Défaut | Description |
|---|---|---|---|
| `variant` | `'toggle' \| 'menu'` | 'toggle' |  |
| `size` | `'sm' \| 'md'` | 'md' |  |

```svelte
<ThemeToggle variant="menu" />
```

## Saisie

### Field

Libellé, aide et erreur d’un champ ; relie l’accessibilité au contrôle enfant.

**Utiliser** : Envelopper Input, Textarea, Select, Combobox, DateField : ils héritent id, aria-describedby, invalid et disabled. L’erreur dit comment corriger.

**Éviter** : Un placeholder à la place du libellé.

| Prop | Type | Défaut | Description |
|---|---|---|---|
| `label` | `string` | — |  |
| `help` | `string` | — |  |
| `error` | `string` | — | Active l’état invalide. |
| `aside` | `string` | — | Indication à droite du libellé. |
| `required` | `boolean` | false |  |
| `optional` | `boolean` | false | Mention Facultatif. |
| `disabled` | `boolean` | false |  |
| `orientation` | `'vertical' \| 'horizontal'` | 'vertical' |  |
| `id` | `string` | auto |  |

```svelte
<Field label="Nom du serveur" help="Visible par votre équipe" error={errors.name}>
  <Input bind:value={name} placeholder="Los Santos RP" />
</Field>
```

### Input

Champ de saisie d’une ligne avec icône, préfixe, suffixe et contenu de fin.

**Utiliser** : Dans un Field pour le libellé. mono pour un identifiant ou une clé. suffix pour une unité, end pour un bouton ou un Kbd.

**Éviter** : Un champ sans Field ni aria-label.

| Prop | Type | Défaut | Description |
|---|---|---|---|
| `value` | `string \| number \| null` | '' | bind:value |
| `type` | `string` | 'text' |  |
| `size` | `'sm' \| 'md' \| 'lg'` | 'md' |  |
| `icon` | `IconComponent` | — |  |
| `prefix` | `string` | — |  |
| `suffix` | `string` | — |  |
| `mono` | `boolean` | false | Geist Mono, chiffres tabulaires. |
| `start` | `Snippet` | — |  |
| `end` | `Snippet` | — |  |
| `invalid` | `boolean` | Field |  |
| `disabled` | `boolean` | Field |  |
| `placeholder` | `string` | — |  |

```svelte
<Input icon={Search} placeholder="Rechercher un joueur" />
<Input mono value="srv_01HZX…" readonly />
```

### Textarea

Saisie multiligne, redimensionnable ou auto-ajustée.

**Utiliser** : autosize pour un message qui grandit avec le texte.

| Prop | Type | Défaut | Description |
|---|---|---|---|
| `value` | `string \| null` | '' | bind:value |
| `rows` | `number` | 3 |  |
| `autosize` | `boolean` | false |  |
| `mono` | `boolean` | false |  |
| `invalid` | `boolean` | Field |  |
| `disabled` | `boolean` | Field |  |

```svelte
<Field label="Note interne"><Textarea bind:value={note} autosize /></Field>
```

### Checkbox

Choix multiple ou acceptation, avec libellé et description.

**Utiliser** : indeterminate pour une sélection partielle (tout / certains).

**Éviter** : Pour un réglage à effet immédiat : Switch.

| Prop | Type | Défaut | Description |
|---|---|---|---|
| `checked` | `boolean` | false | bind:checked |
| `indeterminate` | `boolean` | false | bind:indeterminate |
| `label` | `string` | — |  |
| `description` | `string` | — |  |
| `disabled` | `boolean` | false |  |
| `required` | `boolean` | false |  |
| `name` | `string` | — |  |
| `value` | `string` | — |  |
| `onchange` | `(checked: boolean) => void` | — |  |

```svelte
<Checkbox bind:checked={notify} label="M’alerter sur Discord" description="Incidents et redémarrages" />
```

### Switch

Réglage à effet immédiat, sans validation.

**Utiliser** : labelPosition="start" pour une liste de réglages alignés à droite.

**Éviter** : Dans un formulaire validé par un bouton : Checkbox.

| Prop | Type | Défaut | Description |
|---|---|---|---|
| `checked` | `boolean` | false | bind:checked |
| `label` | `string` | — |  |
| `description` | `string` | — |  |
| `size` | `'sm' \| 'md'` | 'md' |  |
| `labelPosition` | `'end' \| 'start'` | 'end' |  |
| `disabled` | `boolean` | false |  |
| `onchange` | `(checked: boolean) => void` | — |  |

```svelte
<Switch bind:checked={maintenance} label="Mode maintenance" description="Refuse les nouvelles connexions" />
```

### RadioGroup

Un choix parmi peu, tous visibles ; en liste ou en cartes.

**Utiliser** : Deux à cinq options. variant="cards" quand chaque option a une description.

**Éviter** : Plus de cinq options : Select.

| Prop | Type | Défaut | Description |
|---|---|---|---|
| `value` | `string` | '' | bind:value |
| `options` | `(Option & { description? })[]` | — |  |
| `name` | `string` | — |  |
| `label` | `string` | — | Nom accessible. |
| `orientation` | `'vertical' \| 'horizontal'` | 'vertical' |  |
| `variant` | `'plain' \| 'cards'` | 'plain' |  |
| `disabled` | `boolean` | false |  |
| `onchange` | `(value: string) => void` | — |  |

```svelte
<RadioGroup bind:value={mode} variant="cards" options={[
  { value: 'observer', label: 'Observer', description: 'Lecture seule' },
  { value: 'operator', label: 'Operator', description: 'Lecture et opérations autorisées' },
]} />
```

### Select

Liste déroulante : options avec icône, détail et groupes, clavier complet.

**Utiliser** : Plus de cinq options, ou options avec détail. Dans un Field pour le libellé.

**Éviter** : Deux à quatre options visibles d’un coup : Segmented ou RadioGroup. Recherche nécessaire : Combobox.

| Prop | Type | Défaut | Description |
|---|---|---|---|
| `value` | `string` | '' | bind:value |
| `options` | `Option[]` | — | { value, label, detail?, icon?, disabled?, group? } |
| `placeholder` | `string` | Choisir |  |
| `size` | `'sm' \| 'md' \| 'lg'` | 'md' |  |
| `block` | `boolean` | true |  |
| `disabled` | `boolean` | Field |  |
| `invalid` | `boolean` | Field |  |
| `name` | `string` | — |  |
| `onchange` | `(value: string) => void` | — |  |

```svelte
<Field label="Serveur"><Select bind:value={server} options={servers.map((s) => ({ value: s.id, label: s.name, detail: s.region }))} /></Field>
```

### Segmented

Une valeur parmi deux à quatre, visible d’un coup d’œil.

**Utiliser** : Période d’un graphique, mode d’affichage, densité. iconOnly avec label pour une barre d’outils compacte.

**Éviter** : Naviguer entre sections : Tabs.

| Prop | Type | Défaut | Description |
|---|---|---|---|
| `value` | `string` | '' | bind:value |
| `options` | `Option[]` | — |  |
| `size` | `'sm' \| 'md' \| 'lg'` | 'md' |  |
| `block` | `boolean` | false |  |
| `iconOnly` | `boolean` | false |  |
| `label` | `string` | — |  |
| `disabled` | `boolean` | false |  |
| `onchange` | `(value: string) => void` | — |  |

```svelte
<Segmented bind:value={period} options={[{ value: '24h', label: '24 h' }, { value: '7d', label: '7 j' }, { value: '30d', label: '30 j' }]} />
```

### Slider

Valeur continue avec libellé, valeur et bornes.

**Utiliser** : Seuil d’alerte, volume, pourcentage.

**Éviter** : Valeur précise à saisir : Input type number.

| Prop | Type | Défaut | Description |
|---|---|---|---|
| `value` | `number` | 0 | bind:value |
| `min` | `number` | 0 |  |
| `max` | `number` | 100 |  |
| `step` | `number` | 1 |  |
| `label` | `string` | — |  |
| `showValue` | `boolean` | true |  |
| `format` | `(value) => string` | — |  |
| `minLabel` | `string` | — |  |
| `maxLabel` | `string` | — |  |
| `disabled` | `boolean` | false |  |
| `onchange` | `(value: number) => void` | — |  |
| `oncommit` | `(value: number) => void` | — | À la fin du glissement. |

```svelte
<Slider label="Seuil CPU" bind:value={cpu} format={(v) => `${v} %`} />
```

### Combobox

Saisie avec liste filtrée : recherche locale ou distante.

**Utiliser** : onsearch pour interroger un serveur ; loading affiche l’attente. filter remplace le filtrage local par défaut.

**Éviter** : Moins de dix options sans recherche : Select.

| Prop | Type | Défaut | Description |
|---|---|---|---|
| `value` | `string` | '' | bind:value |
| `options` | `Option[]` | — |  |
| `placeholder` | `string` | Rechercher |  |
| `emptyText` | `string` | Aucun résultat |  |
| `size` | `'sm' \| 'md' \| 'lg'` | 'md' |  |
| `loading` | `boolean` | false |  |
| `disabled` | `boolean` | Field |  |
| `invalid` | `boolean` | Field |  |
| `filter` | `(option, query) => boolean` | local |  |
| `onsearch` | `(query: string) => void` | — |  |
| `onchange` | `(value: string) => void` | — |  |

```svelte
<Field label="Joueur"><Combobox bind:value={playerId} options={players} onsearch={search} loading={searching} /></Field>
```

### Calendar

Grille d’un mois, navigation et clavier complets, locale du provider.

**Utiliser** : value est un DateValue (@internationalized/date) ; toIsoDate et fromIsoDate convertissent.

**Éviter** : Pour une saisie dans un formulaire : DateField.

| Prop | Type | Défaut | Description |
|---|---|---|---|
| `value` | `DateValue` | — | bind:value |
| `placeholder` | `DateValue` | — | Mois affiché. |
| `minValue` | `DateValue` | — |  |
| `maxValue` | `DateValue` | — |  |
| `locale` | `string` | provider |  |
| `weekStartsOn` | `0..6` | 1 |  |
| `disabled` | `boolean` | false |  |
| `readonly` | `boolean` | false |  |
| `isDateDisabled` | `(date) => boolean` | — |  |
| `isDateUnavailable` | `(date) => boolean` | — |  |
| `onchange` | `(value) => void` | — |  |

```svelte
<Calendar bind:value={date} maxValue={todayDate()} />
```

### DateField

Champ de date à segments avec calendrier ancré.

**Utiliser** : Dans un Field. Les segments se tapent au clavier, le calendrier s’ouvre par le bouton.

| Prop | Type | Défaut | Description |
|---|---|---|---|
| `value` | `DateValue` | — | bind:value |
| `placeholder` | `DateValue` | — |  |
| `minValue` | `DateValue` | — |  |
| `maxValue` | `DateValue` | — |  |
| `locale` | `string` | provider |  |
| `weekStartsOn` | `0..6` | 1 |  |
| `size` | `'sm' \| 'md' \| 'lg'` | 'md' |  |
| `disabled` | `boolean` | Field |  |
| `readonly` | `boolean` | false |  |
| `invalid` | `boolean` | Field |  |
| `name` | `string` | — | Champ caché ISO pour un formulaire. |
| `isDateDisabled` | `(date) => boolean` | — |  |
| `isDateUnavailable` | `(date) => boolean` | — |  |
| `onchange` | `(value) => void` | — |  |

```svelte
<Field label="Début de période"><DateField bind:value={from} maxValue={todayDate()} /></Field>
```

### Chip

Jeton de choix ou d’étiquette : sélectionnable, compté, retirable.

**Utiliser** : onclick le rend sélectionnable (aria-pressed) ; removable ajoute la croix.

**Éviter** : Pour un filtre clé = valeur : FilterChip. Pour un statut : Badge.

| Prop | Type | Défaut | Description |
|---|---|---|---|
| `label` | `string` | — |  |
| `icon` | `IconComponent` | — |  |
| `selected` | `boolean` | false |  |
| `disabled` | `boolean` | false |  |
| `count` | `number` | — |  |
| `size` | `'sm' \| 'md'` | 'md' |  |
| `removable` | `boolean` | false |  |
| `onclick` | `(e) => void` | — |  |
| `onremove` | `() => void` | — |  |

```svelte
<Chip label="Erreurs" count={4} selected onclick={toggle} />
```

### Stepper

Quantité entière avec boutons − / + et saisie directe.

**Utiliser** : Nombre de machines, de jours de conservation, seuil entier. Dans un Field.

**Éviter** : Valeur continue : Slider.

| Prop | Type | Défaut | Description |
|---|---|---|---|
| `value` | `number` | 0 | bind:value |
| `min` | `number` | 0 |  |
| `max` | `number` | ∞ |  |
| `step` | `number` | 1 |  |
| `size` | `'sm' \| 'md' \| 'lg'` | 'md' |  |
| `disabled` | `boolean` | Field |  |
| `invalid` | `boolean` | Field |  |
| `name` | `string` | — |  |
| `suffix` | `string` | — |  |
| `showMax` | `boolean` | false |  |
| `onchange` | `(value) => void` | — |  |

```svelte
<Field label="Conservation des logs"><Stepper bind:value={days} min={1} max={90} suffix="j" showMax /></Field>
```

## Navigation

### Tabs

Onglets soulignés, en pastilles ou segmentés, avec compteur et point de ton.

**Utiliser** : underline pour les sections d’une page, pill pour des filtres, segmented pour un petit choix d’affichage. children reçoit la valeur et rend le contenu de l’onglet.

**Éviter** : Plus de sept onglets.

| Prop | Type | Défaut | Description |
|---|---|---|---|
| `value` | `string` | premier onglet | bind:value |
| `tabs` | `Tab[]` | — | { value, label, icon?, count?, tone?, disabled? } |
| `variant` | `'underline' \| 'pill' \| 'segmented'` | 'underline' |  |
| `size` | `'sm' \| 'md'` | 'md' |  |
| `orientation` | `'horizontal' \| 'vertical'` | 'horizontal' |  |
| `block` | `boolean` | false | Onglets à parts égales. |
| `label` | `string` | — |  |
| `onchange` | `(value: string) => void` | — |  |

```svelte
<Tabs bind:value={tab} tabs={[{ value: 'all', label: 'Tous', count: 128 }, { value: 'errors', label: 'Erreurs', count: 4, tone: 'danger' }]}>
  {#snippet children({ value })}<LogView … />{/snippet}
</Tabs>
```

### Breadcrumb

Fil d’Ariane, replié au milieu quand il est long.

**Utiliser** : Le dernier élément est la page courante. maxVisible replie le milieu dans un menu.

**Éviter** : Plus de deux niveaux visibles dans une barre étroite.

| Prop | Type | Défaut | Description |
|---|---|---|---|
| `items` | `Crumb[]` | — | { label, href?, icon? } |
| `maxVisible` | `number` | 4 |  |
| `onnavigate` | `(crumb: Crumb) => void` | — |  |

```svelte
<Breadcrumb items={[{ label: 'Organisation', href: '/org' }, { label: 'Serveurs', href: '/org/servers' }, { label: 'Los Santos RP' }]} />
```

### Sidebar

Navigation latérale par modules : sections titrées, sous-entrées, badges, réduite en icônes, feuille sur mobile.

**Utiliser** : sections sépare nettement les modules ; current marque l’entrée active par id ou href. Repliée, chaque entrée garde un tooltip.

**Éviter** : Plus de huit entrées par section.

| Prop | Type | Défaut | Description |
|---|---|---|---|
| `sections` | `NavSection[]` | — | { id, label?, entries: NavEntry[] } |
| `current` | `string` | — | id ou href actif. |
| `open` | `boolean` | true | bind:open hors AppShell. |
| `collapsible` | `boolean` | true |  |
| `label` | `string` | — |  |
| `onnavigate` | `(entry: NavEntry) => void` | — |  |
| `brand` | `Snippet` | — | Reçoit collapsed. |
| `footer` | `Snippet` | — | Reçoit collapsed. |

```svelte
<Sidebar sections={[{ id: 'ops', label: 'Opérations', entries: [{ id: 'servers', label: 'Serveurs', icon: Server, href: '/servers', badge: 3 }] }]} current="/servers" />
```

### SidebarTrigger

Bouton qui replie ou ouvre la navigation latérale.

**Utiliser** : Dans l’en-tête, à gauche du fil d’Ariane.

| Prop | Type | Défaut | Description |
|---|---|---|---|
| `size` | `'sm' \| 'md'` | 'md' |  |

```svelte
<SidebarTrigger />
```

### Steps

Parcours en étapes : faites, courante, à venir, en ligne ou en colonne.

**Utiliser** : Installation de l’agent, onboarding, assistant de configuration. clickable permet de revenir sur une étape faite.

**Éviter** : Plus de six étapes : regrouper.

| Prop | Type | Défaut | Description |
|---|---|---|---|
| `steps` | `StepItem[]` | — | { id, label, description?, icon?, disabled?, optional? } |
| `current` | `string` | — |  |
| `completed` | `string[]` | avant current |  |
| `orientation` | `'horizontal' \| 'vertical'` | 'horizontal' |  |
| `clickable` | `boolean` | false |  |
| `onselect` | `(step, index) => void` | — |  |

```svelte
<Steps steps={[{ id: 'org', label: 'Organisation' }, { id: 'machine', label: 'Machine' }, { id: 'agent', label: 'Agent' }, { id: 'done', label: 'Vérification' }]} current="agent" />
```

### Tree

Arborescence : dossiers et fichiers, ressources et dépendances, clavier complet.

**Utiliser** : expanded et selected sont bindables ; count et tone marquent une branche en erreur.

**Éviter** : Pour du JSON : JsonTree.

| Prop | Type | Défaut | Description |
|---|---|---|---|
| `nodes` | `TreeNode[]` | — | { id, label, icon?, meta?, count?, tone?, disabled?, children? } |
| `selected` | `string \| null` | null | bind:selected |
| `expanded` | `string[]` | [] | bind:expanded |
| `label` | `string` | — |  |
| `density` | `'compact' \| 'default'` | 'default' |  |
| `defaultIcons` | `boolean` | true | Dossier / fichier Lucide par défaut. |
| `onselect` | `(node) => void` | — |  |
| `ontoggle` | `(node, open) => void` | — |  |

```svelte
<Tree nodes={files} bind:selected bind:expanded onselect={(n) => open(n.id)} />
```

### EntitySwitcher

Sélecteur d’organisation ou de serveur en tête de navigation, avec groupes et création.

**Utiliser** : En haut de la Sidebar via brand ; collapsed suit l’état réduit. L’app fournit les entités et réagit à onchange ; aucun appel réseau ici.

**Éviter** : Pour un champ de formulaire : Select.

| Prop | Type | Défaut | Description |
|---|---|---|---|
| `entities` | `Entity[]` | — | { id, name, detail?, image?, icon?, group?, tone?, disabled? } |
| `value` | `string` | — | bind:value |
| `label` | `string` | — | Nom accessible et titre du menu. |
| `placeholder` | `string` | — |  |
| `collapsed` | `boolean` | false |  |
| `size` | `'sm' \| 'md'` | 'md' |  |
| `createLabel` | `string` | — | Entrée de création si oncreate. |
| `shape` | `'circle' \| 'square'` | 'square' |  |
| `onchange` | `(entity) => void` | — |  |
| `oncreate` | `() => void` | — |  |
| `footer` | `Snippet` | — |  |

```svelte
<EntitySwitcher label="Organisation" entities={orgs} bind:value={orgId} createLabel="Nouvelle organisation" oncreate={create} onchange={(o) => goto(`/${o.id}`)} />
```

## Flottants

### Tooltip

Précision courte au survol ou au focus, avec raccourci en option.

**Utiliser** : Les enfants reçoivent props à étaler sur l’élément déclencheur. Jamais pour une information indispensable.

**Éviter** : Du contenu interactif dans un tooltip : Popover.

| Prop | Type | Défaut | Description |
|---|---|---|---|
| `text` | `string` | — |  |
| `shortcut` | `string` | — |  |
| `side` | `'top' \| 'bottom' \| 'left' \| 'right'` | 'top' |  |
| `align` | `'start' \| 'center' \| 'end'` | 'center' |  |
| `delay` | `number` | provider |  |
| `disabled` | `boolean` | false | Rend les enfants sans tooltip. |
| `content` | `Snippet` | — | Contenu riche. |

```svelte
<Tooltip text="Redémarrer" shortcut="R">
  {#snippet children({ props })}<Button {...props} iconOnly icon={RotateCw} label="Redémarrer" />{/snippet}
</Tooltip>
```

### Popover

Panneau flottant ancré à un déclencheur : filtres, détails, petit formulaire.

**Utiliser** : trigger reçoit props à étaler ; children reçoit close.

**Éviter** : Un popover qui demande une décision : Dialog.

| Prop | Type | Défaut | Description |
|---|---|---|---|
| `open` | `boolean` | false | bind:open |
| `side` | `'top' \| 'bottom' \| 'left' \| 'right'` | 'bottom' |  |
| `align` | `'start' \| 'center' \| 'end'` | 'start' |  |
| `sideOffset` | `number` | 6 |  |
| `padding` | `'none' \| 'sm' \| 'md'` | 'md' |  |
| `width` | `string` | — | Largeur CSS. |
| `title` | `string` | — |  |
| `trigger` | `Snippet` | — |  |
| `onOpenChange` | `(open: boolean) => void` | — |  |

```svelte
<Popover title="Colonnes" width="16rem">
  {#snippet trigger({ props })}<Button {...props} icon={Columns3}>Colonnes</Button>{/snippet}
  {#snippet children({ close })}…{/snippet}
</Popover>
```

### Dialog

Fenêtre modale : titre, description, contenu, pied d’actions.

**Utiliser** : footer reçoit close ; une action principale par dialogue. Sur mobile, le dialogue devient une feuille en bas.

**Éviter** : Un dialogue pour une simple confirmation : AlertDialog.

| Prop | Type | Défaut | Description |
|---|---|---|---|
| `open` | `boolean` | false | bind:open |
| `title` | `string` | — |  |
| `description` | `string` | — |  |
| `icon` | `IconComponent` | — |  |
| `size` | `'sm' \| 'md' \| 'lg' \| 'xl' \| 'full'` | 'md' |  |
| `dismissible` | `boolean` | true | Échap et clic dehors ferment. |
| `closeButton` | `boolean` | true |  |
| `scrollable` | `boolean` | true |  |
| `trigger` | `Snippet` | — |  |
| `header` | `Snippet` | — |  |
| `footer` | `Snippet` | — |  |
| `onOpenChange` | `(open: boolean) => void` | — |  |

```svelte
<Dialog bind:open title="Inviter un membre" description="Il recevra un e-mail.">
  <Field label="E-mail"><Input type="email" bind:value={email} /></Field>
  {#snippet footer({ close })}<Button variant="quiet" onclick={close}>Annuler</Button><Button variant="primary">Envoyer l’invitation</Button>{/snippet}
</Dialog>
```

### AlertDialog

Confirmation bloquante avec Annuler et Confirmer ; gère l’attente de onconfirm.

**Utiliser** : tone="danger" pour une destruction. onconfirm peut renvoyer une promesse : le bouton passe en chargement.

**Éviter** : Pour une information sans décision : Toast ou Notice.

| Prop | Type | Défaut | Description |
|---|---|---|---|
| `open` | `boolean` | false | bind:open |
| `title` | `string` | — |  |
| `description` | `string` | — |  |
| `icon` | `IconComponent` | selon tone |  |
| `tone` | `'neutral' \| 'danger'` | 'neutral' |  |
| `confirmLabel` | `string` | Confirmer |  |
| `cancelLabel` | `string` | Annuler |  |
| `loading` | `boolean` | false |  |
| `onconfirm` | `() => void \| Promise<void>` | — |  |
| `oncancel` | `() => void` | — |  |
| `trigger` | `Snippet` | — |  |

```svelte
<AlertDialog bind:open tone="danger" title="Arrêter le serveur ?" description="Les 42 joueurs connectés seront déconnectés." confirmLabel="Arrêter" onconfirm={stop} />
```

### Sheet

Panneau latéral ou feuille : inspecteur, détail d’une ligne, navigation mobile.

**Utiliser** : side="right" pour un inspecteur, "bottom" sur mobile. hideHeader garde le titre pour les lecteurs d’écran sans l’afficher.

**Éviter** : Un panneau qui exige une décision : Dialog.

| Prop | Type | Défaut | Description |
|---|---|---|---|
| `open` | `boolean` | false | bind:open |
| `title` | `string` | — |  |
| `description` | `string` | — |  |
| `side` | `'right' \| 'left' \| 'bottom' \| 'top'` | 'right' |  |
| `size` | `'sm' \| 'md' \| 'lg' \| 'xl'` | 'md' |  |
| `hideHeader` | `boolean` | false |  |
| `padding` | `boolean` | true |  |
| `trigger` | `Snippet` | — |  |
| `footer` | `Snippet` | — |  |
| `onOpenChange` | `(open: boolean) => void` | — |  |

```svelte
<Sheet bind:open title={player.name} description="Session en cours">
  <DescriptionList items={details} />
</Sheet>
```

### Menu

Menu déroulant d’actions, groupées, avec icône, raccourci et détail.

**Utiliser** : items en données : group, separatorBefore, danger, shortcut, href. trigger reçoit props et open.

**Éviter** : Plus de douze entrées : Command.

| Prop | Type | Défaut | Description |
|---|---|---|---|
| `items` | `MenuEntry[]` | — |  |
| `open` | `boolean` | false | bind:open |
| `side` | `'top' \| 'bottom' \| 'left' \| 'right'` | 'bottom' |  |
| `align` | `'start' \| 'center' \| 'end'` | 'start' |  |
| `label` | `string` | — |  |
| `onselect` | `(item: MenuEntry) => void` | — |  |
| `trigger` | `Snippet` | — |  |

```svelte
<Menu items={[{ id: 'restart', label: 'Redémarrer', icon: RotateCw, shortcut: 'R' }, { id: 'stop', label: 'Arrêter', icon: Square, danger: true, separatorBefore: true }]} onselect={run}>
  {#snippet trigger({ props })}<Button {...props} iconOnly icon={Ellipsis} label="Actions" />{/snippet}
</Menu>
```

### Lightbox

Image ou média en très grand au-dessus de la page, sans la quitter.

**Utiliser** : Capture d’écran d’un incident, logo, aperçu de fichier. children remplace l’image.

**Éviter** : Pour un formulaire : Dialog.

| Prop | Type | Défaut | Description |
|---|---|---|---|
| `open` | `boolean` | false | bind:open |
| `src` | `string` | — |  |
| `alt` | `string` | '' |  |
| `title` | `string` | — |  |
| `caption` | `string` | — |  |
| `trigger` | `Snippet` | — |  |
| `onOpenChange` | `(open) => void` | — |  |

```svelte
<Lightbox src={shot.url} alt={shot.name} caption={shot.takenAt}>
  {#snippet trigger({ props })}<button {...props}><img src={shot.thumb} alt="" /></button>{/snippet}
</Lightbox>
```

## Retours

### Badge

Étiquette courte : statut, catégorie, compteur.

**Utiliser** : tone transmet le sens, toujours avec un mot ; dot ajoute une pastille de statut. subtle par défaut ; solid pour une étiquette qui doit dominer ; outline pour une catégorie neutre.

**Éviter** : Un badge cliquable : c’est un Button ou un Chip.

| Prop | Type | Défaut | Description |
|---|---|---|---|
| `tone` | `Tone` | 'neutral' | neutral, accent, success, warning, danger, info, intelligence. |
| `variant` | `'subtle' \| 'solid' \| 'outline'` | 'subtle' |  |
| `size` | `'sm' \| 'md'` | 'md' |  |
| `icon` | `IconComponent` | — |  |
| `dot` | `boolean` | false | Pastille de statut. |
| `label` | `string` | — | Texte si pas d’enfants. |

```svelte
<Badge tone="success" dot>En ligne</Badge>
<Badge tone="intelligence" icon={Sparkles}>Connected Intelligence</Badge>
```

### Spinner

Chargement court en cours, dans un bouton ou un coin de carte.

**Utiliser** : Pour une attente de moins de deux secondes ; au-delà, Skeleton ou DataState.

**Éviter** : Un spinner plein écran.

| Prop | Type | Défaut | Description |
|---|---|---|---|
| `size` | `'sm' \| 'md' \| 'lg'` | 'md' |  |
| `label` | `string` | Chargement | Nom accessible. |

```svelte
<Spinner size="sm" />
```

### Skeleton

Silhouette d’un contenu en chargement.

**Utiliser** : Reproduire la forme du contenu attendu : lignes de texte, cercle d’avatar, rectangle de graphique.

**Éviter** : Un squelette qui ne ressemble pas au contenu final.

| Prop | Type | Défaut | Description |
|---|---|---|---|
| `shape` | `'rect' \| 'text' \| 'circle'` | 'rect' |  |
| `lines` | `number` | 1 | Lignes de texte (shape text). |
| `width` | `string` | — | Largeur CSS. |
| `height` | `string` | — | Hauteur CSS. |

```svelte
<Skeleton shape="text" lines={3} />
<Skeleton shape="circle" width="2rem" height="2rem" />
```

### EmptyState

Rien à montrer, une erreur, ou un accès refusé : icône, titre, texte, action.

**Utiliser** : kind choisit l’icône et les textes par défaut ; les surcharger avec le vocabulaire du domaine. Les enfants sont les actions : créer, réessayer, demander l’accès.

**Éviter** : Un état vide sans issue : toujours une action ou une explication.

| Prop | Type | Défaut | Description |
|---|---|---|---|
| `kind` | `'empty' \| 'error' \| 'forbidden'` | 'empty' |  |
| `icon` | `IconComponent` | selon kind |  |
| `title` | `string` | selon kind |  |
| `description` | `string` | selon kind |  |
| `size` | `'sm' \| 'md'` | 'md' |  |
| `bordered` | `boolean` | false | Cadre en pointillés. |

```svelte
<EmptyState icon={Server} title="Aucun serveur" description="Installez l’agent sur une machine pour commencer.">
  <Button variant="primary">Ajouter une machine</Button>
</EmptyState>
```

### DataState

Rend un bloc de données selon son statut : prêt, chargement, vide, erreur, interdit.

**Utiliser** : Envelopper tout bloc alimenté par une requête ; les enfants ne se rendent qu’en ready. skeleton pour un squelette fidèle au contenu ; onretry affiche Réessayer en erreur.

**Éviter** : Gérer les cinq états à la main dans chaque page.

| Prop | Type | Défaut | Description |
|---|---|---|---|
| `status` | `DataStatus` | — | 'ready' \| 'loading' \| 'empty' \| 'error' \| 'forbidden'. |
| `emptyTitle` | `string` | — |  |
| `emptyText` | `string` | — |  |
| `errorTitle` | `string` | — |  |
| `errorText` | `string` | — |  |
| `forbiddenTitle` | `string` | — |  |
| `forbiddenText` | `string` | — |  |
| `lines` | `number` | 4 | Lignes du squelette par défaut. |
| `size` | `'sm' \| 'md'` | 'md' |  |
| `onretry` | `() => void` | — |  |
| `skeleton` | `Snippet` | — |  |
| `empty` | `Snippet` | — | Rendu vide personnalisé. |

```svelte
<DataState status={query.status} onretry={query.refetch} emptyTitle="Aucune session">
  <Table rows={sessions} columns={columns} />
</DataState>
```

### Toast

Une notification : ton, icône ou image, compteur de répétitions, minuteur.

**Utiliser** : Rendu par Toaster ; appeler toast.push() ou toast.success() depuis le code. key regroupe les notifications identiques et incrémente le compteur.

**Éviter** : Un toast pour une erreur bloquante : Notice dans la page.

| Prop | Type | Défaut | Description |
|---|---|---|---|
| `title` | `string` | — |  |
| `description` | `string` | — |  |
| `tone` | `Tone` | 'neutral' |  |
| `icon` | `IconComponent` | selon tone |  |
| `image` | `string` | — |  |
| `imageMode` | `'side' \| 'background'` | 'side' |  |
| `count` | `number` | 1 | Répétitions. |
| `duration` | `number \| null` | 5000 | null : reste affiché. |
| `action` | `ToastAction` | — | { label, onclick } |
| `dismissible` | `boolean` | true |  |
| `ondismiss` | `() => void` | — |  |

```svelte
toast.success('Serveur redémarré', 'Les joueurs peuvent se reconnecter.')
toast.push({ title: 'Nouvelle version', description: 'Agent 0.6.0 disponible', tone: 'info', action: { label: 'Voir', onclick: open } })
```

### Toaster

Zone qui affiche la file de toast, une fois dans l’application.

**Utiliser** : Dans le layout racine, sous HelionyProvider.

| Prop | Type | Défaut | Description |
|---|---|---|---|
| `position` | `'top-end' \| 'top-center' \| 'bottom-end' \| 'bottom-center'` | 'bottom-end' |  |
| `max` | `number` | 5 | Toasts visibles en même temps. |

```svelte
<Toaster position="bottom-end" />
```

### Progress

Progression bornée ou indéterminée, avec libellé et valeur.

**Utiliser** : value null pour une progression indéterminée.

**Éviter** : Pour une mesure qui n’est pas une progression : Meter dans Données.

| Prop | Type | Défaut | Description |
|---|---|---|---|
| `value` | `number \| null` | 0 |  |
| `max` | `number` | 100 |  |
| `tone` | `Tone` | 'neutral' |  |
| `size` | `'sm' \| 'md' \| 'lg'` | 'md' |  |
| `label` | `string` | — |  |
| `showValue` | `boolean` | false |  |
| `format` | `(value, max) => string` | — |  |

```svelte
<Progress label="Mise à jour de l’agent" value={64} showValue />
```

### SeverityDot

Pastille de sévérité d’un log : trace, debug, info, warn, error, fatal.

**Utiliser** : Devant une ligne de log ou dans une colonne de tableau. label affiche le nom.

**Éviter** : Pour un statut métier : Badge.

| Prop | Type | Défaut | Description |
|---|---|---|---|
| `severity` | `Severity` | — |  |
| `label` | `boolean \| string` | false | true affiche le nom localisé, une chaîne le remplace. |
| `size` | `'sm' \| 'md' \| 'lg'` | 'md' |  |

```svelte
<SeverityDot severity="error" label />
```

### Notice

Message en ligne qui reste dans la page : information, succès, avertissement, erreur.

**Utiliser** : Erreur d’un formulaire, retour d’une action, contexte d’une page. actions pour un bouton.

**Éviter** : Pour l’éphémère : toast.

| Prop | Type | Défaut | Description |
|---|---|---|---|
| `tone` | `Tone` | 'neutral' |  |
| `title` | `string` | — |  |
| `text` | `string` | — |  |
| `icon` | `IconComponent` | selon tone |  |
| `dismissible` | `boolean` | false |  |
| `compact` | `boolean` | false |  |
| `ondismiss` | `() => void` | — |  |
| `actions` | `Snippet` | — |  |

```svelte
<Notice tone="warning" title="Agent hors ligne" text="Aucune donnée depuis 12 minutes.">
  {#snippet actions()}<Button size="sm">Voir la machine</Button>{/snippet}
</Notice>
```

## Données

### Avatar

Image ou initiales d’une personne, d’une organisation ou d’un serveur.

**Utiliser** : name donne les initiales de repli et le texte alternatif. status ajoute la pastille en ligne / absent / hors ligne.

**Éviter** : Une image sans name : pas de repli lisible.

| Prop | Type | Défaut | Description |
|---|---|---|---|
| `src` | `string \| null` | — |  |
| `alt` | `string` | name |  |
| `name` | `string` | '' | Initiales de repli. |
| `size` | `'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl'` | 'md' |  |
| `shape` | `'circle' \| 'square'` | 'circle' | square pour une organisation ou un serveur. |
| `status` | `'online' \| 'offline' \| 'away' \| null` | null |  |

```svelte
<Avatar name="Nyx Orbital" status="online" />
<Avatar src={org.logo} name={org.name} shape="square" size="lg" />
```

### Pagination

Pages d’une liste, avec résumé et mode compact.

**Utiliser** : Sous un tableau paginé côté serveur. compact sur mobile.

**Éviter** : Pour un flux infini.

| Prop | Type | Défaut | Description |
|---|---|---|---|
| `count` | `number` | — | Nombre total d’éléments. |
| `perPage` | `number` | 20 |  |
| `page` | `number` | 1 | bind:page |
| `siblingCount` | `number` | 1 |  |
| `size` | `'sm' \| 'md'` | 'sm' |  |
| `showSummary` | `boolean` | false |  |
| `compact` | `boolean` | false |  |
| `onchange` | `(page: number) => void` | — |  |

```svelte
<Pagination count={total} perPage={50} bind:page showSummary />
```

### Table

Tableau simple en données : colonnes, lignes, densité, sélection.

**Utiliser** : Moins de cent lignes sans tri ni filtre. Au-delà ou avec tri, DataTable. align="end" et mono pour les chiffres et identifiants.

**Éviter** : Un tableau pour deux ou trois paires clé / valeur : DescriptionList.

| Prop | Type | Défaut | Description |
|---|---|---|---|
| `columns` | `TableColumn[]` | — | { key, label, align?, width?, mono?, format? } |
| `rows` | `Row[]` | — |  |
| `density` | `Density` | 'default' | compact 32 px, default 40 px, comfortable 48 px. |
| `caption` | `string` | — |  |
| `rowKey` | `(row, index) => string \| number` | index |  |
| `selected` | `string \| number \| null` | null | bind:selected |
| `emptyText` | `string` | Aucun résultat |  |
| `bordered` | `boolean` | true |  |
| `sticky` | `boolean` | false | En-tête collant. |
| `cell` | `Snippet` | — | Rendu de cellule personnalisé. |
| `onselect` | `(row, index) => void` | — |  |

```svelte
<Table columns={[{ key: 'name', label: 'Ressource' }, { key: 'cpu', label: 'CPU', align: 'end', format: (v) => `${v} ms` }]} rows={resources} density="compact" />
```

### DataTable

Tableau complet sur TanStack Table : tri, recherche, colonnes, densité, sélection, pagination, cartes sur mobile, états.

**Utiliser** : columns en ColumnDef TanStack ; meta.align et meta.mono pour l’alignement. renderComponent / renderSnippet pour une cellule riche. status pilote les états ; onopen sur double-clic ou Entrée, onselect au clic. cardColumns choisit les colonnes montrées en cartes sous md.

**Éviter** : Pour une liste courte sans interaction : Table.

| Prop | Type | Défaut | Description |
|---|---|---|---|
| `columns` | `ColumnDef<Row>[]` | — |  |
| `rows` | `Row[]` | — |  |
| `status` | `DataStatus` | 'ready' |  |
| `density` | `Density` | 'default' | bind:density |
| `rowId` | `(row) => string` | index |  |
| `sorting` | `SortingState` | [] | bind:sorting |
| `columnVisibility` | `VisibilityState` | {} | bind:columnVisibility |
| `rowSelection` | `RowSelectionState` | {} | bind:rowSelection |
| `globalFilter` | `string` | '' | bind:globalFilter |
| `pageSize` | `number` | 25 |  |
| `paginate` | `boolean` | true |  |
| `selectable` | `boolean` | false | Colonne de cases à cocher. |
| `searchable` | `boolean` | false | Champ de recherche globale. |
| `densityControl` | `boolean` | false |  |
| `columnsControl` | `boolean` | false | Popover des colonnes visibles. |
| `sticky` | `boolean` | false |  |
| `caption` | `string` | — |  |
| `emptyTitle` | `string` | — |  |
| `emptyText` | `string` | — |  |
| `cardColumns` | `string[]` | 4 premières |  |
| `toolbar` | `Snippet` | — | Contenu supplémentaire de la barre. |
| `card` | `Snippet` | — | Rendu carte personnalisé. |
| `onselect` | `(row) => void` | — |  |
| `onopen` | `(row) => void` | — |  |
| `onretry` | `() => void` | — |  |

```svelte
<DataTable {columns} rows={players} status={query.status} searchable densityControl columnsControl selectable bind:rowSelection onopen={(p) => goto(`/players/${p.id}`)} />
```

### Stat

La valeur clé d’un écran avec sa partie secondaire en retrait.

**Utiliser** : Une par bloc ; pour une rangée d’indicateurs, StatTile.

| Prop | Type | Défaut | Description |
|---|---|---|---|
| `value` | `string` | — |  |
| `minor` | `string` | — | Unité ou décimales en retrait. |
| `label` | `string` | — |  |
| `size` | `'md' \| 'lg' \| 'xl'` | 'lg' |  |
| `align` | `'start' \| 'end'` | 'start' |  |

```svelte
<Stat label="Joueurs en ligne" value="42" minor="/ 128" />
```

### StatTile

Indicateur clé en tuile : valeur, variation, tendance, aide, état, sélectionnable.

**Utiliser** : good indique le sens souhaitable de la variation : la couleur suit. onclick et selected pour une rangée de tuiles qui choisit la mesure détaillée par un graphique. children accueille une Sparkline.

**Éviter** : Plus de six tuiles par rangée.

| Prop | Type | Défaut | Description |
|---|---|---|---|
| `label` | `string` | — |  |
| `value` | `string` | '' |  |
| `unit` | `string` | '' |  |
| `delta` | `number` | — | Variation en %. |
| `deltaLabel` | `string` | — | Période de comparaison. |
| `good` | `'up' \| 'down' \| 'none'` | 'none' |  |
| `tone` | `Tone` | 'neutral' | Filet coloré à gauche. |
| `status` | `DataStatus` | 'ready' |  |
| `message` | `string` | — |  |
| `icon` | `IconComponent` | — |  |
| `help` | `string` | — | Tooltip d’explication. |
| `href` | `string` | — |  |
| `selected` | `boolean` | false |  |
| `size` | `'md' \| 'lg'` | 'md' |  |
| `onclick` | `(e) => void` | — |  |

```svelte
<StatTile label="Rétention J7" value="38" unit="%" delta={-4.2} good="up" deltaLabel="vs semaine précédente" help="Part d’une cohorte revenue le septième jour.">
  <Sparkline values={retention} />
</StatTile>
```

### DataRow

Ligne de liste : icône, titre, détail, valeur, métadonnée, chevron.

**Utiliser** : Listes d’événements, de transactions, de membres. onclick ou href la rend interactive.

**Éviter** : Plus de deux colonnes de valeurs : Table.

| Prop | Type | Défaut | Description |
|---|---|---|---|
| `title` | `string` | — |  |
| `detail` | `string` | — |  |
| `icon` | `IconComponent` | — |  |
| `value` | `string` | — |  |
| `valueTone` | `Tone` | 'neutral' |  |
| `meta` | `string` | — |  |
| `href` | `string` | — |  |
| `selected` | `boolean` | false |  |
| `chevron` | `boolean` | false |  |
| `density` | `'compact' \| 'default' \| 'comfortable'` | 'default' |  |
| `onclick` | `() => void` | — |  |
| `lead` | `Snippet` | — | Remplace l’icône. |
| `end` | `Snippet` | — |  |

```svelte
<DataRow icon={Server} title="Los Santos RP" detail="eu-west · 42 joueurs" value="En ligne" valueTone="success" meta="il y a 2 min" chevron href="/servers/1" />
```

### DescriptionList

Paires clé / valeur d’un détail, en colonnes, avec copie.

**Utiliser** : Propriétés d’un objet, attributs d’un événement, résumé d’une session. copy sur les identifiants ; mono pour les valeurs techniques.

**Éviter** : Pour des données tabulaires répétées : Table.

| Prop | Type | Défaut | Description |
|---|---|---|---|
| `items` | `DescriptionItem[]` | — | { label, value, mono?, href?, copy?, muted? } |
| `columns` | `1 \| 2 \| 3` | 1 |  |
| `layout` | `'stacked' \| 'inline'` | 'stacked' |  |
| `label` | `string` | — |  |
| `divided` | `boolean` | false | Filets entre les lignes. |
| `oncopy` | `(item) => void` | — |  |

```svelte
<DescriptionList columns={2} items={[{ label: 'Identifiant', value: 'srv_01HZX9Q7', mono: true, copy: true }, { label: 'Région', value: 'eu-west' }]} />
```

### FilterChip

Un filtre actif : clé = valeur, inclus ou exclu, retirable.

**Utiliser** : Au-dessus d’un tableau ou d’une liste de logs, un chip par filtre. ontoggle permet de basculer inclure / exclure ; Retour arrière retire.

| Prop | Type | Défaut | Description |
|---|---|---|---|
| `label` | `string` | — |  |
| `value` | `string` | — |  |
| `exclude` | `boolean` | false |  |
| `icon` | `IconComponent` | — |  |
| `removable` | `boolean` | true |  |
| `title` | `string` | — |  |
| `onremove` | `() => void` | — |  |
| `ontoggle` | `(exclude: boolean) => void` | — |  |

```svelte
<FilterChip label="niveau" value="error" onremove={() => remove('level')} ontoggle={(x) => toggle('level', x)} />
```

### FacetList

Valeurs d’une dimension avec leur compte : cliquer ajoute ou retire le filtre.

**Utiliser** : Dans un panneau de filtres de logs ou de ressources. Une valeur indisponible reste visible mais désactivée.

**Éviter** : Plus de quinze valeurs sans moreLabel.

| Prop | Type | Défaut | Description |
|---|---|---|---|
| `items` | `FacetItem[]` | — | { value, label?, count?, active?, unavailable?, title? } |
| `label` | `string` | — |  |
| `density` | `'compact' \| 'default'` | 'default' |  |
| `mono` | `boolean` | false |  |
| `format` | `(count) => string` | String |  |
| `emptyText` | `string` | Aucun |  |
| `moreLabel` | `string` | — |  |
| `onpick` | `(item) => void` | — |  |
| `onmore` | `() => void` | — |  |

```svelte
<FacetList label="Ressource" items={facets} onpick={(f) => toggleFacet('resource', f.value)} moreLabel="Voir plus" onmore={expand} />
```

### PeriodPicker

Période d’un graphique, rafraîchissement et fraîcheur des données.

**Utiliser** : En tête d’une page d’observabilité ; la fraîcheur se met à jour toute seule.

| Prop | Type | Défaut | Description |
|---|---|---|---|
| `value` | `string` | '24h' | bind:value |
| `options` | `Option[]` | 1h…30d |  |
| `updatedAt` | `number \| string \| Date \| null` | null |  |
| `refreshing` | `boolean` | false |  |
| `label` | `string` | — |  |
| `size` | `'sm' \| 'md'` | 'sm' |  |
| `onchange` | `(value) => void` | — |  |
| `onrefresh` | `() => void` | — |  |

```svelte
<PeriodPicker bind:value={period} updatedAt={lastSync} onrefresh={refetch} />
```

### Sparkline

Mini-courbe sans axes pour une tuile ou une cellule.

**Utiliser** : Dans StatTile ou une colonne de DataTable. width="auto" pour remplir.

**Éviter** : Lire une valeur précise : TimeChart.

| Prop | Type | Défaut | Description |
|---|---|---|---|
| `values` | `number[]` | — |  |
| `tone` | `ChartTone` | 'accent' |  |
| `width` | `number \| 'auto'` | 96 |  |
| `height` | `number` | 24 |  |
| `area` | `boolean` | true |  |
| `min` | `number` | auto |  |
| `max` | `number` | auto |  |
| `label` | `string` | — | Nom accessible. |

```svelte
<Sparkline values={cpu} tone="accent" width="auto" height={32} />
```

### TimeChart

Courbe ou aire dans le temps : séries, seuils, bandes, survol, clavier, légende cliquable.

**Utiliser** : series.points pour un axe temporel réel, series.values + labels pour un index régulier. thresholds pour un seuil d’alerte, bands pour un incident ou un déploiement.

**Éviter** : Plus de six séries.

| Prop | Type | Défaut | Description |
|---|---|---|---|
| `series` | `ChartSeries[]` | — | { id, label, values? \| points?, tone?, unit?, format? } |
| `labels` | `string[]` | [] | Étiquettes d’axe en mode index. |
| `from` | `number` | auto |  |
| `to` | `number` | auto |  |
| `min` | `number` | auto |  |
| `max` | `number` | auto |  |
| `unit` | `string` | '' |  |
| `format` | `(v) => string` | arrondi |  |
| `formatTime` | `(t) => string` | locale |  |
| `height` | `number` | 200 |  |
| `area` | `boolean` | true |  |
| `rows` | `number` | 4 | Lignes de grille. |
| `legend` | `boolean` | true |  |
| `label` | `string` | — |  |
| `thresholds` | `ChartThreshold[]` | [] |  |
| `bands` | `ChartBand[]` | [] |  |
| `status` | `DataStatus` | 'ready' |  |
| `message` | `string` | — |  |
| `interactive` | `boolean` | true |  |
| `onhover` | `(t: number \| null) => void` | — |  |

```svelte
<TimeChart label="CPU" unit=" %" series={[{ id: 'cpu', label: 'CPU', points }]} thresholds={[{ value: 80, label: 'Alerte', tone: 'warning' }]} />
```

### BarChart

Barres par intervalle, groupées ou empilées, avec survol et états.

**Utiliser** : Sessions par jour, événements par heure, ressources par catégorie.

**Éviter** : Plus de trente intervalles : TimeChart.

| Prop | Type | Défaut | Description |
|---|---|---|---|
| `series` | `ChartSeries[]` | — |  |
| `labels` | `string[]` | [] |  |
| `stacked` | `boolean` | false |  |
| `max` | `number` | auto |  |
| `unit` | `string` | '' |  |
| `format` | `(v) => string` | arrondi |  |
| `height` | `number` | 200 |  |
| `rows` | `number` | 4 |  |
| `legend` | `boolean` | true |  |
| `label` | `string` | — |  |
| `status` | `DataStatus` | 'ready' |  |
| `message` | `string` | — |  |
| `interactive` | `boolean` | true |  |
| `onselect` | `(index: number \| null) => void` | — |  |

```svelte
<BarChart label="Sessions" labels={days} series={[{ id: 'new', label: 'Nouveaux', values: a }, { id: 'back', label: 'Récurrents', values: b }]} stacked />
```

### DonutChart

Répartition en parts sur un anneau, valeur au centre, légende.

**Utiliser** : Répartition des ressources, des sources de trafic, des types d’événements.

**Éviter** : Plus de six parts : regrouper en « Autres ».

| Prop | Type | Défaut | Description |
|---|---|---|---|
| `segments` | `DonutSegment[]` | — | { id, label, value, tone?, hint? } |
| `label` | `string` | — |  |
| `size` | `number` | 160 |  |
| `thickness` | `number` | 16 |  |
| `legend` | `boolean` | true |  |
| `valueLabel` | `string` | total |  |
| `caption` | `string` | — |  |
| `format` | `(value, share) => string` | % arrondi |  |
| `status` | `DataStatus` | 'ready' |  |
| `message` | `string` | — |  |
| `onselect` | `(id: string \| null) => void` | — |  |

```svelte
<DonutChart label="Sources" segments={[{ id: 'discord', label: 'Discord', value: 412 }, { id: 'direct', label: 'Direct', value: 230 }]} valueLabel="642" caption="joueurs" />
```

### CodeBlock

Bloc de code coloré sans dépendance : 13 langages, copie, numéros, retour à la ligne, lignes surlignées.

**Utiliser** : Configuration, extraits de logs structurés, commandes d’installation. languageOf(nom) déduit le langage d’un nom de fichier.

**Éviter** : Pour un identifiant court : la classe font-mono ou Kbd.

| Prop | Type | Défaut | Description |
|---|---|---|---|
| `code` | `string` | — |  |
| `language` | `Language` | 'text' | json, javascript, typescript, css, html, xml, lua, yaml, shell, markdown, go, rust, sql, text. |
| `title` | `string` | — |  |
| `wrap` | `boolean` | false | bind:wrap |
| `lineNumbers` | `boolean` | false |  |
| `maxHeight` | `number \| string` | — |  |
| `copy` | `boolean` | true |  |
| `wrapToggle` | `boolean` | false |  |
| `highlightLines` | `number[]` | [] |  |
| `oncopy` | `(code) => void` | — |  |

```svelte
<CodeBlock language="yaml" title="heliony-agent.yml" code={config} lineNumbers />
```

### LogView

Flux de logs : sévérités, horodatage, source, surlignage, suivi automatique, sélection.

**Utiliser** : follow suit la fin ; l’utilisateur qui remonte le coupe, un bouton le reprend. parts colore des segments d’une ligne ; highlight surligne une recherche. onreachtop charge l’historique.

**Éviter** : Plus de quelques milliers de lignes sans pagination amont.

| Prop | Type | Défaut | Description |
|---|---|---|---|
| `lines` | `LogLine[]` | — | { id, at?, text, parts?, severity?, source? } |
| `follow` | `boolean` | true | bind:follow |
| `height` | `number \| string` | 420 |  |
| `wrap` | `boolean` | true |  |
| `timestamps` | `boolean` | true |  |
| `sources` | `boolean` | false |  |
| `severities` | `boolean` | true |  |
| `format` | `(at) => string` | HH:mm:ss.SSS |  |
| `emptyText` | `string` | — |  |
| `label` | `string` | — |  |
| `selected` | `string \| number \| null` | null | bind:selected |
| `highlight` | `string` | '' |  |
| `onfollow` | `(follow) => void` | — |  |
| `onreachtop` | `() => void` | — |  |
| `onselect` | `(line) => void` | — |  |

```svelte
<LogView lines={logs} bind:follow highlight={search} sources onselect={(l) => (detail = l)} />
```

### Console

Console d’un serveur : flux de lignes, saisie de commande avec historique, lecture seule ou écriture.

**Utiliser** : readonly tant que l’abonnement ou le rôle n’autorise pas l’écriture ; l’app branche onsubmit sur l’agent. history est bindable pour persister les commandes.

**Éviter** : Un terminal système : la console n’exécute que des commandes typées du jeu.

| Prop | Type | Défaut | Description |
|---|---|---|---|
| `lines` | `LogLine[]` | — |  |
| `readonly` | `boolean` | false |  |
| `disabled` | `boolean` | false |  |
| `busy` | `boolean` | false | Commande en cours. |
| `height` | `number \| string` | 480 |  |
| `title` | `string` | — |  |
| `status` | `{ label, tone? }` | — | Badge d’état. |
| `history` | `string[]` | [] | bind:history |
| `placeholder` | `string` | — |  |
| `follow` | `boolean` | true | bind:follow |
| `onsubmit` | `(command) => void \| Promise<void>` | — |  |
| `onreachtop` | `() => void` | — |  |
| `toolbar` | `Snippet` | — |  |

```svelte
<Console title="Los Santos RP" status={{ label: 'En ligne', tone: 'success' }} lines={consoleLines} readonly={!can('console.write')} onsubmit={send} />
```

### JsonTree

Arborescence d’une valeur JSON : dépliage, clavier, copie et filtre par chemin.

**Utiliser** : Attributs d’un événement, payload d’un log, configuration. oncopy et onfilter ajoutent les actions C et F sur chaque ligne.

**Éviter** : Pour du code source : CodeBlock.

| Prop | Type | Défaut | Description |
|---|---|---|---|
| `value` | `unknown` | — |  |
| `depth` | `number` | 2 | Niveaux ouverts au départ. |
| `density` | `'compact' \| 'default'` | 'default' |  |
| `label` | `string` | — |  |
| `toolbar` | `boolean` | true | Tout déplier / replier. |
| `expanded` | `string[]` | — | bind:expanded, chemins ouverts. |
| `maxString` | `number` | 80 | Chaînes repliées au-delà. |
| `oncopy` | `(path, value) => void` | — |  |
| `onfilter` | `(path, value) => void` | — |  |

```svelte
<JsonTree value={event.payload} depth={1} oncopy={(path, v) => copy(v)} onfilter={(path, v) => addFilter(path, v)} />
```

### TraceWaterfall

Cascade des spans d’une trace : hiérarchie, durées, services colorés, erreurs, clavier.

**Utiliser** : Détail d’une requête ou d’un tick serveur. Les services reçoivent chacun une teinte de la palette.

**Éviter** : Plus de 500 spans : paginer ou filtrer en amont.

| Prop | Type | Défaut | Description |
|---|---|---|---|
| `spans` | `TraceSpan[]` | — | { id, parentId, name, service?, startMs, durationMs, status, attributes? } |
| `totalMs` | `number` | auto |  |
| `selected` | `string \| null` | null | bind:selected |
| `collapsed` | `string[]` | [] | bind:collapsed |
| `maxRows` | `number` | 500 |  |
| `label` | `string` | — |  |
| `format` | `(ms) => string` | auto |  |
| `onselect` | `(span) => void` | — |  |

```svelte
<TraceWaterfall spans={trace.spans} bind:selected onselect={(s) => (inspect = s)} />
```

### StatusTimeline

Disponibilité par tranche : segments ok, dégradé, arrêt, inconnu, taux et légende.

**Utiliser** : Page de statut, tuile de disponibilité d’un serveur.

**Éviter** : Pour une mesure continue : TimeChart.

| Prop | Type | Défaut | Description |
|---|---|---|---|
| `buckets` | `TimelineBucket[]` | — | { t, state, ratio?, label? } |
| `uptime` | `number \| null` | null | 0..1 |
| `label` | `string` | — |  |
| `start` | `string` | — |  |
| `end` | `string` | — |  |
| `height` | `number` | 20 |  |
| `status` | `DataStatus` | 'ready' |  |
| `message` | `string` | — |  |
| `format` | `(bucket) => string` | — | Infobulle de segment. |
| `legend` | `boolean` | true |  |
| `labels` | `Partial<Record<TimelineState, string>>` | {} | Noms des états. |

```svelte
<StatusTimeline label="Disponibilité 30 jours" buckets={days} uptime={0.9962} start="1 oct." end="30 oct." />
```

### Timeline

Événements datés sur un rail vertical, groupés par jour, avec icône, acteur et détail.

**Utiliser** : Historique d’un serveur, d’un incident, d’un membre. item remplace le rendu par défaut.

**Éviter** : Pour des mesures : TimeChart ; pour des logs bruts : LogView.

| Prop | Type | Défaut | Description |
|---|---|---|---|
| `events` | `TimelineEvent[]` | — | { id, at, title, description?, tone?, icon?, actor?, meta?, href? } |
| `groupByDay` | `boolean` | true |  |
| `density` | `'compact' \| 'default'` | 'default' |  |
| `onselect` | `(event) => void` | — |  |
| `item` | `Snippet` | — |  |

```svelte
<Timeline events={history} onselect={(e) => open(e)} />
```

### Code

Identifiant en ligne, en Geist Mono, avec copie et troncature.

**Utiliser** : Identifiants, clés, chemins dans un texte ou une cellule. truncate garde le début et la fin.

**Éviter** : Plusieurs lignes : CodeBlock.

| Prop | Type | Défaut | Description |
|---|---|---|---|
| `text` | `string` | — |  |
| `copy` | `boolean` | false |  |
| `truncate` | `number` | — | Longueur max affichée. |
| `label` | `string` | — | Nom accessible. |

```svelte
<Code text="srv_01HZX9Q7KM3FQ2" copy truncate={16} />
```

### TimeHistogram

Histogramme temporel empilé avec sélection de plage à la souris et au clavier.

**Utiliser** : Au-dessus d’un explorateur de logs : les barres comptent les événements par tranche, le brossage filtre la période. Maj + flèches étend la plage au clavier.

**Éviter** : Pour des valeurs continues : TimeChart.

| Prop | Type | Défaut | Description |
|---|---|---|---|
| `series` | `HistogramSeries[]` | — | { id, label, tone?, points: { t, v }[] } |
| `step` | `number` | — | Largeur d’une tranche en ms. |
| `from` | `number` | auto |  |
| `to` | `number` | auto |  |
| `height` | `number` | 140 |  |
| `format` | `(v) => string` | arrondi |  |
| `formatTime` | `(t) => string` | locale |  |
| `unit` | `string` | '' |  |
| `label` | `string` | — |  |
| `status` | `DataStatus` | 'ready' |  |
| `message` | `string` | — |  |
| `legend` | `boolean` | true |  |
| `brush` | `TimeRange \| null` | null | bind:brush |
| `onpick` | `(t) => void` | — | Clic sur une tranche. |
| `onbrush` | `(range \| null) => void` | — |  |

```svelte
<TimeHistogram label="Événements" step={900_000} series={[{ id: 'errors', label: 'Erreurs', tone: 'danger', points }, { id: 'warn', label: 'Avertissements', tone: 'warning', points: warnPoints }]} bind:brush onbrush={applyRange} />
```

## Structure

### Surface

Un niveau de surface : page, carte, panneau, zone enfoncée.

**Utiliser** : raised pour une carte posée sur la page, sunken pour une zone de code ou un tableau dense. Un seul niveau au-dessus de la base par zone : pas de carte dans une carte.

**Éviter** : Empiler raised dans raised. Préférer un Divider ou de l’espace.

| Prop | Type | Défaut | Description |
|---|---|---|---|
| `level` | `'sunken' \| 'base' \| 'raised' \| 'overlay'` | 'raised' |  |
| `padding` | `'none' \| 'sm' \| 'md' \| 'lg'` | 'md' |  |
| `radius` | `'none' \| 'md' \| 'lg' \| 'xl'` | 'lg' |  |
| `bordered` | `boolean` | true | Filet line-subtle. |
| `elevated` | `boolean` | false | Ombre shadow-raised. |
| `interactive` | `boolean` | false | Filet qui s’allume au survol. |
| `as` | `string` | 'div' | Balise rendue. |

```svelte
<Surface level="raised" padding="lg">
  <h2 class="text-heading">Serveurs</h2>
</Surface>
```

### Divider

Filet de séparation, avec libellé en option.

**Utiliser** : Entre deux sections d’une même surface.

**Éviter** : Pour séparer deux cartes : l’espace suffit.

| Prop | Type | Défaut | Description |
|---|---|---|---|
| `orientation` | `'horizontal' \| 'vertical'` | 'horizontal' |  |
| `label` | `string` | — | Texte centré sur le filet. |
| `spacing` | `'none' \| 'sm' \| 'md' \| 'lg'` | 'none' | Marge autour. |

```svelte
<Divider label="Avancé" spacing="md" />
```

### Collapsible

Section repliable avec chevron, titre et description.

**Utiliser** : Détails avancés d’un formulaire, groupe secondaire d’un panneau.

**Éviter** : Plusieurs sections liées : Accordion.

| Prop | Type | Défaut | Description |
|---|---|---|---|
| `open` | `boolean` | false | bind:open |
| `title` | `string` | — |  |
| `description` | `string` | — |  |
| `disabled` | `boolean` | false |  |
| `trigger` | `Snippet` | — | Remplace titre et description. |
| `onOpenChange` | `(open: boolean) => void` | — |  |

```svelte
<Collapsible title="Options avancées" description="Ports, chemins, variables">…</Collapsible>
```

### Accordion

Liste de sections repliables, une ou plusieurs ouvertes.

**Utiliser** : items en données ; children reçoit l’item et rend son contenu.

| Prop | Type | Défaut | Description |
|---|---|---|---|
| `items` | `AccordionItem[]` | — | { value, title, description?, icon?, disabled? } |
| `value` | `string \| string[]` | — | bind:value |
| `multiple` | `boolean` | false |  |
| `variant` | `'plain' \| 'bordered'` | 'plain' |  |

```svelte
<Accordion items={faq} variant="bordered">
  {#snippet children({ item })}<p>{item.answer}</p>{/snippet}
</Accordion>
```

### ScrollArea

Zone défilante à barres fines et discrètes.

**Utiliser** : Listes longues dans un panneau à hauteur fixe.

**Éviter** : Pour le défilement de la page : le navigateur suffit.

| Prop | Type | Défaut | Description |
|---|---|---|---|
| `orientation` | `'vertical' \| 'horizontal' \| 'both'` | 'vertical' |  |
| `viewportRef` | `HTMLElement \| null` | — | bind:viewportRef |

```svelte
<ScrollArea class="h-64"><ul>…</ul></ScrollArea>
```

### AppShell

Gabarit d’application : navigation latérale, en-tête, contenu ; raccourci ⌘B.

**Utiliser** : sidebar et header en snippets ; children est le contenu de la page. Fournit le contexte lu par Sidebar et SidebarTrigger.

| Prop | Type | Défaut | Description |
|---|---|---|---|
| `sidebarOpen` | `boolean` | true | bind:sidebarOpen |
| `sidebar` | `Snippet` | — |  |
| `header` | `Snippet` | — |  |
| `onSidebarOpenChange` | `(open: boolean) => void` | — |  |
| `mainClass` | `string` | — |  |

```svelte
<AppShell bind:sidebarOpen>
  {#snippet sidebar()}<Sidebar sections={nav} current={page.url.pathname} />{/snippet}
  {#snippet header()}<header class="flex h-14 items-center gap-3 border-b border-line-subtle px-4"><SidebarTrigger /><Breadcrumb items={crumbs} /></header>{/snippet}
  {@render children()}
</AppShell>
```

## Hors composants

| Export | Rôle |
|---|---|
| `toast.push({...})`, `toast.success()`, `toast.error()`, `toast.dismiss(id)` | File de notifications (afficher `<Toaster />`). |
| `useStrings()`, `useLocale()`, `useHeliony()` | Chaînes et locale du provider dans un composant métier. |
| `formatNumber`, `formatPercent`, `formatCompact`, `formatBytes`, `formatDate`, `formatTime`, `formatDateTime`, `formatDuration`, `formatRelative` | Formats localisés. |
| `toIsoDate`, `fromIsoDate`, `fromDate`, `todayDate` | Conversions DateValue. |
| `Below`, `ReducedMotion` | Media queries réactives (`new Below('md').current`). |
| `cn()` | Fusion de classes Tailwind. |
| `colorTokens`, `tokens`, `textStyles`, `cssVar()` | Tokens typés. |
