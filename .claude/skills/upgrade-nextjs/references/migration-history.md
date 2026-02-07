# Migration History

## Next.js 14 → 16 (February 2026)

### Dependency Changes

| Package | Before | After |
|---------|--------|-------|
| `next` | 14.2.5 | ^16.1.6 |
| `react` | ^18 | ^19.2.4 |
| `react-dom` | ^18 | ^19.2.4 |
| `@types/react` | ^18 | ^19.2.13 |
| `@types/react-dom` | ^18 | ^19.2.3 |
| `@types/node` | ^20 | ^25.2.1 |
| `sanity` | ^3.52.4 | ^5.8.1 |
| `next-sanity` | ^9.4.3 | ^12.1.0 |
| `@sanity/image-url` | ^1.0.2 | ^2.0.3 |
| `@sanity/vision` | ^3.52.4 | ^5.8.1 |
| `@portabletext/react` | ^3.1.0 | ^6.0.2 |
| `framer-motion` | ^11.3.22 | ^12.33.0 |
| `eslint` | ^8.57.0 | ^9.39.2 |
| `eslint-config-next` | 14.2.5 | ^16.1.6 |
| `prettier-plugin-tailwindcss` | ^0.6.6 | ^0.7.2 |
| `@vercel/analytics` | ^1.3.1 | ^1.6.1 |
| `@vercel/speed-insights` | ^1.0.12 | ^1.3.1 |
| `usehooks-ts` | ^3.1.0 | ^3.1.1 |
| `next-intl` | ^4.8.2 | ^4.8.2 (unchanged) |

### Files Modified

#### `next.config.mjs`
- Removed `swcMinify: true` (now default)
- Removed empty `webpack(config) { return config; }` block
- Added `images.qualities: [75, 100]`
- Added security headers (`X-Content-Type-Options`, `X-Frame-Options`, `Referrer-Policy`)

#### `middleware.ts` → `proxy.ts`
- File renamed for Next.js 16 compatibility
- Content unchanged (next-intl middleware + Studio exclusion matcher)
- Build confirms recognition with `ƒ Proxy (Middleware)` output

#### `.eslintrc.json` → `eslint.config.mjs`
- Deleted `.eslintrc.json` (legacy format)
- Created `eslint.config.mjs` with ESLint 9 flat config format
- Uses `import nextConfig from 'eslint-config-next'` + spread
- Uses `import prettierPlugin from 'eslint-plugin-prettier/recommended'`
- Added `ignores: ['.next/', 'node_modules/']`

#### `.lintstagedrc.js`
- Changed from `next lint --fix --file <files>` to `eslint --fix <files>`

#### `package.json`
- Updated `lint` script: `"next lint"` → `"eslint ."`
- Updated `lint:fix` script: `"next lint --fix"` → `"eslint . --fix"`
- All dependency versions bumped (see table above)

#### `tsconfig.json`
- Changed `"jsx": "preserve"` → `"jsx": "react-jsx"`
- Added `"target": "ES2017"`
- Added `.next/dev/types/**/*.ts` to `include` array

#### `app/[locale]/layout.tsx`
- `params` changed from sync object to `Promise<{ locale: string }>`
- Added `await params` in `generateMetadata` and layout function
- Enhanced metadata: added `og:type`, `og:locale`, `og:alternateLocale`, `og:url`, `og:siteName`, `twitter` card, locale-aware canonical URLs

#### `utils/url-for.ts`
- `import imageUrlBuilder from '@sanity/image-url'` → `import { createImageUrlBuilder } from '@sanity/image-url'`
- `import { SanityImageSource } from '@sanity/image-url/lib/types/types'` → `import { type SanityImageSource } from '@sanity/image-url'`
- `imageUrlBuilder(client)` → `createImageUrlBuilder(client)`

#### `sanity/sanity.client.ts`
- `apiVersion: new Date().toISOString().slice(0, 10)` → `apiVersion: '2025-01-01'` (fixed date for cache consistency)

#### `components/utils/Button.tsx`
- `motion(Link)` → `motion.create(Link)` (framer-motion 12 API change)
- Moved `const MotionLink = motion.create(Link)` to module scope (was inside component render)

#### `components/utils/AnimatedPortrait.tsx`
- Removed `AnimationProps` import (type removed in framer-motion 12)
- Removed `: AnimationProps` type annotations on `motionContainer` and `motionImageContainer` objects

#### `components/ProjectCard.tsx`
- `useRef<HTMLImageElement>(null)` → `useRef<HTMLDivElement>(null)` (ref was attached to a `<div>`, not `<img>`)

#### `components/nav-bar/LanguageToggle.tsx`
- Removed unused locale labels (es, de, it, pt, ja, zh) — only en/fr are in routing config

#### `components/utils/lazy-youtube/LazyYoutube.tsx`
- Replaced `useEffect` + `document.querySelector` DOM approach with React `onClick` handler
- Added `'use client'` directive
- Added proper `aria-label` on play button

#### `sanity/actions/translateAction.tsx` + `sanity/lib/portable-text-translator.ts`
- Removed stale `// eslint-disable-next-line @typescript-eslint/no-explicit-any` comments (no longer needed with new ESLint config)
- Import reordering by prettier

#### `app/sitemap.ts` (new file)
- Created root sitemap with EN/FR alternates using `NEXT_PUBLIC_BASE_URL`

#### `app/studio/sitemap.ts`
- Fixed env var: `NEXT_PUBLIC_URL` → `NEXT_PUBLIC_BASE_URL`
- Fixed URL path to `/studio`

### Issues Encountered

1. **Peer dependency conflicts**: Upgrading Sanity before React 19 caused peer dep errors. Solution: always upgrade React first.
2. **`AnimationProps` type error**: framer-motion 12 removed this type. Solution: remove the type annotation, use plain objects.
3. **`motion()` deprecation**: framer-motion 12 requires `motion.create()`. Additionally, calling it inside a component body caused re-creation on every render. Solution: move to module scope.
4. **`useRef` type mismatch**: React 19's stricter `RefObject<T>` exposed a pre-existing bug where `HTMLImageElement` was used but the ref was on a `<div>`. TypeScript caught it after the upgrade.
5. **ESLint flat config**: ESLint 9 requires a completely different config format. The `extends` array pattern doesn't work — must use `import` + spread.
6. **`next lint` removed in Next.js 16**: Had to update package.json scripts AND `.lintstagedrc.js` to use `eslint` directly.
7. **Stale `[lang]` directory**: An empty `app/[lang]/` directory from a previous iteration was still present and could confuse routing. Removed it.