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
  const expectedMarkup = route === '/about/'
    ? ['<title>', 'content="0; url=/experience/#about"', 'rel="canonical"']
    : ['<title>', '<main id="main">', 'Main navigation', 'site-footer'];
  for (const expected of expectedMarkup) {
    if (!html.includes(expected)) throw new Error(`${route} is missing ${expected}`);
  }

  for (const [, href] of html.matchAll(/href="([^"]*)"/g)) {
    if (!href.startsWith('/') && !href.startsWith('#')) continue;
    const [target, fragment] = href.split('#');
    const output = !target ? file : target.endsWith('/')
      ? join('dist', target.slice(1), 'index.html')
      : join('dist', target.slice(1));
    if (!existsSync(output)) throw new Error(`${route} links to missing asset or route: ${target}`);
    if (fragment && output.endsWith('.html') && !readFileSync(output, 'utf8').includes(`id="${fragment}"`)) {
      throw new Error(`${route} links to missing anchor: ${href}`);
    }
  }

  console.log(`${route} OK`);
}
