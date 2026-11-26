#!/usr/bin/env node
import { execSync } from 'node:child_process';
import { cpSync, mkdtempSync, readFileSync, writeFileSync, existsSync, rmSync, readdirSync, statSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { tmpdir } from 'node:os';

const root = resolve(import.meta.dirname, '..');
const run = (cmd, cwd) => { console.log(`\n$ ${cmd}  (${cwd})`); execSync(cmd, { cwd, stdio: 'inherit' }); };
const out = process.env.HELIONY_FIXTURE ?? mkdtempSync(join(tmpdir(), 'heliony-fixture-'));
rmSync(out, { recursive: true, force: true });

const tgz = execSync('bun pm pack --quiet', { cwd: root }).toString().trim().split('\n').pop();
cpSync(join(root, 'templates', 'app'), out, { recursive: true });
const pkgPath = join(out, 'package.json');
const pkg = JSON.parse(readFileSync(pkgPath, 'utf8'));
pkg.dependencies['@heliony/ui'] = `file:${join(root, tgz)}`;
writeFileSync(pkgPath, JSON.stringify(pkg, null, 2));

run('bun install', out);
run('bunx heliony ai sync .', out);
run('bunx heliony ai check .', out);
run('bun run lint', out);
run('bun run check', out);
run('bun run build', out);

const problems = [];
const gi = readFileSync(join(out, '.gitignore'), 'utf8');
for (const e of ['.claude', 'CLAUDE.md', 'AGENTS.md']) if (!gi.split('\n').includes(e)) problems.push(`.gitignore sans ${e}`);
const walk = (d, acc = []) => { for (const f of readdirSync(d)) { const p = join(d, f); statSync(p).isDirectory() ? walk(p, acc) : acc.push(p); } return acc; };
const built = walk(join(out, '.svelte-kit', 'output', 'client'));
const css = built.filter((f) => f.endsWith('.css')).map((f) => readFileSync(f, 'utf8')).join('\n');
if (!/--surface-base/.test(css)) problems.push('CSS compilée sans les tokens Heliony');
if (!/\.bg-surface-raised|\.text-fg-secondary/.test(css)) problems.push('CSS compilée sans les classes du thème (vérifier @source)');
if (!/\.light/.test(css)) problems.push('CSS compilée sans le thème Light');
if (!built.some((f) => f.endsWith('.woff2'))) problems.push('polices absentes du build');
if (/backdrop-filter/.test(css)) problems.push('CSS : backdrop-filter (le flou est interdit)');
console.log(`\nBuild : ${built.length} fichiers client, ${(css.length / 1024).toFixed(0)} Ko CSS`);
if (problems.length) { console.error('✗ ' + problems.join('\n✗ ')); process.exit(1); }
console.log(`✓ application conforme et autonome (${out})`);
if (existsSync(join(root, tgz))) rmSync(join(root, tgz));
