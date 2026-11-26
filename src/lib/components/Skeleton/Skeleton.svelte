<script lang="ts">
  import type { HTMLAttributes } from 'svelte/elements';
  import { cn } from '../../utils/cn.js';

  type Props = Omit<HTMLAttributes<HTMLDivElement>, 'children'> & {
    shape?: 'rect' | 'text' | 'circle';
    lines?: number;
    width?: string;
    height?: string;
  };
  let { shape = 'rect', lines = 1, width, height, class: className, style, ...rest }: Props = $props();
  const widths = ['100%', '92%', '76%', '88%', '64%'];
</script>

{#if shape === 'text' && lines > 1}
  <div aria-hidden="true" class={cn('flex flex-col gap-2', className)} style={[width && `width:${width}`, style].filter(Boolean).join(';')} {...rest}>
    {#each Array.from({ length: lines }, (_, i) => i) as i (i)}
      <div class="hy-shimmer h-3.5 rounded-xs" style={`width:${widths[i % widths.length]}`}></div>
    {/each}
  </div>
{:else}
  <div aria-hidden="true" class={cn('hy-shimmer', shape === 'circle' ? 'rounded-full' : shape === 'text' ? 'h-3.5 rounded-xs' : 'rounded-md', className)} style={[width && `width:${width}`, height && `height:${height}`, style].filter(Boolean).join(';')} {...rest}></div>
{/if}
