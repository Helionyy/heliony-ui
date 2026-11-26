export type NumberOptions = Intl.NumberFormatOptions & { locale?: string };

export const formatNumber = (value: number, { locale = 'en', ...options }: NumberOptions = {}) => new Intl.NumberFormat(locale, { maximumFractionDigits: 2, ...options }).format(value);

export const formatPercent = (ratio: number, { locale = 'en', ...options }: NumberOptions = {}) => new Intl.NumberFormat(locale, { style: 'percent', maximumFractionDigits: 1, ...options }).format(ratio);

export const formatCompact = (value: number, { locale = 'en', ...options }: NumberOptions = {}) => new Intl.NumberFormat(locale, { notation: 'compact', maximumFractionDigits: 1, ...options }).format(value);

export const formatBytes = (bytes: number, locale = 'en') => {
  const units = ['B', 'KB', 'MB', 'GB', 'TB'];
  let v = bytes, i = 0;
  while (v >= 1024 && i < units.length - 1) { v /= 1024; i++; }
  return `${formatNumber(v, { locale, maximumFractionDigits: i === 0 ? 0 : 1 })} ${units[i]}`;
};

export type DateInput = Date | number | string;
const toDate = (d: DateInput) => (d instanceof Date ? d : new Date(d));

export type DateOptions = Intl.DateTimeFormatOptions & { locale?: string };

export const formatDate = (d: DateInput, { locale = 'en', ...options }: DateOptions = {}) => new Intl.DateTimeFormat(locale, { dateStyle: 'medium', ...options }).format(toDate(d));

export const formatTime = (d: DateInput, { locale = 'en', ...options }: DateOptions = {}) => new Intl.DateTimeFormat(locale, { timeStyle: 'short', ...options }).format(toDate(d));

export const formatDateTime = (d: DateInput, { locale = 'en', ...options }: DateOptions = {}) => new Intl.DateTimeFormat(locale, { dateStyle: 'medium', timeStyle: 'short', ...options }).format(toDate(d));

export const formatIsoTime = (d: DateInput, withMs = false) => {
  const x = toDate(d);
  const hh = String(x.getHours()).padStart(2, '0'), mm = String(x.getMinutes()).padStart(2, '0'), ss = String(x.getSeconds()).padStart(2, '0');
  return withMs ? `${hh}:${mm}:${ss}.${String(x.getMilliseconds()).padStart(3, '0')}` : `${hh}:${mm}:${ss}`;
};

export const formatDuration = (ms: number, locale = 'en') => {
  if (ms < 1000) return `${formatNumber(ms, { locale, maximumFractionDigits: 0 })} ms`;
  if (ms < 60_000) return `${formatNumber(ms / 1000, { locale, maximumFractionDigits: 1 })} s`;
  const m = Math.floor(ms / 60_000), s = Math.round((ms % 60_000) / 1000);
  if (m < 60) return s ? `${m} min ${s} s` : `${m} min`;
  const h = Math.floor(m / 60), rm = m % 60;
  if (h < 24) return rm ? `${h} h ${rm} min` : `${h} h`;
  const d = Math.floor(h / 24), rh = h % 24;
  return rh ? `${d} d ${rh} h` : `${d} d`;
};

export const formatRelative = (d: DateInput, locale = 'en', now: DateInput = Date.now()) => {
  const diff = toDate(d).getTime() - toDate(now).getTime();
  const rtf = new Intl.RelativeTimeFormat(locale, { numeric: 'auto' });
  const r = (x: number) => Math.sign(x) * Math.round(Math.abs(x));
  const abs = Math.abs(diff);
  if (abs < 60_000) return rtf.format(r(diff / 1000), 'second');
  if (abs < 3_600_000) return rtf.format(r(diff / 60_000), 'minute');
  if (abs < 86_400_000) return rtf.format(r(diff / 3_600_000), 'hour');
  if (abs < 30 * 86_400_000) return rtf.format(r(diff / 86_400_000), 'day');
  if (abs < 365 * 86_400_000) return rtf.format(r(diff / (30 * 86_400_000)), 'month');
  return rtf.format(r(diff / (365 * 86_400_000)), 'year');
};
