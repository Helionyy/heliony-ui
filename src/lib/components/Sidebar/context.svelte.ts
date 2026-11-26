import { createContext } from 'svelte';
import { Below } from '../../utils/media.svelte.js';

export class SidebarState {
  #open: () => boolean;
  #setOpen: (v: boolean) => void;
  #mobile = new Below('lg');
  openMobile = $state(false);

  constructor(open: () => boolean, setOpen: (v: boolean) => void) {
    this.#open = open;
    this.#setOpen = setOpen;
  }
  get open() { return this.#open(); }
  get isMobile() { return this.#mobile.current; }
  get state(): 'expanded' | 'collapsed' { return this.open ? 'expanded' : 'collapsed'; }
  setOpen = (v: boolean) => this.#setOpen(v);
  setOpenMobile = (v: boolean) => { this.openMobile = v; };
  toggle = () => { if (this.isMobile) this.openMobile = !this.openMobile; else this.#setOpen(!this.open); };
  closeMobile = () => { this.openMobile = false; };
  onkeydown = (e: KeyboardEvent) => {
    if (e.key === 'b' && (e.metaKey || e.ctrlKey)) { e.preventDefault(); this.toggle(); }
  };
}

const [get, set, has] = createContext<SidebarState>();
export const setSidebar = (s: SidebarState) => set(s);
export const useSidebar = (): SidebarState | null => (has() ? get() : null);
