<script lang="ts">
  import PanelLeft from '@lucide/svelte/icons/panel-left';
  import { useStrings } from '../../i18n/context.svelte.js';
  import { useSidebar } from '../Sidebar/context.svelte.js';
  import Button from '../Button/Button.svelte';

  type Props = { size?: 'sm' | 'md'; class?: string };
  let { size = 'md', class: className }: Props = $props();
  const t = useStrings();
  const sidebar = useSidebar();
</script>

{#if sidebar}
  <Button variant="quiet" {size} iconOnly icon={PanelLeft} label={t.nav.toggle} shortcut="⌘B" class={className} aria-expanded={sidebar.isMobile ? sidebar.openMobile : sidebar.open} onclick={sidebar.toggle} />
{/if}
