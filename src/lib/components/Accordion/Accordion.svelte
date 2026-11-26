<script lang="ts">
  import type { Snippet } from 'svelte';
  import { Accordion } from 'bits-ui';
  import ChevronDown from '@lucide/svelte/icons/chevron-down';
  import { slide } from 'svelte/transition';
  import type { IconComponent } from '../../types.js';
  import { cn } from '../../utils/cn.js';

  export type AccordionItem = { value: string; title: string; description?: string; icon?: IconComponent; disabled?: boolean };

  type Props = {
    items: AccordionItem[];
    value?: string | string[];
    multiple?: boolean;
    variant?: 'plain' | 'bordered';
    children: Snippet<[{ item: AccordionItem }]>;
    class?: string;
  };
  let { items, value = $bindable(), multiple = false, variant = 'plain', children, class: className }: Props = $props();
</script>

<Accordion.Root type={multiple ? 'multiple' : 'single'} bind:value={value as never} class={cn('flex min-w-0 flex-col', variant === 'bordered' ? 'divide-y divide-line-subtle rounded-lg border border-line-subtle' : 'divide-y divide-line-subtle', className)}>
  {#each items as item (item.value)}
    {@const Icon = item.icon}
    <Accordion.Item value={item.value} disabled={item.disabled} class="min-w-0">
      <Accordion.Header level={3} class="flex">
        <Accordion.Trigger class={cn('group flex flex-1 items-center gap-3 py-3 text-start text-body-strong text-fg-primary outline-none transition-colors duration-fast hover:text-fg-primary focus-visible:ring-focus disabled:pointer-events-none disabled:opacity-(--opacity-disabled)', variant === 'bordered' && 'px-4')}>
          {#if Icon}<Icon aria-hidden="true" class="size-icon-sm shrink-0 text-fg-tertiary" />{/if}
          <span class="flex min-w-0 flex-1 flex-col"><span>{item.title}</span>{#if item.description}<span class="text-caption font-normal text-fg-tertiary">{item.description}</span>{/if}</span>
          <ChevronDown aria-hidden="true" class="size-icon-sm shrink-0 text-fg-tertiary transition-transform duration-fast ease-standard group-data-[state=open]:rotate-180" />
        </Accordion.Trigger>
      </Accordion.Header>
      <Accordion.Content forceMount>
        {#snippet child({ props, open })}
          {#if open}
            <div {...props} transition:slide={{ duration: 180 }} class={cn('pb-4 text-body text-fg-secondary', variant === 'bordered' && 'px-4')}>{@render children({ item })}</div>
          {/if}
        {/snippet}
      </Accordion.Content>
    </Accordion.Item>
  {/each}
</Accordion.Root>
