<script lang="ts">
  import * as H from '../../src/lib/index.js';
  import Play from '@lucide/svelte/icons/play';
  import Trash2 from '@lucide/svelte/icons/trash-2';
  import X from '@lucide/svelte/icons/x';
  import Search from '@lucide/svelte/icons/search';
  import Server from '@lucide/svelte/icons/server';
  import Ellipsis from '@lucide/svelte/icons/ellipsis';
  import RotateCw from '@lucide/svelte/icons/rotate-cw';
  import Square from '@lucide/svelte/icons/square';
  import Sparkles from '@lucide/svelte/icons/sparkles';
  import Columns3 from '@lucide/svelte/icons/columns-3';
  import LayoutDashboard from '@lucide/svelte/icons/layout-dashboard';
  import ScrollText from '@lucide/svelte/icons/scroll-text';
  import Users from '@lucide/svelte/icons/users';
  import TriangleAlert from '@lucide/svelte/icons/triangle-alert';

  type Props = { name: string; p: Record<string, any> };
  let { name, p }: Props = $props();

  let text = $state('Los Santos RP');
  let note = $state('');
  let chk = $state(true), ind = $state(false), sw = $state(true);
  let radio = $state('observer');
  let sel = $state('eu-west');
  let combo = $state('');
  let seg = $state('7d');
  let tab = $state('all');
  let slider = $state(72);
  let open = $state(false);
  let alert = $state(false);
  let sheet = $state(false);
  let coll = $state(true);
  let pageN = $state(3);
  let date = $state<H.DateValue | undefined>(H.fromIsoDate('2027-01-15'));
  let fieldDate = $state<H.DateValue | undefined>();
  let sidebarOpen = $state(true);

  const servers: H.Option[] = [
    { value: 'eu-west', label: 'Los Santos RP', detail: 'eu-west', group: 'Production' },
    { value: 'eu-central', label: 'Blaine County', detail: 'eu-central', group: 'Production' },
    { value: 'dev', label: 'Sandbox', detail: 'local', group: 'Développement' },
  ];
  const players: H.Option[] = Array.from({ length: 12 }, (_, i) => ({ value: `p${i}`, label: ['Nyx', 'Helios', 'Orion', 'Vega', 'Atlas', 'Lyra', 'Rhea', 'Sol', 'Mira', 'Deneb', 'Cael', 'Iris'][i]!, detail: `#${1000 + i}` }));
  const menu: H.MenuEntry[] = [
    { id: 'restart', label: 'Redémarrer', icon: RotateCw, shortcut: 'R' },
    { id: 'console', label: 'Ouvrir la console', icon: ScrollText, detail: 'Lecture' },
    { id: 'stop', label: 'Arrêter', icon: Square, danger: true, separatorBefore: true },
  ];
  const nav: H.NavSection[] = [
    { id: 'main', entries: [{ id: 'overview', label: 'Vue d’ensemble', icon: LayoutDashboard }] },
    { id: 'ops', label: 'Opérations', entries: [{ id: 'servers', label: 'Serveurs', icon: Server, badge: 3 }, { id: 'logs', label: 'Logs', icon: ScrollText, children: [{ id: 'logs-live', label: 'En direct' }, { id: 'logs-search', label: 'Recherche' }] }] },
    { id: 'community', label: 'Communauté', entries: [{ id: 'players', label: 'Joueurs', icon: Users, badge: 'Bêta', tone: 'accent' }] },
  ];
  let navCurrent = $state('servers');
  const crumbs: H.Crumb[] = [{ label: 'Organisation', href: '#' }, { label: 'Serveurs', href: '#' }, { label: 'Europe', href: '#' }, { label: 'Los Santos RP', href: '#' }, { label: 'Ressources' }];
  const cpu = [22, 24, 21, 28, 35, 31, 29, 44, 52, 48, 41, 38, 36, 33, 30, 34, 37, 35, 32, 31];
  const t0 = Date.UTC(2027, 0, 15, 8, 0, 0);
  const cpuPoints: H.ChartPoint[] = cpu.map((v, i) => ({ t: t0 + i * 15 * 60_000, v: i === 13 ? null : v + 20 }));
  const memPoints: H.ChartPoint[] = cpu.map((v, i) => ({ t: t0 + i * 15 * 60_000, v: Math.round(v * 0.6 + 30) }));
  type Resource = Record<string, unknown> & { name: string; cpu: number; errors: number; state: string };
  const resources: Resource[] = [{ name: 'siku_inventory', cpu: 2.4, errors: 0, state: 'ok' }, { name: 'siku_banking', cpu: 1.1, errors: 2, state: 'warn' }, { name: 'siku_chat', cpu: 0.4, errors: 0, state: 'ok' }, { name: 'siku_hud', cpu: 3.9, errors: 14, state: 'error' }];
  const resCols: H.TableColumn<Resource>[] = [{ key: 'name', label: 'Ressource', mono: true }, { key: 'cpu', label: 'CPU', align: 'end', format: (v) => `${v} ms` }, { key: 'errors', label: 'Erreurs', align: 'end' }, { key: 'state', label: 'État' }];
  type PlayerRow = Record<string, unknown> & { id: string; name: string; sessions: number; playtime: number; lastSeen: string };
  const playersRows: PlayerRow[] = players.map((pl, i) => ({ id: pl.value, name: pl.label, sessions: 3 + ((i * 7) % 40), playtime: 40 + ((i * 97) % 900), lastSeen: `il y a ${1 + i} h` }));
  const dtColumns: H.ColumnDef<PlayerRow>[] = [
    { accessorKey: 'name', header: 'Joueur' },
    { accessorKey: 'sessions', header: 'Sessions', meta: { align: 'end' } },
    { accessorKey: 'playtime', header: 'Temps de jeu', meta: { align: 'end' }, cell: ({ getValue }) => H.formatDuration((getValue() as number) * 60_000) },
    { accessorKey: 'lastSeen', header: 'Vu', enableSorting: false },
  ];
  const codeSamples: Record<string, string> = {
    lua: `RegisterCommand('trunk', function(src)\n  local vehicle = Siku.vehicles.nearest(src, 2.5)\n  if not vehicle then return Siku.notify(src, 'Aucun véhicule à portée') end\n  Siku.inventory.open(src, ('trunk:%s'):format(vehicle.plate), { slots = 20 })\nend, false)`,
    json: `{\n  "type": "player.connected",\n  "schema_version": 1,\n  "server_id": "srv_456",\n  "payload": { "player_id": "player_789", "ping": 42 }\n}`,
    go: `func (a *Agent) Run(ctx context.Context) error {\n\tticker := time.NewTicker(a.interval)\n\tdefer ticker.Stop()\n\tfor {\n\t\tselect {\n\t\tcase <-ctx.Done():\n\t\t\treturn nil\n\t\tcase <-ticker.C:\n\t\t\ta.collect()\n\t\t}\n\t}\n}`,
    rust: `pub async fn ingest(batch: Vec<Event>) -> Result<usize, IngestError> {\n    let accepted = batch.iter().filter(|e| e.schema_version == 1).count();\n    Ok(accepted)\n}`,
    shell: `bun add "git+https://github.com/Helionyy/heliony-ui.git#v0.1.0"\nbunx heliony init .\nbunx heliony ai sync .`,
    yaml: `agent:\n  mode: observer\n  interval: 15s\n  sources:\n    - type: fxserver\n      path: /opt/heliony/fxserver\n`,
  };
  const sev: H.Severity[] = ['info', 'debug', 'warn', 'error', 'info', 'info', 'fatal', 'trace'];
  const logs: H.LogLine[] = Array.from({ length: 24 }, (_, i) => ({ id: i, at: t0 + i * 3_200, severity: sev[i % sev.length], source: ['fxserver', 'siku_inventory', 'agent'][i % 3], text: ['Resource siku_inventory started', 'tick 12 ms · 42 players', 'Slow query on players (412 ms)', 'Script error in client/main.lua:88 attempt to index nil', 'Player Nyx connected (ping 42)', 'Backup completed in 3.2 s', 'Out of memory in resource siku_hud', 'gc step 4 ms'][i % 8]! }));
  let consoleLines = $state<H.LogLine[]>(logs.slice(0, 10).map((l) => ({ ...l, severity: 'info' })));
  const payload = { event_id: 'evt_123', type: 'player.connected', schema_version: 1, occurred_at: '2027-01-15T18:30:00Z', payload: { player_id: 'player_789', ping: 42, identifiers: ['license:abc', 'discord:123'], session: { id: 'ses_1', reconnect: false } }, tags: null };
  const spans: H.TraceSpan[] = [
    { id: 'a', parentId: null, name: 'server.tick', service: 'fxserver', startMs: 0, durationMs: 48, status: 'ok' },
    { id: 'b', parentId: 'a', name: 'inventory.sync', service: 'siku_inventory', startMs: 2, durationMs: 18, status: 'ok' },
    { id: 'c', parentId: 'b', name: 'db.query players', service: 'mysql', startMs: 4, durationMs: 12, status: 'ok' },
    { id: 'd', parentId: 'a', name: 'hud.update', service: 'siku_hud', startMs: 22, durationMs: 20, status: 'error' },
    { id: 'e', parentId: 'a', name: 'telemetry.flush', service: 'agent', startMs: 43, durationMs: 4, status: 'ok' },
  ];
  const uptimeBuckets: H.TimelineBucket[] = Array.from({ length: 30 }, (_, i) => ({ t: i, state: i === 11 ? 'down' : i === 12 || i === 20 ? 'degraded' : i === 27 ? 'unknown' : 'up', ratio: 0.6, label: `${i + 1} oct.` }));
  const history: H.TimelineEvent[] = [
    { id: '1', at: t0 + 6 * 3_600_000, title: 'Redémarrage planifié', description: 'Maintenance hebdomadaire, 42 joueurs prévenus.', tone: 'info', icon: RotateCw, actor: 'Nyx' },
    { id: '2', at: t0 + 2 * 3_600_000, title: 'Pic d’erreurs siku_hud', description: '14 erreurs en 3 minutes après le déploiement 0.8.1.', tone: 'danger', icon: TriangleAlert, meta: 'resource.error ×14' },
    { id: '3', at: t0 - 20 * 3_600_000, title: 'Agent mis à jour', description: '0.5.3 → 0.6.0', tone: 'success', actor: 'auto' },
    { id: '4', at: t0 - 26 * 3_600_000, title: 'Nouveau membre', description: 'Helios a rejoint l’organisation.', icon: Users },
  ];
  const faq: (H.AccordionItem & { answer: string })[] = [
    { value: 'a', title: 'Que collecte l’agent ?', description: 'Mode Observer', answer: 'Métriques machine, logs autorisés, sessions joueurs. Aucune action distante.' },
    { value: 'b', title: 'Puis-je révoquer un agent ?', answer: 'Oui, depuis le Security Center, à tout moment.' },
  ];
</script>

{#if name === 'HelionyProvider'}
  <p class="text-body text-fg-secondary">Ce document entier est rendu sous un HelionyProvider : thème, langue et tooltips viennent de lui.</p>
{:else if name === 'Surface'}
  <H.Surface level={p.level} padding={p.padding} bordered={p.bordered} elevated={p.elevated}><p class="text-body-strong">Los Santos RP</p><p class="text-caption text-fg-tertiary">42 joueurs · 128 ressources</p></H.Surface>
{:else if name === 'Button'}
  <div class="flex flex-wrap items-center gap-3">
    <H.Button variant={p.variant} size={p.size} loading={p.loading} disabled={p.disabled} block={p.block} icon={Play}>Démarrer le serveur</H.Button>
    <H.Button variant={p.variant} size={p.size} loading={p.loading} disabled={p.disabled} shortcut="⌘S">Enregistrer</H.Button>
    <H.Button variant={p.variant} size={p.size} loading={p.loading} disabled={p.disabled} iconOnly icon={X} label="Fermer" />
  </div>
{:else if name === 'ButtonGroup'}
  <H.ButtonGroup><H.Button variant="quiet">Annuler</H.Button><H.Button variant="primary">Enregistrer</H.Button></H.ButtonGroup>
  <div class="mt-4"><H.ButtonGroup attached align="start"><H.Button>Jour</H.Button><H.Button>Semaine</H.Button><H.Button>Mois</H.Button></H.ButtonGroup></div>
{:else if name === 'Badge'}
  <div class="flex flex-wrap items-center gap-2">
    <H.Badge tone={p.tone} variant={p.variant} size={p.size} dot={p.dot}>En ligne</H.Badge>
    <H.Badge tone={p.tone} variant={p.variant} size={p.size} icon={Sparkles}>Connected Intelligence</H.Badge>
    <H.Badge tone={p.tone} variant={p.variant} size={p.size}>128</H.Badge>
  </div>
{:else if name === 'Icon'}
  <div class="flex items-center gap-4 text-fg-secondary"><H.Icon icon={Server} size={p.size} /><H.Icon icon={TriangleAlert} size={p.size} label="Avertissement" class="text-warning" /><H.Icon icon={Sparkles} size={p.size} class="text-intelligence" /></div>
{:else if name === 'Kbd'}
  <div class="flex items-center gap-2 text-body text-fg-secondary"><H.Kbd>⌘</H.Kbd><H.Kbd>K</H.Kbd> ouvre la recherche</div>
{:else if name === 'Spinner'}
  <div class="flex items-center gap-4"><H.Spinner size={p.size} /><H.Button loading>Enregistrer</H.Button></div>
{:else if name === 'Skeleton'}
  <div class="flex items-start gap-4"><H.Skeleton shape="circle" width="2.5rem" height="2.5rem" /><div class="flex-1"><H.Skeleton shape={p.shape} lines={p.lines} /></div></div>
{:else if name === 'Divider'}
  <p class="text-body text-fg-secondary">Général</p><H.Divider label={p.label || undefined} spacing={p.spacing} /><p class="text-body text-fg-secondary">Avancé</p>
{:else if name === 'Avatar'}
  <div class="flex items-center gap-3"><H.Avatar name="Nyx Orbital" size={p.size} shape={p.shape} status={p.status} /><H.Avatar name="Los Santos RP" size={p.size} shape="square" /><H.Avatar src="https://i.pravatar.cc/80?img=12" name="Helios" size={p.size} shape={p.shape} status={p.status} /></div>
{:else if name === 'EmptyState'}
  <H.EmptyState kind={p.kind} size={p.size} bordered={p.bordered} icon={p.kind === 'empty' ? Server : undefined} title={p.kind === 'empty' ? 'Aucun serveur' : undefined} description={p.kind === 'empty' ? 'Installez l’agent sur une machine pour commencer.' : undefined}>
    {#if p.kind === 'empty'}<H.Button variant="primary">Ajouter une machine</H.Button>{/if}
  </H.EmptyState>
{:else if name === 'DataState'}
  <H.Surface padding="none"><H.DataState status={p.status} onretry={() => H.toast.info('Nouvelle tentative')} emptyTitle="Aucune session" emptyText="Personne ne s’est connecté sur la période."><div class="p-4 text-body">42 sessions · 3 h 12 min en moyenne</div></H.DataState></H.Surface>
{:else if name === 'Field'}
  <H.Field label={p.label || 'Nom du serveur'} help={p.help || 'Visible par votre équipe'} error={p.error || undefined} required={p.required} disabled={p.disabled}><H.Input bind:value={text} /></H.Field>
{:else if name === 'Input'}
  <div class="flex max-w-sm flex-col gap-3">
    <H.Input size={p.size} mono={p.mono} disabled={p.disabled} icon={Search} placeholder={p.placeholder || 'Rechercher un joueur'} />
    <H.Input size={p.size} mono disabled={p.disabled} value="srv_01HZX9Q7KM3F" readonly suffix="ID" />
    <H.Input size={p.size} disabled={p.disabled} type="number" value="30120" prefix="Port" />
  </div>
{:else if name === 'Textarea'}
  <H.Field label="Note interne"><H.Textarea bind:value={note} autosize={p.autosize} mono={p.mono} placeholder="Contexte de l’incident…" /></H.Field>
{:else if name === 'Checkbox'}
  <div class="flex flex-col gap-3"><H.Checkbox bind:checked={chk} indeterminate={p.indeterminate} disabled={p.disabled} label="M’alerter sur Discord" description="Incidents et redémarrages" /><H.Checkbox label="Sans description" /></div>
{:else if name === 'Switch'}
  <div class="flex flex-col gap-3"><H.Switch bind:checked={sw} size={p.size} disabled={p.disabled} label="Mode maintenance" description="Refuse les nouvelles connexions" /><H.Switch checked={false} size={p.size} labelPosition="start" label="Rapport hebdomadaire" /></div>
{:else if name === 'RadioGroup'}
  <H.RadioGroup bind:value={radio} variant={p.variant} orientation={p.orientation} options={[{ value: 'observer', label: 'Observer', description: 'Lecture seule : métriques, logs, sessions' }, { value: 'operator', label: 'Operator', description: 'Lecture et opérations autorisées' }, { value: 'custom', label: 'Custom', description: 'Politique locale détaillée', disabled: true }]} />
{:else if name === 'Tabs'}
  <H.Tabs bind:value={tab} variant={p.variant} size={p.size} tabs={[{ value: 'all', label: 'Tous', count: 128 }, { value: 'warn', label: 'Avertissements', count: 12, tone: 'warning' }, { value: 'errors', label: 'Erreurs', count: 4, tone: 'danger' }, { value: 'off', label: 'Archivés', disabled: true }]}>
    {#snippet children({ value })}<p class="text-body text-fg-secondary">Contenu de l’onglet « {value} ».</p>{/snippet}
  </H.Tabs>
{:else if name === 'Tooltip'}
  <H.Tooltip text={p.text || 'Redémarrer le serveur'} shortcut="R" side={p.side}>{#snippet children({ props })}<H.Button {...props} iconOnly icon={RotateCw} label="Redémarrer" />{/snippet}</H.Tooltip>
{:else if name === 'Popover'}
  <H.Popover title="Colonnes" side={p.side} align={p.align} width="16rem">
    {#snippet trigger({ props })}<H.Button {...props} icon={Columns3}>Colonnes</H.Button>{/snippet}
    {#snippet children()}<div class="flex flex-col gap-2"><H.Checkbox checked label="Nom" /><H.Checkbox checked label="CPU" /><H.Checkbox label="Mémoire" /></div>{/snippet}
  </H.Popover>
{:else if name === 'Dialog'}
  <H.Dialog bind:open title="Inviter un membre" description="Il recevra un e-mail avec un lien valable 7 jours." size={p.size} icon={Users}>
    {#snippet trigger({ props })}<H.Button {...props} variant="primary">Inviter</H.Button>{/snippet}
    <H.Field label="E-mail"><H.Input type="email" placeholder="nyx@heliony.com" /></H.Field>
    {#snippet footer({ close })}<H.Button variant="quiet" onclick={close}>Annuler</H.Button><H.Button variant="primary" onclick={close}>Envoyer l’invitation</H.Button>{/snippet}
  </H.Dialog>
{:else if name === 'AlertDialog'}
  <H.AlertDialog bind:open={alert} tone={p.tone} title="Arrêter le serveur ?" description="Les 42 joueurs connectés seront déconnectés." confirmLabel="Arrêter" onconfirm={() => new Promise((r) => setTimeout(r, 900))}>
    {#snippet trigger({ props })}<H.Button {...props} variant="danger" icon={Square}>Arrêter</H.Button>{/snippet}
  </H.AlertDialog>
{:else if name === 'Sheet'}
  <H.Sheet bind:open={sheet} title="Nyx Orbital" description="Session en cours · 2 h 14 min" side={p.side} size={p.size}>
    {#snippet trigger({ props })}<H.Button {...props}>Ouvrir le détail</H.Button>{/snippet}
    <p class="text-body text-fg-secondary">Contenu du panneau.</p>
    {#snippet footer({ close })}<H.Button variant="quiet" onclick={close}>Fermer</H.Button>{/snippet}
  </H.Sheet>
{:else if name === 'Menu'}
  <H.Menu items={menu} align={p.align} onselect={(m) => H.toast.info(m.label)}>{#snippet trigger({ props })}<H.Button {...props} iconOnly icon={Ellipsis} label="Actions" />{/snippet}</H.Menu>
{:else if name === 'Select'}
  <div class="max-w-sm"><H.Field label="Serveur"><H.Select bind:value={sel} options={servers} size={p.size} disabled={p.disabled} /></H.Field></div>
{:else if name === 'Toast'}
  <div class="flex flex-col gap-3">
    <H.Toast title="Serveur redémarré" description="Les joueurs peuvent se reconnecter." tone={p.tone} count={p.count} duration={null} />
    <H.Button onclick={() => H.toast.push({ title: 'Nouvelle version de l’agent', description: '0.6.0 disponible', tone: p.tone, key: 'agent', action: { label: 'Voir', onclick: () => {} } })}>Envoyer un toast (répété : compteur)</H.Button>
  </div>
{:else if name === 'Toaster'}
  <div class="flex flex-wrap gap-2"><H.Button onclick={() => H.toast.success('Enregistré')}>Succès</H.Button><H.Button onclick={() => H.toast.error('Échec de la connexion', 'L’agent ne répond pas.')}>Erreur</H.Button><H.Button onclick={() => H.toast.warning('Quota bientôt atteint')}>Avertissement</H.Button></div>
{:else if name === 'Breadcrumb'}
  <H.Breadcrumb items={crumbs} maxVisible={p.maxVisible} />
{:else if name === 'ThemeToggle'}
  <div class="flex items-center gap-3"><H.ThemeToggle variant={p.variant} /><span class="text-caption text-fg-tertiary">Change le thème de toute la doc.</span></div>
{:else if name === 'Progress'}
  <div class="max-w-sm"><H.Progress value={p.value} tone={p.tone} size={p.size} label="Mise à jour de l’agent" showValue={p.showValue} /></div>
{:else if name === 'Collapsible'}
  <H.Collapsible bind:open={coll} title="Options avancées" description="Ports, chemins, variables"><p>Port 30120 · /opt/heliony/fxserver</p></H.Collapsible>
{:else if name === 'Accordion'}
  <H.Accordion items={faq} variant={p.variant} multiple={p.multiple}>{#snippet children({ item })}<p>{(item as (typeof faq)[number]).answer}</p>{/snippet}</H.Accordion>
{:else if name === 'Segmented'}
  <H.Segmented bind:value={seg} size={p.size} block={p.block} options={[{ value: '24h', label: '24 h' }, { value: '7d', label: '7 jours' }, { value: '30d', label: '30 jours' }]} />
{:else if name === 'Slider'}
  <div class="max-w-sm"><H.Slider label="Seuil d’alerte CPU" bind:value={slider} disabled={p.disabled} format={(v) => `${v} %`} minLabel="0 %" maxLabel="100 %" /></div>
{:else if name === 'ScrollArea'}
  <H.ScrollArea class="h-40 rounded-md border border-line-subtle"><ul class="divide-y divide-line-subtle">{#each players as pl (pl.value)}<li class="px-3 py-2 text-body">{pl.label} <span class="text-caption text-fg-tertiary">{pl.detail}</span></li>{/each}</ul></H.ScrollArea>
{:else if name === 'AppShell' || name === 'Sidebar' || name === 'SidebarTrigger'}
  <div class="overflow-hidden rounded-lg border border-line-subtle" style="height:22rem">
    <H.AppShell bind:sidebarOpen class="h-full min-h-0">
      {#snippet sidebar()}<H.Sidebar sections={nav} current={navCurrent} onnavigate={(e) => (navCurrent = e.id)} class="h-full">{#snippet brand({ collapsed })}<span class="text-subheading font-semibold">{collapsed ? 'H' : 'Heliony'}</span>{/snippet}</H.Sidebar>{/snippet}
      {#snippet header()}<header class="flex h-12 items-center gap-3 border-b border-line-subtle px-3"><H.SidebarTrigger size="sm" /><span class="text-body text-fg-secondary">{navCurrent}</span></header>{/snippet}
      <div class="p-4 text-body text-fg-secondary">Contenu de la page.</div>
    </H.AppShell>
  </div>
{:else if name === 'Pagination'}
  <H.Pagination count={1240} perPage={50} bind:page={pageN} compact={p.compact} showSummary={p.showSummary} />
{:else if name === 'Combobox'}
  <div class="max-w-sm"><H.Field label="Joueur"><H.Combobox bind:value={combo} options={players} size={p.size} loading={p.loading} placeholder="Rechercher un joueur" /></H.Field></div>
{:else if name === 'Calendar'}
  <H.Surface padding="none" class="inline-block"><H.Calendar bind:value={date} /></H.Surface>
{:else if name === 'DateField'}
  <div class="max-w-xs"><H.Field label="Début de période"><H.DateField bind:value={fieldDate} size={p.size} /></H.Field></div>
{:else if name === 'Table'}
  <H.Table columns={resCols} rows={resources} density={p.density} bordered={p.bordered} onselect={() => {}} />
{:else if name === 'DataTable'}
  <H.DataTable columns={dtColumns} rows={playersRows} status={p.status} selectable={p.selectable} searchable={p.searchable} densityControl={p.densityControl} columnsControl={p.columnsControl} pageSize={6} onopen={(r) => H.toast.info(String(r.name))} />
{:else if name === 'Stat'}
  <div class="flex items-end gap-8"><H.Stat label="Joueurs en ligne" value="42" minor="/ 128" size={p.size} /><H.Stat label="Revenus du mois" value="1 240" minor="€" size={p.size} align="end" /></div>
{:else if name === 'StatTile'}
  <div class="grid gap-3 sm:grid-cols-2">
    <H.StatTile label="Rétention J7" value="38" unit="%" delta={p.delta} good={p.good} tone={p.tone} status={p.status} selected={p.selected} deltaLabel="vs semaine précédente" help="Part d’une cohorte revenue le septième jour." onclick={() => {}}><H.Sparkline values={cpu} width="auto" /></H.StatTile>
    <H.StatTile label="Joueurs uniques" value="1 284" delta={12.4} good="up" icon={Users} status={p.status} />
  </div>
{:else if name === 'DataRow'}
  <div class="flex flex-col"><H.DataRow icon={Server} title="Los Santos RP" detail="eu-west · 42 joueurs" value="En ligne" valueTone="success" meta="il y a 2 min" density={p.density} chevron={p.chevron} selected={p.selected} onclick={() => {}} /><H.DataRow icon={Server} title="Blaine County" detail="eu-central · redémarrage" value="Dégradé" valueTone="warning" meta="il y a 8 min" density={p.density} chevron={p.chevron} onclick={() => {}} /></div>
{:else if name === 'DescriptionList'}
  <H.DescriptionList columns={Number(p.columns) as 1 | 2 | 3} layout={p.layout} divided={p.divided} items={[{ label: 'Identifiant', value: 'srv_01HZX9Q7KM3F', mono: true, copy: true }, { label: 'Région', value: 'eu-west' }, { label: 'Agent', value: '0.6.0', mono: true }, { label: 'Mode', value: 'Observer' }, { label: 'Dernier contact', value: 'il y a 2 min', muted: true }, { label: 'Documentation', value: 'heliony.com/docs', href: '#' }]} />
{:else if name === 'FilterChip'}
  <div class="flex flex-wrap gap-2"><H.FilterChip label="niveau" value="error" exclude={p.exclude} removable={p.removable} ontoggle={() => {}} /><H.FilterChip label="ressource" value="siku_inventory" removable={p.removable} /></div>
{:else if name === 'FacetList'}
  <div class="max-w-xs"><H.FacetList label="Ressource" density={p.density} mono={p.mono} items={[{ value: 'siku_inventory', count: 412, active: true }, { value: 'siku_banking', count: 128 }, { value: 'siku_chat', count: 64 }, { value: 'siku_hud', count: 0, unavailable: true }]} moreLabel="Voir plus" onmore={() => {}} /></div>
{:else if name === 'PeriodPicker'}
  <H.PeriodPicker refreshing={p.refreshing} updatedAt={Date.now() - 125_000} onrefresh={() => {}} />
{:else if name === 'Sparkline'}
  <div class="flex items-center gap-6"><H.Sparkline values={cpu} tone={p.tone} area={p.area} /><div class="w-64"><H.Sparkline values={cpu} tone={p.tone} area={p.area} width="auto" height={40} /></div></div>
{:else if name === 'TimeChart'}
  <H.TimeChart label="CPU du serveur" unit=" %" area={p.area} legend={p.legend} status={p.status} series={[{ id: 'cpu', label: 'CPU', points: cpuPoints }, { id: 'mem', label: 'Mémoire', points: memPoints, tone: 'chart-2' }]} thresholds={[{ value: 80, label: 'Alerte', tone: 'warning' }]} bands={[{ from: cpuPoints[8]!.t, to: cpuPoints[11]!.t, tone: 'danger' }]} max={100} />
{:else if name === 'BarChart'}
  <H.BarChart label="Sessions par jour" stacked={p.stacked} legend={p.legend} labels={['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim']} series={[{ id: 'new', label: 'Nouveaux', values: [12, 18, 9, 22, 30, 41, 35] }, { id: 'back', label: 'Récurrents', values: [40, 44, 38, 51, 62, 88, 79], tone: 'chart-2' }]} />
{:else if name === 'DonutChart'}
  <H.DonutChart label="Sources des joueurs" legend={p.legend} status={p.status} valueLabel="642" caption="joueurs" segments={[{ id: 'discord', label: 'Discord', value: 412 }, { id: 'direct', label: 'Direct', value: 130 }, { id: 'stream', label: 'Streamers', value: 70 }, { id: 'other', label: 'Autres', value: 30 }]} />
{:else if name === 'SeverityDot'}
  <div class="flex flex-wrap items-center gap-4"><H.SeverityDot severity={p.severity} label={p.label} size={p.size} />{#each ['trace', 'debug', 'info', 'warn', 'error', 'fatal'] as const as s (s)}<H.SeverityDot severity={s} label size="sm" />{/each}</div>
{:else if name === 'Notice'}
  <div class="flex flex-col gap-3">
    <H.Notice tone={p.tone} title="Agent hors ligne" text="Aucune donnée reçue depuis 12 minutes. Vérifiez la machine ou le réseau." dismissible={p.dismissible} compact={p.compact}>{#snippet actions()}<H.Button size="sm" variant="secondary">Voir la machine</H.Button>{/snippet}</H.Notice>
    <H.Notice tone="intelligence" compact text="Connected Intelligence a relié ce pic d’erreurs au déploiement de 14 h 02." />
  </div>
{:else if name === 'CodeBlock'}
  <H.CodeBlock language={p.language} title={`exemple.${p.language === 'javascript' ? 'js' : p.language}`} lineNumbers={p.lineNumbers} bind:wrap={p.wrap} wrapToggle highlightLines={[2]} code={codeSamples[p.language as string] ?? ''} />
{:else if name === 'LogView'}
  <H.LogView lines={logs} wrap={p.wrap} timestamps={p.timestamps} sources={p.sources} highlight={p.highlight} height={260} onselect={() => {}} />
{:else if name === 'Console'}
  <H.Console title="Los Santos RP" status={{ label: 'En ligne', tone: 'success' }} lines={consoleLines} readonly={p.readonly} busy={p.busy} height={320} onsubmit={(c) => { consoleLines = [...consoleLines, { id: consoleLines.length + 1, at: Date.now(), text: `› ${c}`, severity: 'info' }, { id: consoleLines.length + 2, at: Date.now() + 10, text: `Commande « ${c} » reçue par l’agent.`, severity: 'debug' }]; }} />
{:else if name === 'JsonTree'}
  <H.JsonTree value={payload} depth={p.depth} density={p.density} toolbar={p.toolbar} oncopy={(path) => H.toast.info(`Copié : ${path || 'racine'}`)} onfilter={(path, v) => H.toast.info(`Filtre : ${path} = ${String(v)}`)} />
{:else if name === 'TraceWaterfall'}
  <H.TraceWaterfall spans={spans} label="Trace d’un tick" />
{:else if name === 'StatusTimeline'}
  <H.StatusTimeline label="Disponibilité 30 jours" buckets={uptimeBuckets} uptime={0.9962} start="1 oct." end="30 oct." legend={p.legend} status={p.status} />
{:else if name === 'Timeline'}
  <H.Timeline events={history} groupByDay={p.groupByDay} density={p.density} onselect={(e) => H.toast.info(e.title)} />
{:else if name === 'Chip'}
  <div class="flex flex-wrap gap-2"><H.Chip label="Erreurs" count={4} selected={p.selected} size={p.size} onclick={() => {}} /><H.Chip label="Avertissements" count={12} size={p.size} onclick={() => {}} /><H.Chip label="eu-west" icon={Server} size={p.size} removable={p.removable} onremove={() => {}} /></div>
{:else if name === 'Code'}
  <p class="text-body text-fg-secondary">Serveur <H.Code text="srv_01HZX9Q7KM3FQ2VN8" copy={p.copy} truncate={p.truncate} /> relancé par <H.Code text="agent@0.6.0" /></p>
{:else if name === 'Steps'}
  <H.Steps orientation={p.orientation} clickable={p.clickable} current="agent" steps={[{ id: 'org', label: 'Organisation', description: 'Nom et équipe' }, { id: 'machine', label: 'Machine', description: 'Enregistrer la machine' }, { id: 'agent', label: 'Agent', description: 'Télécharger et associer' }, { id: 'done', label: 'Vérification', optional: true }]} onselect={(s) => H.toast.info(s.label)} />
{:else if name === 'Stepper'}
  <div class="flex items-end gap-4"><H.Field label="Conservation des logs"><H.Stepper value={14} min={1} max={90} size={p.size} suffix="j" showMax={p.showMax} disabled={p.disabled} /></H.Field><H.Stepper value={3} min={1} max={10} size={p.size} disabled={p.disabled} /></div>
{:else if name === 'Tree'}
  <div class="max-w-sm"><H.Tree label="Ressources" density={p.density} defaultIcons={p.defaultIcons} selected="server/main.lua" expanded={['server']} nodes={[{ id: 'fxmanifest.lua', label: 'fxmanifest.lua', meta: 'manifest' }, { id: 'client', label: 'client', children: [{ id: 'client/main.lua', label: 'main.lua', meta: '12,4 Ko' }, { id: 'client/nui.lua', label: 'nui.lua', count: 1, tone: 'warning' }] }, { id: 'server', label: 'server', children: [{ id: 'server/main.lua', label: 'main.lua', count: 3, tone: 'danger' }, { id: 'server/db.lua', label: 'db.lua' }] }]} /></div>
{:else if name === 'Lightbox'}
  <H.Lightbox src="https://picsum.photos/seed/heliony/1200/700" alt="Capture d’écran" title="Capture du 15 janv." caption="Pic d’erreurs après le déploiement 0.8.1.">
    {#snippet trigger({ props })}<button {...props} type="button" class="overflow-hidden rounded-lg border border-line-subtle outline-none focus-visible:ring-focus"><img src="https://picsum.photos/seed/heliony/360/210" alt="" class="block h-32 w-56 object-cover" /></button>{/snippet}
  </H.Lightbox>
{:else if name === 'EntitySwitcher'}
  <div class="w-64 rounded-lg border border-line-subtle bg-surface-nav p-2"><H.EntitySwitcher label="Organisation" value="nyx" size={p.size} collapsed={p.collapsed} createLabel="Nouvelle organisation" oncreate={() => H.toast.info('Créer')} entities={[{ id: 'nyx', name: 'Nyx Orbital', detail: 'Ultimate · 3 serveurs', group: 'Mes organisations' }, { id: 'helios', name: 'Helios Labs', detail: 'Standard', group: 'Mes organisations' }, { id: 'partner', name: 'Blaine RP', detail: 'Invité', group: 'Partenaires' }]} /></div>
{:else if name === 'TimeHistogram'}
  <H.TimeHistogram label="Événements par quart d’heure" legend={p.legend} step={900_000} series={[{ id: 'errors', label: 'Erreurs', tone: 'danger', points: cpu.map((v, i) => ({ t: t0 + i * 900_000, v: Math.round(v / 6) })) }, { id: 'warn', label: 'Avertissements', tone: 'warning', points: cpu.map((v, i) => ({ t: t0 + i * 900_000, v: Math.round(v / 3) })) }]} onbrush={(r) => r && H.toast.info(`Plage : ${H.formatTime(r.from)} → ${H.formatTime(r.to)}`)} />
{:else}
  <p class="text-body text-fg-tertiary">Pas encore de démonstration pour {name}.</p>
{/if}
