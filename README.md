# Josiah Chen — Portfolio

A single-page software engineering portfolio featuring shipped work, engineering experience, and a downloadable resume. The hero uses a continuous animated fluid gradient in a dark blue, teal, and muted green palette.

## Development

```bash
npm install
npm run dev
```

## Production build

```bash
npm run build
```

The static site is generated in `dist/`. The resume in `public/` is copied to the root of that output and is available at `/Josiah_Chen_Resume_SWE.pdf`.

## Deploy to Vercel

1. Push `main` to the [GitHub repository](https://github.com/josiahchen2/portfolio-website).
2. In Vercel, create a new project from that repository with the root directory set to the repository root.
3. Deploy the `main` branch. `vercel.json` selects Vite, runs `npm run build`, and serves `dist/`. No environment variables or rewrite rules are required.
4. Check the live homepage, both project links, the contact links, and the resume download.

The older Sites deployment remains private; Vercel is the primary deployment for this portfolio.
