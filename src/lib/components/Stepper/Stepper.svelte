<script lang="ts">
  import Minus from '@lucide/svelte/icons/minus';
  import Plus from '@lucide/svelte/icons/plus';
  import { cn } from '../../utils/cn.js';
  import { useStrings } from '../../i18n/context.svelte.js';
  import { useField } from '../Field/context.svelte.js';
  import { inputClasses } from '../Input/Input.svelte';

  type Props = { value?: number; min?: number; max?: number; step?: number; size?: 'sm' | 'md' | 'lg'; disabled?: boolean; invalid?: boolean; id?: string; name?: string; suffix?: string; showMax?: boolean; onchange?: (value: number) => void; class?: string };
  let { value = $bindable(0), min = 0, max = Number.POSITIVE_INFINITY, step = 1, size = 'md', disabled, invalid, id, name, suffix, showMax = false, onchange, class: className }: Props = $props();
  const t = useStrings();
  const field = useField();
  const isDisabled = $derived(disabled ?? field?.disabled ?? false);
  const isInvalid = $derived(invalid ?? field?.invalid ?? false);
  const clamp = (v: number) => Math.min(max, Math.max(min, Math.round(v / step) * step));
  const set = (v: number) => { const next = clamp(v); if (next !== value) { value = next; onchange?.(next); } };
  const heights = { sm: 'h-control-sm text-label', md: 'h-control-md', lg: 'h-control-lg' } as const;
  const btn = 'flex h-full shrink-0 items-center justify-center text-fg-secondary outline-none transition-colors duration-fast hover:bg-surface-control-hover hover:text-fg-primary focus-visible:ring-focus disabled:pointer-events-none disabled:opacity-(--opacity-disabled) [&_svg]:size-icon-sm';
  const onkey = (e: KeyboardEvent) => {
    const map: Record<string, number> = { ArrowUp: value + step, ArrowDown: value - step, PageUp: value + step * 10, PageDown: value - step * 10, Home: min, End: Number.isFinite(max) ? max : value };
    if (e.key in map) { e.preventDefault(); set(map[e.key]!); }
  };
</script>

<div data-invalid={isInvalid || undefined} data-disabled={isDisabled || undefined} class={cn(inputClasses, heights[size], 'w-fit gap-0 overflow-hidden p-0', className)}>
  <button type="button" class={cn(btn, size === 'sm' ? 'w-7' : 'w-8')} aria-label="−" tabindex="-1" disabled={isDisabled || value <= min} onclick={() => set(value - step)}><Minus aria-hidden="true" /></button>
  <input type="number" inputmode="numeric" id={id ?? field?.id} {name} {min} max={Number.isFinite(max) ? max : undefined} {step} disabled={isDisabled} aria-invalid={isInvalid || undefined} aria-describedby={field?.describedBy} value={value} onkeydown={onkey}
    oninput={(e) => { const n = Number(e.currentTarget.value); if (Number.isFinite(n)) set(n); }} onblur={(e) => { e.currentTarget.value = String(value); }}
    class={cn('w-14 min-w-0 bg-transparent text-center tabular outline-none [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none', isDisabled && 'cursor-not-allowed')} />
  {#if suffix || (showMax && Number.isFinite(max))}<span class="shrink-0 select-none pe-2 text-caption tabular text-fg-tertiary">{suffix ?? ''}{showMax && Number.isFinite(max) ? ` / ${max}` : ''}</span>{/if}
  <button type="button" class={cn(btn, size === 'sm' ? 'w-7' : 'w-8')} aria-label="+" tabindex="-1" disabled={isDisabled || value >= max} onclick={() => set(value + step)}><Plus aria-hidden="true" /></button>
  <span class="hy-visually-hidden">{t.common.select}</span>
</div>
