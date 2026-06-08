# Foundation: Elevation (Shadows & Z-Index)

## Overview

Two-axis elevation: shadows (depth perception) and z-index (stacking order). Both are defined as tokens.

## Shadows

### Primitive Tokens

| Token | Value | Usage |
|-------|-------|-------|
| `--ds-shadow-sm` | `0 4px 16px rgba(0,0,0,0.4)` | Small elements |
| `--ds-shadow-md` | `0 4px 24px rgba(0,0,0,0.4)` | Cards (default) |
| `--ds-shadow-lg` | `0 6px 28px rgba(0,0,0,0.45)` | Large elements |
| `--ds-shadow-terracota` | `0 4px 20px rgba(221,97,76,0.3)` | Button glow (canonical terracota) |
| `--ds-shadow-terracota-lg` | `0 6px 28px rgba(221,97,76,0.45)` | Button hover glow |
| `--ds-shadow-whatsapp` | `0 4px 16px rgba(37,211,102,0.35)` | WhatsApp FAB |
| `--ds-shadow-whatsapp-hvr` | `0 6px 24px rgba(37,211,102,0.5)` | WhatsApp FAB hover |
| `--ds-shadow-step` | `0 0 30px rgba(221,97,76,0.3)` | Step active state |

### Semantic Tokens

| Token | Maps To | Usage |
|-------|---------|-------|
| `--shadow-card` | `--ds-shadow-md` | Glass cards, pricing card |
| `--shadow-button` | `--ds-shadow-terracota` | CTA "Empecemos" button |
| `--shadow-button-hover` | `--ds-shadow-terracota-lg` | CTA button hover |
| `--shadow-whatsapp` | `--ds-shadow-whatsapp` | WhatsApp FAB |
| `--shadow-whatsapp-hvr` | `--ds-shadow-whatsapp-hvr` | WhatsApp FAB hover |
| `--shadow-step-active` | `--ds-shadow-step` | Active step protagonist |

### Known Issue (Fixed in Tokens)
The original `--shadow: 0 4px 24px rgba(0,0,0,0.4)` was **declared but never used**. Now mapped via `--shadow-card`.

### Terracota Shadow Fix
Original button shadows used `rgba(226,92,58,0.3)` (#E25C3A) which differs from the OKLCH terracota (#DD614C). All terracota shadows now use the canonical OKLCH value.

## Z-Index Scale

| Token | Value | Usage |
|-------|-------|-------|
| `--z-base` | 1 | Default content stacking |
| `--z-overlay` | 50 | Steps overlay, gradient line |
| `--z-fab` | 900 | FAB container, WhatsApp, progress circle |
| `--z-menu` | 999 | Mobile menu overlay |
| `--z-nav` | 1000 | Navbar (above menu) |
| `--z-skip` | 10000 | Skip link (above everything) |

## Stacking Context Map

```
10000  Skip link
 1000  Navbar
  999  Mobile menu
  900  FAB container, WhatsApp, Progress circle
   60  Active step (z-index via JS)
   50  Steps overlay, Gradient line
    1  Default content
```

## Rules

1. Never hardcode shadow values — always use `--shadow-*` tokens.
2. Never hardcode z-index values — always use `--z-*` tokens.
3. Shadows should match the elevation of the component. Cards get `--shadow-card`.
4. Interactive elements (buttons, FABs) should have hover shadow overrides.
5. Keep z-index values below 100 for most content; reserve 900+ for fixed/overlay elements.
