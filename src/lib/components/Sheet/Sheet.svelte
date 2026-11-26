<script lang="ts">
  import type { Snippet } from 'svelte';
  import { Dialog } from 'bits-ui';
  import X from '@lucide/svelte/icons/x';
  import { cn } from '../../utils/cn.js';
  import { useStrings } from '../../i18n/context.svelte.js';
  import Button from '../Button/Button.svelte';

  type Props = {
    open?: boolean;
    title: string;
    description?: string;
    side?: 'right' | 'left' | 'bottom' | 'top';
    size?: 'sm' | 'md' | 'lg' | 'xl';
    hideHeader?: boolean;
    padding?: boolean;
    onOpenChange?: (open: boolean) => void;
    trigger?: Snippet<[{ props: Record<string, unknown> }]>;
    footer?: Snippet<[{ close: () => void }]>;
    children: Snippet<[{ close: () => void }]>;
    class?: string;
  };
  let { open = $bindable(false), title, description, side = 'right', size = 'md', hideHeader = false, padding = true, onOpenChange, trigger, footer, children, class: className }: Props = $props();
  const t = useStrings();
  const close = () => { open = false; };
  const horizontal = $derived(side === 'left' || side === 'right');
  const widths = { sm: 'sm:max-w-sm', md: 'sm:max-w-md', lg: 'sm:max-w-xl', xl: 'sm:max-w-3xl' } as const;
  const heights = { sm: 'max-h-[40vh]', md: 'max-h-[60vh]', lg: 'max-h-[80vh]', xl: 'max-h-[92vh]' } as const;
  const placement = {
    right: 'inset-y-0 end-0 h-full w-full border-s',
    left: 'inset-y-0 start-0 h-full w-full border-e',
    bottom: 'inset-x-0 bottom-0 w-full rounded-t-xl border-t',
    top: 'inset-x-0 top-0 w-full rounded-b-xl border-b',
  } as const;
</script>

<Dialog.Root bind:open {onOpenChange}>
  {#if trigger}
    <Dialog.Trigger>
      {#snippet child({ props })}
        {@render trigger({ props })}
      {/snippet}
    </Dialog.Trigger>
  {/if}
  <Dialog.Portal>
    <Dialog.Overlay class="hy-fade fixed inset-0 z-overlay bg-scrim" />
    <Dialog.Content data-side={side} class={cn('hy-sheet fixed z-overlay flex flex-col border-line-subtle bg-surface-overlay text-fg-primary shadow-modal outline-none', placement[side], horizontal ? widths[size] : heights[size], className)}>
      <div class={cn('flex items-start gap-3 px-5 pt-5 pb-3', hideHeader && 'hy-visually-hidden')}>
        <div class="flex min-w-0 flex-1 flex-col gap-1">
          <Dialog.Title class="text-heading">{title}</Dialog.Title>
          {#if description}<Dialog.Description class="text-body text-fg-secondary">{description}</Dialog.Description>{/if}
        </div>
        <Dialog.Close>
          {#snippet child({ props })}
            <Button {...props} variant="quiet" size="sm" iconOnly icon={X} label={t.dialog.close} class="-me-2 -mt-1" />
          {/snippet}
        </Dialog.Close>
      </div>
      {#if hideHeader}
        <Dialog.Close>
          {#snippet child({ props })}
            <Button {...props} variant="quiet" size="sm" iconOnly icon={X} label={t.dialog.close} class="absolute end-3 top-3 z-10" />
          {/snippet}
        </Dialog.Close>
      {/if}
      <div class={cn('min-h-0 flex-1 overflow-y-auto', padding && 'px-5 pb-5', hideHeader && padding && 'pt-5')}>{@render children({ close })}</div>
      {#if footer}
        <div class="flex flex-wrap items-center justify-end gap-2 border-t border-line-subtle px-5 py-4">{@render footer({ close })}</div>
      {/if}
    </Dialog.Content>
  </Dialog.Portal>
</Dialog.Root>
