# Component: Gradient Line

## Metadata
- **Category**: atom
- **Status**: stable

## Overview
Fixed vertical gradient triangle on the right edge — "la aguja que teje fino." Decorative only. Hidden on mobile.

**When to use**: Decorative accent on desktop landing page.
**When not to use**: Mobile (display:none under 768px), or when it distracts from content.

## Anatomy
```
      ┌──┐
      │  │  6px wide, 40vh tall
      │  │  Gradient: #DD614C → #DAA144
      │  │  Clip-path: triangle (arrow)
      │  │
      └──┘
   Fixed: right 0.5rem, bottom 0
   z-index: 50
```

## Tokens Used
- `--ds-terracota` — gradient start (via hardcoded hex fallback)
- `--ds-ocre` — gradient end (via hardcoded hex fallback)
- `--z-overlay` — stacking (50)
- `--duration-base` — opacity transition

## States

| State | Behavior |
|-------|----------|
| Default | Opacity 0.5 |
| On hover (any interactive) | Opacity 0.7 (via `html:has(:hover)`) |
| Mobile (<768px) | `display: none` |

## Code Example
```html
<div class="gradient-line" aria-hidden="true"></div>
```

## CSS
```css
.gradient-line {
  position: fixed;
  right: 0.5rem;
  bottom: 0;
  width: 6px;
  height: 40vh;
  background: linear-gradient(to bottom, var(--color-brand), var(--color-ocre));
  clip-path: polygon(50% 0%, 100% 100%, 0% 100%);
  z-index: var(--z-overlay);
  pointer-events: none;
  opacity: 0.5;
  transition: opacity var(--duration-base) ease;
  display: none; /* shown on desktop via media query */
}
```

## Cross-References
- Uses brand colors → [color.md](../foundations/color.md)
