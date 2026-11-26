<script lang="ts">
  import type { HTMLTextareaAttributes } from 'svelte/elements';
  import { cn } from '../../utils/cn.js';
  import { inputClasses } from '../Input/Input.svelte';
  import { useField } from '../Field/context.svelte.js';

  type Props = Omit<HTMLTextareaAttributes, 'value'> & {
    value?: string | null;
    invalid?: boolean;
    autosize?: boolean;
    mono?: boolean;
    ref?: HTMLTextAreaElement | null;
  };
  let { value = $bindable(''), invalid, autosize = false, mono = false, id, disabled, required, rows = 3, ref = $bindable(null), class: className, ...rest }: Props = $props();
  const field = useField();
  const isInvalid = $derived(invalid ?? field?.invalid ?? false);
  const isDisabled = $derived(disabled ?? field?.disabled ?? false);

  $effect(() => {
    if (!autosize || !ref) return;
    void value;
    ref.style.height = 'auto';
    ref.style.height = `${ref.scrollHeight}px`;
  });
</script>

<textarea bind:this={ref} bind:value {rows} id={id ?? field?.id} disabled={isDisabled} required={required ?? field?.required} aria-invalid={isInvalid || undefined} aria-describedby={rest['aria-describedby'] ?? field?.describedBy} data-invalid={isInvalid || undefined}
  class={cn(inputClasses, 'block min-h-control-md resize-y px-3 py-2 leading-relaxed outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus-ring', autosize && 'resize-none overflow-hidden', mono && 'font-mono text-code', className)} {...rest}></textarea>
