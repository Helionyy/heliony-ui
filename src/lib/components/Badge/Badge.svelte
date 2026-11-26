<script lang="ts" module>
  import { tv, type VariantProps } from 'tailwind-variants';

  export const badgeVariants = tv({
    base: 'inline-flex w-fit shrink-0 items-center gap-1 whitespace-nowrap rounded-xs font-medium tabular [&_svg]:shrink-0 [&_svg]:size-3',
    variants: {
      tone: {
        neutral: '',
        accent: '',
        success: '',
        warning: '',
        danger: '',
        info: '',
        intelligence: '',
      },
      variant: { subtle: 'border border-transparent', solid: 'border border-transparent', outline: 'border bg-transparent' },
      size: { sm: 'h-4.5 px-1.5 text-[0.6875rem] leading-none', md: 'h-5.5 px-2 text-caption' },
    },
    compoundVariants: [
      { tone: 'neutral', variant: 'subtle', class: 'bg-surface-control text-fg-secondary' },
      { tone: 'neutral', variant: 'solid', class: 'bg-action-primary text-action-primary-fg' },
      { tone: 'neutral', variant: 'outline', class: 'border-line-default text-fg-secondary' },
      { tone: 'accent', variant: 'subtle', class: 'bg-accent-subtle text-accent-fg' },
      { tone: 'accent', variant: 'solid', class: 'bg-accent text-fg-inverse' },
      { tone: 'accent', variant: 'outline', class: 'border-accent/40 text-accent' },
      { tone: 'success', variant: 'subtle', class: 'bg-success-subtle text-success-fg' },
      { tone: 'success', variant: 'solid', class: 'bg-success text-fg-inverse' },
      { tone: 'success', variant: 'outline', class: 'border-success/40 text-success' },
      { tone: 'warning', variant: 'subtle', class: 'bg-warning-subtle text-warning-fg' },
      { tone: 'warning', variant: 'solid', class: 'bg-warning text-fg-inverse' },
      { tone: 'warning', variant: 'outline', class: 'border-warning/40 text-warning' },
      { tone: 'danger', variant: 'subtle', class: 'bg-danger-subtle text-danger-fg' },
      { tone: 'danger', variant: 'solid', class: 'bg-danger text-fg-inverse' },
      { tone: 'danger', variant: 'outline', class: 'border-danger/40 text-danger' },
      { tone: 'info', variant: 'subtle', class: 'bg-info-subtle text-info-fg' },
      { tone: 'info', variant: 'solid', class: 'bg-info text-fg-inverse' },
      { tone: 'info', variant: 'outline', class: 'border-info/40 text-info' },
      { tone: 'intelligence', variant: 'subtle', class: 'bg-intelligence-subtle text-intelligence-fg' },
      { tone: 'intelligence', variant: 'solid', class: 'bg-intelligence text-fg-inverse' },
      { tone: 'intelligence', variant: 'outline', class: 'border-intelligence/40 text-intelligence' },
    ],
    defaultVariants: { tone: 'neutral', variant: 'subtle', size: 'md' },
  });
  export type BadgeVariant = NonNullable<VariantProps<typeof badgeVariants>['variant']>;
</script>

<script lang="ts">
  import type { Snippet } from 'svelte';
  import type { HTMLAttributes } from 'svelte/elements';
  import type { IconComponent, Tone } from '../../types.js';
  import { cn } from '../../utils/cn.js';

  type Props = HTMLAttributes<HTMLSpanElement> & {
    tone?: Tone;
    variant?: BadgeVariant;
    size?: 'sm' | 'md';
    icon?: IconComponent;
    dot?: boolean;
    label?: string;
    children?: Snippet;
  };
  let { tone = 'neutral', variant = 'subtle', size = 'md', icon, dot = false, label, class: className, children, ...rest }: Props = $props();
  const Icon = $derived(icon);
  const dotColor: Record<Tone, string> = { neutral: 'bg-fg-tertiary', accent: 'bg-accent', success: 'bg-success', warning: 'bg-warning', danger: 'bg-danger', info: 'bg-info', intelligence: 'bg-intelligence' };
</script>

<span data-tone={tone} class={cn(badgeVariants({ tone, variant, size }), className)} {...rest}>
  {#if dot}<span aria-hidden="true" class={cn('size-1.5 rounded-full', variant === 'solid' ? 'bg-current' : dotColor[tone])}></span>{/if}
  {#if Icon}<Icon aria-hidden="true" />{/if}
  {#if children}{@render children()}{:else}{label}{/if}
</span>
