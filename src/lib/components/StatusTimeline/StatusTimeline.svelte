<script lang="ts" module>
  export type TimelineState = 'up' | 'degraded' | 'down' | 'unknown';
  export type TimelineBucket = { t: number | string; state: TimelineState; ratio?: number; label?: string };
</script>

<script lang="ts">
  import type { DataStatus } from '../../types.js';
  import { cn } from '../../utils/cn.js';
  import { useStrings } from '../../i18n/context.svelte.js';
  import Skeleton from '../Skeleton/Skeleton.svelte';

  type Props = { buckets: TimelineBucket[]; uptime?: number | null; label?: string; start?: string; end?: string; height?: number; status?: DataStatus; message?: string; format?: (b: TimelineBucket) => string; legend?: boolean; labels?: Partial<Record<TimelineState, string>>; class?: string };
  let { buckets, uptime = null, label, start, end, height = 20, status = 'ready', message, format = (b) => `${b.label ?? b.t} · ${b.state}`, legend = true, labels = {}, class: className }: Props = $props();
  const t = useStrings();
  const pct = $derived(uptime === null || uptime === undefined ? '' : `${(uptime * 100).toFixed(uptime >= 0.999 ? 2 : 1)} %`);
  const counts = $derived(buckets.reduce((acc, b) => { acc[b.state] = (acc[b.state] ?? 0) + 1; return acc; }, {} as Record<TimelineState, number>));
  const color: Record<TimelineState, string> = { up: 'bg-success', degraded: 'bg-warning', down: 'bg-danger', unknown: 'bg-line-strong' };
  const names: Record<TimelineState, string> = { up: 'OK', degraded: 'Dégradé', down: 'Arrêt', unknown: 'Inconnu' };
  const name = (s: TimelineState) => labels[s] ?? names[s];
</script>

<div class={cn('flex min-w-0 flex-col gap-1.5', className)} aria-label={label}>
  {#if status === 'loading'}
    <Skeleton height={`${height}px`} />
  {:else if status !== 'ready'}
    <div class="flex items-center justify-center rounded-md border border-dashed border-line-default text-caption text-fg-tertiary" style={`height:${height}px`}>{message ?? (status === 'empty' ? t.chart.noData : t.state.errorTitle)}</div>
  {:else}
    <div role="img" aria-label={label ? `${label}${pct ? `, ${pct}` : ''}` : pct} class="flex gap-px overflow-hidden rounded-sm" style={`height:${height}px`}>
      {#each buckets as b, i (i)}
        <span class={cn('min-w-px flex-1 rounded-[1px] transition-opacity duration-fast hover:opacity-70', color[b.state])} title={format(b)} style={b.state === 'degraded' && b.ratio !== undefined ? `opacity:${0.45 + b.ratio * 0.5}` : undefined}></span>
      {/each}
    </div>
  {/if}
  {#if legend && status === 'ready'}
    <div class="flex flex-wrap items-center justify-between gap-2 text-caption text-fg-tertiary">
      <span class="tabular">{start}</span>
      <span class="flex flex-wrap items-center gap-3">
        {#if pct}<b class="font-medium tabular text-fg-primary">{pct}</b>{/if}
        {#each ['up', 'degraded', 'down', 'unknown'] as const as s (s)}
          {#if counts[s]}<span class="inline-flex items-center gap-1.5"><span aria-hidden="true" class={cn('size-2 rounded-[2px]', color[s])}></span>{name(s)}</span>{/if}
        {/each}
      </span>
      <span class="tabular">{end}</span>
    </div>
  {/if}
</div>
