<script lang="ts">
  import { mode, userPrefersMode, setMode } from 'mode-watcher';
  import Sun from '@lucide/svelte/icons/sun';
  import Moon from '@lucide/svelte/icons/moon';
  import Monitor from '@lucide/svelte/icons/monitor';
  import { useStrings } from '../../i18n/context.svelte.js';
  import Button from '../Button/Button.svelte';
  import Menu from '../Menu/Menu.svelte';
  import type { MenuEntry } from '../../types.js';

  type Props = { variant?: 'toggle' | 'menu'; size?: 'sm' | 'md'; class?: string };
  let { variant = 'toggle', size = 'md', class: className }: Props = $props();
  const t = useStrings();
  const isDark = $derived(mode.current === 'dark');
  const items = $derived<MenuEntry[]>([
    { id: 'light', label: t.theme.light, icon: Sun },
    { id: 'dark', label: t.theme.dark, icon: Moon },
    { id: 'system', label: t.theme.system, icon: Monitor },
  ]);
  const current = $derived(userPrefersMode.current);
</script>

{#if variant === 'menu'}
  <Menu {items} align="end" onselect={(m) => setMode(m.id as 'light' | 'dark' | 'system')}>
    {#snippet trigger({ props })}
      <Button {...props} variant="quiet" {size} iconOnly icon={current === 'system' ? Monitor : isDark ? Moon : Sun} label={t.theme.label} class={className} />
    {/snippet}
  </Menu>
{:else}
  <Button variant="quiet" {size} iconOnly icon={isDark ? Sun : Moon} label={isDark ? t.theme.light : t.theme.dark} class={className} aria-pressed={isDark} onclick={() => setMode(isDark ? 'light' : 'dark')} />
{/if}
