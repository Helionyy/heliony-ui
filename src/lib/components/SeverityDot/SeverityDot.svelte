<script lang="ts">
  import type { Severity } from '../../types.js';
  import { cn } from '../../utils/cn.js';
  import { useStrings } from '../../i18n/context.svelte.js';

  type Props = { severity: Severity; label?: boolean | string; size?: 'sm' | 'md' | 'lg'; class?: string };
  let { severity, label = false, size = 'md', class: className }: Props = $props();
  const t = useStrings();
  const text = $derived(typeof label === 'string' ? label : t.severity[severity]);
  const color: Record<Severity, string> = { trace: 'bg-severity-debug', debug: 'bg-severity-debug', info: 'bg-severity-info', warn: 'bg-severity-warn', error: 'bg-severity-error', fatal: 'bg-severity-fatal' };
  const dot = { sm: 'size-1.5', md: 'size-2', lg: 'size-2.5' } as const;
</script>

<span class={cn('inline-flex items-center gap-1.5 text-caption text-fg-secondary', className)} role={label ? undefined : 'img'} aria-label={label ? undefined : text} title={label ? undefined : text}>
  <span aria-hidden="true" class={cn('shrink-0 rounded-full', dot[size], color[severity], severity === 'fatal' && 'ring-2 ring-severity-fatal/30')}></span>
  {#if label}<span class="font-medium uppercase tracking-wider">{text}</span>{/if}
</span>
