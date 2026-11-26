export type Strings = {
  common: { close: string; cancel: string; confirm: string; retry: string; loading: string; search: string; clear: string; more: string; less: string; copy: string; copied: string; today: string; back: string; next: string; previous: string; open: string; select: string; none: string; all: string };
  state: { emptyTitle: string; emptyText: string; errorTitle: string; errorText: string; forbiddenTitle: string; forbiddenText: string; loadingLabel: string };
  table: { noResults: string; selectAll: string; selectRow: string; sortAsc: string; sortDesc: string; columns: string; density: string; densityCompact: string; densityDefault: string; densityComfortable: string; rowsPerPage: string; pageOf: (page: number, total: number) => string; selected: (count: number) => string; filter: string; openRow: string };
  pagination: { label: string; first: string; last: string; page: (n: number) => string };
  dialog: { close: string };
  toast: { dismiss: string; region: string; repeated: (count: number) => string };
  field: { optional: string; required: string; error: string };
  nav: { toggle: string; expand: string; collapse: string; main: string; breadcrumb: string };
  theme: { label: string; dark: string; light: string; system: string };
  date: { pick: string; prevMonth: string; nextMonth: string; prevYear: string; nextYear: string; clear: string };
  period: { last: (n: number, unit: string) => string; custom: string; from: string; to: string };
  severity: Record<'trace' | 'debug' | 'info' | 'warn' | 'error' | 'fatal', string>;
  console: { input: string; send: string; readOnly: string; scrollToEnd: string };
  code: { copy: string; copied: string; wrap: string; lines: (n: number) => string };
  chart: { noData: string; legend: string };
};

export const en: Strings = {
  common: { close: 'Close', cancel: 'Cancel', confirm: 'Confirm', retry: 'Retry', loading: 'Loading', search: 'Search', clear: 'Clear', more: 'More', less: 'Less', copy: 'Copy', copied: 'Copied', today: 'Today', back: 'Back', next: 'Next', previous: 'Previous', open: 'Open', select: 'Select', none: 'None', all: 'All' },
  state: { emptyTitle: 'Nothing here yet', emptyText: 'There is no data to show for this view.', errorTitle: 'Something went wrong', errorText: 'The data could not be loaded.', forbiddenTitle: 'Access restricted', forbiddenText: 'Your role does not allow viewing this.', loadingLabel: 'Loading…' },
  table: { noResults: 'No results', selectAll: 'Select all rows', selectRow: 'Select row', sortAsc: 'Sort ascending', sortDesc: 'Sort descending', columns: 'Columns', density: 'Density', densityCompact: 'Compact', densityDefault: 'Default', densityComfortable: 'Comfortable', rowsPerPage: 'Rows per page', pageOf: (p, t) => `Page ${p} of ${t}`, selected: (n) => `${n} selected`, filter: 'Filter', openRow: 'Open' },
  pagination: { label: 'Pagination', first: 'First page', last: 'Last page', page: (n) => `Page ${n}` },
  dialog: { close: 'Close dialog' },
  toast: { dismiss: 'Dismiss notification', region: 'Notifications', repeated: (n) => `${n} times` },
  field: { optional: 'Optional', required: 'Required', error: 'Error' },
  nav: { toggle: 'Toggle navigation', expand: 'Expand navigation', collapse: 'Collapse navigation', main: 'Main navigation', breadcrumb: 'Breadcrumb' },
  theme: { label: 'Theme', dark: 'Dark', light: 'Light', system: 'System' },
  date: { pick: 'Pick a date', prevMonth: 'Previous month', nextMonth: 'Next month', prevYear: 'Previous year', nextYear: 'Next year', clear: 'Clear date' },
  period: { last: (n, unit) => `Last ${n} ${unit}`, custom: 'Custom range', from: 'From', to: 'To' },
  severity: { trace: 'Trace', debug: 'Debug', info: 'Info', warn: 'Warning', error: 'Error', fatal: 'Fatal' },
  console: { input: 'Command', send: 'Send', readOnly: 'Read only', scrollToEnd: 'Scroll to end' },
  code: { copy: 'Copy code', copied: 'Copied', wrap: 'Wrap lines', lines: (n) => `${n} lines` },
  chart: { noData: 'No data for this period', legend: 'Legend' },
};

export const fr: Strings = {
  common: { close: 'Fermer', cancel: 'Annuler', confirm: 'Confirmer', retry: 'Réessayer', loading: 'Chargement', search: 'Rechercher', clear: 'Effacer', more: 'Plus', less: 'Moins', copy: 'Copier', copied: 'Copié', today: "Aujourd'hui", back: 'Retour', next: 'Suivant', previous: 'Précédent', open: 'Ouvrir', select: 'Choisir', none: 'Aucun', all: 'Tous' },
  state: { emptyTitle: 'Rien pour le moment', emptyText: "Aucune donnée à afficher dans cette vue.", errorTitle: 'Un problème est survenu', errorText: "Les données n'ont pas pu être chargées.", forbiddenTitle: 'Accès restreint', forbiddenText: 'Votre rôle ne permet pas de consulter ceci.', loadingLabel: 'Chargement…' },
  table: { noResults: 'Aucun résultat', selectAll: 'Sélectionner toutes les lignes', selectRow: 'Sélectionner la ligne', sortAsc: 'Trier par ordre croissant', sortDesc: 'Trier par ordre décroissant', columns: 'Colonnes', density: 'Densité', densityCompact: 'Compacte', densityDefault: 'Normale', densityComfortable: 'Confortable', rowsPerPage: 'Lignes par page', pageOf: (p, t) => `Page ${p} sur ${t}`, selected: (n) => `${n} sélectionnée${n > 1 ? 's' : ''}`, filter: 'Filtrer', openRow: 'Ouvrir' },
  pagination: { label: 'Pagination', first: 'Première page', last: 'Dernière page', page: (n) => `Page ${n}` },
  dialog: { close: 'Fermer la fenêtre' },
  toast: { dismiss: 'Fermer la notification', region: 'Notifications', repeated: (n) => `${n} fois` },
  field: { optional: 'Facultatif', required: 'Obligatoire', error: 'Erreur' },
  nav: { toggle: 'Afficher ou masquer la navigation', expand: 'Déployer la navigation', collapse: 'Réduire la navigation', main: 'Navigation principale', breadcrumb: "Fil d'Ariane" },
  theme: { label: 'Thème', dark: 'Sombre', light: 'Clair', system: 'Système' },
  date: { pick: 'Choisir une date', prevMonth: 'Mois précédent', nextMonth: 'Mois suivant', prevYear: 'Année précédente', nextYear: 'Année suivante', clear: 'Effacer la date' },
  period: { last: (n, unit) => `${n} derniers ${unit}`, custom: 'Période personnalisée', from: 'Du', to: 'Au' },
  severity: { trace: 'Trace', debug: 'Debug', info: 'Info', warn: 'Avertissement', error: 'Erreur', fatal: 'Fatal' },
  console: { input: 'Commande', send: 'Envoyer', readOnly: 'Lecture seule', scrollToEnd: 'Aller à la fin' },
  code: { copy: 'Copier le code', copied: 'Copié', wrap: 'Retour à la ligne', lines: (n) => `${n} lignes` },
  chart: { noData: 'Aucune donnée sur cette période', legend: 'Légende' },
};

export const dictionaries = { en, fr } as const;
export type Locale = keyof typeof dictionaries | (string & {});
