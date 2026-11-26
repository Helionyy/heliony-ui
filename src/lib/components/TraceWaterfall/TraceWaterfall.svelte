<script lang="ts" module>
  export type TraceSpan = { id: string; parentId: string | null; name: string; service?: string; startMs: number; durationMs: number; status: 'ok' | 'error' | 'unset'; attributes?: Record<string, unknown> };
</script>

<script lang="ts">
  import ChevronRight from '@lucide/svelte/icons/chevron-right';
  import TriangleAlert from '@lucide/svelte/icons/triangle-alert';
  import type { ChartTone } from '../../types.js';
  import { cn } from '../../utils/cn.js';
  import { useStrings } from '../../i18n/context.svelte.js';
  import { formatDuration } from '../../utils/format.js';
  import { CHART_TONES, toneVar } from '../../charts/shared.js';
  import ChartTip from '../../charts/ChartTip.svelte';

  type Row = { span: TraceSpan; depth: number; hasChildren: boolean };
  type Props = { spans: TraceSpan[]; totalMs?: number; selected?: string | null; collapsed?: string[]; maxRows?: number; label?: string; format?: (ms: number) => string; onselect?: (span: TraceSpan) => void; class?: string };
  let { spans, totalMs, selected = $bindable(null), collapsed = $bindable([]), maxRows = 500, label, format = (ms) => (ms < 1 ? `${ms.toFixed(2)} ms` : ms < 10 ? `${ms.toFixed(1)} ms` : formatDuration(ms)), onselect, class: className }: Props = $props();
  const t = useStrings();
  let root = $state<HTMLElement | null>(null);
  let hover = $state<string | null>(null);
  let focused = $state<string | null>(null);
  const total = $derived(totalMs ?? Math.max(1, ...spans.map((s) => s.startMs + s.durationMs)));
  const services = $derived.by(() => { const map = new Map<string, ChartTone>(); for (const s of spans) if (s.service && !map.has(s.service)) map.set(s.service, CHART_TONES[map.size % CHART_TONES.length]!); return map; });
  const tree = $derived.by(() => {
    const ids = new Set(spans.map((s) => s.id));
    const kids = new Map<string | null, TraceSpan[]>();
    for (const s of spans) { const parent = s.parentId !== null && ids.has(s.parentId) ? s.parentId : null; const list = kids.get(parent) ?? []; list.push(s); kids.set(parent, list); }
    for (const list of kids.values()) list.sort((a, b) => a.startMs - b.startMs);
    const out: Row[] = [];
    const walk = (parent: string | null, depth: number) => { for (const s of kids.get(parent) ?? []) { const children = kids.get(s.id) ?? []; out.push({ span: s, depth, hasChildren: children.length > 0 }); if (children.length && !collapsed.includes(s.id)) walk(s.id, depth + 1); } };
    walk(null, 0);
    return out;
  });
  const rows = $derived(tree.slice(0, maxRows));
  const truncated = $derived(tree.length - rows.length);
  const ticks = $derived.by(() => { const steps = [0.1, 0.2, 0.5, 1, 2, 5, 10, 20, 50, 100, 200, 500, 1000, 2000, 5000, 10000, 30000, 60000]; const s = steps.find((v) => total / v <= 6) ?? 60000; const out: number[] = []; for (let x = 0; x <= total; x += s) out.push(x); return out; });
  const pct = (ms: number) => `${Math.min(100, Math.max(0, (ms / total) * 100))}%`;
  const tone = (s: TraceSpan): ChartTone => (s.status === 'error' ? 'danger' : (s.service && services.get(s.service)) || 'neutral');
  const toggleCollapse = (id: string) => { collapsed = collapsed.includes(id) ? collapsed.filter((c) => c !== id) : [...collapsed, id]; };
  const pick = (s: TraceSpan) => { selected = s.id; onselect?.(s); };
  const items = () => Array.from(root?.querySelectorAll<HTMLElement>('[role="treeitem"]') ?? []);
  function onkey(e: KeyboardEvent, r: Row) {
    const list = items();
    const i = list.indexOf(e.currentTarget as HTMLElement);
    switch (e.key) {
      case 'ArrowDown': list[Math.min(i + 1, list.length - 1)]?.focus(); break;
      case 'ArrowUp': list[Math.max(i - 1, 0)]?.focus(); break;
      case 'Home': list[0]?.focus(); break;
      case 'End': list[list.length - 1]?.focus(); break;
      case 'ArrowRight': if (r.hasChildren && collapsed.includes(r.span.id)) toggleCollapse(r.span.id); else list[i + 1]?.focus(); break;
      case 'ArrowLeft': if (r.hasChildren && !collapsed.includes(r.span.id)) toggleCollapse(r.span.id); else { const p = rows.slice(0, i).reverse().find((x) => x.depth < r.depth); if (p) list[rows.indexOf(p)]?.focus(); } break;
      case 'Enter': case ' ': pick(r.span); break;
      default: return;
    }
    e.preventDefault();
  }
  const tipId = $derived(hover ?? focused);
  const tipSpan = $derived(rows.find((r) => r.span.id === tipId)?.span ?? null);
  const tipRows = $derived(tipSpan ? [
    ...(tipSpan.service ? [{ id: 'svc', label: 'Service', tone: tone(tipSpan), value: tipSpan.service }] : []),
    { id: 'dur', label: 'Durée', tone: 'neutral' as ChartTone, value: format(tipSpan.durationMs) },
    { id: 'start', label: 'Début', tone: 'neutral' as ChartTone, value: format(tipSpan.startMs) },
    { id: 'share', label: 'Part', tone: 'neutral' as ChartTone, value: `${Math.round((tipSpan.durationMs / total) * 1000) / 10} %` },
    ...(tipSpan.status === 'error' ? [{ id: 'st', label: 'Statut', tone: 'danger' as ChartTone, value: t.severity.error }] : []),
  ] : []);
  let laneWidth = $state(0);
</script>

<div bind:this={root} role="tree" aria-label={label} class={cn('relative min-w-0 overflow-hidden rounded-lg border border-line-subtle bg-surface-base text-caption', className)}>
  <div aria-hidden="true" class="grid grid-cols-[minmax(12rem,30%)_1fr] border-b border-line-subtle bg-surface-sunken">
    <div class="h-7"></div>
    <div class="relative h-7" bind:clientWidth={laneWidth}>{#each ticks as tk (tk)}<span class="absolute top-1.5 -translate-x-1/2 tabular text-fg-tertiary" style={`left:${pct(tk)}`}>{format(tk)}</span>{/each}</div>
  </div>
  {#each rows as r, i (r.span.id)}
    {@const s = r.span}
    {@const tn = tone(s)}
    <!-- svelte-ignore a11y_click_events_have_key_events -->
    <div role="treeitem" aria-level={r.depth + 1} aria-selected={selected === s.id} aria-expanded={r.hasChildren ? !collapsed.includes(s.id) : undefined} tabindex={selected === s.id || (!selected && i === 0) ? 0 : -1}
      class={cn('group/row grid h-7 grid-cols-[minmax(12rem,30%)_1fr] items-center border-b border-line-subtle/60 outline-none transition-colors duration-fast hover:bg-surface-control-hover focus-visible:bg-surface-control-hover', selected === s.id && 'bg-surface-control')}
      onclick={() => pick(s)} onkeydown={(e) => onkey(e, r)} onpointerenter={() => (hover = s.id)} onpointerleave={() => (hover = null)} onfocus={() => (focused = s.id)} onblur={() => (focused = null)}>
      <div class="flex min-w-0 items-center gap-1 pe-2" style={`padding-inline-start:${r.depth * 1 + 0.5}rem`}>
        <button type="button" tabindex="-1" aria-hidden="true" disabled={!r.hasChildren} class="flex size-4 shrink-0 items-center justify-center text-fg-tertiary disabled:opacity-0" onclick={(e) => { e.stopPropagation(); toggleCollapse(s.id); }}><ChevronRight class={cn('size-3.5 transition-transform duration-fast', !collapsed.includes(s.id) && 'rotate-90')} /></button>
        <span class={cn('min-w-0 truncate font-mono text-code', s.status === 'error' ? 'text-danger-fg' : 'text-fg-primary')}>{s.name}</span>
        {#if s.service}<span class="hidden shrink-0 items-center gap-1 text-fg-tertiary sm:inline-flex"><span aria-hidden="true" class="size-1.5 rounded-full" style={`background:${toneVar(tn)}`}></span>{s.service}</span>{/if}
        <span class="ms-auto shrink-0 tabular text-fg-tertiary">{format(s.durationMs)}</span>
      </div>
      <div class="relative h-full">
        {#each ticks as tk (tk)}<i class="absolute inset-y-0 w-px bg-line-subtle" style={`left:${pct(tk)}`}></i>{/each}
        <div class="absolute top-1.5 flex h-4 items-center justify-end rounded-xs px-1" style={`left:${pct(s.startMs)};width:max(${pct(s.durationMs)}, 3px);background:${toneVar(tn)};opacity:${s.status === 'error' ? 1 : 0.85}`}>
          {#if s.status === 'error'}<TriangleAlert class="size-3 text-fg-inverse" aria-label={t.severity.error} />{/if}
        </div>
        {#if tipId === s.id && tipSpan}
          <ChartTip title={s.name} rows={tipRows} left={(s.startMs / total > 0.6 ? s.startMs : s.startMs + s.durationMs) / total * laneWidth} flip={s.startMs / total > 0.6} top={-4} />
        {/if}
      </div>
    </div>
  {/each}
  {#if truncated > 0}<p class="px-3 py-2 text-caption text-fg-tertiary">{truncated} spans · maxRows = {maxRows}</p>{/if}
</div>
