<script lang="ts">
  import type { Snippet } from 'svelte';
  import { AlertDialog } from 'bits-ui';
  import TriangleAlert from '@lucide/svelte/icons/triangle-alert';
  import type { IconComponent } from '../../types.js';
  import { cn } from '../../utils/cn.js';
  import { useStrings } from '../../i18n/context.svelte.js';
  import Button from '../Button/Button.svelte';

  type Props = {
    open?: boolean;
    title: string;
    description?: string;
    icon?: IconComponent;
    tone?: 'neutral' | 'danger';
    confirmLabel?: string;
    cancelLabel?: string;
    loading?: boolean;
    onconfirm?: () => void | Promise<void>;
    oncancel?: () => void;
    onOpenChange?: (open: boolean) => void;
    trigger?: Snippet<[{ props: Record<string, unknown> }]>;
    children?: Snippet;
    class?: string;
  };
  let { open = $bindable(false), title, description, icon, tone = 'neutral', confirmLabel, cancelLabel, loading = false, onconfirm, oncancel, onOpenChange, trigger, children, class: className }: Props = $props();
  const t = useStrings();
  const Icon = $derived(icon ?? (tone === 'danger' ? TriangleAlert : undefined));
  let busy = $state(false);
  const confirm = async () => {
    if (!onconfirm) { open = false; return; }
    busy = true;
    try { await onconfirm(); open = false; } finally { busy = false; }
  };
</script>

<AlertDialog.Root bind:open {onOpenChange}>
  {#if trigger}
    <AlertDialog.Trigger>
      {#snippet child({ props })}
        {@render trigger({ props })}
      {/snippet}
    </AlertDialog.Trigger>
  {/if}
  <AlertDialog.Portal>
    <AlertDialog.Overlay class="hy-fade fixed inset-0 z-modal bg-scrim" />
    <AlertDialog.Content class={cn('hy-modal fixed start-1/2 top-1/2 z-modal flex w-[calc(100vw-2rem)] max-w-md -translate-x-1/2 -translate-y-1/2 flex-col gap-5 rounded-xl border border-line-subtle bg-surface-overlay p-6 text-fg-primary shadow-modal outline-none', className)}>
      <div class="flex items-start gap-3">
        {#if Icon}<span aria-hidden="true" class={cn('flex size-9 shrink-0 items-center justify-center rounded-md [&_svg]:size-icon-md', tone === 'danger' ? 'bg-danger-subtle text-danger-fg' : 'bg-surface-control text-fg-secondary')}><Icon /></span>{/if}
        <div class="flex min-w-0 flex-1 flex-col gap-1">
          <AlertDialog.Title class="text-heading">{title}</AlertDialog.Title>
          {#if description}<AlertDialog.Description class="text-body text-fg-secondary">{description}</AlertDialog.Description>{/if}
          {#if children}<div class="pt-2">{@render children()}</div>{/if}
        </div>
      </div>
      <div class="flex flex-wrap items-center justify-end gap-2">
        <AlertDialog.Cancel>
          {#snippet child({ props })}
            <Button {...props} variant="quiet" disabled={busy || loading} onclick={() => oncancel?.()}>{cancelLabel ?? t.common.cancel}</Button>
          {/snippet}
        </AlertDialog.Cancel>
        <Button variant={tone === 'danger' ? 'danger' : 'primary'} loading={busy || loading} onclick={confirm}>{confirmLabel ?? t.common.confirm}</Button>
      </div>
    </AlertDialog.Content>
  </AlertDialog.Portal>
</AlertDialog.Root>
