import type { NavSection } from '@heliony/ui';
import LayoutDashboard from '@lucide/svelte/icons/layout-dashboard';
import Server from '@lucide/svelte/icons/server';
import ScrollText from '@lucide/svelte/icons/scroll-text';
import Users from '@lucide/svelte/icons/users';

export const nav: NavSection[] = [
  { id: 'main', entries: [{ id: 'overview', label: 'Vue d’ensemble', icon: LayoutDashboard, href: '/' }] },
  { id: 'ops', label: 'Opérations', entries: [
    { id: 'servers', label: 'Serveurs', icon: Server, href: '/servers' },
    { id: 'logs', label: 'Logs', icon: ScrollText, href: '/logs' },
  ] },
  { id: 'community', label: 'Communauté', entries: [{ id: 'players', label: 'Joueurs', icon: Users, href: '/players' }] },
];
