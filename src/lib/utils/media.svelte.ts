import { MediaQuery } from 'svelte/reactivity';

export const BREAKPOINTS = { sm: 640, md: 768, lg: 1024, xl: 1280 } as const;
export type Breakpoint = keyof typeof BREAKPOINTS;

export class Below extends MediaQuery {
  constructor(bp: Breakpoint = 'md', fallback = false) {
    super(`(max-width: ${BREAKPOINTS[bp] - 0.02}px)`, fallback);
  }
}

export class ReducedMotion extends MediaQuery {
  constructor(fallback = false) {
    super('(prefers-reduced-motion: reduce)', fallback);
  }
}
