<script lang="ts">
  import { toast } from '../../toast/toast.svelte.js';
  import { cn } from '../../utils/cn.js';
  import { useStrings } from '../../i18n/context.svelte.js';
  import Toast from '../Toast/Toast.svelte';

  type Props = { position?: 'top-end' | 'top-center' | 'bottom-end' | 'bottom-center'; max?: number; class?: string };
  let { position = 'bottom-end', max = 5, class: className }: Props = $props();
  const t = useStrings();
  const visible = $derived(toast.items.slice(-max));
  const place = {
    'top-end': 'top-4 end-4 items-end',
    'top-center': 'top-4 start-1/2 -translate-x-1/2 items-center',
    'bottom-end': 'bottom-4 end-4 items-end flex-col-reverse',
    'bottom-center': 'bottom-4 start-1/2 -translate-x-1/2 items-center flex-col-reverse',
  } as const;
</script>

<section aria-label={t.toast.region} class={cn('pointer-events-none fixed z-toast flex w-[calc(100vw-2rem)] max-w-sm flex-col gap-2', place[position], className)}>
  {#each visible as item (item.id)}
    <Toast title={item.title} description={item.description} tone={item.tone} icon={item.icon} image={item.image} imageMode={item.imageMode} count={item.count} duration={item.duration} timerKey={item.updatedAt} action={item.action} dismissible={item.dismissible}
      ondismiss={() => toast.dismiss(item.id)} onpause={() => toast.pause(item.id)} onresume={() => toast.resume(item.id)} />
  {/each}
</section>
