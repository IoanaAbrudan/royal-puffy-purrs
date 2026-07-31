# Design Tokens — Royal Puffy Purrs

Design system tokens for the marketing site. Align with Figma when a design file is connected.

## Colors

| Token | Light | Dark | Usage |
|-------|-------|------|-------|
| `--background` | `#fff9f5` | `#1a1225` | Page background (warm cream / deep plum) |
| `--foreground` | `#2a1f35` | `#f8f0f5` | Primary text |
| `--primary` | `#6b4c8a` | `#e8a0b4` | Brand purple / blush in dark mode |
| `--accent` | `#e8a0b4` | `#e8c547` | CTAs, hearts, paw highlights |
| `--blush` | `#f8d4dc` | `#3d2a45` | Hero gradients, soft accents |
| `--secondary` | `#fce8f0` | `#2d1f3d` | Section backgrounds |
| `--muted` | `#f5eef8` | `#2a1f38` | Subtle surfaces |
| `--muted-foreground` | `#7a6b8a` | `#c4b0cc` | Secondary text |
| `--border` | `#eddfe8` | `#3d2f4d` | Borders and dividers |

## Typography

| Role | Font | CSS variable |
|------|------|--------------|
| Display / headings | Playfair Display | `--font-playfair` |
| Body / UI | Nunito | `--font-nunito` |

### Scale (Tailwind)

- Hero H1: `text-4xl` → `text-6xl`
- Section H2: `text-3xl` → `text-4xl`
- Card titles: `text-xl` / `text-2xl`
- Body: `text-base` / `text-lg`
- Small / labels: `text-sm`

## Spacing & layout

- Container max width: `max-w-6xl` (72rem)
- Section padding: `py-16 sm:py-20`
- Card padding: `p-6`
- Grid gaps: `gap-6` / `gap-12`

## Radius & shadows

- Base radius: `--radius: 1.125rem`
- Cards: `rounded-2xl` / `rounded-3xl`
- Buttons / inputs: `rounded-2xl`
- Pills / badges: `rounded-full`
- Shadows: `shadow-soft`, `shadow-soft-lg` (blush + purple tint)

## Theming

Light mode is default. Dark mode via `next-themes` (`class` strategy). Toggle in header.

## Updating from Figma

1. Connect Figma MCP and export color/text styles.
2. Map Figma styles → CSS variables in `app/globals.css`.
3. Update `docs/figma-component-map.md` with component mappings.
4. Run `npm run build` to verify contrast and layout.
