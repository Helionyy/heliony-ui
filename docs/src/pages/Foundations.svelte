<script lang="ts">
  import tokens from '../../../tokens/tokens.json';
  import { Divider, Surface, Button, Badge, Skeleton, Spinner, EmptyState, DataState, Progress } from '../../../src/lib/index.js';

  type Props = { section: string };
  let { section }: Props = $props();
  type Themed = { name: string; dark: string; light: string; usage: string };
  const semantic = tokens.color.semantic as Themed[];
  const families = [
    ['Surfaces', /^surface-/], ['Texte', /^fg-/], ['Filets', /^line-/], ['Action et accent', /^(action-|accent|focus-ring|selection|scrim)/],
    ['Statuts', /^(success|warning|danger|info)/], ['Sévérités', /^severity-/], ['Connected Intelligence', /^intelligence/], ['Graphiques', /^chart-/], ['Syntaxe', /^syntax-/],
  ] as const;
  const styles = tokens.type.styles;
  const sample = 'Heliony relie les signaux de vos serveurs';
</script>

<article class="flex flex-col gap-8">
  {#if section === 'colors'}
    <header class="flex flex-col gap-2"><h1 class="text-title">Couleurs</h1><p class="max-w-2xl text-lead text-fg-secondary">Les interfaces consomment la sémantique. Chaque token porte une valeur Sombre et une valeur Claire, vérifiées AA par les tests.</p></header>
    {#each families as [label, re] (label)}
      <section class="flex flex-col gap-3">
        <h2 class="text-heading">{label}</h2>
        <div class="grid gap-2 sm:grid-cols-2 xl:grid-cols-3">
          {#each semantic.filter((t) => re.test(t.name)) as t (t.name)}
            <div class="flex gap-3 rounded-lg border border-line-subtle p-3">
              <div class="flex shrink-0 flex-col gap-1">
                <span class="dark block size-8 rounded-md border border-line-subtle" style={`background:var(--${t.name})`}></span>
                <span class="light block size-8 rounded-md border border-line-subtle" style={`background:var(--${t.name})`}></span>
              </div>
              <div class="flex min-w-0 flex-col gap-0.5">
                <code class="font-mono text-code text-fg-primary">{t.name}</code>
                <span class="truncate text-caption text-fg-tertiary">{t.dark} · {t.light}</span>
                <p class="text-caption text-fg-secondary">{t.usage}</p>
              </div>
            </div>
          {/each}
        </div>
      </section>
    {/each}
  {:else if section === 'type'}
    <header class="flex flex-col gap-2"><h1 class="text-title">Typographie</h1><p class="max-w-2xl text-lead text-fg-secondary">Instrument Sans pour le texte, Geist Mono pour les identifiants. Trois niveaux toujours distincts par taille ou graisse : titre, information, métadonnée.</p></header>
    <div class="flex flex-col divide-y divide-line-subtle">
      {#each styles as s (s.name)}
        <div class="grid items-baseline gap-4 py-4 md:grid-cols-[10rem_1fr_14rem]">
          <code class="font-mono text-code text-fg-tertiary">{s.name}</code>
          <p class={[s.name, 'truncate']}>{s.family === 'mono' ? 'srv_01HZX9Q7 · 42 joueurs' : s.name.includes('figure') ? '12 480' : sample}</p>
          <span class="text-caption text-fg-tertiary">{s.fontSize} / {s.lineHeight} · {s.fontWeight}{s.letterSpacing ? ` · ${s.letterSpacing}` : ''} — {s.usage}</span>
        </div>
      {/each}
    </div>
  {:else if section === 'surfaces'}
    <header class="flex flex-col gap-2"><h1 class="text-title">Surfaces et profondeur</h1><p class="max-w-2xl text-lead text-fg-secondary">Quatre niveaux, un filet subtil, une ombre par niveau. Pas de carte dans une carte : un filet ou de l’espace séparent.</p></header>
    <div class="grid gap-4 lg:grid-cols-2">
      {#each ['dark', 'light'] as theme (theme)}
        <div class={[theme, 'rounded-xl border border-line-subtle bg-surface-base p-6 text-fg-primary']}>
          <p class="mb-4 text-caption text-fg-tertiary">{theme === 'dark' ? 'Sombre' : 'Clair'} · surface-base</p>
          <Surface level="sunken" padding="sm" class="mb-3"><code class="font-mono text-code">surface-sunken</code><p class="text-caption text-fg-tertiary">Champs, pistes, zones de code.</p></Surface>
          <Surface level="raised" padding="md" elevated class="mb-3"><code class="font-mono text-code">surface-raised</code><p class="text-caption text-fg-tertiary">Cartes, inspecteurs. Une seule au-dessus de la base.</p></Surface>
          <Surface level="overlay" padding="md" class="shadow-overlay"><code class="font-mono text-code">surface-overlay</code><p class="text-caption text-fg-tertiary">Menus, popovers, dialogues, toasts.</p></Surface>
        </div>
      {/each}
    </div>
    <Divider label="Rayons et ombres" />
    <div class="flex flex-wrap gap-4">
      {#each tokens.radius.tokens as r (r.name)}<div class="flex flex-col items-center gap-2"><span class="size-14 border border-line-strong bg-surface-control" style={`border-radius:var(--${r.name})`}></span><code class="font-mono text-code text-fg-tertiary">{r.name}</code></div>{/each}
      {#each tokens.shadow.tokens as s (s.name)}<div class="flex flex-col items-center gap-2"><span class="size-14 rounded-lg bg-surface-raised" style={`box-shadow:var(--${s.name})`}></span><code class="font-mono text-code text-fg-tertiary">{s.name}</code></div>{/each}
    </div>
  {:else}
    <header class="flex flex-col gap-2"><h1 class="text-title">Mouvement et états</h1><p class="max-w-2xl text-lead text-fg-secondary">Trois durées, trois courbes, des transitions d’opacité et de translation courte. Tout bloc de données expose ses cinq états.</p></header>
    <div class="grid gap-3 sm:grid-cols-3">
      {#each tokens.duration.tokens as d (d.name)}<Surface padding="md"><code class="font-mono text-code">{d.name}</code><p class="text-figure tabular">{d.value}</p><p class="text-caption text-fg-tertiary">{d.usage}</p></Surface>{/each}
    </div>
    <Divider label="États standard" />
    <div class="grid gap-4 md:grid-cols-2">
      <Surface padding="none"><p class="px-4 pt-3 text-label text-fg-tertiary">loading</p><DataState status="loading">—</DataState></Surface>
      <Surface padding="none"><p class="px-4 pt-3 text-label text-fg-tertiary">empty</p><DataState status="empty" size="sm">—</DataState></Surface>
      <Surface padding="none"><p class="px-4 pt-3 text-label text-fg-tertiary">error</p><DataState status="error" size="sm" onretry={() => {}}>—</DataState></Surface>
      <Surface padding="none"><p class="px-4 pt-3 text-label text-fg-tertiary">forbidden</p><DataState status="forbidden" size="sm">—</DataState></Surface>
    </div>
    <Divider label="Attente" />
    <div class="flex flex-wrap items-center gap-6"><Spinner /><Skeleton width="12rem" height="1.25rem" /><Skeleton shape="circle" width="2rem" height="2rem" /><div class="w-56"><Progress value={null} label="Indéterminé" /></div><Button loading>Enregistrer</Button><Badge tone="accent" dot>En cours</Badge></div>
    <EmptyState size="sm" bordered />
  {/if}
</article>
