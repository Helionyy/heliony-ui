<script lang="ts">
  import { Pagination } from 'bits-ui';
  import ChevronLeft from '@lucide/svelte/icons/chevron-left';
  import ChevronRight from '@lucide/svelte/icons/chevron-right';
  import { cn } from '../../utils/cn.js';
  import { useStrings } from '../../i18n/context.svelte.js';
  import { buttonVariants } from '../Button/Button.svelte';

  type Props = { count: number; perPage?: number; page?: number; siblingCount?: number; size?: 'sm' | 'md'; showSummary?: boolean; compact?: boolean; onchange?: (page: number) => void; class?: string };
  let { count, perPage = 20, page = $bindable(1), siblingCount = 1, size = 'sm', showSummary = false, compact = false, onchange, class: className }: Props = $props();
  const t = useStrings();
  const total = $derived(Math.max(1, Math.ceil(count / perPage)));
  const nav = $derived(buttonVariants({ variant: 'ghost', size, iconOnly: true }));
</script>

<Pagination.Root {count} {perPage} {siblingCount} bind:page onPageChange={(p) => onchange?.(p)} class={cn('flex flex-wrap items-center gap-3', className)}>
  {#snippet children({ pages, currentPage })}
    {#if showSummary}<span class="text-caption tabular text-fg-tertiary">{t.table.pageOf(currentPage, total)}</span>{/if}
    <nav aria-label={t.pagination.label} class="flex items-center gap-1">
      <Pagination.PrevButton class={nav} aria-label={t.common.previous}><ChevronLeft aria-hidden="true" /></Pagination.PrevButton>
      {#if compact}
        <span class="px-2 text-body tabular text-fg-secondary">{t.table.pageOf(currentPage, total)}</span>
      {:else}
        {#each pages as p (p.key)}
          {#if p.type === 'ellipsis'}
            <span aria-hidden="true" class={cn('inline-flex items-center justify-center text-fg-tertiary', size === 'sm' ? 'size-control-sm' : 'size-control-md')}>…</span>
          {:else}
            <Pagination.Page page={p} aria-label={t.pagination.page(p.value)} aria-current={p.value === currentPage ? 'page' : undefined}
              class={cn(buttonVariants({ variant: p.value === currentPage ? 'secondary' : 'ghost', size, iconOnly: true }), 'tabular', p.value === currentPage && 'text-fg-primary')}>
              {p.value}
            </Pagination.Page>
          {/if}
        {/each}
      {/if}
      <Pagination.NextButton class={nav} aria-label={t.common.next}><ChevronRight aria-hidden="true" /></Pagination.NextButton>
    </nav>
  {/snippet}
</Pagination.Root>
