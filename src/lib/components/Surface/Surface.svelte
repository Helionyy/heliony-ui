<script lang="ts" module>
  import { tv, type VariantProps } from 'tailwind-variants';

  export const surfaceVariants = tv({
    base: 'relative min-w-0 text-fg-primary',
    variants: {
      level: {
        sunken: 'bg-surface-sunken',
        base: 'bg-surface-base',
        raised: 'bg-surface-raised',
        overlay: 'bg-surface-overlay',
      },
      padding: { none: 'p-0', sm: 'p-3', md: 'p-4', lg: 'p-6' },
      radius: { none: 'rounded-none', md: 'rounded-md', lg: 'rounded-lg', xl: 'rounded-xl' },
      bordered: { true: 'border border-line-subtle', false: '' },
      elevated: { true: 'shadow-raised', false: '' },
      interactive: { true: 'transition-[background-color,border-color] duration-fast ease-standard hover:border-line-default', false: '' },
    },
    defaultVariants: { level: 'raised', padding: 'md', radius: 'lg', bordered: true, elevated: false, interactive: false },
  });
  export type SurfaceLevel = NonNullable<VariantProps<typeof surfaceVariants>['level']>;
</script>

<script lang="ts">
  import type { Snippet } from 'svelte';
  import type { HTMLAttributes } from 'svelte/elements';
  import { cn } from '../../utils/cn.js';

  type Props = HTMLAttributes<HTMLElement> & {
    level?: SurfaceLevel;
    padding?: 'none' | 'sm' | 'md' | 'lg';
    radius?: 'none' | 'md' | 'lg' | 'xl';
    bordered?: boolean;
    elevated?: boolean;
    interactive?: boolean;
    as?: 'div' | 'section' | 'article' | 'aside' | 'header' | 'footer' | 'nav' | 'main' | 'li';
    ref?: HTMLElement | null;
    children?: Snippet;
  };
  let { level = 'raised', padding = 'md', radius = 'lg', bordered = true, elevated = false, interactive = false, as = 'div', ref = $bindable(null), class: className, children, ...rest }: Props = $props();
</script>

<svelte:element this={as} bind:this={ref} data-surface={level} class={cn(surfaceVariants({ level, padding, radius, bordered, elevated, interactive }), className)} {...rest}>
  {@render children?.()}
</svelte:element>
