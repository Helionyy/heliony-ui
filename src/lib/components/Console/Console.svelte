<script lang="ts">
  import type { Snippet } from 'svelte';
  import CornerDownLeft from '@lucide/svelte/icons/corner-down-left';
  import Lock from '@lucide/svelte/icons/lock';
  import { cn } from '../../utils/cn.js';
  import { useStrings } from '../../i18n/context.svelte.js';
  import LogView, { type LogLine } from '../LogView/LogView.svelte';
  import Button from '../Button/Button.svelte';
  import Badge from '../Badge/Badge.svelte';

  type Props = {
    lines: LogLine[];
    readonly?: boolean;
    disabled?: boolean;
    busy?: boolean;
    height?: number | string;
    title?: string;
    status?: { label: string; tone?: 'neutral' | 'success' | 'warning' | 'danger' };
    history?: string[];
    placeholder?: string;
    follow?: boolean;
    onsubmit?: (command: string) => void | Promise<void>;
    onreachtop?: () => void;
    toolbar?: Snippet;
    class?: string;
  };
  let { lines, readonly = false, disabled = false, busy = false, height = 480, title, status, history = $bindable([]), placeholder, follow = $bindable(true), onsubmit, onreachtop, toolbar, class: className }: Props = $props();
  const t = useStrings();
  let input = $state('');
  let cursor = $state(-1);
  let field = $state<HTMLInputElement | null>(null);
  const canSend = $derived(!readonly && !disabled && !busy && input.trim().length > 0);
  async function submit() {
    if (!canSend) return;
    const cmd = input.trim();
    history = [...history.filter((h) => h !== cmd), cmd].slice(-100);
    cursor = -1;
    input = '';
    await onsubmit?.(cmd);
    field?.focus();
  }
  function onkey(e: KeyboardEvent) {
    if (e.key === 'Enter') { e.preventDefault(); submit(); return; }
    if (e.key === 'ArrowUp' && history.length) { e.preventDefault(); cursor = cursor < 0 ? history.length - 1 : Math.max(0, cursor - 1); input = history[cursor] ?? ''; }
    else if (e.key === 'ArrowDown' && cursor >= 0) { e.preventDefault(); cursor = cursor + 1 >= history.length ? -1 : cursor + 1; input = cursor < 0 ? '' : history[cursor] ?? ''; }
  }
  const h = $derived(typeof height === 'number' ? height : height);
</script>

<section class={cn('flex min-w-0 flex-col overflow-hidden rounded-lg border border-line-subtle bg-surface-sunken', className)} aria-label={title}>
  <header class="flex h-10 items-center gap-2 border-b border-line-subtle px-3">
    {#if title}<span class="truncate text-body-strong text-fg-primary">{title}</span>{/if}
    {#if status}<Badge size="sm" tone={status.tone ?? 'neutral'} dot>{status.label}</Badge>{/if}
    {#if readonly}<Badge size="sm" icon={Lock}>{t.console.readOnly}</Badge>{/if}
    <div class="ms-auto flex items-center gap-1">{#if toolbar}{@render toolbar()}{/if}</div>
  </header>
  <LogView {lines} bind:follow height={typeof h === 'number' ? h - 80 : h} timestamps severities={false} class="rounded-none border-0" {onreachtop} />
  {#if !readonly}
    <form class="flex h-10 items-center gap-2 border-t border-line-subtle px-3" onsubmit={(e) => { e.preventDefault(); submit(); }}>
      <span aria-hidden="true" class="font-mono text-code text-fg-tertiary">›</span>
      <input bind:this={field} bind:value={input} type="text" autocomplete="off" spellcheck="false" aria-label={t.console.input} placeholder={placeholder ?? t.console.input} disabled={disabled || busy} onkeydown={onkey}
        class="min-w-0 flex-1 bg-transparent font-mono text-code text-fg-primary outline-none placeholder:text-fg-tertiary disabled:cursor-not-allowed disabled:opacity-(--opacity-disabled)" />
      <Button type="submit" size="sm" variant={canSend ? 'primary' : 'quiet'} iconOnly icon={CornerDownLeft} label={t.console.send} disabled={!canSend} loading={busy} />
    </form>
  {/if}
</section>
