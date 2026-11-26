<script lang="ts">
  import type { Snippet } from 'svelte';
  import { Dialog } from 'bits-ui';
  import X from '@lucide/svelte/icons/x';
  import { cn } from '../../utils/cn.js';
  import { useStrings } from '../../i18n/context.svelte.js';
  import Button from '../Button/Button.svelte';

  type Props = { open?: boolean; src?: string; alt?: string; title?: string; caption?: string; onOpenChange?: (open: boolean) => void; trigger?: Snippet<[{ props: Record<string, unknown> }]>; children?: Snippet; class?: string };
  let { open = $bindable(false), src, alt = '', title, caption, onOpenChange, trigger, children, class: className }: Props = $props();
  const t = useStrings();
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
    <Dialog.Content class={cn('hy-pop fixed inset-0 z-modal flex flex-col items-center justify-center gap-3 p-6 outline-none sm:p-10', className)}>
      <Dialog.Title class={cn(!title && 'hy-visually-hidden', 'text-body-strong text-fg-primary')}>{title ?? alt ?? t.common.open}</Dialog.Title>
      <div class="flex min-h-0 max-h-full max-w-full items-center justify-center">
        {#if children}{@render children()}{:else if src}<img {src} {alt} class="max-h-[calc(100vh-8rem)] max-w-full rounded-lg object-contain shadow-modal" />{/if}
      </div>
      {#if caption}<Dialog.Description class="max-w-2xl text-center text-caption text-fg-secondary">{caption}</Dialog.Description>{/if}
      <Dialog.Close>
        {#snippet child({ props })}
          <Button {...props} variant="secondary" size="sm" iconOnly icon={X} label={t.common.close} class="absolute end-4 top-4" />
        {/snippet}
      </Dialog.Close>
    </Dialog.Content>
  </Dialog.Portal>
</Dialog.Root>
