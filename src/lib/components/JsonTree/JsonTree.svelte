<script lang="ts">
  import ChevronRight from '@lucide/svelte/icons/chevron-right';
  import Copy from '@lucide/svelte/icons/copy';
  import Filter from '@lucide/svelte/icons/filter';
  import UnfoldVertical from '@lucide/svelte/icons/unfold-vertical';
  import FoldVertical from '@lucide/svelte/icons/fold-vertical';
  import { cn } from '../../utils/cn.js';
  import { useStrings } from '../../i18n/context.svelte.js';
  import Button from '../Button/Button.svelte';

  type Props = { value: unknown; depth?: number; density?: 'compact' | 'default'; label?: string; toolbar?: boolean; expanded?: string[]; maxString?: number; oncopy?: (path: string, value: unknown) => void; onfilter?: (path: string, value: unknown) => void; class?: string };
  let { value, depth = 2, density = 'default', label, toolbar = true, expanded = $bindable(), maxString = 80, oncopy, onfilter, class: className }: Props = $props();
  const t = useStrings();
  let root = $state<HTMLElement | null>(null);
  let longOpen = $state<string[]>([]);
  const isObj = (v: unknown): v is Record<string, unknown> => typeof v === 'object' && v !== null && !Array.isArray(v);
  const isContainer = (v: unknown) => Array.isArray(v) || isObj(v);
  const entries = (v: unknown): [string, unknown][] => (Array.isArray(v) ? v.map((x, i) => [String(i), x]) : isObj(v) ? Object.entries(v) : []);
  const join = (path: string, key: string, inArray: boolean) => (inArray ? `${path}[${key}]` : path ? `${path}.${key}` : key);
  function containers(v: unknown, path: string, level: number, limit: number, out: string[]): string[] {
    if (!isContainer(v) || level >= limit) return out;
    out.push(path);
    for (const [k, child] of entries(v)) containers(child, join(path, k, Array.isArray(v)), level + 1, limit, out);
    return out;
  }
  const isOpen = (path: string, level: number) => (expanded ? expanded.includes(path) : level < depth);
  const toggle = (path: string) => { const cur = expanded ?? containers(value, '', 0, depth, []); expanded = cur.includes(path) ? cur.filter((p) => p !== path) : [...cur, path]; };
  const expandAll = () => (expanded = containers(value, '', 0, Infinity, []));
  const collapseAll = () => (expanded = []);
  const kind = (v: unknown) => (v === null || v === undefined ? 'null' : typeof v === 'string' ? 'string' : typeof v === 'number' || typeof v === 'bigint' ? 'number' : typeof v === 'boolean' ? 'boolean' : 'other');
  const scalar = (v: unknown) => (v === null ? 'null' : v === undefined ? 'undefined' : typeof v === 'string' ? JSON.stringify(v) : String(v));
  const valueClass: Record<string, string> = { null: 'text-fg-tertiary italic', string: 'text-syntax-string', number: 'text-syntax-number', boolean: 'text-syntax-keyword', other: 'text-fg-secondary' };
  const rows = () => Array.from(root?.querySelectorAll<HTMLElement>('[role="treeitem"]') ?? []);
  function onkey(e: KeyboardEvent, path: string, v: unknown, level: number) {
    const list = rows();
    const i = list.indexOf(e.currentTarget as HTMLElement);
    const branch = isContainer(v) && entries(v).length > 0;
    switch (e.key) {
      case 'ArrowDown': list[Math.min(i + 1, list.length - 1)]?.focus(); break;
      case 'ArrowUp': list[Math.max(i - 1, 0)]?.focus(); break;
      case 'Home': list[0]?.focus(); break;
      case 'End': list[list.length - 1]?.focus(); break;
      case 'ArrowRight': if (branch && !isOpen(path, level)) toggle(path); else if (branch) list[i + 1]?.focus(); break;
      case 'ArrowLeft': if (branch && isOpen(path, level)) toggle(path); else if (level > 0) ((e.currentTarget as HTMLElement).closest('[role="group"]')?.previousElementSibling as HTMLElement | null)?.focus(); break;
      case 'Enter': case ' ': if (branch) toggle(path); else if (typeof v === 'string' && v.length > maxString) toggleLong(path); break;
      case 'c': if (oncopy) oncopy(path, v); else return; break;
      case 'f': if (onfilter && !isContainer(v)) onfilter(path, v); else return; break;
      default: return;
    }
    e.preventDefault();
  }
  const toggleLong = (path: string) => { longOpen = longOpen.includes(path) ? longOpen.filter((p) => p !== path) : [...longOpen, path]; };
  const rowH = $derived(density === 'compact' ? 'min-h-6' : 'min-h-7');
</script>

{#snippet node(key: string, v: unknown, path: string, level: number, inArray: boolean)}
  {@const branch = isContainer(v)}
  {@const kids = entries(v)}
  {@const open = branch && isOpen(path, level)}
  {@const long = typeof v === 'string' && v.length > maxString}
  <!-- svelte-ignore a11y_click_events_have_key_events -->
  <div role="treeitem" tabindex={level === 0 && key === '' ? 0 : -1} aria-level={level + 1} aria-selected={false} aria-expanded={branch && kids.length ? open : undefined}
    class={cn('group/row flex items-center gap-1 rounded-xs pe-2 font-mono text-code outline-none hover:bg-surface-control-hover focus-visible:bg-surface-control-hover focus-visible:ring-focus', rowH)} style={`padding-inline-start:${level * 1.25 + 0.25}rem`}
    onclick={() => { if (branch && kids.length) toggle(path); }} onkeydown={(e) => onkey(e, path, v, level)}>
    <span aria-hidden="true" class="flex size-4 shrink-0 items-center justify-center text-fg-tertiary">{#if branch && kids.length}<ChevronRight class={cn('size-3.5 transition-transform duration-fast', open && 'rotate-90')} />{/if}</span>
    {#if key !== ''}<span class={cn(inArray ? 'text-fg-tertiary' : 'text-syntax-name')}>{key}</span><span aria-hidden="true" class="text-fg-tertiary">:</span>{/if}
    {#if branch}
      <span class="text-fg-tertiary">{Array.isArray(v) ? `[${kids.length}]` : `{${kids.length}}`}</span>
    {:else if long && !longOpen.includes(path)}
      <button type="button" class="truncate text-start text-syntax-string underline decoration-dotted underline-offset-4 outline-none" title={t.common.more} onclick={(e) => { e.stopPropagation(); toggleLong(path); }}>{JSON.stringify((v as string).slice(0, maxString))}…</button>
    {:else}
      <span class={cn('break-all', valueClass[kind(v)])}>{scalar(v)}</span>
    {/if}
    {#if oncopy || (onfilter && !branch)}
      <span class="ms-auto flex shrink-0 items-center gap-0.5 opacity-0 transition-opacity duration-fast group-hover/row:opacity-100 group-focus-within/row:opacity-100">
        {#if onfilter && !branch}<button type="button" tabindex="-1" class="flex size-5 items-center justify-center rounded-xs text-fg-tertiary hover:text-fg-primary" aria-label={`${t.table.filter} ${path}`} title="F" onclick={(e) => { e.stopPropagation(); onfilter(path, v); }}><Filter class="size-3.5" aria-hidden="true" /></button>{/if}
        {#if oncopy}<button type="button" tabindex="-1" class="flex size-5 items-center justify-center rounded-xs text-fg-tertiary hover:text-fg-primary" aria-label={`${t.common.copy} ${path || t.common.all}`} title="C" onclick={(e) => { e.stopPropagation(); oncopy(path, v); }}><Copy class="size-3.5" aria-hidden="true" /></button>{/if}
      </span>
    {/if}
  </div>
  {#if open}
    <div role="group">{#each kids as [k, child] (k)}{@render node(k, child, join(path, k, Array.isArray(v)), level + 1, Array.isArray(v))}{/each}</div>
  {/if}
{/snippet}

<div class={cn('flex min-w-0 flex-col gap-1', className)}>
  {#if toolbar}
    <div class="flex items-center gap-1">
      <Button variant="quiet" size="sm" icon={UnfoldVertical} onclick={expandAll}>{t.common.more}</Button>
      <Button variant="quiet" size="sm" icon={FoldVertical} onclick={collapseAll}>{t.common.less}</Button>
    </div>
  {/if}
  <div bind:this={root} role="tree" aria-label={label} class="rounded-md bg-surface-sunken p-1">{@render node('', value, '', 0, false)}</div>
</div>
