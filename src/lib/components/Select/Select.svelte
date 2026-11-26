<script lang="ts">
  import { Select } from 'bits-ui';
  import Check from '@lucide/svelte/icons/check';
  import ChevronDown from '@lucide/svelte/icons/chevron-down';
  import type { Option } from '../../types.js';
  import { cn } from '../../utils/cn.js';
  import { useStrings } from '../../i18n/context.svelte.js';
  import { inputClasses } from '../Input/Input.svelte';
  import { useField } from '../Field/context.svelte.js';
  import { menuContentClasses, menuItemClasses } from '../Menu/Menu.svelte';

  type Props = {
    value?: string;
    options: Option[];
    placeholder?: string;
    size?: 'sm' | 'md' | 'lg';
    disabled?: boolean;
    required?: boolean;
    invalid?: boolean;
    name?: string;
    id?: string;
    block?: boolean;
    onchange?: (value: string) => void;
    class?: string;
  };
  let { value = $bindable(''), options, placeholder, size = 'md', disabled, required, invalid, name, id, block = true, onchange, class: className }: Props = $props();
  const t = useStrings();
  const field = useField();
  const selected = $derived(options.find((o) => o.value === value));
  const isInvalid = $derived(invalid ?? field?.invalid ?? false);
  const isDisabled = $derived(disabled ?? field?.disabled ?? false);
  const heights = { sm: 'h-control-sm text-label', md: 'h-control-md', lg: 'h-control-lg' } as const;
  const groups = $derived.by(() => {
    const out: { id: string; label?: string; items: Option[] }[] = [];
    for (const o of options) {
      const key = o.group ?? '';
      let g = out.find((x) => x.id === key);
      if (!g) { g = { id: key, label: o.group, items: [] }; out.push(g); }
      g.items.push(o);
    }
    return out;
  });
  const SelectedIcon = $derived(selected?.icon);
</script>

<Select.Root type="single" bind:value disabled={isDisabled} required={required ?? field?.required} {name} onValueChange={(v) => onchange?.(v)} items={options.map((o) => ({ value: o.value, label: o.label, disabled: o.disabled }))}>
  <Select.Trigger id={id ?? field?.id} aria-invalid={isInvalid || undefined} aria-describedby={field?.describedBy} data-invalid={isInvalid || undefined}
    class={cn(inputClasses, heights[size], 'justify-between gap-2 px-3 text-start outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus-ring data-placeholder:text-fg-tertiary', block ? 'w-full' : 'w-fit', className)}>
    <span class="flex min-w-0 flex-1 items-center gap-2 truncate">
      {#if SelectedIcon}<SelectedIcon aria-hidden="true" class="size-icon-sm shrink-0 text-fg-tertiary" />{/if}
      {#if selected}
        <span class="truncate">{selected.label}</span>
        {#if selected.detail}<span class="truncate text-caption text-fg-tertiary">{selected.detail}</span>{/if}
      {:else}
        <span class="truncate text-fg-tertiary">{placeholder ?? t.common.select}</span>
      {/if}
    </span>
    <ChevronDown aria-hidden="true" class="size-icon-sm shrink-0 text-fg-tertiary" />
  </Select.Trigger>
  <Select.Portal>
    <Select.Content sideOffset={6} class={cn(menuContentClasses, 'max-h-(--bits-select-content-available-height) min-w-(--bits-select-anchor-width) origin-(--bits-select-content-transform-origin)')}>
      <Select.Viewport class="p-0">
        {#each groups as group, gi (group.id)}
          {#if gi > 0}<div role="separator" class="-mx-1 my-1 h-px bg-line-subtle"></div>{/if}
          <Select.Group>
            {#if group.label}<Select.GroupHeading class="px-2 py-1.5 text-label text-fg-tertiary">{group.label}</Select.GroupHeading>{/if}
            {#each group.items as option (option.value)}
              {@const Icon = option.icon}
              <Select.Item value={option.value} label={option.label} disabled={option.disabled} class={cn(menuItemClasses, 'pe-8')}>
                {#snippet children({ selected })}
                  {#if Icon}<Icon aria-hidden="true" />{/if}
                  <span class="flex-1 truncate">{option.label}</span>
                  {#if option.detail}<span class="truncate text-caption text-fg-tertiary">{option.detail}</span>{/if}
                  {#if selected}<Check aria-hidden="true" class="absolute end-2 text-fg-primary!" />{/if}
                {/snippet}
              </Select.Item>
            {/each}
          </Select.Group>
        {/each}
      </Select.Viewport>
    </Select.Content>
  </Select.Portal>
</Select.Root>
