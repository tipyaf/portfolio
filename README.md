# Portfolio v1.2.1

Personal developer portfolio built with [**Next.js 16**](https://nextjs.org/) (App Router) and [**Sanity.io**](https://www.sanity.io/) as headless CMS. Single-page site with sections: Home, About, Projects, Work History, Contact. All content is managed in Sanity and fetched server-side via GROQ queries.

## Tech Stack

- [**Next.js 16**](https://nextjs.org/) — App Router, SSR/SSG, ISR (60s revalidation), Turbopack
- [**React 19**](https://react.dev/) — Latest React with ref-as-prop, stricter hydration
- [**Sanity.io v5**](https://www.sanity.io/) — Headless CMS with embedded Studio at `/studio`
- [**TypeScript**](https://www.typescriptlang.org/) — Static typing across the entire codebase
- [**Tailwind CSS**](https://tailwindcss.com/) — Utility-first styling with custom color palette
- [**Framer Motion 12**](https://www.framer.com/motion/) — Scroll-triggered and interaction animations
- [**next-intl**](https://next-intl-docs.vercel.app/) — Internationalization (English + French)
- [**Vercel**](https://vercel.com/) — Hosting with Analytics and Speed Insights
- [**ESLint 9**](https://eslint.org/) — Flat config with Prettier integration
- [**Prettier**](https://prettier.io/) — Code formatting with Tailwind class sorting
- [**Husky**](https://typicode.github.io/husky/) — Pre-commit hooks (`eslint --fix` on staged files)

## Features

- **Dynamic content** — All data managed in Sanity CMS (bio, jobs, projects, social links)
- **Internationalization** — English (default) and French, with subpath routing (`/` for EN, `/fr` for FR)
- **Localized CMS fields** — Every Sanity field has EN and FR variants (including video IDs, URLs, resume)
- **SEO optimized** — SSR, hreflang tags, locale-aware canonical URLs, structured metadata, Open Graph, Twitter Cards
- **Security headers** — X-Content-Type-Options, X-Frame-Options, Referrer-Policy
- **Responsive design** — Mobile-first, works on all screen sizes
- **Sanity Studio** — Embedded at `/studio` with language tabs (EN/FR) for easy content editing
- **Performance** — High scores on GTmetrix and Google PageSpeed Insights

## Getting Started

### Prerequisites

- Node.js 20.19+
- A Sanity project with the profile schema

### Environment Variables

Create a `.env` file at the root:

```env
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
NEXT_PUBLIC_SANITY_DATASET=your_dataset
NEXT_PUBLIC_SANITY_API_VERSION=your_api_version
NEXT_PUBLIC_BASE_URL=https://your-domain.com
```

### Commands

```bash
npm run dev        # Start dev server (localhost:3000)
npm run build      # Production build
npm run lint       # ESLint check
npm run lint:fix   # ESLint auto-fix
```

## Architecture

### Internationalization (i18n)

The site supports English (default) and French using `next-intl`:

- **URL strategy** — `localePrefix: 'as-needed'`: EN at `/`, FR at `/fr`, `/en` redirects to `/`
- **UI strings** — `messages/en.json` and `messages/fr.json` (~20 keys for navigation, section titles, labels)
- **CMS content** — Sanity fields use `_fr` suffix pattern (e.g. `fullName` + `fullName_fr`)
- **Fallback** — If a French field is empty, the English value is used
- **Studio** — Isolated from i18n routing, always accessible at `/studio`

### Data Flow

1. `app/[locale]/page.tsx` — Async Server Component, calls `getProfile()` from `sanity/sanity.query.ts`
2. `getProfile()` — Single GROQ query fetching the entire profile document (both EN and FR fields)
3. `localize(obj, field, locale)` — Helper picks the right field variant based on locale
4. Data passed as props to Client Components for interactivity

### Project Structure

```
app/
  layout.tsx              # Minimal root layout (returns children)
  [locale]/
    layout.tsx            # Main layout with NextIntlClientProvider, metadata, fonts
    page.tsx              # Homepage (Server Component)
  studio/
    layout.tsx            # Isolated layout for Sanity Studio
    [[...index]]/page.tsx # Sanity Studio
components/
  nav-bar/                # NavBar with LanguageToggle (EN|FR dropdown)
  utils/                  # Reusable UI primitives
i18n/
  routing.ts              # Locale config (en/fr, default: en)
  request.ts              # Server config (loads message JSON)
  navigation.ts           # Locale-aware Link, useRouter, usePathname
messages/
  en.json                 # English UI strings
  fr.json                 # French UI strings
lib/
  localize.ts             # Helper to pick Sanity field by locale
sanity/
  sanity.client.ts        # Sanity client config
  sanity.query.ts         # GROQ queries
types/
  server/                 # Sanity data types (ProfileType, JobType, etc.)
  client/                 # UI-only types (button, link, colors)
```

## Full Project Ownership

Every aspect of this portfolio was designed and developed by me:

- **UX/UI Design** — User experience and interface design
- **Technology Choices** — Next.js, Sanity, Tailwind CSS, next-intl
- **Development** — Frontend, CMS schema, i18n, SEO, animations, deployment

## License

This project is licensed under the **MIT License**. Free to use, modify, and distribute with proper credit.
