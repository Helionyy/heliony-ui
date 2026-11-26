import { describe, it, expect } from 'vitest';
import { highlight, languageOf } from '../src/lib/utils/highlight.js';

const types = (code: string, lang: Parameters<typeof highlight>[1]) => highlight(code, lang).map((line) => line.map((t) => `${t.type}:${t.text}`));

describe('languageOf', () => {
  it('déduit le langage de l’extension', () => {
    expect(languageOf('config.json')).toBe('json');
    expect(languageOf('main.go')).toBe('go');
    expect(languageOf('lib.rs')).toBe('rust');
    expect(languageOf('fxmanifest.lua')).toBe('lua');
    expect(languageOf('App.svelte')).toBe('html');
    expect(languageOf('notes')).toBe('text');
  });
});

describe('highlight', () => {
  it('json : clés, chaînes, nombres, mots-clés', () => {
    expect(types('{"a": "b", "n": 12, "ok": true}', 'json')[0]).toEqual(['punct:{', 'name:"a"', 'punct::', 'plain: ', 'string:"b"', 'punct:,', 'plain: ', 'name:"n"', 'punct::', 'plain: ', 'number:12', 'punct:,', 'plain: ', 'name:"ok"', 'punct::', 'plain: ', 'keyword:true', 'punct:}']);
  });
  it('garde une ligne par ligne de code, commentaires multilignes compris', () => {
    const out = highlight('/* a\nb */\nconst x = 1;', 'typescript');
    expect(out).toHaveLength(3);
    expect(out[0]![0]).toEqual({ type: 'comment', text: '/* a' });
    expect(out[1]![0]).toEqual({ type: 'comment', text: 'b */' });
    expect(out[2]!.map((t) => t.type)).toContain('keyword');
  });
  it('go et rust : mots-clés et appels', () => {
    expect(types('func main() {}', 'go')[0]!.slice(0, 3)).toEqual(['keyword:func', 'plain: ', 'name:main']);
    expect(types('fn run(x: u8) -> Result<(), E>', 'rust')[0]!.slice(0, 3)).toEqual(['keyword:fn', 'plain: ', 'name:run']);
  });
  it('html : balises, attributs, texte', () => {
    expect(types('<a href="x">hi</a>', 'html')[0]).toEqual(['name:<a', 'plain: ', 'attr:href', 'punct:=', 'string:"x"', 'punct:>', 'plain:hi', 'name:</a', 'punct:>']);
  });
  it('text : tout en plain', () => {
    expect(highlight('hello world', 'text')[0]).toEqual([{ type: 'plain', text: 'hello world' }]);
  });
});
