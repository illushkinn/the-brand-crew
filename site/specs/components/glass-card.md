# Component: Glass Card

## Metadata
- **Category**: molecule
- **Status**: stable

## Overview
Reusable glassmorphism card with blurred background, subtle border, and hover effect. Serves as container for problema cards, solución cards, pricing, and footer.

**When to use**: Any content block needing visual elevation and a "glass" aesthetic.
**When not to use**: Flat content sections, hero, CTA.

## Anatomy
```
┌────────────────────────────────┐
│  (optional icon / heading)     │
│  Content inside                │
│  (padding: var(--space-xl))   │
└────────────────────────────────┘
  bg: var(--color-bg-glass)
  border: 1px var(--color-border-glass)
  border-radius: var(--radius-lg)
  backdrop-filter: blur(12px)
```

## Tokens Used
- `--color-bg-glass` — glass background
- `--color-border-glass` — glass border
- `--radius-lg` — border radius
- `--duration-base` — hover transition
- `--ease-default`

## States

| State | Behavior |
|-------|----------|
| Default | Glass bg, subtle glass border |
| Hover | Border becomes `--color-brand`, lifts `-2px` |
| Focus-visible | (via inner interactive elements) |

## Code Example
```html
<div class="glass-card">
  <h4>No te encuentran</h4>
  <p>Si no estás en Google, no llegas a nuevos clientes.</p>
</div>
```

## Cross-References
- Used inside: [Hero](hero.md) (pricing), [Pricing Card](pricing-card.md), [Footer](footer.md)
- Inner elements: headings, body text, [Button System](button-system.md)
