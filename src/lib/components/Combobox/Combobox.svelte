<script lang="ts">
  import { Combobox } from 'bits-ui';
  import Check from '@lucide/svelte/icons/check';
  import ChevronsUpDown from '@lucide/svelte/icons/chevrons-up-down';
  import type { Option } from '../../types.js';
  import { cn } from '../../utils/cn.js';
  import { useStrings } from '../../i18n/context.svelte.js';
  import { inputClasses } from '../Input/Input.svelte';
  import { useField } from '../Field/context.svelte.js';
  import { menuContentClasses, menuItemClasses } from '../Menu/Menu.svelte';
  import Spinner from '../Spinner/Spinner.svelte';

  type Props = {
    value?: string;
    options: Option[];
    placeholder?: string;
    emptyText?: string;
    size?: 'sm' | 'md' | 'lg';
    loading?: boolean;
    disabled?: boolean;
    required?: boolean;
    invalid?: boolean;
    name?: string;
    id?: string;
    filter?: (option: Option, query: string) => boolean;
    onsearch?: (query: string) => void;
    onchange?: (value: string) => void;
    class?: string;
  };
  let { value = $bindable(''), options, placeholder, emptyText, size = 'md', loading = false, disabled, required, invalid, name, id, filter, onsearch, onchange, class: className }: Props = $props();
  const t = useStrings();
  const field = useField();
  let query = $state('');
  let open = $state(false);
  const selected = $derived(options.find((o) => o.value === value));
  const defaultFilter = (o: Option, q: string) => `${o.label} ${o.detail ?? ''}`.toLowerCase().includes(q.toLowerCase());
  const visible = $derived(query && open ? options.filter((o) => (filter ?? defaultFilter)(o, query)) : options);
  const isInvalid = $derived(invalid ?? field?.invalid ?? false);
  const isDisabled = $derived(disabled ?? field?.disabled ?? false);
  const heights = { sm: 'h-control-sm text-label', md: 'h-control-md', lg: 'h-control-lg' } as const;
</script>

<Combobox.Root type="single" bind:value bind:open disabled={isDisabled} required={required ?? field?.required} {name} items={options.map((o) => ({ value: o.value, label: o.label, disabled: o.disabled }))}
  onValueChange={(v) => { onchange?.(v); query = ''; }} onOpenChange={(o) => { if (!o) query = ''; }}>
  <div data-invalid={isInvalid || undefined} data-disabled={isDisabled || undefined} class={cn(inputClasses, heights[size], 'gap-2 px-3', className)}>
    <Combobox.Input id={id ?? field?.id} aria-invalid={isInvalid || undefined} aria-describedby={field?.describedBy} placeholder={placeholder ?? t.common.search}
      defaultValue={selected?.label ?? ''} oninput={(e) => { query = e.currentTarget.value; onsearch?.(query); }}
      class="min-w-0 flex-1 bg-transparent outline-none placeholder:text-fg-tertiary disabled:cursor-not-allowed" />
    {#if loading}<Spinner size="sm" class="text-fg-tertiary" />{/if}
    <Combobox.Trigger class="-me-1 flex size-6 shrink-0 items-center justify-center rounded-xs text-fg-tertiary outline-none hover:text-fg-primary focus-visible:ring-focus" aria-label={t.common.open}>
      <ChevronsUpDown aria-hidden="true" class="size-icon-sm" />
    </Combobox.Trigger>
  </div>
  <Combobox.Portal>
    <Combobox.Content sideOffset={6} class={cn(menuContentClasses, 'max-h-(--bits-combobox-content-available-height) min-w-(--bits-combobox-anchor-width) origin-(--bits-combobox-content-transform-origin)')}>
      <Combobox.Viewport class="p-0">
        {#each visible as option (option.value)}
          {@const Icon = option.icon}
          <Combobox.Item value={option.value} label={option.label} disabled={option.disabled} class={cn(menuItemClasses, 'pe-8')}>
            {#snippet children({ selected })}
              {#if Icon}<Icon aria-hidden="true" />{/if}
              <span class="flex-1 truncate">{option.label}</span>
              {#if option.detail}<span class="truncate text-caption text-fg-tertiary">{option.detail}</span>{/if}
              {#if selected}<Check aria-hidden="true" class="absolute end-2 text-fg-primary!" />{/if}
            {/snippet}
          </Combobox.Item>
        {:else}
          <p class="px-2 py-3 text-center text-caption text-fg-tertiary">{emptyText ?? t.table.noResults}</p>
        {/each}
      </Combobox.Viewport>
    </Combobox.Content>
  </Combobox.Portal>
</Combobox.Root>
