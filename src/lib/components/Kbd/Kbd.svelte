<script lang="ts">
  import type { Snippet } from 'svelte';
  import type { HTMLAttributes } from 'svelte/elements';
  import { cn } from '../../utils/cn.js';

  type Props = HTMLAttributes<HTMLElement> & { size?: 'sm' | 'md'; children: Snippet };
  let { size = 'sm', class: className, children, ...rest }: Props = $props();
</script>

<kbd class={cn('pointer-events-none inline-flex w-fit shrink-0 select-none items-center justify-center gap-1 rounded-xs border border-line-default bg-surface-sunken font-sans font-medium text-fg-secondary', size === 'sm' ? 'h-5 min-w-5 px-1 text-[0.6875rem]' : 'h-6 min-w-6 px-1.5 text-caption', '[&_svg]:size-3', className)} {...rest}>
  {@render children()}
</kbd>
