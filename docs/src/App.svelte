<script lang="ts">
  import Palette from '@lucide/svelte/icons/palette';
  import Type from '@lucide/svelte/icons/type';
  import Layers from '@lucide/svelte/icons/layers';
  import Activity from '@lucide/svelte/icons/activity';
  import Smartphone from '@lucide/svelte/icons/smartphone';
  import Tablet from '@lucide/svelte/icons/tablet';
  import Monitor from '@lucide/svelte/icons/monitor';
  import { HelionyProvider, AppShell, Sidebar, SidebarTrigger, ThemeToggle, Toaster, Segmented, Badge, version, type NavSection } from '../../src/lib/index.js';
  import { components, groups } from '../../catalog/catalog.js';
  import ComponentPage from './pages/ComponentPage.svelte';
  import Foundations from './pages/Foundations.svelte';

  const foundations = [
    { id: 'f:colors', label: 'Couleurs', icon: Palette },
    { id: 'f:type', label: 'Typographie', icon: Type },
    { id: 'f:surfaces', label: 'Surfaces et profondeur', icon: Layers },
    { id: 'f:motion', label: 'Mouvement et états', icon: Activity },
  ];
  const sections: NavSection[] = [
    { id: 'foundations', label: 'Fondations', entries: foundations },
    ...groups.filter((g) => g.id !== 'foundation').map((g) => ({ id: g.id, label: g.label, entries: components.filter((c) => c.group === g.id).map((c) => ({ id: `c:${c.name}`, label: c.name })) })),
    { id: 'root', label: 'Racine', entries: components.filter((c) => c.group === 'foundation').map((c) => ({ id: `c:${c.name}`, label: c.name })) },
  ];
  let page = $state(location.hash.slice(1) || 'f:colors');
  $effect(() => { location.hash = page; });
  let width = $state('full');
  const widths = [{ value: '375', label: 'Mobile', icon: Smartphone }, { value: '768', label: 'Tablette', icon: Tablet }, { value: 'full', label: 'Bureau', icon: Monitor }];
</script>

<HelionyProvider locale="fr" defaultMode="dark" modeStorageKey="heliony-docs-mode">
  <AppShell>
    {#snippet sidebar()}
      <Sidebar {sections} current={page} onnavigate={(e) => (page = e.id)}>
        {#snippet brand({ collapsed })}
          <div class="flex items-center gap-2.5">
            <span aria-hidden="true" class="flex size-7 items-center justify-center rounded-md bg-action-primary text-action-primary-fg text-label font-semibold">H</span>
            {#if !collapsed}<span class="text-subheading font-semibold tracking-tight">Heliony UI</span><Badge size="sm">{version}</Badge>{/if}
          </div>
        {/snippet}
        {#snippet footer()}<ThemeToggle variant="menu" size="sm" />{/snippet}
      </Sidebar>
    {/snippet}
    {#snippet header()}
      <header class="sticky top-0 z-sticky flex h-14 items-center gap-3 border-b border-line-subtle bg-surface-base/90 px-4 backdrop-saturate-100">
        <SidebarTrigger />
        <span class="text-body text-fg-secondary">{page.startsWith('f:') ? 'Fondations' : groups.find((g) => g.id === components.find((c) => `c:${c.name}` === page)?.group)?.label}</span>
        <div class="ms-auto flex items-center gap-2">
          <Segmented bind:value={width} options={widths} size="sm" iconOnly label="Largeur de prévisualisation" />
          <ThemeToggle size="sm" />
        </div>
      </header>
    {/snippet}
    <div class="mx-auto w-full max-w-6xl px-4 py-8 sm:px-8">
      {#key page}
        {#if page.startsWith('f:')}
          <Foundations section={page.slice(2)} />
        {:else}
          <ComponentPage name={page.slice(2)} {width} />
        {/if}
      {/key}
    </div>
  </AppShell>
  <Toaster />
</HelionyProvider>
