# Web Site One — Personal Website

A modern, fast personal website built with Angular 20 and Tailwind CSS. It includes sections like Hero, Skills, About, and Contact, with smooth scrolling and a responsive layout. A static `template.html` is also provided as a design reference.

## Quick start

Prerequisites:
- Node.js 18+ (recommended: 20+)
- npm 9+

Install dependencies and start the dev server:

```bash
npm install
npm start
```

Then open http://localhost:4200/. The app reloads on file changes.

## Scripts

- `npm start` — Run the local development server (Angular CLI `ng serve`).
- `npm run build` — Production build to `dist/`.
- `npm run watch` — Development build with watch mode.
- `npm test` — Run unit tests with Karma/Jasmine.

## Tech stack

- Angular 20
- Tailwind CSS 3 (configured via `tailwind.config.js`, `postcss.config.js`)
- TypeScript 5
- Inter font (via CDN in `template.html`); optional iconography via Lucide and charts via Chart.js are shown in `template.html` only

## Project structure

- `src/` — Angular application source
  - `app/` — Components and app logic
  - `index.html` — App entry
  - `styles.css` — Global styles (Tailwind included)
- `public/` — Static assets (e.g., `favicon.ico`)
- `template.html` — Standalone static HTML design reference not used by Angular build

## Styling

Tailwind is enabled and processed via PostCSS. You can customize design tokens in `tailwind.config.js` and add global utilities to `src/styles.css`.

## Build & deploy

Create an optimized production build:

```bash
npm run build
```

Artifacts are emitted to `dist/`. You can deploy the contents of the built app to any static hosting (e.g., Netlify, Vercel, GitHub Pages, or an S3 bucket). For simple static hosting, serve the `dist/<project-name>` folder.

## Generating components

You can scaffold components with Angular CLI:

```bash
npx ng generate component my-component
```

See all schematics with `npx ng g --help`.

## Notes

- If you copy code from `template.html`, move scripts/styles to Angular-friendly locations (e.g., install packages or add to `angular.json` as needed).
- Update the site content (name, hero text, sections) inside components under `src/app/`.

## License

This repository currently has no explicit license. Add one if you plan to open-source or distribute it.
