<script lang="ts">
  import type { Snippet } from 'svelte';
  import { Tabs } from 'bits-ui';
  import type { IconComponent, Tone } from '../../types.js';
  import { cn } from '../../utils/cn.js';

  export type Tab = { value: string; label: string; icon?: IconComponent; count?: number | string; tone?: Tone; disabled?: boolean };

  type Props = {
    value?: string;
    tabs: Tab[];
    variant?: 'underline' | 'pill' | 'segmented';
    size?: 'sm' | 'md';
    label?: string;
    orientation?: 'horizontal' | 'vertical';
    block?: boolean;
    onchange?: (value: string) => void;
    children?: Snippet<[{ value: string }]>;
    class?: string;
    listClass?: string;
  };
  let { value = $bindable(''), tabs, variant = 'underline', size = 'md', label, orientation = 'horizontal', block = false, onchange, children, class: className, listClass }: Props = $props();

  $effect(() => { if (!value && tabs[0]) value = tabs[0].value; });

  const dot: Record<Tone, string> = { neutral: 'bg-fg-tertiary', accent: 'bg-accent', success: 'bg-success', warning: 'bg-warning', danger: 'bg-danger', info: 'bg-info', intelligence: 'bg-intelligence' };
  const list = {
    underline: 'gap-1 border-b border-line-subtle',
    pill: 'gap-1',
    segmented: 'gap-0.5 rounded-md bg-surface-sunken p-0.5 border border-line-subtle',
  } as const;
  const trigger = {
    underline: 'relative -mb-px rounded-none border-b-2 border-transparent px-3 text-fg-secondary hover:text-fg-primary data-[state=active]:border-fg-primary data-[state=active]:text-fg-primary',
    pill: 'rounded-md px-3 text-fg-secondary hover:bg-surface-control-hover hover:text-fg-primary data-[state=active]:bg-surface-control data-[state=active]:text-fg-primary',
    segmented: 'rounded-sm px-3 text-fg-secondary hover:text-fg-primary data-[state=active]:bg-surface-raised data-[state=active]:text-fg-primary data-[state=active]:shadow-raised',
  } as const;
</script>

<Tabs.Root bind:value {orientation} onValueChange={(v) => onchange?.(v)} class={cn('flex min-w-0', orientation === 'vertical' ? 'flex-row gap-4' : 'flex-col gap-4', className)}>
  <Tabs.List aria-label={label} class={cn('flex min-w-0 shrink-0 items-center overflow-x-auto', orientation === 'vertical' && 'flex-col items-stretch', list[variant], block && '[&>*]:flex-1', listClass)}>
    {#each tabs as tab (tab.value)}
      {@const Icon = tab.icon}
      <Tabs.Trigger value={tab.value} disabled={tab.disabled}
        class={cn('inline-flex items-center justify-center gap-1.5 whitespace-nowrap font-medium outline-none transition-[color,background-color,border-color] duration-fast ease-standard focus-visible:ring-focus disabled:pointer-events-none disabled:opacity-(--opacity-disabled) [&_svg]:size-icon-sm [&_svg]:shrink-0',
          size === 'sm' ? 'h-control-sm text-label' : 'h-control-md text-body', trigger[variant], orientation === 'vertical' && 'justify-start')}>
        {#if Icon}<Icon aria-hidden="true" />{/if}
        {tab.label}
        {#if tab.tone}<span aria-hidden="true" class={cn('size-1.5 rounded-full', dot[tab.tone])}></span>{/if}
        {#if tab.count !== undefined}<span class="rounded-xs bg-surface-control px-1.5 py-px text-caption tabular text-fg-secondary">{tab.count}</span>{/if}
      </Tabs.Trigger>
    {/each}
  </Tabs.List>
  {#if children}
    {#each tabs as tab (tab.value)}
      <Tabs.Content value={tab.value} class="min-w-0 flex-1 outline-none focus-visible:ring-focus">{@render children({ value: tab.value })}</Tabs.Content>
    {/each}
  {/if}
</Tabs.Root>
