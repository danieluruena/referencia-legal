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
| CAPTCHA | Cloudflare Turnstile |

## Prerequisites

- Node.js **22** or newer
- npm (`npm ci` is used in CI; `package-lock.json` is committed)

## Installation and development

```bash
npm ci          # installs exact dependencies from the lockfile
npm run dev     # dev server at http://localhost:3000
```

To run the complete site and the Cloudflare Pages Function locally, including `POST /api/contact`:

```bash
cp .env.example .env
# Edit .env and set a valid Resend API key if you want to send a real email.
npm run dev:pages
```

Open `http://localhost:8788/contacto`. `npm run dev:pages` builds the client from `.env` and then starts Wrangler with the Pages Function in `functions/`, also loading the same file through `--env-file`. The local Turnstile test keys in `.env.example` are intended for local testing; use a real `VITE_RESEND_API_KEY` to complete delivery through Resend. The local `.env` file is ignored and must not be committed.

If you want Vite HMR while using the local backend, leave `npm run dev:pages` running in one terminal and start `npm run dev` in another. Open `http://localhost:3000/contacto`; Vite will proxy `/api/contact` to Wrangler at `http://localhost:8788`.

## Available scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Dev server with HMR (port 3000) |
| `npm run dev:pages` | Production build served by Wrangler with Pages Functions (port 8788) |
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

### Environment variables (Cloudflare Pages)

The contact form is protected by Cloudflare Turnstile and sends messages through Resend. The following variables are configured under *Settings → Environment variables* in the Cloudflare Pages project:

- `VITE_ENV` — Current deployment environment (`prod`).
- `VITE_TURNSTILE_SITE_KEY` — Turnstile public site key. It is embedded in the client bundle and must be available during the Pages build.
- `VITE_RESEND_API_KEY` — Resend API key used by the Pages Function to send emails. Keep it encrypted and available to the Function at runtime.
- `VITE_TURNSTILE_SECRET_KEY` — Cloudflare Turnstile secret used by the Pages Function to validate tokens. Keep it encrypted and available to the Function at runtime.

The three variables are currently configured in Cloudflare Pages. `VITE_TURNSTILE_SITE_KEY` is public; the Resend and Turnstile secret keys must remain encrypted and must never be committed to the repository.

The backend endpoint is `POST /api/contact`, implemented in `functions/api/contact.ts`. It validates the form data, verifies the Turnstile token, and then sends the message through the Resend API. Configure the variables for every Cloudflare Pages environment that receives traffic, including Production and Preview when applicable.

#### Testing Cloudflare Pages previews

Turnstile validates the hostname where its public site key is used. To test a Pages preview:

1. In the Turnstile dashboard, add the preview hostname to the widget's allowed hostnames. Pages preview URLs commonly use `<branch>.<project>.pages.dev` or `<deployment>.<project>.pages.dev`; add the exact hostname shown in the browser. A wildcard such as `*.<project>.pages.dev` can be used when supported by the widget configuration.
2. In Cloudflare Pages, configure `VITE_TURNSTILE_SITE_KEY`, `VITE_TURNSTILE_SECRET_KEY`, and `VITE_RESEND_API_KEY` for the **Preview** environment, not only **Production**.
3. Prefer a separate Turnstile widget and key pair for Preview. If the Production pair is reused, its allowed hostnames must include the preview hostname.
4. Trigger a new preview deployment after changing variables. The site key is embedded during the Vite build, while the secret is read by the Pages Function at runtime.

The endpoint returns `400` when the Turnstile token is rejected. A `500` response usually indicates missing Preview runtime variables or an exception in the Pages Function, so check the deployment's Function logs as well as the browser console.

## CI (GitHub Actions)

`.github/workflows/ps-checks.yml` runs on every pull request to `main` and `develop`:

1. `npm ci`
2. `npm run lint`
3. `npm run build`