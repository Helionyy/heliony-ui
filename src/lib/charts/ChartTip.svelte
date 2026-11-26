<script lang="ts">
  import type { ChartTone } from '../types.js';
  import { cn } from '../utils/cn.js';
  import { toneVar } from './shared.js';

  type Row = { id: string; label: string; tone: ChartTone; value: string };
  type Props = { title?: string; rows: Row[]; left: number; flip?: boolean; top?: number };
  let { title, rows, left, flip = false, top = 8 }: Props = $props();
</script>

<div role="status" class={cn('hy-enter pointer-events-none absolute z-10 min-w-36 rounded-md border border-line-subtle bg-surface-overlay px-2.5 py-2 text-caption shadow-overlay', flip ? '-translate-x-[calc(100%+0.75rem)]' : 'translate-x-3')} style={`left:${left}px;top:${top}px`}>
  {#if title}<p class="mb-1 font-medium text-fg-primary">{title}</p>{/if}
  <div class="flex flex-col gap-1">
    {#each rows as r (r.id)}
      <div class="flex items-center gap-2">
        <span aria-hidden="true" class="size-2 shrink-0 rounded-[2px]" style={`background:${toneVar(r.tone)}`}></span>
        <span class="flex-1 text-fg-secondary">{r.label}</span>
        <span class="font-medium tabular text-fg-primary">{r.value}</span>
      </div>
    {/each}
  </div>
</div>
