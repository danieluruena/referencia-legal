# Referencia Legal

Institutional website for **Referencia Legal**, a law firm in Medellín specialized in Family Law, Children and Adolescents.

Built with **React 19 + TypeScript + Vite** and deployed on **Cloudflare Pages** (with Pages Functions for the contact backend).

## Tech stack

| Area | Technology |
| --- | --- |
| UI | React 19, React Router 7 |
| Language | TypeScript (strict) |
| Build | Vite 8 |
| Styling | Per-component CSS (`.css` + `.responsive.css`) + `common.css` |
| Backend | Cloudflare Pages Functions (`/functions`) |
| Icons | Font Awesome |
| CAPTCHA | Turnstile (pending activation) |

## Prerequisites

- Node.js **22** or newer
- npm (`npm ci` is used in CI; `package-lock.json` is committed)

## Installation and development

```bash
npm ci          # installs exact dependencies from the lockfile
npm run dev     # dev server at http://localhost:3000
```

## Available scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Dev server with HMR (port 3000) |
| `npm run build` | Typecheck (`tsc -b`) + production build to `dist/` |
| `npm run lint` | ESLint across the whole project |
| `npm run preview` | Preview the production build locally |

> Type checking runs as part of the build (`tsc -b`). Before opening a PR, run `npm run lint` and `npm run build`.

## Project structure

```
├── functions/              # Cloudflare Pages Functions (backend)
│   └── api/contact.ts      # POST /api/contact endpoint (email sending)
├── public/                 # Static files copied as-is to dist/
│   ├── robots.txt
│   ├── sitemap.xml
│   ├── favicon.webp
│   └── og-image.png        # Social sharing image
├── src/
│   ├── assets/             # Images and fonts (logo, services, team)
│   ├── components/
│   │   ├── common/         # Shared components (videoPlayer, notFound, scrollToTop)
│   │   ├── header/         # Navigation and mobile menu
│   │   ├── footer/
│   │   ├── home/           # Home page sections (hero, services, etc.)
│   │   ├── team/
│   │   ├── aboutUs/
│   │   └── contact/
│   ├── hooks/              # Custom hooks (see Hooks section)
│   ├── utils/constants.ts  # Shared constants (WhatsApp URL, etc.)
│   ├── common.css          # Utility classes (.max-width, .main-button)
│   └── App.tsx             # Routes and main layout
└── .github/workflows/      # CI: lint + build on PRs
```

## Routes

| Route | Page |
| --- | --- |
| `/` | Home (Hero, Services, Featured results, Testimonials...) |
| `/equipo` | Our team |
| `/nosotros` | Mission and vision |
| `/contacto` | Contact form |
| `*` | 404 page |

Pages load with `lazy()` to split the bundle. The `#servicios` hash on the home route handles smooth scrolling to the section.

## Deployment (Cloudflare Pages)

The CI pipeline does not deploy automatically; the build runs on Cloudflare Pages or GitHub Actions.

**Cloudflare Pages settings:**

| Field | Value |
| --- | --- |
| Build command | `npm run build` |
| Output directory | `dist` |
| Node.js | 22 |

Everything in `public/` is copied to `dist/` and served from the root (`/robots.txt`, `/sitemap.xml`, `/favicon.webp`, `/og-image.png`).

### Environment variables (Pages Functions)

`functions/api/contact.ts` uses these environment variables (configured under *Settings → Environment variables* of the Cloudflare project):

- `VITE_RESEND_API_KEY` — Resend API key for sending emails.
- `VITE_TURNSTILE_SECRET_KEY` — Cloudflare Turnstile secret.

> ⚠️ These are server-side secrets (only used in the Functions, not on the client). Never commit them.

## CI (GitHub Actions)

`.github/workflows/ps-checks.yml` runs on every pull request to `main` and `develop`:

1. `npm ci`
2. `npm run lint`
3. `npm run build`