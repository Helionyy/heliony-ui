<script lang="ts">
  import type { Snippet } from 'svelte';
  import type { ChartTone, DataStatus } from '../types.js';
  import { cn } from '../utils/cn.js';
  import { useStrings } from '../i18n/context.svelte.js';
  import { toneVar } from './shared.js';
  import Skeleton from '../components/Skeleton/Skeleton.svelte';

  type Key = { id: string; label: string; tone: ChartTone; value?: string; off?: boolean };
  type Props = {
    label?: string;
    status?: DataStatus;
    message?: string;
    height: number;
    legend?: Key[];
    ontoggle?: (id: string) => void;
    width?: number;
    children: Snippet;
    tooltip?: Snippet;
    class?: string;
  };
  let { label, status = 'ready', message, height, legend = [], ontoggle, width = $bindable(0), children, tooltip, class: className }: Props = $props();
  const t = useStrings();
</script>

<figure aria-label={label} class={cn('flex min-w-0 flex-col gap-2', className)}>
  {#if legend.length}
    <div class="flex flex-wrap items-center gap-x-4 gap-y-1 text-caption">
      {#each legend as k (k.id)}
        {#snippet key()}
          <span aria-hidden="true" class="size-2 rounded-[2px]" style={`background:${toneVar(k.tone)}`}></span>
          <span class="text-fg-secondary">{k.label}</span>
          {#if k.value !== undefined && !k.off}<span class="font-medium tabular text-fg-primary">{k.value}</span>{/if}
        {/snippet}
        {#if ontoggle}
          <button type="button" aria-pressed={!k.off} onclick={() => ontoggle(k.id)} class={cn('inline-flex items-center gap-1.5 rounded-xs outline-none hover:text-fg-primary focus-visible:ring-focus', k.off && 'opacity-50')}>{@render key()}</button>
        {:else}
          <span class="inline-flex items-center gap-1.5">{@render key()}</span>
        {/if}
      {/each}
    </div>
  {/if}
  <div class="relative min-w-0" bind:clientWidth={width} style={`height:${height}px`}>
    {#if status === 'loading'}
      <div class="flex h-full flex-col justify-end gap-2 p-2"><Skeleton height="40%" /><Skeleton shape="text" /></div>
    {:else if status !== 'ready'}
      <div class="flex h-full items-center justify-center rounded-md border border-dashed border-line-default text-caption text-fg-tertiary">{message ?? (status === 'empty' ? t.chart.noData : status === 'forbidden' ? t.state.forbiddenTitle : t.state.errorTitle)}</div>
    {:else if width > 0}
      {@render children()}
      {#if tooltip}{@render tooltip()}{/if}
    {/if}
  </div>
</figure>
