<script lang="ts">
  import type { ChartTone, DataStatus } from '../../types.js';
  import { CHART_TONES, niceTicks, toneVar, type ChartSeries } from '../../charts/shared.js';
  import ChartFrame from '../../charts/ChartFrame.svelte';
  import ChartTip from '../../charts/ChartTip.svelte';

  type Props = { series: ChartSeries[]; labels?: string[]; stacked?: boolean; max?: number; unit?: string; format?: (v: number) => string; height?: number; rows?: number; legend?: boolean; label?: string; status?: DataStatus; message?: string; interactive?: boolean; onselect?: (index: number | null) => void; class?: string };
  let { series, labels = [], stacked = false, max, unit = '', format = (v) => String(Math.round(v)), height = 200, rows = 4, legend = true, label, status = 'ready', message, interactive = true, onselect, class: className }: Props = $props();
  const pad = $derived({ top: 8, right: 8, bottom: labels.length ? 24 : 8, left: 44 });
  let width = $state(0);
  let hover = $state<number | null>(null);
  const vals = (s: ChartSeries) => s.values ?? (s.points ?? []).map((p) => p.v ?? 0);
  const n = $derived(Math.max(0, ...series.map((s) => vals(s).length)));
  const tops = $derived(Array.from({ length: n }, (_, k) => (stacked ? series.reduce((sum, s) => sum + (vals(s)[k] ?? 0), 0) : Math.max(0, ...series.map((s) => vals(s)[k] ?? 0)))));
  const hi = $derived(max ?? (tops.length ? Math.max(1, ...tops) : 1));
  const plotW = $derived(Math.max(0, width - pad.left - pad.right));
  const plotH = $derived(Math.max(0, height - pad.top - pad.bottom));
  const slot = $derived(n ? plotW / n : plotW);
  const gap = $derived(Math.min(6, slot * 0.25));
  const groups = $derived(stacked ? 1 : Math.max(1, series.length));
  const barW = $derived(Math.max(1, (slot - gap) / groups - (stacked ? 0 : 1)));
  const y = (v: number) => pad.top + plotH - (Math.min(v, hi) / hi) * plotH;
  const ticks = $derived(niceTicks(0, hi, rows));
  const toned = $derived(series.map((s, i) => ({ ...s, tone: (s.tone ?? CHART_TONES[i % CHART_TONES.length]) as ChartTone, values: vals(s), last: vals(s)[vals(s).length - 1] })));
  const bars = $derived(toned.flatMap((s, si) => s.values.map((v, k) => { const below = stacked ? toned.slice(0, si).reduce((sum, o) => sum + (o.values[k] ?? 0), 0) : 0; const bx = pad.left + k * slot + gap / 2 + (stacked ? 0 : si * (barW + 1)); const top = y(below + v); const bottom = y(below); return { key: `${s.id}:${k}`, k, tone: s.tone, x: bx, y: top, w: barW, h: Math.max(0, bottom - top) }; })));
  const hoverRows = $derived(hover === null ? [] : toned.map((s) => ({ id: s.id, label: s.label, tone: s.tone, value: s.values[hover!] === undefined ? '—' : format(s.values[hover!]!) + unit })));
  const setHover = (k: number | null) => { if (k !== hover) { hover = k; onselect?.(k); } };
  const onmove = (e: PointerEvent) => { if (!interactive || !n) return; const r = (e.currentTarget as HTMLElement).getBoundingClientRect(); const k = Math.floor((e.clientX - r.left - pad.left) / (slot || 1)); setHover(k >= 0 && k < n ? k : null); };
  const onkey = (e: KeyboardEvent) => { if (!n) return; if (e.key === 'Escape') return setHover(null); const d = e.key === 'ArrowRight' ? 1 : e.key === 'ArrowLeft' ? -1 : 0; if (!d) return; e.preventDefault(); setHover(hover === null ? (d > 0 ? 0 : n - 1) : Math.min(n - 1, Math.max(0, hover + d))); };
  const legendKeys = $derived(toned.map((s) => ({ id: s.id, label: s.label, tone: s.tone, value: s.last !== undefined ? format(s.last) + unit : undefined })));
  const tipLeft = $derived(hover === null ? 0 : pad.left + hover * slot + slot / 2);
</script>

<ChartFrame {label} {status} {message} {height} legend={legend ? legendKeys : []} bind:width class={className}>
  <!-- svelte-ignore a11y_no_noninteractive_element_interactions, a11y_no_noninteractive_tabindex -->
  <div role="group" aria-label={label} tabindex={interactive ? 0 : undefined} class="h-full w-full rounded-md outline-none focus-visible:ring-focus" onpointermove={onmove} onpointerleave={() => setHover(null)} onkeydown={interactive ? onkey : undefined} onblur={() => setHover(null)}>
    <svg {width} {height} viewBox="0 0 {width} {height}" role="img" aria-label={label} class="overflow-visible">
      {#each ticks as tk (tk)}
        <line x1={pad.left} x2={width - pad.right} y1={y(tk)} y2={y(tk)} stroke="var(--chart-grid)" />
        <text x={pad.left - 8} y={y(tk)} text-anchor="end" dominant-baseline="middle" fill="var(--chart-axis)" class="text-[11px] tabular">{format(tk)}{unit}</text>
      {/each}
      {#if hover !== null}<rect x={pad.left + hover * slot} y={pad.top} width={slot} height={plotH} fill="var(--surface-control-hover)" rx="4" />{/if}
      {#each labels as l, k (k)}<text x={pad.left + k * slot + slot / 2} y={height - 6} text-anchor="middle" fill="var(--chart-axis)" class="text-[11px] tabular">{l}</text>{/each}
      {#each bars as b (b.key)}<rect x={b.x} y={b.y} width={b.w} height={b.h} rx="2" fill={toneVar(b.tone)} fill-opacity={hover !== null && hover !== b.k ? 0.35 : 1} class="transition-[fill-opacity] duration-fast" />{/each}
    </svg>
  </div>
  {#snippet tooltip()}
    {#if hover !== null && hoverRows.length}<ChartTip title={labels[hover]} rows={hoverRows} left={tipLeft} flip={tipLeft > width * 0.6} />{/if}
  {/snippet}
</ChartFrame>
