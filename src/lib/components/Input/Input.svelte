<script lang="ts" module>
  export const inputClasses = [
    'flex w-full min-w-0 items-center rounded-md border border-line-control bg-surface-sunken text-body text-fg-primary',
    'transition-[border-color,box-shadow,background-color] duration-fast ease-standard',
    'placeholder:text-fg-tertiary selection:bg-accent-subtle',
    'hover:border-line-strong focus-within:border-fg-tertiary focus-within:outline-2 focus-within:outline-offset-2 focus-within:outline-focus-ring',
    'aria-invalid:border-danger aria-invalid:focus-within:outline-danger data-invalid:border-danger',
    'disabled:cursor-not-allowed disabled:opacity-(--opacity-disabled) data-disabled:opacity-(--opacity-disabled)',
  ].join(' ');
</script>

<script lang="ts">
  import type { Snippet } from 'svelte';
  import type { HTMLInputAttributes } from 'svelte/elements';
  import type { IconComponent } from '../../types.js';
  import { cn } from '../../utils/cn.js';
  import { useField } from '../Field/context.svelte.js';

  type Props = Omit<HTMLInputAttributes, 'size' | 'value' | 'files'> & {
    value?: string | number | null;
    size?: 'sm' | 'md' | 'lg';
    icon?: IconComponent;
    prefix?: string;
    suffix?: string;
    mono?: boolean;
    start?: Snippet;
    end?: Snippet;
    invalid?: boolean;
    ref?: HTMLInputElement | null;
  };
  let { value = $bindable(''), size = 'md', icon, prefix, suffix, mono = false, start, end, invalid, id, disabled, required, ref = $bindable(null), class: className, type = 'text', ...rest }: Props = $props();
  const field = useField();
  const Icon = $derived(icon);
  const isInvalid = $derived(invalid ?? field?.invalid ?? false);
  const isDisabled = $derived(disabled ?? field?.disabled ?? false);
  const heights = { sm: 'h-control-sm text-label', md: 'h-control-md', lg: 'h-control-lg' } as const;
</script>

<div data-invalid={isInvalid || undefined} data-disabled={isDisabled || undefined} class={cn(inputClasses, heights[size], 'gap-2 px-3 has-[input:focus-visible]:outline-2', className)}>
  {#if start}{@render start()}{/if}
  {#if Icon}<Icon aria-hidden="true" class="size-icon-sm shrink-0 text-fg-tertiary" />{/if}
  {#if prefix}<span class="shrink-0 select-none text-fg-tertiary">{prefix}</span>{/if}
  <input bind:this={ref} bind:value {type} id={id ?? field?.id} disabled={isDisabled} required={required ?? field?.required} aria-invalid={isInvalid || undefined} aria-describedby={rest['aria-describedby'] ?? field?.describedBy}
    class={cn('min-w-0 flex-1 bg-transparent outline-none placeholder:text-fg-tertiary disabled:cursor-not-allowed', mono && 'font-mono text-code tabular')} {...rest} />
  {#if suffix}<span class="shrink-0 select-none text-fg-tertiary">{suffix}</span>{/if}
  {#if end}{@render end()}{/if}
</div>
