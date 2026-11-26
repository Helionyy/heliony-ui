<script lang="ts">
  import Copy from '@lucide/svelte/icons/copy';
  import Check from '@lucide/svelte/icons/check';
  import { cn } from '../../utils/cn.js';
  import { useStrings } from '../../i18n/context.svelte.js';

  export type DescriptionItem = { label: string; value: string; mono?: boolean; href?: string; copy?: boolean; muted?: boolean };

  type Props = { items: DescriptionItem[]; columns?: 1 | 2 | 3; layout?: 'stacked' | 'inline'; label?: string; divided?: boolean; oncopy?: (item: DescriptionItem) => void; class?: string };
  let { items, columns = 1, layout = 'stacked', label, divided = false, oncopy, class: className }: Props = $props();
  const t = useStrings();
  let copied = $state<string | null>(null);
  async function copy(item: DescriptionItem) {
    try { await navigator.clipboard.writeText(item.value); copied = item.label; setTimeout(() => (copied = null), 1500); } catch { copied = null; }
    oncopy?.(item);
  }
  const cols = { 1: 'grid-cols-1', 2: 'sm:grid-cols-2', 3: 'sm:grid-cols-2 lg:grid-cols-3' } as const;
</script>

<dl aria-label={label} class={cn('grid gap-x-6', cols[columns], divided ? 'gap-y-0 divide-y divide-line-subtle' : 'gap-y-3', className)}>
  {#each items as item (item.label)}
    <div class={cn('group/item flex min-w-0', layout === 'inline' ? 'items-baseline justify-between gap-4' : 'flex-col gap-0.5', divided && 'py-2.5')}>
      <dt class="shrink-0 text-label text-fg-tertiary">{item.label}</dt>
      <dd class={cn('flex min-w-0 items-center gap-1.5 text-body', item.muted ? 'text-fg-secondary' : 'text-fg-primary', item.mono && 'font-mono text-code tabular', layout === 'inline' && 'text-end')}>
        {#if item.href}<a href={item.href} class="truncate text-accent underline-offset-4 hover:underline">{item.value}</a>{:else}<span class="truncate">{item.value}</span>{/if}
        {#if item.copy}
          <button type="button" class="inline-flex size-5 shrink-0 items-center justify-center rounded-xs text-fg-tertiary opacity-0 outline-none transition-opacity duration-fast group-hover/item:opacity-100 hover:text-fg-primary focus-visible:opacity-100 focus-visible:ring-focus" aria-label={`${t.common.copy} ${item.label}`} onclick={() => copy(item)}>
            {#if copied === item.label}<Check class="size-3.5 text-success" aria-hidden="true" />{:else}<Copy class="size-3.5" aria-hidden="true" />{/if}
          </button>
        {/if}
      </dd>
    </div>
  {/each}
</dl>
