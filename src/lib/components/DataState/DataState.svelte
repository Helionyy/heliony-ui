<script lang="ts">
  import type { Snippet } from 'svelte';
  import type { DataStatus } from '../../types.js';
  import { cn } from '../../utils/cn.js';
  import { useStrings } from '../../i18n/context.svelte.js';
  import EmptyState from '../EmptyState/EmptyState.svelte';
  import Skeleton from '../Skeleton/Skeleton.svelte';
  import Button from '../Button/Button.svelte';

  type Props = {
    status: DataStatus;
    emptyTitle?: string;
    emptyText?: string;
    errorTitle?: string;
    errorText?: string;
    forbiddenTitle?: string;
    forbiddenText?: string;
    lines?: number;
    size?: 'sm' | 'md';
    onretry?: () => void;
    skeleton?: Snippet;
    empty?: Snippet;
    children: Snippet;
    class?: string;
  };
  let { status, emptyTitle, emptyText, errorTitle, errorText, forbiddenTitle, forbiddenText, lines = 4, size = 'md', onretry, skeleton, empty, children, class: className }: Props = $props();
  const t = useStrings();
</script>

{#if status === 'ready'}
  {@render children()}
{:else if status === 'loading'}
  <div aria-busy="true" aria-label={t.state.loadingLabel} class={cn('flex min-w-0 flex-1 flex-col', className)}>
    {#if skeleton}{@render skeleton()}{:else}<div class={size === 'sm' ? 'p-3' : 'p-4'}><Skeleton shape="text" {lines} /></div>{/if}
  </div>
{:else if status === 'empty' && empty}
  {@render empty()}
{:else}
  <EmptyState kind={status === 'empty' ? 'empty' : status} {size} class={className}
    title={status === 'empty' ? emptyTitle : status === 'error' ? errorTitle : forbiddenTitle}
    description={status === 'empty' ? emptyText : status === 'error' ? errorText : forbiddenText}>
    {#if status === 'error' && onretry}<Button variant="secondary" size="sm" onclick={onretry}>{t.common.retry}</Button>{/if}
  </EmptyState>
{/if}
