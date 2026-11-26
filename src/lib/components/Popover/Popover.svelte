<script lang="ts">
  import type { Snippet } from 'svelte';
  import { Popover } from 'bits-ui';
  import { cn } from '../../utils/cn.js';

  type Props = {
    open?: boolean;
    side?: 'top' | 'bottom' | 'left' | 'right';
    align?: 'start' | 'center' | 'end';
    sideOffset?: number;
    padding?: 'none' | 'sm' | 'md';
    width?: string;
    title?: string;
    onOpenChange?: (open: boolean) => void;
    trigger: Snippet<[{ props: Record<string, unknown>; open: boolean }]>;
    children: Snippet<[{ close: () => void }]>;
    class?: string;
  };
  let { open = $bindable(false), side = 'bottom', align = 'start', sideOffset = 6, padding = 'md', width, title, onOpenChange, trigger, children, class: className }: Props = $props();
  const pad = { none: 'p-0', sm: 'p-2', md: 'p-3' } as const;
  const close = () => { open = false; };
</script>

<Popover.Root bind:open {onOpenChange}>
  <Popover.Trigger>
    {#snippet child({ props })}
      {@render trigger({ props, open })}
    {/snippet}
  </Popover.Trigger>
  <Popover.Portal>
    <Popover.Content {side} {align} {sideOffset} aria-label={title} style={width ? `width:${width}` : undefined}
      class={cn('hy-float z-overlay min-w-48 origin-(--bits-popover-content-transform-origin) rounded-lg border border-line-subtle bg-surface-overlay text-fg-primary shadow-overlay outline-none', pad[padding], className)}>
      {#if title}<p class="mb-2 text-label text-fg-secondary">{title}</p>{/if}
      {@render children({ close })}
    </Popover.Content>
  </Popover.Portal>
</Popover.Root>
