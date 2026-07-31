# Figma Component Map — Royal Puffy Purrs

**Figma file:** [Royal Puffy Purrs - Homepage](https://www.figma.com/design/SBIzNeUABkOiXfr5Pd7U4n/Royal-Puffy-Purrs-Homepage)

## Pages & frames

| Route | Figma frame | Node ID | Code |
|-------|-------------|---------|------|
| `/` Home (captured) | Page 1 capture | `2:2` | `app/page.tsx` |
| Design System | Design System page | — | `app/globals.css` tokens |

## Component mapping

| Figma component | Node ID | Code component | Code Connect file |
|-----------------|---------|----------------|-------------------|
| Button (variant set) | `1:13` | `Button` | `components/ui/Button.figma.ts` |
| Card | `1:14` | `Card` (+ Header, Title, Description) | `components/ui/Card.figma.ts` |

### Button variants (Figma → code)

| Figma `variant` | Code `variant` prop |
|-----------------|---------------------|
| default | `default` |
| secondary | `secondary` |
| outline | `outline` |
| ghost | `ghost` |
| accent | `accent` |

### Card layers (Figma → code)

| Figma text layer | Code component |
|------------------|----------------|
| Card title | `CardTitle` |
| Card description text | `CardDescription` |

## Section mapping (homepage capture)

| Section | React component |
|---------|-----------------|
| Header / nav | `components/layout/header.tsx` |
| Hero | `components/sections/hero.tsx` |
| Services | `components/sections/services.tsx` |
| Cats gallery | `components/sections/featured-cats.tsx` |
| Testimonials | `components/sections/testimonials.tsx` |
| CTA | `components/sections/cta.tsx` |
| Footer | `components/layout/footer.tsx` |

## Code Connect status

Template files are in place. **Live Code Connect sync** requires a Figma **Dev or Full seat** on an **Organization or Enterprise** plan. Current account: View seat on Starter.

When upgraded:
1. Publish `Button` and `Card` to your team library in Figma
2. Run `npx figma connect publish` from this repo
3. Mappings will appear in Figma Dev Mode
