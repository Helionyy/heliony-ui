<script lang="ts">
  import { cn } from '../../utils/cn.js';

  type Props = { value: string; minor?: string; label?: string; size?: 'md' | 'lg' | 'xl'; align?: 'start' | 'end'; class?: string };
  let { value, minor, label, size = 'lg', align = 'start', class: className }: Props = $props();
  const sizes = { md: 'text-figure', lg: 'text-figure-lg', xl: 'text-display' } as const;
</script>

<div class={cn('flex min-w-0 flex-col gap-0.5', align === 'end' && 'items-end text-end', className)}>
  {#if label}<span class="text-label text-fg-tertiary">{label}</span>{/if}
  <span class={cn('tabular text-fg-primary', sizes[size])}>{value}{#if minor}<span class="ms-1 text-[0.6em] font-medium text-fg-secondary">{minor}</span>{/if}</span>
</div>
