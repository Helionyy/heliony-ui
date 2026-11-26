<script lang="ts">
  import type { IconComponent } from '../../types.js';
  import { cn } from '../../utils/cn.js';

  type Props = {
    icon: IconComponent;
    size?: 'sm' | 'md' | 'lg' | number;
    strokeWidth?: number;
    label?: string;
    class?: string;
  };
  let { icon, size = 'md', strokeWidth = 1.75, label, class: className }: Props = $props();
  const Cmp = $derived(icon);
  const sizeClass = $derived(typeof size === 'number' ? undefined : { sm: 'size-icon-sm', md: 'size-icon-md', lg: 'size-icon-lg' }[size]);
</script>

<Cmp class={cn('shrink-0', sizeClass, className)} size={typeof size === 'number' ? size : undefined} {strokeWidth} aria-hidden={label ? undefined : 'true'} aria-label={label} role={label ? 'img' : undefined} />
