<script lang="ts" module>
  import { tv, type VariantProps } from 'tailwind-variants';

  export const buttonVariants = tv({
    base: [
      'relative inline-flex shrink-0 items-center justify-center gap-2 whitespace-nowrap rounded-md font-medium select-none',
      'transition-[background-color,color,border-color,box-shadow,transform,opacity] duration-fast ease-standard',
      'outline-none focus-visible:ring-focus active:scale-[0.985]',
      'disabled:pointer-events-none disabled:opacity-(--opacity-disabled) aria-disabled:pointer-events-none aria-disabled:opacity-(--opacity-disabled)',
      '[&_svg]:pointer-events-none [&_svg]:shrink-0',
    ],
    variants: {
      variant: {
        primary: 'bg-action-primary text-action-primary-fg hover:bg-action-primary-hover active:bg-action-primary-active',
        secondary: 'bg-surface-control text-fg-primary border border-line-default hover:bg-surface-control-hover hover:border-line-strong active:bg-surface-control-active',
        ghost: 'text-fg-primary hover:bg-surface-control-hover active:bg-surface-control-active',
        quiet: 'text-fg-secondary hover:text-fg-primary hover:bg-surface-control-hover active:bg-surface-control-active',
        danger: 'bg-danger-subtle text-danger-fg border border-danger/25 hover:bg-danger/20 hover:border-danger/40 active:bg-danger/25',
        link: 'text-accent underline-offset-4 hover:underline h-auto px-0',
      },
      size: {
        sm: 'h-control-sm px-2.5 text-label gap-1.5 [&_svg]:size-icon-sm',
        md: 'h-control-md px-3.5 text-body [&_svg]:size-icon-sm',
        lg: 'h-control-lg px-4 text-body [&_svg]:size-icon-md',
      },
      iconOnly: { true: 'px-0', false: '' },
      block: { true: 'w-full', false: '' },
      round: { true: 'rounded-full', false: '' },
    },
    compoundVariants: [
      { iconOnly: true, size: 'sm', class: 'w-control-sm' },
      { iconOnly: true, size: 'md', class: 'w-control-md' },
      { iconOnly: true, size: 'lg', class: 'w-control-lg' },
    ],
    defaultVariants: { variant: 'secondary', size: 'md', iconOnly: false, block: false, round: false },
  });
  export type ButtonVariant = NonNullable<VariantProps<typeof buttonVariants>['variant']>;
  export type ButtonSize = NonNullable<VariantProps<typeof buttonVariants>['size']>;
</script>

<script lang="ts">
  import type { Snippet } from 'svelte';
  import type { HTMLAnchorAttributes, HTMLButtonAttributes } from 'svelte/elements';
  import type { IconComponent } from '../../types.js';
  import { cn } from '../../utils/cn.js';
  import Spinner from '../Spinner/Spinner.svelte';
  import Kbd from '../Kbd/Kbd.svelte';

  type Props = Omit<HTMLButtonAttributes, 'children'> & Pick<HTMLAnchorAttributes, 'target' | 'rel' | 'download'> & {
    href?: string;
    variant?: ButtonVariant;
    size?: ButtonSize;
    icon?: IconComponent;
    iconEnd?: IconComponent;
    iconOnly?: boolean;
    label?: string;
    shortcut?: string;
    loading?: boolean;
    block?: boolean;
    round?: boolean;
    ref?: HTMLButtonElement | HTMLAnchorElement | null;
    children?: Snippet;
  };
  let { href, variant = 'secondary', size = 'md', icon, iconEnd, iconOnly = false, label, shortcut, loading = false, block = false, round = false, disabled = false, type = 'button', ref = $bindable(null), class: className, children, ...rest }: Props = $props();

  const Icon = $derived(icon);
  const IconEnd = $derived(iconEnd);
  const inactive = $derived(disabled || loading);
  const classes = $derived(cn(buttonVariants({ variant, size, iconOnly, block, round }), className));
</script>

{#snippet content()}
  {#if loading}
    <Spinner size={size === 'lg' ? 'md' : 'sm'} class="absolute" />
  {/if}
  <span class={cn('inline-flex items-center justify-center gap-[inherit]', loading && 'invisible', block && shortcut && 'flex-1 justify-start')}>
    {#if Icon}<Icon aria-hidden="true" />{/if}
    {#if !iconOnly}
      {#if children}{@render children()}{:else}{label}{/if}
    {/if}
    {#if IconEnd && !iconOnly}<IconEnd aria-hidden="true" />{/if}
  </span>
  {#if shortcut && !iconOnly}
    <Kbd class={cn(loading && 'invisible', variant === 'primary' && 'bg-action-primary-fg/10 text-action-primary-fg')}>{shortcut}</Kbd>
  {/if}
{/snippet}

{#if href}
  <a bind:this={ref} {...(rest as HTMLAnchorAttributes)} href={inactive ? undefined : href} class={classes} role={inactive ? 'link' : undefined} tabindex={inactive ? -1 : undefined} aria-disabled={inactive || undefined} aria-busy={loading || undefined} aria-label={iconOnly ? label : undefined} data-variant={variant}>
    {@render content()}
  </a>
{:else}
  <button bind:this={ref} {...rest} {type} class={classes} disabled={inactive} aria-busy={loading || undefined} aria-label={iconOnly ? label : undefined} data-variant={variant}>
    {@render content()}
  </button>
{/if}
