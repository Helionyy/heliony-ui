<script lang="ts">
  import type { Snippet } from 'svelte';
  import type { HTMLAttributes } from 'svelte/elements';
  import { cn } from '../../utils/cn.js';
  import { useStrings } from '../../i18n/context.svelte.js';
  import { setFieldContext } from './context.svelte.js';

  type Props = HTMLAttributes<HTMLDivElement> & {
    label?: string;
    help?: string;
    error?: string;
    aside?: string;
    required?: boolean;
    optional?: boolean;
    disabled?: boolean;
    orientation?: 'vertical' | 'horizontal';
    id?: string;
    children: Snippet<[{ id: string; describedBy: string | undefined; invalid: boolean; disabled: boolean }]>;
  };
  const uid = $props.id();
  let { label, help, error, aside, required = false, optional = false, disabled = false, orientation = 'vertical', id = uid, class: className, children, ...rest }: Props = $props();
  const t = useStrings();
  const helpId = $derived(`${id}-help`);
  const errorId = $derived(`${id}-error`);
  const describedBy = $derived([error && errorId, help && helpId].filter(Boolean).join(' ') || undefined);
  const invalid = $derived(Boolean(error));

  setFieldContext({ get id() { return id; }, get describedBy() { return describedBy; }, get invalid() { return invalid; }, get disabled() { return disabled; }, get required() { return required; } });
</script>

<div role="group" data-invalid={invalid || undefined} data-disabled={disabled || undefined} class={cn('group/field flex min-w-0 gap-1.5', orientation === 'vertical' ? 'flex-col' : 'flex-row flex-wrap items-center gap-x-3', className)} {...rest}>
  {#if label || aside}
    <div class={cn('flex items-baseline justify-between gap-3', orientation === 'horizontal' && 'min-w-32')}>
      <label for={id} class={cn('text-label text-fg-primary', disabled && 'text-fg-disabled')}>
        {label}
        {#if required}<span aria-hidden="true" class="text-danger">*</span><span class="hy-visually-hidden">({t.field.required})</span>{/if}
        {#if optional && !required}<span class="ms-1 font-normal text-fg-tertiary">({t.field.optional})</span>{/if}
      </label>
      {#if aside}<span class="text-caption text-fg-tertiary">{aside}</span>{/if}
    </div>
  {/if}
  <div class="flex min-w-0 flex-1 flex-col gap-1.5">
    {@render children({ id, describedBy, invalid, disabled })}
    {#if error}
      <p id={errorId} role="alert" class="text-caption text-danger-fg">{error}</p>
    {:else if help}
      <p id={helpId} class="text-caption text-fg-tertiary">{help}</p>
    {/if}
  </div>
</div>
