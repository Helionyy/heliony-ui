<script lang="ts">
  import RefreshCw from '@lucide/svelte/icons/refresh-cw';
  import type { Option } from '../../types.js';
  import { cn } from '../../utils/cn.js';
  import { useHeliony, useStrings } from '../../i18n/context.svelte.js';
  import { formatRelative } from '../../utils/format.js';
  import Segmented from '../Segmented/Segmented.svelte';
  import Button from '../Button/Button.svelte';

  type Props = { value?: string; options?: Option[]; updatedAt?: number | string | Date | null; refreshing?: boolean; label?: string; size?: 'sm' | 'md'; onchange?: (value: string) => void; onrefresh?: () => void; class?: string };
  const DEFAULTS: Option[] = [{ value: '1h', label: '1 h' }, { value: '6h', label: '6 h' }, { value: '24h', label: '24 h' }, { value: '7d', label: '7 j' }, { value: '30d', label: '30 j' }];
  let { value = $bindable('24h'), options = DEFAULTS, updatedAt = null, refreshing = false, label, size = 'sm', onchange, onrefresh, class: className }: Props = $props();
  const cfg = useHeliony();
  const t = useStrings();
  let now = $state(Date.now());
  $effect(() => {
    if (updatedAt === null || updatedAt === undefined) return;
    const timer = setInterval(() => (now = Date.now()), 10_000);
    return () => clearInterval(timer);
  });
  const text = $derived(updatedAt === null || updatedAt === undefined ? '' : formatRelative(new Date(updatedAt), cfg.locale, now));
</script>

<div role="group" aria-label={label ?? t.period.custom} class={cn('flex flex-wrap items-center gap-2', className)}>
  <Segmented bind:value {options} {size} label={label} onchange={(v) => onchange?.(v)} />
  {#if onrefresh}<Button variant="quiet" size="sm" iconOnly icon={RefreshCw} label={t.common.retry} loading={refreshing} onclick={onrefresh} />{/if}
  {#if text}<span class="text-caption tabular text-fg-tertiary" aria-live="polite">{text}</span>{/if}
</div>
