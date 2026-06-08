# Foundation: Color

## Overview

The Brand Crew uses an **OKLCH-based color system** for perceptually uniform, gamut-aware colors. All primitives are defined in OKLCH; semantic aliases map them to meaningful roles. Dark theme is default; light theme overrides semantic tokens.

## Architecture

```
Layer 1 (Primitives)     Layer 2 (Semantics)        Layer 3 (Components)
────────────────────     ────────────────────        ─────────────────────
--ds-gray-0..6           --color-bg / --color-text  Component CSS
--ds-terracota           --color-brand              references Layer 2
--ds-verde               --color-verde              ONLY
--ds-ocre                --color-ocre
```

## Token Inventory

### Primitives (OKLCH)

| Token | Dark Value | Light Value | Role |
|-------|-----------|-------------|------|
| `--ds-gray-0` | `oklch(0.04 0.008 280)` | `oklch(0.97 0.005 80)` | Deepest bg |
| `--ds-gray-1` | `oklch(0.08 0.012 280)` | `oklch(0.95 0.008 80)` | Card bg |
| `--ds-gray-2` | `oklch(0.11 0.015 280)` | `oklch(0.93 0.01 80)` | Elevated bg |
| `--ds-gray-3` | `oklch(0.2 0.018 280)` | `oklch(0.85 0.01 80)` | Borders |
| `--ds-gray-4` | `oklch(0.6 0.012 280)` | `oklch(0.5 0.01 280)` | Dim text |
| `--ds-gray-5` | `oklch(0.8 0.008 280)` | `oklch(0.3 0.015 280)` | Body text |
| `--ds-gray-6` | `oklch(0.95 0.004 280)` | `oklch(0.15 0.01 280)` | Headlines |

### Brand Primitives (OKLCH — same in both themes)

| Token | Value | Hex Approx |
|-------|-------|-----------|
| `--ds-terracota` | `oklch(0.58 0.18 32)` | ≈ #DD614C |
| `--ds-terracota-hover` | `oklch(0.5 0.16 32)` | ≈ #C4513E |
| `--ds-verde` | `oklch(0.82 0.2 125)` | ≈ #A8E100 |
| `--ds-verde-hover` | `oklch(0.72 0.18 125)` | ≈ #8CC000 |
| `--ds-ocre` | `oklch(0.72 0.12 75)` | ≈ #DAA144 |

### Semantic Token Map

| Token | Dark Value | Light Value | Usage |
|-------|-----------|-------------|-------|
| `--color-text` | `--ds-gray-5` | `--ds-gray-5-lt` | Body copy |
| `--color-text-dim` | `--ds-gray-4` | `--ds-gray-4-lt` | Secondary/meta text |
| `--color-heading` | `--ds-gray-6` | `--ds-gray-6-lt` | Headings |
| `--color-headline` | `--ds-gray-6` | `--ds-gray-6-lt` | Same as heading |
| `--color-inverse` | `#fff` | `#fff` | Text on dark bg |
| `--color-bg` | `--ds-gray-0` | `--ds-gray-0-lt` | Page background |
| `--color-bg-alt` | `#1A1A1A` | `#EDE8E0` | Alternating section bg |
| `--color-bg-card` | `--ds-gray-1` | `--ds-gray-1-lt` | Card/glass bg |
| `--color-bg-hero` | `#0E0E0E` | `#F0EBE3` | Hero section |
| `--color-bg-glass` | `rgba(255,255,255,0.04)` | `rgba(0,0,0,0.03)` | Glassmorphism bg |
| `--color-brand` | `--ds-terracota` | `#C4513E` | Primary accent |
| `--color-brand-hover` | `--ds-terracota-hover` | `#A83D2E` | Primary accent hover |
| `--color-accent-glow` | `rgba(221,97,76,0.15)` | `rgba(196,81,62,0.12)` | Glow behind text |
| `--color-verde` | `--ds-verde` | `#7AB800` | Secondary accent |
| `--color-verde-hover` | `--ds-verde-hover` | `#5C8C00` | Secondary accent hover |
| `--color-ocre` | `--ds-ocre` | `#C49032` | Tertiary accent |
| `--color-ocre-hover` | `#C49032` | `#A67A28` | Tertiary accent hover |
| `--color-border` | `--ds-gray-3` | `--ds-gray-3-lt` | Default borders |
| `--color-border-thick` | `#333` | `#B8AFA6` | Emphasized borders |
| `--color-border-glass` | `rgba(255,255,255,0.08)` | `rgba(0,0,0,0.08)` | Glass border |
| `--color-nav-bg` | `rgba(18,18,18,0.85)` | `rgba(245,240,235,0.9)` | Nav background |
| `--color-whatsapp` | `#25D366` | `#25D366` | WhatsApp brand |
| `--color-code` | `--ds-gray-4` | `--ds-gray-4-lt` | Code text |

## Terracota Consistency Fix

**Issue**: The original CSS used `rgba(226,92,58,0.3)` (≈ #E25C3A) in button shadows while the OKLCH terracota evaluates to ≈ #DD614C — a different hue.

**Fix**: All terracota shadows now use the canonical OKLCH terracota value (`--ds-terracota` ≈ #DD614C):

| Old Value | New Token |
|-----------|-----------|
| `rgba(226,92,58,0.3)` | `var(--shadow-button)` → `--ds-shadow-terracota` |
| `rgba(226,92,58,0.45)` | `var(--shadow-button-hover)` → `--ds-shadow-terracota-lg` |

## Usage Rules

1. **Never use raw hex/rgba in component CSS.** Always reference a semantic token.
2. **Never reference Layer 1 primitives in components.** Go through Layer 2.
3. **Text on colored backgrounds**: Use `--color-inverse` or compute contrast via OKLCH.
4. **Dark/Light switching**: Change `data-theme` on `<html>`. No media query needed.
5. **Accessibility**: Maintain minimum 4.5:1 contrast for body text, 3:1 for large text.
