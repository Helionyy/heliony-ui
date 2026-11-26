import { describe, it, expect } from 'vitest';
import { mkdtempSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { tmpdir } from 'node:os';
import { checkFiles } from '../bin/heliony.mjs';

const dir = mkdtempSync(join(tmpdir(), 'heliony-check-'));
const write = (name: string, content: string) => { const p = join(dir, name); writeFileSync(p, content); return p; };
const rules = (file: string, self = false) => checkFiles([file], { self }).map((f: { rule: string }) => f.rule);

describe('heliony check', () => {
  it('bloque une couleur en dur, en hex, rgb ou oklch', () => {
    expect(rules(write('a.svelte', '<div style="color:#fff"></div>'))).toContain('no-literal-color');
    expect(rules(write('b.css', '.x{background:rgb(1,2,3)}'))).toContain('no-literal-color');
    expect(rules(write('c.css', '.x{color:oklch(0.5 0.1 200)}'))).toContain('no-literal-color');
  });
  it('bloque une classe shadcn résiduelle', () => {
    expect(rules(write('d.svelte', '<div class="bg-background text-muted-foreground"></div>'))).toContain('no-shadcn-class');
    expect(rules(write('d2.svelte', '<div class="bg-surface-base text-fg-secondary border-line-subtle"></div>'))).not.toContain('no-shadcn-class');
  });
  it('bloque une primitive utilisée directement', () => {
    expect(rules(write('e.svelte', '<div class="bg-n-900"></div>'))).toContain('no-primitive-token');
    expect(rules(write('e2.svelte', '<div class="bg-surface-base"></div>'))).not.toContain('no-primitive-token');
  });
  it('bloque le flou et le texte trop petit', () => {
    expect(rules(write('f.svelte', '<div class="backdrop-blur-md"></div>'))).toContain('no-blur');
    expect(rules(write('g.svelte', '<p class="text-[10px]">x</p>'))).toContain('min-font-size');
  });
  it('signale une Surface dans une Surface', () => {
    expect(rules(write('h.svelte', '<Surface><p>a</p><Surface>b</Surface></Surface>'))).toContain('nested-surface');
    expect(rules(write('h2.svelte', '<Surface>a</Surface><Surface>b</Surface>'))).not.toContain('nested-surface');
  });
  it('ignore les commentaires et respecte heliony-allow', () => {
    expect(rules(write('i.svelte', '<!-- #fff --><div></div>'))).toEqual([]);
    expect(rules(write('j.css', '.x{color:#fff} /* heliony-allow : logo partenaire */'))).toEqual([]);
  });
  it('bloque un composant qui duplique un nom Heliony', () => {
    expect(rules(write('Button.svelte', '<button></button>'))).toContain('no-duplicate-component');
  });
  it('en mode --self, ne garde que les règles qui s’appliquent au design system', () => {
    expect(rules(write('k.css', '.x{color:#fff}'), true)).toEqual([]);
    expect(rules(write('l.svelte', '<div class="bg-popover"></div>'), true)).toContain('no-shadcn-class');
  });
});
