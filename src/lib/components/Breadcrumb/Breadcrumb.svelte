<script lang="ts">
  import ChevronRight from '@lucide/svelte/icons/chevron-right';
  import Ellipsis from '@lucide/svelte/icons/ellipsis';
  import type { Crumb, MenuEntry } from '../../types.js';
  import { cn } from '../../utils/cn.js';
  import { useStrings } from '../../i18n/context.svelte.js';
  import Menu from '../Menu/Menu.svelte';
  import Button from '../Button/Button.svelte';

  type Props = { items: Crumb[]; maxVisible?: number; onnavigate?: (crumb: Crumb) => void; class?: string };
  let { items, maxVisible = 4, onnavigate, class: className }: Props = $props();
  const t = useStrings();
  const collapsed = $derived(items.length > maxVisible ? items.slice(1, items.length - (maxVisible - 2)) : []);
  const visible = $derived(collapsed.length ? [items[0]!, ...items.slice(items.length - (maxVisible - 2))] : items);
  const menuItems = $derived<MenuEntry[]>(collapsed.map((c, i) => ({ id: String(i), label: c.label, href: c.href, icon: c.icon })));
  const link = 'inline-flex items-center gap-1.5 rounded-xs text-fg-secondary transition-colors duration-fast hover:text-fg-primary focus-visible:ring-focus outline-none [&_svg]:size-icon-sm';
</script>

<nav aria-label={t.nav.breadcrumb} class={cn('min-w-0', className)}>
  <ol class="flex flex-wrap items-center gap-1.5 text-body">
    {#each visible as crumb, i (crumb.label + i)}
      {@const Icon = crumb.icon}
      {@const last = i === visible.length - 1}
      {#if i > 0}<li aria-hidden="true" class="flex items-center text-fg-disabled"><ChevronRight class="size-3.5" /></li>{/if}
      {#if i === 1 && collapsed.length}
        <li class="flex items-center">
          <Menu items={menuItems} onselect={(m) => { const c = collapsed[Number(m.id)]; if (c) onnavigate?.(c); }}>
            {#snippet trigger({ props })}
              <Button {...props} variant="quiet" size="sm" iconOnly icon={Ellipsis} label={t.common.more} class="h-6 w-6" />
            {/snippet}
          </Menu>
        </li>
        <li aria-hidden="true" class="flex items-center text-fg-disabled"><ChevronRight class="size-3.5" /></li>
      {/if}
      <li class="flex min-w-0 items-center">
        {#if last}
          <span aria-current="page" class="inline-flex min-w-0 items-center gap-1.5 truncate font-medium text-fg-primary [&_svg]:size-icon-sm">{#if Icon}<Icon aria-hidden="true" />{/if}{crumb.label}</span>
        {:else if crumb.href}
          <a href={crumb.href} class={link} onclick={() => onnavigate?.(crumb)}>{#if Icon}<Icon aria-hidden="true" />{/if}{crumb.label}</a>
        {:else}
          <button type="button" class={link} onclick={() => onnavigate?.(crumb)}>{#if Icon}<Icon aria-hidden="true" />{/if}{crumb.label}</button>
        {/if}
      </li>
    {/each}
  </ol>
</nav>
