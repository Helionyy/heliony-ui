<script lang="ts">
  import Check from '@lucide/svelte/icons/check';
  import { cn } from '../../utils/cn.js';
  import { useStrings } from '../../i18n/context.svelte.js';

  export type FacetItem = { value: string; label?: string; count?: number; active?: boolean; unavailable?: boolean; title?: string };

  type Props = { items: FacetItem[]; label?: string; density?: 'compact' | 'default'; mono?: boolean; format?: (count: number) => string; emptyText?: string; moreLabel?: string; onpick?: (item: FacetItem) => void; onmore?: () => void; class?: string };
  let { items, label, density = 'default', mono = false, format = (n) => String(n), emptyText, moreLabel, onpick, onmore, class: className }: Props = $props();
  const t = useStrings();
  let root = $state<HTMLUListElement | null>(null);
  const focusAt = (i: number) => root?.querySelectorAll<HTMLButtonElement>('[data-facet]')[Math.max(0, Math.min(items.length - 1, i))]?.focus();
  const onkey = (e: KeyboardEvent, i: number) => {
    const map: Record<string, number> = { ArrowDown: i + 1, ArrowUp: i - 1, Home: 0, End: items.length - 1 };
    if (e.key in map) { e.preventDefault(); focusAt(map[e.key]!); }
  };
</script>

<ul bind:this={root} aria-label={label} class={cn('flex min-w-0 flex-col gap-px', className)}>
  {#each items as item, i (item.value)}
    <li>
      <button type="button" data-facet aria-pressed={item.active ?? false} disabled={Boolean(item.unavailable) && !item.active} title={item.title} onclick={() => onpick?.(item)} onkeydown={(e) => onkey(e, i)}
        class={cn('group flex w-full items-center gap-2 rounded-sm px-2 text-start outline-none transition-colors duration-fast hover:bg-surface-control-hover focus-visible:ring-focus disabled:cursor-not-allowed disabled:opacity-(--opacity-disabled)', density === 'compact' ? 'h-7 text-caption' : 'h-8 text-body', item.active && 'bg-surface-control text-fg-primary')}>
        <span aria-hidden="true" class={cn('flex size-3.5 shrink-0 items-center justify-center rounded-xs border', item.active ? 'border-selection bg-selection text-fg-inverse' : 'border-line-control')}>{#if item.active}<Check class="size-2.5" strokeWidth={3} />{/if}</span>
        <span class={cn('min-w-0 flex-1 truncate', item.active ? 'text-fg-primary' : 'text-fg-secondary group-hover:text-fg-primary', mono && 'font-mono text-code')}>{item.label ?? item.value}</span>
        {#if item.count !== undefined}<span class="shrink-0 text-caption tabular text-fg-tertiary">{format(item.count)}</span>{/if}
      </button>
    </li>
  {:else}
    <li class="px-2 py-3 text-caption text-fg-tertiary">{emptyText ?? t.common.none}</li>
  {/each}
  {#if moreLabel && onmore}<li><button type="button" class="h-7 w-full rounded-sm px-2 text-start text-caption text-accent outline-none hover:underline focus-visible:ring-focus" onclick={onmore}>{moreLabel}</button></li>{/if}
</ul>
