import { CalendarDate, parseDate, getLocalTimeZone, today, type DateValue } from '@internationalized/date';

export type { DateValue };
export { CalendarDate, parseDate, getLocalTimeZone, today };

export const toIsoDate = (d: DateValue | undefined | null): string => (d ? `${String(d.year).padStart(4, '0')}-${String(d.month).padStart(2, '0')}-${String(d.day).padStart(2, '0')}` : '');

export const fromIsoDate = (s: string | undefined | null): DateValue | undefined => {
  if (!s || !/^\d{4}-\d{2}-\d{2}/.test(s)) return undefined;
  try { return parseDate(s.slice(0, 10)); } catch { return undefined; }
};

export const fromDate = (d: Date): DateValue => new CalendarDate(d.getFullYear(), d.getMonth() + 1, d.getDate());

export const todayDate = () => today(getLocalTimeZone());
