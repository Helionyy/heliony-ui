<script lang="ts">
  import { Progress } from 'bits-ui';
  import type { Tone } from '../../types.js';
  import { cn } from '../../utils/cn.js';

  type Props = { value?: number | null; max?: number; tone?: Tone; size?: 'sm' | 'md' | 'lg'; label?: string; showValue?: boolean; format?: (value: number, max: number) => string; class?: string };
  let { value = 0, max = 100, tone = 'neutral', size = 'md', label, showValue = false, format, class: className }: Props = $props();
  const ratio = $derived(value === null ? null : Math.min(1, Math.max(0, value / (max || 1))));
  const fill: Record<Tone, string> = { neutral: 'bg-fg-primary', accent: 'bg-accent', success: 'bg-success', warning: 'bg-warning', danger: 'bg-danger', info: 'bg-info', intelligence: 'bg-intelligence' };
  const heights = { sm: 'h-1', md: 'h-1.5', lg: 'h-2.5' } as const;
  const text = $derived(value === null ? '' : format ? format(value, max) : `${Math.round((ratio ?? 0) * 100)} %`);
</script>

<div class={cn('flex min-w-0 flex-col gap-1.5', className)}>
  {#if label || showValue}
    <div class="flex items-baseline justify-between gap-3 text-caption">
      {#if label}<span class="text-fg-secondary">{label}</span>{/if}
      {#if showValue}<span class="ms-auto tabular text-fg-primary">{text}</span>{/if}
    </div>
  {/if}
  <Progress.Root {value} {max} aria-label={label} class={cn('relative w-full overflow-hidden rounded-full bg-surface-control-active', heights[size])}>
    {#if ratio === null}
      <div class={cn('hy-shimmer absolute inset-0')}></div>
    {:else}
      <div class={cn('h-full rounded-full transition-[width] duration-slow ease-standard', fill[tone])} style={`width:${ratio * 100}%`}></div>
    {/if}
  </Progress.Root>
</div>
