<script lang="ts">
  import type { Snippet } from 'svelte';
  import Info from '@lucide/svelte/icons/info';
  import CircleCheck from '@lucide/svelte/icons/circle-check';
  import TriangleAlert from '@lucide/svelte/icons/triangle-alert';
  import CircleAlert from '@lucide/svelte/icons/circle-alert';
  import Sparkles from '@lucide/svelte/icons/sparkles';
  import X from '@lucide/svelte/icons/x';
  import type { IconComponent, Tone } from '../../types.js';
  import { cn } from '../../utils/cn.js';
  import { useStrings } from '../../i18n/context.svelte.js';
  import Button from '../Button/Button.svelte';

  type Props = { tone?: Tone; title?: string; text?: string; icon?: IconComponent; dismissible?: boolean; compact?: boolean; ondismiss?: () => void; children?: Snippet; actions?: Snippet; class?: string };
  let { tone = 'neutral', title, text, icon, dismissible = false, compact = false, ondismiss, children, actions, class: className }: Props = $props();
  const t = useStrings();
  const defaults: Record<Tone, IconComponent> = { neutral: Info, accent: Sparkles, info: Info, success: CircleCheck, warning: TriangleAlert, danger: CircleAlert, intelligence: Sparkles };
  const Icon = $derived(icon ?? defaults[tone]);
  const box: Record<Tone, string> = { neutral: 'border-line-default bg-surface-raised text-fg-primary [&_svg]:text-fg-tertiary', accent: 'border-accent/30 bg-accent-subtle text-fg-primary [&_svg]:text-accent', info: 'border-info/30 bg-info-subtle text-fg-primary [&_svg]:text-info', success: 'border-success/30 bg-success-subtle text-fg-primary [&_svg]:text-success', warning: 'border-warning/30 bg-warning-subtle text-fg-primary [&_svg]:text-warning', danger: 'border-danger/30 bg-danger-subtle text-fg-primary [&_svg]:text-danger', intelligence: 'border-intelligence/30 bg-intelligence-subtle text-fg-primary [&_svg]:text-intelligence' };
</script>

<div role={tone === 'danger' ? 'alert' : 'status'} data-tone={tone} class={cn('flex items-start gap-3 rounded-lg border', compact ? 'px-3 py-2' : 'px-4 py-3', box[tone], className)}>
  <Icon aria-hidden="true" class="mt-0.5 size-icon-sm shrink-0" strokeWidth={2} />
  <div class="flex min-w-0 flex-1 flex-col gap-0.5 text-body">
    {#if title}<p class="text-body-strong">{title}</p>{/if}
    {#if children}<div class={cn(title && 'text-fg-secondary')}>{@render children()}</div>{:else if text}<p class={cn(title && 'text-fg-secondary')}>{text}</p>{/if}
    {#if actions}<div class="flex flex-wrap items-center gap-2 pt-2">{@render actions()}</div>{/if}
  </div>
  {#if dismissible}<Button variant="quiet" size="sm" iconOnly icon={X} label={t.common.close} class="-me-1.5 -mt-1 shrink-0" onclick={ondismiss} />{/if}
</div>
