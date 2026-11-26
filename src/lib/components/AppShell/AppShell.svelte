<script lang="ts">
  import type { Snippet } from 'svelte';
  import { cn } from '../../utils/cn.js';
  import { SidebarState, setSidebar } from '../Sidebar/context.svelte.js';

  type Props = {
    sidebarOpen?: boolean;
    onSidebarOpenChange?: (open: boolean) => void;
    sidebar?: Snippet;
    header?: Snippet;
    children: Snippet;
    class?: string;
    mainClass?: string;
  };
  let { sidebarOpen = $bindable(true), onSidebarOpenChange, sidebar, header, children, class: className, mainClass }: Props = $props();

  const state = new SidebarState(() => sidebarOpen, (v) => { sidebarOpen = v; onSidebarOpenChange?.(v); });
  setSidebar(state);
</script>

<svelte:window onkeydown={state.onkeydown} />

<div data-sidebar-state={state.state} class={cn('group/shell flex min-h-svh w-full bg-surface-base text-fg-primary', className)}>
  {#if sidebar}{@render sidebar()}{/if}
  <div class="flex min-w-0 flex-1 flex-col">
    {#if header}{@render header()}{/if}
    <main class={cn('flex min-w-0 flex-1 flex-col', mainClass)}>{@render children()}</main>
  </div>
</div>
