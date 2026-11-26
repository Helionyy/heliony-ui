#!/usr/bin/env node
import { readFileSync, writeFileSync, existsSync, readdirSync, statSync, mkdirSync, cpSync, realpathSync } from 'node:fs';
import { join, resolve, relative, extname, basename, dirname } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const PKG_ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const PKG = JSON.parse(readFileSync(join(PKG_ROOT, 'package.json'), 'utf8'));
const [, , cmd, ...rest] = process.argv;
const flags = new Set(rest.filter((a) => a.startsWith('--')));
const args = rest.filter((a) => !a.startsWith('--'));
const C = { red: (s) => `\x1b[31m${s}\x1b[0m`, yellow: (s) => `\x1b[33m${s}\x1b[0m`, green: (s) => `\x1b[32m${s}\x1b[0m`, dim: (s) => `\x1b[2m${s}\x1b[0m` };

const readIfExists = (file) => { try { return readFileSync(file, 'utf8'); } catch (e) { if (e && e.code === 'ENOENT') return null; throw e; } };
const componentsJson = readIfExists(join(PKG_ROOT, 'ai', 'components.json'));
export const LIB_COMPONENTS = componentsJson ? JSON.parse(componentsJson) : [];

const SHADCN_CLASSES = /\b(?:bg|text|border|ring|fill|stroke|from|to|via|outline|divide|placeholder|decoration|shadow)-(?:background|foreground|card(?:-foreground)?|popover(?:-foreground)?|primary(?:-foreground)?|secondary(?:-foreground)?|muted(?:-foreground)?|accent-foreground|destructive(?:-foreground)?|input|ring|sidebar(?:-[a-z-]+)?|chart-[1-5]\b|border\b)\b/;

export const RULES = [
  { id: 'no-literal-color', level: 'error', self: false, ext: ['.css', '.svelte'], re: /#[0-9a-fA-F]{3,8}\b(?![\w-])|\brgba?\(\s*\d|\bhsla?\(\s*\d|\boklch\(\s*[\d.]/, msg: 'Couleur codée en dur : utiliser un token (bg-surface-raised, text-fg-secondary, var(--accent)…).' },
  { id: 'no-arbitrary-tw-color', level: 'error', self: false, re: /\b(bg|text|border|ring|fill|stroke|from|to|via|shadow|outline)-\[(#|rgb|hsl|oklch)/, msg: 'Couleur Tailwind arbitraire : utiliser une classe du thème Heliony.' },
  { id: 'no-shadcn-class', level: 'error', self: true, ext: ['.svelte', '.ts', '.css'], re: SHADCN_CLASSES, msg: 'Classe shadcn résiduelle : le thème Heliony nomme surface-*, fg-*, line-*, action-*, accent, success…' },
  { id: 'no-primitive-token', level: 'error', self: false, ext: ['.svelte', '.ts', '.css'], re: /\b(?:bg|text|border|fill|stroke)-(?:n|glacier|green|amber|red|violet|teal|rose|sand|gold)-\d+\b|var\(--(?:n|glacier|green|amber|red|violet|teal|rose|sand|gold)-\d+\)/, msg: 'Primitive utilisée directement : passer par un token sémantique (surface-*, fg-*, success, danger…).' },
  { id: 'no-font-family', level: 'error', self: false, ext: ['.css', '.svelte'], re: /font-family\s*:\s*(?!var\(--font-|inherit)/, msg: 'Police hors système : var(--font-sans) ou var(--font-mono), classes font-sans / font-mono.' },
  { id: 'min-font-size', level: 'error', self: false, ext: ['.css', '.svelte'], re: /font-size\s*:\s*([0-9]|1[01])(\.\d+)?px|\btext-\[(?:[0-9]|1[01])(?:\.\d+)?px\]/, msg: 'Texte sous 12 px : utiliser un style text-caption, text-label, text-body.' },
  { id: 'no-blur', level: 'error', self: true, re: /backdrop-filter|filter\s*:\s*blur|\bbackdrop-blur(?:-[a-z0-9]+)?\b|\bblur-(sm|md|lg|xl|2xl|3xl)\b/, msg: 'Aucun flou : l’identité Heliony pose un voile (bg-scrim) et des surfaces nettes.' },
  { id: 'no-gradient', level: 'warn', self: false, re: /\bbg-(linear|radial|conic)-|\bbg-gradient-to-|linear-gradient\(/, msg: 'Dégradé décoratif : l’identité Heliony est à aplats. Réservé aux visuels publics, à justifier.' },
  { id: 'animated-layout', level: 'warn', self: true, ext: ['.css', '.svelte'], re: /transition\s*:[^;}]*\b(width|height|top|left|margin|padding)\b/, msg: 'Animer width/height/top/left coûte une mise en page : préférer transform/opacity.' },
  { id: 'nested-surface', level: 'warn', self: false, ext: ['.svelte'], re: /<Surface\b[^>]*>(?:(?!<\/Surface>)[\s\S])*<Surface\b/, msg: 'Surface dans une Surface : un seul niveau au-dessus de la base par zone (Divider ou espace).' },
];
const SKIP_DIRS = new Set(['node_modules', 'dist', '.git', '.svelte-kit', 'build', 'static']);
const EXTS = new Set(['.svelte', '.css', '.ts', '.js']);

function walk(p, out = []) {
  if (!existsSync(p)) return out;
  const st = statSync(p);
  if (st.isFile()) { if (EXTS.has(extname(p))) out.push(p); return out; }
  for (const e of readdirSync(p)) { if (SKIP_DIRS.has(e) || e.startsWith('.')) continue; walk(join(p, e), out); }
  return out;
}

export function checkFiles(files, { self = false } = {}) {
  const findings = [];
  for (const f of files) {
    const name = basename(f);
    if (/tokens\.css$|theme\.css$|tokens\.ts$|tokens\.json$/.test(name)) continue;
    const raw = readFileSync(f, 'utf8');
    const lines = raw.split('\n');
    const blank = (m) => m.replace(/[^\n]/g, ' ');
    const src = raw.replace(/\/\*[\s\S]*?\*\//g, blank).replace(/<!--[\s\S]*?-->/g, blank).replace(/(^|[^:'"`\\])\/\/[^\n]*/g, (m, p1) => p1 + blank(m.slice(p1.length)));
    const allowLine = (i) => /heliony-allow\b/.test(lines[i] ?? '') || /heliony-allow-next-line/.test(lines[i - 1] ?? '');
    for (const r of RULES) {
      if (self && !r.self) continue;
      if (r.ext && !r.ext.includes(extname(f))) continue;
      const re = new RegExp(r.re.source, r.re.flags.includes('m') ? 'gm' : 'g');
      let m;
      while ((m = re.exec(src))) {
        const line = src.slice(0, m.index).split('\n').length;
        if (!allowLine(line - 1)) findings.push({ file: f, line, rule: r.id, level: r.level, msg: r.msg, text: (lines[line - 1] ?? '').trim().slice(0, 120) });
        if (re.lastIndex === m.index) re.lastIndex++;
      }
    }
    if (!self && extname(f) === '.svelte' && LIB_COMPONENTS.includes(name.replace('.svelte', ''))) {
      findings.push({ file: f, line: 1, rule: 'no-duplicate-component', level: 'error', msg: `« ${name} » existe déjà dans @heliony/ui : l’importer (import { ${name.replace('.svelte', '')} } from '@heliony/ui').`, text: '' });
    }
  }
  return findings;
}

function cmdCheck() {
  const self = flags.has('--self');
  const targets = args.length ? args : ['src'];
  const files = targets.flatMap((t) => walk(resolve(t)));
  const findings = checkFiles(files, { self });
  if (flags.has('--json')) console.log(JSON.stringify(findings, null, 2));
  else {
    for (const f of findings) console.log(`${f.level === 'error' ? C.red('error') : C.yellow('warn ')} ${relative(process.cwd(), f.file)}:${f.line}  ${f.msg}  ${C.dim(`[${f.rule}]`)}\n        ${C.dim(f.text)}`);
    const e = findings.filter((f) => f.level === 'error').length, w = findings.length - e;
    console.log(`${files.length} fichiers · ${e ? C.red(`${e} erreur(s)`) : C.green('0 erreur')} · ${w} avertissement(s)${e ? '' : ' — conforme Heliony'}`);
    console.log(C.dim('Exception justifiée : ajouter « heliony-allow » sur la ligne (ou « heliony-allow-next-line » au-dessus) avec la raison.'));
  }
  process.exit(findings.some((f) => f.level === 'error') && !flags.has('--warn-only') ? 1 : 0);
}

const BEGIN = '<!-- heliony:begin -->', END = '<!-- heliony:end -->';
function block(kind) {
  const v = PKG.version;
  const common = `## Design system Heliony (@heliony/ui ${v}) — obligatoire pour toute interface

Cette application utilise le design system officiel Heliony. Avant de créer ou modifier une interface :

1. Lire \`node_modules/@heliony/ui/ai/HELIONY.md\` (règles, identité, interdits), puis \`ai/components.md\` (composants, props, exemples) et \`ai/tokens.md\` (tokens Dark et Light).
2. **Réutiliser** les composants de \`@heliony/ui\` (\`import { Button, DataTable, Dialog } from '@heliony/ui'\`). Ne jamais recréer un composant générique qui existe. Composant générique ou variante manquante : l’ajouter dans le dépôt \`heliony-ui\` (branche, PR, release), puis mettre à jour la dépendance. Seuls les composants métier restent dans l’application.
3. Styles : uniquement des tokens (classes Tailwind du thème Heliony \`bg-surface-raised text-fg-secondary border-line-subtle\`, styles \`text-body\`, \`var(--…)\`). Aucune couleur, police ou taille codée en dur, aucune classe shadcn, aucun flou. Deux thèmes égaux : tout se lit en Dark et en Light.
4. États et accessibilité : \`DataState\` autour de tout bloc de données, focus visible partout, \`label\` sur tout \`iconOnly\`.
5. Après chaque modification d’interface : \`bun run lint\` (inclut \`heliony check src\`), \`bun run check\` et \`bun run test\` doivent passer.
`;
  const claude = `${common}\n@node_modules/@heliony/ui/ai/HELIONY.md\n`;
  return `${BEGIN}\n<!-- Généré par « bunx heliony ai sync » (@heliony/ui ${v}). Ne pas modifier entre les marqueurs. -->\n${kind === 'claude' ? claude : common}${END}`;
}
function upsert(file, content, header) {
  const cur = readIfExists(file) ?? `${header}\n\n`;
  const next = cur.includes(BEGIN) ? cur.replace(new RegExp(`${BEGIN}[\\s\\S]*?${END}`), content) : `${cur.trimEnd()}\n\n${content}\n`;
  writeFileSync(file, next);
}
function ensureIgnored(dir, entries) {
  const file = join(dir, '.gitignore');
  const cur = readIfExists(file) ?? '';
  const lines = cur.split('\n').map((l) => l.trim());
  const missing = entries.filter((e) => !lines.includes(e));
  if (missing.length) writeFileSync(file, `${cur.trimEnd()}${cur.trim() ? '\n' : ''}${missing.join('\n')}\n`);
  return missing;
}
function cmdAi(sub) {
  const dir = resolve(args[1] ?? '.');
  const files = { claude: join(dir, 'CLAUDE.md'), agents: join(dir, 'AGENTS.md') };
  if (sub === 'check') {
    const bad = Object.entries(files).filter(([, f]) => !(readIfExists(f) ?? '').includes(`@heliony/ui ${PKG.version})`));
    for (const [, f] of bad) console.log(C.red(`✗ ${relative(process.cwd(), f)} absent ou pas à jour (attendu @heliony/ui ${PKG.version}) — lancer « bunx heliony ai sync »`));
    if (!bad.length) console.log(C.green(`✓ instructions IA à jour (@heliony/ui ${PKG.version})`));
    process.exit(bad.length ? 1 : 0);
  }
  upsert(files.claude, block('claude'), '# CLAUDE.md');
  upsert(files.agents, block('agents'), '# AGENTS.md');
  const skillDir = join(dir, '.claude', 'skills', 'heliony-ui');
  mkdirSync(skillDir, { recursive: true });
  writeFileSync(join(skillDir, 'SKILL.md'), readFileSync(join(PKG_ROOT, 'ai', 'skill', 'SKILL.md'), 'utf8'));
  const settingsPath = join(dir, '.claude', 'settings.json');
  const settings = JSON.parse(readIfExists(settingsPath) ?? '{}');
  settings.hooks ??= {};
  settings.hooks.PostToolUse ??= [];
  const hookCmd = 'node "$CLAUDE_PROJECT_DIR/node_modules/@heliony/ui/bin/heliony-hook.mjs"';
  if (!JSON.stringify(settings.hooks.PostToolUse).includes('heliony-hook')) settings.hooks.PostToolUse.push({ matcher: 'Edit|MultiEdit|Write', hooks: [{ type: 'command', command: hookCmd }] });
  writeFileSync(settingsPath, JSON.stringify(settings, null, 2) + '\n');
  const ignored = ensureIgnored(dir, ['.claude', 'CLAUDE.md', 'AGENTS.md']);
  console.log(C.green(`✓ CLAUDE.md, AGENTS.md, .claude/skills/heliony-ui/SKILL.md et hook à jour (@heliony/ui ${PKG.version})`));
  if (ignored.length) console.log(C.dim(`  .gitignore : ${ignored.join(', ')} ajoutés (ces fichiers ne sont jamais poussés)`));
}

function cmdInit() {
  const target = resolve(args[0] ?? '.');
  if (!existsSync(join(target, 'package.json'))) { console.log(C.red(`${target} n’est pas un projet (package.json absent). Créer d’abord l’application SvelteKit, puis relancer.`)); process.exit(1); }
  const tpl = join(PKG_ROOT, 'templates', 'app');
  for (const f of ['src/app.css', 'src/routes/+layout.svelte', 'src/lib/nav.ts', 'src/lib/index.ts', 'src/routes/+page.svelte']) {
    const dest = join(target, f);
    if (existsSync(dest) && !flags.has('--force')) { console.log(C.yellow(`· ${f} existe, conservé (--force pour écraser)`)); continue; }
    mkdirSync(dirname(dest), { recursive: true });
    cpSync(join(tpl, f), dest);
    console.log(C.green(`✓ ${f}`));
  }
  const html = join(target, 'src', 'app.html');
  const cur = readIfExists(html);
  if (cur !== null && !/<html[^>]*class=/.test(cur)) { writeFileSync(html, cur.replace(/<html([^>]*)>/, '<html$1 class="dark">')); console.log(C.green('✓ src/app.html : classe dark sur <html>')); }
  console.log(`  Ensuite : bun add "git+https://github.com/Helionyy/heliony-ui.git#v${PKG.version}" && bunx heliony ai sync .`);
}

const isMain = !!process.argv[1] && import.meta.url === pathToFileURL(realpathSync(resolve(process.argv[1]))).href;
if (isMain) switch (cmd) {
  case 'check': cmdCheck(); break;
  case 'ai': cmdAi(args[0]); break;
  case 'init': cmdInit(); break;
  case '--version': case '-v': console.log(PKG.version); break;
  default:
    console.log(`heliony ${PKG.version}\n  heliony check [chemins…] [--json] [--warn-only]\n  heliony ai sync [dossier] | heliony ai check [dossier]\n  heliony init [dossier-app] [--force]`);
}
