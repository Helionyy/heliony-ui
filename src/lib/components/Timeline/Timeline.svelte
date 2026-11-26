<script lang="ts" module>
  import type { IconComponent, Tone } from '../../types.js';
  export type TimelineEvent = { id: string; at: number | string | Date; title: string; description?: string; tone?: Tone; icon?: IconComponent; actor?: string; meta?: string; href?: string };
</script>

<script lang="ts">
  import type { Snippet } from 'svelte';
  import { cn } from '../../utils/cn.js';
  import { useHeliony } from '../../i18n/context.svelte.js';
  import { formatDate, formatTime } from '../../utils/format.js';

  type Props = { events: TimelineEvent[]; groupByDay?: boolean; density?: 'compact' | 'default'; onselect?: (event: TimelineEvent) => void; item?: Snippet<[{ event: TimelineEvent }]>; class?: string };
  let { events, groupByDay = true, density = 'default', onselect, item, class: className }: Props = $props();
  const cfg = useHeliony();
  const toDate = (d: TimelineEvent['at']) => (d instanceof Date ? d : new Date(d));
  const dayKey = (d: Date) => `${d.getFullYear()}-${d.getMonth()}-${d.getDate()}`;
  const sorted = $derived([...events].sort((a, b) => toDate(b.at).getTime() - toDate(a.at).getTime()));
  const groups = $derived.by(() => {
    if (!groupByDay) return [{ key: 'all', label: '', items: sorted }];
    const out: { key: string; label: string; items: TimelineEvent[] }[] = [];
    for (const e of sorted) { const d = toDate(e.at); const k = dayKey(d); let g = out.find((x) => x.key === k); if (!g) { g = { key: k, label: formatDate(d, { locale: cfg.locale, dateStyle: 'full' }), items: [] }; out.push(g); } g.items.push(e); }
    return out;
  });
  const dot: Record<Tone, string> = { neutral: 'bg-fg-tertiary', accent: 'bg-accent', success: 'bg-success', warning: 'bg-warning', danger: 'bg-danger', info: 'bg-info', intelligence: 'bg-intelligence' };
  const iconBox: Record<Tone, string> = { neutral: 'bg-surface-control text-fg-secondary', accent: 'bg-accent-subtle text-accent-fg', success: 'bg-success-subtle text-success-fg', warning: 'bg-warning-subtle text-warning-fg', danger: 'bg-danger-subtle text-danger-fg', info: 'bg-info-subtle text-info-fg', intelligence: 'bg-intelligence-subtle text-intelligence-fg' };
</script>

<div class={cn('flex min-w-0 flex-col gap-5', className)}>
  {#each groups as g (g.key)}
    <section class="flex flex-col gap-2">
      {#if g.label}<h3 class="text-label text-fg-tertiary first-letter:uppercase">{g.label}</h3>{/if}
      <ol class="relative ms-2.5 flex flex-col border-s border-line-subtle">
        {#each g.items as e (e.id)}
          {@const Icon = e.icon}
          {@const tone = e.tone ?? 'neutral'}
          {@const interactive = Boolean(onselect || e.href)}
          <li class={cn('relative ps-6', density === 'compact' ? 'py-1.5' : 'py-2.5')}>
            {#if Icon}
              <span aria-hidden="true" class={cn('absolute -start-3 top-1.5 flex size-6 items-center justify-center rounded-full ring-4 ring-surface-base [&_svg]:size-3.5', iconBox[tone])}><Icon /></span>
            {:else}
              <span aria-hidden="true" class={cn('absolute -start-[5px] top-[1.1rem] size-2.5 rounded-full ring-4 ring-surface-base', dot[tone])}></span>
            {/if}
            {#if item}
              {@render item({ event: e })}
            {:else}
              <svelte:element this={e.href ? 'a' : onselect ? 'button' : 'div'} href={e.href} type={!e.href && onselect ? 'button' : undefined} role={e.href ? 'link' : onselect ? 'button' : undefined} onclick={onselect ? () => onselect(e) : undefined}
                class={cn('flex w-full min-w-0 flex-col gap-0.5 rounded-md text-start outline-none', interactive && '-m-1.5 p-1.5 transition-colors duration-fast hover:bg-surface-control-hover focus-visible:ring-focus')}>
                <div class="flex flex-wrap items-baseline gap-x-3 gap-y-0.5">
                  <span class="text-body-strong text-fg-primary">{e.title}</span>
                  <time class="text-caption tabular text-fg-tertiary" datetime={toDate(e.at).toISOString()}>{groupByDay ? formatTime(toDate(e.at), { locale: cfg.locale }) : formatDate(toDate(e.at), { locale: cfg.locale, dateStyle: 'medium', timeStyle: 'short' })}</time>
                  {#if e.actor}<span class="text-caption text-fg-tertiary">· {e.actor}</span>{/if}
                </div>
                {#if e.description}<p class="text-body text-fg-secondary">{e.description}</p>{/if}
                {#if e.meta}<p class="font-mono text-caption text-fg-tertiary">{e.meta}</p>{/if}
              </svelte:element>
            {/if}
          </li>
        {/each}
      </ol>
    </section>
  {/each}
</div>
