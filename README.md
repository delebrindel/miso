# Miso

A small React component library with accessible defaults, documented in Storybook.

Components: `Button`, `Input`, `Select`, `Modal`, `Tabs`, `Toast`.

Stack: React 19, TypeScript, Vite, Tailwind CSS v4, Storybook 10, Vitest with Testing Library.

## Scripts

```bash
npm install
npm run dev              # Storybook at http://localhost:6006
npm run build-storybook  # static build in storybook-static/
npm test                 # unit tests (Vitest + jsdom)
npm run typecheck        # tsc --noEmit
```

## Accessibility

- `Input` and `Select` always render a label bound with `htmlFor`, and link hint and error text through `aria-describedby`.
- `Modal` uses the native `<dialog>` element, so focus is trapped and the background is inert. Escape is routed to `onClose`.
- `Tabs` follows the WAI-ARIA tabs pattern: arrow keys, Home, and End move between enabled tabs.
- `Toast` uses `role="alert"` for errors and `role="status"` otherwise.
- The Storybook a11y addon shows axe results for each story in the Accessibility panel.

## Project layout

- `src/components/<Name>/` — component, story, and tests
- `src/index.ts` — public exports
- `.storybook/` — Storybook config; `preview.ts` loads the Tailwind stylesheet
- `.github/workflows/storybook.yml` — runs checks on every push and PR, and deploys Storybook to GitHub Pages from `main`

## License

No license has been chosen yet.
