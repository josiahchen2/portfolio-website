const links = [
  ['projects', 'Projects', '/projects/'],
  ['experience', 'Experience', '/experience/'],
  ['about', 'About', '/about/'],
  ['contact', 'Contact', '/contact/'],
];

export function header(page) {
  const current = page.startsWith('project-') ? 'projects' : page;
  const navigation = links.map(([id, label, href]) =>
    `<a href="${href}"${current === id ? ' aria-current="page"' : ''}>${label}</a>`,
  ).join('\n        ');

  return `<header class="site-header">
      <a class="monogram" href="/" aria-label="Josiah Chen, home">JC<span class="dot">.</span></a>
      <nav aria-label="Main navigation">
        ${navigation}
        <a href="/Josiah_Chen_Resume_SWE.pdf" target="_blank" rel="noopener noreferrer">Resume <span aria-hidden="true">↗</span></a>
      </nav>
    </header>`;
}

export function footer(page) {
  const homeLink = page === 'home' ? '#top' : '/';
  const homeLabel = page === 'home' ? 'Back to top' : 'Back to home';
  return `<footer class="site-footer section-shell">
      <p>© <span id="year">2026</span> Josiah Chen</p>
      <a href="${homeLink}">${homeLabel} ↑</a>
    </footer>`;
}
