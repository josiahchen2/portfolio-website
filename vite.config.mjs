import { defineConfig } from 'vite';
import { resolve } from 'node:path';
import { header, footer } from './src/layout.mjs';

const pages = [
  'index.html',
  'projects/index.html',
  'projects/audiomark-ai/index.html',
  'projects/ai-image-generator/index.html',
  'experience/index.html',
  'about/index.html',
  'contact/index.html',
];

export default defineConfig({
  plugins: [{
    name: 'portfolio-layout',
    transformIndexHtml(html) {
      const page = html.match(/<body[^>]*data-page="([^"]+)"/)?.[1] ?? 'home';
      return html
        .replace('<!-- site-header -->', header(page))
        .replace('<!-- site-footer -->', footer(page));
    },
  }],
  build: {
    rollupOptions: {
      input: Object.fromEntries(pages.map((page) => [page, resolve(import.meta.dirname, page)])),
    },
  },
});
