<script lang="ts">
  import Copy from '@lucide/svelte/icons/copy';
  import Check from '@lucide/svelte/icons/check';
  import { cn } from '../../utils/cn.js';
  import { useStrings } from '../../i18n/context.svelte.js';

  type Props = { text: string; copy?: boolean; truncate?: number; label?: string; class?: string };
  let { text, copy = false, truncate, label, class: className }: Props = $props();
  const t = useStrings();
  let copied = $state(false);
  const shown = $derived(truncate && text.length > truncate ? `${text.slice(0, Math.ceil(truncate / 2))}…${text.slice(-Math.floor(truncate / 2))}` : text);
  async function doCopy() { try { await navigator.clipboard.writeText(text); copied = true; setTimeout(() => (copied = false), 1500); } catch { copied = false; } }
</script>

<span class={cn('inline-flex max-w-full items-center gap-1 rounded-xs bg-surface-sunken px-1.5 py-px font-mono text-code tabular text-fg-primary ring-1 ring-line-subtle ring-inset', className)} title={shown !== text ? text : undefined} aria-label={label}>
  <span class="truncate">{shown}</span>
  {#if copy}<button type="button" class="flex size-4 shrink-0 items-center justify-center rounded-xs text-fg-tertiary outline-none hover:text-fg-primary focus-visible:ring-focus" aria-label={`${t.common.copy} ${label ?? text}`} onclick={doCopy}>{#if copied}<Check class="size-3 text-success" aria-hidden="true" />{:else}<Copy class="size-3" aria-hidden="true" />{/if}</button>{/if}
</span>
