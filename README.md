# Royal Puffy Purrs

Marketing website for **Royal Puffy Purrs** — a luxury cat hotel and curated cats-for-sale cattery in Basildon, Essex.

## Features

- **Cat hotel** — showcase suites, amenities, and booking CTA
- **Cats for sale** — gallery of available companions with status badges
- **Contact form** — validated enquiries (hotel, adoption, general)
- **Accessible UI** — semantic HTML, keyboard nav, reduced-motion support
- **Dark mode** — light/dark theme toggle
- **SEO** — metadata, OpenGraph, sitemap, robots.txt

## Tech stack

- Next.js 16 (App Router)
- TypeScript (strict)
- Tailwind CSS v4
- shadcn-style UI primitives
- react-hook-form + zod
- Vitest + Playwright
- ESLint + Prettier + Husky

## Getting started

```bash
npm install
cp .env.example .env.local
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Scripts

| Command             | Description             |
| ------------------- | ----------------------- |
| `npm run dev`       | Start dev server        |
| `npm run build`     | Production build        |
| `npm run start`     | Start production server |
| `npm run lint`      | Run ESLint              |
| `npm run typecheck` | TypeScript check        |
| `npm run test`      | Unit tests (Vitest)     |
| `npm run test:e2e`  | E2E tests (Playwright)  |
| `npm run format`    | Format with Prettier    |

## Project structure

```
app/                  # Routes, layouts, metadata
components/
  layout/             # Header, Footer, Container
  sections/           # Page sections (Hero, Services, etc.)
  ui/                 # Primitives (Button, Card, Input)
content/              # Editable copy and data
docs/                 # Design tokens, Figma mapping
lib/                  # Utils, env validation
tests/                # Unit tests
e2e/                  # Playwright tests
```

## Admin sign-in

The seller area lives at `/admin/login`. Credentials come from environment variables, not from the codebase:

| Variable         | Purpose                                                       |
| ---------------- | ------------------------------------------------------------- |
| `ADMIN_EMAIL`    | Sign-in email (defaults to `cattery@royalpuffypurrs.com`)     |
| `ADMIN_PASSWORD` | Sign-in password — no default, sign-in is disabled without it |
| `AUTH_SECRET`    | Signs the session cookie. Minimum 16 characters in production |

Generate a session secret with `openssl rand -base64 32`.

### Troubleshooting sign-in

| Message                                      | Cause                                                                               | Fix                                                                               |
| -------------------------------------------- | ----------------------------------------------------------------------------------- | --------------------------------------------------------------------------------- |
| Invalid email or password                    | Password does not match `ADMIN_PASSWORD`, or the email does not match `ADMIN_EMAIL` | Re-set the variable, without surrounding quotes or trailing spaces, then redeploy |
| Sign-in is not configured on the server      | `ADMIN_PASSWORD` or `AUTH_SECRET` is missing or too short                           | Set both variables and redeploy. The server log names the offending variable      |
| Sign-in succeeds but redirects back to login | Session cookie is `secure` in production and is dropped over plain HTTP             | Access the site over HTTPS                                                        |

Environment variable changes only take effect after a redeploy.

## Figma integration

Design file: [Royal Puffy Purrs - Homepage](https://www.figma.com/design/SBIzNeUABkOiXfr5Pd7U4n/Royal-Puffy-Purrs-Homepage)

- Homepage captured from local dev server into Figma
- `Button` and `Card` components on the **Design System** page
- Code Connect templates: `components/ui/Button.figma.ts`, `components/ui/Card.figma.ts`

See `docs/figma-component-map.md` for node IDs and mappings.

**Note:** Full Code Connect publishing requires a Figma Dev/Full seat (Org or Enterprise plan).

## Deploy

Optimized for [Vercel](https://vercel.com):

1. Push to GitHub
2. Import repo in Vercel
3. Set `NEXT_PUBLIC_SITE_URL` to your production URL
4. Set `GOOGLE_SITE_VERIFICATION` to your Search Console verification code (optional)

After deploy, submit `https://your-domain.com/sitemap.xml` in [Google Search Console](https://search.google.com/search-console) and create a [Google Business Profile](https://business.google.com) for local search visibility.

## License

Private — Royal Puffy Purrs
