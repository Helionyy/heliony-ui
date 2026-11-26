#!/usr/bin/env node
import { existsSync, readFileSync } from 'node:fs';
import { execSync } from 'node:child_process';

const pkg = JSON.parse(readFileSync('package.json', 'utf8'));
const stamp = existsSync('dist/.version') ? readFileSync('dist/.version', 'utf8').trim() : '';
if (stamp === pkg.version && existsSync('dist/index.js')) process.exit(0);
if (!existsSync('node_modules/@sveltejs/package')) process.exit(0);
execSync('bun run build', { stdio: 'inherit' });
