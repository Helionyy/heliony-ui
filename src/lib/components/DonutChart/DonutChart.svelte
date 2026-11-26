<script lang="ts">
  import type { Snippet } from 'svelte';
  import type { ChartTone, DataStatus } from '../../types.js';
  import { cn } from '../../utils/cn.js';
  import { useStrings } from '../../i18n/context.svelte.js';
  import { CHART_TONES, toneVar } from '../../charts/shared.js';
  import Skeleton from '../Skeleton/Skeleton.svelte';

  export type DonutSegment = { id: string; label: string; value: number; tone?: ChartTone; hint?: string };

  type Props = { segments: DonutSegment[]; label: string; size?: number; thickness?: number; legend?: boolean; valueLabel?: string; caption?: string; format?: (value: number, share: number) => string; status?: DataStatus; message?: string; onselect?: (id: string | null) => void; children?: Snippet; class?: string };
  let { segments, label, size = 160, thickness = 16, legend = true, valueLabel, caption, format = (_v, share) => `${share < 1 && share > 0 ? '< 1' : Math.round(share)} %`, status = 'ready', message, onselect, children, class: className }: Props = $props();
  const t = useStrings();
  const total = $derived(segments.reduce((sum, s) => sum + Math.max(0, s.value), 0));
  const radius = $derived((size - thickness) / 2);
  const circ = $derived(2 * Math.PI * radius);
  const gap = $derived(segments.length > 1 ? Math.min(3, circ * 0.01) : 0);
  const arcs = $derived.by(() => { let offset = 0; return segments.map((s, i) => { const share = total > 0 ? (Math.max(0, s.value) / total) * 100 : 0; const length = (share / 100) * circ; const arc = { ...s, share, length: Math.max(0, length - gap), offset, tone: (s.tone ?? CHART_TONES[i % CHART_TONES.length]) as ChartTone }; offset += length; return arc; }); });
  let hovered = $state<string | null>(null);
  const active = $derived(arcs.find((a) => a.id === hovered) ?? null);
  const centerValue = $derived(active ? format(active.value, active.share) : (valueLabel ?? (total > 0 ? format(total, 100) : '—')));
  const centerCaption = $derived(active ? active.label : caption);
  const hover = (id: string | null) => { hovered = id; onselect?.(id); };
</script>

<div class={cn('flex flex-wrap items-center gap-6', className)} aria-label={label}>
  {#if status === 'loading'}
    <Skeleton shape="circle" width={`${size}px`} height={`${size}px`} />
  {:else}
    <div class="relative shrink-0" style={`width:${size}px;height:${size}px`} role="img" aria-label={total > 0 ? `${label} : ${arcs.map((a) => `${a.label} ${format(a.value, a.share)}`).join(', ')}` : label}>
      <svg viewBox="0 0 {size} {size}" width={size} height={size} aria-hidden="true" onpointerleave={() => hover(null)}>
        <circle cx={size / 2} cy={size / 2} r={radius} fill="none" stroke="var(--surface-control-active)" stroke-width={thickness} />
        {#if status === 'ready' && total > 0}
          {#each arcs as a (a.id)}
            {#if a.length > 0}
              <!-- svelte-ignore a11y_no_static_element_interactions -->
              <circle cx={size / 2} cy={size / 2} r={radius} fill="none" stroke={toneVar(a.tone)} stroke-width={hovered === a.id ? thickness + 4 : thickness} stroke-dasharray="{a.length} {circ - a.length}" stroke-dashoffset={-a.offset} transform="rotate(-90 {size / 2} {size / 2})" opacity={hovered !== null && hovered !== a.id ? 0.35 : 1} class="transition-[stroke-width,opacity] duration-fast" onpointerenter={() => hover(a.id)}><title>{a.label} · {format(a.value, a.share)}{a.hint ? ` · ${a.hint}` : ''}</title></circle>
            {/if}
          {/each}
        {/if}
      </svg>
      <div class="absolute inset-0 flex flex-col items-center justify-center gap-0.5 p-4 text-center">
        {#if status !== 'ready' || total === 0}
          <span class="text-caption text-fg-tertiary">{message ?? (status === 'ready' || status === 'empty' ? t.chart.noData : status === 'forbidden' ? t.state.forbiddenTitle : t.state.errorTitle)}</span>
        {:else if children && !active}
          {@render children()}
        {:else}
          <span class="text-figure tabular text-fg-primary">{centerValue}</span>
          {#if centerCaption}<span class="truncate text-caption text-fg-tertiary">{centerCaption}</span>{/if}
        {/if}
      </div>
    </div>
  {/if}
  {#if legend && status === 'ready' && total > 0}
    <ul class="flex min-w-0 flex-1 flex-col gap-1.5 text-caption">
      {#each arcs as a (a.id)}
        <li class={cn('flex items-center gap-2 transition-opacity duration-fast', hovered !== null && hovered !== a.id && 'opacity-50')} title={a.hint} onpointerenter={() => hover(a.id)} onpointerleave={() => hover(null)}>
          <span aria-hidden="true" class="size-2 shrink-0 rounded-[2px]" style={`background:${toneVar(a.tone)}`}></span>
          <span class="min-w-0 flex-1 truncate text-fg-secondary">{a.label}</span>
          <span class="font-medium tabular text-fg-primary">{format(a.value, a.share)}</span>
        </li>
      {/each}
    </ul>
  {/if}
</div>
