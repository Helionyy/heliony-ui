<script lang="ts">
  import { Switch } from 'bits-ui';
  import { cn } from '../../utils/cn.js';

  type Props = {
    checked?: boolean;
    disabled?: boolean;
    required?: boolean;
    name?: string;
    value?: string;
    label?: string;
    description?: string;
    size?: 'sm' | 'md';
    labelPosition?: 'end' | 'start';
    id?: string;
    onchange?: (checked: boolean) => void;
    class?: string;
  };
  const uid = $props.id();
  let { checked = $bindable(false), disabled = false, required = false, name, value, label, description, size = 'md', labelPosition = 'end', id = uid, onchange, class: className }: Props = $props();
</script>

<div class={cn('flex items-start gap-3', labelPosition === 'start' && 'flex-row-reverse justify-between', className)}>
  <Switch.Root bind:checked {disabled} {required} {name} {value} {id} onCheckedChange={(v) => onchange?.(v)}
    class={cn('peer inline-flex shrink-0 items-center rounded-full border border-transparent p-0.5 transition-[background-color,box-shadow] duration-fast ease-standard outline-none focus-visible:ring-focus',
      'bg-surface-control-active data-[state=checked]:bg-action-primary disabled:cursor-not-allowed disabled:opacity-(--opacity-disabled)',
      size === 'sm' ? 'h-4.5 w-8' : 'h-5.5 w-10')}>
    <Switch.Thumb class={cn('pointer-events-none block rounded-full bg-fg-primary shadow-raised transition-transform duration-fast ease-standard data-[state=checked]:bg-action-primary-fg',
      size === 'sm' ? 'size-3.5 data-[state=checked]:translate-x-3.5' : 'size-4.5 data-[state=checked]:translate-x-4.5', 'rtl:data-[state=checked]:-translate-x-[inherit]')} />
  </Switch.Root>
  {#if label || description}
    <label for={id} class={cn('flex min-w-0 flex-col gap-0.5 select-none text-body', disabled ? 'cursor-not-allowed text-fg-disabled' : 'cursor-pointer text-fg-primary')}>
      {#if label}<span>{label}</span>{/if}
      {#if description}<span class="text-caption text-fg-tertiary">{description}</span>{/if}
    </label>
  {/if}
</div>
