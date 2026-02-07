# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Personal developer portfolio built with Next.js 14 (App Router) and Sanity.io as headless CMS. Single-page site with sections: Home, About, Projects, Work History, Contact. All content is managed in Sanity and fetched server-side via GROQ queries.

## Commands

- `npm run dev` — Start dev server (localhost:3000)
- `npm run build` — Production build
- `npm run lint` — ESLint check
- `npm run lint:fix` — ESLint auto-fix

No test suite is configured. Pre-commit hook (Husky + lint-staged) runs `next lint --fix` on staged `.js/.jsx/.ts/.tsx` files.

## Architecture

### Data Flow

1. `app/page.tsx` is an async **Server Component** that calls `getProfile()` from `sanity/sanity.query.ts`
2. `getProfile()` executes a single GROQ query fetching the entire profile document (bio, jobs, projects, social links, etc.)
3. Data is passed as props to section components, which are **Client Components** (`'use client'`) for interactivity
4. Sanity data is cached with ISR (60-second revalidation by default, configurable in `sanity/utils/sanity-fetch.ts`)

### Content Model

Single `profile` document type in Sanity containing all portfolio data as nested fields/arrays. Schema defined in `schemaTypes/profile.ts`. Sanity Studio is accessible at `/studio` route (`app/studio/[[...index]]/page.tsx`).

### Type Organization

- `types/server/` — Types for Sanity data (ProfileType, JobType, ProjectType, etc.)
- `types/client/` — Types for UI-only models (button, link, colors, call-to-action)

### Component Structure

- `components/` — Page sections (HomeSection, AboutSection, ProjectsSection, WorkHistorySection, ContactSection)
- `components/utils/` — Reusable UI primitives (Button, Modal, Popover, AnimText, AnimatedPortrait, LazyYoutube)
- `components/nav-bar/` — NavBar with CSS Modules for scoped styles
- `hooks/` — Custom hooks (useCalculateYearsFromDate, useJobs, useMovingMouse)

### Styling

- **Tailwind CSS** as primary styling approach with custom color palette defined in `tailwind.config.ts` (primary/secondary/tertiary/white)
- **CSS Modules** for NavBar (`NavBar.module.css`)
- Global animations in `styles/animation.css` and section styles in `styles/section.css`
- Font: Raleway (Google Fonts, loaded in `app/layout.tsx`)
- Prettier enforces Tailwind class sorting and import organization

### Path Aliases

`@/*` maps to project root (configured in `tsconfig.json`). Use `@/components/...`, `@/types/...`, `@/sanity/...`, etc.

## Code Style

- Prettier: single quotes, trailing commas, 2-space indent, 100 char line width
- ESLint extends `next/core-web-vitals` + `plugin:prettier/recommended`
- Framer Motion used extensively for scroll-triggered and interaction animations
- `react-icons` for icons (Fi, Fa, Bi, Rx, Si icon sets)

## Post-Task Checklist

After any significant change, always:

1. **Run `/verify-site`** to ensure nothing is broken (routes, build, lint, TypeScript, content)
2. **Update `README.md`** if the change affects: tech stack, features, architecture, project structure, commands, or environment variables

## Environment Variables

Sanity project ID, dataset, and API version are required. The Sanity client is configured in `sanity/sanity.client.ts`. `NEXT_PUBLIC_BASE_URL` is used for SEO/structured data.
