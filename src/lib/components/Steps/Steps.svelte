<script lang="ts" module>
  import type { IconComponent } from '../../types.js';
  export type StepItem = { id: string; label: string; description?: string; icon?: IconComponent; disabled?: boolean; optional?: boolean };
</script>

<script lang="ts">
  import Check from '@lucide/svelte/icons/check';
  import { cn } from '../../utils/cn.js';

  type Props = { steps: StepItem[]; current: string; completed?: string[]; orientation?: 'horizontal' | 'vertical'; clickable?: boolean; onselect?: (step: StepItem, index: number) => void; class?: string };
  let { steps, current, completed, orientation = 'horizontal', clickable = false, onselect, class: className }: Props = $props();
  const currentIndex = $derived(Math.max(0, steps.findIndex((s) => s.id === current)));
  const isDone = (s: StepItem, i: number) => (completed ? completed.includes(s.id) : i < currentIndex);
  const reachable = (s: StepItem, i: number) => clickable && !s.disabled && (isDone(s, i) || i <= currentIndex);
</script>

<ol class={cn('flex min-w-0', orientation === 'horizontal' ? 'items-start' : 'flex-col', className)} aria-label="Steps">
  {#each steps as s, i (s.id)}
    {@const done = isDone(s, i)}
    {@const active = s.id === current}
    {@const Icon = s.icon}
    <li class={cn('flex min-w-0', orientation === 'horizontal' ? 'flex-1 flex-col items-start' : 'flex-row items-stretch gap-3')} aria-current={active ? 'step' : undefined}>
      <div class={cn('flex items-center', orientation === 'horizontal' ? 'w-full' : 'flex-col')}>
        <svelte:element this={reachable(s, i) ? 'button' : 'div'} type={reachable(s, i) ? 'button' : undefined} role={reachable(s, i) ? 'button' : undefined} onclick={reachable(s, i) ? () => onselect?.(s, i) : undefined}
          class={cn('flex size-7 shrink-0 items-center justify-center rounded-full border text-caption font-semibold tabular outline-none transition-colors duration-fast [&_svg]:size-3.5',
            done ? 'border-action-primary bg-action-primary text-action-primary-fg' : active ? 'border-fg-primary bg-surface-raised text-fg-primary ring-4 ring-surface-control' : 'border-line-default bg-surface-base text-fg-tertiary',
            reachable(s, i) && 'cursor-pointer hover:border-line-strong focus-visible:ring-focus', s.disabled && 'opacity-(--opacity-disabled)')} aria-label={`${i + 1}. ${s.label}`}>
          {#if done}<Check strokeWidth={3} aria-hidden="true" />{:else if Icon}<Icon aria-hidden="true" />{:else}{i + 1}{/if}
        </svelte:element>
        {#if i < steps.length - 1}
          <span aria-hidden="true" class={cn('bg-line-subtle transition-colors duration-base', orientation === 'horizontal' ? 'mx-2 h-px flex-1' : 'my-1 w-px flex-1 min-h-6', done && 'bg-action-primary')}></span>
        {/if}
      </div>
      <div class={cn('flex min-w-0 flex-col gap-0.5', orientation === 'horizontal' ? 'mt-2 pe-4' : 'pb-6 pt-1')}>
        <span class={cn('text-label', active ? 'text-fg-primary' : done ? 'text-fg-secondary' : 'text-fg-tertiary')}>{s.label}{#if s.optional}<span class="ms-1 font-normal text-fg-tertiary">(optionnel)</span>{/if}</span>
        {#if s.description}<span class="text-caption text-fg-tertiary">{s.description}</span>{/if}
      </div>
    </li>
  {/each}
</ol>
