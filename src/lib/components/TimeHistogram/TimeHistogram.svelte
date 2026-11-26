<script lang="ts" module>
  export type HistogramSeries = { id: string; label: string; tone?: import('../../types.js').ChartTone; points: { t: number; v: number }[] };
  export type TimeRange = { from: number; to: number };
</script>

<script lang="ts">
  import type { ChartTone, DataStatus } from '../../types.js';
  import { cn } from '../../utils/cn.js';
  import { useHeliony } from '../../i18n/context.svelte.js';
  import { CHART_TONES, defaultTimeLabel, niceTicks, timeTicks, toneVar } from '../../charts/shared.js';
  import ChartFrame from '../../charts/ChartFrame.svelte';
  import ChartTip from '../../charts/ChartTip.svelte';

  type Props = { series: HistogramSeries[]; from?: number; to?: number; step: number; height?: number; format?: (v: number) => string; formatTime?: (t: number) => string; unit?: string; label?: string; status?: DataStatus; message?: string; legend?: boolean; brush?: TimeRange | null; onpick?: (t: number) => void; onbrush?: (range: TimeRange | null) => void; class?: string };
  let { series, from, to, step, height = 140, format = (v) => String(Math.round(v)), formatTime, unit = '', label, status = 'ready', message, legend = true, brush = $bindable(null), onpick, onbrush, class: className }: Props = $props();
  const cfg = useHeliony();
  const pad = { top: 8, right: 8, bottom: 24, left: 44 };
  let width = $state(0);
  let hidden = $state<string[]>([]);
  let hover = $state<number | null>(null);
  let drag = $state<{ a: number; b: number; x: number; moved: boolean } | null>(null);
  const toned = $derived(series.map((s, i) => ({ ...s, tone: (s.tone ?? CHART_TONES[i % CHART_TONES.length]) as ChartTone, total: s.points.reduce((sum, p) => sum + p.v, 0) })));
  const visible = $derived(toned.filter((s) => !hidden.includes(s.id)));
  const times = $derived([...new Set(series.flatMap((s) => s.points.map((p) => p.t)))].sort((a, b) => a - b));
  const x0 = $derived(from ?? (times.length ? times[0]! : 0));
  const x1 = $derived(to ?? (times.length ? times[times.length - 1]! + step : x0 + step));
  const xspan = $derived(x1 - x0 || 1);
  const plotW = $derived(Math.max(0, width - pad.left - pad.right));
  const plotH = $derived(Math.max(0, height - pad.top - pad.bottom));
  const x = (t: number) => pad.left + ((t - x0) / xspan) * plotW;
  const buckets = $derived(times.map((t) => { const parts = visible.map((s) => ({ id: s.id, label: s.label, tone: s.tone, v: s.points.find((p) => p.t === t)?.v ?? 0 })); return { t, parts, total: parts.reduce((sum, p) => sum + p.v, 0) }; }));
  const hi = $derived(Math.max(1, ...buckets.map((b) => b.total)));
  const y = (v: number) => pad.top + plotH - (Math.min(v, hi) / hi) * plotH;
  const ticks = $derived(niceTicks(0, hi, 3));
  const barW = $derived(Math.max(1, (step / xspan) * plotW - 1));
  const bars = $derived(buckets.flatMap((b, k) => { let below = 0; return b.parts.map((p) => { const top = y(below + p.v), bottom = y(below); below += p.v; return { key: `${p.id}:${b.t}`, k, tone: p.tone, x: x(b.t) + 0.5, y: top, w: barW, h: Math.max(0, bottom - top) }; }); }));
  const tLabel = $derived(formatTime ?? defaultTimeLabel(cfg.locale, xspan));
  const xTicks = $derived(timeTicks(x0, x1).map((t) => ({ t, label: tLabel(t) })));
  const bucketAt = (clientX: number, el: HTMLElement) => { const r = el.getBoundingClientRect(); const t = x0 + ((clientX - r.left - pad.left) / (plotW || 1)) * xspan; const k = Math.floor((t - x0) / step); return k >= 0 && k * step + x0 < x1 ? k : null; };
  const bucketStart = (k: number) => x0 + k * step;
  const kOf = (t: number) => Math.floor((t - x0) / step);
  const hovered = $derived(hover === null ? null : buckets.find((b) => kOf(b.t) === hover) ?? { t: bucketStart(hover), parts: visible.map((s) => ({ id: s.id, label: s.label, tone: s.tone, v: 0 })), total: 0 });
  const setBrush = (a: number | null, b: number | null) => { const next = a === null || b === null ? null : { from: bucketStart(Math.min(a, b)), to: bucketStart(Math.max(a, b)) + step }; brush = next; onbrush?.(next); };
  const onmove = (e: PointerEvent) => { const k = bucketAt(e.clientX, e.currentTarget as HTMLElement); if (drag) { if (Math.abs(e.clientX - drag.x) > 3) drag.moved = true; if (k !== null && drag.moved) { drag.b = k; brush = { from: bucketStart(Math.min(drag.a, k)), to: bucketStart(Math.max(drag.a, k)) + step }; } } hover = k; };
  const ondown = (e: PointerEvent) => { if (e.button !== 0) return; const k = bucketAt(e.clientX, e.currentTarget as HTMLElement); if (k === null) return; (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId); drag = { a: k, b: k, x: e.clientX, moved: false }; };
  const onup = () => { if (!drag) return; const d = drag; drag = null; if (d.moved) setBrush(d.a, d.b); else onpick?.(bucketStart(d.a)); };
  const onkey = (e: KeyboardEvent) => {
    const n = Math.ceil(xspan / step);
    if (e.key === 'Escape') { hover = null; if (brush) setBrush(null, null); return; }
    if (e.key === 'Enter' && hover !== null) { onpick?.(bucketStart(hover)); return; }
    const d = e.key === 'ArrowRight' ? 1 : e.key === 'ArrowLeft' ? -1 : 0;
    if (!d) return;
    e.preventDefault();
    const next = hover === null ? (d > 0 ? 0 : n - 1) : Math.min(n - 1, Math.max(0, hover + d));
    if (e.shiftKey) { const anchor = brush ? (hover !== null && kOf(brush.from) === hover ? kOf(brush.to) - 1 : kOf(brush.from)) : (hover ?? next); setBrush(anchor, next); }
    hover = next;
  };
  const toggle = (id: string) => { hidden = hidden.includes(id) ? hidden.filter((h) => h !== id) : [...hidden, id]; };
  const legendKeys = $derived(toned.map((s) => ({ id: s.id, label: s.label, tone: s.tone, value: format(s.total) + unit, off: hidden.includes(s.id) })));
  const tipLeft = $derived(hover === null ? 0 : Math.min(Math.max(x(bucketStart(hover)) + barW / 2, pad.left), width - 8));
  const brushX = $derived(brush ? Math.max(pad.left, x(brush.from)) : 0);
  const brushW = $derived(brush ? Math.max(0, Math.min(width - pad.right, x(brush.to)) - brushX) : 0);
  const tipRows = $derived(hovered ? [...hovered.parts.map((r) => ({ id: r.id, label: r.label, tone: r.tone, value: format(r.v) + unit })), ...(hovered.parts.length > 1 ? [{ id: '__total', label: 'Total', tone: 'neutral' as ChartTone, value: format(hovered.total) + unit }] : [])] : []);
</script>

<ChartFrame {label} {status} {message} {height} legend={legend ? legendKeys : []} ontoggle={toggle} bind:width class={className}>
  <!-- svelte-ignore a11y_no_noninteractive_element_interactions, a11y_no_noninteractive_tabindex -->
  <div role="group" aria-label={label} tabindex="0" class={cn('h-full w-full rounded-md outline-none focus-visible:ring-focus', drag ? 'cursor-col-resize' : 'cursor-crosshair')} onpointermove={onmove} onpointerleave={() => { if (!drag) hover = null; }} onpointerdown={ondown} onpointerup={onup} onpointercancel={() => (drag = null)} onkeydown={onkey} onblur={() => (hover = null)}>
    <svg {width} {height} viewBox="0 0 {width} {height}" role="img" aria-label={label} class="overflow-visible">
      {#each ticks as tk (tk)}
        <line x1={pad.left} x2={width - pad.right} y1={y(tk)} y2={y(tk)} stroke="var(--chart-grid)" />
        <text x={pad.left - 8} y={y(tk)} text-anchor="end" dominant-baseline="middle" fill="var(--chart-axis)" class="text-[11px] tabular">{format(tk)}{unit}</text>
      {/each}
      {#each xTicks as tk, k (k)}<text x={x(tk.t)} y={height - 6} text-anchor="middle" fill="var(--chart-axis)" class="text-[11px] tabular">{tk.label}</text>{/each}
      {#if hover !== null}<rect x={x(bucketStart(hover))} y={pad.top} width={barW + 1} height={plotH} fill="var(--surface-control-hover)" rx="2" />{/if}
      {#each bars as b (b.key)}<rect x={b.x} y={b.y} width={b.w} height={b.h} rx="1" fill={toneVar(b.tone)} fill-opacity={brush !== null && (b.x + b.w / 2 < brushX || b.x + b.w / 2 > brushX + brushW) ? 0.3 : 1} />{/each}
      {#if brush && brushW > 0}<rect x={brushX} y={pad.top} width={brushW} height={plotH} fill="var(--accent)" fill-opacity="0.08" stroke="var(--accent)" stroke-opacity="0.6" rx="2" />{/if}
    </svg>
  </div>
  {#snippet tooltip()}
    {#if hovered}<ChartTip title={tLabel(hovered.t)} rows={tipRows} left={tipLeft} flip={tipLeft > width * 0.6} />{/if}
  {/snippet}
</ChartFrame>
