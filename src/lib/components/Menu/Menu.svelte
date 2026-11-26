<script lang="ts" module>
  export const menuContentClasses = 'hy-float z-overlay min-w-44 max-h-(--bits-dropdown-menu-content-available-height) origin-(--bits-dropdown-menu-content-transform-origin) overflow-y-auto rounded-lg border border-line-subtle bg-surface-overlay p-1 text-fg-primary shadow-overlay outline-none';
  export const menuItemClasses = 'relative flex h-control-sm cursor-default select-none items-center gap-2 rounded-sm px-2 text-body text-fg-primary outline-none transition-colors duration-fast data-highlighted:bg-surface-control-hover data-disabled:pointer-events-none data-disabled:opacity-(--opacity-disabled) [&_svg]:size-icon-sm [&_svg]:shrink-0 [&_svg]:text-fg-tertiary';
</script>

<script lang="ts">
  import type { Snippet } from 'svelte';
  import { DropdownMenu } from 'bits-ui';
  import type { MenuEntry } from '../../types.js';
  import { cn } from '../../utils/cn.js';
  import Kbd from '../Kbd/Kbd.svelte';

  type Props = {
    items: MenuEntry[];
    open?: boolean;
    side?: 'top' | 'bottom' | 'left' | 'right';
    align?: 'start' | 'center' | 'end';
    label?: string;
    onselect?: (item: MenuEntry) => void;
    onOpenChange?: (open: boolean) => void;
    trigger: Snippet<[{ props: Record<string, unknown>; open: boolean }]>;
    class?: string;
  };
  let { items, open = $bindable(false), side = 'bottom', align = 'start', label, onselect, onOpenChange, trigger, class: className }: Props = $props();

  const groups = $derived.by(() => {
    const out: { id: string; label?: string; items: MenuEntry[] }[] = [];
    for (const item of items) {
      const key = item.group ?? '';
      let g = out.find((x) => x.id === key);
      if (!g) { g = { id: key, label: item.group, items: [] }; out.push(g); }
      g.items.push(item);
    }
    return out;
  });
</script>

<DropdownMenu.Root bind:open {onOpenChange}>
  <DropdownMenu.Trigger>
    {#snippet child({ props })}
      {@render trigger({ props, open })}
    {/snippet}
  </DropdownMenu.Trigger>
  <DropdownMenu.Portal>
    <DropdownMenu.Content {side} {align} sideOffset={6} aria-label={label} class={cn(menuContentClasses, className)}>
      {#each groups as group, gi (group.id)}
        {#if gi > 0}<DropdownMenu.Separator class="-mx-1 my-1 h-px bg-line-subtle" />{/if}
        <DropdownMenu.Group>
          {#if group.label}<DropdownMenu.GroupHeading class="px-2 py-1.5 text-label text-fg-tertiary">{group.label}</DropdownMenu.GroupHeading>{/if}
          {#each group.items as item (item.id)}
            {@const Icon = item.icon}
            {#if item.separatorBefore}<DropdownMenu.Separator class="-mx-1 my-1 h-px bg-line-subtle" />{/if}
            <DropdownMenu.Item disabled={item.disabled} textValue={item.label} onSelect={() => onselect?.(item)}
              class={cn(menuItemClasses, item.danger && 'text-danger-fg data-highlighted:bg-danger-subtle [&_svg]:text-danger-fg')}>
              {#snippet child({ props })}
                {#if item.href}
                  <a {...props} href={item.href}>
                    {#if Icon}<Icon aria-hidden="true" />{/if}
                    <span class="flex-1 truncate">{item.label}</span>
                    {#if item.detail}<span class="text-caption text-fg-tertiary">{item.detail}</span>{/if}
                    {#if item.shortcut}<Kbd>{item.shortcut}</Kbd>{/if}
                  </a>
                {:else}
                  <div {...props}>
                    {#if Icon}<Icon aria-hidden="true" />{/if}
                    <span class="flex-1 truncate">{item.label}</span>
                    {#if item.detail}<span class="text-caption text-fg-tertiary">{item.detail}</span>{/if}
                    {#if item.shortcut}<Kbd>{item.shortcut}</Kbd>{/if}
                  </div>
                {/if}
              {/snippet}
            </DropdownMenu.Item>
          {/each}
        </DropdownMenu.Group>
      {/each}
    </DropdownMenu.Content>
  </DropdownMenu.Portal>
</DropdownMenu.Root>
