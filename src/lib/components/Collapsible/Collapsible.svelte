<script lang="ts">
  import type { Snippet } from 'svelte';
  import { Collapsible } from 'bits-ui';
  import ChevronRight from '@lucide/svelte/icons/chevron-right';
  import { slide } from 'svelte/transition';
  import { cn } from '../../utils/cn.js';

  type Props = {
    open?: boolean;
    title?: string;
    description?: string;
    disabled?: boolean;
    onOpenChange?: (open: boolean) => void;
    trigger?: Snippet<[{ open: boolean }]>;
    children: Snippet;
    class?: string;
  };
  let { open = $bindable(false), title, description, disabled = false, onOpenChange, trigger, children, class: className }: Props = $props();
</script>

<Collapsible.Root bind:open {disabled} {onOpenChange} class={cn('min-w-0', className)}>
  <Collapsible.Trigger class="group flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-start text-body-strong text-fg-primary outline-none transition-colors duration-fast hover:bg-surface-control-hover focus-visible:ring-focus disabled:pointer-events-none disabled:opacity-(--opacity-disabled)">
    <ChevronRight aria-hidden="true" class="size-icon-sm shrink-0 text-fg-tertiary transition-transform duration-fast ease-standard group-data-[state=open]:rotate-90" />
    {#if trigger}{@render trigger({ open })}{:else}
      <span class="flex min-w-0 flex-1 flex-col"><span>{title}</span>{#if description}<span class="text-caption font-normal text-fg-tertiary">{description}</span>{/if}</span>
    {/if}
  </Collapsible.Trigger>
  <Collapsible.Content forceMount>
    {#snippet child({ props, open })}
      {#if open}
        <div {...props} transition:slide={{ duration: 180 }} class="ps-8 pt-1 pb-2 text-body text-fg-secondary">{@render children()}</div>
      {/if}
    {/snippet}
  </Collapsible.Content>
</Collapsible.Root>
