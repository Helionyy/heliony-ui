<script lang="ts">
  import { Slider } from 'bits-ui';
  import { cn } from '../../utils/cn.js';

  type Props = {
    value?: number;
    min?: number;
    max?: number;
    step?: number;
    label?: string;
    showValue?: boolean;
    format?: (value: number) => string;
    minLabel?: string;
    maxLabel?: string;
    disabled?: boolean;
    onchange?: (value: number) => void;
    oncommit?: (value: number) => void;
    class?: string;
  };
  let { value = $bindable(0), min = 0, max = 100, step = 1, label, showValue = true, format, minLabel, maxLabel, disabled = false, onchange, oncommit, class: className }: Props = $props();
  const text = $derived(format ? format(value) : String(value));
</script>

<div class={cn('flex min-w-0 flex-col gap-2', className)}>
  {#if label || showValue}
    <div class="flex items-baseline justify-between gap-3">
      {#if label}<span class="text-label text-fg-primary">{label}</span>{/if}
      {#if showValue}<span class="ms-auto text-caption tabular text-fg-secondary">{text}</span>{/if}
    </div>
  {/if}
  <Slider.Root type="single" bind:value {min} {max} {step} {disabled} aria-label={label} onValueChange={(v) => onchange?.(v)} onValueCommit={(v) => oncommit?.(v)}
    class="relative flex h-5 w-full touch-none select-none items-center data-disabled:opacity-(--opacity-disabled)">
    {#snippet children({ thumbs })}
      <span class="relative h-1.5 w-full grow overflow-hidden rounded-full bg-surface-control-active">
        <Slider.Range class="absolute h-full bg-fg-primary" />
      </span>
      {#each thumbs as index (index)}
        <Slider.Thumb {index} class="block size-4 rounded-full border-2 border-fg-primary bg-surface-raised shadow-raised transition-[box-shadow,transform] duration-fast outline-none hover:scale-110 focus-visible:ring-focus active:scale-110 disabled:pointer-events-none" />
      {/each}
    {/snippet}
  </Slider.Root>
  {#if minLabel || maxLabel}
    <div class="flex justify-between text-caption text-fg-tertiary"><span>{minLabel}</span><span>{maxLabel}</span></div>
  {/if}
</div>
