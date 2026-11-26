<script lang="ts">
  import type { Snippet } from 'svelte';
  import X from '@lucide/svelte/icons/x';
  import type { IconComponent } from '../../types.js';
  import { cn } from '../../utils/cn.js';
  import { useStrings } from '../../i18n/context.svelte.js';

  type Props = { label?: string; icon?: IconComponent; selected?: boolean; disabled?: boolean; count?: number; size?: 'sm' | 'md'; removable?: boolean; onclick?: (e: MouseEvent) => void; onremove?: () => void; children?: Snippet; class?: string };
  let { label, icon, selected = false, disabled = false, count, size = 'md', removable = false, onclick, onremove, children, class: className }: Props = $props();
  const t = useStrings();
  const Icon = $derived(icon);
  const base = $derived(cn('inline-flex items-center gap-1.5 rounded-full border font-medium whitespace-nowrap transition-[background-color,border-color,color] duration-fast ease-standard', size === 'sm' ? 'h-6 px-2.5 text-caption' : 'h-7 px-3 text-label', selected ? 'border-selection bg-surface-control text-fg-primary' : 'border-line-default bg-transparent text-fg-secondary', disabled && 'opacity-(--opacity-disabled)'));
</script>

{#if onclick}
  <button type="button" aria-pressed={selected} {disabled} {onclick} class={cn(base, 'outline-none hover:border-line-strong hover:text-fg-primary focus-visible:ring-focus disabled:pointer-events-none [&_svg]:size-3.5', className)}>
    {#if Icon}<Icon aria-hidden="true" />{/if}
    {#if children}{@render children()}{:else}{label}{/if}
    {#if count !== undefined}<span class="rounded-full bg-surface-control-active px-1.5 text-[0.6875rem] tabular text-fg-secondary">{count > 999 ? '999+' : count}</span>{/if}
  </button>
{:else}
  <span class={cn(base, removable && 'pe-1', className, '[&_svg]:size-3.5')}>
    {#if Icon}<Icon aria-hidden="true" />{/if}
    {#if children}{@render children()}{:else}{label}{/if}
    {#if count !== undefined}<span class="rounded-full bg-surface-control-active px-1.5 text-[0.6875rem] tabular text-fg-secondary">{count > 999 ? '999+' : count}</span>{/if}
    {#if removable}<button type="button" class="flex size-5 items-center justify-center rounded-full text-fg-tertiary outline-none hover:bg-surface-control-hover hover:text-fg-primary focus-visible:ring-focus" aria-label={`${t.common.clear} ${label ?? ''}`} onclick={onremove}><X aria-hidden="true" /></button>{/if}
  </span>
{/if}
