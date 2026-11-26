<script lang="ts">
  import LoaderCircle from '@lucide/svelte/icons/loader-circle';
  import { cn } from '../../utils/cn.js';
  import { useStrings } from '../../i18n/context.svelte.js';

  type Props = { size?: 'sm' | 'md' | 'lg'; label?: string; class?: string };
  let { size = 'md', label, class: className }: Props = $props();
  const t = useStrings();
</script>

<LoaderCircle role="status" aria-label={label ?? t.common.loading} class={cn('hy-spin shrink-0 text-current', { sm: 'size-icon-sm', md: 'size-icon-md', lg: 'size-icon-lg' }[size], className)} strokeWidth={2} />
