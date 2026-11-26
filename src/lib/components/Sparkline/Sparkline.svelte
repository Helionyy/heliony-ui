<script lang="ts">
  import type { ChartTone } from '../../types.js';
  import { toneVar } from '../../charts/shared.js';
  import { cn } from '../../utils/cn.js';

  type Props = { values: number[]; tone?: ChartTone; width?: number | 'auto'; height?: number; area?: boolean; min?: number; max?: number; label?: string; class?: string };
  let { values, tone = 'accent', width: wanted = 96, height = 24, area = true, min, max, label, class: className }: Props = $props();
  let measured = $state(0);
  const width = $derived(typeof wanted === 'number' ? wanted : Math.max(0, measured));
  const lo = $derived(min ?? (values.length ? Math.min(...values) : 0));
  const hi = $derived(max ?? (values.length ? Math.max(...values) : 1));
  const points = $derived(values.map((v, i) => {
    const x = values.length > 1 ? (i / (values.length - 1)) * width : width / 2;
    const y = height - 1.5 - ((v - lo) / (hi - lo || 1)) * (height - 3);
    return `${x.toFixed(1)} ${y.toFixed(1)}`;
  }));
  const line = $derived(points.map((pt, i) => `${i ? 'L' : 'M'}${pt}`).join(' '));
  const fill = $derived(points.length ? `${line} L${width} ${height} L0 ${height} Z` : '');
  const color = $derived(toneVar(tone));
</script>

<span class={cn('inline-block align-middle leading-none', typeof wanted !== 'number' && 'block w-full', className)} bind:clientWidth={measured}>
  {#if width > 0}
    <svg viewBox="0 0 {width} {height}" {width} {height} role={label ? 'img' : undefined} aria-label={label} aria-hidden={label ? undefined : 'true'} class="overflow-visible">
      {#if area && fill}<path d={fill} fill={color} fill-opacity="0.12" />{/if}
      {#if line}<path d={line} fill="none" stroke={color} stroke-width="1.5" stroke-linejoin="round" stroke-linecap="round" />{/if}
    </svg>
  {/if}
</span>
