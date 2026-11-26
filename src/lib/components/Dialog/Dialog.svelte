<script lang="ts">
  import type { Snippet } from 'svelte';
  import { Dialog } from 'bits-ui';
  import X from '@lucide/svelte/icons/x';
  import type { IconComponent } from '../../types.js';
  import { cn } from '../../utils/cn.js';
  import { useStrings } from '../../i18n/context.svelte.js';
  import Button from '../Button/Button.svelte';

  type Props = {
    open?: boolean;
    title: string;
    description?: string;
    icon?: IconComponent;
    size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
    dismissible?: boolean;
    closeButton?: boolean;
    scrollable?: boolean;
    onOpenChange?: (open: boolean) => void;
    trigger?: Snippet<[{ props: Record<string, unknown> }]>;
    header?: Snippet;
    footer?: Snippet<[{ close: () => void }]>;
    children: Snippet<[{ close: () => void }]>;
    class?: string;
  };
  let { open = $bindable(false), title, description, icon, size = 'md', dismissible = true, closeButton = true, scrollable = true, onOpenChange, trigger, header, footer, children, class: className }: Props = $props();
  const t = useStrings();
  const Icon = $derived(icon);
  const close = () => { open = false; };
  const sizes = { sm: 'sm:max-w-sm', md: 'sm:max-w-lg', lg: 'sm:max-w-2xl', xl: 'sm:max-w-4xl', full: 'sm:max-w-[calc(100vw-4rem)] sm:h-[calc(100vh-4rem)]' } as const;
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
    <Dialog.Overlay class="hy-fade fixed inset-0 z-modal bg-scrim" />
    <Dialog.Content interactOutsideBehavior={dismissible ? 'close' : 'ignore'} escapeKeydownBehavior={dismissible ? 'close' : 'ignore'}
      class={cn('hy-modal fixed start-1/2 top-1/2 z-modal flex w-[calc(100vw-2rem)] max-h-[calc(100vh-2rem)] -translate-x-1/2 -translate-y-1/2 flex-col rounded-xl border border-line-subtle bg-surface-overlay text-fg-primary shadow-modal outline-none',
        'max-sm:inset-x-0 max-sm:top-auto max-sm:bottom-0 max-sm:w-full max-sm:max-h-[92vh] max-sm:translate-x-0 max-sm:translate-y-0 max-sm:rounded-b-none', sizes[size], className)}>
      <div class="flex items-start gap-3 px-6 pt-5 pb-4">
        {#if Icon}<span aria-hidden="true" class="mt-0.5 flex size-9 shrink-0 items-center justify-center rounded-md bg-surface-control text-fg-secondary [&_svg]:size-icon-md"><Icon /></span>{/if}
        <div class="flex min-w-0 flex-1 flex-col gap-1">
          <Dialog.Title class="text-heading text-fg-primary">{title}</Dialog.Title>
          {#if description}<Dialog.Description class="text-body text-fg-secondary">{description}</Dialog.Description>{/if}
          {#if header}{@render header()}{/if}
        </div>
        {#if closeButton}
          <Dialog.Close>
            {#snippet child({ props })}
              <Button {...props} variant="quiet" size="sm" iconOnly icon={X} label={t.dialog.close} class="-me-2 -mt-1" />
            {/snippet}
          </Dialog.Close>
        {/if}
      </div>
      <div class={cn('min-h-0 flex-1 px-6 pb-5', scrollable && 'overflow-y-auto')}>{@render children({ close })}</div>
      {#if footer}
        <div class="flex flex-wrap items-center justify-end gap-2 border-t border-line-subtle bg-surface-base/40 px-6 py-4">{@render footer({ close })}</div>
      {/if}
    </Dialog.Content>
  </Dialog.Portal>
</Dialog.Root>
