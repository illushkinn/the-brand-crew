# Component: Button System

## Metadata
- **Category**: atom
- **Status**: stable

## Overview
Three button variants (primary, secondary, CTA) at three sizes (sm, default, lg). Used across hero, pricing, and CTA sections.

**When to use**: Any call-to-action, navigation, or form action.
**When not to use**: Links that aren't actions (use `<a>` with text only).

## Anatomy
```
┌──────────────────┐  ┌──────────────────┐  ┌──────────────────────────────────┐
│  Más info        │  │  Quiero mi pg    │  │  [btn-empecemos pill CTA]        │
│  btn-secondary   │  │  btn-primary     │  │                                  │
└──────────────────┘  └──────────────────┘  └──────────────────────────────────┘
```

## Variants

### `.btn-primary`
- `background: var(--color-brand)`
- `border: 2px solid var(--color-brand)`
- `color: var(--color-inverse)`

### `.btn-secondary`
- `background: transparent`
- `border: 1.5px solid var(--color-verde)`
- `color: var(--color-verde)`
- Hover: fills with verde, text becomes `--color-inverse`

### `.btn-empecemos`
- Identical to primary but `border-radius: var(--radius-full)`
- `box-shadow: var(--shadow-button)`
- Hover: `box-shadow: var(--shadow-button-hover)`

## Sizes

| Size | Class | Font Size | Padding |
|------|-------|-----------|---------|
| Small | `.btn-sm` | `1rem` | `0.6rem 1.2rem` |
| Default | (none) | `1.4rem` | `0.9rem 2rem` |
| Large | `.btn-lg` | `clamp(1.4rem, 3vw, 1.8rem)` | `1.1rem 2.8rem` |

## Tokens Used
- `--color-brand`, `--color-brand-hover` — primary bg
- `--color-verde`, `--color-verde-hover` — secondary border/bg
- `--color-inverse` — text color
- `--font-body` — font family (Lato)
- `--ds-weight-extrabold` — font weight (800 — Lato CSS fallback, renders as 900)
- `--radius-md` — default buttons
- `--radius-full` — pill CTA
- `--shadow-button`, `--shadow-button-hover` — CTA glow
- `--duration-base` — transition

## States

| State | Primary | Secondary | CTA |
|-------|---------|-----------|-----|
| Default | Brand bg | Transparent + green border | Brand bg + pill + glow |
| Hover | Brand-hover bg + scale(1.02) | Green bg + inverse text + scale(1.02) | Brand-hover bg + stronger glow + scale(1.02) |
| Focus-visible | outline brand | outline brand | outline brand |
| Disabled | (not implemented) | (not implemented) | (not implemented) |

## Code Example
```html
<!-- Primary -->
<a href="#" class="btn btn-primary btn-lg">Quiero mi página</a>

<!-- Secondary -->
<a href="#servicios" class="btn btn-secondary btn-lg">Más info</a>

<!-- Pill CTA -->
<a href="#" class="btn btn-empecemos btn-lg" style="width:100%;justify-content:center;">
  Quiero mi página
</a>
```

## Rules
1. Buttons ALWAYS use `--font-body` (Lato) + weight 800.
2. Icons inside buttons use `1.3em` width/height.
3. Full-width buttons use inline `style="width:100%;justify-content:center;"` (not a class).
4. Never use buttons for navigation links that aren't CTAs — use text links in nav.

## Cross-References
- Hero button → [Hero](hero.md)
- Pricing CTA → [Pricing Card](pricing-card.md)
- Footer CTA → [Footer](footer.md)
