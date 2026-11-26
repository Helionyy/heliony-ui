<script lang="ts" module>
  import type { IconComponent, Tone } from '../../types.js';
  export type TreeNode = { id: string; label: string; icon?: IconComponent; meta?: string; count?: number; tone?: Tone; disabled?: boolean; children?: TreeNode[] };
</script>

<script lang="ts">
  import ChevronRight from '@lucide/svelte/icons/chevron-right';
  import Folder from '@lucide/svelte/icons/folder';
  import FolderOpen from '@lucide/svelte/icons/folder-open';
  import File from '@lucide/svelte/icons/file';
  import { cn } from '../../utils/cn.js';
  import Badge from '../Badge/Badge.svelte';

  type Props = { nodes: TreeNode[]; selected?: string | null; expanded?: string[]; label?: string; density?: 'compact' | 'default'; defaultIcons?: boolean; onselect?: (node: TreeNode) => void; ontoggle?: (node: TreeNode, open: boolean) => void; class?: string };
  let { nodes, selected = $bindable(null), expanded = $bindable([]), label, density = 'default', defaultIcons = true, onselect, ontoggle, class: className }: Props = $props();
  let root = $state<HTMLElement | null>(null);
  const isOpen = (id: string) => expanded.includes(id);
  const toggle = (n: TreeNode) => { const open = !isOpen(n.id); expanded = open ? [...expanded, n.id] : expanded.filter((x) => x !== n.id); ontoggle?.(n, open); };
  const pick = (n: TreeNode) => { if (n.disabled) return; selected = n.id; onselect?.(n); if (n.children?.length) toggle(n); };
  const items = () => Array.from(root?.querySelectorAll<HTMLElement>('[role="treeitem"]') ?? []);
  function onkey(e: KeyboardEvent, n: TreeNode, level: number) {
    const list = items();
    const i = list.indexOf(e.currentTarget as HTMLElement);
    const branch = Boolean(n.children?.length);
    switch (e.key) {
      case 'ArrowDown': list[Math.min(i + 1, list.length - 1)]?.focus(); break;
      case 'ArrowUp': list[Math.max(i - 1, 0)]?.focus(); break;
      case 'Home': list[0]?.focus(); break;
      case 'End': list[list.length - 1]?.focus(); break;
      case 'ArrowRight': if (branch && !isOpen(n.id)) toggle(n); else if (branch) list[i + 1]?.focus(); break;
      case 'ArrowLeft': if (branch && isOpen(n.id)) toggle(n); else if (level > 0) ((e.currentTarget as HTMLElement).closest('[role="group"]')?.previousElementSibling as HTMLElement | null)?.focus(); break;
      case 'Enter': case ' ': pick(n); break;
      default: return;
    }
    e.preventDefault();
  }
  const rowH = $derived(density === 'compact' ? 'h-7 text-caption' : 'h-8 text-body');
</script>

{#snippet node(n: TreeNode, level: number, first: boolean)}
  {@const branch = Boolean(n.children?.length)}
  {@const open = branch && isOpen(n.id)}
  {@const Icon = n.icon ?? (defaultIcons ? (branch ? (open ? FolderOpen : Folder) : File) : undefined)}
  <li role="none">
    <!-- svelte-ignore a11y_click_events_have_key_events -->
    <div role="treeitem" tabindex={selected === n.id || (!selected && first) ? 0 : -1} aria-level={level + 1} aria-selected={selected === n.id} aria-expanded={branch ? open : undefined} aria-disabled={n.disabled || undefined}
      class={cn('flex items-center gap-1.5 rounded-md pe-2 outline-none transition-colors duration-fast hover:bg-surface-control-hover focus-visible:ring-focus', rowH, selected === n.id && 'bg-surface-control text-fg-primary', n.disabled && 'pointer-events-none opacity-(--opacity-disabled)')} style={`padding-inline-start:${level * 1.25 + 0.25}rem`}
      onclick={() => pick(n)} onkeydown={(e) => onkey(e, n, level)}>
      <span aria-hidden="true" class="flex size-4 shrink-0 items-center justify-center text-fg-tertiary">{#if branch}<ChevronRight class={cn('size-3.5 transition-transform duration-fast', open && 'rotate-90')} />{/if}</span>
      {#if Icon}<Icon aria-hidden="true" class="size-icon-sm shrink-0 text-fg-tertiary" />{/if}
      <span class="min-w-0 flex-1 truncate text-fg-primary">{n.label}</span>
      {#if n.count !== undefined}<Badge size="sm" tone={n.tone ?? 'neutral'}>{n.count}</Badge>{/if}
      {#if n.meta}<span class="shrink-0 text-caption tabular text-fg-tertiary">{n.meta}</span>{/if}
    </div>
    {#if open}<ul role="group" class="flex flex-col gap-px">{#each n.children ?? [] as c (c.id)}{@render node(c, level + 1, false)}{/each}</ul>{/if}
  </li>
{/snippet}

<ul bind:this={root} role="tree" aria-label={label} class={cn('flex min-w-0 flex-col gap-px', className)}>
  {#each nodes as n, i (n.id)}{@render node(n, 0, i === 0)}{/each}
</ul>
