#!/usr/bin/env node
import { writeFileSync, readFileSync, mkdirSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { createRequire } from 'node:module';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const pkg = JSON.parse(readFileSync(resolve(root, 'package.json'), 'utf8'));
const { components, groups } = await loadCatalog();

async function loadCatalog() {
  const require = createRequire(import.meta.url);
  const ts = require('typescript');
  const src = readFileSync(resolve(root, 'catalog/catalog.ts'), 'utf8');
  const js = ts.transpileModule(src, { compilerOptions: { module: ts.ModuleKind.ESNext, target: ts.ScriptTarget.ES2022 } }).outputText;
  return await import(`data:text/javascript;base64,${Buffer.from(js).toString('base64')}`);
}

const esc = (s) => String(s).replace(/\\/g, '\\\\').replace(/\|/g, '\\|');
const repriseLabel = { adapted: 'repris de shadcn-svelte et habillé', recoded: 'recodé pour Heliony', original: 'maison' };
let md = `# Composants @heliony/ui ${pkg.version}\n\n> Généré depuis catalog/catalog.ts. Import : \`import { Nom } from '@heliony/ui'\`. Styles : \`@import '@heliony/ui/styles.css'\` et \`@import '@heliony/ui/theme.css'\` une fois dans le CSS racine, après \`@import 'tailwindcss'\`. Racine : \`<HelionyProvider>\`.\n\n`;
md += `| Composant | Groupe | Rôle | Origine |\n|---|---|---|---|\n` + components.map((c) => `| [\`${c.name}\`](#${c.name.toLowerCase()}) | ${groups.find((g) => g.id === c.group).label} | ${esc(c.summary)} | ${repriseLabel[c.reprise]} |`).join('\n') + '\n';
for (const g of groups) {
  const list = components.filter((x) => x.group === g.id);
  if (!list.length) continue;
  md += `\n## ${g.label}\n`;
  for (const c of list) {
    md += `\n### ${c.name}\n\n${c.summary}\n\n`;
    if (c.use?.length) md += `**Utiliser** : ${c.use.join(' ')}\n\n`;
    if (c.avoid?.length) md += `**Éviter** : ${c.avoid.join(' ')}\n\n`;
    md += `| Prop | Type | Défaut | Description |\n|---|---|---|---|\n` + c.props.map((p) => `| \`${p.name}\` | \`${esc(p.type)}\` | ${esc(p.default)} | ${esc(p.desc)} |`).join('\n') + '\n\n';
    md += '```svelte\n' + c.example + '\n```\n';
  }
}
md += `\n## Hors composants\n\n| Export | Rôle |\n|---|---|\n| \`toast.push({...})\`, \`toast.success()\`, \`toast.error()\`, \`toast.dismiss(id)\` | File de notifications (afficher \`<Toaster />\`). |\n| \`useStrings()\`, \`useLocale()\`, \`useHeliony()\` | Chaînes et locale du provider dans un composant métier. |\n| \`formatNumber\`, \`formatPercent\`, \`formatCompact\`, \`formatBytes\`, \`formatDate\`, \`formatTime\`, \`formatDateTime\`, \`formatDuration\`, \`formatRelative\` | Formats localisés. |\n| \`toIsoDate\`, \`fromIsoDate\`, \`fromDate\`, \`todayDate\` | Conversions DateValue. |\n| \`Below\`, \`ReducedMotion\` | Media queries réactives (\`new Below('md').current\`). |\n| \`cn()\` | Fusion de classes Tailwind. |\n| \`colorTokens\`, \`tokens\`, \`textStyles\`, \`cssVar()\` | Tokens typés. |\n`;
mkdirSync(resolve(root, 'ai'), { recursive: true });
writeFileSync(resolve(root, 'ai/components.md'), md);
writeFileSync(resolve(root, 'ai/components.json'), JSON.stringify(components.map((c) => c.name), null, 0) + '\n');
writeFileSync(resolve(root, 'ai/llms.txt'), `# @heliony/ui ${pkg.version}\n\n> Design system Heliony pour les applications web SvelteKit (Svelte 5, Tailwind v4, Bits UI). Dark et Light.\n\n- [Règles et architecture](HELIONY.md)\n- [Composants](components.md)\n- [Tokens](tokens.md)\n`);
console.log(`ai: ${components.length} composants documentés`);
