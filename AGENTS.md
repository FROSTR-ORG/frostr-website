# Repository Guidelines

## Project Structure & Module Organization
The app is a Vite-powered React SPA located under `src/`. `src/main.jsx` hydrates `App.jsx`, and high-level route views live in `src/components/routes/` while reusable widgets sit in `src/components/ui/`. Keep shared logic inside `src/lib/utils.ts`, and store media or JSON payloads under `src/assets/`. Styling is split between Tailwind (`tailwind.config.js`, `src/index.css`) and component-level CSS (`src/App.css`). Static files and the HTML shell stay in `public/`. Build and tooling configuration files are in the repository root alongside deployment metadata such as `vercel.json`.

## Build, Test, and Development Commands
Run `npm install` once per environment. Use `npm run dev` for the local hot-reload server, `npm run build` to generate the production bundle in `dist/`, and `npm run preview` to verify the compiled output. Execute `npm run lint` before opening a PR to apply the shared ESLint policy; fixable issues can be autofixed with `npm run lint -- --fix`.

## Coding Style & Naming Conventions
Follow the existing two-space indentation, semicolon-terminated statements, and single quotes for strings. Name React components with PascalCase and helpers or hooks in camelCase. Keep JSX lean by extracting complex markup into `src/components/ui/`. Tailwind utility classes should remain in markup; define design tokens in `components.json` or the Tailwind config if reuse is required. Rely on ESLint’s React and Hooks rules to guard against common pitfalls.

## Testing Guidelines
Automated testing is not wired up yet. When adding significant behavior, include a proposed Vitest + React Testing Library setup under `src/__tests__/` or colocated `*.test.jsx` files and document coverage results in your PR. At minimum, provide manual verification steps covering routing, API requests, and responsive layouts.

## Commit & Pull Request Guidelines
Recent commits use short, imperative, lower-case messages (e.g., “add apps tab”). Mirror that style, preferring one topical change per commit. PRs should include a concise summary, reference any tracked issue numbers, list manual test steps, and attach screenshots or clips for UI changes. Mention required environment variables or migration steps so reviewers can reproduce your results.

## Security & Configuration Tips
API-powered sections expect `VITE_GITHUB_API_KEY` in a local `.env` file; do not commit secrets. Validate that failures degrade gracefully by testing with the key unset. Share any new secrets or webhook requirements in the PR description so the deployment team can update project settings.
