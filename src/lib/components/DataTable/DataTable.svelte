<script lang="ts" generics="Row extends Record<string, unknown>">
  import type { Snippet } from 'svelte';
  import { getCoreRowModel, getSortedRowModel, getFilteredRowModel, getPaginationRowModel, type ColumnDef, type SortingState, type VisibilityState, type RowSelectionState, type ColumnFiltersState, type Row as TRow } from '@tanstack/table-core';
  import ArrowUp from '@lucide/svelte/icons/arrow-up';
  import ArrowDown from '@lucide/svelte/icons/arrow-down';
  import ChevronsUpDown from '@lucide/svelte/icons/chevrons-up-down';
  import Columns3 from '@lucide/svelte/icons/columns-3';
  import Rows3 from '@lucide/svelte/icons/rows-3';
  import Search from '@lucide/svelte/icons/search';
  import type { DataStatus, Density } from '../../types.js';
  import { cn } from '../../utils/cn.js';
  import { useStrings } from '../../i18n/context.svelte.js';
  import { Below } from '../../utils/media.svelte.js';
  import { createSvelteTable } from '../../table/table.svelte.js';
  import FlexRender from '../../table/FlexRender.svelte';
  import { tableClasses, rowHeight } from '../Table/Table.svelte';
  import Checkbox from '../Checkbox/Checkbox.svelte';
  import Input from '../Input/Input.svelte';
  import Button from '../Button/Button.svelte';
  import Popover from '../Popover/Popover.svelte';
  import Segmented from '../Segmented/Segmented.svelte';
  import Pagination from '../Pagination/Pagination.svelte';
  import DataState from '../DataState/DataState.svelte';
  import Skeleton from '../Skeleton/Skeleton.svelte';

  type Props = {
    columns: ColumnDef<Row, unknown>[];
    rows: Row[];
    status?: DataStatus;
    density?: Density;
    rowId?: (row: Row) => string;
    sorting?: SortingState;
    columnVisibility?: VisibilityState;
    rowSelection?: RowSelectionState;
    globalFilter?: string;
    columnFilters?: ColumnFiltersState;
    pageSize?: number;
    paginate?: boolean;
    selectable?: boolean;
    searchable?: boolean;
    densityControl?: boolean;
    columnsControl?: boolean;
    sticky?: boolean;
    caption?: string;
    emptyTitle?: string;
    emptyText?: string;
    cardColumns?: string[];
    toolbar?: Snippet;
    card?: Snippet<[{ row: Row }]>;
    onselect?: (row: Row) => void;
    onopen?: (row: Row) => void;
    onretry?: () => void;
    class?: string;
  };
  let { columns, rows, status = 'ready', density = $bindable('default'), rowId, sorting = $bindable([]), columnVisibility = $bindable({}), rowSelection = $bindable({}), globalFilter = $bindable(''), columnFilters = $bindable([]), pageSize = 25, paginate = true, selectable = false, searchable = false, densityControl = false, columnsControl = false, sticky = false, caption, emptyTitle, emptyText, cardColumns, toolbar, card, onselect, onopen, onretry, class: className }: Props = $props();
  const t = useStrings();
  const narrow = new Below('md');
  let page = $state(1);

  const selectColumn: ColumnDef<Row, unknown> = {
    id: '__select', size: 36, enableSorting: false, enableHiding: false,
    header: ({ table }) => ({ kind: 'select-all', table }) as never,
    cell: ({ row }) => ({ kind: 'select-row', row }) as never,
  };
  const allColumns = $derived(selectable ? [selectColumn, ...columns] : columns);

  const table = createSvelteTable<Row>({
    get data() { return rows; },
    get columns() { return allColumns; },
    getRowId: (row, index) => (rowId ? rowId(row) : String(index)),
    state: {
      get sorting() { return sorting; },
      get columnVisibility() { return columnVisibility; },
      get rowSelection() { return rowSelection; },
      get globalFilter() { return globalFilter; },
      get columnFilters() { return columnFilters; },
      get pagination() { return { pageIndex: page - 1, pageSize: paginate ? pageSize : Math.max(rows.length, 1) }; },
    },
    onSortingChange: (u) => { sorting = typeof u === 'function' ? u(sorting) : u; },
    onColumnVisibilityChange: (u) => { columnVisibility = typeof u === 'function' ? u(columnVisibility) : u; },
    onRowSelectionChange: (u) => { rowSelection = typeof u === 'function' ? u(rowSelection) : u; },
    onGlobalFilterChange: (u) => { globalFilter = typeof u === 'function' ? u(globalFilter) : u; page = 1; },
    onColumnFiltersChange: (u) => { columnFilters = typeof u === 'function' ? u(columnFilters) : u; page = 1; },
    onPaginationChange: (u) => { const next = typeof u === 'function' ? u({ pageIndex: page - 1, pageSize }) : u; page = next.pageIndex + 1; },
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    get enableRowSelection() { return selectable; },
  });

  const total = $derived(table.getFilteredRowModel().rows.length);
  const selectedCount = $derived(Object.values(rowSelection).filter(Boolean).length);
  const hideable = $derived(table.getAllLeafColumns().filter((c) => c.getCanHide()));
  const densityOptions = $derived([{ value: 'compact', label: t.table.densityCompact }, { value: 'default', label: t.table.densityDefault }, { value: 'comfortable', label: t.table.densityComfortable }]);
  const hasToolbar = $derived(searchable || densityControl || columnsControl || toolbar || selectedCount > 0);
  const cardCols = $derived(cardColumns ?? table.getVisibleLeafColumns().filter((c) => c.id !== '__select').slice(0, 4).map((c) => c.id));
  const headerLabel = (col: { columnDef: { header?: unknown }; id: string }) => (typeof col.columnDef.header === 'string' ? col.columnDef.header : col.id);

  const activate = (row: TRow<Row>) => { onselect?.(row.original); };
  const open = (row: TRow<Row>) => { onopen?.(row.original); };
  const onkey = (e: KeyboardEvent, row: TRow<Row>) => {
    if (e.key === 'Enter') { e.preventDefault(); if (onopen) open(row); else activate(row); }
    else if (e.key === ' ') { e.preventDefault(); if (selectable) row.toggleSelected(); else activate(row); }
    else if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
      e.preventDefault();
      const tr = (e.currentTarget as HTMLElement)[e.key === 'ArrowDown' ? 'nextElementSibling' : 'previousElementSibling'] as HTMLElement | null;
      tr?.focus();
    }
  };
</script>

<div class={cn('flex min-w-0 flex-col gap-3', className)}>
  {#if hasToolbar}
    <div class="flex flex-wrap items-center gap-2">
      {#if searchable}<div class="w-full sm:w-64"><Input size="sm" icon={Search} placeholder={t.common.search} bind:value={globalFilter} aria-label={t.table.filter} /></div>{/if}
      {#if selectedCount > 0}<span class="text-caption tabular text-fg-secondary">{t.table.selected(selectedCount)}</span>{/if}
      {#if toolbar}{@render toolbar()}{/if}
      <div class="ms-auto flex items-center gap-2">
        {#if densityControl}<Segmented size="sm" bind:value={density as string} options={densityOptions} label={t.table.density} iconOnly={narrow.current} />{/if}
        {#if columnsControl}
          <Popover title={t.table.columns} align="end" width="14rem">
            {#snippet trigger({ props })}<Button {...props} size="sm" variant="secondary" icon={Columns3}>{t.table.columns}</Button>{/snippet}
            {#snippet children()}
              <div class="flex flex-col gap-2">
                {#each hideable as col (col.id)}
                  <Checkbox checked={col.getIsVisible()} label={headerLabel(col)} onchange={(v) => col.toggleVisibility(v)} />
                {/each}
              </div>
            {/snippet}
          </Popover>
        {/if}
      </div>
    </div>
  {/if}

  {#snippet cardBody(row: TRow<Row>)}
    {#if card}{@render card({ row: row.original })}{:else}
      {#each row.getVisibleCells().filter((c) => cardCols.includes(c.column.id)) as c, i (c.id)}
        <div class={cn('flex items-baseline justify-between gap-3', i === 0 ? 'text-body-strong text-fg-primary' : 'text-caption')}>
          {#if i > 0}<span class="text-fg-tertiary">{headerLabel(c.column)}</span>{/if}
          <span class={cn('min-w-0 truncate', i > 0 && 'text-fg-secondary tabular')}><FlexRender content={c.column.columnDef.cell} context={c.getContext()} /></span>
        </div>
      {/each}
    {/if}
  {/snippet}
  <DataState {status} {emptyTitle} {emptyText} {onretry} size="sm">
    {#snippet skeleton()}
      <div class={tableClasses.wrap}><div class="flex flex-col divide-y divide-line-subtle">{#each [0, 1, 2, 3, 4] as i (i)}<div class={cn('flex items-center gap-4 px-4', rowHeight[density])}><Skeleton shape="text" class="w-1/3" /><Skeleton shape="text" class="w-1/5" /><Skeleton shape="text" class="ms-auto w-16" /></div>{/each}</div></div>
    {/snippet}
    {#if narrow.current}
      <ul class="flex flex-col gap-2">
        {#each table.getRowModel().rows as row (row.id)}
          {@const cardClass = cn('flex w-full flex-col gap-1.5 rounded-lg border border-line-subtle bg-surface-raised p-3 text-start outline-none', row.getIsSelected() && 'border-selection')}
          <li>
            {#if onselect || onopen}
              <button type="button" class={cn(cardClass, 'transition-colors duration-fast hover:border-line-default focus-visible:ring-focus')} onclick={() => (onopen ? open(row) : activate(row))}>{@render cardBody(row)}</button>
            {:else}
              <div class={cardClass}>{@render cardBody(row)}</div>
            {/if}
          </li>
        {:else}
          <li class="py-8 text-center text-body text-fg-tertiary">{t.table.noResults}</li>
        {/each}
      </ul>
    {:else}
      <div class={tableClasses.wrap}>
        <table class={tableClasses.table}>
          {#if caption}<caption class="hy-visually-hidden">{caption}</caption>{/if}
          <thead class={cn(tableClasses.head, sticky && 'sticky top-0 z-sticky')}>
            {#each table.getHeaderGroups() as hg (hg.id)}
              <tr class={rowHeight.compact}>
                {#each hg.headers as header (header.id)}
                  {@const sorted = header.column.getIsSorted()}
                  {@const meta = header.column.columnDef.meta as { align?: 'start' | 'end'; mono?: boolean } | undefined}
                  <th scope="col" colspan={header.colSpan} aria-sort={sorted === 'asc' ? 'ascending' : sorted === 'desc' ? 'descending' : undefined} style={header.column.columnDef.size && header.column.id === '__select' ? `width:${header.column.columnDef.size}px` : undefined}
                    class={cn(tableClasses.th, meta?.align === 'end' && 'text-end')}>
                    {#if header.column.id === '__select'}
                      <Checkbox checked={table.getIsAllPageRowsSelected()} indeterminate={table.getIsSomePageRowsSelected() && !table.getIsAllPageRowsSelected()} onchange={(v) => table.toggleAllPageRowsSelected(v)} ariaLabel={t.table.selectAll} />
                    {:else if header.column.getCanSort()}
                      <button type="button" class={cn('-mx-1 inline-flex h-7 items-center gap-1 rounded-xs px-1 outline-none transition-colors duration-fast hover:text-fg-primary focus-visible:ring-focus', sorted && 'text-fg-primary', meta?.align === 'end' && 'flex-row-reverse')} onclick={header.column.getToggleSortingHandler()} aria-label={sorted === 'asc' ? t.table.sortDesc : t.table.sortAsc}>
                        <FlexRender content={header.column.columnDef.header} context={header.getContext()} />
                        {#if sorted === 'asc'}<ArrowUp class="size-3.5" aria-hidden="true" />{:else if sorted === 'desc'}<ArrowDown class="size-3.5" aria-hidden="true" />{:else}<ChevronsUpDown class="size-3.5 opacity-50" aria-hidden="true" />{/if}
                      </button>
                    {:else if !header.isPlaceholder}
                      <FlexRender content={header.column.columnDef.header} context={header.getContext()} />
                    {/if}
                  </th>
                {/each}
              </tr>
            {/each}
          </thead>
          <tbody>
            {#each table.getRowModel().rows as row (row.id)}
              <tr class={cn(tableClasses.row, rowHeight[density], (onselect || onopen || selectable) && tableClasses.rowInteractive)} tabindex={onselect || onopen || selectable ? 0 : undefined} data-selected={row.getIsSelected() || undefined} aria-selected={selectable ? row.getIsSelected() : undefined}
                onclick={() => activate(row)} ondblclick={() => open(row)} onkeydown={(e) => onkey(e, row)}>
                {#each row.getVisibleCells() as c (c.id)}
                  {@const meta = c.column.columnDef.meta as { align?: 'start' | 'end'; mono?: boolean } | undefined}
                  <td class={cn(tableClasses.td, meta?.align === 'end' && tableClasses.num, meta?.mono && tableClasses.mono)}>
                    {#if c.column.id === '__select'}
                      <Checkbox checked={row.getIsSelected()} disabled={!row.getCanSelect()} onchange={(v) => row.toggleSelected(v)} ariaLabel={t.table.selectRow} />
                    {:else}
                      <FlexRender content={c.column.columnDef.cell} context={c.getContext()} />
                    {/if}
                  </td>
                {/each}
              </tr>
            {:else}
              <tr><td colspan={allColumns.length} class="px-4 py-10 text-center text-body text-fg-tertiary">{t.table.noResults}</td></tr>
            {/each}
          </tbody>
        </table>
      </div>
    {/if}
    {#if paginate && total > pageSize}
      <div class="flex flex-wrap items-center justify-between gap-3">
        <span class="text-caption tabular text-fg-tertiary"><Rows3 class="me-1 inline size-3.5 align-[-2px]" aria-hidden="true" />{total}</span>
        <Pagination count={total} perPage={pageSize} bind:page compact={narrow.current} />
      </div>
    {/if}
  </DataState>
</div>
