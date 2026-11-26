<script lang="ts">
  import { Separator } from 'bits-ui';
  import { cn } from '../../utils/cn.js';

  type Props = { orientation?: 'horizontal' | 'vertical'; label?: string; spacing?: 'none' | 'sm' | 'md' | 'lg'; class?: string };
  let { orientation = 'horizontal', label, spacing = 'none', class: className }: Props = $props();
  const gap = $derived({ none: '', sm: orientation === 'horizontal' ? 'my-2' : 'mx-2', md: orientation === 'horizontal' ? 'my-4' : 'mx-4', lg: orientation === 'horizontal' ? 'my-6' : 'mx-6' } as const);
</script>

{#if label && orientation === 'horizontal'}
  <div role="separator" aria-label={label} class={cn('flex items-center gap-3 text-caption text-fg-tertiary', gap[spacing], className)}>
    <span class="h-px flex-1 bg-line-subtle"></span>
    <span class="shrink-0 uppercase tracking-wider">{label}</span>
    <span class="h-px flex-1 bg-line-subtle"></span>
  </div>
{:else}
  <Separator.Root {orientation} class={cn('shrink-0 bg-line-subtle data-[orientation=horizontal]:h-px data-[orientation=horizontal]:w-full data-[orientation=vertical]:w-px data-[orientation=vertical]:self-stretch', gap[spacing], className)} />
{/if}
