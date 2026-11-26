import type { Component } from 'svelte';
import type { SVGAttributes } from 'svelte/elements';

export type IconProps = Record<string, unknown> & SVGAttributes<SVGSVGElement> & { size?: number | string; strokeWidth?: number | string; color?: string };
export type IconComponent = Component<IconProps>;

export type Tone = 'neutral' | 'accent' | 'success' | 'warning' | 'danger' | 'info' | 'intelligence';

export type Size = 'sm' | 'md' | 'lg';

export type Density = 'compact' | 'default' | 'comfortable';

export type DataStatus = 'ready' | 'loading' | 'empty' | 'error' | 'forbidden';

export type Severity = 'trace' | 'debug' | 'info' | 'warn' | 'error' | 'fatal';

export const severityTone = (severity: Severity): Tone =>
  severity === 'error' || severity === 'fatal' ? 'danger' : severity === 'warn' ? 'warning' : severity === 'info' ? 'info' : 'neutral';

export type ChartTone = Tone | 'chart-1' | 'chart-2' | 'chart-3' | 'chart-4' | 'chart-5' | 'chart-6';

export type Option<V extends string = string> = { value: V; label: string; detail?: string; icon?: IconComponent; disabled?: boolean; group?: string };

export type MenuEntry = { id: string; label: string; icon?: IconComponent; shortcut?: string; detail?: string; disabled?: boolean; danger?: boolean; separatorBefore?: boolean; group?: string; href?: string };

export type NavEntry = { id: string; label: string; icon?: IconComponent; href?: string; badge?: string | number; tone?: Tone; disabled?: boolean; children?: NavEntry[] };

export type NavSection = { id: string; label?: string; entries: NavEntry[] };

export type Crumb = { label: string; href?: string; icon?: IconComponent };
