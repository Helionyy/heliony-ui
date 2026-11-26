<script lang="ts">
  import type { ChartTone, DataStatus } from '../../types.js';
  import { useHeliony } from '../../i18n/context.svelte.js';
  import { CHART_TONES, defaultTimeLabel, niceTicks, timeTicks, toneVar, type ChartBand, type ChartSeries, type ChartThreshold } from '../../charts/shared.js';
  import ChartFrame from '../../charts/ChartFrame.svelte';
  import ChartTip from '../../charts/ChartTip.svelte';

  type Props = {
    series: ChartSeries[]; labels?: string[]; from?: number; to?: number; min?: number; max?: number; unit?: string;
    format?: (v: number) => string; formatTime?: (t: number) => string; height?: number; area?: boolean; rows?: number; legend?: boolean;
    label?: string; thresholds?: ChartThreshold[]; bands?: ChartBand[]; status?: DataStatus; message?: string; interactive?: boolean;
    onhover?: (t: number | null) => void; class?: string;
  };
  let { series, labels = [], from, to, min, max, unit = '', format = (v) => String(Math.round(v)), formatTime, height = 200, area = true, rows = 4, legend = true, label, thresholds = [], bands = [], status = 'ready', message, interactive = true, onhover, class: className }: Props = $props();
  const cfg = useHeliony();
  const pad = { top: 8, right: 8, bottom: 24, left: 44 };
  let width = $state(0);
  let hidden = $state<string[]>([]);
  let hover = $state<number | null>(null);
  const timeMode = $derived(series.some((s) => s.points && s.points.length));
  const norm = $derived(series.map((s, i) => ({ ...s, tone: (s.tone ?? CHART_TONES[i % CHART_TONES.length]) as ChartTone, pts: s.points ? s.points.map((p) => ({ t: p.t, v: p.v })) : (s.values ?? []).map((v, k) => ({ t: k, v })) })));
  const visible = $derived(norm.filter((s) => !hidden.includes(s.id)));
  const allT = $derived(norm.flatMap((s) => s.pts.map((p) => p.t)));
  const x0 = $derived(from ?? (allT.length ? Math.min(...allT) : 0));
  const x1 = $derived(to ?? (allT.length ? Math.max(...allT) : 1));
  const xspan = $derived(x1 - x0 || 1);
  const allV = $derived(visible.flatMap((s) => s.pts.map((p) => p.v)).filter((v): v is number => v !== null && Number.isFinite(v)));
  const lo = $derived(min ?? Math.min(0, ...(allV.length ? allV : [0]), ...thresholds.map((t) => t.value)));
  const hi = $derived(max ?? (allV.length ? Math.max(...allV, ...thresholds.map((t) => t.value)) : 1));
  const yspan = $derived(hi - lo || 1);
  const plotW = $derived(Math.max(0, width - pad.left - pad.right));
  const plotH = $derived(Math.max(0, height - pad.top - pad.bottom));
  const x = (t: number) => pad.left + ((t - x0) / xspan) * plotW;
  const y = (v: number) => pad.top + plotH - ((Math.min(Math.max(v, lo), hi) - lo) / yspan) * plotH;
  const ticks = $derived(niceTicks(lo, hi, rows));
  const drawn = $derived(visible.map((s) => {
    const segs: string[] = [];
    let d = '';
    for (const p of s.pts) {
      if (p.v === null || !Number.isFinite(p.v)) { if (d) { segs.push(d); d = ''; } continue; }
      d += `${d ? 'L' : 'M'}${x(p.t).toFixed(1)} ${y(p.v).toFixed(1)} `;
    }
    if (d) segs.push(d);
    const base = y(Math.max(lo, 0)).toFixed(1);
    const areas = segs.map((seg) => { const parts = seg.trim().split(' '); const first = parts[0]!.slice(1); const lastX = parts[parts.length - 2]!.replace(/^[ML]/, ''); return `${seg} L${lastX} ${base} L${first} ${base} Z`; });
    const lastPoint = [...s.pts].reverse().find((p) => p.v !== null);
    return { ...s, segs, areas, last: lastPoint?.v ?? undefined, cx: lastPoint ? x(lastPoint.t) : 0, cy: lastPoint && lastPoint.v !== null ? y(lastPoint.v) : 0 };
  }));
  const tLabel = $derived(formatTime ?? defaultTimeLabel(cfg.locale, x1 - x0));
  const xTicks = $derived(timeMode ? timeTicks(x0, x1).map((t) => ({ t, label: tLabel(t) })) : labels.map((l, k) => ({ t: labels.length > 1 ? x0 + (k / (labels.length - 1)) * xspan : (x0 + x1) / 2, label: l })));
  const xs = $derived([...new Set(visible.flatMap((s) => s.pts.map((p) => p.t)))].sort((a, b) => a - b));
  const hoverRows = $derived(hover === null ? [] : visible.map((s) => { const p = s.pts.find((q) => q.t === hover); return { id: s.id, label: s.label, tone: s.tone, value: p && p.v !== null ? (s.format ?? format)(p.v) + (s.unit ?? unit) : '—' }; }));
  const hoverTitle = $derived(hover === null ? '' : timeMode ? new Intl.DateTimeFormat(cfg.locale, { dateStyle: 'medium', timeStyle: 'short' }).format(new Date(hover)) : labels[Math.round(hover)] ?? String(hover));
  const nearest = (clientX: number, el: HTMLElement) => { if (!xs.length) return null; const r = el.getBoundingClientRect(); const t = x0 + ((clientX - r.left - pad.left) / (plotW || 1)) * xspan; let best = xs[0]!; for (const c of xs) if (Math.abs(c - t) < Math.abs(best - t)) best = c; return best; };
  const setHover = (t: number | null) => { if (t !== hover) { hover = t; onhover?.(t); } };
  const onkey = (e: KeyboardEvent) => {
    if (!xs.length) return;
    if (e.key === 'Escape') return setHover(null);
    const d = e.key === 'ArrowRight' ? 1 : e.key === 'ArrowLeft' ? -1 : 0;
    if (!d) return;
    e.preventDefault();
    const i = hover === null ? (d > 0 ? 0 : xs.length - 1) : Math.min(xs.length - 1, Math.max(0, xs.indexOf(hover) + d));
    setHover(xs[i]!);
  };
  const legendKeys = $derived(norm.map((s) => { const d = drawn.find((k) => k.id === s.id); return { id: s.id, label: s.label, tone: s.tone, value: d && d.last !== undefined ? (s.format ?? format)(d.last) + (s.unit ?? unit) : undefined, off: hidden.includes(s.id) }; }));
  const toggle = (id: string) => { hidden = hidden.includes(id) ? hidden.filter((h) => h !== id) : [...hidden, id]; };
  const tipLeft = $derived(hover === null ? 0 : Math.min(Math.max(x(hover), pad.left), width - 8));
</script>

<ChartFrame {label} {status} {message} {height} legend={legend ? legendKeys : []} ontoggle={toggle} bind:width class={className}>
  <!-- svelte-ignore a11y_no_noninteractive_element_interactions, a11y_no_noninteractive_tabindex -->
  <div role="group" aria-label={label} tabindex={interactive ? 0 : undefined} class="h-full w-full outline-none focus-visible:ring-focus rounded-md" onpointermove={(e) => interactive && setHover(nearest(e.clientX, e.currentTarget))} onpointerleave={() => setHover(null)} onkeydown={interactive ? onkey : undefined} onblur={() => setHover(null)}>
    <svg {width} {height} viewBox="0 0 {width} {height}" role="img" aria-label={label} class="overflow-visible">
      {#each bands as b, k (k)}<rect x={x(Math.max(b.from, x0))} y={pad.top} width={Math.max(0, x(Math.min(b.to, x1)) - x(Math.max(b.from, x0)))} height={plotH} fill={toneVar(b.tone ?? 'neutral')} fill-opacity="0.08" />{/each}
      {#each ticks as tk (tk)}
        <line x1={pad.left} x2={width - pad.right} y1={y(tk)} y2={y(tk)} stroke="var(--chart-grid)" />
        <text x={pad.left - 8} y={y(tk)} text-anchor="end" dominant-baseline="middle" fill="var(--chart-axis)" class="text-[11px] tabular">{format(tk)}{unit}</text>
      {/each}
      {#each xTicks as tk, k (k)}<text x={x(tk.t)} y={height - 6} text-anchor={!timeMode && k === 0 ? 'start' : !timeMode && k === xTicks.length - 1 ? 'end' : 'middle'} fill="var(--chart-axis)" class="text-[11px] tabular">{tk.label}</text>{/each}
      {#each thresholds as th, k (k)}
        <line x1={pad.left} x2={width - pad.right} y1={y(th.value)} y2={y(th.value)} stroke={toneVar(th.tone ?? 'warning')} stroke-dasharray="4 3" />
        {#if th.label}<text x={width - pad.right} y={y(th.value) - 4} text-anchor="end" fill={toneVar(th.tone ?? 'warning')} class="text-[11px]">{th.label}</text>{/if}
      {/each}
      {#each drawn as s (s.id)}
        <g>
          {#if area}{#each s.areas as a, k (k)}<path d={a} fill={toneVar(s.tone)} fill-opacity="0.1" />{/each}{/if}
          {#each s.segs as seg, k (k)}<path d={seg} fill="none" stroke={toneVar(s.tone)} stroke-width="1.75" stroke-linejoin="round" stroke-linecap="round" />{/each}
          {#if s.last !== undefined && hover === null}<circle cx={s.cx} cy={s.cy} r="3" fill={toneVar(s.tone)} />{/if}
        </g>
      {/each}
      {#if hover !== null}
        <line x1={x(hover)} x2={x(hover)} y1={pad.top} y2={pad.top + plotH} stroke="var(--line-strong)" />
        {#each visible as s (s.id)}{@const p = s.pts.find((q) => q.t === hover)}{#if p && p.v !== null}<circle cx={x(p.t)} cy={y(p.v)} r="3.5" fill={toneVar(s.tone)} stroke="var(--surface-base)" stroke-width="2" />{/if}{/each}
      {/if}
    </svg>
  </div>
  {#snippet tooltip()}
    {#if hover !== null && hoverRows.length}<ChartTip title={hoverTitle} rows={hoverRows} left={tipLeft} flip={x(hover) > width * 0.6} />{/if}
  {/snippet}
</ChartFrame>
