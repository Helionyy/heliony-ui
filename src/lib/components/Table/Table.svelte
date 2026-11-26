<script lang="ts" module>
  export const tableClasses = {
    wrap: 'relative w-full overflow-x-auto rounded-lg border border-line-subtle bg-surface-base',
    table: 'w-full caption-bottom border-collapse text-body',
    head: 'bg-surface-sunken text-label text-fg-tertiary [&_th]:font-medium',
    th: 'whitespace-nowrap px-3 text-start align-middle first:ps-4 last:pe-4',
    row: 'border-t border-line-subtle transition-colors duration-fast',
    rowInteractive: 'cursor-pointer outline-none hover:bg-surface-control-hover focus-visible:bg-surface-control-hover aria-selected:bg-surface-control data-selected:bg-surface-control',
    td: 'px-3 align-middle text-fg-primary first:ps-4 last:pe-4',
    num: 'text-end tabular',
    mono: 'font-mono text-code',
  } as const;
  export const rowHeight = { compact: 'h-row-compact', default: 'h-row-default', comfortable: 'h-row-comfortable' } as const;
  export type TableColumn<R = Record<string, unknown>> = { key: string; label: string; align?: 'start' | 'end'; width?: string; mono?: boolean; format?: (value: unknown, row: R) => string };
</script>

<script lang="ts" generics="Row extends Record<string, unknown>">
  import type { Snippet } from 'svelte';
  import type { Density } from '../../types.js';
  import { cn } from '../../utils/cn.js';
  import { useStrings } from '../../i18n/context.svelte.js';

  type Props = {
    columns: TableColumn<Row>[];
    rows: Row[];
    density?: Density;
    caption?: string;
    rowKey?: (row: Row, index: number) => string | number;
    selected?: string | number | null;
    emptyText?: string;
    bordered?: boolean;
    sticky?: boolean;
    cell?: Snippet<[{ row: Row; column: TableColumn<Row>; value: unknown }]>;
    onselect?: (row: Row, index: number) => void;
    class?: string;
  };
  let { columns, rows, density = 'default', caption, rowKey = (_, i) => i, selected = $bindable(null), emptyText, bordered = true, sticky = false, cell, onselect, class: className }: Props = $props();
  const t = useStrings();
  const text = (row: Row, c: TableColumn<Row>) => { const v = row[c.key]; return c.format ? c.format(v, row) : v === null || v === undefined || v === '' ? '—' : String(v); };
  const pick = (row: Row, i: number) => { if (!onselect) return; selected = rowKey(row, i); onselect(row, i); };
</script>

<div class={cn(tableClasses.wrap, !bordered && 'rounded-none border-0', className)}>
  <table class={tableClasses.table}>
    {#if caption}<caption class="hy-visually-hidden">{caption}</caption>{/if}
    <thead class={cn(tableClasses.head, sticky && 'sticky top-0 z-sticky')}>
      <tr class={rowHeight[density === 'comfortable' ? 'default' : 'compact']}>
        {#each columns as c (c.key)}<th scope="col" class={cn(tableClasses.th, c.align === 'end' && 'text-end')} style={c.width ? `width:${c.width}` : undefined}>{c.label}</th>{/each}
      </tr>
    </thead>
    <tbody>
      {#each rows as row, i (rowKey(row, i))}
        <tr class={cn(tableClasses.row, rowHeight[density], onselect && tableClasses.rowInteractive)} tabindex={onselect ? 0 : undefined} aria-selected={onselect ? selected === rowKey(row, i) : undefined}
          onclick={() => pick(row, i)} onkeydown={(e) => { if (onselect && (e.key === 'Enter' || e.key === ' ')) { e.preventDefault(); pick(row, i); } }}>
          {#each columns as c (c.key)}
            <td class={cn(tableClasses.td, c.align === 'end' && tableClasses.num, c.mono && tableClasses.mono)}>
              {#if cell}{@render cell({ row, column: c, value: row[c.key] })}{:else}{text(row, c)}{/if}
            </td>
          {/each}
        </tr>
      {:else}
        <tr><td colspan={columns.length} class="px-4 py-8 text-center text-body text-fg-tertiary">{emptyText ?? t.table.noResults}</td></tr>
      {/each}
    </tbody>
  </table>
</div>
