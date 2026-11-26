<script lang="ts">
  import { RadioGroup } from 'bits-ui';
  import type { Option } from '../../types.js';
  import { cn } from '../../utils/cn.js';

  type Props = {
    value?: string;
    options: (Option & { description?: string })[];
    name?: string;
    label?: string;
    orientation?: 'vertical' | 'horizontal';
    variant?: 'plain' | 'cards';
    disabled?: boolean;
    required?: boolean;
    onchange?: (value: string) => void;
    class?: string;
  };
  const uid = $props.id();
  let { value = $bindable(''), options, name, label, orientation = 'vertical', variant = 'plain', disabled = false, required = false, onchange, class: className }: Props = $props();
</script>

<RadioGroup.Root bind:value {name} {disabled} {required} {orientation} aria-label={label} onValueChange={(v) => onchange?.(v)}
  class={cn('flex min-w-0', orientation === 'vertical' ? 'flex-col' : 'flex-row flex-wrap', variant === 'cards' ? 'gap-2' : 'gap-2.5', className)}>
  {#each options as option (option.value)}
    {@const id = `${uid}-${option.value}`}
    {@const Icon = option.icon}
    <div class={cn('flex items-start gap-2.5', variant === 'cards' && 'rounded-md border border-line-default p-3 transition-colors duration-fast has-[[data-state=checked]]:border-selection has-[[data-state=checked]]:bg-surface-control hover:border-line-strong', orientation === 'horizontal' && variant === 'cards' && 'flex-1 basis-40')}>
      <RadioGroup.Item value={option.value} disabled={option.disabled} {id}
        class={cn('peer mt-0.5 flex size-4 shrink-0 items-center justify-center rounded-full border border-line-control bg-surface-sunken transition-[border-color,box-shadow] duration-fast ease-standard outline-none focus-visible:ring-focus',
          'hover:border-line-strong data-[state=checked]:border-selection disabled:cursor-not-allowed disabled:opacity-(--opacity-disabled)')}>
        {#snippet children({ checked })}
          {#if checked}<span aria-hidden="true" class="size-2 rounded-full bg-selection"></span>{/if}
        {/snippet}
      </RadioGroup.Item>
      <label for={id} class={cn('flex min-w-0 flex-1 flex-col gap-0.5 select-none text-body', option.disabled || disabled ? 'cursor-not-allowed text-fg-disabled' : 'cursor-pointer text-fg-primary')}>
        <span class="flex items-center gap-1.5">{#if Icon}<Icon aria-hidden="true" class="size-icon-sm text-fg-tertiary" />{/if}{option.label}</span>
        {#if option.description}<span class="text-caption text-fg-tertiary">{option.description}</span>{/if}
      </label>
    </div>
  {/each}
</RadioGroup.Root>
