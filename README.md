# Josiah Chen — Portfolio

A multipage software engineering portfolio with a homepage overview, dedicated Projects, Experience, About, and Contact pages, and two project showcases. The site uses Vite's multipage build and shares its navigation and footer through `src/layout.mjs`.

## Development

```bash
npm install
npm run dev
```

## Production build

```bash
npm run build
npm run check
```

The static site is generated in `dist/`. Each route has its own `index.html`, so direct links and refreshes work without a client-side router. The resume in `public/` is copied to the root of the output.

## Routes

- `/` — overview
- `/projects/` — selected projects
- `/projects/audiomark-ai/` — Audiomark AI showcase
- `/projects/ai-image-generator/` — AI Image Generator showcase
- `/experience/`, `/about/`, `/contact/` — dedicated sections

## Deploy to Vercel

The existing `vercel.json` builds with `npm run build` and serves `dist/`. After deployment, check every route directly, navigate from the homepage to each section and project, and verify the live app, GitHub, contact, and resume links.

Website Link: [josiahchen2.vercel.app](josiahchen2.vercel.app)


## Content to confirm

The project descriptions, dates, stacks, experience, education, availability, and contact details are carried from the original homepage. Confirm these details before treating the new pages as final portfolio copy. Project screenshots or diagrams can be added later if available.
