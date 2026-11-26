<script lang="ts">
  import { Avatar } from 'bits-ui';
  import { cn } from '../../utils/cn.js';

  type Props = { src?: string | null; alt?: string; name?: string; size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'; shape?: 'circle' | 'square'; status?: 'online' | 'offline' | 'away' | null; class?: string };
  let { src, alt, name = '', size = 'md', shape = 'circle', status = null, class: className }: Props = $props();

  const initials = $derived(name.split(/\s+/).filter(Boolean).slice(0, 2).map((p) => p[0]?.toUpperCase() ?? '').join('') || '?');
  const sizes = { xs: 'size-5 text-[0.625rem]', sm: 'size-6 text-[0.6875rem]', md: 'size-8 text-caption', lg: 'size-10 text-body-strong', xl: 'size-14 text-heading' } as const;
  const statusColor = { online: 'bg-success', offline: 'bg-fg-disabled', away: 'bg-warning' } as const;
</script>

<Avatar.Root class={cn('relative inline-flex shrink-0 select-none', sizes[size], className)}>
  <div class={cn('flex size-full items-center justify-center overflow-hidden bg-surface-control font-medium text-fg-secondary', shape === 'circle' ? 'rounded-full' : 'rounded-md')}>
    <Avatar.Image src={src ?? undefined} alt={alt ?? name} class="size-full object-cover" />
    <Avatar.Fallback class="leading-none">{initials}</Avatar.Fallback>
  </div>
  {#if status}
    <span aria-hidden="true" class={cn('absolute -end-px -bottom-px rounded-full ring-2 ring-surface-base', statusColor[status], size === 'xs' || size === 'sm' ? 'size-2' : 'size-2.5')}></span>
  {/if}
</Avatar.Root>
