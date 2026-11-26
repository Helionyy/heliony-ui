<script lang="ts">
  import X from '@lucide/svelte/icons/x';
  import CircleCheck from '@lucide/svelte/icons/circle-check';
  import CircleAlert from '@lucide/svelte/icons/circle-alert';
  import TriangleAlert from '@lucide/svelte/icons/triangle-alert';
  import Info from '@lucide/svelte/icons/info';
  import Sparkles from '@lucide/svelte/icons/sparkles';
  import Bell from '@lucide/svelte/icons/bell';
  import type { IconComponent, Tone } from '../../types.js';
  import type { ToastAction } from '../../toast/toast.svelte.js';
  import { cn } from '../../utils/cn.js';
  import { useStrings } from '../../i18n/context.svelte.js';
  import Button from '../Button/Button.svelte';

  type Props = {
    title: string;
    description?: string;
    tone?: Tone;
    icon?: IconComponent;
    image?: string;
    imageMode?: 'side' | 'background';
    count?: number;
    duration?: number | null;
    timerKey?: number | string;
    action?: ToastAction;
    dismissible?: boolean;
    ondismiss?: () => void;
    onpause?: () => void;
    onresume?: () => void;
    class?: string;
  };
  let { title, description, tone = 'neutral', icon, image, imageMode = 'side', count = 1, duration = 5000, timerKey, action, dismissible = true, ondismiss, onpause, onresume, class: className }: Props = $props();
  const t = useStrings();
  const defaultIcon: Record<Tone, IconComponent> = { neutral: Bell, accent: Sparkles, success: CircleCheck, warning: TriangleAlert, danger: CircleAlert, info: Info, intelligence: Sparkles };
  const Icon = $derived(icon ?? defaultIcon[tone]);
  const toneText: Record<Tone, string> = { neutral: 'text-fg-secondary', accent: 'text-accent', success: 'text-success', warning: 'text-warning', danger: 'text-danger', info: 'text-info', intelligence: 'text-intelligence' };
  const toneBar: Record<Tone, string> = { neutral: 'bg-fg-tertiary', accent: 'bg-accent', success: 'bg-success', warning: 'bg-warning', danger: 'bg-danger', info: 'bg-info', intelligence: 'bg-intelligence' };
</script>

<div role={tone === 'danger' ? 'alert' : 'status'} data-tone={tone} onpointerenter={onpause} onpointerleave={onresume}
  class={cn('hy-enter pointer-events-auto relative flex w-full max-w-sm overflow-hidden rounded-lg border border-line-subtle bg-surface-overlay text-fg-primary shadow-overlay', className)}>
  {#if image && imageMode === 'background'}
    <img src={image} alt="" aria-hidden="true" class="absolute inset-0 size-full object-cover" />
    <div aria-hidden="true" class="absolute inset-0 bg-scrim"></div>
  {/if}
  <div class="relative flex min-w-0 flex-1 items-start gap-3 p-3.5">
    {#if image && imageMode === 'side'}
      <img src={image} alt="" aria-hidden="true" class="size-10 shrink-0 rounded-md object-cover" />
    {:else}
      <span aria-hidden="true" class={cn('mt-px flex size-5 shrink-0 items-center justify-center [&_svg]:size-icon-md', toneText[tone])}><Icon strokeWidth={2} /></span>
    {/if}
    <div class="flex min-w-0 flex-1 flex-col gap-0.5">
      <div class="flex items-start gap-2">
        <p class="flex-1 text-body-strong">{title}</p>
        {#if count > 1}<span class="rounded-xs bg-surface-control px-1.5 py-px text-caption tabular text-fg-secondary" title={t.toast.repeated(count)}>×{count}</span>{/if}
      </div>
      {#if description}<p class="text-body text-fg-secondary">{description}</p>{/if}
      {#if action}<div class="pt-1.5"><Button size="sm" variant="secondary" onclick={action.onclick}>{action.label}</Button></div>{/if}
    </div>
    {#if dismissible}
      <Button variant="quiet" size="sm" iconOnly icon={X} label={t.toast.dismiss} class="-me-1.5 -mt-1.5 shrink-0" onclick={ondismiss} />
    {/if}
  </div>
  {#if duration}
    {#key timerKey}
      <span aria-hidden="true" class={cn('absolute inset-x-0 bottom-0 h-0.5 origin-left', toneBar[tone])} style={`animation: hy-timer ${duration}ms linear forwards`}></span>
    {/key}
  {/if}
</div>
