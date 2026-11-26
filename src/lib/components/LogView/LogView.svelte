<script lang="ts" module>
  import type { Severity } from '../../types.js';
  export type LogPart = { text: string; tone?: Severity | 'success' | 'muted'; bold?: boolean; dim?: boolean; italic?: boolean; underline?: boolean };
  export type LogLine = { id: string | number; at?: string | number; text: string; parts?: LogPart[]; severity?: Severity; source?: string };
</script>

<script lang="ts">
  import { tick } from 'svelte';
  import ArrowDownToLine from '@lucide/svelte/icons/arrow-down-to-line';
  import { cn } from '../../utils/cn.js';
  import { useStrings } from '../../i18n/context.svelte.js';
  import { formatIsoTime } from '../../utils/format.js';
  import SeverityDot from '../SeverityDot/SeverityDot.svelte';
  import Button from '../Button/Button.svelte';

  type Props = {
    lines: LogLine[];
    follow?: boolean;
    height?: number | string;
    wrap?: boolean;
    timestamps?: boolean;
    sources?: boolean;
    severities?: boolean;
    format?: (at: string | number) => string;
    emptyText?: string;
    label?: string;
    selected?: string | number | null;
    highlight?: string;
    onfollow?: (follow: boolean) => void;
    onreachtop?: () => void;
    onselect?: (line: LogLine) => void;
    class?: string;
  };
  let { lines, follow = $bindable(true), height = 420, wrap = true, timestamps = true, sources = false, severities = true, format = (at) => formatIsoTime(at, true), emptyText, label, selected = $bindable(null), highlight = '', onfollow, onreachtop, onselect, class: className }: Props = $props();
  const t = useStrings();
  const needle = $derived(highlight.trim().toLowerCase());
  const pieces = (text: string): { text: string; hit: boolean }[] => {
    if (!needle) return [{ text, hit: false }];
    const out: { text: string; hit: boolean }[] = [];
    const lower = text.toLowerCase();
    let i = 0;
    while (i < text.length) {
      const k = lower.indexOf(needle, i);
      if (k < 0) { out.push({ text: text.slice(i), hit: false }); break; }
      if (k > i) out.push({ text: text.slice(i, k), hit: false });
      out.push({ text: text.slice(k, k + needle.length), hit: true });
      i = k + needle.length;
    }
    return out;
  };
  let box = $state<HTMLDivElement | null>(null);
  const count = $derived(lines.length);
  const h = $derived(typeof height === 'number' ? `${height}px` : height);
  $effect(() => { void count; if (!follow || !box) return; tick().then(() => { if (box) box.scrollTop = box.scrollHeight; }); });
  const onscroll = () => {
    if (!box) return;
    const atBottom = box.scrollHeight - box.scrollTop - box.clientHeight < 8;
    if (atBottom !== follow) { follow = atBottom; onfollow?.(atBottom); }
    if (box.scrollTop < 40) onreachtop?.();
  };
  const pick = (l: LogLine) => { if (!onselect) return; selected = l.id; onselect(l); };
  const lineTone: Record<Severity, string> = { trace: 'text-fg-tertiary', debug: 'text-fg-tertiary', info: 'text-fg-primary', warn: 'text-warning-fg', error: 'text-danger-fg', fatal: 'text-severity-fatal' };
  const partTone: Record<NonNullable<LogPart['tone']>, string> = { ...lineTone, success: 'text-success', muted: 'text-fg-tertiary' };
  const resume = () => { follow = true; onfollow?.(true); if (box) box.scrollTop = box.scrollHeight; };
</script>

<div class={cn('relative min-w-0 overflow-hidden rounded-lg border border-line-subtle bg-surface-sunken', className)} style={`height:${h}`}>
  <div bind:this={box} role="log" aria-label={label} aria-live="polite" class="h-full overflow-auto py-1 font-mono text-code" {onscroll}>
    {#if !lines.length}
      <p class="px-3 py-6 text-center font-sans text-caption text-fg-tertiary">{emptyText ?? t.common.none}</p>
    {:else}
      {#each lines as l (l.id)}
        <svelte:element this={onselect ? 'button' : 'div'} type={onselect ? 'button' : undefined} role={onselect ? 'button' : undefined}
          class={cn('flex w-full items-start gap-2.5 px-3 py-px text-start leading-5', wrap ? 'whitespace-pre-wrap break-words' : 'whitespace-pre', onselect && 'cursor-pointer outline-none hover:bg-surface-control-hover focus-visible:bg-surface-control-hover', selected !== null && selected === l.id && 'bg-surface-control', lineTone[l.severity ?? 'info'])}
          onclick={() => pick(l)}>
          {#if severities}<span class="mt-1.5 shrink-0"><SeverityDot severity={l.severity ?? 'info'} size="sm" /></span>{/if}
          {#if timestamps && l.at !== undefined}<time class="shrink-0 select-none tabular text-fg-tertiary" datetime={typeof l.at === 'string' ? l.at : new Date(l.at).toISOString()}>{format(l.at)}</time>{/if}
          {#if sources && l.source}<span class="shrink-0 text-fg-tertiary">{l.source}</span>{/if}
          <span class="min-w-0 flex-1">
            {#if l.parts}
              {#each l.parts as part, i (i)}<span class={cn(part.tone && partTone[part.tone], part.bold && 'font-semibold', part.dim && 'opacity-60', part.italic && 'italic', part.underline && 'underline')}>{part.text}</span>{/each}
            {:else}
              {#each pieces(l.text) as piece, i (i)}{#if piece.hit}<mark class="rounded-xs bg-warning-subtle text-warning-fg">{piece.text}</mark>{:else}{piece.text}{/if}{/each}
            {/if}
          </span>
        </svelte:element>
      {/each}
    {/if}
  </div>
  {#if !follow && lines.length}
    <div class="absolute inset-x-0 bottom-3 flex justify-center"><Button size="sm" variant="secondary" icon={ArrowDownToLine} onclick={resume} class="shadow-overlay">{t.console.scrollToEnd}</Button></div>
  {/if}
</div>
