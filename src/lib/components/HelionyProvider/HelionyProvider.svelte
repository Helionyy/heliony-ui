<script lang="ts">
  import { untrack, type Snippet } from 'svelte';
  import { ModeWatcher } from 'mode-watcher';
  import { Tooltip } from 'bits-ui';
  import { setHelionyContext, type HelionyOptions } from '../../i18n/context.svelte.js';

  type Props = HelionyOptions & {
    defaultMode?: 'dark' | 'light' | 'system';
    modeStorageKey?: string;
    tooltipDelay?: number;
    children: Snippet;
  };
  let { locale, strings, timeZone, defaultMode = 'dark', modeStorageKey = 'heliony-mode', tooltipDelay = 300, children }: Props = $props();
  untrack(() => setHelionyContext({ locale, strings, timeZone }));
</script>

<ModeWatcher {defaultMode} darkClassNames={['dark']} lightClassNames={['light']} {modeStorageKey} />
<Tooltip.Provider delayDuration={tooltipDelay}>{@render children()}</Tooltip.Provider>
