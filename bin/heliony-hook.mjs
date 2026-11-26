#!/usr/bin/env node
import { existsSync } from 'node:fs';
import { extname } from 'node:path';
import { checkFiles } from './heliony.mjs';

let input = '';
process.stdin.on('data', (d) => (input += d));
process.stdin.on('end', () => {
  let file;
  try { const j = JSON.parse(input || '{}'); file = j.tool_input?.file_path ?? j.tool_input?.path; } catch { process.exit(0); }
  if (!file || !existsSync(file) || !['.svelte', '.css', '.ts', '.js'].includes(extname(file))) process.exit(0);
  if (/node_modules|\/dist\/|\/build\//.test(file)) process.exit(0);
  const errors = checkFiles([file]).filter((f) => f.level === 'error');
  if (!errors.length) process.exit(0);
  process.stderr.write(`Design system Heliony — ${errors.length} violation(s) dans ${file} :\n` +
    errors.map((e) => `- ligne ${e.line} [${e.rule}] ${e.msg}\n    ${e.text}`).join('\n') +
    `\nCorrige en utilisant @heliony/ui et ses tokens (voir node_modules/@heliony/ui/ai/HELIONY.md). Exception justifiée : commentaire « heliony-allow » avec la raison.\n`);
  process.exit(2);
});
