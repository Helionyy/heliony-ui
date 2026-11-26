<script lang="ts">
  import type { Snippet } from 'svelte';
  import ArrowUp from '@lucide/svelte/icons/arrow-up';
  import ArrowDown from '@lucide/svelte/icons/arrow-down';
  import Info from '@lucide/svelte/icons/info';
  import type { DataStatus, IconComponent, Tone } from '../../types.js';
  import { cn } from '../../utils/cn.js';
  import { useStrings } from '../../i18n/context.svelte.js';
  import Skeleton from '../Skeleton/Skeleton.svelte';
  import Tooltip from '../Tooltip/Tooltip.svelte';

  type Props = {
    label: string;
    value?: string;
    unit?: string;
    delta?: number;
    deltaLabel?: string;
    good?: 'up' | 'down' | 'none';
    tone?: Tone;
    status?: DataStatus;
    message?: string;
    icon?: IconComponent;
    help?: string;
    href?: string;
    selected?: boolean;
    size?: 'md' | 'lg';
    onclick?: (e: MouseEvent) => void;
    children?: Snippet;
    class?: string;
  };
  let { label, value = '', unit = '', delta, deltaLabel, good = 'none', tone = 'neutral', status = 'ready', message, icon, help, href, selected = false, size = 'md', onclick, children, class: className }: Props = $props();
  const t = useStrings();
  const Icon = $derived(icon);
  const tag = $derived(href ? 'a' : onclick ? 'button' : 'article');
  const deltaTone = $derived(delta === undefined || delta === 0 || good === 'none' ? 'neutral' : (delta > 0) === (good === 'up') ? 'success' : 'danger');
  const deltaText = $derived(delta === undefined ? '' : `${delta > 0 ? '+' : delta < 0 ? '−' : ''}${Math.abs(delta) >= 10 ? Math.round(Math.abs(delta)) : Math.round(Math.abs(delta) * 10) / 10} %`);
  const accent: Record<Tone, string> = { neutral: '', accent: 'before:bg-accent', success: 'before:bg-success', warning: 'before:bg-warning', danger: 'before:bg-danger', info: 'before:bg-info', intelligence: 'before:bg-intelligence' };
  const deltaClass = { neutral: 'bg-surface-control text-fg-secondary', success: 'bg-success-subtle text-success-fg', danger: 'bg-danger-subtle text-danger-fg' } as const;
  const interactive = $derived(tag !== 'article');
</script>

<svelte:element this={tag} href={href} type={tag === 'button' ? 'button' : undefined} role={tag === 'button' ? 'button' : tag === 'a' ? 'link' : 'group'} aria-pressed={tag === 'button' ? selected : undefined} aria-current={tag === 'a' && selected ? 'true' : undefined} {onclick}
  class={cn('relative flex min-w-0 flex-col gap-2 overflow-hidden rounded-lg border border-line-subtle bg-surface-raised text-start text-fg-primary outline-none', size === 'lg' ? 'p-5' : 'p-4',
    tone !== 'neutral' && 'before:absolute before:inset-y-3 before:start-0 before:w-0.5 before:rounded-e-full', accent[tone],
    interactive && 'cursor-pointer transition-[border-color,background-color,box-shadow] duration-fast ease-standard hover:border-line-default focus-visible:ring-focus',
    selected && 'border-selection bg-surface-control ring-1 ring-selection', className)}>
  <div class="flex items-center gap-2 text-label text-fg-tertiary">
    {#if Icon}<Icon aria-hidden="true" class="size-icon-sm" />{/if}
    <span class="min-w-0 flex-1 truncate">{label}</span>
    {#if help}
      <Tooltip text={help} side="bottom">
        {#snippet children({ props })}
          <svelte:element this={interactive ? 'span' : 'button'} {...props} type={interactive ? undefined : 'button'} tabindex={interactive ? -1 : undefined} class="inline-flex size-5 items-center justify-center rounded-xs text-fg-tertiary outline-none hover:text-fg-primary focus-visible:ring-focus" aria-label={`${t.common.more} : ${label}`}><Info class="size-3.5" aria-hidden="true" /></svelte:element>
        {/snippet}
      </Tooltip>
    {/if}
  </div>
  {#if status === 'loading'}
    <Skeleton width="60%" height={size === 'lg' ? '2.25rem' : '1.75rem'} />
  {:else if status !== 'ready'}
    <p class="text-body text-fg-tertiary">{message ?? (status === 'empty' ? t.state.emptyTitle : status === 'forbidden' ? t.state.forbiddenTitle : t.state.errorTitle)}</p>
  {:else}
    <div class="flex flex-wrap items-baseline gap-x-3 gap-y-1">
      <span class={cn('tabular', size === 'lg' ? 'text-figure-lg' : 'text-figure')}>{value}{#if unit}<span class="ms-1 text-[0.6em] font-medium text-fg-secondary">{unit}</span>{/if}</span>
      {#if delta !== undefined}
        <span class={cn('inline-flex items-center gap-0.5 rounded-xs px-1.5 py-px text-caption font-medium tabular', deltaClass[deltaTone])}>
          {#if delta > 0}<ArrowUp class="size-3" aria-hidden="true" />{:else if delta < 0}<ArrowDown class="size-3" aria-hidden="true" />{/if}{deltaText}
        </span>
      {/if}
    </div>
    {#if children}<div class="mt-1">{@render children()}</div>{/if}
    {#if deltaLabel}<p class="text-caption text-fg-tertiary">{deltaLabel}</p>{/if}
  {/if}
</svelte:element>
