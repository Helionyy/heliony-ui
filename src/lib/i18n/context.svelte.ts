import { createContext } from 'svelte';
import { dictionaries, en, type Locale, type Strings } from './strings.js';

type DeepPartial<T> = { [K in keyof T]?: T[K] extends (...a: never[]) => unknown ? T[K] : T[K] extends object ? DeepPartial<T[K]> : T[K] };

export type HelionyConfig = {
  locale: Locale;
  strings: Strings;
  timeZone?: string;
};

export type HelionyOptions = {
  locale?: Locale;
  strings?: DeepPartial<Strings>;
  timeZone?: string;
};

const merge = (base: Strings, over?: DeepPartial<Strings>): Strings => {
  if (!over) return base;
  const out = { ...base } as Record<string, unknown>;
  for (const [k, v] of Object.entries(over)) {
    const cur = out[k];
    out[k] = v && typeof v === 'object' && cur && typeof cur === 'object' ? { ...(cur as object), ...(v as object) } : v;
  }
  return out as Strings;
};

export const resolveConfig = (o: HelionyOptions = {}): HelionyConfig => {
  const locale = o.locale ?? 'en';
  const base = (dictionaries as Record<string, Strings>)[locale.split('-')[0] ?? 'en'] ?? en;
  return { locale, strings: merge(base, o.strings), timeZone: o.timeZone };
};

const [getHeliony, setHeliony, hasHeliony] = createContext<HelionyConfig>();

export const setHelionyContext = (o: HelionyOptions = {}) => {
  const cfg = resolveConfig(o);
  setHeliony(cfg);
  return cfg;
};

const fallback = resolveConfig();
export const useHeliony = (): HelionyConfig => (hasHeliony() ? getHeliony() : fallback);
export const useStrings = () => useHeliony().strings;
export const useLocale = () => useHeliony().locale;
