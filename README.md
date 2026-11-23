# Miso

A small React component library with accessible defaults, documented in Storybook.

Beta: version 0.1.0-beta.0. The API may still change before 1.0.

Components: `Accordion`, `Button`, `Card`, `Checkbox`, `Hero`, `Input`, `Modal`, `RadioGroup`, `Select`, `Skeleton`, `Slider`, `Spinner`, `Switch`, `Tabs`, `Toast`, `ToastProvider`, `ThemeToggle`.

Stack: React 19, TypeScript, Vite, Tailwind CSS v4, Storybook 10, Vitest with Testing Library.

## Install

```bash
npm install @delebrindel/miso
```

Requires React 19 (peer dependency). The package is ESM and ships TypeScript declarations.

## Scripts

```bash
npm install
npm run dev              # Storybook at http://localhost:6006
npm run build            # library build to dist/ (JS and .d.ts)
npm run build-storybook  # static Storybook build in storybook-static/
npm test                 # unit tests (Vitest + jsdom)
npm run typecheck        # tsc --noEmit
```

## Using Miso in a project

Import components from `@delebrindel/miso` and the token stylesheet from `@delebrindel/miso/theme.css`. Tailwind must also scan the built package so the component classes are generated. In your stylesheet (paths are relative to that file):

```css
@import "tailwindcss";
@import "@delebrindel/miso/theme.css";
@source "../node_modules/@delebrindel/miso/dist";
```

The [website starter](../website-starter) is a complete example.

## Theming

Light is the default. Setting `<html data-theme="dark">` activates the dark token set.

```ts
import { getTheme, setTheme } from '@delebrindel/miso';

setTheme('dark'); // applies, saves to localStorage, and updates every useTheme hook
getTheme();       // saved choice, otherwise the OS preference
```

- `useTheme()` returns `{ theme, setTheme }` for React components and re-renders on any `setTheme` call.
- The storage key defaults to `miso-theme`. Pass `{ storageKey }` to `setTheme`, `getTheme`, or `useTheme` to change it.
- `ThemeToggle` is built on `useTheme`. It accepts `storageKey` and `className`.
- To avoid a white flash on dark pages, set `data-theme` in a script in `<head>` before first paint. The starter's `index.html` shows one.

### Design tokens

Components read these CSS variables:

| Token | Light | Dark | Used for |
|---|---|---|---|
| `page` | `#ffffff` | `#0f172a` | page background |
| `surface` | `#ffffff` | `#1e293b` | cards, panels |
| `surface-alt` | `#f1f5f9` | `#273449` | hover states, tags |
| `border` | `#cbd5e1` | `#334155` | borders, underlines |
| `fg` | `#0f172a` | `#f1f5f9` | text |
| `muted` | `#475569` | `#94a3b8` | secondary text |
| `accent` | `#2563eb` | `#60a5fa` | focus rings, links, eyebrows |

Override them in your own CSS, after importing `@delebrindel/miso/theme.css`:

- `@theme { --color-accent: #0e7490; }` sets the light values.
- `:root[data-theme='dark'] { --color-accent: #67e8f9; }` sets the dark values.

All components follow the tokens. The `Modal` backdrop is a fixed dark tint in both themes.

## Accessibility

- `Input` and `Select` always render a label bound with `htmlFor`, and link hint and error text through `aria-describedby`. They use an underline-only style.
- `Modal` uses the native `<dialog>` element, so focus is trapped and the background is inert. Escape is routed to `onClose`.
- `Tabs` follows the WAI-ARIA tabs pattern: arrow keys, Home, and End move between enabled tabs. Disabled tabs don't respond to hover and show a `not-allowed` cursor.
- `Toast` uses `role="alert"` for errors and `role="status"` otherwise. Toasts stay until dismissed. Set `duration` (ms) on `ToastProvider` or on one toast to auto-dismiss it.
- `Accordion` opens one item at a time. Pass `exclusive={false}` to allow several open. Each title is a heading inside `summary`; `headingLevel` (2 to 4, default 3) sets its level.
- `Spinner` is a `role="status"` region with a visible label (default "Loading"). The ring animates for every user. To stop it, set `animation: none` on `.miso-spinner` in your CSS.
- `Skeleton` is decorative and hidden from assistive technology. Put `aria-busy="true"` on the container that is loading.
- `Slider` is a labelled carousel region. ArrowLeft and ArrowRight move between slides while focus is inside it. It doesn't autoplay. Inactive slides use `hidden`, so they're removed from the accessibility tree.
- `Card` with `href` stretches the title link over the whole card. Footer controls stay clickable. `headingLevel` (2 to 4, default 3) sets the title's heading level.
- `Hero` is a `<section>` labelled by its heading, so it's exposed as a named region.
- The Storybook a11y addon shows axe results for each story in the Accessibility panel.

## Testing

`npm test` runs Vitest with jsdom and Testing Library. Tests sit beside each component as `*.test.tsx`. The theme API and `ThemeToggle` have no tests.

## Publishing

`npm publish` runs `prepublishOnly`, which runs typecheck, tests, and the library build first. The package is scoped and published with public access.

## Project layout

- `src/components/<Name>/`: component, story, and tests
- `src/index.ts`: public exports
- `src/theme.ts`: theme API (`setTheme`, `getTheme`, `useTheme`)
- `src/theme.css`: design tokens for light and dark (shipped as `@delebrindel/miso/theme.css`)
- `src/index.css`: Tailwind entry for Storybook. Imports Tailwind and the tokens.
- `vite.lib.config.ts`: library build config. Writes ESM to `dist/`.
- `tsconfig.build.json`: emits `.d.ts` files to `dist/` from `src/index.ts`.
- `.storybook/`: Storybook config. `preview.tsx` loads the stylesheet and adds a theme toolbar.
- `.github/workflows/storybook.yml`: runs checks on every push and PR, and deploys Storybook to GitHub Pages from `main`

## License

MIT. See [LICENSE](LICENSE).
