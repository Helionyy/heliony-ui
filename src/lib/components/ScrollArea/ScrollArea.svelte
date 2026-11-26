<script lang="ts">
  import type { Snippet } from 'svelte';
  import { ScrollArea } from 'bits-ui';
  import { cn } from '../../utils/cn.js';

  type Props = { orientation?: 'vertical' | 'horizontal' | 'both'; viewportRef?: HTMLElement | null; children: Snippet; class?: string; viewportClass?: string };
  let { orientation = 'vertical', viewportRef = $bindable(null), children, class: className, viewportClass }: Props = $props();
  const bar = 'flex touch-none select-none p-px transition-colors duration-fast data-[orientation=vertical]:h-full data-[orientation=vertical]:w-2.5 data-[orientation=horizontal]:h-2.5 data-[orientation=horizontal]:w-full data-[orientation=horizontal]:flex-col';
</script>

<ScrollArea.Root class={cn('relative overflow-hidden', className)}>
  <ScrollArea.Viewport bind:ref={viewportRef} class={cn('size-full rounded-[inherit] outline-none focus-visible:ring-focus', viewportClass)}>{@render children()}</ScrollArea.Viewport>
  {#if orientation !== 'horizontal'}
    <ScrollArea.Scrollbar orientation="vertical" class={bar}><ScrollArea.Thumb class="relative flex-1 rounded-full bg-line-strong hover:bg-fg-tertiary" /></ScrollArea.Scrollbar>
  {/if}
  {#if orientation !== 'vertical'}
    <ScrollArea.Scrollbar orientation="horizontal" class={bar}><ScrollArea.Thumb class="relative flex-1 rounded-full bg-line-strong hover:bg-fg-tertiary" /></ScrollArea.Scrollbar>
  {/if}
  <ScrollArea.Corner />
</ScrollArea.Root>
