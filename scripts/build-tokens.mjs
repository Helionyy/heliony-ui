#!/usr/bin/env node
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const src = JSON.parse(readFileSync(resolve(root, 'tokens/tokens.json'), 'utf8'));
const pkg = JSON.parse(readFileSync(resolve(root, 'package.json'), 'utf8'));
const out = (p, s) => { mkdirSync(dirname(resolve(root, p)), { recursive: true }); writeFileSync(resolve(root, p), s); };

const NAME = /^[a-z][a-z0-9-]{0,63}$/;
const themes = src.meta.themes;
const themeIds = themes.map((t) => t.id);
const primitives = src.color.primitives;
const semantic = src.color.semantic;
const families = Object.entries(src).filter(([k, v]) => !['name', 'version', 'meta', 'color', 'type'].includes(k) && v?.tokens);
const alias = (v) => { const m = /^\{(.+)\}$/.exec(v); return m ? m[1] : null; };
const isThemed = (t) => themeIds.every((id) => typeof t[id] === 'string');

const errors = [];
const seen = new Set();
const all = [...primitives, ...semantic, ...families.flatMap(([, f]) => f.tokens)];
for (const t of all) {
  if (!NAME.test(t.name)) errors.push(`nom invalide : ${t.name}`);
  if (seen.has(t.name)) errors.push(`nom en double : ${t.name}`);
  seen.add(t.name);
  if (!t.usage) errors.push(`usage manquant : ${t.name}`);
  if (typeof t.value !== 'string' && !isThemed(t)) errors.push(`valeur manquante ou thème incomplet : ${t.name}`);
}
const primitiveNames = new Set(primitives.map((t) => t.name));
const semanticNames = new Set(semantic.map((t) => t.name));
for (const t of primitives) if (alias(t.value)) errors.push(`une primitive ne doit pas être un alias : ${t.name}`);
for (const t of semantic) {
  if (typeof t.value === 'string') errors.push(`un token sémantique porte dark et light, pas value : ${t.name}`);
  for (const id of themeIds) {
    const a = alias(t[id]);
    if (a && !primitiveNames.has(a) && !semanticNames.has(a)) errors.push(`alias inconnu : ${t.name}.${id} → ${a}`);
  }
}
for (const [k, f] of families) for (const t of f.tokens) {
  const vals = typeof t.value === 'string' ? [t.value] : themeIds.map((id) => t[id]);
  for (const v of vals) if (alias(v)) errors.push(`les tokens de ${k} ne sont pas des alias : ${t.name}`);
}
if (errors.length) { console.error(errors.join('\n')); process.exit(1); }

const cssVal = (v) => (alias(v) ? `var(--${alias(v)})` : v);
const themeValue = (t, id) => (typeof t.value === 'string' ? t.value : t[id]);
const themed = (id) => [...semantic, ...families.flatMap(([, f]) => f.tokens.filter((t) => !t.value))].map((t) => `  --${t.name}: ${cssVal(themeValue(t, id))};`).join('\n');

let css = `/* Heliony UI — généré depuis tokens/tokens.json (v${src.version}). Éditer la source puis bun run tokens. */\n`;
css += `:root {\n${primitives.map((t) => `  --${t.name}: ${t.value};`).join('\n')}\n`;
css += families.flatMap(([, f]) => f.tokens.filter((t) => typeof t.value === 'string').map((t) => `  --${t.name}: ${t.value};`)).join('\n') + '\n';
css += Object.entries(src.type.families).map(([k, v]) => `  --font-${k}: ${v};`).join('\n') + '\n';
css += src.type.styles.map((s) => `  --fs-${s.name.slice(2)}: ${s.fontSize};\n  --lh-${s.name.slice(2)}: ${s.lineHeight};\n  --fw-${s.name.slice(2)}: ${s.fontWeight};\n  --ls-${s.name.slice(2)}: ${s.letterSpacing ?? '0'};`).join('\n') + '\n}\n';
for (const theme of themes) {
  css += `${theme.selector} {\n  color-scheme: ${theme.id};\n${themed(theme.id)}\n}\n`;
}
for (const s of src.type.styles) {
  const k = s.name.slice(2);
  css += `.${s.name}{font-family:var(--font-${s.family});font-size:var(--fs-${k});line-height:var(--lh-${k});font-weight:var(--fw-${k});letter-spacing:var(--ls-${k})${s.family === 'mono' || k.startsWith('figure') ? ';font-variant-numeric:tabular-nums' : ''}}\n`;
}
out('src/lib/styles/tokens.css', css);

let theme = `/* Heliony UI — thème Tailwind v4, généré depuis tokens/tokens.json (v${src.version}).\n   Usage : @import "tailwindcss"; @import "@heliony/ui/theme.css"; @source "../node_modules/@heliony/ui/dist"; */\n@theme inline {\n`;
theme += `  --color-*: initial;\n`;
theme += semantic.map((t) => `  --color-${t.name}: var(--${t.name});`).join('\n') + '\n';
theme += `  --font-sans: var(--font-sans);\n  --font-mono: var(--font-mono);\n`;
theme += `  --radius-*: initial;\n` + src.radius.tokens.map((t) => `  --radius-${t.name.slice(7)}: var(--${t.name});`).join('\n') + '\n';
theme += `  --shadow-*: initial;\n` + src.shadow.tokens.map((t) => `  --shadow-${t.name.slice(7)}: var(--${t.name});`).join('\n') + '\n';
theme += `  --ease-*: initial;\n` + src.easing.tokens.map((t) => `  --ease-${t.name.slice(5)}: var(--${t.name});`).join('\n') + '\n';
theme += `  --text-*: initial;\n` + src.type.styles.map((s) => { const k = s.name.slice(2); return `  --text-${k}: var(--fs-${k});\n  --text-${k}--line-height: var(--lh-${k});\n  --text-${k}--font-weight: var(--fw-${k});\n  --text-${k}--letter-spacing: var(--ls-${k});`; }).join('\n') + '\n';
theme += `  --spacing-control-sm: var(--control-sm);\n  --spacing-control-md: var(--control-md);\n  --spacing-control-lg: var(--control-lg);\n  --spacing-control-xl: var(--control-xl);\n  --spacing-icon-sm: var(--icon-sm);\n  --spacing-icon-md: var(--icon-md);\n  --spacing-icon-lg: var(--icon-lg);\n  --spacing-row-compact: var(--row-compact);\n  --spacing-row-default: var(--row-default);\n  --spacing-row-comfortable: var(--row-comfortable);\n  --spacing-sidebar: var(--sidebar-width);\n  --spacing-sidebar-collapsed: var(--sidebar-width-collapsed);\n`;
theme += '}\n';
theme += src.duration.tokens.map((t) => `@utility ${t.name} { transition-duration: var(--${t.name}); animation-duration: var(--${t.name}); }\n`).join('');
theme += src.zIndex.tokens.map((t) => `@utility ${t.name} { z-index: var(--${t.name}); }\n`).join('');
theme += `@utility ring-focus { outline: var(--border-focus) solid var(--focus-ring); outline-offset: 2px; }\n`;
theme += `@utility tabular { font-variant-numeric: tabular-nums; }\n`;
out('src/lib/styles/theme.css', theme);

const byFamily = Object.fromEntries(families.map(([k, f]) => [k, Object.fromEntries(f.tokens.map((t) => [t.name, typeof t.value === 'string' ? t.value : Object.fromEntries(themeIds.map((id) => [id, t[id]]))]))]));
const ts = `export const themes = ${JSON.stringify(themeIds)} as const;
export type Theme = (typeof themes)[number];
export const primitiveTokens = ${JSON.stringify(Object.fromEntries(primitives.map((t) => [t.name, t.value])), null, 2)} as const;
export const colorTokens = ${JSON.stringify(Object.fromEntries(semantic.map((t) => [t.name, Object.fromEntries(themeIds.map((id) => [id, t[id]]))])), null, 2)} as const;
export type ColorToken = keyof typeof colorTokens;
export const tokens = ${JSON.stringify(byFamily, null, 2)} as const;
export const textStyles = ${JSON.stringify(src.type.styles.map((s) => s.name))} as const;
export type TextStyle = (typeof textStyles)[number];
export const cssVar = (name: ColorToken | (string & {})) => \`var(--\${name})\`;
`;
out('src/lib/tokens.ts', ts);
out('src/lib/version.ts', `export const version = '${pkg.version}';\n`);

const esc = (s) => s.replace(/\\/g, '\\\\').replace(/\|/g, '\\|');
let md = `# Tokens Heliony UI (v${src.version})\n\n> Généré depuis tokens/tokens.json. ${src.meta.note}\n\n`;
md += `Utiliser en CSS : \`var(--nom)\`. En Tailwind : \`bg-surface-raised\`, \`text-fg-secondary\`, \`border-line-subtle\`, \`bg-action-primary\`, \`text-success-fg\`, \`rounded-md\`, \`shadow-overlay\`, \`text-body\`, \`text-label\`. Espacements : échelle Tailwind par défaut (\`p-4\` = 1 rem). Thèmes : \`${themes.map((t) => `${t.id} (${t.selector})`).join(', ')}\`.\n\n`;
md += `## Couleurs sémantiques\n\n| Token | ${themeIds.map((id) => id[0].toUpperCase() + id.slice(1)).join(' | ')} | Usage |\n|---|${themeIds.map(() => '---').join('|')}|---|\n`;
md += semantic.map((t) => `| \`${t.name}\` | ${themeIds.map((id) => `\`${t[id]}\``).join(' | ')} | ${esc(t.usage)} |`).join('\n');
md += `\n\n## Primitives\n\nJamais utilisées directement par une interface.\n\n| Token | Valeur | Usage |\n|---|---|---|\n`;
md += primitives.map((t) => `| \`${t.name}\` | \`${t.value}\` | ${esc(t.usage)} |`).join('\n');
md += `\n\n## Typographie\n\nClasses \`.t-*\` ou utilitaires Tailwind \`text-*\` (taille, interligne, graisse et interlettrage ensemble). Familles : ${Object.entries(src.type.families).map(([k, v]) => `\`${k}\` = ${v}`).join(' ; ')}.\n\n| Style | Taille | Interligne | Graisse | Interlettrage | Usage |\n|---|---|---|---|---|---|\n`;
md += src.type.styles.map((s) => `| \`${s.name}\` | ${s.fontSize} | ${s.lineHeight} | ${s.fontWeight} | ${s.letterSpacing ?? '—'} | ${esc(s.usage)} |`).join('\n');
for (const [k, f] of families) {
  md += `\n\n## ${k}\n\n${f.note ? f.note + '\n\n' : ''}| Token | Valeur | Usage |\n|---|---|---|\n` + f.tokens.map((t) => `| \`${t.name}\` | ${typeof t.value === 'string' ? `\`${t.value}\`` : themeIds.map((id) => `${id} : \`${t[id]}\``).join(' ; ')} | ${esc(t.usage)} |`).join('\n');
}
out('ai/tokens.md', md + '\n');
console.log(`tokens v${src.version}: ${primitives.length} primitives, ${semantic.length} sémantiques × ${themeIds.length} thèmes, ${src.type.styles.length} styles, ${families.length} familles`);
