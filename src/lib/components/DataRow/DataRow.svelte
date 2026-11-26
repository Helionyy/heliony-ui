<script lang="ts">
  import type { Snippet } from 'svelte';
  import ChevronRight from '@lucide/svelte/icons/chevron-right';
  import type { IconComponent, Tone } from '../../types.js';
  import { cn } from '../../utils/cn.js';

  type Props = {
    title: string;
    detail?: string;
    icon?: IconComponent;
    value?: string;
    valueTone?: Tone;
    meta?: string;
    href?: string;
    selected?: boolean;
    chevron?: boolean;
    density?: 'compact' | 'default' | 'comfortable';
    onclick?: () => void;
    lead?: Snippet;
    end?: Snippet;
    class?: string;
  };
  let { title, detail, icon, value, valueTone = 'neutral', meta, href, selected = false, chevron = false, density = 'default', onclick, lead, end, class: className }: Props = $props();
  const Icon = $derived(icon);
  const tag = $derived(href ? 'a' : onclick ? 'button' : 'div');
  const toneText: Record<Tone, string> = { neutral: 'text-fg-primary', accent: 'text-accent', success: 'text-success', warning: 'text-warning', danger: 'text-danger', info: 'text-info', intelligence: 'text-intelligence' };
  const pad = { compact: 'min-h-row-compact py-1.5', default: 'min-h-row-default py-2', comfortable: 'min-h-row-comfortable py-2.5' } as const;
</script>

<svelte:element this={tag} href={href} type={tag === 'button' ? 'button' : undefined} role={tag === 'button' ? 'button' : tag === 'a' ? 'link' : 'listitem'} {onclick} aria-current={selected && tag === 'a' ? 'true' : undefined} aria-pressed={tag === 'button' ? selected : undefined}
  class={cn('flex w-full min-w-0 items-center gap-3 rounded-md px-3 text-start text-fg-primary outline-none', pad[density], tag !== 'div' && 'transition-colors duration-fast hover:bg-surface-control-hover focus-visible:ring-focus', selected && 'bg-surface-control', className)}>
  {#if lead}{@render lead()}{:else if Icon}<span aria-hidden="true" class="flex size-8 shrink-0 items-center justify-center rounded-md bg-surface-control text-fg-secondary [&_svg]:size-icon-sm"><Icon /></span>{/if}
  <span class="flex min-w-0 flex-1 flex-col">
    <span class="truncate text-body-strong">{title}</span>
    {#if detail}<span class="truncate text-caption text-fg-tertiary">{detail}</span>{/if}
  </span>
  {#if value}<span class={cn('shrink-0 text-body-strong tabular', toneText[valueTone])}>{value}</span>{/if}
  {#if meta}<span class="shrink-0 text-caption tabular text-fg-tertiary">{meta}</span>{/if}
  {#if end}{@render end()}{/if}
  {#if chevron}<ChevronRight aria-hidden="true" class="size-icon-sm shrink-0 text-fg-tertiary" />{/if}
</svelte:element>
