import { describe, it, expect } from 'vitest';
import { readFileSync, existsSync } from 'node:fs';
import { components, groups } from '../catalog/catalog.js';

const index = readFileSync('src/lib/index.ts', 'utf8');
const exported = [...index.matchAll(/export \{ default as (\w+)[^}]*\} from '\.\/components\//g)].map((m) => m[1]!);
const file = (name: string) => `src/lib/components/${name}/${name}.svelte`;
const propsOf = (name: string) => {
  const src = readFileSync(file(name), 'utf8');
  const body = /type Props = ([\s\S]*?);\n\s*(?:const uid[^\n]*\n\s*)?let \{/.exec(src)?.[1] ?? '';
  const names = new Set([...body.matchAll(/(?:^|[;{,\n]\s*)(\w+)\??:/gm)].map((m) => m[1]!));
  const destructured = /let \{([\s\S]*?)\}\s*:\s*Props\s*=\s*\$props\(\)/.exec(src)?.[1] ?? '';
  for (const part of destructured.split(',')) { const n = part.trim().split(/[\s=:]/)[0]; if (n && !n.startsWith('...')) names.add(n); }
  if (/HTMLButtonAttributes|HTMLInputAttributes|HTMLAttributes|HTMLTextareaAttributes/.test(body)) ['disabled', 'onclick', 'type', 'placeholder', 'class', 'id', 'rows', 'readonly'].forEach((n) => names.add(n));
  return names;
};

describe('catalogue', () => {
  it('documente chaque composant exporté, et rien d’autre', () => {
    expect(components.map((c) => c.name).sort()).toEqual([...exported].sort());
  });
  it('chaque composant a un fichier dans son dossier', () => {
    for (const n of exported) expect(existsSync(file(n)), file(n)).toBe(true);
  });
  it('chaque groupe utilisé existe', () => {
    for (const c of components) expect(groups.some((g) => g.id === c.group), `${c.name}.group`).toBe(true);
  });
  for (const c of components) {
    it(`${c.name} : les props documentées existent`, () => {
      const real = propsOf(c.name);
      for (const pr of c.props) expect(real, `${c.name}.${pr.name}`).toContain(pr.name);
    });
    it(`${c.name} : résumé, origine et exemple`, () => {
      expect(c.summary.length).toBeGreaterThan(10);
      expect(['shadcn', 'siku', 'heliony']).toContain(c.origin);
      expect(['adapted', 'recoded', 'original']).toContain(c.reprise);
      expect(c.example).toContain(c.name === 'Toast' ? 'toast.' : c.name);
    });
  }
});
