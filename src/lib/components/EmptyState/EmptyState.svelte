<script lang="ts">
  import type { Snippet } from 'svelte';
  import type { HTMLAttributes } from 'svelte/elements';
  import Inbox from '@lucide/svelte/icons/inbox';
  import TriangleAlert from '@lucide/svelte/icons/triangle-alert';
  import Lock from '@lucide/svelte/icons/lock';
  import type { IconComponent } from '../../types.js';
  import { cn } from '../../utils/cn.js';
  import { useStrings } from '../../i18n/context.svelte.js';

  type Props = HTMLAttributes<HTMLDivElement> & {
    kind?: 'empty' | 'error' | 'forbidden';
    icon?: IconComponent;
    title?: string;
    description?: string;
    size?: 'sm' | 'md';
    bordered?: boolean;
    children?: Snippet;
  };
  let { kind = 'empty', icon, title, description, size = 'md', bordered = false, class: className, children, ...rest }: Props = $props();
  const t = useStrings();
  const defaults = $derived({
    empty: { icon: Inbox, title: t.state.emptyTitle, text: t.state.emptyText, tone: 'text-fg-tertiary bg-surface-control' },
    error: { icon: TriangleAlert, title: t.state.errorTitle, text: t.state.errorText, tone: 'text-danger-fg bg-danger-subtle' },
    forbidden: { icon: Lock, title: t.state.forbiddenTitle, text: t.state.forbiddenText, tone: 'text-warning-fg bg-warning-subtle' },
  }[kind]);
  const Cmp = $derived(icon ?? defaults.icon);
</script>

<div role={kind === 'error' ? 'alert' : 'status'} data-kind={kind} class={cn('flex min-w-0 flex-1 flex-col items-center justify-center text-center text-balance', size === 'sm' ? 'gap-3 p-6' : 'gap-4 p-10', bordered && 'rounded-lg border border-dashed border-line-default', className)} {...rest}>
  <span aria-hidden="true" class={cn('flex items-center justify-center rounded-lg', size === 'sm' ? 'size-9 [&_svg]:size-icon-md' : 'size-12 [&_svg]:size-icon-lg', defaults.tone)}><Cmp strokeWidth={1.75} /></span>
  <div class="flex max-w-sm flex-col gap-1">
    <p class={cn(size === 'sm' ? 'text-body-strong' : 'text-subheading', 'text-fg-primary')}>{title ?? defaults.title}</p>
    <p class="text-body text-fg-secondary">{description ?? defaults.text}</p>
  </div>
  {#if children}<div class="flex flex-wrap items-center justify-center gap-2">{@render children()}</div>{/if}
</div>
