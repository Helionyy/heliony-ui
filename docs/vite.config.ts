import { defineConfig } from 'vite';
import { svelte } from '@sveltejs/vite-plugin-svelte';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  root: 'docs',
  base: './',
  plugins: [tailwindcss(), svelte()],
  build: { outDir: 'dist', emptyOutDir: true },
});
