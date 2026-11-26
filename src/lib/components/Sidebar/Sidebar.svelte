<script lang="ts">
  import type { Snippet } from 'svelte';
  import ChevronDown from '@lucide/svelte/icons/chevron-down';
  import { slide } from 'svelte/transition';
  import type { NavEntry, NavSection, Tone } from '../../types.js';
  import { cn } from '../../utils/cn.js';
  import { useStrings } from '../../i18n/context.svelte.js';
  import { SidebarState, setSidebar, useSidebar } from './context.svelte.js';
  import Sheet from '../Sheet/Sheet.svelte';
  import Tooltip from '../Tooltip/Tooltip.svelte';
  import Badge from '../Badge/Badge.svelte';

  type Props = {
    sections: NavSection[];
    current?: string;
    open?: boolean;
    collapsible?: boolean;
    label?: string;
    onnavigate?: (entry: NavEntry) => void;
    brand?: Snippet<[{ collapsed: boolean }]>;
    footer?: Snippet<[{ collapsed: boolean }]>;
    class?: string;
  };
  let { sections, current, open = $bindable(true), collapsible = true, label, onnavigate, brand, footer, class: className }: Props = $props();
  const t = useStrings();
  const fromShell = useSidebar();
  const sidebar = fromShell ?? setSidebar(new SidebarState(() => open, (v) => { open = v; }));
  const collapsed = $derived(collapsible && !sidebar.open && !sidebar.isMobile);

  const isActive = (e: NavEntry): boolean => e.id === current || (!!e.href && e.href === current) || (e.children?.some(isActive) ?? false);
  let expanded = $state<Record<string, boolean>>({});
  const isExpanded = (e: NavEntry) => expanded[e.id] ?? isActive(e);
  const navigate = (e: NavEntry) => { onnavigate?.(e); if (sidebar.isMobile) sidebar.closeMobile(); };

  const badgeTone = (tone?: Tone) => tone ?? 'neutral';
  const item = 'group/item relative flex h-control-md w-full min-w-0 items-center gap-2.5 rounded-md px-2.5 text-body text-fg-secondary outline-none transition-[background-color,color] duration-fast ease-standard hover:bg-surface-control-hover hover:text-fg-primary focus-visible:ring-focus disabled:pointer-events-none disabled:opacity-(--opacity-disabled) [&_svg]:size-icon-sm [&_svg]:shrink-0 [&_svg]:text-fg-tertiary';
  const active = 'bg-surface-control font-medium text-fg-primary [&_svg]:text-fg-primary before:absolute before:inset-y-2 before:-start-2 before:w-0.5 before:rounded-full before:bg-fg-primary';
</script>

{#snippet entry(e: NavEntry, depth: number)}
  {@const Icon = e.icon}
  {@const on = isActive(e)}
  {#if e.children?.length && !collapsed}
    <li>
      <button type="button" class={cn(item, on && !isExpanded(e) && active)} aria-expanded={isExpanded(e)} disabled={e.disabled} onclick={() => (expanded[e.id] = !isExpanded(e))}>
        {#if Icon}<Icon aria-hidden="true" />{/if}
        <span class="flex-1 truncate text-start">{e.label}</span>
        <ChevronDown aria-hidden="true" class={cn('transition-transform duration-fast', isExpanded(e) && 'rotate-180')} />
      </button>
      {#if isExpanded(e)}
        <ul transition:slide={{ duration: 160 }} class="ms-[1.1rem] mt-0.5 flex flex-col gap-0.5 border-s border-line-subtle ps-2.5">
          {#each e.children as child (child.id)}{@render entry(child, depth + 1)}{/each}
        </ul>
      {/if}
    </li>
  {:else}
    <li>
      <Tooltip text={collapsed ? e.label : undefined} side="right">
        {#snippet children({ props })}
          <svelte:element this={e.href ? 'a' : 'button'} {...props} href={e.href} type={e.href ? undefined : 'button'} aria-current={on ? 'page' : undefined} aria-disabled={e.disabled || undefined} tabindex={e.disabled ? -1 : undefined}
            class={cn(item, depth > 0 && 'h-control-sm text-label', on && active, collapsed && 'justify-center px-0 before:hidden')} onclick={() => navigate(e)}>
            {#if Icon}<Icon aria-hidden="true" />{:else if collapsed}<span class="text-label font-medium">{e.label.slice(0, 2)}</span>{/if}
            {#if !collapsed}
              <span class="flex-1 truncate text-start">{e.label}</span>
              {#if e.badge !== undefined}<Badge size="sm" tone={badgeTone(e.tone)}>{e.badge}</Badge>{/if}
            {:else if e.badge !== undefined}
              <span aria-hidden="true" class="absolute end-1.5 top-1.5 size-1.5 rounded-full bg-accent"></span>
            {/if}
          </svelte:element>
        {/snippet}
      </Tooltip>
    </li>
  {/if}
{/snippet}

{#snippet content()}
  <div class={cn('flex h-full min-h-0 flex-col', collapsed ? 'px-2' : 'px-3')}>
    {#if brand}<div class={cn('flex h-14 shrink-0 items-center', collapsed ? 'justify-center' : 'px-1')}>{@render brand({ collapsed })}</div>{/if}
    <nav aria-label={label ?? t.nav.main} class="flex min-h-0 flex-1 flex-col gap-5 overflow-y-auto py-3">
      {#each sections as section (section.id)}
        <div class="flex flex-col gap-0.5">
          {#if section.label && !collapsed}
            <p class="mb-1 px-2.5 text-caption font-medium uppercase tracking-wider text-fg-tertiary">{section.label}</p>
          {:else if section.label && collapsed}
            <div aria-hidden="true" class="mx-2 mb-1 h-px bg-line-subtle"></div>
          {/if}
          <ul class="flex flex-col gap-0.5">
            {#each section.entries as e (e.id)}{@render entry(e, 0)}{/each}
          </ul>
        </div>
      {/each}
    </nav>
    {#if footer}<div class={cn('shrink-0 border-t border-line-subtle py-3', collapsed && 'flex justify-center')}>{@render footer({ collapsed })}</div>{/if}
  </div>
{/snippet}

{#if sidebar.isMobile}
  <Sheet bind:open={() => sidebar.openMobile, (v) => sidebar.setOpenMobile(v)} title={label ?? t.nav.main} side="left" size="sm" hideHeader padding={false} class="bg-surface-nav">
    {@render content()}
  </Sheet>
{:else}
  <aside data-state={sidebar.state} class={cn('sticky top-0 z-nav h-svh shrink-0 border-e border-line-subtle bg-surface-nav text-fg-primary transition-[width] duration-base ease-standard', collapsed ? 'w-sidebar-collapsed' : 'w-sidebar', className)}>
    {@render content()}
  </aside>
{/if}
