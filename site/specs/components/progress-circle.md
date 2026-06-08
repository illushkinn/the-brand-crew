# Component: Progress Circle

## Metadata
- **Category**: molecule
- **Status**: stable

## Overview
Fixed-position circular progress indicator that fills as the user scrolls. Clicking scrolls to top. Lives inside the FAB container.

**When to use**: Long scrollable pages where users benefit from scroll-progress awareness.
**When not to use**: Short pages (<1 viewport height).

## Anatomy
```
       ┌──────┐
       │  ↑   │  ← arrow icon centered
       │ ╭───╮│
       │ ╰───╯│  ← SVG circle (stroke)
       └──────┘
   40×40px circle
   Fixed: bottom 92px, right 26px
   z-index: 900
```

## Tokens Used
- `--color-border` — background circle stroke
- `--color-brand` — foreground circle stroke, arrow icon
- `--color-bg-glass` — circle background (`rgba(18,18,18,0.5)`)
- `--radius-round` — circle shape
- `--z-fab` — stacking (900)
- `--duration-slow` — visibility transition
- `--duration-base` — arrow hover lift
- `--duration-fast` — stroke-dashoffset update (0.1s)

## States

| State | Class | Behavior |
|-------|-------|----------|
| Hidden | `.progress-circle` | Opacity 0, translateY(10), pointer-events none |
| Visible | `.progress-circle.is-visible` | Opacity 1, translateY(0), pointer-events all |
| Hover | — | Arrow icon lifts -2px |
| Focus-visible | — | Outline 2px brand |

## Progress Calculation (JS)
```javascript
const scrollY = window.scrollY || window.pageYOffset;
const docHeight = document.documentElement.scrollHeight - window.innerHeight;
const pct = Math.min((scrollY / docHeight) * 100, 100);
progressFg.style.strokeDashoffset = 100 - pct;
```

## Code Example
```html
<div class="progress-circle" id="progressCircle"
     role="button" aria-label="Volver al inicio" tabindex="0"
     title="Volver al inicio">
  <svg viewBox="0 0 40 40">
    <circle class="bg-circle" cx="20" cy="20" r="17"/>
    <circle class="fg-circle" id="progressFg" cx="20" cy="20" r="17"/>
  </svg>
  <i data-lucide="arrow-up" class="arrow-icon"></i>
</div>
```

## Cross-References
- Container → [FAB Container](fab-container.md)
- Also see: [WhatsApp FAB](whatsapp-fab.md)
