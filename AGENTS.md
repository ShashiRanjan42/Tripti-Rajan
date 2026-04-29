# AGENTS.md — Wedding Invitation Website

## Project Overview

A single-page mobile-first wedding invitation website for the wedding of **Tripti Ranjan & Rajan Kumar** on 7th May 2026. Built with TanStack Start and deployed on Netlify. All invitation content, animations, and UI are self-contained in `src/routes/index.tsx`.

## Directory Structure

```
src/
  routes/
    __root.tsx     — Root layout: Google Fonts links, SEO meta, html shell
    index.tsx      — Complete wedding invitation page (all content + components)
  styles.css       — Global CSS: custom properties, animations, keyframes, layout

public/
  wedding-music.mp3  — (user must add) background music file
  family-photo.jpg   — (user must add) family photograph
  MUSIC-SETUP.txt    — Instructions for adding music and photos
```

## Key Concepts

### File-Based Routing (TanStack Router)

Routes are defined by files in `src/routes/`:
- `__root.tsx` - Root layout wrapping all pages
- `index.tsx` - Route for `/`

### Architecture Decisions

**Everything in One File**: All React components live in `src/routes/index.tsx`. This is intentional — the site is a single page and co-locating components avoids unnecessary splits.

**CSS Custom Properties for Theming**: Dark/light mode uses `[data-theme]` attribute on `<html>` with CSS variables in `styles.css`. Toggle sets `localStorage` and updates the attribute synchronously.

**Audio Autoplay**: Browsers block autoplay. The splash screen pattern (tap to enter → play music) is the standard workaround.

## Key Components (all in index.tsx)

| Component             | Purpose                                        |
|-----------------------|------------------------------------------------|
| `WeddingInvitation`   | Main page orchestrator                         |
| `SplashScreen`        | Full-screen tap-to-enter overlay with music    |
| `PetalRain`           | Fixed-position falling petal animation         |
| `Mandala`             | Rotating SVG mandala decoration                |
| `WeddingCeremonyAnim` | SVG animation: Jaimala + Fera + Sacred Fire    |
| `CountdownTimer`      | Live countdown to May 7, 2026 9PM IST          |
| `EventCard`           | Event row with Google Calendar link            |
| `PersonPhoto`         | Bride/groom photo placeholder (initial-letter) |
| `OrnamentDivider`     | Gold star divider between sections             |
| `SectionTitle`        | Section heading with ornament divider          |

## Configuration Files

| File | Purpose |
|------|---------|
| `vite.config.ts` | Vite plugins: TanStack Start, Netlify, Tailwind |
| `tsconfig.json` | TypeScript config with `@/*` alias for `src/*` |
| `netlify.toml` | Build command, publish directory, dev settings |
| `styles.css` | Tailwind + CSS variables + all animation keyframes |

## Development Commands

```bash
npm run dev      # Start dev server
npm run build    # Production build
```

## Conventions

- **Fonts**: `font-script` = Great Vibes, `font-display` = Cinzel, `font-body` = Lora
- **Theming**: CSS variables via `[data-theme]` attribute on `<html>`
- **Animations**: All keyframes in `styles.css`; CSS classes applied in JSX
- **TypeScript**: Strict mode, `@/` import alias

## Adding Photos

Replace `PersonPhoto` initial-letter placeholders with `<img>` tags pointing to files in `public/`. The family photo section has a placeholder div ready to swap for `<img src="/family-photo.jpg" />`.

## Google Calendar Links

Generated via `https://calendar.google.com/calendar/r/eventedit` with URL-encoded params, defined in the `EVENTS` constant array at the top of `index.tsx`.

## Project Overview

An interactive resume/portfolio application with an AI-powered assistant. Built with TanStack Start and deployed on Netlify.

### Tech Stack

| Layer | Technology |
|-------|------------|
| Framework | TanStack Start |
| Frontend | React 19, TanStack Router v1 |
| Build | Vite 7 |
| Styling | Tailwind CSS 4 |
| UI Components | Radix UI + custom components |
| Content | Content Collections (type-safe markdown) |
| AI | TanStack AI with multi-provider support |
| Language | TypeScript 5.7 (strict mode) |
| Deployment | Netlify |

## Directory Structure

```
├── public
│   ├── favicon.ico
│   ├── logo.png
│   ├── tanstack-circle-logo.png
│   └── tanstack-word-logo-white.svg  # TanStack wordmark logo (white) used in header/nav.
├── src
│   ├── components
│   │   ├── Header.tsx  # Header.
│   │   ├── HeaderNav.tsx  # Navigation sidebar template: mobile menu, Home link, add-on routes; EJS-driven for dynamic route generation.
│   │   ├── ProductAIAssistant.tsx  # AI marketing assistant.
│   │   └── ProductRecommendation.tsx  # Product recommendation card.
│   ├── data
│   │   └── products.ts  # Product catalog data template.
│   ├── lib
│   │   ├── product-ai-hook.ts  # useProductChat hook.
│   │   └── product-tools.ts  # AI tools: getProducts, recommendProduct.
│   ├── routes
│   │   ├── products
│   │   │   └── $productId.tsx  # Product detail page with recommendation.
│   │   ├── __root.tsx  # Root layout: Header, styles.
│   │   ├── api.product-chat.ts  # POST handler for product AI chat.
│   │   └── index.tsx  # Marketing home with ProductAIAssistant.
│   ├── store
│   │   └── product-assistant.ts  # Zustand store for assistant state.
│   ├── router.tsx  # TanStack Router setup: creates router from generated routeTree with scroll restoration.
│   └── styles.css  # Global styles.
├── .gitignore  # Template for .gitignore: node_modules, dist, .env, .netlify, .tanstack, etc.
├── AGENTS.md  # This document provides an overview of the project structure for developers and AI agents working on this codebase.
├── netlify.toml  # Netlify deployment config: build command (vite build), publish directory (dist/client), and dev server settings (port 8888, target 3000).
├── package.json  # Project manifest with TanStack Start, React 19, Vite 7, Tailwind CSS 4, and Netlify plugin dependencies; defines dev and build scripts.
├── pnpm-lock.yaml
├── tsconfig.json  # TypeScript config: ES2022 target, strict mode, @/* path alias for src/*, bundler module resolution.
└── vite.config.ts  # Vite config template: TanStack Start, React, Tailwind, Netlify plugin, and optional add-on integrations; processed by EJS.
```

## Key Concepts

### File-Based Routing (TanStack Router)

Routes are defined by files in `src/routes/`:

- `__root.tsx` - Root layout wrapping all pages
- `index.tsx` - Route for `/`
- `api.*.ts` - Server API endpoints (e.g., `api.resume-chat.ts` → `/api/resume-chat`)

### Component Architecture

**UI Primitives** (`src/components/ui/`):
- Radix UI-based, Tailwind-styled
- Card, Badge, Checkbox, Separator, HoverCard

**Feature Components** (`src/components/`):
- Header, HeaderNav, ResumeAssistant

## Configuration Files

| File | Purpose |
|------|---------|
| `vite.config.ts` | Vite plugins: TanStack Start, Netlify, Tailwind, Content Collections |
| `tsconfig.json` | TypeScript config with `@/*` path alias for `src/*` |
| `netlify.toml` | Build command, output directory, dev server settings |
| `content-collections.ts` | Zod schemas for jobs and education frontmatter |
| `styles.css` | Tailwind imports + CSS custom properties (oklch colors) |

## Development Commands

```bash
npm run dev      # Start dev server
npm run build    # Production build
npm run preview  # Preview production build
```

## Conventions

### Naming
- Components: PascalCase
- Utilities/hooks: camelCase
- Routes: kebab-case files

### Styling
- Tailwind CSS utility classes
- `cn()` helper for conditional class merging
- CSS variables for theme tokens in `styles.css`

### TypeScript
- Strict mode enabled
- Import paths use `@/` alias
- Zod for runtime validation
- Type-only imports with `type` keyword

### State Management
- React hooks for local state
- Zustand if you need it for global state
### Marketing Site with AI Assistant

Marketing site with TanStack AI chat assistant. No Stripe checkout.

**AI tools available:**
- `getProducts` - Get all products from catalog
- `recommendProduct` - Display product recommendation card (MUST use for recommendations)

**Components:** ProductAIAssistant, ProductRecommendation

**Dependencies:** @tanstack/ai, streamdown

## Environment Variables

For AI: ANTHROPIC_API_KEY, OPENAI_API_KEY, GEMINI_API_KEY, or OLLAMA_BASE_URL (same as ai add-on).

## Application Name

This starter uses "Application Name" as a placeholder throughout the UI and metadata. Replace it with the user's desired application name in the following locations:

### UI Components
- `src/components/Header.tsx` — app name displayed in the header
- `src/components/HeaderNav.tsx` — app name in the mobile navigation header

### SEO Metadata
- `src/routes/__root.tsx` — the `title` field in the `head()` configuration

Search for all occurrences of "Application Name" in the `src/` directory and replace with the user's application name.
