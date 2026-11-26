import type { ChartTone } from '../types.js';

export type ChartPoint = { t: number; v: number | null };
export type ChartSeries = { id: string; label: string; values?: number[]; points?: ChartPoint[]; tone?: ChartTone; unit?: string; format?: (v: number) => string };
export type ChartThreshold = { value: number; label?: string; tone?: ChartTone };
export type ChartBand = { from: number; to: number; tone?: ChartTone; label?: string };

export const CHART_TONES: ChartTone[] = ['chart-1', 'chart-2', 'chart-3', 'chart-4', 'chart-5', 'chart-6'];

export const toneVar = (tone: ChartTone): string => {
  switch (tone) {
    case 'neutral': return 'var(--fg-primary)';
    case 'accent': return 'var(--accent)';
    case 'success': return 'var(--success)';
    case 'warning': return 'var(--warning)';
    case 'danger': return 'var(--danger)';
    case 'info': return 'var(--info)';
    case 'intelligence': return 'var(--intelligence)';
    default: return `var(--${tone})`;
  }
};

export const niceTicks = (lo: number, hi: number, count: number): number[] => {
  if (!Number.isFinite(lo) || !Number.isFinite(hi) || count < 1) return [];
  if (hi === lo) return [lo];
  const span = hi - lo;
  const rough = span / count;
  const mag = 10 ** Math.floor(Math.log10(rough));
  const norm = rough / mag;
  const step = (norm >= 5 ? 5 : norm >= 2 ? 2 : 1) * mag;
  const out: number[] = [];
  for (let v = Math.ceil(lo / step) * step; v <= hi + step / 2; v += step) out.push(Number(v.toFixed(10)));
  return out;
};

export const timeTicks = (x0: number, x1: number, max = 6): number[] => {
  const span = x1 - x0;
  if (span <= 0) return [];
  const steps = [60e3, 300e3, 900e3, 1800e3, 3600e3, 3 * 3600e3, 6 * 3600e3, 12 * 3600e3, 86400e3, 2 * 86400e3, 7 * 86400e3, 30 * 86400e3];
  const step = steps.find((s) => span / s <= max) ?? 30 * 86400e3;
  const out: number[] = [];
  for (let t = Math.ceil(x0 / step) * step; t <= x1; t += step) out.push(t);
  return out;
};

export const defaultTimeLabel = (locale: string, span: number) => (t: number) => {
  const d = new Date(t);
  if (span > 2 * 86400e3) return new Intl.DateTimeFormat(locale, { day: '2-digit', month: 'short' }).format(d);
  return new Intl.DateTimeFormat(locale, { hour: '2-digit', minute: '2-digit' }).format(d);
};
