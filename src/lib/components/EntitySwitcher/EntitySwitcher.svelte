<script lang="ts" module>
  import type { IconComponent, Tone } from '../../types.js';
  export type Entity = { id: string; name: string; detail?: string; image?: string | null; icon?: IconComponent; group?: string; tone?: Tone; disabled?: boolean };
</script>

<script lang="ts">
  import type { Snippet } from 'svelte';
  import { DropdownMenu } from 'bits-ui';
  import ChevronsUpDown from '@lucide/svelte/icons/chevrons-up-down';
  import Check from '@lucide/svelte/icons/check';
  import Plus from '@lucide/svelte/icons/plus';
  import { cn } from '../../utils/cn.js';
  import Avatar from '../Avatar/Avatar.svelte';
  import { menuContentClasses, menuItemClasses } from '../Menu/Menu.svelte';

  type Props = { entities: Entity[]; value?: string; label: string; placeholder?: string; collapsed?: boolean; size?: 'sm' | 'md'; createLabel?: string; shape?: 'circle' | 'square'; onchange?: (entity: Entity) => void; oncreate?: () => void; footer?: Snippet; class?: string };
  let { entities, value = $bindable(), label, placeholder, collapsed = false, size = 'md', createLabel, shape = 'square', onchange, oncreate, footer, class: className }: Props = $props();
  const current = $derived(entities.find((e) => e.id === value));
  const groups = $derived.by(() => { const out: { id: string; label?: string; items: Entity[] }[] = []; for (const e of entities) { const k = e.group ?? ''; let g = out.find((x) => x.id === k); if (!g) { g = { id: k, label: e.group, items: [] }; out.push(g); } g.items.push(e); } return out; });
  const CurrentIcon = $derived(current?.icon);
</script>

<DropdownMenu.Root>
  <DropdownMenu.Trigger aria-label={label} class={cn('flex w-full min-w-0 items-center gap-2.5 rounded-md border border-transparent text-start outline-none transition-colors duration-fast hover:bg-surface-control-hover focus-visible:ring-focus data-[state=open]:bg-surface-control', size === 'sm' ? 'h-control-md px-1.5' : 'h-12 px-2', collapsed && 'justify-center px-0', className)}>
    {#if current?.image || !CurrentIcon}
      <Avatar src={current?.image} name={current?.name ?? '?'} {shape} size={size === 'sm' ? 'sm' : 'md'} />
    {:else}
      <span aria-hidden="true" class="flex size-8 shrink-0 items-center justify-center rounded-md bg-surface-control text-fg-secondary [&_svg]:size-icon-sm"><CurrentIcon /></span>
    {/if}
    {#if !collapsed}
      <span class="flex min-w-0 flex-1 flex-col leading-tight">
        <span class="truncate text-body-strong text-fg-primary">{current?.name ?? placeholder ?? label}</span>
        {#if current?.detail}<span class="truncate text-caption text-fg-tertiary">{current.detail}</span>{/if}
      </span>
      <ChevronsUpDown aria-hidden="true" class="size-icon-sm shrink-0 text-fg-tertiary" />
    {/if}
  </DropdownMenu.Trigger>
  <DropdownMenu.Portal>
    <DropdownMenu.Content side={collapsed ? 'right' : 'bottom'} align="start" sideOffset={6} class={cn(menuContentClasses, 'min-w-(--bits-dropdown-menu-anchor-width) w-64')}>
      <DropdownMenu.GroupHeading class="px-2 py-1.5 text-label text-fg-tertiary">{label}</DropdownMenu.GroupHeading>
      {#each groups as g, gi (g.id)}
        {#if gi > 0}<DropdownMenu.Separator class="-mx-1 my-1 h-px bg-line-subtle" />{/if}
        <DropdownMenu.Group>
          {#if g.label}<DropdownMenu.GroupHeading class="px-2 py-1.5 text-caption text-fg-tertiary">{g.label}</DropdownMenu.GroupHeading>{/if}
          {#each g.items as e (e.id)}
            {@const Icon = e.icon}
            <DropdownMenu.Item disabled={e.disabled} textValue={e.name} onSelect={() => { value = e.id; onchange?.(e); }} class={cn(menuItemClasses, 'h-auto py-1.5')}>
              {#if e.image || !Icon}<Avatar src={e.image} name={e.name} {shape} size="sm" />{:else}<span aria-hidden="true" class="flex size-6 shrink-0 items-center justify-center rounded-md bg-surface-control [&_svg]:size-3.5"><Icon /></span>{/if}
              <span class="flex min-w-0 flex-1 flex-col leading-tight"><span class="truncate">{e.name}</span>{#if e.detail}<span class="truncate text-caption text-fg-tertiary">{e.detail}</span>{/if}</span>
              {#if e.id === value}<Check aria-hidden="true" class="text-fg-primary!" />{/if}
            </DropdownMenu.Item>
          {/each}
        </DropdownMenu.Group>
      {/each}
      {#if oncreate || footer}
        <DropdownMenu.Separator class="-mx-1 my-1 h-px bg-line-subtle" />
        {#if oncreate}<DropdownMenu.Item onSelect={oncreate} class={menuItemClasses}><span aria-hidden="true" class="flex size-6 items-center justify-center rounded-md border border-dashed border-line-default [&_svg]:size-3.5"><Plus /></span><span class="flex-1">{createLabel ?? '+'}</span></DropdownMenu.Item>{/if}
        {#if footer}<div class="px-2 py-1.5">{@render footer()}</div>{/if}
      {/if}
    </DropdownMenu.Content>
  </DropdownMenu.Portal>
</DropdownMenu.Root>
