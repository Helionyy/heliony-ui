<script lang="ts">
  import type { Snippet } from 'svelte';
  import type { HTMLAttributes } from 'svelte/elements';
  import { cn } from '../../utils/cn.js';

  type Props = HTMLAttributes<HTMLDivElement> & {
    align?: 'start' | 'end' | 'center' | 'between' | 'stretch';
    attached?: boolean;
    label?: string;
    children: Snippet;
  };
  let { align = 'end', attached = false, label, class: className, children, ...rest }: Props = $props();
  const justify = { start: 'justify-start', end: 'justify-end', center: 'justify-center', between: 'justify-between', stretch: '[&>*]:flex-1' } as const;
</script>

<div role="group" aria-label={label} class={cn('flex flex-wrap items-center gap-2', justify[align], attached && 'gap-0 [&>*]:rounded-none [&>*:first-child]:rounded-s-md [&>*:last-child]:rounded-e-md [&>*:not(:first-child)]:-ms-px', className)} {...rest}>
  {@render children()}
</div>
