<script lang="ts">
  import X from '@lucide/svelte/icons/x';
  import type { IconComponent } from '../../types.js';
  import { cn } from '../../utils/cn.js';
  import { useStrings } from '../../i18n/context.svelte.js';

  type Props = { label: string; value: string; exclude?: boolean; icon?: IconComponent; removable?: boolean; title?: string; onremove?: () => void; ontoggle?: (exclude: boolean) => void; class?: string };
  let { label, value, exclude = false, icon, removable = true, title, onremove, ontoggle, class: className }: Props = $props();
  const t = useStrings();
  const Icon = $derived(icon);
  const name = $derived(`${label} ${exclude ? '≠' : '='} ${value}`);
  const onkey = (e: KeyboardEvent) => { if ((e.key === 'Backspace' || e.key === 'Delete') && removable) { e.preventDefault(); onremove?.(); } };
  const main = 'inline-flex h-full items-center gap-1.5 px-2 outline-none focus-visible:ring-focus';
</script>

<span {title} class={cn('inline-flex h-7 max-w-full items-stretch overflow-hidden rounded-sm border text-caption tabular', exclude ? 'border-danger/30 bg-danger-subtle text-danger-fg' : 'border-line-default bg-surface-control text-fg-primary', className)}>
  {#if ontoggle}
    <button type="button" class={cn(main, 'hover:bg-surface-control-hover')} aria-label={name} aria-pressed={exclude} onclick={() => ontoggle(!exclude)} onkeydown={onkey}>
      {#if Icon}<Icon aria-hidden="true" class="size-3.5 text-fg-tertiary" />{/if}<span class="text-fg-tertiary">{label}</span><span aria-hidden="true" class="font-medium">{exclude ? '≠' : '='}</span><span class="truncate font-medium">{value}</span>
    </button>
  {:else}
    <span class={main} aria-label={name}>{#if Icon}<Icon aria-hidden="true" class="size-3.5 text-fg-tertiary" />{/if}<span class="text-fg-tertiary">{label}</span><span aria-hidden="true" class="font-medium">{exclude ? '≠' : '='}</span><span class="truncate font-medium">{value}</span></span>
  {/if}
  {#if removable}
    <button type="button" class="inline-flex w-6 shrink-0 items-center justify-center border-s border-current/15 text-fg-tertiary outline-none transition-colors duration-fast hover:bg-surface-control-hover hover:text-fg-primary focus-visible:ring-focus" aria-label={`${t.common.clear} ${label}`} onclick={() => onremove?.()} onkeydown={onkey}><X class="size-3" aria-hidden="true" /></button>
  {/if}
</span>
