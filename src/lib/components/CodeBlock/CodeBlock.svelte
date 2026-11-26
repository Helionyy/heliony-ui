<script lang="ts">
  import Copy from '@lucide/svelte/icons/copy';
  import Check from '@lucide/svelte/icons/check';
  import WrapText from '@lucide/svelte/icons/wrap-text';
  import { cn } from '../../utils/cn.js';
  import { useStrings } from '../../i18n/context.svelte.js';
  import { highlight, type Language, type TokenType } from '../../utils/highlight.js';
  import Button from '../Button/Button.svelte';

  type Props = { code: string; language?: Language; title?: string; wrap?: boolean; lineNumbers?: boolean; maxHeight?: number | string; copy?: boolean; wrapToggle?: boolean; highlightLines?: number[]; oncopy?: (code: string) => void; class?: string };
  let { code, language = 'text', title, wrap = $bindable(false), lineNumbers = false, maxHeight, copy = true, wrapToggle = false, highlightLines = [], oncopy, class: className }: Props = $props();
  const t = useStrings();
  const lines = $derived(code.split('\n'));
  const rows = $derived(language !== 'text' ? highlight(code, language) : lines.map((l) => [{ type: 'plain' as const, text: l }]));
  const mh = $derived(typeof maxHeight === 'number' ? `${maxHeight}px` : maxHeight);
  const tok: Record<TokenType, string> = { plain: '', comment: 'text-syntax-comment italic', string: 'text-syntax-string', number: 'text-syntax-number', keyword: 'text-syntax-keyword', name: 'text-syntax-name', attr: 'text-syntax-attr', punct: 'text-syntax-punct' };
  let copied = $state(false);
  let timer: ReturnType<typeof setTimeout>;
  async function doCopy() {
    try { await navigator.clipboard?.writeText(code); } catch { copied = false; }
    oncopy?.(code);
    copied = true;
    clearTimeout(timer);
    timer = setTimeout(() => (copied = false), 1500);
  }
  const hasHead = $derived(Boolean(title) || copy || wrapToggle);
</script>

<div class={cn('group/code relative flex min-w-0 flex-col overflow-hidden rounded-lg border border-line-subtle bg-surface-sunken', className)}>
  {#if hasHead}
    <div class="flex h-9 items-center gap-2 border-b border-line-subtle px-3">
      {#if title}<span class="min-w-0 flex-1 truncate font-mono text-caption text-fg-tertiary">{title}</span>{:else}<span class="flex-1 text-caption uppercase tracking-wider text-fg-tertiary">{language}</span>{/if}
      {#if wrapToggle}<Button variant="quiet" size="sm" iconOnly icon={WrapText} label={t.code.wrap} aria-pressed={wrap} onclick={() => (wrap = !wrap)} />{/if}
      {#if copy}<Button variant="quiet" size="sm" iconOnly icon={copied ? Check : Copy} label={copied ? t.code.copied : t.code.copy} onclick={doCopy} class={cn(copied && 'text-success')} />{/if}
    </div>
  {/if}
  <!-- svelte-ignore a11y_no_noninteractive_tabindex -->
  <pre tabindex="0" aria-label={title ?? language} style={mh ? `max-height:${mh}` : undefined} class={cn('m-0 overflow-auto p-3 font-mono text-code text-fg-primary outline-none focus-visible:ring-focus', wrap ? 'whitespace-pre-wrap break-words' : 'whitespace-pre')}><code class="grid">{#each lines as _, i (i)}<span class={cn('flex min-w-0 gap-3 -mx-3 px-3', highlightLines.includes(i + 1) && 'bg-accent-subtle')}>{#if lineNumbers}<span aria-hidden="true" class="w-6 shrink-0 select-none text-end tabular text-fg-disabled">{i + 1}</span>{/if}<span class="min-w-0 flex-1">{#each rows[i] ?? [] as tk, k (k)}{#if tk.type === 'plain'}{tk.text}{:else}<span class={tok[tk.type]}>{tk.text}</span>{/if}{/each}{#if !(rows[i] ?? []).length}{' '}{/if}</span></span>{/each}</code></pre>
</div>
