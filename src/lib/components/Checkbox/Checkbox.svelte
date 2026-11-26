<script lang="ts">
  import { Checkbox } from 'bits-ui';
  import Check from '@lucide/svelte/icons/check';
  import Minus from '@lucide/svelte/icons/minus';
  import { cn } from '../../utils/cn.js';

  type Props = {
    checked?: boolean;
    indeterminate?: boolean;
    disabled?: boolean;
    required?: boolean;
    name?: string;
    value?: string;
    label?: string;
    description?: string;
    id?: string;
    ariaLabel?: string;
    onchange?: (checked: boolean) => void;
    class?: string;
  };
  const uid = $props.id();
  let { checked = $bindable(false), indeterminate = $bindable(false), disabled = false, required = false, name, value, label, description, id = uid, ariaLabel, onchange, class: className }: Props = $props();
</script>

<div class={cn('flex items-start gap-2.5', className)}>
  <Checkbox.Root bind:checked bind:indeterminate {disabled} {required} {name} {value} {id} aria-label={ariaLabel} onCheckedChange={(v) => onchange?.(v)}
    class={cn('peer mt-0.5 flex size-4 shrink-0 items-center justify-center rounded-xs border border-line-control bg-surface-sunken text-action-primary-fg',
      'transition-[background-color,border-color,box-shadow] duration-fast ease-standard outline-none focus-visible:ring-focus',
      'hover:border-line-strong data-[state=checked]:border-action-primary data-[state=checked]:bg-action-primary data-[state=indeterminate]:border-action-primary data-[state=indeterminate]:bg-action-primary',
      'disabled:cursor-not-allowed disabled:opacity-(--opacity-disabled)')}>
    {#snippet children({ checked, indeterminate })}
      {#if checked}<Check class="size-3" strokeWidth={3} aria-hidden="true" />{:else if indeterminate}<Minus class="size-3" strokeWidth={3} aria-hidden="true" />{/if}
    {/snippet}
  </Checkbox.Root>
  {#if label || description}
    <label for={id} class={cn('flex min-w-0 flex-col gap-0.5 select-none text-body', disabled ? 'cursor-not-allowed text-fg-disabled' : 'cursor-pointer text-fg-primary')}>
      {#if label}<span>{label}</span>{/if}
      {#if description}<span class="text-caption text-fg-tertiary">{description}</span>{/if}
    </label>
  {/if}
</div>
