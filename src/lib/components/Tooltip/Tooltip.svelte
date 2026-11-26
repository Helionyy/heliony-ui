<script lang="ts">
  import type { Snippet } from 'svelte';
  import { Tooltip } from 'bits-ui';
  import { cn } from '../../utils/cn.js';
  import Kbd from '../Kbd/Kbd.svelte';

  type Props = {
    text?: string;
    shortcut?: string;
    side?: 'top' | 'bottom' | 'left' | 'right';
    align?: 'start' | 'center' | 'end';
    delay?: number;
    disabled?: boolean;
    open?: boolean;
    content?: Snippet;
    children: Snippet<[{ props: Record<string, unknown> }]>;
    class?: string;
  };
  let { text, shortcut, side = 'top', align = 'center', delay, disabled = false, open = $bindable(false), content, children, class: className }: Props = $props();
</script>

{#if disabled || (!text && !content)}
  {@render children({ props: {} })}
{:else}
  <Tooltip.Root bind:open delayDuration={delay}>
    <Tooltip.Trigger>
      {#snippet child({ props })}
        {@render children({ props })}
      {/snippet}
    </Tooltip.Trigger>
    <Tooltip.Portal>
      <Tooltip.Content {side} {align} sideOffset={6} class={cn('hy-float z-tooltip w-fit max-w-xs origin-(--bits-tooltip-content-transform-origin) rounded-md border border-line-subtle bg-surface-overlay px-2.5 py-1.5 text-caption text-fg-primary shadow-overlay text-balance', className)}>
        <span class="inline-flex items-center gap-2">
          {#if content}{@render content()}{:else}{text}{/if}
          {#if shortcut}<Kbd>{shortcut}</Kbd>{/if}
        </span>
      </Tooltip.Content>
    </Tooltip.Portal>
  </Tooltip.Root>
{/if}
