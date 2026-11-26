# Changelog — @heliony/ui

Format : [semver](https://semver.org/lang/fr/). **Majeure** = changement incompatible (prop renommée ou retirée, token supprimé ou renommé, comportement changé). **Mineure** = composant, variante ou token ajouté. **Correctif** = rendu ou bug corrigé sans changer d'API.

## 0.1.0

Première version du design system Heliony, reprise de Siku UI pour le web.

- Tokens v5 : primitives OKLCH, sémantique Dark et Light (`surface-*`, `fg-*`, `line-*`, `action-*`, `accent`, statuts, sévérités, `intelligence`, `chart-*`, `syntax-*`), typographie à hiérarchie marquée, rayons, ombres par niveau, durées, courbes, z-index. Génération de `tokens.css`, `theme.css` (Tailwind v4), `tokens.ts`, `ai/tokens.md`. Contrastes AA testés dans les deux thèmes.
- Composants (74) : HelionyProvider, Surface, Button, ButtonGroup, Badge, Icon, Kbd, Spinner, Skeleton, Divider, Avatar, EmptyState, DataState, Field, Input, Textarea, Checkbox, Switch, RadioGroup, Tabs, Tooltip, Popover, Dialog, AlertDialog, Sheet, Menu, Select, Toast, Toaster, Breadcrumb, ThemeToggle, Progress, Collapsible, Accordion, Segmented, Slider, ScrollArea, AppShell, Sidebar, SidebarTrigger, Pagination, Combobox, Calendar, DateField, Table, DataTable (TanStack Table), Stat, StatTile, DataRow, DescriptionList, FilterChip, FacetList, PeriodPicker, Sparkline, TimeChart, BarChart, DonutChart, TimeHistogram, SeverityDot, Notice, CodeBlock, LogView, Console, JsonTree, TraceWaterfall, StatusTimeline, Timeline, Chip, Code, Steps, Stepper, Tree, Lightbox, EntitySwitcher.
- Graphiques en SVG maison (TimeChart, BarChart, DonutChart, Sparkline, TimeHistogram) avec thème commun, survol, clavier et états ; LayerChart n'est pas adopté dans cette version.
- Coloration syntaxique sans dépendance : json, javascript, typescript, css, html, xml, lua, yaml, shell, markdown, go, rust, sql.
- Chaînes internes en anglais et en français, formats localisés (`formatNumber`, `formatDate`, `formatDuration`, `formatRelative`…), conversions de dates.
- Catalogue → doc interactive (Dark et Light côte à côte, trois largeurs) et `ai/components.md`.
- CLI `heliony` : `check` (couleurs en dur, classes shadcn, primitives, flou, texte trop petit, Surface imbriquée, doublons), `ai sync` / `ai check`, `init`.
- CI (`verify`) et workflow de release par tag avec `dist`.
