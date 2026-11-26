<script lang="ts">
  import { ToggleGroup } from 'bits-ui';
  import type { Option } from '../../types.js';
  import { cn } from '../../utils/cn.js';

  type Props = {
    value?: string;
    options: Option[];
    size?: 'sm' | 'md' | 'lg';
    block?: boolean;
    iconOnly?: boolean;
    label?: string;
    disabled?: boolean;
    onchange?: (value: string) => void;
    class?: string;
  };
  let { value = $bindable(''), options, size = 'md', block = false, iconOnly = false, label, disabled = false, onchange, class: className }: Props = $props();
  const heights = { sm: 'h-7 text-label', md: 'h-8 text-body', lg: 'h-9 text-body' } as const;
</script>

<ToggleGroup.Root type="single" bind:value={value as never} {disabled} rovingFocus aria-label={label} onValueChange={(v) => { if (v) onchange?.(v as string); else value = value; }}
  class={cn('inline-flex items-center gap-0.5 rounded-md border border-line-subtle bg-surface-sunken p-0.5', block && 'flex w-full [&>*]:flex-1', className)}>
  {#each options as option (option.value)}
    {@const Icon = option.icon}
    <ToggleGroup.Item value={option.value} disabled={option.disabled} aria-label={iconOnly ? option.label : undefined} title={iconOnly ? option.label : undefined}
      class={cn('inline-flex items-center justify-center gap-1.5 whitespace-nowrap rounded-sm px-3 font-medium text-fg-secondary outline-none transition-[background-color,color,box-shadow] duration-fast ease-standard',
        'hover:text-fg-primary focus-visible:ring-focus data-[state=on]:bg-surface-raised data-[state=on]:text-fg-primary data-[state=on]:shadow-raised disabled:pointer-events-none disabled:opacity-(--opacity-disabled) [&_svg]:size-icon-sm [&_svg]:shrink-0',
        heights[size], iconOnly && 'px-0 aspect-square')}>
      {#if Icon}<Icon aria-hidden="true" />{/if}
      {#if !iconOnly}{option.label}{/if}
    </ToggleGroup.Item>
  {/each}
</ToggleGroup.Root>
