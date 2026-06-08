# Foundation: Motion

## Overview

Motion tokens for transitions, animations, and scroll-reveal effects. Two axes: duration (fast → page) and easing (default → menu).

## Duration Tokens

| Token | Value | Usage |
|-------|-------|-------|
| `--duration-fast` | 0.2s | Opacity hovers, color changes, FAB opacity |
| `--duration-base` | 0.3s | Button hovers, nav transitions, link underlines, FAQ color, scroll-reveal |
| `--duration-slow` | 0.4s | Mobile menu links stagger, FAB slide in/out, progress circle, FAQ accordion |
| `--duration-reveal` | 0.6s | `fade-in` elements (opacity + translateY) |
| `--duration-page` | 0.9s | `.reveal` sections (scroll-triggered), hero background gradient shift |

## Easing Tokens

| Token | Value | Usage |
|-------|-------|-------|
| `--ease-default` | `ease` | Simple transitions (color, opacity) |
| `--ease-bounce` | `cubic-bezier(0.34, 1.56, 0.64, 1)` | FAQ plus icon rotation (springy feel) |
| `--ease-reveal` | `cubic-bezier(0.2, 0, 0, 1)` | Scroll reveal sections (smooth deceleration) |
| `--ease-menu` | `cubic-bezier(0.45, 0.05, 0.25, 1)` | Mobile menu clip-path, stagger links, hero float |

## Animation Keyframes

### `gradShift`
Background gradient animation for body:
```
Duration: 20s | Easing: cubic-bezier(0.45, 0.05, 0.25, 1) | Infinite
```
Moves background-position from 0%→100%→0% on x-axis.

### `heroFloat`
Hero shape floating animation (3 shapes):
```
Duration: 22s | Easing: cubic-bezier(0.45, 0.05, 0.25, 1) | Infinite
Shapes translate + scale at staggered offsets (0s, -7s, -14s, -5s)
```

### `heroFloatDiag`
Diagonal variant for 4th hero shape.

### `fabShake`
WhatsApp FAB attention animation:
```
Duration: 0.5s | Easing: ease-in-out
TranslateY + rotate oscillation (used every 30s)
```

## Scroll Reveal

Two systems coexist:

1. **`.fade-in`** — Intersection Observer with staggered delays:
   ```css
   .fade-in { transition: opacity var(--duration-reveal) ease, transform var(--duration-reveal) ease; }
   .fade-in-delay-1 { transition-delay: 0.1s; }
   .fade-in-delay-2 { transition-delay: 0.2s; }
   .fade-in-delay-3 { transition-delay: 0.3s; }
   ```

2. **`.reveal`** — Intersection Observer with cubic-bezier:
   ```css
   .reveal {
     transition: opacity var(--duration-page) var(--ease-reveal),
                 transform var(--duration-page) var(--ease-reveal);
   }
   ```
   Step elements have staggered delays: 0ms, 120ms, 240ms.

## Transition Patterns by Component

| Component | Property | Duration | Easing |
|-----------|----------|----------|--------|
| Navbar hide/show | transform, opacity | 0.35s | ease |
| Hamburger | color | 0.3s | ease |
| Mobile menu clip | clip-path | 0.5s | --ease-menu |
| Mobile links stagger | opacity, transform | 0.4s | --ease-menu |
| Link underline hover | width | 0.3s | ease |
| Button hover | all | 0.25s | ease |
| Glass card hover | border-color, transform | 0.3s | ease |
| FAQ plus rotate | transform | 0.4s | --ease-bounce |
| FAQ accordion | max-height | 0.4s | ease |
| FAB visibility | opacity, transform | 0.4s | ease |
| Progress circle | stroke-dashoffset | 0.1s | (instant feel) |
| WhatsApp FAB hover | box-shadow, transform | 0.3s | ease |
| Skip link | top | 0.25s | ease |

## Rules

1. Use `--duration-base` as default. Only use others when the timing needs emphasis.
2. Hover transitions should be `--duration-fast` or `--duration-base`.
3. Enter/exit animations (menu, FAB) should use `--duration-slow` or longer.
4. Scroll reveals should use `--duration-reveal` or `--duration-page`.
5. Bounce easing is reserved for playful micro-interactions (FAQ icon, etc.).
