# Foundation: Typography

## Overview

Four font families serve distinct roles: display (headings), sans (body), mono (code/technical), and accent (decorative/brand). Sizes use `clamp()` for fluid responsive scaling.

## Font Families

| Token | Font Stack | Usage |
|-------|-----------|-------|
| `--ds-font-sans` / `--font-body` | `'Lato', sans-serif` | Body text, nav, buttons, pricing lines, footer brand |
| `--ds-font-display` / `--font-display` | `'Prata', serif` | All h1–h4 headings, step numbers, large decorative numbers |
| `--ds-font-mono` / `--font-mono` | `'JetBrains Mono', monospace` | Section labels, badges, CUIT, code examples |
| `--ds-font-accent` / `--font-brand` | `'Grand Hotel', cursive` | Brand name in navbar (signature/firma digital), pull quotes, highlights, decorative emphasis |
| `--ds-font-accent` / `--font-accent` | `'Grand Hotel', cursive` | Pull quotes (`.solucion-quote`), highlight text, brand moments |

### Import Sources

- **Prata**: Google Fonts (400 only)
- **Lato**: Google Fonts (300, 400, 700, 900)
- **Grand Hotel**: Google Fonts (400 only)
- **JetBrains Mono**: Google Fonts (400, 500)

All loaded via a single Google Fonts link:
```html
<link href="https://fonts.googleapis.com/css2?family=Prata&family=Lato:wght@300;400;700;900&family=Grand+Hotel&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet">
```

### Weight Availability by Font

| Font | Available Weights | Notes |
|------|-------------------|-------|
| Prata | 400 only | Serif provides visual weight via shape, not weight variation |
| Lato | 300, 400, 700, 900 | Primary workhorse — full range |
| Grand Hotel | 400 only | Script/cursive — single weight only |
| JetBrains Mono | 400, 500 | Code font — kept clean |

## Font Weights

| Token | Value | Usage |
|-------|-------|-------|
| `--ds-weight-light` | 300 | Lato only (sparing use) |
| `--ds-weight-normal` | 400 | Body text (Lato), headings (Prata), accent (Grand Hotel), mono (JetBrains) |
| `--ds-weight-medium` | 500 | JetBrains Mono (code) |
| `--ds-weight-semibold` | 600 | *(reserved — not used with current font stack)* |
| `--ds-weight-bold` | 700 | Lato — pricing headers, FAQ questions, buttons |
| `--ds-weight-extrabold` | 800 | Buttons (.btn), *(reserved — Lato doesn't ship 800)* |
| `--ds-weight-black` | 900 | Lato — hero meta, mobile menu links, strong emphasis |

> **Important**: Prata and Grand Hotel only ship in weight 400. Headings use Prata's serif shape for visual weight, NOT font-weight values. Do not apply weight >400 to Prata or Grand Hotel.

## Fluid Sizes

All heading and body sizes use `clamp()`:

| Element | Size | Line Height |
|---------|------|-------------|
| h1 | `clamp(3.5rem, 12vw, 7rem)` | 0.92 |
| h2 | `clamp(2.8rem, 8vw, 5rem)` | 0.92 |
| h3 | `clamp(2rem, 5vw, 3.2rem)` | 0.92 |
| h4 | `clamp(1.4rem, 3vw, 2rem)` | 0.92 |
| Body Large | `clamp(1.15rem, 2.5vw, 1.4rem)` | 1.6 |
| Body Mid | `clamp(1rem, 2vw, 1.15rem)` | 1.6 |
| Body Small | `0.9rem` | 1.5 |
| Hero Title | `clamp(3.8rem, 9vw, 6rem)` | 1.1 |
| Section Sub | `clamp(1.1rem, 2.5vw, 1.35rem)` | 1.6 |
| Button (default) | `1.4rem` | — |
| Button (lg) | `clamp(1.4rem, 3vw, 1.8rem)` | — |
| Button (sm) | `1rem` | — |
| Section Label | `0.8rem` | — |

## Heading Styles

All headings (`h1`–`h4`) and `.h-darker` share:
```css
font-family: var(--font-display);
font-weight: 400;
line-height: 0.92;
letter-spacing: -0.03em;
color: var(--color-headline);
```

> **Why weight 400?** Prata only ships in weight 400. Its serif structure provides natural visual weight. Do not override with heavier weights.

## Utility Classes

| Class | Font Family | Size | Color |
|-------|-------------|------|-------|
| `.body-large` | `var(--font-body)` | clamp | `inherit` |
| `.body-mid` | `var(--font-body)` | clamp | `inherit` |
| `.body-small` | `var(--font-body)` | 0.9rem | `var(--color-text-dim)` |
| `.mono` | `var(--font-mono)` | inherit | inherit |
| `.text-terracota` | inherit | inherit | `var(--color-brand)` |
| `.text-ochra` | inherit | inherit | `var(--color-ocre)` |
| `.text-verde` | inherit | inherit | `var(--color-verde)` |
| `.text-dim` | inherit | inherit | `var(--color-text-dim)` |
| `.section-label` | `var(--font-mono)` | 0.8rem | `var(--color-brand)` |

## Usage Rules

1. Headings ALWAYS use `--font-display` (Prata) + weight 400.
2. Body text ALWAYS uses `--font-body` (Lato).
3. Code/monospaced elements ALWAYS use `--font-mono` (JetBrains Mono).
4. Brand name in navbar ALWAYS uses `--font-brand` (Grand Hotel) for signature feel.
5. Brand name in footer and other places uses `--font-body` (Lato) at weight 900.
6. Pull quotes and decorative emphasis use `--font-accent` (Grand Hotel).
7. Never hardcode a font-size where a clamp pattern exists.
8. Never apply font-weight >400 to Prata or Grand Hotel.
