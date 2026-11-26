<script lang="ts">
  import '../app.css';
  import { HelionyProvider, Toaster, AppShell, Sidebar, SidebarTrigger, ThemeToggle } from '@heliony/ui';
  import { page } from '$app/state';
  import { nav } from '#lib/nav.js';
  import type { LayoutProps } from './$types';
  let { children }: LayoutProps = $props();
</script>

<HelionyProvider locale="fr" defaultMode="dark">
  <AppShell>
    {#snippet sidebar()}
      <Sidebar sections={nav} current={page.url.pathname}>
        {#snippet brand({ collapsed })}<span class="text-subheading font-semibold tracking-tight">{collapsed ? 'H' : 'Heliony'}</span>{/snippet}
        {#snippet footer()}<ThemeToggle variant="menu" size="sm" />{/snippet}
      </Sidebar>
    {/snippet}
    {#snippet header()}
      <header class="flex h-14 items-center gap-3 border-b border-line-subtle px-4"><SidebarTrigger /></header>
    {/snippet}
    <div class="p-6">{@render children()}</div>
  </AppShell>
  <Toaster />
</HelionyProvider>
