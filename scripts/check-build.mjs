import { existsSync, readFileSync } from 'node:fs';
import { join } from 'node:path';

const routes = [
  '/',
  '/projects/',
  '/projects/audiomark-ai/',
  '/projects/ai-image-generator/',
  '/experience/',
  '/about/',
  '/contact/',
];

for (const route of routes) {
  const file = join('dist', route.slice(1), 'index.html');
  if (!existsSync(file)) throw new Error(`Missing route: ${route}`);

  const html = readFileSync(file, 'utf8');
  for (const expected of ['<title>', '<main id="main">', 'Main navigation', 'site-footer']) {
    if (!html.includes(expected)) throw new Error(`${route} is missing ${expected}`);
  }

  for (const [, href] of html.matchAll(/href="(\/[^\"]*)"/g)) {
    const target = href.split('#')[0];
    if (!target) continue;
    const output = target.endsWith('/')
      ? join('dist', target.slice(1), 'index.html')
      : join('dist', target.slice(1));
    if (!existsSync(output)) throw new Error(`${route} links to missing asset or route: ${target}`);
  }

  console.log(`${route} OK`);
}
