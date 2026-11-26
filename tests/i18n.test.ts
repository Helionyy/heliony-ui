import { describe, it, expect } from 'vitest';
import { en, fr } from '../src/lib/i18n/strings.js';
import { resolveConfig } from '../src/lib/i18n/context.svelte.js';
import { formatBytes, formatDuration, formatNumber, formatRelative } from '../src/lib/utils/format.js';

const shape = (o: object, prefix = ''): string[] => Object.entries(o).flatMap(([k, v]) => (v && typeof v === 'object' ? shape(v, `${prefix}${k}.`) : [`${prefix}${k}:${typeof v}`]));

describe('dictionnaires', () => {
  it('fr et en ont exactement les mêmes clés et types', () => {
    expect(shape(fr).sort()).toEqual(shape(en).sort());
  });
  it('les surcharges fusionnent sans perdre le reste', () => {
    const cfg = resolveConfig({ locale: 'fr', strings: { common: { close: 'Quitter' } } });
    expect(cfg.strings.common.close).toBe('Quitter');
    expect(cfg.strings.common.cancel).toBe('Annuler');
    expect(cfg.strings.table.noResults).toBe('Aucun résultat');
  });
  it('une locale inconnue retombe sur l’anglais', () => {
    expect(resolveConfig({ locale: 'xx' }).strings.common.close).toBe('Close');
    expect(resolveConfig({ locale: 'fr-CA' }).strings.common.close).toBe('Fermer');
  });
});

describe('formats', () => {
  it('nombres et octets', () => {
    expect(formatNumber(1234.5, { locale: 'en' })).toBe('1,234.5');
    expect(formatBytes(1536)).toBe('1.5 KB');
    expect(formatBytes(512)).toBe('512 B');
  });
  it('durées', () => {
    expect(formatDuration(850)).toBe('850 ms');
    expect(formatDuration(4200)).toBe('4.2 s');
    expect(formatDuration(125_000)).toBe('2 min 5 s');
    expect(formatDuration(3_600_000)).toBe('1 h');
  });
  it('relatif', () => {
    const now = Date.UTC(2027, 0, 15, 12, 0, 0);
    expect(formatRelative(now - 90_000, 'en', now)).toBe('2 minutes ago');
    expect(formatRelative(now - 2 * 86_400_000, 'fr', now)).toBe('avant-hier');
  });
});
