import { describe, it, expect } from 'vitest';
import { readFileSync } from 'node:fs';
import { parse, converter, wcagContrast, type Color } from 'culori';
import tokens from '../tokens/tokens.json';

type Themed = { name: string; dark: string; light: string; usage: string };
const themes = ['dark', 'light'] as const;
const primitives = Object.fromEntries(tokens.color.primitives.map((t) => [t.name, t.value]));
const semantic = Object.fromEntries((tokens.color.semantic as Themed[]).map((t) => [t.name, t]));

const resolve = (name: string, theme: (typeof themes)[number]): string => {
  const raw = semantic[name] ? semantic[name][theme] : primitives[name];
  if (!raw) throw new Error(`token inconnu : ${name}`);
  const m = /^\{(.+)\}$/.exec(raw);
  return m ? resolve(m[1]!, theme) : raw;
};
const rgb = converter('rgb');
const composite = (fg: Color, bg: Color): Color => {
  const a = fg.alpha ?? 1;
  if (a >= 1) return fg;
  const F = rgb(fg), B = rgb(bg);
  return { mode: 'rgb', r: F.r * a + B.r * (1 - a), g: F.g * a + B.g * (1 - a), b: F.b * a + B.b * (1 - a) };
};
const ratio = (fg: string, bg: string, theme: (typeof themes)[number]) => {
  const F = parse(resolve(fg, theme))!;
  const B = composite(parse(resolve(bg, theme))!, parse(resolve('surface-base', theme))!);
  return wcagContrast(composite(F, B), B);
};

const SURFACES = ['surface-base', 'surface-raised', 'surface-sunken', 'surface-overlay', 'surface-control', 'surface-control-hover', 'surface-nav'];
const pairs: [string, string[], number][] = [
  ['fg-primary', [...SURFACES, 'surface-control-active'], 7],
  ['fg-secondary', [...SURFACES, 'surface-control-active'], 4.5],
  ['fg-tertiary', SURFACES, 4.5],
  ['action-primary-fg', ['action-primary', 'action-primary-hover', 'action-primary-active'], 7],
  ['accent', SURFACES, 4.5],
  ['success', SURFACES, 4.5],
  ['warning', SURFACES, 4.5],
  ['danger', SURFACES, 4.5],
  ['info', SURFACES, 4.5],
  ['intelligence', SURFACES, 4.5],
  ['severity-debug', SURFACES, 4.5],
  ['severity-fatal', SURFACES, 4.5],
  ['success-fg', ['success-subtle'], 4.5],
  ['warning-fg', ['warning-subtle'], 4.5],
  ['danger-fg', ['danger-subtle'], 4.5],
  ['info-fg', ['info-subtle'], 4.5],
  ['intelligence-fg', ['intelligence-subtle'], 4.5],
  ['accent-fg', ['accent-subtle'], 4.5],
  ['focus-ring', SURFACES, 3],
  ['selection', SURFACES, 3],
  ['chart-axis', SURFACES, 3],
  ['line-control', SURFACES, 1.4],
];

for (const theme of themes) {
  describe(`contrastes ${theme}`, () => {
    for (const [fg, bgs, min] of pairs) for (const bg of bgs) {
      it(`${fg} sur ${bg} ≥ ${min}:1`, () => expect(ratio(fg, bg, theme)).toBeGreaterThanOrEqual(min));
    }
    it('les surfaces sont ordonnées en luminance', () => {
      const L = (n: string) => (parse(resolve(n, theme)) as { l?: number }).l ?? 0;
      const l = { sunken: L('surface-sunken'), base: L('surface-base'), raised: L('surface-raised') };
      if (theme === 'dark') { expect(l.sunken).toBeLessThan(l.base); expect(l.base).toBeLessThan(l.raised); }
      else { expect(l.sunken).toBeLessThan(l.base); expect(l.base).toBeLessThanOrEqual(l.raised); }
    });
  });
}

describe('architecture', () => {
  it('chaque token sémantique a une valeur dans chaque thème', () => {
    for (const t of tokens.color.semantic as Themed[]) for (const th of themes) expect(t[th], `${t.name}.${th}`).toBeTypeOf('string');
  });
  it('sélection et focus sont deux tokens distincts', () => {
    expect(resolve('selection', 'dark')).not.toBe(resolve('focus-ring', 'dark'));
  });
  it('les primitives sont en OKLCH', () => {
    for (const t of tokens.color.primitives) expect(t.value).toMatch(/^oklch\(/);
  });
});

describe('fichiers générés', () => {
  const css = readFileSync(new URL('../src/lib/styles/tokens.css', import.meta.url), 'utf8');
  const theme = readFileSync(new URL('../src/lib/styles/theme.css', import.meta.url), 'utf8');
  it('tokens.css déclare les deux thèmes', () => {
    expect(css).toContain(':root, .dark, [data-theme="dark"] {');
    expect(css).toContain('.light, [data-theme="light"] {');
    expect(css).toContain('--surface-base: var(--n-900);');
    expect(css).toContain('--surface-base: var(--n-25);');
    expect(css).toContain('.t-body{');
  });
  it('theme.css expose les tokens sémantiques et les styles de texte à Tailwind', () => {
    expect(theme).toContain('@theme inline {');
    expect(theme).toContain('--color-*: initial;');
    expect(theme).toContain('--color-surface-base: var(--surface-base);');
    expect(theme).toContain('--text-body: var(--fs-body);');
    expect(theme).toContain('--text-body--line-height: var(--lh-body);');
    expect(theme).not.toContain('--color-n-900');
    expect(theme).toContain('@utility duration-fast');
  });
});
